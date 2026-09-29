import { NextRequest, NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, PERSONAS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, PersonaId, RoastLevel } from "@/types/roast";

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request payload." }, { status: 400 });
    }

    const code = typeof body.code === "string" ? body.code : "";
    const errorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

    if (!code || code.trim().length === 0) {
      return NextResponse.json(
        { error: "No code provided. I can't roast the void." },
        { status: 400 }
      );
    }

    if (code.length > LIMITS.maxCodeLength) {
      return NextResponse.json(
        {
          error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
        },
        { status: 400 }
      );
    }

    if (errorMessage.length > LIMITS.maxErrorMessageLength) {
      return NextResponse.json(
        {
          error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
        },
        { status: 400 }
      );
    }

    const rawLang = typeof body.language === "string" ? body.language : "";
    const isValidLang = LANGUAGES.some((l) => l.id === rawLang);
    const language: LanguageId = isValidLang ? (rawLang as LanguageId) : DEFAULTS.language;

    const rawRoast = typeof body.roastLevel === "string" ? body.roastLevel : "";
    const isValidRoast = ROAST_LEVELS.some((r) => r.id === rawRoast);
    const roastLevel: RoastLevel = isValidRoast ? (rawRoast as RoastLevel) : DEFAULTS.roastLevel;

    const rawPersona = typeof body.persona === "string" ? body.persona : "";
    const isValidPersona = PERSONAS.some((p) => p.id === rawPersona);
    const persona: PersonaId = isValidPersona ? (rawPersona as PersonaId) : DEFAULTS.persona;

    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      persona,
      errorMessage,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    console.error("[Roast API Error]:", err);
    const message = (err as Error)?.message || "Internal server error occurred while roasting code.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
