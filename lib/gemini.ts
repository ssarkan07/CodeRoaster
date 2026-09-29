import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, originalMessage: string): string {
  if (status === 400) {
    return "Invalid request sent to Gemini. Check prompt parameters and configuration in config/app.config.ts.";
  }
  if (status === 403) {
    return "Invalid or unauthorized GEMINI_API_KEY. Please check your key in .env.local or generate a new one at https://aistudio.google.com/apikey.";
  }
  if (status === 404) {
    return originalMessage || `Model "${AI.model}" not found. Verify the model name in config/app.config.ts or ensure your API key has access.`;
  }
  if (status === 429) {
    return "Gemini API rate limit exceeded. Bhai, itni bhi jaldi kya hai? Thoda ruk, roast ko marinate hone do. Please wait a moment and try again.";
  }
  if (status === 503) {
    return "Gemini service is temporarily overloaded. Compiler ki chai thandi ho rahi hai... please try again in a few seconds.";
  }
  return originalMessage || "An unexpected error occurred while communicating with Gemini.";
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim() === "") {
        throw new Error("Received an empty response from Gemini API.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        // Fallback for markdown-wrapped json
        const cleaned = responseText.replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, "$1").trim();
        parsed = JSON.parse(cleaned);
      }

      return {
        roast: parsed.roast ?? "Bhai, code toh dekh ke interpreter bhi confuse ho gaya! 😅",
        roastScore: typeof parsed.roastScore === "number" ? parsed.roastScore : 72,
        scoreTag: parsed.scoreTag ?? "ATTENDANCE SHORT, CODE BHI SHORT",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        errorExplanation: parsed.errorExplanation ?? "",
        correctedCode: parsed.correctedCode ?? request.code,
        takeaway: parsed.takeaway ?? "Chinta mat kar. Code bhi gym jaisa hai — repeat karoge toh better hoga 💪",
      };
    } catch (err: unknown) {
      lastError = err;
      const status = (err as { status?: number })?.status;

      if ((status === 503 || status === 429) && attempt < AI.maxAttempts) {
        const delayMs = attempt * 1200;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      const message = (err as Error)?.message || String(err);
      throw new Error(friendlyErrorMessage(status, message));
    }
  }

  throw new Error(
    friendlyErrorMessage(
      (lastError as { status?: number })?.status,
      (lastError as Error)?.message || "Failed after multiple retry attempts."
    )
  );
}
