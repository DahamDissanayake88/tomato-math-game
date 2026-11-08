'use client';

import React, { useState, useEffect } from 'react';
import { GameBoard } from '@/components/GameBoard';
import { fetchRandomPuzzle } from '@/services/bananaApi';
import { Puzzle } from '@/types/game';

export default function Home() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState<number>(0);
  const [lastFetchTime, setLastFetchTime] = useState<string | null>(null);

  const loadPuzzle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newPuzzle = await fetchRandomPuzzle({ retries: 2, retryDelayMs: 800 });
      setPuzzle(newPuzzle);
      setFetchCount((prev) => prev + 1);
      setLastFetchTime(new Date().toLocaleTimeString());
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve puzzle from Banana API');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPuzzle();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 bg-gradient-to-br from-rose-50 via-white to-orange-50">
      {/* Header & Concept Badges */}
      <div className="w-full max-w-3xl mb-6 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-700 text-xs sm:text-sm font-bold rounded-full shadow-sm">
          <span>🍅</span>
          <span>Phase 2: Banana API Integration &amp; Interoperability</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Tomato Math Puzzle Game
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Connected live to the University of Bedfordshire Banana API. Demonstrating HTTP request/response, CSV parsing, and Base64 image decoding.
        </p>
      </div>

      {/* Main Puzzle Display */}
      <div className="w-full max-w-2xl space-y-6">
        <GameBoard
          puzzle={puzzle}
          isLoading={isLoading}
          error={error}
          onRetry={loadPuzzle}
          feedbackMessage={
            puzzle && !isLoading
              ? {
                  text: 'What is the missing value for the tomato? (Select 0–9 in Phase 3)',
                  type: 'info',
                }
              : null
          }
        />

        {/* Action Controls & Interoperability Details */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-rose-100 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Interoperability Status
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isLoading ? 'bg-amber-400 animate-ping' : error ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                />
                <span className="text-sm font-bold text-slate-700">
                  {isLoading
                    ? 'Fetching from Banana API...'
                    : error
                    ? 'Connection Error'
                    : 'Online & Synchronized'}
                </span>
              </div>
            </div>

            <button
              onClick={loadPuzzle}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 active:scale-95 text-white font-bold rounded-2xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🔄</span>
              <span>{isLoading ? 'Loading...' : 'Fetch Another Puzzle'}</span>
            </button>
          </div>

          {/* Telemetry / Concept Demonstration Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <span className="font-semibold text-slate-500 block mb-1">API Provider:</span>
              <span className="font-mono text-slate-800 break-all text-[11px]">marcconrad.com/uob</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <span className="font-semibold text-slate-500 block mb-1">Payload Format:</span>
              <span className="font-mono text-slate-800 text-[11px]">CSV (Base64 PNG + Solution)</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <span className="font-semibold text-slate-500 block mb-1">Puzzles Retrieved:</span>
              <span className="font-mono font-bold text-rose-600 text-sm">
                {fetchCount} {lastFetchTime && `(${lastFetchTime})`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
