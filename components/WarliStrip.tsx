import React from "react";

export function WarliStrip() {
  return (
    <div className="w-full mt-4">
      {/* Warli / Rangoli geometric ribbon */}
      <div className="w-full bg-[#141414] py-2 px-4 flex items-center justify-center gap-3 overflow-hidden select-none">
        <div className="flex items-center gap-4 text-xs font-mono font-bold text-white tracking-widest opacity-90 overflow-x-hidden">
          {/* Repeating Triangles and Google colored dots */}
          <span className="text-[#EDB13E]">▲ ▼ ▲ ▼ ▲</span>
          <span className="w-2 h-2 rounded-full bg-[#4C80F0] shrink-0"></span>
          <span className="text-white/60">◆ ◇ ◆ ◇ ◆</span>
          <span className="w-2 h-2 rounded-full bg-[#D9503F] shrink-0"></span>
          <span className="text-[#EDB13E]">▲ ▼ ▲ ▼ ▲</span>
          <span className="w-2 h-2 rounded-full bg-[#4FA35A] shrink-0"></span>
          <span className="text-white/60">◆ ◇ ◆ ◇ ◆</span>
          <span className="w-2 h-2 rounded-full bg-[#EDB13E] shrink-0"></span>
          <span className="text-[#EDB13E]">▲ ▼ ▲ ▼ ▲</span>
          <span className="w-2 h-2 rounded-full bg-[#4C80F0] shrink-0"></span>
          <span className="text-white/60">◆ ◇ ◆ ◇ ◆</span>
        </div>
      </div>
    </div>
  );
}
