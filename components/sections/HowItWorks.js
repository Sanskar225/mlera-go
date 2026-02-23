"use client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import LexiconTooltip from "@/components/ui/LexiconTooltip";
import { STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <GlowOrb color="lavender" size={450} opacity={0.09} top="0%" right="-5%" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <AnimatedSection><SectionLabel color="coral">The Learning Flow</SectionLabel></AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.15] tracking-tight mb-5">
              From zero to <span className="gradient-text">genuine intuition</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-md mx-auto">Four clear stages designed to build real understanding, not just familiarity.</p>
          </AnimatedSection>
        </div>
        <div className="hidden md:grid grid-cols-4 gap-8 relative mb-16">
          <div aria-hidden className="absolute top-[28px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-coral via-lavender to-violet opacity-25" />
          {STEPS.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 120}>
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-coral/15 to-violet/15 border border-[var(--border)] flex items-center justify-center mb-6 shadow-glow">
                  <span className="font-syne font-extrabold text-sm gradient-text">{step.number}</span>
                </div>
                <h3 className="font-syne font-bold text-base mb-3">{step.title}</h3>
                <p className="text-[var(--muted)] font-dm text-sm leading-relaxed">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="md:hidden flex flex-col gap-0 relative mb-16">
          <div aria-hidden className="absolute top-0 bottom-0 left-7 w-px bg-gradient-to-b from-coral via-violet to-violet/20 opacity-30" />
          {STEPS.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 100}>
              <div className="flex gap-6 pb-10">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-coral/15 to-violet/15 border border-[var(--border)] flex items-center justify-center z-10">
                  <span className="font-syne font-extrabold text-sm gradient-text">{step.number}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-syne font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-[var(--muted)] font-dm text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={200}>
          <div className="max-w-2xl mx-auto bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[var(--muted)] text-[10px] font-dm mb-1 tracking-wider uppercase">Module 3 · Neural Networks</p>
                <h4 className="font-syne font-bold text-base">Understanding Backpropagation</h4>
              </div>
              <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-syne font-bold px-3 py-1 rounded-full tracking-wide">In Progress</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-5">
              <div className="h-full w-[63%] rounded-full bg-gradient-to-r from-coral to-violet" />
            </div>
            <div className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]">
              <p className="text-[var(--text-dim)] font-dm text-sm leading-[1.9]">
                During training, the{" "}
                <LexiconTooltip word="Gradient Descent">gradient</LexiconTooltip>{" "}
                flows backward through each layer, adjusting{" "}
                <LexiconTooltip word="Parameters">weights</LexiconTooltip>{" "}
                to minimize the{" "}
                <LexiconTooltip word="Loss Function">loss function</LexiconTooltip>.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
