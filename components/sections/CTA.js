"use client";
import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import NeuralIcon from "@/components/ui/NeuralIcon";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

async function submitEmail(email) {
  await new Promise((r) => setTimeout(r, 1400));
  return { success: true };
}

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const isValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid(email)) { setErrorMsg("Please enter a valid email address."); setStatus("error"); return; }
    setStatus("loading"); setErrorMsg("");
    try {
      await submitEmail(email.trim());
      setStatus("success");
    } catch {
      setStatus("error"); setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="join" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <GlowOrb color="purple" size={700} opacity={0.11} top="-30%" left="50%" />
      <GlowOrb color="coral" size={400} opacity={0.07} bottom="-10%" left="10%" />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <div className="flex justify-center mb-6"><NeuralIcon size={48} className="animate-float" /></div>
        </AnimatedSection>
        <AnimatedSection delay={80}><SectionLabel color="purple" className="flex justify-center">Early Access</SectionLabel></AnimatedSection>
        <AnimatedSection delay={160}>
          <h2 className="font-syne font-extrabold text-5xl md:text-6xl leading-[1.1] tracking-tight mb-6">
            Ready to learn ML <span className="gradient-text">the right way?</span>
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={240}>
          <p className="text-[var(--muted)] font-dm text-lg leading-relaxed mb-10">
            Join the waitlist for MLera's early access and be among the first to experience structured, concept-driven Machine Learning education.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={320}>
          {status === "success" ? (
            <div className="inline-flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-8 py-6">
              <CheckCircle className="text-emerald-400 shrink-0" size={28} />
              <div className="text-left">
                <p className="font-syne font-bold text-emerald-400 text-base">You're on the list! 🎉</p>
                <p className="text-[var(--muted)] text-sm font-dm mt-0.5">We'll reach out when early access opens. No spam, ever.</p>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center" noValidate>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }} placeholder="Enter your email" disabled={status === "loading"} aria-label="Email address" className={`input-base flex-1 min-w-0 max-w-sm px-5 py-3.5 text-sm ${status === "error" ? "border-coral/60" : ""}`} />
                <button type="submit" disabled={status === "loading"} className="btn-shimmer inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-syne font-bold text-sm text-white bg-gradient-to-r from-coral to-violet transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                  {status === "loading" ? (<><Loader2 size={15} className="animate-spin" />Joining...</>) : "Join Waitlist →"}
                </button>
              </form>
              {status === "error" && errorMsg && (
                <div className="flex items-center justify-center gap-2 mt-3 text-coral text-sm font-dm" role="alert">
                  <AlertCircle size={14} />{errorMsg}
                </div>
              )}
              <p className="text-[var(--muted)]/50 text-xs font-dm mt-4">No credit card · No spam · Unsubscribe anytime</p>
            </>
          )}
        </AnimatedSection>
        <AnimatedSection delay={400}>
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            {[["🏛️","IIIT Dharwad Research Park"],["🔬","Research-backed pedagogy"],["🎯","Concept-first always"]].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2 text-[var(--muted)]/60 text-xs font-dm">
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
