'use client';

import { motion } from 'framer-motion';

interface TimerProps {
  timeLeft: number;
  maxTime: number;
}

export function Timer({ timeLeft, maxTime }: TimerProps) {
  const percentage = (timeLeft / maxTime) * 100;
  const isLow = timeLeft <= 5;
  const isCritical = timeLeft <= 3;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-zinc-700"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={isCritical ? 'text-red-500' : isLow ? 'text-yellow-500' : 'text-emerald-500'}
            initial={{ pathLength: 1 }}
            animate={{ pathLength: percentage / 100 }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-2xl font-bold ${
              isCritical ? 'text-red-500' : isLow ? 'text-yellow-500' : 'text-white'
            }`}
          >
            {timeLeft}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
