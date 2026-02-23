"use client";
import { useState, useMemo } from "react";
import GlowOrb from "@/components/ui/GlowOrb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { Search, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

const FULL_LEXICON = [
  {
    term: "Backpropagation",
    category: "Training",
    color: "#F59E0B",
    difficulty: "Intermediate",
    simple: "The algorithm that computes how much each weight in a neural network contributed to the prediction error, then updates them to reduce that error.",
    analogy: "Like tracing which dominoes caused the final one to fall — then nudging each one slightly so fewer fall next time.",
    formal: "Backpropagation applies the chain rule of calculus to compute gradients of the loss function with respect to each weight by propagating error signals backwards through the network layers.",
    related: ["Gradient Descent", "Loss Function", "Parameters", "Neural Network"],
    example: "After predicting 'cat' when the image was a 'dog', backprop figures out which neurons fired strongly for that wrong prediction and reduces their weights.",
  },
  {
    term: "Bias-Variance Tradeoff",
    category: "Model Evaluation",
    color: "#60A5FA",
    difficulty: "Intermediate",
    simple: "A model that's too simple makes consistent wrong guesses (high bias). One that's too complex makes inconsistent ones (high variance). The tradeoff is finding the sweet spot.",
    analogy: "A biased archer always hits 10cm left of center. A high-variance archer hits randomly scattered. You want neither.",
    formal: "The expected test error decomposes into bias² (error from wrong assumptions), variance (sensitivity to training data fluctuations), and irreducible noise.",
    related: ["Overfitting", "Underfitting", "Regularization", "Cross-Validation"],
    example: "A linear model on a complex dataset has high bias (too simple). A 10th-degree polynomial on 20 data points has high variance (too flexible).",
  },
  {
    term: "Cross-Entropy Loss",
    category: "Loss Functions",
    color: "#C084FC",
    difficulty: "Intermediate",
    simple: "A way to measure how wrong a classifier's probability outputs are. It punishes confident wrong predictions much more than uncertain ones.",
    analogy: "If you say 99% sure it's a cat and it's a dog, cross-entropy penalizes you severely. If you say 51% sure, it's more lenient.",
    formal: "H(p,q) = -Σ p(x) log q(x). For binary classification: -(y·log(ŷ) + (1-y)·log(1-ŷ)). Minimizing this is equivalent to maximizing likelihood.",
    related: ["Loss Function", "Softmax", "Logistic Regression"],
    example: "Used in every classification model — sentiment analysis, image recognition, spam detection.",
  },
  {
    term: "Dropout",
    category: "Regularization",
    color: "#34D399",
    difficulty: "Intermediate",
    simple: "During training, randomly 'turn off' some neurons. This prevents the network from relying too heavily on any single path and forces it to learn robust features.",
    analogy: "Like training a sports team where random players sit out each practice. Everyone gets stronger because no one becomes irreplaceable.",
    formal: "Each neuron activation is set to 0 with probability p (dropout rate) during training. At inference, activations are scaled by (1-p) to maintain expected values.",
    related: ["Regularization", "Overfitting", "Neural Network"],
    example: "A dropout rate of 0.5 means each neuron has a 50% chance of being zeroed out each training step.",
  },
  {
    term: "Epoch",
    category: "Training",
    color: "#F59E0B",
    difficulty: "Beginner",
    simple: "One complete pass through the entire training dataset. Most models need many epochs to converge.",
    analogy: "Like reading a textbook once. You usually need multiple re-reads before you fully grasp the material.",
    formal: "An epoch completes when every sample in the training set has been used exactly once to update model parameters via gradient descent.",
    related: ["Batch Size", "Gradient Descent", "Learning Rate"],
    example: "Training for 100 epochs means the model has 'seen' the entire dataset 100 times.",
  },
  {
    term: "Feature Engineering",
    category: "Data",
    color: "#FF6B6B",
    difficulty: "Intermediate",
    simple: "Transforming raw data into more useful representations for the model. Often more impactful than choosing the model itself.",
    analogy: "Don't give a model raw flour, sugar, eggs — give it dough. The transformation matters as much as the recipe.",
    formal: "The process of using domain knowledge to create, transform, or select input variables that better capture the underlying structure of the problem.",
    related: ["Data Preprocessing", "Normalization", "Embeddings"],
    example: "Converting a timestamp into 'day of week', 'hour', 'is_weekend' gives the model more signal than the raw number.",
  },
  {
    term: "Gradient Descent",
    category: "Optimization",
    color: "#FF6B6B",
    difficulty: "Beginner",
    simple: "An algorithm that adjusts model parameters step-by-step in the direction that reduces prediction error. Each step is proportional to the gradient.",
    analogy: "Imagine being blindfolded on a hilly landscape, trying to reach the lowest valley. Each step: feel which direction slopes downward, step that way.",
    formal: "θ ← θ - α∇L(θ), where α is the learning rate, ∇L is the gradient of the loss with respect to parameters θ.",
    related: ["Learning Rate", "Loss Function", "Parameters", "SGD"],
    example: "Every neural network you've ever used was trained with some form of gradient descent — Adam, SGD, RMSProp are all variants.",
  },
  {
    term: "Learning Rate",
    category: "Hyperparameters",
    color: "#8B5CF6",
    difficulty: "Beginner",
    simple: "Controls how big each step is during gradient descent. Too large: overshoot the minimum. Too small: extremely slow convergence.",
    analogy: "It's your hiking stride length. Tiny steps take forever. Giant leaps risk stepping past the valley and falling off the other side.",
    formal: "The scalar α that scales the gradient in the update rule θ ← θ - α∇L(θ). Often decayed using schedules like cosine annealing.",
    related: ["Gradient Descent", "Learning Rate Scheduling", "Adam Optimizer"],
    example: "lr=0.1 might diverge, lr=0.001 trains slowly, lr=0.01 might be the sweet spot — found via experimentation.",
  },
  {
    term: "Loss Function",
    category: "Training",
    color: "#C084FC",
    difficulty: "Beginner",
    simple: "A measurement of how wrong the model's predictions are. The goal of training is to make this number as small as possible.",
    analogy: "Think of it as the model's error score on an exam. Training is studying until the score approaches zero.",
    formal: "L: ℝⁿ × ℝⁿ → ℝ, a function mapping predictions and ground truth to a scalar representing prediction quality.",
    related: ["Gradient Descent", "Cross-Entropy Loss", "MSE", "Backpropagation"],
    example: "MSE (Mean Squared Error) for regression, Cross-Entropy for classification.",
  },
  {
    term: "Neural Network",
    category: "Architecture",
    color: "#8B5CF6",
    difficulty: "Beginner",
    simple: "A computational model loosely inspired by the brain. Layers of mathematical transformations that learn to detect patterns in data.",
    analogy: "Not really like the brain — more like a sequence of spreadsheet operations stacked on top of each other, trained until outputs match targets.",
    formal: "A directed acyclic graph of parameterized functions (layers), where each layer applies an affine transformation followed by a non-linear activation.",
    related: ["Backpropagation", "Activation Functions", "Deep Learning", "Weights"],
    example: "Image classifiers, language models, and recommendation engines are all neural networks at their core.",
  },
  {
    term: "Overfitting",
    category: "Model Evaluation",
    color: "#FF6B6B",
    difficulty: "Beginner",
    simple: "When a model memorizes training data so well that it fails on new data. High training accuracy, low test accuracy.",
    analogy: "A student who memorizes past exam answers verbatim — they ace the same exam but fail if one question changes.",
    formal: "Overfitting occurs when model complexity exceeds what the data can support, causing low training error but high generalization error (high variance).",
    related: ["Bias-Variance Tradeoff", "Regularization", "Dropout", "Cross-Validation"],
    example: "A 1000-parameter model trained on 100 data points will almost certainly overfit.",
  },
  {
    term: "Parameters",
    category: "Model Components",
    color: "#34D399",
    difficulty: "Beginner",
    simple: "The internal numbers (weights and biases) that a model learns from data. These are what gradient descent adjusts during training.",
    analogy: "The knobs and dials of the model. Training is the automated process of turning them until outputs match targets.",
    formal: "Learnable scalars θ ∈ ℝ that define the model's function. GPT-4 has ~1.8 trillion parameters; a simple regression has 2.",
    related: ["Gradient Descent", "Weights", "Biases", "Neural Network"],
    example: "A linear model y = mx + b has 2 parameters: slope m and intercept b.",
  },
  {
    term: "Regularization",
    category: "Regularization",
    color: "#34D399",
    difficulty: "Intermediate",
    simple: "Techniques that penalize model complexity during training to prevent overfitting. Forces the model to learn simpler, more general patterns.",
    analogy: "A budget constraint when decorating a room — you can't go overboard, so you're forced to make choices that work broadly.",
    formal: "Adding a penalty term Ω(θ) to the loss: L_reg = L + λΩ(θ). L1 uses |θ|, L2 uses θ², dropout randomly zeroes activations.",
    related: ["Overfitting", "L1/L2 Regularization", "Dropout", "Bias-Variance Tradeoff"],
    example: "L2 regularization (weight decay) penalizes large weights, forcing the model to use all features moderately rather than a few heavily.",
  },
  {
    term: "Softmax",
    category: "Activation Functions",
    color: "#C084FC",
    difficulty: "Intermediate",
    simple: "A function that converts raw model outputs (logits) into a probability distribution — all values positive and summing to 1.",
    analogy: "Like converting vote counts into percentages. 100 votes when totals are 100+200+100 = 25%, 50%, 25%.",
    formal: "softmax(z)ᵢ = e^zᵢ / Σⱼ e^zⱼ. Always applied to the final layer of a multi-class classifier before cross-entropy loss.",
    related: ["Cross-Entropy Loss", "Logits", "Classification", "Attention Mechanism"],
    example: "Output logits [2.1, 0.5, -1.2] → after softmax → [0.72, 0.16, 0.12] (probabilities summing to 1).",
  },
  {
    term: "Transfer Learning",
    category: "Training",
    color: "#60A5FA",
    difficulty: "Intermediate",
    simple: "Using a model trained on one task as the starting point for a different (often related) task. Dramatically reduces data and compute needed.",
    analogy: "You already know English. Learning Spanish is much faster because grammar intuition, reading skills, and vocabulary patterns transfer over.",
    formal: "Given a source domain Ds and target domain Dt, transfer learning leverages knowledge from source task Ts to improve target task Tt performance.",
    related: ["Fine-tuning", "Pre-trained Models", "Feature Extraction"],
    example: "GPT, BERT, and CLIP were all trained on massive datasets — fine-tuning them on your specific task takes hours, not months.",
  },
  {
    term: "Transformer",
    category: "Architecture",
    color: "#8B5CF6",
    difficulty: "Advanced",
    simple: "An architecture that processes sequences using 'attention' — learning which parts of the input to focus on for each output. Powers ChatGPT, BERT, and most modern AI.",
    analogy: "When translating a sentence, you don't translate word by word — you consider the whole sentence for context. Transformers do this mathematically.",
    formal: "An encoder-decoder architecture using multi-head self-attention and feed-forward layers. Self-attention: Attention(Q,K,V) = softmax(QKᵀ/√d_k)V.",
    related: ["Attention Mechanism", "Self-Attention", "BERT", "GPT", "Softmax"],
    example: "Every large language model (ChatGPT, Gemini, Claude) uses the Transformer architecture as its foundation.",
  },
];

