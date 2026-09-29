"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { LANGUAGES, LIMITS } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
  onClear: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
  onClear,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);
  const languageMeta = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];

  const updateCursorPosition = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const textUpToCursor = el.value.substring(0, el.selectionStart);
    const lineIndex = textUpToCursor.split("\n").length;
    const lastNewline = textUpToCursor.lastIndexOf("\n");
    const colIndex = lastNewline === -1 ? textUpToCursor.length + 1 : textUpToCursor.length - lastNewline;
    setCursor({ line: lineIndex, col: colIndex });
  }, []);

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const el = textareaRef.current;
      if (!el) return;

      const start = el.selectionStart;
      const end = el.selectionEnd;
      const spaces = "    "; // 4 spaces
      const newCode = el.value.substring(0, start) + spaces + el.value.substring(end);

      onChange(newCode);

      // Restore cursor position
      setTimeout(() => {
        el.selectionStart = el.selectionEnd = start + 4;
        updateCursorPosition();
      }, 0);
    }
  };

  useEffect(() => {
    updateCursorPosition();
  }, [code, updateCursorPosition]);

  return (
    <div className="flex flex-col bg-[#171717] text-[#F7F3EA] h-full min-h-[480px]">
      {/* Editor Header Row */}
      <div className="bg-[#202020] border-b-2 border-[#141414] px-4 md:px-5 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Traffic light terminal dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#D9503F] border border-black/50"></span>
            <span className="w-3 h-3 rounded-full bg-[#EDB13E] border border-black/50"></span>
            <span className="w-3 h-3 rounded-full bg-[#4FA35A] border border-black/50"></span>
          </div>
          <div className="h-4 w-[1px] bg-white/20 mx-1"></div>
          <span className="font-mono text-[11px] font-bold text-[#EDB13E] uppercase tracking-wider">
            INPUT // SRC
          </span>
          <span className="text-xs font-black text-white tracking-wide font-display">
            YOUR CODE
          </span>
        </div>

        {/* Utility Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="px-2.5 py-1 text-[11px] font-mono font-bold bg-[#2A2A2A] hover:bg-[#353535] text-[#F7F3EA] rounded-md border border-white/20 transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
            title="Load the buggy chai billing code"
          >
            <span>⚡ SAMPLE BUG</span>
          </button>
          <button
            type="button"
            onClick={onClear}
            className="px-2 py-1 text-[11px] font-mono font-bold hover:bg-[#2A2A2A] text-white/60 hover:text-white rounded transition-colors cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Main: Gutter + Textarea */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-xs md:text-sm">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="w-12 md:w-14 bg-[#141414] py-3.5 select-none overflow-hidden text-right pr-3 text-white/30 border-r border-white/10 shrink-0 font-medium"
        >
          {Array.from({ length: lineCount }).map((_, i) => {
            const lineNum = i + 1;
            const isError = errorLine === lineNum;
            return (
              <div
                key={lineNum}
                className={`leading-[24px] h-[24px] transition-colors ${
                  isError
                    ? "text-[#D9503F] font-black bg-[#D9503F]/20 -mr-3 pr-3 border-r-2 border-[#D9503F]"
                    : ""
                }`}
              >
                {lineNum.toString().padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Real Textarea */}
        <div className="relative flex-1 h-full">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              onChange(e.target.value);
              updateCursorPosition();
            }}
            onScroll={handleScroll}
            onSelect={updateCursorPosition}
            onClick={updateCursorPosition}
            onKeyUp={updateCursorPosition}
            onKeyDown={handleKeyDown}
            maxLength={LIMITS.maxCodeLength}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder={`// Paste your ${languageMeta.label} code here...
// Press Ctrl+Enter to roast!`}
            className="w-full h-full p-3.5 bg-transparent text-[#F7F3EA] resize-none outline-none leading-[24px] font-mono whitespace-pre overflow-auto placeholder:text-white/20 select-text"
          />
        </div>
      </div>

      {/* Editor Footer Status Bar */}
      <div className="bg-[#121212] border-t border-white/10 px-4 py-2 font-mono text-[11px] text-white/60 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4FA35A]"></span>
            <span>
              Ln {cursor.line}, Col {cursor.col} · {languageMeta.label}
            </span>
          </span>
          {errorLine && (
            <span className="text-[#D9503F] font-bold bg-[#D9503F]/15 px-2 py-0.5 rounded border border-[#D9503F]/30">
              Line {errorLine} Bug Highlighted
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">UTF-8 · Tab Size: 4</span>
          <span
            className={
              code.length >= LIMITS.maxCodeLength * 0.9 ? "text-[#EDB13E] font-bold" : ""
            }
          >
            {code.length.toLocaleString()} / {LIMITS.maxCodeLength.toLocaleString()} chars
          </span>
        </div>
      </div>
    </div>
  );
}
