export const APP = {
  name: "Code Roaster",
  edition: "Desi Edition",
  version: "v2",
  tagline: "Your code. Our problem now.",
  subTagline: "Paste your code. Pick your roast. Get humbled. Get the fix.",
  event: "DevFest Nashik 2026",
  organizer: "Google Developer Groups Nashik",
} as const;

export const AI = {
  model: "gemini-3.5-flash-lite",
  modelLabel: "Gemini 3.5 Flash-Lite",
  maxAttempts: 3,
} as const;

export const ROAST_LEVELS = [
  {
    id: "dry",
    label: "Halka (Dry)",
    spiceIcon: "🌱",
    description: "Mild and deadpan. Gentle jabs, mostly helpful.",
  },
  {
    id: "sharp",
    label: "Tikha (Sharp)",
    spiceIcon: "🌶️",
    description: "Pointed and witty. Calls out every mistake directly with spicy Hinglish humor.",
  },
  {
    id: "savage",
    label: "Zanzanit (Savage)",
    spiceIcon: "🔥",
    description: "Maximum burn. Brutally honest Panchavati Express roast, but still technically accurate.",
  },
] as const;

export const PERSONAS = [
  {
    id: "standup",
    label: "Stand-up Roaster",
    icon: "🎭",
    description: "Desi stand-up comedian style with Bollywood analogies and punchlines.",
  },
  {
    id: "sharmaji",
    label: "Sharma ji ka Beta",
    icon: "☕",
    description: "Compares your code to 99.9% percentile perfection and guilt trips you.",
  },
  {
    id: "professor",
    label: "Strict Professor",
    icon: "📚",
    description: "Engineering college viva vibes with zero internal marks threats.",
  },
  {
    id: "hostel_bhau",
    label: "Hostel Bhau",
    icon: "🛏️",
    description: "Late-night hostel senior giving jugad and tapri chai advice.",
  },
  {
    id: "recruiter",
    label: "Campus Recruiter",
    icon: "💼",
    description: "Brutal resume-screening rejection energy: 'We will get back to you'.",
  },
] as const;

export const LANGUAGES = [
  { id: "python", label: "Python", extension: "py" },
  { id: "javascript", label: "JavaScript", extension: "js" },
  { id: "typescript", label: "TypeScript", extension: "ts" },
  { id: "java", label: "Java", extension: "java" },
  { id: "c", label: "C", extension: "c" },
  { id: "cpp", label: "C++", extension: "cpp" },
  { id: "go", label: "Go", extension: "go" },
  { id: "rust", label: "Rust", extension: "rs" },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "sharp",
  persona: "standup",
} as const;

export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
} as const;

export const SAMPLE = {
  language: "python",
  code: `def calculate_chai_bill(cups, price_per_cup):
    total = cups * price_per_cup
    if cups = 10:  # Bhau forgot double equals ==
        discount = "free samosa"
        total = total - discount  # TypeError incoming 💥
    return total

# Nashik tea stall logic waiting for DevFest roast...
print(calculate_chai_bill(10, 15))`,
  errorMessage: `File "solution.py", line 3
    if cups = 10:
            ^
SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?`,
} as const;
