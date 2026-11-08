'use client';

import React from 'react';
import { useGame } from '@/hooks/useGame';
import { PlayerLogin } from '@/components/PlayerLogin';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameBoard } from '@/components/GameBoard';
import { AnswerButtons } from '@/components/AnswerButtons';

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
    score,
    level,
    questionNumber,
    totalQuestions,
    feedbackMessage,
    startGame,
    selectAnswer,
    submitAnswer,
    retryFetch,
    exitToWelcome,
  } = useGame();

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-br from-rose-50 via-white to-orange-50">
      {/* Screen 1: Welcome / Player Identification Screen */}
      {screen === 'welcome' && (
        <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
          <PlayerLogin onStartGame={startGame} />
        </div>
      )}

      {/* Screen 2: Active Gameplay Screen */}
      {screen === 'playing' && (
        <div className="w-full max-w-2xl flex-1 flex flex-col items-center justify-start space-y-5 my-auto">
          {/* Top Score & Identity Dashboard */}
          <ScoreBoard
            username={username}
            score={score}
            level={level}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            onExit={exitToWelcome}
          />

          {/* Central Puzzle Image Area */}
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
            isDisabled={isLoading || error !== null || hasAnsweredCorrectly}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {/* Persistent Academic Concept Demonstration Footer */}
      <footer className="w-full max-w-3xl mt-6 pt-4 border-t border-rose-100 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-xs">
            🌱 <strong>Phase 3:</strong> Basic Gameplay
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-xs">
            👤 <strong>Virtual Identity:</strong> {username ? `Active (${username})` : 'Awaiting Login'}
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-xs">
            ⚡ <strong>Event-Driven:</strong> Select &amp; Submit Handlers
          </span>
          <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-xs">
            🌐 <strong>Interoperability:</strong> Banana API
          </span>
        </div>
      </footer>
    </main>
  );
}
