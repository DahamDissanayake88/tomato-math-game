/**
 * Type definitions for the Enhanced Tomato Math Puzzle Game.
 */

export interface Puzzle {
  id?: string;
  imageUrl: string;
  solution: number;
}

export interface PlayerSession {
  username: string;
  startedAt: number;
}

export interface GameStats {
  score: number;
  level: number;
  questionNumber: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timedOutAnswers: number;
  accuracy: number;
}

export type GameScreen = 'welcome' | 'playing' | 'results';

export interface AnswerSubmissionResult {
  isCorrect: boolean;
  scoreAdded: number;
  previousScore: number;
  newScore: number;
  correctSolution: number;
  isLevelUp: boolean;
  newLevel: number;
}
