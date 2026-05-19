---
title: "GptForChess: Teaching a Transformer to Play Chess"
date: "2026-05-16"
tags: ["machine-learning", "transformers", "chess"]
description: "Six experiments, four architectures, and one stubborn question: how far can a purely-supervised transformer go on chess? Notes from a project that ended at 73% top-1 and 55% puzzle solves."
---

I spent the last month trying to answer a question: a chess game is a sequence of tokens drawn from a small vocabulary, and language models seem to do fine with that, so how far can you push a pure transformer, with no self-play, on chess?

The final answer ended up better than I expected. The headline numbers: **73.1% test top-1 accuracy** on Lichess game continuations, **92.6% top-5**, and **55.08% puzzle first-move solve rate** on held-out Lichess puzzles. ~24 hours of training on a rented RTX PRO 6000 Blackwell. Total cost: ~$24.

Getting there took six experiments and four real architectural rewrites. This post is the story of how the design moved from a reward model that minimaxed its way through games, to a cross-attention policy network that reads a live board on every move.

Repo: <https://github.com/roshanbellary/GptForChess>

---

## The setup

The constraint I held the whole way through: **only supervised learning**. No RL and no self-play at inference time. The training signals were:

- **Lichess games** from the open database, filtered to both players Elo ≥ 1800 with normal terminations (~1M games for policy, ~1M for reward — disjoint subsets).
- **Stockfish evaluations** on positions sampled from those games, normalized as `tanh(centipawns / 400)` — ~10M labeled positions for the reward model.
- **Lichess puzzles** (`Popularity ≥ 75`, `NbPlays ≥ 5000`) — ~376K training puzzles + 100K held-out for evaluation.

Move vocabulary is the ~1968 possible UCI moves plus `[CLS]` and `[PAD]`. Sequences capped at 128 tokens. All datasets are persisted as memory-mapped binaries for fast DataLoader I/O, and every train set has a fixed-seed (42) test split so train/test never leak.

The motivating intuition: position state is *implicit* in the move history — if you know the starting position and the move list, you can replay it. Whether the model has to learn that state purely from self-attention over moves, or whether it should be handed an explicit board representation, turned out to be the central architectural question.

---

## The reward-only era (Exps 1–3): why minimax over a learned eval is a dead end

The first three experiments were all variants of the same idea: train a transformer encoder to map a move history to a scalar reward in `[-1, 1]`, then play by wrapping it in a minimax search with top-N pruning at each ply.

```
   Move history → Transformer Encoder → [CLS] → Linear → tanh → reward ∈ [-1, 1]
                                            │
                                            ▼
                      MINIMAX SEARCH (depth 3, top-N=5) → best move
```

Three iterations of this:

- **Exp 1** trained in two phases (win/loss outcome labels, then Stockfish labels with a distillation weight). Phase 1 loss was extremely noisy as the Bayes error in outcome labels dominates the learnable signal, because plenty of positions that look equal resolve to a winner anyway.
- **Exp 2** dropped the distillation weight to `λ = 0.01` since the noisy outcome signal turned out to be nearly useless once Stockfish labels were in the mix. Opening play improved; the endgame was still terrible (the model would happily report +0.9 winning odds while in mate-in-3). Also pivoted from a 40k+ SAN tokenizer to a ~1968-move UCI tokenizer — way fewer parameters, much better performance.
- **Exp 3** dropped the outcome phase entirely and trained from scratch on 500K Stockfish-labeled positions. Test MSE dropped to **0.08** from Exp 2's 0.15 — a 50% improvement, and the cleanest reward model of the project.

![Exp 3 batch loss](gpt-for-chess/exp_3/batch_loss.jpg)
![Exp 3 epoch loss](gpt-for-chess/exp_3/epoch_loss.jpg)

But here's the thing: even with a clean reward model, **the engine was bounded by minimax**. Every move required evaluating every legal continuation, recursing to depth 3, and picking the argmax. That's expensive (legal_moves × reward_calls per ply), depth-limited in practice (so vulnerable to long-horizon tactics), and the reward model was just noisy enough that minimax often selected on differences within the noise floor.

The lesson that drove the rest of the project: **a position evaluator doesn't tell you which move to *play*** as it just scores positions you've already enumerated. If I wanted the model to actually pick moves, I needed to train something that directly modeled `P(next_move | history)`.

