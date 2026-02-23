"use client";
import { useState } from "react";
import GlowOrb from "@/components/ui/GlowOrb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { Users, MessageCircle, Target, CheckCircle, Clock, Zap, Search, UserPlus } from "lucide-react";

const MY_BUDDY = {
  name: "Priya S.",
  avatar: "PS",
  avatarColor: "#8B5CF6",
  path: "ML Foundations",
  progress: 58,
  streak: 5,
  status: "online",
  sharedGoal: "Finish Module 4 — Linear Regression Intuition",
  goalDeadline: "By Sunday",
  goalMyProgress: 0,
  goalTheirProgress: 60,
  messages: [
    { from: "them", text: "Hey! Did you understand the part about the learning rate being too high?", time: "10:34 AM" },
    { from: "me", text: "Yes! It oscillates around the minimum instead of converging. The analogy about overshoot really helped.", time: "10:41 AM" },
    { from: "them", text: "Perfect! I'm about to start the gradient viz exercise. Want to sync after?", time: "10:42 AM" },
  ],
};

const SUGGESTED_BUDDIES = [
  {
    name: "Arjun M.",
    avatar: "AM",
    avatarColor: "#FF6B6B",
    path: "ML Foundations",
    progress: 50,
    streak: 2,
    interests: ["Math-first", "Research", "Python"],
    compatibility: 94,
  },
  {
    name: "Sneha K.",
    avatar: "SK",
    avatarColor: "#34D399",
    path: "ML Foundations",
    progress: 75,
    streak: 7,
    interests: ["Visualizations", "Deep Learning"],
    compatibility: 88,
  },
  {
    name: "Rahul D.",
    avatar: "RD",
    avatarColor: "#C084FC",
    path: "ML Foundations",
    progress: 40,
    streak: 1,
    interests: ["Beginner", "Math", "NLP"],
    compatibility: 82,
  },
];

const HOW_IT_WORKS = [
  {
    icon: "🎯",
    title: "Matched by path",
    description: "MLera pairs you with learners at a similar stage — not random, but deliberately compatible.",
    color: "#FF6B6B",
  },
  {
    icon: "🤝",
    title: "Shared goals",
    description: "Set a weekly goal together. Mutual accountability is the single strongest predictor of completion.",
    color: "#8B5CF6",
  },
  {
    icon: "💬",
    title: "In-context chat",
    description: "Discuss specific lessons without leaving the platform. No DMs on external apps needed.",
    color: "#C084FC",
  },
  {
    icon: "🏆",
    title: "Buddy achievements",
    description: "Earn exclusive badges only unlockable by completing goals with a buddy.",
    color: "#34D399",
  },
];

