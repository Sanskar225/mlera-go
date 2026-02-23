"use client";
import { useTheme } from "@/lib/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 flex items-center justify-center text-[var(--muted)] hover:text-white hover:border-violet/50 transition-all duration-200 hover:bg-[var(--surface)] ${className}`}
    >
      {theme === "dark"
        ? <Sun size={15} className="text-amber-400" />
        : <Moon size={15} className="text-violet" />
      }
    </button>
  );
}
