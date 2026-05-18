import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import themedPieces from './themedPieces';
import styles from './ChessDemo.module.css';

const API_URL =
  process.env.REACT_APP_GPT4CHESS_API || 'https://robell05-gptforchess.hf.space';

const LIGHT_SQUARE = { backgroundColor: '#1a1a1a' };
const DARK_SQUARE = { backgroundColor: '#050505' };

const HINT_MOVE = {
  background:
    'radial-gradient(circle, rgba(0, 255, 65, 0.55) 0%, rgba(0, 255, 65, 0.55) 22%, transparent 24%)',
  cursor: 'pointer',
};
const HINT_CAPTURE = {
  background:
    'radial-gradient(circle, transparent 0%, transparent 58%, rgba(0, 255, 65, 0.6) 60%, rgba(0, 255, 65, 0.6) 68%, transparent 70%)',
  cursor: 'pointer',
};
const HINT_SELECTED = {
  background: 'rgba(0, 255, 65, 0.18)',
  boxShadow: 'inset 0 0 0 2px rgba(0, 255, 65, 0.55)',
};

function tryMove(game, { from, to, promotion }) {
  try {
    return game.move({ from, to, promotion: promotion || 'q' });
  } catch {
    return null;
  }
}

function ChessDemo() {
  const gameRef = useRef(new Chess());
  const [position, setPosition] = useState(gameRef.current.fen());
  const [moves, setMoves] = useState([]);
  const [playerColor, setPlayerColor] = useState('w');
  const [thinking, setThinking] = useState(false);
  const [slowWake, setSlowWake] = useState(false);
  const [error, setError] = useState(null);
  const [boardWidth, setBoardWidth] = useState(420);
  const [selected, setSelected] = useState(null);
  const wrapperRef = useRef(null);
  const wakeTimerRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.clientWidth;
      setBoardWidth(Math.max(260, Math.min(480, w)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const gameOver = gameRef.current.isGameOver();
  const turn = gameRef.current.turn();
  const isPlayerTurn = turn === playerColor;

  const status = useMemo(() => {
    const g = gameRef.current;
    if (g.isCheckmate()) {
      const loser = g.turn();
      return loser === playerColor
        ? { text: 'Checkmate — model wins', tone: 'lose' }
        : { text: 'Checkmate — you win', tone: 'win' };
    }
    if (g.isStalemate()) return { text: 'Stalemate — draw', tone: 'draw' };
    if (g.isThreefoldRepetition && g.isThreefoldRepetition())
      return { text: 'Threefold repetition — draw', tone: 'draw' };
    if (g.isInsufficientMaterial()) return { text: 'Insufficient material — draw', tone: 'draw' };
    if (g.isDraw()) return { text: 'Draw', tone: 'draw' };
    if (error) return { text: error, tone: 'error' };
    if (thinking) return { text: slowWake ? 'Waking model…' : 'Model thinking…', tone: 'thinking' };
    if (g.inCheck()) return { text: `${isPlayerTurn ? 'You are' : 'Model is'} in check`, tone: 'check' };
    return { text: isPlayerTurn ? 'Your move' : "Model's move", tone: 'idle' };
  }, [position, thinking, slowWake, error, isPlayerTurn, playerColor]); // eslint-disable-line react-hooks/exhaustive-deps

  const hintStyles = useMemo(() => {
    if (!selected || thinking || gameOver || !isPlayerTurn) return {};
    const piece = gameRef.current.get(selected);
    if (!piece || piece.color !== playerColor) return {};
    const legal = gameRef.current.moves({ square: selected, verbose: true });
    const map = { [selected]: HINT_SELECTED };
    legal.forEach((m) => {
      const isCapture = (m.flags && (m.flags.includes('c') || m.flags.includes('e')));
      map[m.to] = isCapture ? HINT_CAPTURE : HINT_MOVE;
    });
    return map;
  }, [selected, position, thinking, gameOver, isPlayerTurn, playerColor]); // eslint-disable-line react-hooks/exhaustive-deps

  const requestModelMove = useCallback((movesSoFar) => {
    setThinking(true);
    setError(null);
    setSlowWake(false);
    if (wakeTimerRef.current) clearTimeout(wakeTimerRef.current);
    wakeTimerRef.current = setTimeout(() => setSlowWake(true), 3500);

    fetch(`${API_URL}/inference`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moves: movesSoFar }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const uci = data.move;
        if (!uci || typeof uci !== 'string' || uci.length < 4) {
          throw new Error('Malformed response from model');
        }
        const from = uci.slice(0, 2);
        const to = uci.slice(2, 4);
        const promotion = uci.length > 4 ? uci[4] : undefined;
        const result = tryMove(gameRef.current, { from, to, promotion });
        if (!result) {
          setError(`Model returned illegal move: ${uci}`);
        } else {
          setMoves([...movesSoFar, uci]);
          setPosition(gameRef.current.fen());
        }
      })
      .catch((err) => {
        setError(err.message || 'Network error');
      })
      .finally(() => {
        if (wakeTimerRef.current) {
          clearTimeout(wakeTimerRef.current);
          wakeTimerRef.current = null;
        }
        setSlowWake(false);
        setThinking(false);
      });
  }, []);

  const commitUserMove = useCallback(
    (from, to, piecePromo) => {
      if (thinking || gameOver) return false;
      if (gameRef.current.turn() !== playerColor) return false;

      const piece = gameRef.current.get(from);
      const isPromotion =
        piece && piece.type === 'p'
        && ((piece.color === 'w' && to[1] === '8') || (piece.color === 'b' && to[1] === '1'));
      const promotion = isPromotion ? (piecePromo || 'q') : undefined;

      const result = tryMove(gameRef.current, { from, to, promotion });
      if (!result) return false;

      const uci = `${from}${to}${promotion || ''}`;
      const next = [...moves, uci];
      setMoves(next);
      setPosition(gameRef.current.fen());
      setSelected(null);

      if (!gameRef.current.isGameOver()) {
        requestModelMove(next);
      }
      return true;
    },
    [moves, thinking, gameOver, playerColor, requestModelMove]
  );

  const onPieceDrop = useCallback(
    (sourceSquare, targetSquare, piece) => {
      const piecePromo = piece && piece[1] === 'P'
        && ((piece[0] === 'w' && targetSquare[1] === '8')
          || (piece[0] === 'b' && targetSquare[1] === '1'))
        ? 'q'
        : undefined;
      return commitUserMove(sourceSquare, targetSquare, piecePromo);
    },
    [commitUserMove]
  );

  const onPieceDragBegin = useCallback(
    (_piece, sourceSquare) => {
      if (thinking || gameOver) return;
      if (gameRef.current.turn() !== playerColor) return;
      setSelected(sourceSquare);
    },
    [thinking, gameOver, playerColor]
  );

  const onPieceDragEnd = useCallback(() => {
    setSelected(null);
  }, []);

  const onSquareClick = useCallback(
    (square) => {
      if (thinking || gameOver) {
        setSelected(null);
        return;
      }
      if (gameRef.current.turn() !== playerColor) {
        setSelected(null);
        return;
      }
      const piece = gameRef.current.get(square);
      if (selected) {
        if (square === selected) {
          setSelected(null);
          return;
        }
        const moved = commitUserMove(selected, square);
        if (moved) return;
        if (piece && piece.color === playerColor) {
          setSelected(square);
        } else {
          setSelected(null);
        }
      } else if (piece && piece.color === playerColor) {
        setSelected(square);
      }
    },
    [selected, thinking, gameOver, playerColor, commitUserMove]
  );

  const reset = useCallback((nextColor) => {
    if (wakeTimerRef.current) {
      clearTimeout(wakeTimerRef.current);
      wakeTimerRef.current = null;
    }
    gameRef.current = new Chess();
    const color = nextColor || playerColor;
    setPlayerColor(color);
    setPosition(gameRef.current.fen());
    setMoves([]);
    setSelected(null);
    setThinking(false);
    setSlowWake(false);
    setError(null);
    if (color === 'b') {
      requestModelMove([]);
    }
  }, [playerColor, requestModelMove]);

  const togglePlayerColor = useCallback(() => {
    const next = playerColor === 'w' ? 'b' : 'w';
    reset(next);
  }, [playerColor, reset]);

  const retry = useCallback(() => {
    setError(null);
    requestModelMove(moves);
  }, [moves, requestModelMove]);

  useEffect(() => () => {
    if (wakeTimerRef.current) clearTimeout(wakeTimerRef.current);
  }, []);

  const boardOptions = {
    position,
    onPieceDrop,
    onPieceDragBegin,
    onPieceDragEnd,
    onSquareClick,
    boardOrientation: playerColor === 'w' ? 'white' : 'black',
    customPieces: themedPieces,
    customLightSquareStyle: LIGHT_SQUARE,
    customDarkSquareStyle: DARK_SQUARE,
    customSquareStyles: hintStyles,
    customBoardStyle: {
      borderRadius: 6,
      border: '1px solid var(--color-border)',
      boxShadow: '0 0 24px rgba(0, 255, 65, 0.1)',
    },
    boardWidth,
    arePiecesDraggable: !thinking && !gameOver && isPlayerTurn,
    animationDuration: 200,
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={`${styles.status} ${styles[status.tone] || ''}`}>
        <span className={styles.dot} aria-hidden="true" />
        <span>{status.text}</span>
        {error && (
          <button type="button" className={styles.retryBtn} onClick={retry}>
            retry
          </button>
        )}
      </div>

      <div className={styles.boardWrap}>
        <Chessboard {...boardOptions} />
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={() => reset()}
        >
          ↺ New game
        </button>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={togglePlayerColor}
        >
          Play as {playerColor === 'w' ? 'black' : 'white'}
        </button>
      </div>

      <div className={styles.meta}>
        <span>Moves: {moves.length}</span>
        <span className={styles.endpoint}>API: {API_URL.replace(/^https?:\/\//, '')}</span>
      </div>
    </div>
  );
}

export default ChessDemo;
