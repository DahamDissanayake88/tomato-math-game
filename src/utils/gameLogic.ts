/**
 * Pure game logic and mathematical calculations for the Tomato Math Game.
 * Keeping business logic strictly separated from UI components.
 */

export const POINTS_PER_CORRECT_ANSWER = 10;
export const CORRECT_ANSWERS_PER_LEVEL = 5;
export const TOTAL_GAME_QUESTIONS = 10;

/**
 * Validates whether the player's selected numerical answer matches the puzzle solution.
 */
export function validateAnswer(selectedAnswer: number, correctSolution: number): boolean {
  return selectedAnswer === correctSolution;
}

/**
 * Calculates updated score after an answer attempt.
 * Correct answers award 10 points; incorrect answers award 0 additional points.
 */
export function calculateNewScore(currentScore: number, isCorrect: boolean): number {
  if (isCorrect) {
    return currentScore + POINTS_PER_CORRECT_ANSWER;
  }
  return currentScore;
}

/**
 * Calculates player level based on total correct answers.
 * Initial rule: Every 5 correctly answered questions increases the level by 1.
 * 0-4 correct -> Level 1
 * 5-9 correct -> Level 2
 * 10-14 correct -> Level 3, etc.
 */
export function calculateLevel(correctAnswersCount: number): number {
  return Math.floor(correctAnswersCount / CORRECT_ANSWERS_PER_LEVEL) + 1;
}

/**
 * Returns the countdown duration (in seconds) based on current level.
 * Level 1: 30s
 * Level 2: 25s
 * Level 3: 20s
 * Level 4+: 15s
 */
export function getTimerDurationForLevel(level: number): number {
  switch (level) {
    case 1:
      return 30;
    case 2:
      return 25;
    case 3:
      return 20;
    default:
      return 15;
  }
}

/**
 * Calculates accuracy percentage based on correct answers and total questions answered.
 * Formula: (Correct answers / Total questions) * 100
 */
export function calculateAccuracy(correctCount: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  const accuracy = (correctCount / totalQuestions) * 100;
  return Math.round(accuracy * 10) / 10;
}

/**
 * Validates player username for the virtual identity requirement.
 */
export function validateUsername(username: string): { isValid: boolean; error?: string } {
  const trimmed = username.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Username cannot be empty. Please enter a nickname.' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Username must be at least 2 characters long.' };
  }
  if (trimmed.length > 20) {
    return { isValid: false, error: 'Username must not exceed 20 characters.' };
  }
  return { isValid: true };
}
