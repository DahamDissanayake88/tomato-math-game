import React from 'react';
import { GameStats } from '@/types/game';

interface GameOverProps {
  username: string;
  stats: GameStats;
  highestLevel: number;
  onPlayAgain: () => void;
  onReturnHome: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  username,
  stats,
  highestLevel,
  onPlayAgain,
  onReturnHome,
}) => {
  // Performance tier and celebratory badge
  const getPerformanceFeedback = (accuracy: number) => {
    if (accuracy >= 90) {
      return {
        badge: '🏆 Grandmaster',
        title: 'Outstanding Mathematical Genius!',
        desc: 'Incredible speed, accuracy, and deductive prowess. You conquered the tomato equations!',
        color: 'from-amber-400 to-yellow-500 text-slate-900',
      };
    }
    if (accuracy >= 70) {
      return {
        badge: '🥇 Champion',
        title: 'Master Deductor!',
        desc: 'Superb problem-solving! You solved the majority of puzzles with great precision.',
        color: 'from-emerald-500 to-teal-600 text-white',
      };
    }
    if (accuracy >= 50) {
      return {
        badge: '🥈 Skilled Solver',
        title: 'Great Effort!',
        desc: 'Solid arithmetic skills! A little more speed and practice will take you to Level 4+.',
        color: 'from-sky-500 to-indigo-600 text-white',
      };
    }
    return {
      badge: '🍅 Math Apprentice',
      title: 'Good Practice Session!',
      desc: 'Each puzzle strengthens your mental arithmetic. Challenge yourself again to boost your score!',
      color: 'from-rose-500 to-orange-500 text-white',
    };
  };

  const performance = getPerformanceFeedback(stats.accuracy);

  return (
    <div className="w-full max-w-xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-rose-200/80 animate-pop-in space-y-6 sm:space-y-8">
      {/* Top Trophy & Congratulations */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-amber-300 via-yellow-400 to-orange-400 rounded-3xl text-4xl sm:text-5xl shadow-xl shadow-amber-400/30 animate-bounce mx-auto">
          🏁
        </div>

        <div className="space-y-1">
          <span className="inline-block px-3.5 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full uppercase tracking-wider">
            {performance.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            Game Completed!
          </h2>
          <p className="text-sm font-bold text-rose-600">
            Player Session: <span className="underline decoration-rose-300 font-black">{username}</span>
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
          {performance.desc}
        </p>
      </div>

      {/* Main Score & Accuracy Hero Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Score Card */}
        <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-3xl p-5 text-white text-center shadow-xl shadow-emerald-600/25 border-2 border-emerald-400">
          <span className="block text-[11px] font-black uppercase tracking-wider text-emerald-100">
            Final Score
          </span>
          <span className="text-4xl sm:text-5xl font-black block my-1">
            {stats.score}
          </span>
          <span className="text-[11px] text-emerald-100 font-semibold">
            Out of 100 Points
          </span>
        </div>

        {/* Accuracy Card */}
        <div className="bg-gradient-to-br from-rose-500 via-rose-600 to-orange-500 rounded-3xl p-5 text-white text-center shadow-xl shadow-rose-600/25 border-2 border-rose-400">
          <span className="block text-[11px] font-black uppercase tracking-wider text-rose-100">
            Accuracy
          </span>
          <span className="text-4xl sm:text-5xl font-black block my-1">
            {stats.accuracy}%
          </span>
          <span className="text-[11px] text-rose-100 font-semibold">
            Success Rate
          </span>
        </div>
      </div>

      {/* Detailed Statistical Performance Grid */}
      <div className="bg-white/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-inner space-y-3">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider text-left">
          Session Statistics Breakdown
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <span className="block text-[10px] font-black text-slate-400 uppercase">Puzzles</span>
            <span className="text-lg font-black text-slate-800">{stats.totalQuestions}</span>
          </div>

          <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200">
            <span className="block text-[10px] font-black text-emerald-600 uppercase">Correct</span>
            <span className="text-lg font-black text-emerald-700">✅ {stats.correctAnswers}</span>
          </div>

          <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-200">
            <span className="block text-[10px] font-black text-rose-600 uppercase">Incorrect</span>
            <span className="text-lg font-black text-rose-700">❌ {stats.incorrectAnswers}</span>
          </div>

          <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200">
            <span className="block text-[10px] font-black text-amber-600 uppercase">Timed Out</span>
            <span className="text-lg font-black text-amber-700">⏰ {stats.timedOutAnswers}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs text-slate-600 font-semibold">
          <span>Highest Difficulty Level Reached:</span>
          <span className="font-black text-amber-600 text-sm flex items-center gap-1">
            <span>⭐</span> Level {highestLevel}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onPlayAgain}
          className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🔁</span>
          <span>Play Again</span>
        </button>

        <button
          type="button"
          onClick={onReturnHome}
          className="flex-1 py-4 px-6 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-black rounded-2xl transition-all cursor-pointer border-2 border-slate-200 flex items-center justify-center gap-2 shadow-xs"
        >
          <span>🏠</span>
          <span>Return Home</span>
        </button>
      </div>
    </div>
  );
};