---

## Exp 4: split reward and policy

The pivot in Exp 4 was to train a **separate policy model** that predicts the next move directly. The reward model stuck around to drive the demo's eval bar, but it no longer chose moves.

```
                  ┌──── Move history ────────────┐
                  ▼                              ▼
       ┌─────────────────────┐         ┌─────────────────────┐
       │  Reward Model       │         │  Policy Model       │
       │  (transformer enc.) │         │  (transformer dec.) │
       └──────────┬──────────┘         └──────────┬──────────┘
                  ▼                                ▼
            reward [-1,1]                P(next_move | history)
                  │                                │
            (UI eval bar)                argmax over legal moves
```

This is the same general decomposition DeepMind used in *Grandmaster-Level Chess Without Search* with a policy network that consumes the move history, masks to legal moves at inference, and argmax-selects. Search collapses into a single forward pass, and the model learns positional concepts implicitly through self-attention over the move sequence.

Training was split into two phases. Phase 2a trained on ~950K games, Phase 2b fine-tuned on ~1.4M puzzles.

**Phase 2a worked extremely well.** On the games-only test set:

- Top-1: **65.4%**
- Top-5: **81.9%**
- Perplexity: **4.0**

![Test policy top-1](gpt-for-chess/exp_4/test_policy_top1_acc.png)
![Test policy loss](gpt-for-chess/exp_4/test_policy_loss.png)
![Test policy perplexity](gpt-for-chess/exp_4/test_policy_perplexity.png)

Then **Phase 2b broke everything.**

| Metric | After 2a | After 2b |
|---|---|---|
| Game top-1 | 65.4% | **51.3%** (−14 pp) |
| Game perplexity | 4.0 | **19.81** (5× worse) |
| Puzzle first-move solve | 0.1% | **3.6%** (barely moved) |

![Puzzle first-move solve](gpt-for-chess/exp_4/test_puzzle_first_move.png)
![Puzzle all-moves solve](gpt-for-chess/exp_4/test_puzzle_all_moves.png)

The root cause was a data-loader bug. Puzzles are defined by a FEN, a specific starting position the puzzle is built around. My preprocessor used the FEN to validate that the puzzle's moves were legal, then threw it away. So the model was fine-tuning on bare move sequences with no way to see the board those moves were being played on. Game performance collapsed (catastrophic forgetting), and puzzle accuracy barely moved (because the model couldn't ground the puzzle in a position).

The deeper lesson and the one that drove Exps 5 and 6 was that **the policy model needed an explicit view of the board.** A pure move-history transformer can learn standard-opening play just fine, because every game starts from the same position. But puzzles each start from a *different* position, and without a way to see it, the move sequence carries almost no information.

I also built out a proper benchmark suite here: three held-out test sets (reward, policy, puzzle) for reproducible evaluation. Every later experiment ran against these.

![Reward MSE](gpt-for-chess/exp_4/test_reward_mse.png)
![Final benchmark output](gpt-for-chess/exp_4/policy_benchmark.png)

---

## Exp 5: give the model a CNN board encoder

The fix was a small CNN that encodes the board into the model's input stream.

The input is a `(19, 8, 8)` planes tensor with 12 piece planes (6 piece types × 2 colors), plus castling rights, en-passant target, side to move, etc. A 6-block residual CNN at 128 channels with GroupNorm consumes it, pools to a single `d_model`-dim vector, and injects it at position 0 of the move sequence replacing the `[CLS]` token.

```
   Move history                    Board planes (19, 8, 8)
        │                                  │
        │                                  ▼
        │                       ┌────────────────────┐
        │                       │  BoardCNN          │
        │                       │  6× ResBlocks      │
        │                       │  → AdaptiveAvgPool │
        │                       │  → Linear          │
        │                       └──────────┬─────────┘
        │                                  │
        │                            (B, d_model)
        ▼                                  │
   Token embeddings ──── replace pos 0 ◄───┘
        │
        ▼
   Transformer Encoder (self-attn only) → Linear head → P(next_move | history, board)
```

I also changed the training regime to a hard-balanced **mixed batch sampler**: every batch is 80% game samples + 20% puzzle samples, with a 5× per-sample loss weight on the puzzle rows. With that weight, puzzles account for ~50% of the gradient norm despite being a quarter of the samples — enough to teach the model puzzles without letting them dominate.

