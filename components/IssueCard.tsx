import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const SEVERITY_STYLES: Record<Severity, { bg: string; text: string; border: string }> = {
  "FATAL BUG": {
    bg: "bg-[#D9503F]",
    text: "text-white",
    border: "border-[#D9503F]",
  },
  "CODE SMELL": {
    bg: "bg-[#EDB13E]",
    text: "text-[#141414]",
    border: "border-[#EDB13E]",
  },
  OPTIMIZATION: {
    bg: "bg-[#4FA35A]",
    text: "text-white",
    border: "border-[#4FA35A]",
  },
};

export function IssueCard({ index: _index, issue }: IssueCardProps) {
  const sevStyle = SEVERITY_STYLES[issue.severity] || SEVERITY_STYLES["FATAL BUG"];
  const linePill = issue.line ? `LINE [${issue.line.toString().padStart(2, "0")}]` : "GENERAL";

  return (
    <div className="bg-white rounded-xl nb-border-2 nb-shadow-sm p-4 flex flex-col gap-2 transition-transform hover:-translate-y-0.5">
      {/* Top Meta Row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-black bg-[#141414] text-white px-2 py-0.5 rounded">
            {linePill}
          </span>
          <span className="font-mono text-xs font-bold text-[#141414]/70 uppercase">
            {issue.title}
          </span>
        </div>
        <span
          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full font-mono ${sevStyle.bg} ${sevStyle.text}`}
        >
          {issue.severity}
        </span>
      </div>

      {/* Code Snippet block if present */}
      {issue.codeSnippet && issue.codeSnippet.trim() && (
        <div className="bg-[#171717] rounded-lg p-2.5 font-mono text-xs text-[#F7F3EA] overflow-x-auto border-l-4 border-[#D9503F]">
          <code>{issue.codeSnippet}</code>
        </div>
      )}

      {/* Diagnosis Roast */}
      <div className="text-xs md:text-sm font-bold text-[#141414] leading-snug">
        <span>“{issue.diagnosis}”</span>
      </div>

      {/* Fix Advice */}
      <div className="bg-[#FAF6EE] rounded-lg p-2.5 text-xs font-mono text-[#141414]/90 flex items-start gap-1.5 border border-[#141414]/15">
        <span className="text-[#4FA35A] font-black shrink-0">✓ FIX:</span>
        <span className="leading-relaxed">{issue.expected}</span>
      </div>
    </div>
  );
}
