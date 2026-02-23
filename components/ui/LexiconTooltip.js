"use client";
import { useState, useEffect, useRef } from "react";
import { LEXICON } from "@/lib/constants";

export default function LexiconTooltip({ word, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const entry = LEXICON[word];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!entry) return <span>{children}</span>;

  return (
    <span ref={ref} className="relative inline-block">
      <span
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer border-b-2 border-dashed font-semibold transition-all duration-150"
        style={{ borderColor: entry.color, color: entry.color }}
        title={`Click to learn: ${word}`}
      >
        {children}
      </span>
      {open && (
        <span
          className="absolute z-50 bottom-full left-1/2 mb-3 w-72 rounded-2xl text-left pointer-events-auto"
          style={{
            transform: "translateX(-50%)",
            background: "var(--surface)",
            border: `1px solid ${entry.color}30`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px ${entry.color}15`,
            animation: "fade-up 0.18s ease forwards",
          }}
        >
          <span className="block px-4 pt-4 pb-3">
            <span className="block text-[10px] font-syne font-bold tracking-widest uppercase mb-2" style={{ color: entry.color }}>
              {word}
            </span>
            <span className="block text-xs font-dm leading-relaxed mb-2.5" style={{ color: "var(--text-dim)" }}>
              {entry.simple}
            </span>
            <span className="block text-[11px] font-dm italic border-t border-white/5 pt-2.5" style={{ color: "var(--muted)" }}>
              💡 {entry.analogy}
            </span>
          </span>
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: `7px solid ${entry.color}30`,
            }}
          />
        </span>
      )}
    </span>
  );
}
