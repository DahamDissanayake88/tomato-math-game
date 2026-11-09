import { useState, useCallback, useEffect, useRef } from 'react';
import { Puzzle, GameScreen, FeedbackMessage, GameStats } from '@/types/game';
import { fetchRandomPuzzle } from '@/services/bananaApi';
import {
  validateAnswer,
  calculateNewScore,
  calculateLevel,
  getTimerDurationForLevel,
  calculateAccuracy,
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
  const [isQuestionEnded, setIsQuestionEnded] = useState<boolean>(false);

  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [highestLevel, setHighestLevel] = useState<number>(1);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [timedOutAnswers, setTimedOutAnswers] = useState<number>(0);

  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage | null>(null);

  // Timer states
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [maxTime, setMaxTime] = useState<number>(30);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  // Level Up modal notification
  const [levelUpNotification, setLevelUpNotification] = useState<{
    show: boolean;
    level: number;
    timerDuration: number;
  } | null>(null);

  // Ref to hold current timer interval ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer helper
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * Completes the current game session and navigates to the results screen.
   */
  const finishGame = useCallback(() => {
    clearTimer();
    setScreen('results');
  }, [clearTimer]);

  /**
   * Loads a fresh puzzle from the Banana API and resets question-level states.
   */
  const loadNextPuzzle = useCallback(async (currentQuestionLevel: number) => {
    clearTimer();
    setIsLoading(true);
    setError(null);
    setSelectedAnswer(null);
    setHasAnsweredCorrectly(false);
    setIsQuestionEnded(false);

    const questionDuration = getTimerDurationForLevel(currentQuestionLevel);
    setMaxTime(questionDuration);
    setTimeLeft(questionDuration);
    setIsTimerPaused(true); // paused while loading

    try {
      const newPuzzle = await fetchRandomPuzzle({ retries: 2, retryDelayMs: 600 });
      setPuzzle(newPuzzle);
      setIsTimerPaused(false); // unpause once puzzle is ready
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve puzzle from Banana API');
    } finally {
      setIsLoading(false);
    }
  }, [clearTimer]);

  /**
   * Handles timer tick and countdown expiration.
   */
  useEffect(() => {
    if (screen !== 'playing' || isTimerPaused || isLoading || isQuestionEnded || !puzzle) {
      clearTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimer();
  }, [screen, isTimerPaused, isLoading, isQuestionEnded, puzzle, clearTimer]);

  /**
   * Called when timer reaches zero.
   * Marks question as timed out, shows feedback, and advances or ends game.
   */
  const handleTimeExpired = useCallback(() => {
    clearTimer();
    setIsQuestionEnded(true);
    setTimedOutAnswers((prev) => prev + 1);

    const correctSolution = puzzle?.solution;
    setFeedbackMessage({
      text: `Time's up! The tomato value was ${correctSolution ?? '?'} ⏰`,
      type: 'error',
    });

    setTimeout(() => {
      setFeedbackMessage(null);
      if (questionNumber >= TOTAL_GAME_QUESTIONS) {
        finishGame();
      } else {
        setQuestionNumber((prev) => prev + 1);
        loadNextPuzzle(level);
      }
    }, 1500);
  }, [clearTimer, puzzle, questionNumber, level, finishGame, loadNextPuzzle]);

  /**
   * Starts a new game session with the entered player username.
   */
  const startGame = useCallback((newUsername: string) => {
    setUsername(newUsername);
    setScore(0);
    setLevel(1);
    setHighestLevel(1);
    setQuestionNumber(1);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setTimedOutAnswers(0);
    setFeedbackMessage(null);
    setSelectedAnswer(null);
    setHasAnsweredCorrectly(false);
    setIsQuestionEnded(false);
    setLevelUpNotification(null);
    setScreen('playing');

    loadNextPuzzle(1);
  }, [loadNextPuzzle]);

  /**
   * Event handler for selecting an answer (0-9).
   */
  const selectAnswer = useCallback((digit: number) => {
    if (hasAnsweredCorrectly || isSubmitting || isQuestionEnded) return;
    setSelectedAnswer(digit);
  }, [hasAnsweredCorrectly, isSubmitting, isQuestionEnded]);

  /**
   * Event handler for validating and submitting an answer.
   */
  const submitAnswer = useCallback(async () => {
    if (
      selectedAnswer === null ||
      !puzzle ||
      isSubmitting ||
      hasAnsweredCorrectly ||
      isQuestionEnded
    ) {
      return;
    }

    setIsSubmitting(true);
    const isCorrect = validateAnswer(selectedAnswer, puzzle.solution);

    if (isCorrect) {
      // Correct answer: freeze timer, award points, lock question
      clearTimer();
      setHasAnsweredCorrectly(true);
      setIsQuestionEnded(true);

      const newScore = calculateNewScore(score, true);
      const newCorrectCount = correctAnswers + 1;
      const newLevel = calculateLevel(newCorrectCount);

      setScore(newScore);
      setCorrectAnswers(newCorrectCount);

      const isLevelUp = newLevel > level;
      if (isLevelUp) {
        setLevel(newLevel);
        setHighestLevel((prev) => Math.max(prev, newLevel));
      }

      setFeedbackMessage({
        text: `Correct! ${puzzle.solution} is the right tomato value (+10 points) 🎉`,
        type: 'success',
      });

      // Handle level up notification or standard question advancement
      setTimeout(() => {
        if (isLevelUp) {
          const nextDuration = getTimerDurationForLevel(newLevel);
          setLevelUpNotification({
            show: true,
            level: newLevel,
            timerDuration: nextDuration,
          });
          setIsSubmitting(false);
        } else {
          advanceQuestion(newLevel);
        }
      }, 1200);
    } else {
      // Incorrect answer: allow another attempt while timer is running
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
    isQuestionEnded,
    clearTimer,
    score,
    correctAnswers,
    level,
  ]);

  /**
   * Advances to next question or displays the results screen after question 10.
   */
  const advanceQuestion = useCallback((currentLevel: number) => {
    setFeedbackMessage(null);
    setIsSubmitting(false);

    if (questionNumber >= TOTAL_GAME_QUESTIONS) {
      finishGame();
    } else {
      setQuestionNumber((prev) => prev + 1);
      loadNextPuzzle(currentLevel);
    }
  }, [questionNumber, finishGame, loadNextPuzzle]);

  /**
   * Dismisses the level up toast and resumes game progression.
   */
  const dismissLevelUp = useCallback(() => {
    setLevelUpNotification(null);
    advanceQuestion(level);
  }, [level, advanceQuestion]);

  /**
   * "Play Again" action: resets game state with the same username.
   */
  const playAgain = useCallback(() => {
    startGame(username);
  }, [startGame, username]);

  /**
   * "Return Home" action: resets game session and returns to welcome screen.
   */
  const returnHome = useCallback(() => {
    clearTimer();
    setScreen('welcome');
    setPuzzle(null);
    setSelectedAnswer(null);
    setFeedbackMessage(null);
    setLevelUpNotification(null);
    setUsername('');
  }, [clearTimer]);

  const stats: GameStats = {
    score,
    level,
    questionNumber,
    totalQuestions: TOTAL_GAME_QUESTIONS,
    correctAnswers,
    incorrectAnswers,
    timedOutAnswers,
    accuracy: calculateAccuracy(correctAnswers, TOTAL_GAME_QUESTIONS),
  };

  return {
    screen,
    username,
    puzzle,
    isLoading,
    error,
    selectedAnswer,
    isSubmitting,
    hasAnsweredCorrectly,
    isQuestionEnded,
    stats,
    score,
    level,
    highestLevel,
    questionNumber,
    totalQuestions: TOTAL_GAME_QUESTIONS,
    feedbackMessage,
    timeLeft,
    maxTime,
    isTimerPaused,
    levelUpNotification,
    startGame,
    selectAnswer,
    submitAnswer,
    retryFetch: () => loadNextPuzzle(level),
    dismissLevelUp,
    playAgain,
    returnHome,
  };
}
