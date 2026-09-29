import React from "react";
import { LIMITS } from "@/config/app.config";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({ value, onChange, onClose }: ErrorMessageInputProps) {
  return (
    <div className="bg-[#EFF2FB] border-b-[3px] border-[#141414] px-4 md:px-6 py-3 flex flex-col gap-2 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4C80F0]"></span>
          <span className="font-mono text-xs font-black uppercase tracking-wider text-[#141414]">
            ATTACH TERMINAL TRACEBACK / COMPILER ERROR (OPTIONAL)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[#141414]/60">
            {value.length.toLocaleString()} / {LIMITS.maxErrorMessageLength.toLocaleString()}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono font-bold text-[#141414] hover:text-[#D9503F] px-2 py-0.5 rounded border border-[#141414]/20 hover:border-[#D9503F] transition-colors cursor-pointer"
          >
            Dismiss ✕
          </button>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={LIMITS.maxErrorMessageLength}
        rows={3}
        placeholder={`Traceback (most recent call last):
  File "solution.py", line 5, in <module>
    total = total - discount
TypeError: unsupported operand type(s) for -: 'int' and 'str'`}
        className="w-full bg-white text-[#141414] font-mono text-xs p-3 rounded-lg nb-border-2 outline-none focus:ring-2 focus:ring-[#4C80F0] placeholder:text-[#141414]/30 resize-none leading-relaxed"
      />
    </div>
  );
}