const CATEGORIES = ["All", "Training", "Optimization", "Architecture", "Model Evaluation", "Regularization", "Hyperparameters", "Data", "Loss Functions", "Activation Functions", "Model Components"];
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

function TermCard({ entry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
      expanded ? "border-[var(--border-hover)] bg-[var(--surface)]" : "border-[var(--border)] bg-[var(--surface)]/50"
    }`}>
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
      >
        <div
          className="w-2 h-8 rounded-full shrink-0"
          style={{ background: entry.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-syne font-bold text-base">{entry.term}</span>
            <span
              className="text-[9px] font-syne font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ color: entry.color, background: `${entry.color}15`, border: `1px solid ${entry.color}30` }}
            >
              {entry.category}
            </span>
            <span className={`text-[9px] font-syne font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
              entry.difficulty === "Beginner" ? "text-emerald-400 border-emerald-500/25 bg-emerald-500/10"
              : entry.difficulty === "Intermediate" ? "text-amber-400 border-amber-500/25 bg-amber-500/10"
              : "text-coral border-coral/25 bg-coral/10"
            }`}>
              {entry.difficulty}
            </span>
          </div>
          <p className="text-[var(--muted)] font-dm text-xs mt-0.5 truncate">{entry.simple.slice(0, 80)}…</p>
        </div>
        {expanded
          ? <ChevronUp size={16} className="text-[var(--muted)] shrink-0" />
          : <ChevronDown size={16} className="text-[var(--muted)] shrink-0" />
        }
      </button>

      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: expanded ? "800px" : "0px", opacity: expanded ? 1 : 0 }}
      >
        <div className="px-5 pb-6 border-t border-[var(--border)]/60">
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Plain English */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--deep)]/40">
              <p className="text-[10px] font-syne font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Plain English</p>
              <p className="font-dm text-sm text-[var(--text-dim)] leading-relaxed">{entry.simple}</p>
            </div>

            {/* Analogy */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--deep)]/40">
              <p className="text-[10px] font-syne font-bold uppercase tracking-widest text-[var(--muted)] mb-2">💡 Analogy</p>
              <p className="font-dm text-sm text-[var(--text-dim)] leading-relaxed italic">{entry.analogy}</p>
            </div>

            {/* Formal */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--deep)]/40">
              <p className="text-[10px] font-syne font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Technical Definition</p>
              <p className="font-dm text-sm text-[var(--text-dim)] leading-relaxed font-mono text-[0.8rem]">{entry.formal}</p>
            </div>

            {/* Example */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--deep)]/40">
              <p className="text-[10px] font-syne font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Real Example</p>
              <p className="font-dm text-sm text-[var(--text-dim)] leading-relaxed">{entry.example}</p>
            </div>
          </div>

          {/* Related terms */}
          <div className="mt-4">
            <p className="text-[10px] font-syne font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Related Terms</p>
            <div className="flex flex-wrap gap-2">
              {entry.related.map(r => (
                <span
                  key={r}
                  className="text-xs font-dm px-3 py-1 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text-dim)] hover:border-[var(--border-hover)] cursor-pointer transition-all"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LexiconPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const filtered = useMemo(() => {
    return FULL_LEXICON.filter(e => {
      const matchSearch = e.term.toLowerCase().includes(search.toLowerCase())
        || e.simple.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || e.category === category;
      const matchDiff = difficulty === "All" || e.difficulty === difficulty;
      return matchSearch && matchCat && matchDiff;
    });
  }, [search, category, difficulty]);

  const alphabet = [...new Set(filtered.map(e => e.term[0].toUpperCase()))].sort();

  return (
    <div className="relative min-h-screen bg-[var(--deep)] overflow-x-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <GlowOrb color="purple" size={600} opacity={0.08} top="-5%" left="-5%" />
      <GlowOrb color="coral" size={400} opacity={0.06} bottom="20%" right="-5%" />

      {/* Header */}
      <div className="relative pt-16 pb-10 px-[5%]">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionLabel color="lavender">ML Terminology</SectionLabel>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
              The ML <span className="gradient-text">Lexicon</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <p className="text-[var(--muted)] font-dm text-lg max-w-xl leading-relaxed mb-8">
              Every term — plain English first, analogy second, formal definition third. Search, filter, explore. Never confused by jargon again.
            </p>
          </AnimatedSection>

          {/* Search */}
          <AnimatedSection delay={220}>
            <div className="relative max-w-lg">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="Search terms, definitions…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-base w-full pl-11 pr-5 py-3.5 text-sm rounded-2xl"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="relative px-[5%] pb-24">
        <div className="max-w-5xl mx-auto">

          {/* Filters */}
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex flex-wrap gap-2">
                {DIFFICULTIES.map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-syne font-bold border transition-all ${
                      difficulty === d
                        ? "bg-coral/20 border-coral/50 text-coral"
                        : "bg-transparent border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-[var(--muted)] text-sm font-dm">
              <BookOpen size={14} />
              <span><strong className="text-[var(--text-dim)]">{filtered.length}</strong> terms</span>
            </div>
            <span className="text-[var(--muted)]/30">·</span>
            <span className="text-[var(--muted)] text-sm font-dm">
              {FULL_LEXICON.filter(e => e.difficulty === "Beginner").length} beginner ·{" "}
              {FULL_LEXICON.filter(e => e.difficulty === "Intermediate").length} intermediate ·{" "}
              {FULL_LEXICON.filter(e => e.difficulty === "Advanced").length} advanced
            </span>
          </div>

          {/* Terms grouped by letter */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--muted)] font-dm text-lg">No terms found for "{search}"</p>
              <button onClick={() => { setSearch(""); setCategory("All"); setDifficulty("All"); }}
                className="mt-4 text-violet text-sm font-dm hover:text-lavender transition-colors">
                Clear filters
              </button>
            </div>
          ) : (
            alphabet.map(letter => {
              const terms = filtered.filter(e => e.term[0].toUpperCase() === letter);
              return (
                <div key={letter} className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-syne font-extrabold text-3xl gradient-text">{letter}</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {terms.map(entry => (
                      <TermCard key={entry.term} entry={entry} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
