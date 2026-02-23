"use client";
import { useState } from "react";
import GlowOrb from "@/components/ui/GlowOrb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { Zap, Clock, CheckCircle, Lock, Star, Filter, Trophy } from "lucide-react";

const CHALLENGES = [
  {
    id: 1,
    title: "Gradient Descent by Hand",
    description: "Given a simple loss function, manually compute 3 steps of gradient descent. No code — pure math intuition.",
    type: "Concept",
    difficulty: "Easy",
    xp: 50,
    time: "15 min",
    status: "completed",
    tags: ["Gradient Descent", "Calculus", "Optimization"],
    icon: "📉",
  },
  {
    id: 2,
    title: "Spot the Overfit",
    description: "You're given training vs. validation loss curves. Identify whether the model is underfitting, overfitting, or well-fit.",
    type: "Analysis",
    difficulty: "Easy",
    xp: 50,
    time: "10 min",
    status: "completed",
    tags: ["Overfitting", "Bias-Variance", "Evaluation"],
    icon: "🔍",
  },
  {
    id: 3,
    title: "Activation Function Match",
    description: "Match 5 activation functions to their graphs and use cases. ReLU, sigmoid, tanh, softmax, GELU — when and why?",
    type: "Quiz",
    difficulty: "Easy",
    xp: 40,
    time: "12 min",
    status: "available",
    tags: ["Neural Nets", "Activations"],
    icon: "⚡",
  },
  {
    id: 4,
    title: "Build a Loss Function",
    description: "Write MSE and Cross-Entropy loss from scratch in Python. Verify your output against expected values.",
    type: "Code",
    difficulty: "Medium",
    xp: 100,
    time: "25 min",
    status: "available",
    tags: ["Loss Functions", "Python", "NumPy"],
    icon: "🐍",
  },
  {
    id: 5,
    title: "Explain Backprop to a 10-Year-Old",
    description: "Write a clear, analogy-driven explanation of backpropagation. No equations. Submit for peer review.",
    type: "Writing",
    difficulty: "Medium",
    xp: 80,
    time: "20 min",
    status: "available",
    tags: ["Backpropagation", "Communication"],
    icon: "✍️",
  },
  {
    id: 6,
    title: "Implement Linear Regression",
    description: "Build linear regression using only NumPy — no sklearn. Train it on a provided dataset and hit R² > 0.85.",
    type: "Code",
    difficulty: "Medium",
    xp: 120,
    time: "40 min",
    status: "available",
    tags: ["Linear Regression", "NumPy", "Applied"],
    icon: "📈",
  },
  {
    id: 7,
    title: "Attention Mechanism Deep Dive",
    description: "Given a sequence of tokens, manually compute scaled dot-product attention. Walk through Q, K, V matrices.",
    type: "Concept",
    difficulty: "Hard",
    xp: 200,
    time: "60 min",
    status: "locked",
    tags: ["Transformers", "Attention", "Advanced"],
    icon: "🔮",
  },
  {
    id: 8,
    title: "Debug This Model",
    description: "A neural network has an exploding gradient. Find the bug in the training loop, fix it, and explain your reasoning.",
    type: "Code",
    difficulty: "Hard",
    xp: 250,
    time: "45 min",
    status: "locked",
    tags: ["Debugging", "Neural Nets", "Gradients"],
    icon: "🐛",
  },
];

const DIFF_STYLE = {
  Easy: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25", dot: "#34D399" },
  Medium: { badge: "bg-amber-500/10 text-amber-400 border-amber-500/25", dot: "#F59E0B" },
  Hard: { badge: "bg-coral/10 text-coral border-coral/25", dot: "#FF6B6B" },
};

const TYPE_STYLE = {
  Concept: "bg-violet/10 text-violet border-violet/25",
  Analysis: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  Quiz: "bg-lavender/10 text-lavender border-lavender/25",
  Code: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  Writing: "bg-amber-500/10 text-amber-400 border-amber-500/25",
};

