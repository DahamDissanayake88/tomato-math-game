/**
 * Type definitions for the Enhanced Tomato Math Puzzle Game.
 */

export interface Puzzle {
  id?: string;
  imageUrl: string;
  solution: number;
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

export interface FeedbackMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}
