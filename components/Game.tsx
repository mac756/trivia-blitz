'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useCallback } from 'react';
import { useGame } from '@/hooks/useGame';
import { CategoryMenu } from '@/components/CategoryMenu';
import { QuestionCard } from '@/components/QuestionCard';
import { Timer } from '@/components/Timer';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameOver } from '@/components/GameOver';
import { ControlsIndicator } from '@/components/ControlsIndicator';
import { LevelProgress } from '@/components/LevelProgress';

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

  // Keyboard controls handler
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (gameStatus.state !== 'playing' || !currentQuestion) return;

    const key = event.key.toLowerCase();
    
    // Answer selection (1-4 or a-d)
    if (!gameStatus.isAnswered) {
      const answerMap: { [key: string]: number } = {
        '1': 0, 'a': 0,
        '2': 1, 'b': 1,
        '3': 2, 'c': 2,
        '4': 3, 'd': 3,
      };
      
      if (key in answerMap) {
        event.preventDefault();
        submitAnswer(answerMap[key]);
      }
    } else {
      // Next question (Space or Enter)
      if (key === ' ' || key === 'enter') {
        event.preventDefault();
        nextQuestion();
      }
    }
  }, [gameStatus.state, gameStatus.isAnswered, currentQuestion, submitAnswer, nextQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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

            <div className="w-full max-w-2xl">
              <LevelProgress 
                currentLevel={Math.floor(gameStatus.currentQuestionIndex / 3) + 1}
                totalLevels={Math.ceil(gameStatus.questions.length / 3)}
                questionInLevel={(gameStatus.currentQuestionIndex % 3) + 1}
                questionsPerLevel={3}
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

            <ControlsIndicator 
              isAnswered={gameStatus.isAnswered}
              optionsCount={currentQuestion.options.length}
            />

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