export default function ChallengesPage() {
  const [filter, setFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");
  const filters = ["All", "Concept", "Code", "Analysis", "Quiz", "Writing"];
  const diffs = ["All", "Easy", "Medium", "Hard"];

  const visible = CHALLENGES.filter(c => {
    const typeOk = filter === "All" || c.type === filter;
    const diffOk = diffFilter === "All" || c.difficulty === diffFilter;
    return typeOk && diffOk;
  });

  const completed = CHALLENGES.filter(c => c.status === "completed").length;
  const totalXP = CHALLENGES.filter(c => c.status === "completed").reduce((a, c) => a + c.xp, 0);

  return (
    <div className="relative min-h-screen bg-[var(--deep)] overflow-x-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <GlowOrb color="coral" size={600} opacity={0.08} top="-5%" right="-5%" />
      <GlowOrb color="purple" size={500} opacity={0.07} bottom="20%" left="-5%" />

      {/* Header */}
      <div className="relative pt-16 pb-10 px-[5%]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionLabel color="coral">Practice Arena</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
              <span className="gradient-text">Challenges</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-xl leading-relaxed">
              Real ML problems that test your intuition, not just recall. Every challenge is designed to deepen understanding, not just your score.
            </p>
          </AnimatedSection>

          {/* Stats bar */}
          <AnimatedSection delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-[var(--surface)]/60 border border-[var(--border)] rounded-2xl px-5 py-3">
                <Trophy size={16} className="text-amber-400" />
                <div>
                  <p className="font-syne font-bold text-sm">{completed}/{CHALLENGES.length} Completed</p>
                  <p className="text-[var(--muted)] text-xs font-dm">challenges solved</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[var(--surface)]/60 border border-[var(--border)] rounded-2xl px-5 py-3">
                <Star size={16} className="text-violet" />
                <div>
                  <p className="font-syne font-bold text-sm gradient-text">{totalXP} XP</p>
                  <p className="text-[var(--muted)] text-xs font-dm">experience earned</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[var(--surface)]/60 border border-[var(--border)] rounded-2xl px-5 py-3">
                <Zap size={16} className="text-coral" />
                <div>
                  <p className="font-syne font-bold text-sm text-coral">3 day streak</p>
                  <p className="text-[var(--muted)] text-xs font-dm">keep it going!</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Filters */}
      <div className="relative px-[5%] mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <Filter size={14} className="text-[var(--muted)]" />
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-syne font-bold border transition-all ${
                    filter === f
                      ? "bg-violet/20 border-violet/50 text-violet"
                      : "bg-transparent border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-[var(--border)]" />
            <div className="flex flex-wrap gap-2">
              {diffs.map(d => (
                <button
                  key={d}
                  onClick={() => setDiffFilter(d)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-syne font-bold border transition-all ${
                    diffFilter === d
                      ? "bg-coral/20 border-coral/50 text-coral"
                      : "bg-transparent border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="relative px-[5%] pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {visible.map((ch, i) => (
            <AnimatedSection key={ch.id} delay={i * 60}>
              <div className={`group relative h-full bg-[var(--surface)] border rounded-2xl p-6 transition-all duration-300 ${
                ch.status === "completed"
                  ? "border-emerald-500/25"
                  : ch.status === "locked"
                  ? "border-[var(--border)] opacity-60"
                  : "border-[var(--border)] hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(139,92,246,0.15)] cursor-pointer"
              }`}>
                {/* Completed overlay */}
                {ch.status === "completed" && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle size={20} className="text-emerald-400" />
                  </div>
                )}
                {ch.status === "locked" && (
                  <div className="absolute top-4 right-4">
                    <Lock size={16} className="text-[var(--muted)]" />
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)] flex items-center justify-center text-xl shrink-0">
                    {ch.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`text-[10px] font-syne font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${TYPE_STYLE[ch.type]}`}>
                        {ch.type}
                      </span>
                      <span className={`text-[10px] font-syne font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${DIFF_STYLE[ch.difficulty].badge}`}>
                        {ch.difficulty}
                      </span>
                    </div>
                    <h3 className="font-syne font-bold text-base leading-snug group-hover:text-white transition-colors">
                      {ch.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[var(--muted)] font-dm text-sm leading-relaxed mb-4">{ch.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ch.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-dm px-2 py-0.5 rounded-full bg-white/5 text-[var(--muted)] border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]/60">
                  <div className="flex items-center gap-4 text-xs font-dm text-[var(--muted)]">
                    <span className="flex items-center gap-1.5"><Clock size={11} />{ch.time}</span>
                    <span className="flex items-center gap-1.5">
                      <Star size={11} className="text-amber-400" />
                      <span className="text-amber-400 font-medium">+{ch.xp} XP</span>
                    </span>
                  </div>
                  {ch.status !== "locked" && (
                    <button className={`text-xs font-syne font-bold px-4 py-1.5 rounded-lg transition-all ${
                      ch.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                        : "bg-gradient-to-r from-coral to-violet text-white hover:opacity-90"
                    }`}>
                      {ch.status === "completed" ? "Review" : "Start →"}
                    </button>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
