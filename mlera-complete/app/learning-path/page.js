"use client";
import { useState } from "react";
import Link from "next/link";
import GlowOrb from "@/components/ui/GlowOrb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { ChevronRight, Clock, BookOpen, Lock, CheckCircle, Play } from "lucide-react";

const PATHS = [
  {
    id: "foundations",
    title: "ML Foundations",
    subtitle: "Zero to intuition",
    description: "Build the bedrock — probability, linear algebra, statistics — the way they apply to ML. No math degree required.",
    color: "#FF6B6B",
    level: "Beginner",
    duration: "2 weeks",
    modules: 6,
    progress: 63,
    status: "active",
    icon: "🧱",
    modules_list: [
      { title: "What is Machine Learning?", duration: "25 min", done: true },
      { title: "The Math Behind ML (Simplified)", duration: "40 min", done: true },
      { title: "Understanding Loss & Error", duration: "30 min", done: true },
      { title: "Linear Regression Intuition", duration: "35 min", done: false },
      { title: "Gradient Descent Visualized", duration: "45 min", done: false },
      { title: "Your First Model: End-to-End", duration: "60 min", done: false },
    ],
  },
  {
    id: "supervised",
    title: "Supervised Learning",
    subtitle: "Labels to predictions",
    description: "Classification, regression, decision boundaries — understand how models learn from labeled data to make predictions.",
    color: "#8B5CF6",
    level: "Intermediate",
    duration: "2 weeks",
    modules: 7,
    progress: 0,
    status: "locked",
    icon: "🎯",
    modules_list: [
      { title: "Classification vs Regression", duration: "20 min", done: false },
      { title: "Logistic Regression Deep Dive", duration: "40 min", done: false },
      { title: "Decision Trees & Random Forests", duration: "50 min", done: false },
      { title: "SVMs: The Intuition", duration: "35 min", done: false },
      { title: "Evaluating Your Model", duration: "30 min", done: false },
      { title: "Overfitting & Regularization", duration: "40 min", done: false },
      { title: "Capstone: Classification Project", duration: "90 min", done: false },
    ],
  },
  {
    id: "neural-nets",
    title: "Neural Networks",
    subtitle: "How deep learning works",
    description: "From perceptrons to deep networks — understand how layers, activations, and backpropagation create intelligence.",
    color: "#C084FC",
    level: "Intermediate",
    duration: "2 weeks",
    modules: 8,
    progress: 0,
    status: "locked",
    icon: "🧠",
    modules_list: [
      { title: "The Perceptron", duration: "25 min", done: false },
      { title: "Multi-layer Networks", duration: "35 min", done: false },
      { title: "Activation Functions", duration: "30 min", done: false },
      { title: "Backpropagation Explained", duration: "55 min", done: false },
      { title: "CNNs: Vision Intuition", duration: "50 min", done: false },
      { title: "RNNs & Sequences", duration: "45 min", done: false },
      { title: "Transformers & Attention", duration: "60 min", done: false },
      { title: "Building Your First DL Model", duration: "90 min", done: false },
    ],
  },
  {
    id: "applied",
    title: "Applied ML Projects",
    subtitle: "Build real things",
    description: "Put it all together. Build image classifiers, NLP pipelines, and recommendation systems with genuine understanding.",
    color: "#34D399",
    level: "Advanced",
    duration: "3 weeks",
    modules: 5,
    progress: 0,
    status: "locked",
    icon: "🛠️",
    modules_list: [
      { title: "Project: Image Classifier", duration: "120 min", done: false },
      { title: "Project: Sentiment Analysis", duration: "90 min", done: false },
      { title: "Project: Recommendation Engine", duration: "100 min", done: false },
      { title: "Reading ML Papers", duration: "60 min", done: false },
      { title: "Portfolio & Next Steps", duration: "45 min", done: false },
    ],
  },
];

const LEVEL_BADGE = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  Intermediate: "bg-violet/10 text-violet border-violet/25",
  Advanced: "bg-coral/10 text-coral border-coral/25",
};

