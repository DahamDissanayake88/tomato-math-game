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
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-rose-100 space-y-6">
      {/* Branding */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-3xl text-4xl shadow-inner animate-pulse">
          🍅
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Tomato Math Game
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Enhanced Educational Puzzle • CIS046-3 Software for Enterprise
        </p>
      </div>

      {/* Username Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username-input"
            className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 text-left"
          >
            Player Username / Nickname
          </label>
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="e.g. TomatoWizard"
            maxLength={20}
            className={`w-full px-4 py-3.5 rounded-2xl border-2 font-medium text-slate-800 placeholder-slate-400 outline-none transition-all ${
              errorMessage
                ? 'border-rose-400 bg-rose-50/50 focus:border-rose-500'
                : 'border-slate-200 bg-slate-50/50 focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-100'
            }`}
          />
          {errorMessage && (
            <p className="mt-2 text-xs font-semibold text-rose-600 text-left flex items-center gap-1">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 hover:from-rose-700 hover:to-orange-600 active:scale-[0.98] text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg shadow-rose-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🚀</span>
          <span>Start Game</span>
        </button>
      </form>

      {/* How to Play Section */}
      <div className="bg-rose-50/60 rounded-2xl p-4 sm:p-5 border border-rose-100 text-left space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
          <span>📖</span> How to Play
        </h3>
        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>Inspect the mathematical equation retrieved from the Banana API.</li>
          <li>Deduce the missing numerical value represented by the tomato.</li>
          <li>Choose an answer from digits <strong className="text-slate-800">0 to 9</strong> and click Submit.</li>
          <li>Earn <strong className="text-emerald-700 font-bold">+10 points</strong> for every correct answer.</li>
          <li>Solve quickly before the countdown timer expires!</li>
        </ul>
      </div>

      {/* Virtual Identity Note */}
      <div className="text-[11px] text-slate-400 text-center leading-tight">
        ℹ️ <em>Virtual Identity Concept:</em> Session distinction via player username. No database or passwords required.
      </div>
    </div>
  );
};
