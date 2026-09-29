import React from "react";
import { APP } from "@/config/app.config";
import { DevFest26Logo, GDGNashikLogo } from "./Logos";

export function TopBar() {
  return (
    <header className="w-full px-4 md:px-6 pt-5 pb-2 flex justify-center sticky top-0 z-40">
      <nav className="w-full max-w-[1240px] min-h-[64px] md:h-[72px] bg-white rounded-2xl md:rounded-full nb-border nb-shadow px-4 md:px-8 py-2 md:py-0 flex flex-wrap items-center justify-between gap-3 transition-transform duration-200">
        {/* LEFT: GDG NASHIK BRANDING */}
        <div className="flex items-center gap-2">
          <GDGNashikLogo />
        </div>

        {/* CENTER: WORDMARK & EDITION */}
        <div className="flex items-center gap-2">
          <div className="text-lg md:text-2xl font-black tracking-tight text-[#141414] flex items-center gap-1.5 font-display">
            <span>{APP.name.toUpperCase()}</span>
            <span className="text-[11px] bg-[#141414] text-white px-1.5 py-0.5 rounded font-mono font-bold">
              {APP.version}
            </span>
          </div>
          <span className="hidden sm:inline-block bg-[#EDB13E] text-[#141414] text-[10px] md:text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full nb-border-2 tracking-wider">
            {APP.edition}
          </span>
        </div>

        {/* RIGHT: DEVFEST 2026 LOGO */}
        <div className="flex items-center gap-2">
          <DevFest26Logo />
        </div>
      </nav>
    </header>
  );
}
