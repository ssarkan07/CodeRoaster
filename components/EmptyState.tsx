import React from "react";

interface EmptyStateProps {
  onLoadSample: () => void;
  selectedPersonaLabel: string;
}

export function EmptyState({ onLoadSample, selectedPersonaLabel }: EmptyStateProps) {
  return (
    <div className="flex-1 p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#F8F4EC] border-2 border-dashed border-[#141414] rounded-2xl p-8 flex flex-col items-center text-center">
        {/* Geometric Expression Box (ASCII / Neo-Brutalist Mascot) */}
        <div className="relative mb-5">
          {/* Diamond top accent */}
          <div className="w-4 h-4 bg-[#EDB13E] nb-border-2 rotate-45 mx-auto -mb-2 z-10 relative"></div>

          {/* Mascot Box */}
          <div className="w-24 h-20 bg-white rounded-xl nb-border nb-shadow flex flex-col items-center justify-center relative">
            <span className="font-mono font-black text-2xl text-[#141414] tracking-tighter">
              ? _ ?
            </span>
            {/* Rosy Cheek Dots */}
            <div className="flex justify-between w-14 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#D9503F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D9503F]"></span>
            </div>
          </div>

          {/* Floating question mark badge */}
          <div className="absolute -right-3 -top-2 bg-[#4C80F0] text-white font-mono font-black text-xs w-6 h-6 rounded-full nb-border-2 flex items-center justify-center">
            !
          </div>
        </div>

        {/* Empty State Headlines */}
        <h3 className="text-xl font-black text-[#141414] mb-2 tracking-tight font-display">
          Your code is suspiciously quiet.
        </h3>
        <p className="text-xs md:text-sm font-medium text-[#141414]/75 mb-6 max-w-xs leading-relaxed font-display">
          Paste some code on the left and pick your spice level. Let&apos;s see what bugs are hiding
          before DevFest starts!
        </p>

        {/* Action CTA */}
        <button
          type="button"
          onClick={onLoadSample}
          className="bg-white hover:bg-[#FAF6EE] text-[#141414] px-5 py-2.5 rounded-full nb-border-2 nb-shadow font-extrabold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          <span>TRY SAMPLE BUG</span>
          <span className="font-mono font-black">→</span>
        </button>

        {/* Persona Mini Preview */}
        <div className="mt-6 flex items-center gap-1.5 text-[11px] font-mono text-[#141414]/60">
          <span>Selected persona:</span>
          <span className="font-bold text-[#141414] underline decoration-[#EDB13E] decoration-2">
            {selectedPersonaLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
