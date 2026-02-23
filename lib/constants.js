// ─── Navigation ──────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Demo", href: "#demo" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export const HERO_STATS = [
  { value: "50+", label: "Structured concepts" },
  { value: "500+", label: "Lexicon entries" },
  { value: "4", label: "Learning paths" },
  { value: "IDRP", label: "Research backed" },
];

export const TYPEWRITER_WORDS = [
  "Finally Made Clear.",
  "Structured. Guided.",
  "Built for Builders.",
  "Powered by Research.",
];

export const PAIN_POINTS = [
  "Hours of passive video watching, nothing retained",
  "Scattered tutorials with no clear progression path",
  "Jargon-heavy content with zero context or explanation",
  "Content overload — more to watch, less understood",
];

export const ABOUT_CARD = [
  { label: "For", value: "Beginners through serious ML practitioners", color: "text-violet" },
  { label: "Not", value: "Passive watchers seeking just another video course", color: "text-coral" },
  { label: "Built", value: "IIIT Dharwad Research Park (IDRP)", color: "text-lavender" },
  { label: "Goal", value: "Make ML intuitive, structured, and genuinely learnable", color: "text-emerald-400" },
];

export const LEXICON = {
  "Gradient Descent": {
    simple: "An optimization algorithm that adjusts model parameters step-by-step in the direction that reduces error.",
    analogy: "Like a hiker finding the lowest valley by always stepping downhill.",
    color: "#FF6B6B",
  },
  "Loss Function": {
    simple: "A measurement of how wrong the model's predictions are. Lower loss = better model.",
    analogy: "Think of it as the model's score on a test — we want it as low as possible.",
    color: "#C084FC",
  },
  "Learning Rate": {
    simple: "Controls how big each step is during gradient descent. Too big = overshoot; too small = very slow.",
    analogy: "The step size of our hiker. Careful balance required.",
    color: "#8B5CF6",
  },
  "Parameters": {
    simple: "The internal numbers (weights & biases) the model learns from data during training.",
    analogy: "The knobs and dials that get tuned automatically as the model learns.",
    color: "#34D399",
  },
  "Backpropagation": {
    simple: "The algorithm that computes gradients by flowing error signals backward through the network.",
    analogy: "Like tracing which dominoes caused the final one to fall, and nudging each one.",
    color: "#F59E0B",
  },
};

export const FEATURES = [
  { id: "paths", icon: "🗺️", title: "Structured Learning Paths", description: "Follow carefully curated roadmaps — no more jumping between random tutorials. Every concept builds intelligently on the last.", badge: "Core", badgeColor: "violet" },
  { id: "lexicon", icon: "📖", title: "Built-in ML Lexicon", description: "Confused by jargon? MLera's inline lexicon explains every term in context, so you never lose the thread or break your flow.", badge: "Unique", badgeColor: "coral" },
  { id: "concept", icon: "🎯", title: "Concept-First Approach", description: "We prioritize deep understanding over content quantity. Fewer, better lessons beat an overwhelming library every time.", badge: "Core", badgeColor: "violet" },
  { id: "guided", icon: "🧭", title: "Guided Progression", description: "Smart checkpoints ensure you truly understand before moving forward — not just watching, but actually knowing.", badge: "Core", badgeColor: "violet" },
  { id: "interactive", icon: "⚡", title: "Interactive Learning", description: "Engage with concepts through exercises and visualizations that make abstract mathematical ideas tangible.", badge: "Upcoming", badgeColor: "amber" },
  { id: "research", icon: "🔬", title: "Research-Backed Design", description: "Built at IIIT Dharwad Research Park, MLera applies cognitive science and pedagogy research to every decision.", badge: "Foundation", badgeColor: "green" },
];

