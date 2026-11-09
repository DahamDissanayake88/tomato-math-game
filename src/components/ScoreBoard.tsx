import React from 'react';

interface ScoreBoardProps {
  username: string;
  score: number;
  level: number;
  questionNumber: number;
  totalQuestions: number;
  onExit?: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  username,
  score,
  level,
  questionNumber,
  totalQuestions,
  onExit,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-3xl p-3.5 sm:p-5 shadow-xl border-2 border-rose-200/80 space-y-3">
      {/* Top Identity & Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Player Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-600 to-orange-500 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md shadow-rose-500/30">
            {username ? username.charAt(0).toUpperCase() : 'P'}
          </div>
          <div className="text-left">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-400 block">
              Current Player
            </span>
            <span className="font-black text-slate-800 text-sm sm:text-base truncate max-w-[130px] sm:max-w-[200px] block">
              {username || 'Guest'}
            </span>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Level Pill */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 px-3 py-1 sm:py-1.5 rounded-2xl text-center shadow-2xs">
            <span className="block text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-600">
              Level
            </span>
            <span className="font-black text-amber-800 text-xs sm:text-sm flex items-center justify-center gap-1">
              <span>⭐</span> {level}
            </span>
          </div>

          {/* Score Pill */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 px-3.5 py-1 sm:py-1.5 rounded-2xl text-center shadow-2xs">
            <span className="block text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-600">
              Score
            </span>
            <span className="font-black text-emerald-800 text-xs sm:text-sm">
              {score} pts
            </span>
          </div>

          {/* Exit Action */}
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              title="Quit to Welcome Screen"
              className="p-2 sm:p-2.5 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition-all border border-transparent hover:border-rose-200 cursor-pointer"
            >
              <span className="text-base font-bold">✕</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Progress Bar Row */}
      <div className="space-y-1.5 pt-1 border-t border-rose-100/80">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
          <span>Question Progress</span>
          <span className="font-mono text-slate-700 font-extrabold">
            {questionNumber} / {totalQuestions}
          </span>
        </div>

        {/* Segmented Dots or Progress Bar */}
        <div className="grid grid-cols-10 gap-1 sm:gap-1.5 w-full">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const isCompleted = index < questionNumber - 1;
            const isCurrent = index === questionNumber - 1;
            return (
              <div
                key={index}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-rose-600 ring-2 ring-rose-300 ring-offset-1 scale-105'
                    : isCompleted
                    ? 'bg-emerald-500'
                    : 'bg-slate-200'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
