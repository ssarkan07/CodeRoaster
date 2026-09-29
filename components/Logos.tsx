import React from "react";

/**
 * Official Google Developer Groups Nashik Logo
 * Preserved with official 4-color brackets: Red (#EA4335), Blue (#4285FA), Green (#34A853), Yellow (#F9AB00)
 */
export function GDGNashikLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 4-Color Brackets */}
      <svg className="w-8 h-8 shrink-0" viewBox="0 0 187 111" fill="none">
        <path
          d="M55.5846 13.2663L17.3299 40.755C9.30045 46.5248 7.46859 57.7113 13.2384 65.7408L13.2418 65.7457C19.0116 73.7751 30.1981 75.607 38.2276 69.8372L76.4822 42.3485C84.5117 36.5787 86.3436 25.3922 80.5738 17.3627L80.5703 17.3579C74.8006 9.32841 63.614 7.49654 55.5846 13.2663Z"
          fill="#EA4335"
        />
        <path
          d="M13.2575 44.8246L13.254 44.8295C7.48421 52.859 9.31608 64.0455 17.3456 69.8153L55.6002 97.304C63.6297 103.074 74.8162 101.242 80.586 93.2124L80.5894 93.2076C86.3592 85.1781 84.5274 73.9916 76.4979 68.2218L38.2433 40.7331C30.2138 34.9633 19.0272 36.7952 13.2575 44.8246Z"
          fill="#4285FA"
        />
        <path
          d="M148.012 40.7732L109.757 68.2619C101.728 74.0317 99.8958 85.2182 105.666 93.2477L105.669 93.2525C111.439 101.282 122.625 103.114 130.655 97.3441L168.909 69.8554C176.939 64.0856 178.771 52.8991 173.001 44.8696L172.998 44.8647C167.228 36.8352 156.041 35.0034 148.012 40.7732Z"
          fill="#F9AB00"
        />
        <path
          d="M105.677 17.3295L105.673 17.3344C99.9036 25.3639 101.736 36.5504 109.765 42.3202L148.02 69.8089C156.049 75.5787 167.236 73.7468 173.005 65.7173L173.009 65.7125C178.779 57.683 176.947 46.4965 168.917 40.7267L130.663 13.238C122.633 7.46817 111.447 9.30004 105.677 17.3295Z"
          fill="#34A853"
        />
      </svg>
      <div className="leading-tight">
        <span className="block text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-[#141414]">
          Google Developer Groups
        </span>
        <span className="block text-xs md:text-sm font-black text-[#4285FA] tracking-tight">
          Nashik
        </span>
      </div>
    </div>
  );
}

/**
 * Official DevFest Nashik 2026 Logo
 * Preserved with mustard brackets (#F9AB00), heavy black stroke, and Nashik '26 pill
 */
export function DevFest26Logo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1.5 bg-[#FAF6EE] px-3 py-1.5 rounded-full nb-border-2">
        {/* Festive DevFest Brackets */}
        <svg
          className="w-4 h-4 text-[#F9AB00]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        <span className="font-black text-xs tracking-tight text-[#141414]">DEVFEST</span>
        <span className="bg-[#141414] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          Nashik &apos;26
        </span>
      </div>
    </div>
  );
}

/**
 * Warli Stick Developer Figure Celebrating Bug Fix
 */
export function WarliDevFigure({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <circle cx="12" cy="5" r="2.5" fill="currentColor" />
      {/* Upper Triangle Body */}
      <polygon points="12,8 8,14 16,14" fill="currentColor" />
      {/* Lower Triangle Body */}
      <polygon points="12,17 8,14 16,14" fill="currentColor" />
      {/* Celebrating Raised Arms */}
      <line x1="8" y1="11" x2="4" y2="7" strokeWidth="2.5" />
      <line x1="16" y1="11" x2="20" y2="7" strokeWidth="2.5" />
      {/* Legs */}
      <line x1="10" y1="17" x2="8" y2="22" strokeWidth="2.5" />
      <line x1="14" y1="17" x2="16" y2="22" strokeWidth="2.5" />
    </svg>
  );
}
