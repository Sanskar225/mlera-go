"use client";

import { useTypewriter } from "@/lib/hooks/useTypewriter";
import { scrollToSection } from "@/lib/utils";
import NeuralIcon from "@/components/ui/NeuralIcon";
import Button from "@/components/ui/Button";
import GlowOrb from "@/components/ui/GlowOrb";
import { TYPEWRITER_WORDS, HERO_STATS } from "@/lib/constants";

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_WORDS, 70, 40, 2000);

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-[5%] pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <GlowOrb color="purple" size={800} opacity={0.1} top="-10%" left="-5%" />
      <GlowOrb color="coral" size={600} opacity={0.07} bottom="5%" right="5%" />
      <GlowOrb color="lavender" size={400} opacity={0.05} top="40%" left="40%" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <div className="animate-fade-up inline-flex items-center gap-2 bg-violet/10 border border-violet/25 rounded-full px-4 py-1.5 mb-5">
            <span className="animate-pulse-glow w-2 h-2 rounded-full bg-violet inline-block" />
            <span className="text-lavender text-xs font-syne font-semibold tracking-[0.1em] uppercase">Built at IIIT Dharwad Research Park</span>
          </div>
          <h1 className="animate-fade-up font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-4">
            Machine Learning,
            <br />
            <span className="gradient-text text-5xl md:text-6xl lg:text-7xl">
              {typed}
              <span className="cursor-blink text-violet">|</span>
            </span>
          </h1>
          <p className="animate-fade-up text-[var(--muted)] text-base md:text-lg font-dm leading-relaxed max-w-2xl mx-auto">
            Stop drowning in scattered tutorials. MLera gives you{" "}
            <strong className="text-[var(--text-dim)] font-medium">structured paths, concept clarity,</strong>{" "}
            and a <strong className="text-[var(--text-dim)] font-medium">built-in lexicon</strong>.
          </p>
        </div>

        <div className="flex justify-center mb-16 lg:mb-20">
          <div className="animate-fade-up w-full max-w-2xl">
            <div className="bg-[var(--surface)]/40 backdrop-blur-md border border-[var(--border)] rounded-2xl p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {HERO_STATS.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-syne font-extrabold text-xl md:text-2xl gradient-text mb-0.5">{value}</p>
                    <p className="text-[var(--muted)] text-xs font-dm">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3 animate-fade-up">
            <div className="bg-[var(--surface)]/30 backdrop-blur-md border border-[var(--border)] rounded-2xl p-5 h-full flex flex-col justify-center gap-3">
              <Button onClick={() => scrollToSection("join")} size="md" className="w-full">Get Early Access →</Button>
              <Button variant="outline" size="md" onClick={() => scrollToSection("demo")} className="w-full">Watch Demo</Button>
              <p className="text-[0.7rem] text-[var(--muted)] text-center mt-1">No credit card required</p>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up">
            <div className="bg-[var(--surface)]/40 backdrop-blur-md border border-[var(--border)] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <NeuralIcon size={24} />
                <h3 className="text-xs font-syne font-semibold text-[var(--muted)] tracking-wider">CORE FEATURES</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {[
                  { label: "Structured paths", color: "text-coral" },
                  { label: "Concept-first learning", color: "text-violet" },
                  { label: "Built-in ML lexicon", color: "text-lavender" },
                  { label: "Guided progression", color: "text-emerald-400" },
                ].map(({ label, color }, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-dm text-[var(--text-dim)]">
                    <span className={`${color} text-base`}>✓</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 animate-fade-up animate-float">
            <div className="bg-[var(--surface)]/40 backdrop-blur-md border border-[var(--border)] rounded-2xl overflow-hidden group p-4">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/20 mb-3">
                <video className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" autoPlay muted loop playsInline>
                  <source src="/assets/Branding_Video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30">
                    <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-violet/20 rounded-lg flex items-center justify-center">
                    <span className="text-violet text-xs">▶</span>
                  </div>
                  <span className="text-xs font-syne font-semibold text-[var(--muted)]">INTRO</span>
                </div>
                <span className="text-xs bg-violet/20 text-violet px-2 py-0.5 rounded-full">0:30</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-[var(--border)] rounded-full flex justify-center">
            <div className="w-1 h-1.5 bg-violet rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
