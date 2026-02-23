"use client";
import { useState, useEffect, useRef } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import LexiconTooltip from "@/components/ui/LexiconTooltip";

function GradientViz({ isRunning, resetKey }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ x: 0.05, trail: [] });

  useEffect(() => { stateRef.current = { x: 0.05, trail: [] }; }, [resetKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const loss = (x) => 4*x*x*x*x - 3*x*x*x + 0.5*x*x + 0.3;
    const toX = (x) => (x + 0.1) * (W / 1.3);
    const toY = (y) => H - 20 - (y / 0.8) * (H - 40);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(13,10,26,0.95)";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(139,92,246,0.07)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        ctx.beginPath(); ctx.moveTo(0, H/4*i); ctx.lineTo(W, H/4*i); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(W/4*i, 0); ctx.lineTo(W/4*i, H); ctx.stroke();
      }
      const fillGrad = ctx.createLinearGradient(0, 0, 0, H);
      fillGrad.addColorStop(0, "rgba(192,132,252,0.08)");
      fillGrad.addColorStop(1, "rgba(192,132,252,0)");
      ctx.beginPath();
      for (let xi = -0.1; xi <= 1.2; xi += 0.01) {
        const cx = toX(xi), cy = toY(loss(xi));
        if (xi <= -0.09) { ctx.moveTo(cx, H); ctx.lineTo(cx, cy); }
        else ctx.lineTo(cx, cy);
      }
      ctx.lineTo(toX(1.2), H);
      ctx.closePath();
      ctx.fillStyle = fillGrad;
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(192,132,252,0.7)";
      ctx.lineWidth = 2.5;
      let first = true;
      for (let xi = -0.1; xi <= 1.2; xi += 0.008) {
        const cx = toX(xi), cy = toY(loss(xi));
        if (first) { ctx.moveTo(cx, cy); first = false; } else ctx.lineTo(cx, cy);
      }
      ctx.stroke();
      const trail = stateRef.current.trail;
      trail.forEach((pt, i) => {
        const alpha = (i / trail.length) * 0.45;
        ctx.beginPath(); ctx.arc(pt.cx, pt.cy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,107,107," + alpha + ")"; ctx.fill();
      });
      const bx = stateRef.current.x, by = loss(bx);
      const cx2 = toX(bx), cy2 = toY(by);
      const glow = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, 22);
      glow.addColorStop(0, "rgba(255,107,107,0.45)");
      glow.addColorStop(1, "rgba(255,107,107,0)");
      ctx.beginPath(); ctx.arc(cx2, cy2, 22, 0, Math.PI*2);
      ctx.fillStyle = glow; ctx.fill();
      ctx.beginPath(); ctx.arc(cx2, cy2, 7, 0, Math.PI*2);
      ctx.fillStyle = "#FF6B6B"; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = "rgba(255,107,107,0.9)";
      ctx.font = "bold 11px monospace";
      ctx.fillText("Loss: " + by.toFixed(4), cx2 + 14, cy2 - 12);
      ctx.fillStyle = "rgba(155,147,184,0.55)";
      ctx.font = "10px sans-serif";
      ctx.fillText("Parameters", W - 78, H - 4);
      ctx.save(); ctx.translate(12, H/2); ctx.rotate(-Math.PI/2);
      ctx.fillText("Loss", -10, 0); ctx.restore();
    };

    const animate = () => {
      if (isRunning) {
        const lr = 0.018;
        const x = stateRef.current.x;
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

  return <canvas ref={canvasRef} width={400} height={190} className="w-full rounded-xl border border-[var(--border)]" />;
}

export default function ConceptDemo() {
  const [activeTab, setActiveTab] = useState("viz");
  const [isRunning, setIsRunning] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const handleReset = () => { setIsRunning(false); setResetKey((k) => k + 1); };

  return (
    <section id="demo" className="section-padding relative overflow-hidden bg-[var(--surface)]/20">
      <GlowOrb color="coral" size={500} opacity={0.07} top="10%" left="-10%" />
      <GlowOrb color="purple" size={400} opacity={0.07} bottom="0%" right="-5%" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <AnimatedSection><SectionLabel color="coral">Live Concept Demo</SectionLabel></AnimatedSection>
          <AnimatedSection delay={100}>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.15] tracking-tight mb-5">
              Don&apos;t read about it. <span className="gradient-text">Experience it.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-lg mx-auto">
              Click any highlighted term for an instant, clear explanation. Watch gradient descent live.
            </p>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={150}>
          <div className="max-w-4xl mx-auto bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-card">
            <div className="flex border-b border-[var(--border)] bg-[var(--surface-2)]/40">
              {[{ id: "viz", label: "Gradient Descent Visualizer" }, { id: "lexicon", label: "Lexicon in Action" }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={"px-6 py-4 text-sm font-syne font-semibold transition-all duration-200 border-b-2 " + (activeTab === tab.id ? "border-coral text-coral" : "border-transparent text-[var(--muted)] hover:text-[var(--text-dim)]")}>
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "viz" && (
              <div className="p-6 md:p-8">
                <div className="mb-5">
                  <GradientViz isRunning={isRunning} resetKey={resetKey} />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex gap-3">
                    <button onClick={() => setIsRunning((r) => !r)}
                      className={"px-5 py-2.5 rounded-xl font-syne font-bold text-sm transition-all " + (isRunning ? "bg-coral/10 border border-coral/30 text-coral hover:bg-coral/20" : "bg-gradient-to-r from-coral to-violet text-white hover:opacity-90")}>
                      {isRunning ? "Pause" : "Run Descent"}
                    </button>
                    <button onClick={handleReset} className="px-5 py-2.5 rounded-xl font-syne font-bold text-sm border border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-hover)] transition-all">
                      Reset
                    </button>
                  </div>
                  <p className="text-[var(--muted)] text-xs font-dm">The red dot descends the loss landscape step-by-step</p>
                </div>
                <div className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]">
                  <p className="text-[var(--text-dim)] font-dm text-sm leading-relaxed">
                    Watch how{" "}
                    <LexiconTooltip word="Gradient Descent">gradient descent</LexiconTooltip>{" "}
                    minimizes the{" "}
                    <LexiconTooltip word="Loss Function">loss function</LexiconTooltip>{" "}
                    by adjusting the model&apos;s{" "}
                    <LexiconTooltip word="Parameters">parameters</LexiconTooltip>{" "}
                    step by step — using the{" "}
                    <LexiconTooltip word="Learning Rate">learning rate</LexiconTooltip>{" "}
                    to control how fast it moves.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "lexicon" && (
              <div className="p-6 md:p-8">
                <p className="text-[var(--muted)] font-dm text-sm mb-6">Click any highlighted word below to see the MLera lexicon tooltip in action:</p>
                <div className="bg-[var(--surface-2)] rounded-xl p-6 border border-[var(--border)] font-dm text-[var(--text-dim)] text-base leading-[2.2] mb-4">
                  During training, we use{" "}
                  <LexiconTooltip word="Backpropagation">backpropagation</LexiconTooltip>{" "}
                  to compute how much each weight contributed to the error. The{" "}
                  <LexiconTooltip word="Loss Function">loss function</LexiconTooltip>{" "}
                  tells us how wrong we are, and{" "}
                  <LexiconTooltip word="Gradient Descent">gradient descent</LexiconTooltip>{" "}
                  adjusts the model&apos;s{" "}
                  <LexiconTooltip word="Parameters">parameters</LexiconTooltip>{" "}
                  using the{" "}
                  <LexiconTooltip word="Learning Rate">learning rate</LexiconTooltip>.
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {["Gradient Descent","Loss Function","Learning Rate","Parameters","Backpropagation"].map((term) => (
                    <div key={term} className="text-center text-xs bg-violet/5 border border-violet/15 rounded-lg px-2 py-2 text-violet font-dm">
                      {term}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
