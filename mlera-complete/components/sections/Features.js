"use client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import { FEATURES } from "@/lib/constants";

const BADGE = {
  violet: "bg-violet/10 text-violet border-violet/25",
  coral: "bg-coral/10 text-coral border-coral/25",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
};

export default function Features() {
  return (
    <section id="features" className="section-padding relative overflow-hidden bg-[var(--surface)]/30">
      <GlowOrb color="purple" size={500} opacity={0.09} top="20%" left="-10%" />
      <GlowOrb color="coral" size={400} opacity={0.06} bottom="10%" right="-5%" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedSection><SectionLabel color="purple">Platform Features</SectionLabel></AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.15] tracking-tight mb-5">
              Everything you need to <span className="gradient-text">actually learn ML</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-lg mx-auto leading-relaxed">
              MLera isn't another content library. It's a learning system engineered for real comprehension.
            </p>
          </AnimatedSection>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <AnimatedSection key={f.id} delay={100 + (i % 3) * 80}>
              <div className="group h-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 card-hover">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral/10 to-violet/10 border border-[var(--border)] flex items-center justify-center text-2xl">{f.icon}</div>
                  <span className={`text-[10px] font-syne font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${BADGE[f.badgeColor]}`}>{f.badge}</span>
                </div>
                <h3 className="font-syne font-bold text-[1.05rem] leading-tight mb-3 group-hover:text-white transition-colors">{f.title}</h3>
                <p className="text-[var(--muted)] font-dm text-sm leading-relaxed">{f.description}</p>
                <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-coral to-violet transition-all duration-500 ease-out rounded-full" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
