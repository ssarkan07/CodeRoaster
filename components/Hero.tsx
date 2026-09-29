import React from "react";
import { AI } from "@/config/app.config";

export function Hero() {
  return (
    <section className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2 pb-1">
      <div>
        {/* Monospace eyebrow */}
        <div className="inline-flex items-center gap-2 mb-2 font-mono font-bold text-xs md:text-sm tracking-widest text-[#141414] uppercase bg-white/90 px-3 py-1 rounded-md nb-border-2">
          <span className="w-2 h-2 rounded-full bg-[#D9503F] animate-pulse"></span>
          <span>CODE BOL RAHA HAI · मला वाचवा!</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141414] tracking-tight leading-none mt-1 font-display">
          Code Roaster
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#141414]/80 mt-2 font-display">
          Paste your code. Pick your roast. Get humbled. Get the fix.
        </p>
      </div>

      {/* Powered by Gemini & Spice tags */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl nb-border-2 nb-shadow-sm">
          <span className="text-lg">⚡</span>
          <div className="text-xs">
            <span className="font-bold text-[#141414] block">Desi debugging</span>
            <span className="font-mono text-[#4C80F0] font-semibold text-[11px]">
              powered by {AI.modelLabel}
            </span>
          </div>
        </div>

        {/* Spice Level Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#FAF6EE] px-3.5 py-2 rounded-xl nb-border-2">
          <span className="text-xs font-mono font-bold">SPICE:</span>
          <div className="flex gap-1" title="Adjustable Roast Spice">
            <span className="w-2.5 h-4 bg-[#4FA35A] rounded-xs nb-border-2" title="Halka"></span>
            <span className="w-2.5 h-4 bg-[#EDB13E] rounded-xs nb-border-2" title="Tikha"></span>
            <span
              className="w-2.5 h-4 bg-[#D9503F] rounded-xs nb-border-2 animate-pulse"
              title="Zanzanit"
            ></span>
          </div>
        </div>
      </div>
    </section>
  );
}
