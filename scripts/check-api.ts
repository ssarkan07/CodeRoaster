import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function main() {
  console.log("🔥 Checking Gemini API Connection for Code Roaster...");
  console.log(`🤖 Model: ${AI.model} (${AI.modelLabel})`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      persona: "standup",
      errorMessage: SAMPLE.errorMessage,
    });

    console.log("\n✅ Success! Gemini responded with a structured roast:");
    console.log("-------------------------------------------------------");
    console.log(`Score: ${result.roastScore}/100 [${result.scoreTag}]`);
    console.log(`Roast: "${result.roast}"`);
    console.log(`Issues Found: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  ${idx + 1}. [Line ${issue.line}] [${issue.severity}] ${issue.title}`);
    });
    if (result.errorExplanation) {
      console.log(`Error Explanation: "${result.errorExplanation}"`);
    }
    console.log(`Takeaway: "${result.takeaway}"`);
    console.log("-------------------------------------------------------");
    console.log("🚀 API is ready for DevFest Nashik 2026!");
  } catch (error) {
    console.error("\n❌ API Check Failed:");
    console.error((error as Error).message);
    process.exit(1);
  }
}

main();