export default function BuddyPage() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(MY_BUDDY.messages);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { from: "me", text: chatInput.trim(), time: "Now" }]);
    setChatInput("");
  };

  return (
    <div className="relative min-h-screen bg-[var(--deep)] overflow-x-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <GlowOrb color="purple" size={600} opacity={0.08} top="-5%" right="-5%" />
      <GlowOrb color="coral" size={400} opacity={0.06} bottom="20%" left="-5%" />

      {/* Header */}
      <div className="relative pt-16 pb-10 px-[5%]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionLabel color="purple">Peer Learning</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
              Study <span className="gradient-text">Buddy</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-xl leading-relaxed">
              Learning alone is hard. Learning with someone who's in exactly the same place as you? That's how things actually stick.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="relative px-[5%] pb-24">
        <div className="max-w-6xl mx-auto">

          {/* Active buddy section */}
          <AnimatedSection delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

              {/* Buddy card */}
              <div className="bg-[var(--surface)] border border-[var(--border-hover)] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-syne font-bold text-base">Your Buddy</h2>
                  <span className="flex items-center gap-2 text-xs font-dm text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online now
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-syne font-extrabold text-lg text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${MY_BUDDY.avatarColor}, ${MY_BUDDY.avatarColor}80)` }}
                  >
                    {MY_BUDDY.avatar}
                  </div>
                  <div>
                    <p className="font-syne font-bold text-base">{MY_BUDDY.name}</p>
                    <p className="text-[var(--muted)] text-xs font-dm">{MY_BUDDY.path}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-dm text-[var(--muted)]">
                        <span className="text-coral font-medium">{MY_BUDDY.streak} day streak</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Their progress */}
                <div className="mb-5">
                  <div className="flex justify-between mb-1.5">
                    <p className="text-xs font-dm text-[var(--muted)]">Their path progress</p>
                    <p className="text-xs font-syne font-bold" style={{ color: MY_BUDDY.avatarColor }}>{MY_BUDDY.progress}%</p>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${MY_BUDDY.progress}%`, background: `linear-gradient(90deg, ${MY_BUDDY.avatarColor}, ${MY_BUDDY.avatarColor}70)` }}
                    />
                  </div>
                </div>

                {/* Shared goal */}
                <div className="p-4 rounded-xl border border-violet/25 bg-violet/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={13} className="text-violet" />
                    <p className="text-[10px] font-syne font-bold uppercase tracking-widest text-violet">Shared Goal · {MY_BUDDY.goalDeadline}</p>
                  </div>
                  <p className="font-dm text-sm text-[var(--text-dim)] mb-3">{MY_BUDDY.sharedGoal}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "You", progress: MY_BUDDY.goalMyProgress, color: "#FF6B6B" },
                      { label: MY_BUDDY.name.split(" ")[0], progress: MY_BUDDY.goalTheirProgress, color: MY_BUDDY.avatarColor },
                    ].map(p => (
                      <div key={p.label}>
                        <div className="flex justify-between mb-1">
                          <p className="text-[10px] font-dm text-[var(--muted)]">{p.label}</p>
                          <p className="text-[10px] font-syne font-bold" style={{ color: p.color }}>{p.progress}%</p>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: p.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex flex-col overflow-hidden" style={{ minHeight: "320px" }}>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
                  <MessageCircle size={16} className="text-violet" />
                  <p className="font-syne font-bold text-sm">Buddy Chat</p>
                </div>
                <div className="flex-1 flex flex-col gap-3 p-5 overflow-y-auto" style={{ maxHeight: "220px" }}>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl ${
                        msg.from === "me"
                          ? "bg-gradient-to-r from-coral to-violet text-white rounded-tr-sm"
                          : "bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-dim)] rounded-tl-sm"
                      }`}>
                        <p className="font-dm text-sm leading-relaxed">{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-white/60" : "text-[var(--muted)]"}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-[var(--border)] flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Message Priya…"
                    className="flex-1 input-base px-4 py-2.5 text-sm rounded-xl"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2.5 bg-gradient-to-r from-coral to-violet text-white font-syne font-bold text-sm rounded-xl hover:opacity-90 transition-all"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* How it works */}
          <AnimatedSection delay={180}>
            <div className="mb-8">
              <h2 className="font-syne font-bold text-xl mb-5">How Buddy Learning Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {HOW_IT_WORKS.map((h, i) => (
                  <div key={i} className="bg-[var(--surface)]/60 border border-[var(--border)] rounded-2xl p-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                      style={{ background: `${h.color}12`, border: `1px solid ${h.color}30` }}
                    >
                      {h.icon}
                    </div>
                    <h3 className="font-syne font-bold text-sm mb-2">{h.title}</h3>
                    <p className="text-[var(--muted)] font-dm text-xs leading-relaxed">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Suggested buddies */}
          <AnimatedSection delay={220}>
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-syne font-bold text-xl">Suggested Learners</h2>
                <button className="flex items-center gap-2 text-xs font-dm text-[var(--muted)] hover:text-[var(--text-dim)] transition-colors">
                  <Search size={13} />
                  Search all
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {SUGGESTED_BUDDIES.map((b, i) => (
                  <div key={i} className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--border-hover)] transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-syne font-extrabold text-white shrink-0"
                        style={{ background: `linear-gradient(135deg, ${b.avatarColor}, ${b.avatarColor}80)` }}
                      >
                        {b.avatar}
                      </div>
                      <div>
                        <p className="font-syne font-bold text-sm">{b.name}</p>
                        <p className="text-[var(--muted)] text-xs font-dm">{b.path}</p>
                      </div>
                      <div className="ml-auto text-center">
                        <p className="font-syne font-extrabold text-lg gradient-text">{b.compatibility}%</p>
                        <p className="text-[var(--muted)] text-[10px] font-dm">match</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-1.5">
                        <p className="text-xs font-dm text-[var(--muted)]">Path progress</p>
                        <p className="text-xs font-syne font-bold" style={{ color: b.avatarColor }}>{b.progress}%</p>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${b.progress}%`, background: b.avatarColor }} />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {b.interests.map(tag => (
                        <span key={tag} className="text-[10px] font-dm px-2 py-0.5 rounded-full bg-white/5 text-[var(--muted)] border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-violet/30 bg-violet/8 text-violet font-syne font-bold text-sm hover:bg-violet/15 transition-all">
                      <UserPlus size={14} />
                      Request as Buddy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
