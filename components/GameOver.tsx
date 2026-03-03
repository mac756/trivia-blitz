'use client';

import { motion } from 'framer-motion';

interface GameOverProps {
  score: number;
  highScore: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export function GameOver({ score, highScore, totalQuestions, onPlayAgain, onMainMenu }: GameOverProps) {
  const isNewHighScore = score >= highScore && score > 0;

  return (
    <div className="w-full max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8"
      >
        <span className="text-8xl">🏆</span>
      </motion.div>

      {isNewHighScore && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black font-bold text-lg">
            ✨ NEW HIGH SCORE! ✨
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black text-white mb-4"
      >
        Game Over!
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <p className="text-zinc-400 mb-2">Your Score</p>
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
        >
          {score.toLocaleString()}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-8 mb-12"
      >
        <div className="text-center">
          <p className="text-zinc-500 text-sm">Best Score</p>
          <p className="text-2xl font-bold text-yellow-400">{highScore.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-zinc-500 text-sm">Questions</p>
          <p className="text-2xl font-bold text-white">{totalQuestions}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={onPlayAgain}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-bold text-lg text-black hover:scale-105 transition-transform"
        >
          Play Again
        </button>
        <button
          onClick={onMainMenu}
          className="px-8 py-4 bg-zinc-700 rounded-xl font-bold text-lg text-white hover:bg-zinc-600 transition-colors"
        >
          Main Menu
        </button>
      </motion.div>
    </div>
  );
}
