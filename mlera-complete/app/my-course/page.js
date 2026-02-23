"use client";
import { useState } from "react";
import GlowOrb from "@/components/ui/GlowOrb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { Play, Clock, BookOpen, CheckCircle, BarChart2, Calendar, ChevronRight } from "lucide-react";

const CURRENT_MODULE = {
  path: "ML Foundations",
  module: "Gradient Descent Visualized",
  lesson: 4,
  total: 6,
  progress: 63,
  nextUp: "Your First Model: End-to-End",
  timeLeft: "~45 min remaining",
};

const RECENT_ACTIVITY = [
  { type: "completed", label: "Understanding Loss & Error", time: "Yesterday, 9:12 PM", xp: 30 },
  { type: "completed", label: "The Math Behind ML", time: "2 days ago", xp: 40 },
  { type: "completed", label: "What is Machine Learning?", time: "3 days ago", xp: 25 },
  { type: "started", label: "Gradient Descent Visualized", time: "Today, 10:04 AM", xp: 0 },
];

const WEEKLY_DATA = [
  { day: "Mon", mins: 0 },
  { day: "Tue", mins: 35 },
  { day: "Wed", mins: 50 },
  { day: "Thu", mins: 20 },
  { day: "Fri", mins: 45 },
  { day: "Sat", mins: 60 },
  { day: "Sun", mins: 25 },
];

const UPCOMING = [
  { title: "Gradient Descent Visualized", type: "Lesson", duration: "45 min", color: "#FF6B6B" },
  { title: "Concept Check: Loss Functions", type: "Quiz", duration: "10 min", color: "#8B5CF6" },
  { title: "Your First Model: End-to-End", type: "Lesson", duration: "60 min", color: "#C084FC" },
  { title: "Path Capstone: Foundations", type: "Project", duration: "90 min", color: "#34D399" },
];

