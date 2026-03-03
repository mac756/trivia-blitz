'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/lib/questions';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswer: (index: number) => void;
}

export function QuestionCard({ question, selectedAnswer, isAnswered, onAnswer }: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="inline-block px-3 py-1 text-sm font-medium text-zinc-300 bg-zinc-700/50 rounded-full">
          {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
        </span>
      </motion.div>

      <motion.h2
        key={question.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed"
      >
        {question.question}
      </motion.h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrect = isAnswered && isCorrect;
          const showWrong = isAnswered && isSelected && !isCorrect;

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !isAnswered && onAnswer(index)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-xl font-medium transition-all duration-200 relative overflow-hidden group
                ${
                  showCorrect
                    ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400'
                    : showWrong
                    ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                    : isSelected
                    ? 'bg-blue-500/20 border-2 border-blue-500 text-white'
                    : 'bg-zinc-800/50 border-2 border-zinc-700 text-zinc-300 hover:bg-zinc-700/50 hover:border-zinc-600'
                }
                ${!isAnswered && 'cursor-pointer'} ${isAnswered && 'cursor-default'}
              `}
            >
              <span className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900/50 text-sm font-bold border border-zinc-700 group-hover:border-zinc-600 transition-colors">
                  {String.fromCharCode(65 + index)}
                  <span className="hidden md:inline text-zinc-500 text-xs ml-0.5">/{index + 1}</span>
                </span>
                <span>{option}</span>
              </span>
              
              {showCorrect && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl"
                >
                  ✓
                </motion.span>
              )}
              {showWrong && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl"
                >
                  ✗
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
