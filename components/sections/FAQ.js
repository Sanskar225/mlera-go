"use client";
import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import { FAQS } from "@/lib/constants";
import { Plus, Minus } from "lucide-react";

function AccordionItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <AnimatedSection delay={index * 60}>
      <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-[var(--border-hover)] bg-[var(--surface)]" : "border-[var(--border)] bg-[var(--surface)]/40 hover:border-[var(--border-hover)]"}`}>
        <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" aria-expanded={open}>
          <span className="font-syne font-semibold text-[0.95rem] text-[var(--text-dim)]">{q}</span>
          <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? "border-coral/50 bg-coral/10 text-coral" : "border-white/10 text-[var(--muted)]"}`}>
            {open ? <Minus size={13} /> : <Plus size={13} />}
          </span>
        </button>
        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}>
          <div className="px-6 pb-6">
            <div className="h-px bg-gradient-to-r from-violet/20 to-transparent mb-4" />
            <p className="text-[var(--muted)] font-dm text-sm leading-[1.85]">{a}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-[var(--surface)]/20">
      <GlowOrb color="purple" size={450} opacity={0.07} top="20%" right="-5%" />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <AnimatedSection><SectionLabel color="lavender">FAQ</SectionLabel></AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.15] tracking-tight mb-5">
              Questions? <span className="gradient-text">Answered.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}><p className="text-[var(--muted)] font-dm text-lg">Everything you need to know before joining.</p></AnimatedSection>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => <AccordionItem key={faq.q} q={faq.q} a={faq.a} index={i} />)}
        </div>
        <AnimatedSection delay={300}>
          <div className="mt-10 text-center p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/30">
            <p className="text-[var(--muted)] font-dm text-sm">
              Still have questions?{" "}
              <a href="mailto:hello@mlera.dev" className="text-violet hover:text-lavender transition-colors font-medium underline underline-offset-4">Reach out to us</a>
              {" "}— we read every message.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
