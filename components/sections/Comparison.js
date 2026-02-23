"use client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import { COMPARISON_ITEMS } from "@/lib/constants";
import { Check, X } from "lucide-react";

export default function Comparison() {
  return (
    <section id="comparison" className="section-padding relative overflow-hidden bg-[var(--surface)]/30">
      <GlowOrb color="purple" size={500} opacity={0.08} bottom="0%" left="50%" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <AnimatedSection><SectionLabel color="purple">Why MLera</SectionLabel></AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.15] tracking-tight mb-5">
              MLera vs. <span className="text-[var(--muted)]">everything else</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}><p className="text-[var(--muted)] font-dm text-lg max-w-sm mx-auto">Side-by-side, no fluff.</p></AnimatedSection>
        </div>
        <AnimatedSection delay={150}>
          <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-card">
            <div className="grid grid-cols-3 bg-[var(--surface-2)]">
              <div className="px-6 py-5 font-syne font-bold text-[var(--muted)] text-sm uppercase tracking-wider">Feature</div>
              <div className="px-6 py-5 text-center border-x border-[var(--border)]"><span className="font-syne font-extrabold text-base gradient-text">MLera</span></div>
              <div className="px-6 py-5 text-center"><span className="font-syne font-bold text-[var(--muted)] text-sm">Other Platforms</span></div>
            </div>
            {COMPARISON_ITEMS.map((item, i) => (
              <div key={item.feature} className={`grid grid-cols-3 border-t border-[var(--border)] hover:bg-white/[0.015] transition-colors ${i % 2 === 0 ? "bg-[var(--surface)]/40" : "bg-[var(--surface)]/20"}`}>
                <div className="px-6 py-4 font-dm text-sm text-[var(--text-dim)] flex items-center">{item.feature}</div>
                <div className="px-6 py-4 flex items-center justify-center border-x border-[var(--border)]">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${item.mlera ? "bg-emerald-500/10 border-emerald-500/25" : "bg-red-500/10 border-red-500/25"}`}>
                    {item.mlera ? <Check size={14} className="text-emerald-400" /> : <X size={14} className="text-red-400" />}
                  </div>
                </div>
                <div className="px-6 py-4 flex items-center justify-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${item.others ? "bg-emerald-500/10 border-emerald-500/25" : "bg-red-500/10 border-red-500/25"}`}>
                    {item.others ? <Check size={14} className="text-emerald-400" /> : <X size={14} className="text-red-400" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
