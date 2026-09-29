"use client";

import React, { useEffect, useState } from "react";

const MESSAGES = [
  "Compiler ki chai thandi ho rahi hai… ☕",
  "Sharma ji ke bete se comparison chal raha hai… 🤦",
  "Bhau, roast tayyar ho raha hai… 🔥",
  "Panchavati Express se bhi late hai tumhara code… 🚂",
  "Gemini is analyzing algorithmic dhua-dhua… ⚡",
];

export function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#FAF6EE] border-2 border-[#141414] rounded-2xl p-8 flex flex-col items-center text-center nb-shadow">
        {/* Tilted Outlined Square Loader */}
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-[#EDB13E] rounded-xl nb-border animate-spin duration-3000 flex items-center justify-center nb-shadow">
            <span className="font-mono text-2xl font-black text-[#141414]">⚡</span>
          </div>
        </div>

        {/* Loading Titles */}
        <h3 className="text-xl font-black text-[#141414] mb-2 tracking-tight font-display">
          MARINATING YOUR ROAST...
        </h3>

        {/* Rotating Hinglish message */}
        <div className="h-10 flex items-center justify-center">
          <p className="text-xs md:text-sm font-bold text-[#D9503F] font-mono leading-relaxed transition-opacity duration-300">
            {MESSAGES[index]}
          </p>
        </div>

        <p className="text-[11px] text-[#141414]/60 font-mono mt-4">
          Evaluating time complexity, logic slip-ups &amp; desi anti-patterns
        </p>
      </div>
    </div>
  );
}
