import React from 'react';

interface LevelIndicatorProps {
  currentLevel: number;
  levelUpNotification: {
    show: boolean;
    level: number;
    timerDuration: number;
  } | null;
  onDismissNotification?: () => void;
}

export const LevelIndicator: React.FC<LevelIndicatorProps> = ({
  currentLevel,
  levelUpNotification,
  onDismissNotification,
}) => {
  return (
    <>
      {/* Modal / Toast for Level Up Celebration */}
      {levelUpNotification && levelUpNotification.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-amber-300 transform animate-in zoom-in-95 duration-200 space-y-4">
            <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-4xl shadow-inner animate-bounce">
              🌟
            </div>

            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 block">
                Level Reached!
              </span>
              <h2 className="text-3xl font-black text-slate-800">
                LEVEL {levelUpNotification.level}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fantastic math deduction! The countdown timer is now reduced to{' '}
              <strong className="text-rose-600 font-bold">
                {levelUpNotification.timerDuration} seconds
              </strong>{' '}
              per puzzle.
            </p>

            <button
              type="button"
              onClick={onDismissNotification}
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              Continue Playing 🚀
            </button>
          </div>
        </div>
      )}
    </>
  );
};
