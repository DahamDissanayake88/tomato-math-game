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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-4 sm:p-5 shadow-lg border-2 border-rose-100 flex flex-wrap items-center justify-between gap-3">
      {/* Player Identity */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Player
          </div>
          <div className="font-extrabold text-slate-800 text-sm sm:text-base truncate max-w-[140px] sm:max-w-[180px]">
            {username}
          </div>
        </div>
      </div>

      {/* Stats Badges */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Level */}
        <div className="bg-rose-50 border border-rose-200/80 px-3 py-1.5 rounded-2xl text-center">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-rose-500">
            Level
          </span>
          <span className="font-extrabold text-rose-700 text-sm sm:text-base">
            ⭐ {level}
          </span>
        </div>

        {/* Score */}
        <div className="bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-2xl text-center">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600">
            Score
          </span>
          <span className="font-extrabold text-emerald-700 text-sm sm:text-base">
            {score} pts
          </span>
        </div>

        {/* Question Counter */}
        <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-2xl text-center">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Puzzle
          </span>
          <span className="font-extrabold text-slate-700 text-sm sm:text-base">
            {questionNumber}/{totalQuestions}
          </span>
        </div>

        {/* Exit / Change User button */}
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            title="Exit to Welcome Screen"
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-rose-200"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