export default function LearningPathPage() {
  const [expanded, setExpanded] = useState("foundations");

  return (
    <div className="relative min-h-screen bg-[var(--deep)] overflow-x-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <GlowOrb color="purple" size={700} opacity={0.09} top="-10%" left="-10%" />
      <GlowOrb color="coral" size={500} opacity={0.06} bottom="20%" right="-5%" />

      {/* Page Header */}
      <div className="relative pt-16 pb-12 px-[5%]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionLabel color="coral">Your Journey</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
              Learning <span className="gradient-text">Paths</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-xl leading-relaxed">
              Four structured paths. Each one builds on the last. Complete them in order to build genuine ML intuition — not just familiarity.
            </p>
          </AnimatedSection>

          {/* Progress overview */}
          <AnimatedSection delay={240}>
            <div className="mt-8 inline-flex items-center gap-6 bg-[var(--surface)]/60 border border-[var(--border)] rounded-2xl px-6 py-4">
              <div className="text-center">
                <p className="font-syne font-extrabold text-2xl gradient-text">1/4</p>
                <p className="text-[var(--muted)] text-xs font-dm">Paths started</p>
              </div>
              <div className="w-px h-10 bg-[var(--border)]" />
              <div className="text-center">
                <p className="font-syne font-extrabold text-2xl text-emerald-400">3/24</p>
                <p className="text-[var(--muted)] text-xs font-dm">Modules done</p>
              </div>
              <div className="w-px h-10 bg-[var(--border)]" />
              <div className="text-center">
                <p className="font-syne font-extrabold text-2xl text-violet">16%</p>
                <p className="text-[var(--muted)] text-xs font-dm">Overall progress</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Paths */}
      <div className="relative px-[5%] pb-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-5">
          {PATHS.map((path, i) => (
            <AnimatedSection key={path.id} delay={i * 80}>
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  expanded === path.id
                    ? "border-[var(--border-hover)] bg-[var(--surface)]"
                    : "border-[var(--border)] bg-[var(--surface)]/50 hover:border-[var(--border-hover)]"
                }`}
              >
                {/* Path Header */}
                <button
                  onClick={() => setExpanded(expanded === path.id ? null : path.id)}
                  className="w-full flex items-center gap-5 p-6 text-left"
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border"
                    style={{ background: `${path.color}12`, borderColor: `${path.color}30` }}
                  >
                    {path.status === "locked" ? <Lock size={20} style={{ color: path.color, opacity: 0.6 }} /> : path.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h2 className="font-syne font-bold text-lg">{path.title}</h2>
                      <span className={`text-[10px] font-syne font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${LEVEL_BADGE[path.level]}`}>
                        {path.level}
                      </span>
                      {path.status === "active" && (
                        <span className="text-[10px] font-syne font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border bg-coral/10 text-coral border-coral/25 animate-pulse">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--muted)] font-dm text-sm mb-3">{path.subtitle}</p>

                    {/* Progress bar */}
                    {path.progress > 0 ? (
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${path.progress}%`, background: `linear-gradient(90deg, ${path.color}, ${path.color}80)` }}
                          />
                        </div>
                        <span className="text-xs font-syne font-bold" style={{ color: path.color }}>{path.progress}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 text-[var(--muted)] text-xs font-dm">
                        <span className="flex items-center gap-1.5"><Clock size={12} />{path.duration}</span>
                        <span className="flex items-center gap-1.5"><BookOpen size={12} />{path.modules} modules</span>
                      </div>
                    )}
                  </div>

                  <ChevronRight
                    size={18}
                    className={`text-[var(--muted)] shrink-0 transition-transform duration-300 ${expanded === path.id ? "rotate-90" : ""}`}
                  />
                </button>

                {/* Expanded content */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: expanded === path.id ? "600px" : "0px" }}
                >
                  <div className="px-6 pb-6 border-t border-[var(--border)]/60">
                    <p className="text-[var(--muted)] font-dm text-sm leading-relaxed mt-5 mb-5">{path.description}</p>

                    <div className="flex flex-col gap-2">
                      {path.modules_list.map((mod, mi) => (
                        <div
                          key={mi}
                          className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all ${
                            mod.done
                              ? "bg-emerald-500/5 border-emerald-500/15"
                              : path.status === "locked"
                              ? "bg-white/2 border-white/5 opacity-50"
                              : "bg-[var(--surface)]/60 border-[var(--border)] hover:border-[var(--border-hover)] cursor-pointer"
                          }`}
                        >
                          <div className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0"
                            style={{
                              borderColor: mod.done ? "#34D399" : path.status === "locked" ? "var(--border)" : `${path.color}40`,
                              background: mod.done ? "rgba(52,211,153,0.1)" : "transparent"
                            }}
                          >
                            {mod.done
                              ? <CheckCircle size={14} className="text-emerald-400" />
                              : path.status === "locked"
                              ? <Lock size={11} className="text-[var(--muted)]" />
                              : <Play size={11} style={{ color: path.color }} />
                            }
                          </div>
                          <span className={`font-dm text-sm flex-1 ${mod.done ? "line-through text-[var(--muted)]" : "text-[var(--text-dim)]"}`}>
                            {mi + 1}. {mod.title}
                          </span>
                          <span className="text-[var(--muted)] text-xs font-dm shrink-0">{mod.duration}</span>
                        </div>
                      ))}
                    </div>

                    {path.status !== "locked" && (
                      <button
                        className="mt-5 w-full py-3 rounded-xl font-syne font-bold text-sm text-white transition-all hover:-translate-y-0.5"
                        style={{ background: `linear-gradient(135deg, ${path.color}, ${path.color}90)` }}
                      >
                        {path.progress > 0 ? "Continue Path →" : "Start Path →"}
                      </button>
                    )}
                    {path.status === "locked" && (
                      <div className="mt-5 flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/30">
                        <Lock size={16} className="text-[var(--muted)] shrink-0" />
                        <p className="text-[var(--muted)] font-dm text-sm">Complete the previous path to unlock this one.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
