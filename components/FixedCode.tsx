"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({ sectionNumber: _sectionNumber, language, code, onApply }: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [applied, setApplied] = useState(false);

  const langMeta = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];
  const filename = `solution.${langMeta.extension}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("failed");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const handleApply = () => {
    onApply(code);
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="bg-[#171717] rounded-xl nb-border text-white p-4 font-mono flex flex-col gap-3">
      {/* Redemption Arc Header Strip */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[#EDB13E] font-black text-xs uppercase tracking-wider">
            REDEMPTION ARC
          </span>
          <span className="text-white/60 text-xs font-normal">
            · Ab asli fix dekh, bhau 🛠️
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#4FA35A] font-bold bg-[#4FA35A]/15 px-2 py-0.5 rounded border border-[#4FA35A]/30">
            {filename}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-[11px] px-3 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            {copyStatus === "copied" ? (
              <span className="text-[#4FA35A]">✓ COPIED</span>
            ) : copyStatus === "failed" ? (
              <span className="text-[#D9503F]">✕ ERROR</span>
            ) : (
              <span>📋 COPY CODE</span>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="text-xs md:text-sm leading-relaxed overflow-x-auto text-[#F7F3EA] max-h-[300px] p-2 bg-[#121212] rounded-lg">
        <pre>
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between pt-1 border-t border-white/10 flex-wrap gap-2">
        <span className="text-[11px] text-white/50">
          Clean, bug-free, and ready to run
        </span>
        <button
          type="button"
          onClick={handleApply}
          className={`px-4 py-1.5 text-xs font-bold rounded-lg nb-border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            applied
              ? "bg-[#4FA35A] text-white border-white scale-102"
              : "bg-[#EDB13E] hover:bg-[#E2A633] text-[#141414] active:scale-95"
          }`}
        >
          <span>{applied ? "✓ APPLIED TO EDITOR!" : "APPLY TO EDITOR ↵"}</span>
        </button>
      </div>
    </div>
  );
}
