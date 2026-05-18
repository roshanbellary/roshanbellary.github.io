const FILLED_GLYPHS = {
  K: '♚︎',
  Q: '♛︎',
  R: '♜︎',
  B: '♝︎',
  N: '♞︎',
  P: '♟︎',
};

const WHITE_FILL = '#00ff41';
const WHITE_STROKE = '#0a0a0a';
const BLACK_FILL = '#0a0a0a';
const BLACK_STROKE = '#00ff41';

function Piece({ squareWidth, glyph, fill, stroke, glow }) {
  const size = squareWidth || 56;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'block', filter: glow }}
      aria-hidden="true"
    >
      <text
        x="50"
        y="80"
        textAnchor="middle"
        fontSize="92"
        fontFamily="'Apple Symbols','Segoe UI Symbol','DejaVu Sans','Arial Unicode MS',sans-serif"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        paintOrder="stroke fill"
      >
        {glyph}
      </text>
    </svg>
  );
}

const themedPieces = {};
['K', 'Q', 'R', 'B', 'N', 'P'].forEach((p) => {
  const glyph = FILLED_GLYPHS[p];
  themedPieces[`w${p}`] = ({ squareWidth }) => (
    <Piece
      squareWidth={squareWidth}
      glyph={glyph}
      fill={WHITE_FILL}
      stroke={WHITE_STROKE}
      glow="drop-shadow(0 0 6px rgba(0, 255, 65, 0.55))"
    />
  );
  themedPieces[`b${p}`] = ({ squareWidth }) => (
    <Piece
      squareWidth={squareWidth}
      glyph={glyph}
      fill={BLACK_FILL}
      stroke={BLACK_STROKE}
      glow="drop-shadow(0 0 5px rgba(0, 255, 65, 0.35))"
    />
  );
});

export default themedPieces;
