"use client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import { OUTCOMES, MILESTONES } from "@/lib/constants";

export default function LearningOutcomes() {
  return (
    <section id="outcomes" className="section-padding relative overflow-hidden">
      <GlowOrb color="purple" size={500} opacity={0.08} top="0%" right="-8%" />
      <GlowOrb color="coral" size={350} opacity={0.07} bottom="10%" left="-5%" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedSection><SectionLabel color="purple">Outcomes</SectionLabel></AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.15] tracking-tight mb-5">
              What you'll be able to <span className="gradient-text">do</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-md mx-auto leading-relaxed">
              MLera is outcome-driven. Here's exactly what changes after completing a structured path.
            </p>
          </AnimatedSection>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {OUTCOMES.map((o, i) => (
            <AnimatedSection key={o.title} delay={80 + (i % 3) * 80}>
              <div className="group h-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 card-hover">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-syne font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                    style={{ color: o.color, borderColor: `${o.color}35`, background: `${o.color}10` }}>{o.tag}</span>
                  <span className="text-2xl">{o.icon}</span>
                </div>
                <h3 className="font-syne font-bold text-[0.95rem] leading-snug mb-3 group-hover:text-white transition-colors">{o.title}</h3>
                <p className="text-[var(--muted)] font-dm text-sm leading-relaxed">{o.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={200}>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-8">
              <div>
                <h3 className="font-syne font-bold text-xl mb-1">Your Learning Journey</h3>
                <p className="text-[var(--muted)] font-dm text-sm">A typical MLera structured path, from zero to applied.</p>
              </div>
              <span className="bg-violet/10 border border-violet/25 text-violet text-xs font-syne font-bold px-3 py-1 rounded-full tracking-wider uppercase">Structured Path</span>
            </div>
            <div className="relative">
              <div aria-hidden className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-coral via-violet to-emerald-400 opacity-25" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {MILESTONES.map((m, i) => (
                  <div key={m.week} className="flex flex-col items-center text-center relative">
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-syne font-bold mb-3 z-10 bg-[var(--surface)]"
                      style={{ borderColor: m.color, color: m.color, boxShadow: `0 0 16px ${m.color}30` }}>{i + 1}</div>
                    <p className="text-[10px] font-syne font-bold uppercase tracking-wider mb-1" style={{ color: m.color }}>{m.week}</p>
                    <p className="text-[var(--text-dim)] text-xs font-dm">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
              {[
                { color: "text-emerald-400", text: "At your own pace — no deadlines" },
                { color: "text-violet", text: "Comprehension verified before advancing" },
                { color: "text-coral", text: "Lexicon available through every lesson" },
              ].map(({ color, text }) => (
                <div key={text} className={`flex items-center gap-2 ${color} text-sm font-dm`}><span>✓</span><span>{text}</span></div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
