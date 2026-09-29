import React from "react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#FAF6EE] border-2 border-[#D9503F] rounded-2xl p-7 flex flex-col items-center text-center nb-shadow">
        <div className="w-14 h-14 bg-[#D9503F] text-white rounded-xl nb-border-2 flex items-center justify-center mb-4 text-2xl font-black font-mono shadow-xs">
          !
        </div>

        <span className="font-mono text-[11px] font-black uppercase text-[#D9503F] tracking-widest mb-1">
          ROAST // INTERRUPTED
        </span>

        <h3 className="text-xl font-black text-[#141414] mb-2 tracking-tight font-display">
          Bhau, Gemini ne chai break le li! ☕
        </h3>

        <p className="text-xs md:text-sm font-medium text-[#141414]/80 mb-6 leading-relaxed font-display bg-white p-3 rounded-lg border border-[#141414]/20 w-full select-text">
          {error || "An unknown error occurred during code evaluation. Please try again."}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="bg-[#EDB13E] hover:bg-[#E2A633] text-[#141414] px-6 py-2.5 rounded-full nb-border-2 nb-shadow font-extrabold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          <span>RETRY ANALYSIS ↵</span>
          <span className="font-mono font-black">→</span>
        </button>
      </div>
    </div>
  );
}
