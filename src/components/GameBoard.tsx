import React from 'react';
import { Puzzle } from '@/types/game';

interface GameBoardProps {
  puzzle: Puzzle | null;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  feedbackMessage?: {
    text: string;
    type: 'success' | 'error' | 'info';
  } | null;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  puzzle,
  isLoading,
  error,
  onRetry,
  feedbackMessage,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Feedback Banner */}
      {feedbackMessage && (
        <div
          className={`w-full mb-4 px-4 py-3 rounded-2xl text-center font-bold text-sm sm:text-base transition-all duration-300 shadow-md ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
              : feedbackMessage.type === 'error'
              ? 'bg-rose-100 text-rose-800 border-2 border-rose-300'
              : 'bg-amber-100 text-amber-800 border-2 border-amber-300'
          }`}
        >
          {feedbackMessage.text}
        </div>
      )}

      {/* Main Puzzle Card */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-6 shadow-xl border-4 border-rose-100 relative min-h-[300px] sm:min-h-[380px] flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
            <p className="text-slate-600 font-semibold text-sm sm:text-base animate-pulse">
              Retrieving puzzle from Banana API...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-md">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-2xl font-bold">
              ⚠️
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-lg">Unable to Load Puzzle</h3>
              <p className="text-xs sm:text-sm text-slate-500">{error}</p>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
              >
                🔄 Try Again
              </button>
            )}
          </div>
        ) : puzzle ? (
          <div className="w-full flex flex-col items-center justify-center">
            {/* The Banana API Puzzle Image */}
            <div className="relative w-full flex items-center justify-center bg-slate-50/50 rounded-2xl p-2 border border-slate-100">
              <img
                src={puzzle.imageUrl}
                alt="Tomato Math Puzzle"
                className="max-h-[320px] sm:max-h-[380px] w-auto max-w-full object-contain rounded-xl select-none"
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <div className="text-slate-400 font-medium">No puzzle loaded.</div>
        )}
      </div>
    </div>
  );
};
