import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ConceptDemo from "@/components/sections/ConceptDemo";
import Features from "@/components/sections/Features";
import LearningOutcomes from "@/components/sections/LearningOutcomes";
import HowItWorks from "@/components/sections/HowItWorks";
import StatsCounter from "@/components/sections/StatsCounter";
import Comparison from "@/components/sections/Comparison";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <ConceptDemo />
      <Features />
      <LearningOutcomes />
      <HowItWorks />
      <StatsCounter />
      <Comparison />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
