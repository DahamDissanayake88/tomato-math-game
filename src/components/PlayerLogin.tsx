import React, { useState } from 'react';
import { validateUsername } from '@/utils/gameLogic';

interface PlayerLoginProps {
  onStartGame: (username: string) => void;
}

export const PlayerLogin: React.FC<PlayerLoginProps> = ({ onStartGame }) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateUsername(username);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please enter a valid username');
      return;
    }
    setErrorMessage(null);
    onStartGame(username.trim());
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-rose-200/80 animate-pop-in space-y-6 sm:space-y-8">
      {/* Playful Header & Mascots */}
      <div className="text-center space-y-3">
        <div className="relative inline-block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-rose-500 via-rose-400 to-orange-400 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl shadow-xl shadow-rose-500/25 animate-float mx-auto">
            🍅
          </div>
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-amber-400 text-slate-900 font-black text-[10px] sm:text-xs rounded-full shadow-md uppercase tracking-wider">
            Web Edition
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            Tomato Math Game
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
            Enhanced Educational Puzzle • CIS046-3 Software for Enterprise
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="px-3 py-1 bg-rose-100/80 text-rose-800 text-xs font-bold rounded-full">
            🍌 Banana API Powered
          </span>
          <span className="px-3 py-1 bg-amber-100/80 text-amber-800 text-xs font-bold rounded-full">
            ⏱️ Countdown Timers
          </span>
          <span className="px-3 py-1 bg-emerald-100/80 text-emerald-800 text-xs font-bold rounded-full">
            ⭐ Level Progression
          </span>
        </div>
      </div>

      {/* Username Virtual Identity Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-left space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="username-input"
              className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>👤</span>
              <span>Player Username</span>
            </label>
            <span className="text-[11px] font-semibold text-slate-400">
              {username.trim().length}/20 chars
            </span>
          </div>

          <div className="relative">
            <input
              id="username-input"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="e.g. TomatoMaster"
              maxLength={20}
              autoFocus
              className={`w-full px-5 py-4 rounded-2xl border-2 font-bold text-slate-800 placeholder-slate-400 outline-none transition-all shadow-inner ${
                errorMessage
                  ? 'border-rose-400 bg-rose-50/70 focus:border-rose-500 ring-4 ring-rose-100'
                  : 'border-slate-200 bg-white/90 focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-100'
              }`}
            />
          </div>

          {errorMessage && (
            <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5 animate-wiggle">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 hover:from-rose-700 hover:to-orange-600 active:scale-[0.98] text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xl shadow-rose-500/30 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
        >
          <span>Play Now</span>
          <span className="transition-transform group-hover:translate-x-1">🚀</span>
        </button>
      </form>

      {/* How to Play Guide Card */}
      <div className="bg-gradient-to-br from-rose-50/80 to-orange-50/60 rounded-2xl p-4 sm:p-5 border border-rose-200/60 text-left space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-2">
          <span>🎮</span> How to Play
        </h3>
        <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed font-medium">
          <li>
            <strong className="text-slate-800">Study the Equation:</strong> The puzzle shows arithmetic relationships between items.
          </li>
          <li>
            <strong className="text-slate-800">Find the Tomato:</strong> Deduce the missing digit from <strong className="text-rose-600 font-bold">0 to 9</strong>.
          </li>
          <li>
            <strong className="text-slate-800">Select &amp; Submit:</strong> Click or press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-2xs font-bold text-slate-700">0–9</kbd> and <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-2xs font-bold text-slate-700">Enter</kbd>.
          </li>
          <li>
            <strong className="text-slate-800">Beat the Clock:</strong> Faster solves unlock higher levels with shorter countdown timers!
          </li>
        </ol>
      </div>

      {/* Concept Note */}
      <div className="text-[11px] text-slate-400 text-center font-medium">
        🛡️ <strong>Virtual Identity Concept:</strong> Distinguishes player sessions locally without password overhead.
      </div>
    </div>
  );
};
