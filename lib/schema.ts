import { Type, type Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A witty, brutal but hilarious code roast in Hinglish with emojis.",
    },
    roastScore: {
      type: Type.INTEGER,
      description: "Code health score between 1 and 100.",
    },
    scoreTag: {
      type: Type.STRING,
      description: "Short, punchy uppercase rubber-stamp tag in Hinglish (e.g. ATTENDANCE SHORT, CODE BHI SHORT).",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of technical issues identified in the code.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue occurs.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Exact severity: FATAL BUG, CODE SMELL, or OPTIMIZATION.",
          },
          title: {
            type: Type.STRING,
            description: "Short Hinglish summary title of the issue.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problematic code copied verbatim from user submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Explanation of why this fails in witty Hinglish.",
          },
          expected: {
            type: Type.STRING,
            description: "How it should be corrected.",
          },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
    },
    errorExplanation: {
      type: Type.STRING,
      description: "Plain Hinglish explanation of the provided error message/traceback, or empty string.",
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete, runnable fixed code without markdown backticks or code fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A sincere, encouraging closing takeaway line in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
