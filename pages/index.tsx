import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-200 flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">🎮 Game Hub</h1>
      <p className="text-lg text-white">Choose a game to play:</p>
      <div className="space-y-4">
        <Link href="/tictactoe">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded shadow hover:bg-indigo-100 transition">
            🧠 Tic Tac Toe
          </button>
        </Link>
        {/* Add more games here later */}
      </div>
    </div>
  );
}
