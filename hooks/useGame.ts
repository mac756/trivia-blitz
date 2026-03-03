'use client';

import { useState, useEffect, useCallback } from 'react';
import { Question, getQuestionsByCategory, getRandomQuestions } from '@/lib/questions';

export type GameState = 'menu' | 'playing' | 'finished';

export interface GameStatus {
  state: GameState;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  streak: number;
  timeLeft: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  category: string | null;
  highScore: number;
}

const TIME_PER_QUESTION = 15;
const QUESTIONS_PER_GAME = 10;

export function useGame() {
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    state: 'menu',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    timeLeft: TIME_PER_QUESTION,
    selectedAnswer: null,
    isAnswered: false,
    category: null,
    highScore: 0,
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const currentQuestion = gameStatus.questions[gameStatus.currentQuestionIndex];

  const startGame = useCallback((category: string | null = null) => {
    const newQuestions = category 
      ? getQuestionsByCategory(category).slice(0, QUESTIONS_PER_GAME)
      : getRandomQuestions(QUESTIONS_PER_GAME);
    
    setGameStatus(prev => ({
      ...prev,
      state: 'playing',
      questions: newQuestions,
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      timeLeft: TIME_PER_QUESTION,
      selectedAnswer: null,
      isAnswered: false,
      category,
    }));
  }, []);

  const submitAnswer = useCallback((answerIndex: number) => {
    if (gameStatus.isAnswered || !currentQuestion) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const timeBonus = Math.floor(gameStatus.timeLeft * 10);
    const streakBonus = gameStatus.streak * 50;
    const points = isCorrect ? 100 + timeBonus + streakBonus : 0;

    setGameStatus(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswered: true,
      score: prev.score + points,
      streak: isCorrect ? prev.streak + 1 : 0,
    }));

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  }, [gameStatus.isAnswered, currentQuestion, gameStatus.timeLeft, gameStatus.streak, timer]);

  const nextQuestion = useCallback(() => {
    if (gameStatus.currentQuestionIndex >= gameStatus.questions.length - 1) {
      setGameStatus(prev => ({
        ...prev,
        state: 'finished',
        highScore: Math.max(prev.highScore, prev.score),
      }));
      return;
    }

    setGameStatus(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      timeLeft: TIME_PER_QUESTION,
      selectedAnswer: null,
      isAnswered: false,
    }));
  }, [gameStatus.currentQuestionIndex, gameStatus.questions.length]);

  const resetGame = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setGameStatus(prev => ({
      ...prev,
      state: 'menu',
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      timeLeft: TIME_PER_QUESTION,
      selectedAnswer: null,
      isAnswered: false,
      category: null,
    }));
  }, [timer]);

  useEffect(() => {
    if (gameStatus.state !== 'playing' || gameStatus.isAnswered) return;

    const newTimer = setTimeout(() => {
      setGameStatus(prev => {
        if (prev.timeLeft <= 1) {
          return {
            ...prev,
            isAnswered: true,
            streak: 0,
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1,
        };
      });
    }, 1000);

    setTimer(newTimer);

    return () => {
      if (newTimer) clearTimeout(newTimer);
    };
  }, [gameStatus.timeLeft, gameStatus.state, gameStatus.isAnswered]);

  return {
    gameStatus,
    currentQuestion,
    startGame,
    submitAnswer,
    nextQuestion,
    resetGame,
  };
}
