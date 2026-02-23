"use client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import { PAIN_POINTS, ABOUT_CARD } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <GlowOrb color="coral" size={450} opacity={0.07} top="10%" right="-5%" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <AnimatedSection><SectionLabel color="coral">The Problem</SectionLabel></AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.15] tracking-tight mb-6">
              The internet has too much ML content.{" "}
              <span className="gradient-text">Not enough clarity.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-[var(--muted)] font-dm text-lg leading-relaxed mb-8">
              Learners today are buried in fragmented tutorials, inconsistent terminology, and passive video content that never builds real understanding.
            </p>
          </AnimatedSection>
          <div className="flex flex-col gap-3">
            {PAIN_POINTS.map((point, i) => (
              <AnimatedSection key={point} delay={260 + i * 70}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/12">
                  <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                  <p className="text-[var(--text-dim)] font-dm text-sm leading-relaxed">{point}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        <AnimatedSection delay={150}>
          <div className="relative">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-violet/10 to-coral/5 rounded-3xl blur-2xl scale-105" />
            <div className="relative bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-card">
              <div className="mb-6">
                <span className="inline-block w-10 h-1 bg-gradient-to-r from-coral to-violet rounded-full" />
                <h3 className="font-syne font-bold text-xl mt-3 mb-1">MLera is the answer</h3>
                <p className="text-[var(--muted)] font-dm text-sm">By focusing on structured progression and concept-first learning, every minute actually sticks.</p>
              </div>
              <div className="flex flex-col gap-5">
                {ABOUT_CARD.map(({ label, value, color }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <span className={`text-xs font-syne font-bold tracking-widest uppercase min-w-[48px] pt-0.5 ${color}`}>{label}</span>
                    <div className="h-4 w-px bg-white/10 shrink-0 mt-0.5" />
                    <p className="text-[var(--text-dim)] font-dm text-sm leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-[var(--border)]">
                <p className="text-[var(--muted)] text-xs font-dm mb-2">Concept retention vs. traditional platforms</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-coral to-violet" style={{ width: "78%" }} />
                  </div>
                  <span className="text-sm font-syne font-bold gradient-text">78%</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
