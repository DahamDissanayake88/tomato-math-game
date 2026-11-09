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
  // Performance rating based on accuracy
  const getPerformanceFeedback = (accuracy: number) => {
    if (accuracy >= 90) return { title: 'Tomato Grandmaster! 🏆', desc: 'Outstanding mathematical deduction and rapid speed!' };
    if (accuracy >= 70) return { title: 'Math Champion! 🥇', desc: 'Great precision and solid problem-solving!' };
    if (accuracy >= 50) return { title: 'Good Effort! 🥈', desc: 'Good arithmetic instincts. Keep practicing!' };
    return { title: 'Keep Trying! 🍅', desc: 'Every puzzle sharpens your math skills. Try another round!' };
  };

  const feedback = getPerformanceFeedback(stats.accuracy);

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-rose-100 space-y-6">
      {/* Trophy & Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-amber-200 to-orange-100 rounded-3xl text-4xl shadow-inner animate-bounce">
          🏁
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Game Completed!
        </h2>
        <p className="text-sm font-semibold text-rose-600">
          Well played, <span className="underline decoration-rose-300 font-extrabold">{username}</span>!
        </p>
        <div className="inline-block px-4 py-1.5 bg-rose-50 text-rose-800 text-xs font-bold rounded-full border border-rose-200/80 mt-1">
          {feedback.title} — {feedback.desc}
        </div>
      </div>

      {/* Main Score & Accuracy Highlights */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white text-center shadow-lg shadow-emerald-500/20">
          <span className="block text-xs font-bold uppercase tracking-wider text-emerald-100">
            Final Score
          </span>
          <span className="text-4xl sm:text-5xl font-black block my-1">
            {stats.score}
          </span>
          <span className="text-[11px] text-emerald-100 font-medium">
            Points Earned
          </span>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-3xl p-5 text-white text-center shadow-lg shadow-rose-500/20">
          <span className="block text-xs font-bold uppercase tracking-wider text-rose-100">
            Accuracy
          </span>
          <span className="text-4xl sm:text-5xl font-black block my-1">
            {stats.accuracy}%
          </span>
          <span className="text-[11px] text-rose-100 font-medium">
            Success Rate
          </span>
        </div>
      </div>

      {/* Detailed Game Statistics Breakdown */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Performance Breakdown
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Total Questions</span>
            <span className="text-lg font-black text-slate-700">{stats.totalQuestions}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="block text-[10px] font-bold text-emerald-600 uppercase">Correct</span>
            <span className="text-lg font-black text-emerald-700">✅ {stats.correctAnswers}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-rose-200 shadow-2xs">
            <span className="block text-[10px] font-bold text-rose-600 uppercase">Incorrect</span>
            <span className="text-lg font-black text-rose-700">❌ {stats.incorrectAnswers}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs">
            <span className="block text-[10px] font-bold text-amber-600 uppercase">Timed Out</span>
            <span className="text-lg font-black text-amber-700">⏰ {stats.timedOutAnswers}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs text-slate-600 font-medium">
          <span>Highest Level Achieved:</span>
          <span className="font-extrabold text-amber-600 text-sm">Level {highestLevel} ⭐</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onPlayAgain}
          className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🔁</span>
          <span>Play Again</span>
        </button>

        <button
          type="button"
          onClick={onReturnHome}
          className="flex-1 py-4 px-6 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-extrabold rounded-2xl transition-all cursor-pointer border border-slate-300 flex items-center justify-center gap-2"
        >
          <span>🏠</span>
          <span>Return Home</span>
        </button>
      </div>
    </div>
  );
};
