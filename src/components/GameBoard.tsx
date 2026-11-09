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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center animate-pop-in">
      {/* Animated Feedback Banner */}
      {feedbackMessage && (
        <div
          className={`w-full mb-3 px-4 py-3 rounded-2xl text-center font-extrabold text-sm sm:text-base transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
            feedbackMessage.type === 'success'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/25 animate-pop-in'
              : feedbackMessage.type === 'error'
              ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-rose-500/25 animate-wiggle'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/25'
          }`}
        >
          <span>
            {feedbackMessage.type === 'success'
              ? '✨'
              : feedbackMessage.type === 'error'
              ? '❌'
              : 'ℹ️'}
          </span>
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Main Puzzle Showcase Card */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-rose-100/90 relative min-h-[300px] sm:min-h-[380px] flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl animate-pulse">
                🍅
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-slate-700 font-extrabold text-sm sm:text-base">
                Fetching Banana API Puzzle...
              </p>
              <p className="text-xs text-slate-400 font-medium">
                Decoding Base64 mathematical equations
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-md animate-pop-in">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center text-3xl font-black shadow-inner">
              ⚠️
            </div>
            <div className="space-y-1.5">
              <h3 className="font-black text-slate-800 text-lg sm:text-xl">
                Banana API Unavailable
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                {error}
              </p>
            </div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>🔄</span>
                <span>Retry Connection</span>
              </button>
            )}
          </div>
        ) : puzzle ? (
          <div className="w-full flex flex-col items-center justify-center">
            {/* The Original Banana API Puzzle Image without Distortion */}
            <div className="relative w-full flex items-center justify-center bg-slate-50/60 rounded-2xl p-2 sm:p-3 border border-slate-100 shadow-inner">
              <img
                src={puzzle.imageUrl}
                alt="Tomato Math Puzzle equation"
                className="max-h-[300px] sm:max-h-[360px] w-auto max-w-full object-contain rounded-xl select-none"
                draggable={false}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium mt-2">
              University of Bedfordshire Banana API (Live Stream)
            </span>
          </div>
        ) : (
          <div className="text-slate-400 font-bold">No active puzzle.</div>
        )}
      </div>
    </div>
  );
};