12 epochs at batch size 1024, ~2.3 hours of wall-clock on the RTX PRO 6000.

**Results:**

| Metric | Exp 4 (Phase 2b) | Exp 5 |
|---|---|---|
| Game top-1 | 51.3% | **64.0%** |
| Puzzle first-move | 3.6% | **12.67%** (3.5×) |
| Train/test loss gap | small | **0.85 vs 1.60** (overfit signature) |

![Test policy top-1](gpt-for-chess/exp_5/test_mixed_policy_top1_acc.png)
![Test policy top-5](gpt-for-chess/exp_5/test_mixed_policy_top5acc.png)
![Puzzle first-move solve](gpt-for-chess/exp_5/test_mixed_puzzle_first_move.png)
![Benchmark output](gpt-for-chess/exp_5/benchmark.png)

Game performance was preserved and puzzle accuracy jumped 3.5×. The CNN was clearly doing its job — the model could finally see the board.

The 0.75-nat train/test gap was the price of the oversampled + 5×-weighted puzzles. Each puzzle was being seen ~13× over the run. That's the kind of overfit you accept if the alternative is no puzzle signal at all.

But two limitations were obvious heading into Exp 6:

1. **Information bottleneck.** The CNN pooled the entire board down to a single 768-dim vector *before any move ever queried it*. The CNN had to commit to one summary of the position before knowing which part of the board the policy would actually care about.
2. **Staleness.** The board was frozen at position 0 of the sequence. For games that's fine (every game starts from the same opening) but means the board signal is essentially constant across game samples. For puzzles, it means the model only sees the puzzle's *starting* FEN — every move played after that point isn't reflected in the board signal at all.

---

## Exp 6: cross-attention, live boards, and a Flamingo gate

Exp 6 is the experiment the rest of the project was building toward. It removes both Exp 5 limitations and is by a wide margin the strongest result of the project.

Three changes:

1. **The CNN stops pooling.** Output goes from `(B, d_model)` to `(B, T, 64, d_model)` with 64 per-square vectors per board, each with a learned 64-element positional embedding. Board representation went from 768 dims to **49,152 dims** (64 × 768). No forced compression.
2. **Live boards.** Each sample carries `(T, 19, 8, 8)` per-position planes, where `plane[t] = board state after tokens [1..t] have been played`. The board signal at position `t` reflects what's actually on the board at that point in the sequence, not the starting position. Built on the fly in the dataloader by replaying moves on a `chess.Board` with no extra disk storage.
3. **Cross-attention with a Flamingo gate.** A new `CrossAttnBlock` replaces `nn.TransformerEncoderLayer`. Each block does: self-attention over moves (causal) → cross-attention with moves as Q and per-position board as K/V → FFN. The cross-attention residual is multiplied by `tanh(α)` where `α` is a learnable scalar **initialized to zero**, so cross-attention is *disabled at the start of training* and the model has to earn each unit of board signal by reducing loss.

```
  Move history                       Per-position planes (T, 19, 8, 8)
       │                                          │
       │                                          ▼
       │                          ┌────────────────────────────┐
       │                          │  BoardCNN (no pool)        │
       │                          │  + learned square_pos      │
       │                          │  → (T, 64, d_model)        │
       │                          └─────────────┬──────────────┘
       │                                        │
       ▼                                        │
  token embeddings                       K, V banks (per position)
       │                                        │
       ▼                                        │
  ┌─────────────────────────────────────────────┴─────────────┐
  │              CrossAttnBlock  ×  8                         │
  │  ┌──────────────────────────────────────────────────────┐ │
  │  │  Self-attention over moves (causal mask)             │ │
  │  │            ▼                                         │ │
  │  │  Cross-attention: moves Q vs per-position board K,V  │ │
  │  │            × tanh(cross_gate)  ← init to 0           │ │
  │  │            ▼                                         │ │
  │  │  Feed-forward network                                │ │
  │  └──────────────────────────────────────────────────────┘ │
  └────────────────────────────┬──────────────────────────────┘
                               ▼
                          LayerNorm → Linear head
                               ▼
              P(next_move | history, live_board_at_t)
```

