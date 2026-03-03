'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '@/hooks/useGame';
import { CategoryMenu } from '@/components/CategoryMenu';
import { QuestionCard } from '@/components/QuestionCard';
import { Timer } from '@/components/Timer';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameOver } from '@/components/GameOver';

const TIME_PER_QUESTION = 15;

export function Game() {
  const {
    gameStatus,
    currentQuestion,
    startGame,
    submitAnswer,
    nextQuestion,
    resetGame,
  } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <AnimatePresence mode="wait">
        {gameStatus.state === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-4"
          >
            <CategoryMenu onSelectCategory={startGame} />
          </motion.div>
        )}

        {gameStatus.state === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center min-h-screen p-4 gap-6"
          >
            <div className="w-full max-w-2xl mt-4">
              <ScoreBoard
                score={gameStatus.score}
                streak={gameStatus.streak}
                questionNumber={gameStatus.currentQuestionIndex + 1}
                totalQuestions={gameStatus.questions.length}
                highScore={gameStatus.highScore}
              />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={gameStatus.selectedAnswer}
                isAnswered={gameStatus.isAnswered}
                onAnswer={submitAnswer}
              />
            </div>

            <div className="mb-4">
              <Timer timeLeft={gameStatus.timeLeft} maxTime={TIME_PER_QUESTION} />
            </div>

            {gameStatus.isAnswered && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={nextQuestion}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-bold text-lg text-black hover:scale-105 transition-transform mb-8"
              >
                {gameStatus.currentQuestionIndex >= gameStatus.questions.length - 1
                  ? 'See Results'
                  : 'Next Question'}
              </motion.button>
            )}
          </motion.div>
        )}

        {gameStatus.state === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-4"
          >
            <GameOver
              score={gameStatus.score}
              highScore={gameStatus.highScore}
              totalQuestions={gameStatus.questions.length}
              onPlayAgain={() => startGame(gameStatus.category)}
              onMainMenu={resetGame}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
