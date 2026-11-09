import React from 'react';

interface TimerProps {
  timeLeft: number;
  maxTime: number;
  isPaused: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, maxTime, isPaused }) => {
  const percentage = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));
  const isUrgent = timeLeft <= 5;
  const isWarning = timeLeft <= 10 && !isUrgent;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-3 sm:p-4 shadow-md border-2 border-slate-100 space-y-2">
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
        <div className="flex items-center gap-1.5 text-slate-600">
          <span className={`text-base ${isUrgent ? 'animate-bounce' : ''}`}>⏱️</span>
          <span>Time Remaining</span>
          {isPaused && (
            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md ml-1">
              Paused
            </span>
          )}
        </div>

        <div
          className={`font-mono text-base sm:text-lg font-extrabold transition-colors ${
            isUrgent
              ? 'text-rose-600 animate-pulse'
              : isWarning
              ? 'text-amber-600'
              : 'text-emerald-600'
          }`}
        >
          {timeLeft}s
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            isUrgent
              ? 'bg-rose-500 shadow-sm shadow-rose-500'
              : isWarning
              ? 'bg-amber-400'
              : 'bg-emerald-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
