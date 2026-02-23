"use client";
import { cn } from "@/lib/utils";

export default function Button({ children, variant = "primary", size = "md", className = "", onClick, type = "button", disabled = false, ...props }) {
  const base = "inline-flex items-center justify-center gap-2 font-syne font-bold rounded-xl transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/60 disabled:opacity-50 disabled:cursor-not-allowed btn-shimmer";
  const sizes = { sm: "px-4 py-2.5 text-sm", md: "px-6 py-3.5 text-[0.95rem]", lg: "px-8 py-4 text-base" };
  const variants = {
    primary: "bg-gradient-to-r from-coral to-violet text-white shadow-md hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0",
    outline: "bg-transparent text-[var(--text-dim)] border border-[var(--border)] hover:border-violet hover:text-white hover:-translate-y-0.5",
    ghost: "bg-transparent text-[var(--muted)] hover:text-white hover:bg-white/5",
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
