import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const paddedNum = number.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b-2 border-[#141414] pb-2 mb-3">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs md:text-sm font-black text-[#D9503F]">
          {paddedNum} //
        </span>
        <span className="font-mono text-xs md:text-sm font-black uppercase tracking-wider text-[#141414]">
          {title}
        </span>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
