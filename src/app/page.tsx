'use client';

import React from 'react';
import { useGame } from '@/hooks/useGame';
import { PlayerLogin } from '@/components/PlayerLogin';
import { ScoreBoard } from '@/components/ScoreBoard';
import { Timer } from '@/components/Timer';
import { GameBoard } from '@/components/GameBoard';
import { AnswerButtons } from '@/components/AnswerButtons';
import { GameOver } from '@/components/GameOver';
import { LevelIndicator } from '@/components/LevelIndicator';

export default function Home() {
  const {
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
    totalQuestions,
    feedbackMessage,
    timeLeft,
    maxTime,
    isTimerPaused,
    levelUpNotification,
    startGame,
    selectAnswer,
    submitAnswer,
    retryFetch,
    dismissLevelUp,
    playAgain,
    returnHome,
  } = useGame();

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-br from-rose-50 via-white to-orange-50 select-none">
      {/* Level-Up Celebration Modal */}
      <LevelIndicator
        currentLevel={level}
        levelUpNotification={levelUpNotification}
        onDismissNotification={dismissLevelUp}
      />

      {/* Screen 1: Welcome / Player Identification Screen */}
      {screen === 'welcome' && (
        <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
          <PlayerLogin onStartGame={startGame} />
        </div>
      )}

      {/* Screen 2: Active Gameplay Screen */}
      {screen === 'playing' && (
        <div className="w-full max-w-2xl flex-1 flex flex-col items-center justify-start space-y-4 sm:space-y-5 my-auto">
          {/* Top Score & Identity Dashboard */}
          <ScoreBoard
            username={username}
            score={score}
            level={level}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            onExit={returnHome}
          />

          {/* Prominent Countdown Timer */}
          <Timer
            timeLeft={timeLeft}
            maxTime={maxTime}
            isPaused={isTimerPaused || isLoading}
          />

          {/* Central Puzzle Image Display Area */}
          <GameBoard
            puzzle={puzzle}
            isLoading={isLoading}
            error={error}
            onRetry={retryFetch}
            feedbackMessage={feedbackMessage}
          />

          {/* 0-9 Answer Selection Keypad & Submit */}
          <AnswerButtons
            selectedAnswer={selectedAnswer}
            onSelectAnswer={selectAnswer}
            onSubmitAnswer={submitAnswer}
            isDisabled={isLoading || error !== null || hasAnsweredCorrectly || isQuestionEnded}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {/* Screen 3: Results / Game Completion Screen */}
      {screen === 'results' && (
        <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
          <GameOver
            username={username}
            stats={stats}
            highestLevel={highestLevel}
            onPlayAgain={playAgain}
            onReturnHome={returnHome}
          />
        </div>
      )}

      {/* Persistent Academic Concept Demonstration Footer */}
      <footer className="w-full max-w-3xl mt-6 pt-4 border-t border-rose-100 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
            🍅 <strong>Phase 4:</strong> Complete Lifecycle
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
            👤 <strong>Virtual Identity:</strong> {username || 'Guest'}
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
            ⏱️ <strong>Timer:</strong> {maxTime}s/Q
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
            ⭐ <strong>Level:</strong> {level}
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
            🌐 <strong>Banana API:</strong> Live
          </span>
        </div>
      </footer>
    </main>
  );
}
