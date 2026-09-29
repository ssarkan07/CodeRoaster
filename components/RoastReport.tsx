"use client";

import React, { useState } from "react";
import { PERSONAS, ROAST_LEVELS } from "@/config/app.config";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { FixedCode } from "./FixedCode";
import { IssueCard } from "./IssueCard";
import { LoadingState } from "./LoadingState";
import { LanguageId, PersonaId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  persona: PersonaId;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
  onLoadSample: () => void;
  onNewCode: () => void;
  onRoastAgainSpicier: () => void;
}

export function RoastReport({
  state,
  roastLevel,
  persona,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
  onLoadSample,
  onNewCode,
  onRoastAgainSpicier,
}: RoastReportProps) {
  const [shareToast, setShareToast] = useState(false);

  const personaMeta = PERSONAS.find((p) => p.id === persona) || PERSONAS[0];
  const roastLevelMeta = ROAST_LEVELS.find((r) => r.id === roastLevel) || ROAST_LEVELS[1];

  const handleShare = async () => {
    if (!result) return;
    const shareText = `🔥 My code just got roasted by Code Roaster (Desi Edition) at DevFest Nashik 2026!
Verdict: "${result.roast}"
Score: ${result.roastScore ?? 72}/100 [${result.scoreTag ?? "DHUA DHUA"}]
Issues Found: ${result.issues.length}

Try it yourself: DevFest Nashik 2026 Code Roaster`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Code Roaster Critique",
          text: shareText,
        });
        return;
      } catch {
        // Fall back to clipboard copy
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    } catch {
      alert("Failed to copy share text.");
    }
  };

  return (
    <div className="flex flex-col bg-[#FDFBF7] h-full min-h-[480px]">
      {/* Report Header Row */}
      <div className="bg-[#F8F4EC] border-b-2 border-[#141414] px-4 md:px-5 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-[#D9503F] uppercase tracking-wider">
            AUDIT // REPORT
          </span>
          <span className="text-xs font-black text-[#141414] tracking-wide font-display">
            ROAST REPORT
          </span>
        </div>

        <div>
          {state === "results" ? (
            <span className="text-[11px] font-mono font-bold bg-[#EDB13E] text-[#141414] px-2.5 py-0.5 rounded-full nb-border-2 flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9503F] animate-pulse"></span>
              <span>ROAST COMPLETE 🔥</span>
            </span>
          ) : state === "loading" ? (
            <span className="text-[11px] font-mono font-bold bg-[#EDB13E]/30 text-[#141414] px-2.5 py-0.5 rounded-full border border-[#EDB13E] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EDB13E] animate-ping"></span>
              <span>ANALYZING...</span>
            </span>
          ) : (
            <span className="text-[11px] font-mono font-bold bg-[#EDB13E]/20 text-[#141414] px-2.5 py-0.5 rounded border border-[#EDB13E]">
              READY TO ROAST
            </span>
          )}
        </div>
      </div>

      {/* Report Dynamic Content */}
      {state === "empty" && (
        <EmptyState
          onLoadSample={onLoadSample}
          selectedPersonaLabel={`${personaMeta.icon} ${personaMeta.label}`}
        />
      )}

      {state === "loading" && <LoadingState />}

      {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

      {state === "results" && result && (
        <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-4">
          {/* 1. SAVAGE VERDICT BANNER & RUBBER STAMP SCORE */}
          <div className="relative bg-[#FAF6EE] rounded-2xl nb-border nb-shadow p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 overflow-hidden">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="bg-[#D9503F] text-white text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                  VERDICT: DHUA DHUA
                </span>
                <span className="text-xs font-mono text-[#141414]/60 font-bold">
                  {personaMeta.label} ({roastLevelMeta.label.split(" ")[0]})
                </span>
              </div>
              <blockquote className="text-base md:text-lg font-black text-[#141414] leading-snug tracking-tight font-display">
                “{result.roast}”
              </blockquote>
            </div>

            {/* Rubber Stamp Roast Score Badge */}
            <div className="self-center md:self-auto bg-[#EDB13E] text-[#141414] nb-border nb-shadow rounded-xl p-3 text-center -rotate-3 hover:rotate-0 transition-transform shrink-0">
              <span className="block text-[10px] font-mono font-black uppercase tracking-wider text-[#141414]/80">
                ROAST SCORE
              </span>
              <div className="text-3xl font-black font-mono leading-none my-0.5">
                {result.roastScore ?? 72}
                <span className="text-sm text-[#141414]/70">/100</span>
              </div>
              <span className="block text-[9px] font-black uppercase tracking-tight bg-[#141414] text-[#EDB13E] px-1.5 py-0.5 rounded font-mono">
                {result.scoreTag || "ATTENDANCE SHORT, CODE BHI SHORT"}
              </span>
            </div>
          </div>

          {/* 2. ISSUE CARDS LIST */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-[#141414]/80">
                {result.issues.length === 0
                  ? "NO CRITICAL ISSUES DETECTED"
                  : `${result.issues.length} ${
                      result.issues.length === 1 ? "CRITICAL BHAU-BUG" : "CRITICAL BHAU-BUGS"
                    } FOUND`}
              </span>
              <span className="text-[11px] font-mono text-[#D9503F] font-bold">
                {result.issues.filter((i) => i.severity === "FATAL BUG").length} Fatal ·{" "}
                {result.issues.filter((i) => i.severity === "CODE SMELL").length} Smell ·{" "}
                {result.issues.filter((i) => i.severity === "OPTIMIZATION").length} Opt
              </span>
            </div>

            {result.issues.length === 0 ? (
              <div className="bg-[#ECFDF5] border-2 border-[#4FA35A] rounded-xl p-4 text-center text-xs font-mono font-bold text-[#141414]">
                ✨ Suspiciously clean code! No fatal bugs detected by {personaMeta.label}.
              </div>
            ) : (
              result.issues.map((issue, idx) => (
                <IssueCard key={`${issue.line}-${idx}`} index={idx} issue={issue} />
              ))
            )}
          </div>

          {/* 3. ERROR EXPLAINER (if available) */}
          {result.errorExplanation && result.errorExplanation.trim() && (
            <div className="bg-[#EFF2FB] rounded-xl nb-border-2 p-3.5 border-l-4 border-l-[#4C80F0]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-mono text-[11px] font-black text-[#4C80F0] uppercase tracking-wider">
                  ERROR // WHAT HAPPENED
                </span>
              </div>
              <p className="text-xs text-[#141414] font-medium leading-relaxed font-display">
                {result.errorExplanation}
              </p>
            </div>
          )}

          {/* 4. REDEMPTION ARC (FIXED CODE BLOCK) */}
          {result.correctedCode && result.correctedCode.trim() && (
            <FixedCode
              sectionNumber={3}
              language={language}
              code={result.correctedCode}
              onApply={onApplyFix}
            />
          )}

          {/* 5. CLOSING ACTIONS & TAKEAWAY */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#141414]/10">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleShare}
                className="bg-[#EDB13E] hover:bg-[#E2A633] text-[#141414] px-4 py-2 rounded-full nb-border-2 nb-shadow font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <span>{shareToast ? "COPIED TO SHARE! ✓" : "SHARE ROAST 📤"}</span>
                <span className="font-mono">→</span>
              </button>

              <button
                type="button"
                onClick={onRoastAgainSpicier}
                className="bg-white hover:bg-[#FAF6EE] text-[#141414] px-4 py-2 rounded-full nb-border-2 nb-shadow-sm font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                title="Re-run with maximum Zanzanit heat"
              >
                <span>ROAST AGAIN, SPICIER</span>
                <span>🌶️</span>
              </button>

              <button
                type="button"
                onClick={onNewCode}
                className="px-3 py-2 text-xs font-mono font-bold text-[#141414]/70 hover:text-[#141414] transition-colors ml-auto cursor-pointer"
              >
                NEW CODE
              </button>
            </div>

            <p className="text-center text-[11px] font-mono text-[#141414]/70 mt-1">
              {result.takeaway ||
                "Chinta mat kar. Code bhi gym jaisa hai — repeat karoge toh better hoga 💪"}
            </p>
          </div>
        </div>
      )}

      {/* Report Footer Status Bar */}
      <div className="bg-[#FAF6EE] border-t-2 border-[#141414] px-4 py-2 font-mono text-[11px] text-[#141414]/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4FA35A]"></span>
          <span>
            {state === "results"
              ? "Gemini analysis verified"
              : state === "loading"
              ? "Running prompt pipeline"
              : "Awaiting roast trigger"}
          </span>
        </div>
        <span className="font-bold text-[#141414]">
          {state === "results" && result
            ? `${result.issues.length} issues · Fix ready`
            : "0 warnings · 0 roasts"}
        </span>
      </div>
    </div>
  );
}
