'use client';

import { motion } from 'framer-motion';

interface LevelProgressProps {
  currentLevel: number;
  totalLevels: number;
  questionInLevel: number;
  questionsPerLevel: number;
}

export function LevelProgress({ 
  currentLevel, 
  totalLevels, 
  questionInLevel, 
  questionsPerLevel 
}: LevelProgressProps) {
  const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);
  
  return (
    <div className="w-full">
      {/* Level Title */}
      <motion.div
        key={currentLevel}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-3"
      >
        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Level {currentLevel}
        </span>
        <span className="text-zinc-500 text-sm ml-2">
          Question {questionInLevel}/{questionsPerLevel}
        </span>
      </motion.div>

      {/* Level Progress Bar */}
      <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(questionInLevel / questionsPerLevel) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Level Indicators */}
      <div className="flex justify-between mt-2 px-1">
        {levels.map((level) => {
          const isCompleted = level < currentLevel;
          const isCurrent = level === currentLevel;
          const isLocked = level > currentLevel;

          return (
            <motion.div
              key={level}
              className={`flex flex-col items-center ${
                isLocked ? 'opacity-40' : 'opacity-100'
              }`}
              initial={isCurrent ? { scale: 0.8 } : { scale: 1 }}
              animate={isCurrent ? { scale: 1 } : { scale: 1 }}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 transition-colors ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-500'
                    : isCurrent
                    ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                    : 'bg-zinc-800 border-zinc-600'
                }`}
              >
                {isCompleted && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </motion.svg>
                )}
              </div>
              <span
                className={`text-xs mt-1 ${
                  isCompleted
                    ? 'text-emerald-400'
                    : isCurrent
                    ? 'text-cyan-400 font-medium'
                    : 'text-zinc-600'
                }`}
              >
                L{level}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Level Completion Message */}
      {questionInLevel === questionsPerLevel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-3"
        >
          <span className="text-sm text-amber-400 font-medium">
            Complete this question to advance!
          </span>
        </motion.div>
      )}
    </div>
  );
}
