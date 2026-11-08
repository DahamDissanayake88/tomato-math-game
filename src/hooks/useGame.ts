import { useState, useCallback } from 'react';
import { Puzzle, GameScreen, FeedbackMessage } from '@/types/game';
import { fetchRandomPuzzle } from '@/services/bananaApi';
import {
  validateAnswer,
  calculateNewScore,
  calculateLevel,
  TOTAL_GAME_QUESTIONS,
} from '@/utils/gameLogic';

export function useGame() {
  const [screen, setScreen] = useState<GameScreen>('welcome');
  const [username, setUsername] = useState<string>('');
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState<boolean>(false);

  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);

  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage | null>(null);

  /**
   * Loads a fresh puzzle from the Banana API.
   */
  const loadNextPuzzle = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSelectedAnswer(null);
    setHasAnsweredCorrectly(false);

    try {
      const newPuzzle = await fetchRandomPuzzle({ retries: 2, retryDelayMs: 600 });
      setPuzzle(newPuzzle);
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve puzzle from Banana API');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Starts a new game session with the entered player username.
   */
  const startGame = useCallback((newUsername: string) => {
    setUsername(newUsername);
    setScore(0);
    setLevel(1);
    setQuestionNumber(1);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setFeedbackMessage(null);
    setSelectedAnswer(null);
    setHasAnsweredCorrectly(false);
    setScreen('playing');

    // Fetch initial puzzle
    loadNextPuzzle();
  }, [loadNextPuzzle]);

  /**
   * Event handler for selecting an answer (0-9).
   */
  const selectAnswer = useCallback((digit: number) => {
    if (hasAnsweredCorrectly || isSubmitting) return;
    setSelectedAnswer(digit);
  }, [hasAnsweredCorrectly, isSubmitting]);

  /**
   * Event handler for validating and submitting an answer.
   */
  const submitAnswer = useCallback(async () => {
    if (selectedAnswer === null || !puzzle || isSubmitting || hasAnsweredCorrectly) {
      return;
    }

    setIsSubmitting(true);

    const isCorrect = validateAnswer(selectedAnswer, puzzle.solution);

    if (isCorrect) {
      // Correct answer: award 10 points and prevent duplicate score awards
      setHasAnsweredCorrectly(true);
      const newScore = calculateNewScore(score, true);
      const newCorrectCount = correctAnswers + 1;
      const newLevel = calculateLevel(newCorrectCount);

      setScore(newScore);
      setCorrectAnswers(newCorrectCount);
      setLevel(newLevel);

      setFeedbackMessage({
        text: `Correct! ${puzzle.solution} is the right tomato value (+10 points) 🎉`,
        type: 'success',
      });

      // Advance to next question after positive feedback display
      setTimeout(() => {
        setFeedbackMessage(null);
        setQuestionNumber((prev) => prev + 1);
        setIsSubmitting(false);
        loadNextPuzzle();
      }, 1200);
    } else {
      // Incorrect answer: no score increase, allow another attempt while time remains
      setIncorrectAnswers((prev) => prev + 1);
      setFeedbackMessage({
        text: `Oops! ${selectedAnswer} is not correct. Try again! 🤔`,
        type: 'error',
      });
      setIsSubmitting(false);
    }
  }, [
    selectedAnswer,
    puzzle,
    isSubmitting,
    hasAnsweredCorrectly,
    score,
    correctAnswers,
    loadNextPuzzle,
  ]);

  /**
   * Resets session to welcome screen.
   */
  const exitToWelcome = useCallback(() => {
    setScreen('welcome');
    setPuzzle(null);
    setSelectedAnswer(null);
    setFeedbackMessage(null);
  }, []);

  return {
    screen,
    username,
    puzzle,
    isLoading,
    error,
    selectedAnswer,
    isSubmitting,
    hasAnsweredCorrectly,
    score,
    level,
    questionNumber,
    totalQuestions: TOTAL_GAME_QUESTIONS,
    correctAnswers,
    incorrectAnswers,
    feedbackMessage,
    startGame,
    selectAnswer,
    submitAnswer,
    retryFetch: loadNextPuzzle,
    exitToWelcome,
  };
}