**Leak-safety is structural.** Each move query at position `t` is paired with *exactly* its own 64-square K/V bank via a `reshape(B*T, 64, d)` that gives each position its own attention context. Position `t` cannot attend to position `t+1`'s board because that board never even enters position `t`'s attention matrix. `plane[t]` is the state *after* tokens `[1..t]` are played, so the move being predicted (`token[t+1]`) is not in `plane[t]` thus language-modeling supervision stays honest.

**Training config:**

| Hyperparameter | Value |
|---|---|
| `d_model` / `num_layers` / `nhead` | 768 / 8 / 12 |
| `dim_feedforward` | 3072 |
| CNN channels / residual blocks | 128 / 6 |
| Policy data | 946K games (Elo ≥ 1800) |
| Puzzle data | 377K puzzles |
| Epochs (planned 20, stopped 11) | 11 |
| Batch size | 128 (per-position planes inflate memory ~190× vs Exp 5) |
| Learning rate | 3e-5 |
| Puzzle ratio / loss weight | 0.2 / 5.0 |

The per-position CNN runs 128× more often per forward pass than Exp 5 did, so each epoch took ~2h 20m. I stopped at epoch 11 as the loss curves had clearly plateaued by epoch 9–10 and marginal improvement after that wasn't going to justify another ~20 hours of GPU time. Total cost on Vast.ai at $0.95/hr came to **$24.38**.

**Results.** Step-changes across every metric:

| Metric | Exp 5 (ep 12) | Exp 6 (ep 11) |
|---|---|---|
| Train epoch loss | 0.8473 | **0.3992** |
| Test policy loss | 1.5965 | **0.8710** |
| Test perplexity | 4.96 | **2.39** |
| Test top-1 | 63.6% | **73.1%** |
| Test top-5 | 78.7% | **92.6%** |
| Puzzle first-move | 12.67% | **55.08%** |
| Puzzle all-moves | 68.25% | **85.63%** |
| Train/test gap | 0.75 | **0.47** (narrower) |

![Test policy top-1](gpt-for-chess/exp_6/test_mixed_policy_top1_acc.png)
![Test policy top-5](gpt-for-chess/exp_6/test_mixed_policy_top5_acc.png)
![Test policy perplexity](gpt-for-chess/exp_6/test_mixed_policy_perplexity.png)
![Puzzle first-move solve](gpt-for-chess/exp_6/test_mixed_puzzle_first_move.png)
![Puzzle all-moves solve](gpt-for-chess/exp_6/test_mixed_puzzle_all_moves.png)
![Train epoch loss](gpt-for-chess/exp_6/train_policy_epoch_loss.png)

Puzzle first-move quadrupled (12.67% → 55.08%), game top-1 jumped 9.5 pp, perplexity halved. And, the part that surprised me was that the train/test gap actually *narrowed* despite the increased model capacity. The live-board cross-attention is generalizing, not memorizing.

### The weird thing the gates did

The cross-attention gates are initialized to zero, so at the start of training every block has the board signal fully suppressed. The naive expectation is that all eight gates climb together toward some positive equilibrium as the model learns to use the board.

That is not what happened.

![Cross-gate values per block over training](gpt-for-chess/exp_6/cross_gate.png)

At the end of training, the per-block `tanh(α)` values were:

| Block | tanh(gate) |
|---|---|
| L0 | **−0.259** |
| L1 | +0.276 |
| L2 | **+0.348** (largest +) |
| L3 | +0.336 |
| L4 | **−0.370** (largest −) |
| L5 | −0.306 |
| L6 | +0.304 |
| L7 | −0.249 |

The first block went strongly negative. The early-middle blocks (L1–L3) went strongly positive. The deep blocks oscillated (L4–L5 negative, L6 positive, L7 negative).

A negative gate means the cross-attention residual is being *subtracted* from the move stream, not added. Those blocks have learned to use the board signal as an **anti-feature** — suppressing spurious history-only patterns rather than reinforcing them. The structured alternation across depth suggests some kind of emergent depth-wise normalization between additive and subtractive board injections, and I genuinely don't know what's driving it. A direct ablation by forcing each gate to zero one at a time and measuring per-metric impact would identify which blocks are load-bearing for which capabilities. That's the experiment I'd run next.