export const OUTCOMES = [
  { icon: "🧠", title: "Understand ML math intuitively", description: "Grasp why equations exist before learning how to use them. Build real intuition for loss functions, gradients, and probability.", tag: "Foundations", color: "#FF6B6B" },
  { icon: "🗺️", title: "Build mental models before coding", description: "Know exactly what a neural network is doing conceptually — so when you code it, you're translating understanding, not copying syntax.", tag: "Mental Models", color: "#8B5CF6" },
  { icon: "📄", title: "Read ML research with confidence", description: "Encounter terms like 'attention mechanism' in a paper and actually know what they mean without leaving the page.", tag: "Literacy", color: "#C084FC" },
  { icon: "🛠️", title: "Build your first ML pipeline", description: "Go from data to trained model with a clear understanding of what each piece does and why it matters.", tag: "Applied", color: "#34D399" },
  { icon: "🔍", title: "Debug models systematically", description: "When something breaks, you'll know where to look. Understand why a model underfits, overfits, or diverges.", tag: "Problem-Solving", color: "#F59E0B" },
  { icon: "💬", title: "Speak ML fluently", description: "Use terminology precisely in interviews, team discussions, and code reviews. No more imposter syndrome.", tag: "Communication", color: "#60A5FA" },
];

export const MILESTONES = [
  { week: "Week 1–2", label: "ML Foundations", color: "#FF6B6B" },
  { week: "Week 3–4", label: "Supervised Learning", color: "#C084FC" },
  { week: "Week 5–6", label: "Neural Networks", color: "#8B5CF6" },
  { week: "Week 7+", label: "Applied Projects", color: "#34D399" },
];

export const STEPS = [
  { number: "01", title: "Choose Your Path", description: "Select a structured ML learning path tailored to your current level — absolute beginner to advanced practitioner." },
  { number: "02", title: "Learn with Clarity", description: "Digest bite-sized, concept-focused lessons. Click any technical term for instant lexicon definitions without breaking your flow." },
  { number: "03", title: "Verify Understanding", description: "Complete guided checkpoints that confirm real comprehension before unlocking the next module." },
  { number: "04", title: "Build Real Intuition", description: "Walk away with genuine ML intuition — not just familiarity, but the ability to reason about models and build." },
];

export const STATS = [
  { value: 50, suffix: "+", label: "Structured concepts", description: "across supervised, unsupervised & deep learning", color: "#FF6B6B" },
  { value: 500, suffix: "+", label: "Lexicon entries", description: "inline definitions for every ML term you'll encounter", color: "#8B5CF6" },
  { value: 4, suffix: "", label: "Learning paths", description: "from ML foundations to advanced neural networks", color: "#C084FC" },
  { value: 100, suffix: "%", label: "Concept-first", description: "understanding before implementation, always", color: "#34D399" },
];

export const COMPARISON_ITEMS = [
  { feature: "Structured learning paths", mlera: true, others: false },
  { feature: "Built-in terminology lexicon", mlera: true, others: false },
  { feature: "Concept-first (not content-first)", mlera: true, others: false },
  { feature: "Comprehension checkpoints", mlera: true, others: false },
  { feature: "Research-backed pedagogy", mlera: true, others: false },
  { feature: "Beginner-to-advanced progression", mlera: true, others: true },
  { feature: "Video/audio content", mlera: true, others: true },
];

export const FAQS = [
  { q: "Is MLera beginner-friendly?", a: "Absolutely. MLera is specifically designed for learners who have little to no ML background. Every path starts from foundational concepts, builds progressively, and never assumes prior knowledge. The built-in lexicon means you'll never be stuck on an unexplained term." },
  { q: "Do I need to know how to code?", a: "Not to start. MLera's initial focus is building conceptual understanding — the 'why' behind ML. Coding comes after you have solid mental models. This makes the eventual code feel like translating understanding into syntax, rather than memorizing patterns." },
  { q: "Is this just another video course?", a: "No. MLera is explicitly built against passive video consumption. Instead of watching hours of lectures, you engage with structured text, interactive concept tools, and comprehension checkpoints. The goal is retention and intuition, not entertainment hours." },
  { q: "How is MLera different from Coursera or fast.ai?", a: "Coursera is lecture-heavy and often overwhelming in scope. fast.ai is code-first (great, but hard for true beginners). MLera is concept-first — you understand the math and intuition before touching code, and the structured paths mean you always know where you are." },
  { q: "Is MLera free?", a: "MLera is currently in early development under IIIT Dharwad Research Park. Early access waitlist members will be among the first to know about pricing and launch details." },
  { q: "What exactly is the Built-in Lexicon?", a: "Every technical term in MLera's lessons is clickable — it shows a plain-English explanation, an analogy, and context. You never need to leave the page or open another tab. Try the live demo above to see it in action." },
];
