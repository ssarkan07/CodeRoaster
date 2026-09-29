import React from "react";
import { LANGUAGES, PERSONAS, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, PersonaId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  persona: PersonaId;
  onPersonaChange: (persona: PersonaId) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  persona,
  onPersonaChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="bg-[#FAF6EE] border-b-[3px] border-[#141414] px-4 md:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4 lg:gap-6">
        {/* 1. ROAST LEVEL SEGMENTED CONTROL */}
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider text-[#141414]/70">
            1. ROAST LEVEL
          </label>
          <div className="inline-flex bg-white p-1 rounded-full nb-border-2 gap-1 shadow-xs">
            {ROAST_LEVELS.map((level) => {
              const isSelected = roastLevel === level.id;
              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => onRoastLevelChange(level.id)}
                  title={level.description}
                  className={`px-3 md:px-3.5 py-1 text-xs font-extrabold rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#EDB13E] text-[#141414] nb-border-2 scale-102"
                      : "text-[#141414]/80 hover:bg-[#F8F4EC] hover:text-[#141414]"
                  }`}
                >
                  <span>{level.label.split(" ")[0]}</span>
                  <span className="ml-1">{level.spiceIcon}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. PERSONA SELECTOR */}
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider text-[#141414]/70">
            2. PERSONA
          </label>
          <div className="relative">
            <select
              value={persona}
              onChange={(e) => onPersonaChange(e.target.value as PersonaId)}
              className="appearance-none bg-white px-3.5 pr-8 py-1.5 rounded-full nb-border-2 font-bold text-xs text-[#141414] hover:bg-[#F8F4EC] transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-[#EDB13E]"
            >
              {PERSONAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.icon} {p.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#141414]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. LANGUAGE SELECTOR */}
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider text-[#141414]/70">
            3. LANGUAGE
          </label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
              className="appearance-none bg-white px-3.5 pr-8 py-1.5 rounded-full nb-border-2 font-bold text-xs text-[#141414] hover:bg-[#F8F4EC] transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-[#EDB13E]"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label} (.{lang.extension})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#141414]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 4. ERROR MESSAGE DRAWER TOGGLE */}
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider text-[#141414]/70 opacity-0">
            OPTIONAL
          </label>
          <button
            type="button"
            onClick={onToggleErrorDrawer}
            className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-full border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              errorDrawerOpen
                ? "bg-[#141414] text-white border-[#141414]"
                : "border-dashed border-[#141414] bg-white hover:bg-[#FAF6EE] text-[#141414]"
            }`}
          >
            <span>{errorDrawerOpen ? "− CLOSE ERROR" : "+ ERROR LOG"}</span>
          </button>
        </div>
      </div>

      {/* 5. PRIMARY ACTION CTA */}
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onRoast}
          disabled={isRoasting}
          className={`group px-5 sm:px-6 py-2.5 rounded-full nb-border nb-shadow font-black text-sm md:text-base flex items-center gap-2.5 transition-all cursor-pointer ${
            isRoasting
              ? "bg-[#EDB13E]/70 text-[#141414] cursor-not-allowed animate-pulse"
              : "bg-[#EDB13E] hover:bg-[#E2A633] active:translate-x-0.5 active:translate-y-0.5 text-[#141414]"
          }`}
        >
          {isRoasting ? (
            <>
              <span className="inline-block animate-spin">⚡</span>
              <span>ANALYZING CODE...</span>
            </>
          ) : (
            <>
              <span>Roast Me / भाजून काढ</span>
              <span className="text-lg group-hover:scale-120 transition-transform">🔥</span>
              <span className="hidden sm:inline font-mono font-black">→</span>
              <span className="hidden md:inline text-[10px] font-mono font-bold bg-[#141414] text-white px-2 py-0.5 rounded-full">
                Ctrl ⏎
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
