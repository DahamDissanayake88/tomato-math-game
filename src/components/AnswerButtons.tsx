import React from 'react';

interface AnswerButtonsProps {
  selectedAnswer: number | null;
  onSelectAnswer: (answer: number) => void;
  onSubmitAnswer: () => void;
  isDisabled: boolean;
  isSubmitting: boolean;
}

export const AnswerButtons: React.FC<AnswerButtonsProps> = ({
  selectedAnswer,
  onSelectAnswer,
  onSubmitAnswer,
  isDisabled,
  isSubmitting,
}) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* 0-9 Keypad Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5">
        {digits.map((digit) => {
          const isSelected = selectedAnswer === digit;
          return (
            <button
              key={digit}
              type="button"
              disabled={isDisabled || isSubmitting}
              onClick={() => onSelectAnswer(digit)}
              className={`h-12 sm:h-14 rounded-2xl font-extrabold text-lg sm:text-xl transition-all duration-150 shadow-sm cursor-pointer active:scale-90 flex items-center justify-center border-2 ${
                isSelected
                  ? 'bg-rose-600 text-white border-rose-700 shadow-rose-500/40 shadow-md ring-4 ring-rose-200 -translate-y-1'
                  : 'bg-white hover:bg-rose-50 text-slate-800 border-slate-200 hover:border-rose-300'
              } disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {digit}
            </button>
          );
        })}
      </div>

      {/* Submit Action */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={isDisabled || isSubmitting || selectedAnswer === null}
          onClick={onSubmitAnswer}
          className={`w-full sm:w-auto min-w-[220px] py-3.5 px-8 rounded-2xl font-bold text-base shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            selectedAnswer === null || isDisabled || isSubmitting
              ? 'bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white shadow-emerald-500/25 border-2 border-emerald-700 ring-2 ring-emerald-200'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Checking...</span>
            </>
          ) : (
            <>
              <span>🎯</span>
              <span>
                {selectedAnswer !== null ? `Submit [ ${selectedAnswer} ]` : 'Select a Number (0–9)'}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
