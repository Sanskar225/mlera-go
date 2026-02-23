"use client";
import { useState } from "react";
import GlowOrb from "@/components/ui/GlowOrb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { Star, Zap, Lock } from "lucide-react";

const BADGES = [
  {
    id: "first-lesson",
    title: "First Step",
    description: "Complete your first lesson on MLera.",
    icon: "🚀",
    color: "#34D399",
    earned: true,
    earnedDate: "Jan 12, 2025",
    xp: 25,
    rarity: "Common",
  },
  {
    id: "lexicon-explorer",
    title: "Lexicon Explorer",
    description: "Click on 10 different lexicon tooltips to explore definitions.",
    icon: "📖",
    color: "#8B5CF6",
    earned: true,
    earnedDate: "Jan 13, 2025",
    xp: 50,
    rarity: "Common",
  },
  {
    id: "gradient-intuition",
    title: "Gradient Intuition",
    description: "Complete the Gradient Descent module without skipping a concept check.",
    icon: "📉",
    color: "#FF6B6B",
    earned: true,
    earnedDate: "Jan 15, 2025",
    xp: 100,
    rarity: "Uncommon",
  },
  {
    id: "streak-3",
    title: "On A Roll",
    description: "Study for 3 consecutive days.",
    icon: "🔥",
    color: "#F59E0B",
    earned: true,
    earnedDate: "Today",
    xp: 75,
    rarity: "Common",
  },
  {
    id: "challenge-first",
    title: "Challenge Accepted",
    description: "Complete your first challenge in the Practice Arena.",
    icon: "⚡",
    color: "#C084FC",
    earned: true,
    earnedDate: "Jan 14, 2025",
    xp: 50,
    rarity: "Common",
  },
  {
    id: "path-complete",
    title: "Path Finisher",
    description: "Complete an entire learning path from start to finish.",
    icon: "🗺️",
    color: "#8B5CF6",
    earned: false,
    xp: 300,
    rarity: "Rare",
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Maintain a 7-day learning streak.",
    icon: "🏆",
    color: "#F59E0B",
    earned: false,
    xp: 200,
    rarity: "Uncommon",
  },
  {
    id: "concept-master",
    title: "Concept Master",
    description: "Achieve 100% on three consecutive concept checks.",
    icon: "🧠",
    color: "#60A5FA",
    earned: false,
    xp: 150,
    rarity: "Uncommon",
  },
  {
    id: "buddy-link",
    title: "Better Together",
    description: "Connect with a Study Buddy and complete a shared goal.",
    icon: "🤝",
    color: "#34D399",
    earned: false,
    xp: 100,
    rarity: "Common",
  },
  {
    id: "hard-challenge",
    title: "Deep End",
    description: "Complete a Hard difficulty challenge.",
    icon: "🎯",
    color: "#FF6B6B",
    earned: false,
    xp: 250,
    rarity: "Rare",
  },
  {
    id: "lexicon-full",
    title: "Lexicographer",
    description: "Explore over 100 unique lexicon entries.",
    icon: "📚",
    color: "#C084FC",
    earned: false,
    xp: 200,
    rarity: "Rare",
  },
  {
    id: "all-paths",
    title: "The Full Journey",
    description: "Complete all four MLera learning paths.",
    icon: "✨",
    color: "#F59E0B",
    earned: false,
    xp: 1000,
    rarity: "Legendary",
  },
];

const MILESTONES = [
  { label: "95 XP", sub: "Current total", color: "#8B5CF6", progress: 9.5 },
  { label: "Level 2", sub: "At 100 XP", color: "#FF6B6B", progress: 95 },
  { label: "Level 3", sub: "At 300 XP", color: "#C084FC", progress: 31.7 },
  { label: "Level 5", sub: "At 1000 XP", color: "#34D399", progress: 9.5 },
];

const RARITY_STYLE = {
  Common: "text-[var(--muted)] border-[var(--border)]",
  Uncommon: "text-emerald-400 border-emerald-500/25",
  Rare: "text-violet border-violet/35",
  Legendary: "text-amber-400 border-amber-500/35",
};

