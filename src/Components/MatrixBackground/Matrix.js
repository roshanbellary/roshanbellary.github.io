import { useEffect, useRef, useState } from 'react';

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*0123456789";
const charCount = alphabet.length;

function MatrixBackground({ timeout = 100 }) {
  const canvas = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const context = canvas.current.getContext('2d');
    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;
    canvas.current.width = width;
    canvas.current.height = height;

    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);

    const columns = Math.floor(width / 20) + 1;
    const yPositions = Array.from({ length: columns }).fill(0);

    const matrixEffect = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, width, height);
      context.fillStyle = '#0f0';
      context.font = '15pt monospace';

      yPositions.forEach((y, index) => {
        const text = alphabet[Math.floor(Math.random() * charCount)];
        const x = index * 20;
        context.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 20;
        }
      });
    };

    const interval = setInterval(matrixEffect, timeout);
    return () => clearInterval(interval);
  }, [canvas, timeout, dimensions]);

  return (
    <div
      style={{
        background: '#000000',
        overflow: 'hidden',
        position: 'fixed',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        zIndex: 0,
        opacity: 0.4,
      }}
    >
      <canvas ref={canvas} />
    </div>
  );
}

export default MatrixBackground;
