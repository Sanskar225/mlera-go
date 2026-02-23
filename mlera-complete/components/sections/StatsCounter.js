"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { STATS } from "@/lib/constants";

function Counter({ target, suffix, color, isVisible }) {
  const [count, setCount] = useState(0);
  const animated = useRef(false);
  useEffect(() => {
    if (!isVisible || animated.current) return;
    animated.current = true;
    const steps = 60;
    const duration = 1800;
    let current = 0;
    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return (
    <span className="font-syne font-extrabold text-5xl md:text-6xl tabular-nums" style={{ background: `linear-gradient(135deg, ${color}, ${color}80)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="py-20 px-[5%] relative overflow-hidden" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] rounded-3xl overflow-hidden border border-[var(--border)]">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[var(--surface)]/60 px-8 py-10 flex flex-col items-center text-center hover:bg-[var(--surface)]/90 transition-colors duration-300">
              <Counter target={s.value} suffix={s.suffix} color={s.color} isVisible={inView} />
              <p className="font-syne font-bold text-sm mt-3 mb-1">{s.label}</p>
              <p className="text-[var(--muted)] font-dm text-xs leading-relaxed max-w-[160px]">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
