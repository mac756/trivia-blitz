'use client';

import { motion } from 'framer-motion';

interface ScoreBoardProps {
  score: number;
  streak: number;
  questionNumber: number;
  totalQuestions: number;
  highScore: number;
}

export function ScoreBoard({ score, streak, questionNumber, totalQuestions, highScore }: ScoreBoardProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl px-4 py-3 bg-zinc-800/50 backdrop-blur-sm rounded-2xl">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-zinc-400 uppercase tracking-wider">Score</p>
          <motion.p
            key={score}
            initial={{ scale: 1.3, color: '#34d399' }}
            animate={{ scale: 1, color: '#fff' }}
            className="text-2xl font-bold text-white"
          >
            {score.toLocaleString()}
          </motion.p>
        </div>
        
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
          >
            <span className="text-lg">🔥</span>
            <span className="text-sm font-bold text-white">{streak} streak!</span>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-zinc-400 uppercase tracking-wider">Question</p>
          <p className="text-xl font-bold text-white">
            {questionNumber}/{totalQuestions}
          </p>
        </div>

        <div className="text-center">
          <p className="text-xs text-zinc-400 uppercase tracking-wider">Best</p>
          <p className="text-xl font-bold text-yellow-400">
            {highScore.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
