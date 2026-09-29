"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DEFAULTS, PERSONAS, SAMPLE } from "@/config/app.config";
import { CodeEditor } from "./CodeEditor";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { Hero } from "./Hero";
import { RoastControls } from "./RoastControls";
import { RoastReport } from "./RoastReport";
import { StatusBar } from "./StatusBar";
import { TopBar } from "./TopBar";
import { WarliStrip } from "./WarliStrip";
import { requestRoast } from "@/lib/api";
import { LanguageId, PersonaId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [persona, setPersona] = useState<PersonaId>(DEFAULTS.persona);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  // ErrorLine is defined ONLY if the editor currently holds the exact code that was roasted
  const errorLine =
    reportState === "results" && code === roastedCode && roastResult?.issues?.length
      ? roastResult.issues[0]?.line
      : undefined;

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || code.trim().length === 0) {
      setApiError("No code provided. I can't roast the void. Paste some code or click 'Sample Bug'.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError("");

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        persona,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: unknown) {
      setApiError((err as Error)?.message || "Failed to generate critique.");
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, persona, roastLevel]);

  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
    setErrorMessage(SAMPLE.errorMessage);
    setErrorDrawerOpen(true);
    setReportState("empty");
    setRoastResult(null);
    setRoastedCode(null);
  }, []);

  const handleClear = useCallback(() => {
    setCode("");
    setErrorMessage("");
    setReportState("empty");
    setRoastResult(null);
    setRoastedCode(null);
    setApiError("");
  }, []);

  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
    // Applying the fix clears the roasted snapshot so line highlights reset
    setRoastedCode(null);
  }, []);

  const handleRoastAgainSpicier = useCallback(() => {
    setRoastLevel("savage");
    setTimeout(() => {
      handleRoast();
    }, 50);
  }, [handleRoast]);

  // Window keydown listener for Ctrl+Enter / Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Floating Pill Topbar */}
      <TopBar />

      {/* Main Container */}
      <main className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-4 md:py-6 flex-1 flex flex-col gap-5">
        {/* Hero Section */}
        <Hero />

        {/* Master Tool Card (50% / 50% Split Pane) */}
        <section className="w-full bg-white rounded-2xl md:rounded-[22px] nb-border nb-shadow-lg overflow-hidden flex flex-col">
          {/* Top Control Bar */}
          <RoastControls
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            persona={persona}
            onPersonaChange={setPersona}
            language={language}
            onLanguageChange={setLanguage}
            onRoast={handleRoast}
            isRoasting={isRoasting}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
          />

          {/* Collapsible Error Traceback Drawer */}
          {errorDrawerOpen && (
            <ErrorMessageInput
              value={errorMessage}
              onChange={setErrorMessage}
              onClose={() => setErrorDrawerOpen(false)}
            />
          )}

          {/* Split Pane: Left Editor / Right Report */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-2 lg:divide-y-0 lg:divide-x-[3px] divide-[#141414] flex-1 min-h-[520px]">
            {/* Left Split Pane: Code Editor */}
            <div className="flex flex-col h-full">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                errorLine={errorLine}
                onLoadSample={handleLoadSample}
                onClear={handleClear}
              />
            </div>

            {/* Right Split Pane: Roast Report */}
            <div className="flex flex-col h-full">
              <RoastReport
                state={reportState}
                roastLevel={roastLevel}
                persona={persona}
                language={language}
                result={roastResult}
                errorMsg={apiError}
                onRetry={handleRoast}
                onApplyFix={handleApplyFix}
                onLoadSample={handleLoadSample}
                onNewCode={handleClear}
                onRoastAgainSpicier={handleRoastAgainSpicier}
              />
            </div>
          </div>
        </section>

        {/* Popular Personas Shortcut Pills */}
        <section className="flex flex-wrap items-center justify-between gap-3 px-2 py-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#141414] uppercase">
              Popular Personas:
            </span>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {PERSONAS.map((p) => {
                const isSelected = persona === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPersona(p.id)}
                    className={`px-3 py-1 rounded-full nb-border-2 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#EDB13E] text-[#141414] scale-102"
                        : "bg-white text-[#141414] hover:bg-[#FAF6EE]"
                    }`}
                  >
                    <span>{p.icon}</span> <span className="ml-1">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="font-mono text-xs text-[#141414]/70 flex items-center gap-2">
            <kbd className="bg-white px-2 py-0.5 rounded border border-[#141414]/30 font-bold shadow-xs">
              Ctrl + Enter
            </kbd>
            <span>to trigger instant roast</span>
          </div>
        </section>
      </main>

      {/* Decorative Warli Ribbon */}
      <WarliStrip />

      {/* Footer Status Bar with Mandatory Workshop Line */}
      <StatusBar isRoasting={isRoasting} />
    </div>
  );
}
