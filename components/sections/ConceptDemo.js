"use client";
import { useState, useEffect, useRef } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import LexiconTooltip from "@/components/ui/LexiconTooltip";

// ─── Canvas-based Gradient Descent Visualizer ────────────────
function GradientViz({ isRunning, resetKey }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ x: 0.05, trail: [] });

  useEffect(() => {
    stateRef.current = { x: 0.05, trail: [] };
  }, [resetKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // Loss curve function
    const loss = (x) => 4*x*x*x*x - 3*x*x*x + 0.5*x*x + 0.3;
    const toX = (x) => (x + 0.1) * (W / 1.3);
    const toY = (y) => H - 20 - (y / 0.8) * (H - 40);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "rgba(13,10,26,0.95)";
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = "rgba(139,92,246,0.07)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        ctx.beginPath(); ctx.moveTo(0, H/4*i); ctx.lineTo(W, H/4*i); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(W/4*i, 0); ctx.lineTo(W/4*i, H); ctx.stroke();
      }

      // Curve fill
      const fillGrad = ctx.createLinearGradient(0, 0, 0, H);
      fillGrad.addColorStop(0, "rgba(192,132,252,0.08)");
      fillGrad.addColorStop(1, "rgba(192,132,252,0)");
      ctx.beginPath();
      for (let xi = -0.1; xi <= 1.2; xi += 0.01) {
        const cx = toX(xi), cy = toY(loss(xi));
        xi === -0.1 ? ctx.moveTo(cx, H) : null;
        ctx.lineTo(cx, cy);
      }
      ctx.lineTo(toX(1.2), H);
      ctx.closePath();
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Curve line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(192,132,252,0.7)";
      ctx.lineWidth = 2.5;
      for (let xi = -0.1; xi <= 1.2; xi += 0.008) {
        const cx = toX(xi), cy = toY(loss(xi));
        xi <= -0.09 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
      }
      ctx.stroke();

      // Trail
      const trail = stateRef.current.trail;
      trail.forEach((pt, i) => {
        const alpha = (i / trail.length) * 0.45;
        ctx.beginPath();
        ctx.arc(pt.cx, pt.cy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,107,${alpha})`;
        ctx.fill();
      });

      // Ball glow
      const bx = stateRef.current.x;
      const by = loss(bx);
      const cx = toX(bx), cy = toY(by);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
      glow.addColorStop(0, "rgba(255,107,107,0.45)");
      glow.addColorStop(1, "rgba(255,107,107,0)");
      ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI*2);
      ctx.fillStyle = glow; ctx.fill();

      // Ball
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI*2);
      ctx.fillStyle = "#FF6B6B"; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1.5; ctx.stroke();

      // Label
      ctx.fillStyle = "rgba(255,107,107,0.9)";
      ctx.font = "bold 11px 'DM Sans', sans-serif";
      ctx.fillText(`Loss: ${by.toFixed(4)}`, cx + 14, cy - 12);

      // Axis labels
      ctx.fillStyle = "rgba(155,147,184,0.55)";
      ctx.font = "10px 'DM Sans', sans-serif";
      ctx.fillText("Parameters →", W - 85, H - 4);
      ctx.save(); ctx.translate(12, H/2); ctx.rotate(-Math.PI/2);
      ctx.fillText("Loss ↑", -18, 0); ctx.restore();
    };

    const animate = () => {
      if (isRunning) {
        const lr = 0.018;
        const { x } = stateRef.current;
        const dx = 16*x*x*x - 9*x*x + x;
        const newX = Math.max(0.04, Math.min(x - lr * dx, 1.15));
        stateRef.current.trail.push({ cx: toX(x), cy: toY(loss(x)) });
        if (stateRef.current.trail.length > 35) stateRef.current.trail.shift();
        stateRef.current.x = newX;
      }
      draw();
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isRunning]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={190}
      className="w-full rounded-xl border border-[var(--border)]"
    />
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function ConceptDemo() {
  const [activeTab, setActiveTab] = useState("viz");
  const [isRunning, setIsRunning] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setIsRunning(false);
    setResetKey((k) => k + 1);
  };

  return (
    <section id="demo" className="section-padding relative overflow-hidden bg-[var(--surface)]/20">
      <GlowOrb color="coral" size={500} opacity={0.07} top="10%" left="-10%" />
      <GlowOrb color="purple" size={400} opacity={0.07} bottom="0%" right="-5%" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <AnimatedSection>
            <SectionLabel color="coral">Live Concept Demo</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.15] tracking-tight mb-5">
              Don't read about it.{" "}
              <span className="gradient-text">Experience it.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-lg mx-auto">
              This is MLera's differentiator in action: click any highlighted term for an instant, clear explanation. Watch gradient descent live.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={150}>
          <div className="max-w-4xl mx-auto bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-card">
            {/* Tabs */}
            <div className="flex border-b border-[var(--border)] bg-[var(--surface-2)]/40">
              {[
                { id: "viz", label: "⚡ Gradient Descent Visualizer" },
                { id: "lexicon", label: "📖 Lexicon in Action" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-syne font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? "border-coral text-coral"
                      : "border-transparent text-[var(--muted)] hover:text-[var(--text-dim)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="ml-auto flex items-center px-5">
                <span className="text-[10px] font-syne uppercase tracking-widest text-[var(--muted)]/50">MLera Demo</span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Gradient Descent Tab */}
              {activeTab === "viz" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="font-syne font-bold text-lg mb-4">
                      How does a model <span className="gradient-text">learn</span>?
                    </h3>
                    <p className="text-[var(--text-dim)] font-dm text-sm leading-[1.9] mb-5">
                      During training,{" "}
                      <LexiconTooltip word="Gradient Descent">Gradient Descent</LexiconTooltip>{" "}
                      adjusts the model's{" "}
                      <LexiconTooltip word="Parameters">Parameters</LexiconTooltip>{" "}
                      step-by-step. Each step is scaled by the{" "}
                      <LexiconTooltip word="Learning Rate">Learning Rate</LexiconTooltip>
                      , and the goal is to minimize the{" "}
                      <LexiconTooltip word="Loss Function">Loss Function</LexiconTooltip>.
                    </p>
                    <p className="text-[var(--muted)] font-dm text-xs leading-relaxed p-3.5 rounded-xl border border-[var(--border)] bg-[var(--deep)]/40 mb-6">
                      👆 <strong className="text-[var(--text-dim)]">Click any highlighted term</strong> — this is exactly how MLera's inline lexicon works in real lessons.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsRunning((r) => !r)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-syne font-bold transition-all duration-200 border ${
                          isRunning
                            ? "bg-coral/10 border-coral/40 text-coral"
                            : "bg-gradient-to-r from-coral to-violet text-white border-transparent hover:-translate-y-0.5 hover:shadow-glow-coral"
                        }`}
                      >
                        {isRunning ? "⏸ Pause" : "▶ Run Gradient Descent"}
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-4 py-2.5 rounded-xl text-sm font-syne font-semibold text-[var(--muted)] border border-[var(--border)] hover:border-white/20 hover:text-[var(--text-dim)] transition-all"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[var(--muted)] text-xs font-dm mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-coral inline-block animate-pulse" />
                      Watch the <span className="text-coral font-medium">red ball</span> descend toward minimum loss
                    </p>
                    <GradientViz isRunning={isRunning} resetKey={resetKey} />
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {[{ l: "Algorithm", v: "Gradient Descent" }, { l: "Objective", v: "Minimize Loss" }].map(({ l, v }) => (
                        <div key={l} className="rounded-xl bg-[var(--deep)]/60 border border-[var(--border)] px-3 py-2.5">
                          <p className="text-[var(--muted)] text-[10px] font-dm uppercase tracking-wider">{l}</p>
                          <p className="text-[var(--text-dim)] text-xs font-syne font-semibold mt-0.5">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Lexicon Tab */}
              {activeTab === "lexicon" && (
                <div className="max-w-2xl">
                  <h3 className="font-syne font-bold text-lg mb-2">MLera lexicon — in real context</h3>
                  <p className="text-[var(--muted)] font-dm text-sm mb-6">
                    Every technical term is clickable. No tab-switching. No Googling. Just click and understand.
                  </p>
                  <div className="bg-[var(--deep)]/60 border border-[var(--border)] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[10px] font-syne uppercase tracking-widest text-[var(--muted)] mb-1">Module 2 · Neural Networks · Lesson 4</p>
                        <h4 className="font-syne font-bold text-base">Understanding Backpropagation</h4>
                      </div>
                      <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-syne font-bold px-3 py-1 rounded-full tracking-wider">
                        In Progress
                      </span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full mb-5 overflow-hidden">
                      <div className="h-full w-[63%] rounded-full bg-gradient-to-r from-coral to-violet" />
                    </div>
                    <p className="text-[var(--text-dim)] font-dm text-sm leading-[1.9]">
                      During training, the{" "}
                      <LexiconTooltip word="Gradient Descent">gradient</LexiconTooltip>{" "}
                      flows backward through each layer. The algorithm computes how much each{" "}
                      <LexiconTooltip word="Parameters">weight</LexiconTooltip>{" "}
                      contributed to the error, then updates them using the{" "}
                      <LexiconTooltip word="Learning Rate">learning rate</LexiconTooltip>{" "}
                      to reduce the{" "}
                      <LexiconTooltip word="Loss Function">loss function</LexiconTooltip>.
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
                      <div className="flex -space-x-1">
                        {["#FF6B6B","#C084FC","#8B5CF6","#34D399"].map((c) => (
                          <span key={c} className="w-3 h-3 rounded-full border border-[var(--deep)]" style={{ background: c }} />
                        ))}
                      </div>
                      <p className="text-[var(--muted)] text-xs font-dm">4 lexicon terms in this lesson — click any to explore</p>
                    </div>
                  </div>
                  <p className="text-[var(--muted)]/60 text-xs font-dm mt-4 text-center italic">
                    This is exactly how MLera's real lesson interface works.
                  </p>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
