import React, { useState, useEffect, useRef } from 'react';

const TicTacToe: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const clickSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  const drawSound = useRef<HTMLAudioElement | null>(null);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  const status = winner
    ? `🎉 Winner: ${winner}`
    : isDraw
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  useEffect(() => {
    clickSound.current = new Audio('/click.mp3');
    clickSound.current.volume = 0.5;

    winSound.current = new Audio('/win.mp3');
    winSound.current.volume = 0.7;

    drawSound.current = new Audio('/draw.mp3');
    drawSound.current.volume = 0.6;
  }, []);

  useEffect(() => {
    if (winner && winSound.current) {
      console.log('🏆 Playing win sound');
      winSound.current.pause();
      winSound.current.currentTime = 0;
      winSound.current.play().catch((err) => {
        console.warn('Win sound failed to play:', err);
      });
    } else if (isDraw && drawSound.current) {
      console.log('⚖️ Playing draw sound');
      drawSound.current.pause();
      drawSound.current.currentTime = 0;
      drawSound.current.play().catch((err) => {
        console.warn('Draw sound failed to play:', err);
      });
    }
  }, [squares, winner, isDraw]);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;

    if (clickSound.current) {
      clickSound.current.pause();
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch((err) => {
        console.warn('Click sound failed to play:', err);
      });
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">{status}</h1>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 text-4xl font-extrabold border border-gray-800 bg-white rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            <span className={value === 'X' ? 'text-blue-600' : value === 'O' ? 'text-red-500' : ''}>
              {value}
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Restart Game
      </button>

      {/* 🔊 Manual test button for win sound */}
      <button
        onClick={() => {
          if (winSound.current) {
            winSound.current.pause();
            winSound.current.currentTime = 0;
            winSound.current.play().catch((err) => {
              console.warn('Manual win sound failed:', err);
            });
          }
        }}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        🔊 Test Win Sound
      </button>
    </div>
  );
};

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
