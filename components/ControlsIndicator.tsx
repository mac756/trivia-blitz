'use client';

import { motion } from 'framer-motion';

interface ControlsIndicatorProps {
  isAnswered: boolean;
  optionsCount: number;
}

export function ControlsIndicator({ isAnswered, optionsCount }: ControlsIndicatorProps) {
  const keys = ['1', '2', '3', '4'].slice(0, optionsCount);
  const altKeys = ['A', 'B', 'C', 'D'].slice(0, optionsCount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden md:flex items-center gap-6 text-zinc-500 text-sm"
    >
      {!isAnswered ? (
        <>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Select:</span>
            <div className="flex gap-1">
              {keys.map((key, i) => (
                <kbd
                  key={key}
                  className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-300 font-mono text-xs"
                >
                  {key}
                </kbd>
              ))}
            </div>
            <span className="text-zinc-600">or</span>
            <div className="flex gap-1">
              {altKeys.map((key) => (
                <kbd
                  key={key}
                  className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-300 font-mono text-xs"
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Next:</span>
          <kbd className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-emerald-400 font-mono text-xs">
            SPACE
          </kbd>
          <span className="text-zinc-600">or</span>
          <kbd className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-emerald-400 font-mono text-xs">
            ENTER
          </kbd>
        </div>
      )}
    </motion.div>
  );
}
