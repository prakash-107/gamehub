import React from 'react';
import TicTacToe from '../components/TicTacToe';

const TicTacToePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 p-6">
      <TicTacToe />
    </div>
  );
};

export default TicTacToePage;