export default function AchievementPage() {
  const [tab, setTab] = useState("all");
  const earned = BADGES.filter(b => b.earned);
  const visible = tab === "earned" ? earned : tab === "locked" ? BADGES.filter(b => !b.earned) : BADGES;
  const totalXP = earned.reduce((a, b) => a + b.xp, 0);

  return (
    <div className="relative min-h-screen bg-[var(--deep)] overflow-x-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <GlowOrb color="coral" size={600} opacity={0.08} top="-5%" right="-5%" />
      <GlowOrb color="purple" size={500} opacity={0.08} bottom="20%" left="-5%" />

      {/* Header */}
      <div className="relative pt-16 pb-10 px-[5%]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionLabel color="purple">Your Progress</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
              <span className="gradient-text">Achievements</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-xl leading-relaxed">
              Every badge marks a real milestone in your ML understanding. Not participation trophies — earned recognition.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="relative px-[5%] pb-24">
        <div className="max-w-6xl mx-auto">

          {/* XP & Level card */}
          <AnimatedSection delay={100}>
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border-hover)] bg-[var(--surface)] mb-8 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-violet/8 via-transparent to-coral/8 pointer-events-none" />
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Level display */}
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 shrink-0">
                    <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="8" />
                      <circle
                        cx="40" cy="40" r="34" fill="none"
                        stroke="url(#lvl-grad)" strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 34}`}
                        strokeDashoffset={`${2 * Math.PI * 34 * (1 - 0.95)}`}
                      />
                      <defs>
                        <linearGradient id="lvl-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FF6B6B" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-syne font-extrabold text-xl gradient-text">Lv.1</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-syne font-extrabold text-3xl gradient-text">{totalXP} XP</p>
                    <p className="text-[var(--muted)] font-dm text-sm">5 XP to Level 2</p>
                    <div className="mt-2 w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-coral to-violet" style={{ width: "95%" }} />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 justify-center">
                  <div className="text-center">
                    <p className="font-syne font-extrabold text-2xl text-emerald-400">{earned.length}</p>
                    <p className="text-[var(--muted)] text-xs font-dm">Badges earned</p>
                  </div>
                  <div className="text-center">
                    <p className="font-syne font-extrabold text-2xl text-coral">3</p>
                    <p className="text-[var(--muted)] text-xs font-dm">Day streak</p>
                  </div>
                  <div className="text-center">
                    <p className="font-syne font-extrabold text-2xl text-amber-400">7</p>
                    <p className="text-[var(--muted)] text-xs font-dm">Global rank</p>
                  </div>
                </div>

                {/* Milestone progress bars */}
                <div className="flex flex-col gap-3">
                  <p className="text-[var(--muted)] text-xs font-dm font-medium mb-1">XP Milestones</p>
                  {MILESTONES.slice(0, 3).map(m => (
                    <div key={m.label}>
                      <div className="flex justify-between mb-1">
                        <p className="text-[var(--text-dim)] text-[11px] font-dm">{m.sub}</p>
                        <p className="font-syne text-[11px] font-bold" style={{ color: m.color }}>{m.label}</p>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${m.progress}%`, background: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Tabs */}
          <AnimatedSection delay={150}>
            <div className="flex gap-2 mb-8">
              {[
                { id: "all", label: `All (${BADGES.length})` },
                { id: "earned", label: `Earned (${earned.length})` },
                { id: "locked", label: `Locked (${BADGES.length - earned.length})` },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-syne font-bold border transition-all ${
                    tab === t.id
                      ? "bg-violet/20 border-violet/50 text-violet"
                      : "bg-transparent border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Badge grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {visible.map((badge, i) => (
              <AnimatedSection key={badge.id} delay={i * 50}>
                <div className={`group relative h-full flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 ${
                  badge.earned
                    ? "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)] hover:-translate-y-1"
                    : "bg-[var(--surface)]/40 border-[var(--border)] opacity-55"
                }`}>
                  {/* Badge icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 transition-transform group-hover:scale-110"
                    style={{
                      background: badge.earned ? `${badge.color}15` : "rgba(255,255,255,0.03)",
                      border: `2px solid ${badge.earned ? `${badge.color}35` : "var(--border)"}`,
                      filter: badge.earned ? "none" : "grayscale(1)",
                    }}
                  >
                    {badge.earned ? badge.icon : <Lock size={22} className="text-[var(--muted)]" />}
                  </div>

                  {/* Rarity */}
                  <span className={`text-[9px] font-syne font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-2 ${RARITY_STYLE[badge.rarity]}`}>
                    {badge.rarity}
                  </span>

                  <h3 className="font-syne font-bold text-sm leading-snug mb-1">{badge.title}</h3>
                  <p className="text-[var(--muted)] font-dm text-xs leading-snug mb-3">{badge.description}</p>

                  <div className="mt-auto flex items-center gap-1.5 text-xs">
                    <Star size={11} className="text-amber-400" />
                    <span className="font-syne font-bold text-amber-400">+{badge.xp} XP</span>
                  </div>

                  {badge.earned && badge.earnedDate && (
                    <p className="text-[var(--muted)]/50 text-[10px] font-dm mt-1">{badge.earnedDate}</p>
                  )}

                  {/* Earned glow */}
                  {badge.earned && (
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ boxShadow: `inset 0 0 30px ${badge.color}10` }}
                    />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
