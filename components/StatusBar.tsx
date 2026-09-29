import React from "react";
import { AI, APP } from "@/config/app.config";
import { WarliDevFigure } from "./Logos";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="w-full bg-white border-t-[3px] border-[#141414] py-4 px-4 md:px-8 mt-auto">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-3">
        {/* Main Status Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#141414]">
          {/* Left: System Status */}
          <div className="flex items-center gap-2">
            <span className="font-bold">STATUS:</span>
            {isRoasting ? (
              <span className="text-[#EDB13E] font-black flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#EDB13E]"></span>
                PROCESSING...
              </span>
            ) : (
              <span className="text-[#4FA35A] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4FA35A]"></span>
                ONLINE ({AI.modelLabel.toUpperCase()})
              </span>
            )}
            <span className="hidden md:inline text-[#141414]/30">|</span>
            <span className="hidden md:inline text-[#141414]/70">
              ENGINE: GOOGLE GEMINI
            </span>
          </div>

          {/* Center: Warli Developer Badge */}
          <div className="flex items-center gap-2 bg-[#FAF6EE] px-3.5 py-1 rounded-full nb-border-2">
            <WarliDevFigure className="w-5 h-5 text-[#141414]" />
            <span className="font-mono font-bold text-[11px] text-[#141414] uppercase tracking-wider">
              नाशिक टेक स्पिरिट · 2026
            </span>
          </div>

          {/* Right: App Info */}
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold tracking-wider text-[#141414]/80">
              {APP.name.toUpperCase()} {APP.version} // LIVE
            </span>
          </div>
        </div>

        {/* Second Row: Mandatory Workshop Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#141414]/10 pt-2.5 gap-2 text-[11px] font-mono text-[#141414]/70">
          <div className="flex items-center gap-1.5 font-bold">
            <span>Built with</span>
            <span className="text-[#D9503F] text-xs">❤️</span>
            <span>by Google Developer Groups Nashik</span>
          </div>

          {/* Mandatory line from prompt */}
          <div className="font-bold text-[#141414] bg-[#FAF6EE] px-2.5 py-0.5 rounded border border-[#141414]/20">
            Made at GDG Nashik Pre-DevFest Workshop
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4C80F0]"></span>
            <span>{APP.event} · Panchavati Express Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