(There's a longer writeup in `experiments/experiment_6/analysis.md` in the repo with the full procedure and results breakdown.)

---

## What I'd take away from all of this

A few things I'd flag for anyone trying something similar:

- **Splitting reward and policy was the highest-leverage decision.** Minimax over a noisy reward model is bounded both by the depth × branching factor cost *and* by the limits of the reward model itself. A learned policy collapses search into one forward pass and gives a much sharper move distribution. If I were starting over, I'd skip the reward-only era entirely and go straight to a policy network.
- **If your task has a structured state, the model needs to see it.** Exp 4 → Exp 5 was the unlock for puzzles. Move history alone is enough to learn standard-opening play (every game starts from the same position) but useless for puzzles, which each start from a different FEN. A CNN that injects board planes into the input stream is the easy fix.
- **One pooled vector is a bottleneck.** When I went from pooling-to-768-dims to 64 per-square vectors with cross-attention, capacity went up ~64× and the train/test gap actually *narrowed*. The CNN can't know in advance which square the policy will care about letting attention pull what it needs (V4) beats forcing the CNN to commit upfront (V3).
- **Outcome labels are a noisy signal.** Win/loss/draw labels carry too much Bayes error to be useful as a primary training target. Stockfish labels were strictly better in every experiment that compared them.
- **Mixed batches > sequential fine-tuning.** Exp 4's Phase 2b fine-tune on puzzles destroyed game performance (catastrophic forgetting). Exp 5's hard-balanced mixed batches with per-sample loss weighting kept both alive simultaneously.

### Open questions

- **Why the gate signs split.** Negative gates as anti-features is the cleanest explanation I have, but the alternating pattern across depth is not something I would have predicted. Ablations would tell me which blocks are doing what.
- **Data-bound or capacity-bound?** Train loss 0.40 vs test loss 0.87 leans toward "more data would help" — but the loss curves plateaued, so more epochs at the same config won't move things. I'd try `d_model = 1024` or `num_layers = 12`, plus more puzzles, as the next investment.

---

## Repo pointers

```
src/
  tokenizer.py        Fixed UCI-vocab tokenizer (~1968 moves + specials)
  model.py            BoardCNN, CrossAttnBlock, ChessRewardModel,
                      ChessPolicyModel, Reward/PolicyModelInference
  build_datasets.py   Resumable 5-stage data pipeline (HF streaming →
                      Stockfish labeling → tokenization → memmaps)
  train.py            ChessPolicyDataset (with per-position plane replay),
                      MixedBatchSampler, training loop with cross-gate
                      logging and per-epoch checkpointing
  mcts.py             Minimax search (legacy; used in Exps 1–3)
  benchmark.py        Standalone evaluation runner
demo.py               Pygame interactive demo to play vs the model
experiments/
  experiment_1..6/    Each contains analysis.md, training images,
                      and checkpoints
deployment.md         Vast.ai workflow: rent → build → train → fetch
```

Key commands:

```bash
# Build datasets (Experiment 6 mode — no Stockfish, much faster)
poetry run python src/build_datasets.py --policy-only \
    --policy-games 1000000 \
    --min-puzzle-popularity 75 --min-puzzle-plays 5000

# Train policy model (Experiment 6 configuration)
PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True \
PYTHONPATH=src python src/train.py \
    --skip-reward \
    --policy-epochs 20 --batch-size 128 \
    --learning-rate 3e-5 --num-workers 16 \
    --puzzle-loss-weight 5.0 --puzzle-ratio 0.2 \
    --log-dir runs/exp6

# Play against the model
arch -arm64 PYTHONPATH=src poetry run python demo.py \
    --policy-model {{path to policy model}} \
    --reward-model {{path to reward model}} \
    --tokenizer {{path to tokenizer}}
```

---

## Thanks

- **Lichess** for the open game and puzzle databases.
- **Stockfish** for the position-evaluation labels that trained the reward model.
- **Ruoss et al. (2024)**, *Grandmaster-Level Chess Without Search*, for the policy/value decomposition that motivated the Exp 4 split.
- **Alayrac et al. (2022)**, *Flamingo*, for the gated cross-attention pattern in Exp 6's `CrossAttnBlock`.

*Last updated May 2026 — Experiment 6 training complete at epoch 11.*