export default function MyCoursePage() {
  const maxMins = Math.max(...WEEKLY_DATA.map(d => d.mins));
  const totalMins = WEEKLY_DATA.reduce((a, d) => a + d.mins, 0);

  return (
    <div className="relative min-h-screen bg-[var(--deep)] overflow-x-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <GlowOrb color="purple" size={600} opacity={0.08} top="-5%" left="-5%" />
      <GlowOrb color="coral" size={400} opacity={0.06} bottom="30%" right="-5%" />

      {/* Header */}
      <div className="relative pt-16 pb-10 px-[5%]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionLabel color="purple">Dashboard</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-2">
                  My <span className="gradient-text">Course</span>
                </h1>
                <p className="text-[var(--muted)] font-dm">Good morning — you're on a 3-day streak! 🔥</p>
              </div>
              <div className="flex items-center gap-3 bg-[var(--surface)]/60 border border-[var(--border)] rounded-2xl px-5 py-3">
                <Calendar size={16} className="text-violet" />
                <div>
                  <p className="font-syne font-bold text-sm">3 days</p>
                  <p className="text-[var(--muted)] text-xs font-dm">current streak</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="relative px-[5%] pb-24">
        <div className="max-w-6xl mx-auto">

          {/* Continue Learning — Hero Card */}
          <AnimatedSection delay={100}>
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border-hover)] bg-[var(--surface)] mb-6 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-coral/8 via-transparent to-violet/8 pointer-events-none" />
              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1">
                  <p className="text-xs font-syne font-bold uppercase tracking-widest text-coral mb-2">{CURRENT_MODULE.path} · Lesson {CURRENT_MODULE.lesson}/{CURRENT_MODULE.total}</p>
                  <h2 className="font-syne font-extrabold text-2xl md:text-3xl mb-3">{CURRENT_MODULE.module}</h2>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-coral to-violet" style={{ width: `${CURRENT_MODULE.progress}%` }} />
                    </div>
                    <span className="font-syne font-bold text-sm gradient-text">{CURRENT_MODULE.progress}%</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[var(--muted)] font-dm">
                    <span className="flex items-center gap-1.5"><Clock size={13} />{CURRENT_MODULE.timeLeft}</span>
                  </div>
                </div>
                <button className="shrink-0 flex items-center gap-3 bg-gradient-to-r from-coral to-violet text-white font-syne font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(255,107,107,0.3)]">
                  <Play size={18} />
                  Continue →
                </button>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Quick stats */}
              <AnimatedSection delay={150}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Modules Done", value: "3", sub: "of 24 total", color: "#34D399" },
                    { label: "XP Earned", value: "95", sub: "this week", color: "#8B5CF6" },
                    { label: "Study Time", value: `${totalMins}m`, sub: "this week", color: "#FF6B6B" },
                    { label: "Challenges", value: "2", sub: "completed", color: "#C084FC" },
                  ].map(s => (
                    <div key={s.label} className="bg-[var(--surface)]/60 border border-[var(--border)] rounded-2xl p-4">
                      <p className="font-syne font-extrabold text-2xl" style={{ color: s.color }}>{s.value}</p>
                      <p className="font-dm text-sm text-[var(--text-dim)] font-medium mt-0.5">{s.label}</p>
                      <p className="font-dm text-xs text-[var(--muted)]">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Weekly activity chart */}
              <AnimatedSection delay={200}>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-syne font-bold text-base mb-0.5">Study Activity</h3>
                      <p className="text-[var(--muted)] text-xs font-dm">This week — {totalMins} minutes total</p>
                    </div>
                    <BarChart2 size={18} className="text-[var(--muted)]" />
                  </div>
                  <div className="flex items-end gap-3 h-28">
                    {WEEKLY_DATA.map(d => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full rounded-t-lg overflow-hidden flex flex-col justify-end" style={{ height: "80px" }}>
                          <div
                            className="w-full rounded-t-lg transition-all duration-700"
                            style={{
                              height: `${maxMins > 0 ? (d.mins / maxMins) * 100 : 0}%`,
                              background: d.mins > 0
                                ? "linear-gradient(180deg, #8B5CF6, #C084FC)"
                                : "rgba(139,92,246,0.08)",
                              minHeight: d.mins > 0 ? "8px" : "0",
                            }}
                          />
                        </div>
                        <p className="text-[var(--muted)] text-[10px] font-dm">{d.day}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Upcoming */}
              <AnimatedSection delay={260}>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                  <h3 className="font-syne font-bold text-base mb-5">Up Next</h3>
                  <div className="flex flex-col gap-3">
                    {UPCOMING.map((u, i) => (
                      <div key={i} className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        i === 0
                          ? "border-coral/30 bg-coral/5"
                          : "border-[var(--border)] hover:border-[var(--border-hover)]"
                      }`}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${u.color}15`, border: `1px solid ${u.color}30` }}>
                          <Play size={14} style={{ color: u.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-dm text-sm text-[var(--text-dim)] truncate">{u.title}</p>
                          <p className="text-[var(--muted)] text-xs font-dm">{u.type} · {u.duration}</p>
                        </div>
                        {i === 0 && (
                          <span className="text-[10px] font-syne font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-coral/10 text-coral border border-coral/25 shrink-0">
                            Next
                          </span>
                        )}
                        <ChevronRight size={16} className="text-[var(--muted)] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">

              {/* Path progress */}
              <AnimatedSection delay={180}>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                  <h3 className="font-syne font-bold text-base mb-5">All Paths</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { name: "ML Foundations", progress: 63, color: "#FF6B6B", status: "active" },
                      { name: "Supervised Learning", progress: 0, color: "#8B5CF6", status: "locked" },
                      { name: "Neural Networks", progress: 0, color: "#C084FC", status: "locked" },
                      { name: "Applied Projects", progress: 0, color: "#34D399", status: "locked" },
                    ].map(p => (
                      <div key={p.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="font-dm text-xs text-[var(--text-dim)] font-medium">{p.name}</p>
                          <p className="font-syne text-xs font-bold" style={{ color: p.color }}>{p.progress}%</p>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${p.color}, ${p.color}70)` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Recent activity */}
              <AnimatedSection delay={220}>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                  <h3 className="font-syne font-bold text-base mb-5">Recent Activity</h3>
                  <div className="flex flex-col gap-4">
                    {RECENT_ACTIVITY.map((a, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          a.type === "completed"
                            ? "bg-emerald-500/10 border border-emerald-500/25"
                            : "bg-violet/10 border border-violet/25"
                        }`}>
                          {a.type === "completed"
                            ? <CheckCircle size={13} className="text-emerald-400" />
                            : <Play size={11} className="text-violet" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-dm text-sm text-[var(--text-dim)] leading-snug">{a.label}</p>
                          <p className="text-[var(--muted)] text-xs font-dm mt-0.5">{a.time}</p>
                        </div>
                        {a.xp > 0 && (
                          <span className="text-[10px] font-syne font-bold text-amber-400 shrink-0">+{a.xp} XP</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
