"use client";

import { useState, useEffect } from "react";
import { useScrolled } from "@/lib/hooks/useScrolled";
import { scrollToSection } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import NeuralIcon from "@/components/ui/NeuralIcon";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Menu, X, ChevronRight, ChevronDown, Sparkles, Zap, Brain, Trophy, Users, BookOpen, Target } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const scrolled = useScrolled(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [hoveredPlatformItem, setHoveredPlatformItem] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const platformLinks = [
    { label: "Learning Path", href: "/learning-path", icon: Brain, description: "Structured ML curriculum", color: "from-blue-400 to-cyan-400" },
    { label: "Challenges", href: "/challenges", icon: Target, description: "Test your skills", color: "from-orange-400 to-red-400" },
    { label: "My Course", href: "/my-course", icon: BookOpen, description: "Your personalized track", color: "from-green-400 to-emerald-400" },
    { label: "Achievement", href: "/achievement", icon: Trophy, description: "Earn badges & rewards", color: "from-yellow-400 to-amber-400" },
    { label: "Buddy", href: "/buddy", icon: Users, description: "Learn with peers", color: "from-purple-400 to-pink-400" },
    { label: "Lexicon", href: "/lexicon", icon: BookOpen, description: "ML glossary", color: "from-indigo-400 to-violet-400" },
  ];

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleNav = (href) => {
    if (href.startsWith("#") && isHome) {
      scrollToSection(href.replace("#", ""));
    } else if (href.startsWith("#") && !isHome) {
      window.location.href = "/" + href;
    } else {
      window.location.href = href;
    }
    setMobileOpen(false);
  };

  // Update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) return;
      
      // Calculate scroll progress
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      
      // Update active section
      const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(`#${section}`);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-violet text-white px-4 py-2 rounded-lg z-[100]">
        Skip to content
      </a>

      <nav
        className="fixed top-0 left-0 right-0 z-50 px-[5%] h-[80px] flex items-center justify-between transition-all duration-700"
        style={{
          background: scrolled 
            ? "linear-gradient(135deg, rgba(10, 10, 20, 0.95), rgba(20, 15, 30, 0.98))" 
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
          boxShadow: scrolled 
            ? "0 20px 40px -15px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset" 
            : "none",
        }}
        aria-label="Main navigation"
      >
        {/* Animated background gradient */}
        {scrolled && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[100%] opacity-30">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-coral/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
          </div>
        )}

        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-coral to-violet rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1">
              <NeuralIcon size={36} />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <span className="font-syne font-extrabold text-2xl tracking-tight leading-none">
                <span className="bg-gradient-to-r from-coral via-orange-400 to-coral/80 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">ML</span>
                <span className="bg-gradient-to-r from-violet via-purple-400 to-lavender bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient delay-150">era</span>
              </span>
              <Sparkles size={14} className="text-yellow-400/70 animate-pulse" />
            </div>
            <span className="text-[0.6rem] font-mono text-[var(--muted)]/50 tracking-wider hidden sm:block relative">
              structured ML
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet to-transparent" />
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1" role="navigation">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeLink === href;
            return (
              <button
                key={label}
                onClick={() => handleNav(href)}
                className={`relative px-4 py-2 text-sm font-syne font-semibold tracking-wider uppercase transition-all duration-500 rounded-xl group overflow-hidden ${
                  isActive 
                    ? "text-white" 
                    : "text-[var(--muted)] hover:text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Hover effect background */}
                <span className="absolute inset-0 bg-gradient-to-r from-violet/20 to-coral/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Active background */}
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-violet/30 to-coral/30 rounded-xl animate-pulse" />
                )}
                
                {/* Shine effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000" />
                
                <span className="relative z-10 flex items-center gap-2">
                  {label}
                  {isActive && <Zap size={12} className="text-yellow-400 animate-pulse" />}
                </span>
                
                {/* Animated underline */}
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-coral to-violet transition-all duration-500 ${
                  isActive ? "w-1/2" : "w-0 group-hover:w-1/3"
                }`} />
              </button>
            );
          })}
          
          {/* Platform Dropdown - Enhanced */}
          <div 
            className="relative"
            onMouseEnter={() => setPlatformDropdownOpen(true)}
            onMouseLeave={() => {
              setPlatformDropdownOpen(false);
              setHoveredPlatformItem(null);
            }}
          >
            <button
              className={`relative px-4 py-2 text-sm font-syne font-semibold tracking-wider uppercase transition-all duration-500 rounded-xl group overflow-hidden flex items-center gap-1 ${
                platformDropdownOpen ? "text-white" : "text-[var(--muted)] hover:text-white"
              }`}
              aria-expanded={platformDropdownOpen}
              aria-haspopup="true"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet/20 to-coral/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000" />
              <span className="relative z-10 flex items-center gap-2">
                Platform
                <ChevronDown 
                  size={16} 
                  className={`transition-all duration-500 ${
                    platformDropdownOpen ? 'rotate-180 translate-y-0.5' : ''
                  }`}
                />
              </span>
            </button>
            
            {/* Enhanced Dropdown Menu */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-gradient-to-b from-[#1a1625] to-[#0f0b1a] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl py-2 transition-all duration-500 ${
                platformDropdownOpen 
                  ? "opacity-100 visible translate-y-0 scale-100" 
                  : "opacity-0 invisible -translate-y-4 scale-95"
              }`}
              style={{
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset",
              }}
              role="menu"
              aria-orientation="vertical"
            >
              {/* Animated gradient orbs */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-violet/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-coral/20 rounded-full blur-3xl animate-pulse delay-700" />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/5 mb-2">
                  <div className="flex items-center gap-2 text-xs text-[var(--muted)]/70">
                    <Zap size={12} className="text-yellow-400" />
                    <span>EXPLORE PLATFORM</span>
                  </div>
                </div>

                {/* Links with icons and descriptions */}
                {platformLinks.map(({ label, href, icon: Icon, description, color }, index) => (
                  <Link
                    key={label}
                    href={href}
                    onMouseEnter={() => setHoveredPlatformItem(index)}
                    onMouseLeave={() => setHoveredPlatformItem(null)}
                    className="relative flex items-start gap-3 px-4 py-3 text-[var(--muted)] hover:text-white transition-all duration-300 group overflow-hidden"
                    role="menuitem"
                  >
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Icon with animated gradient */}
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                      <div className={`relative w-8 h-8 rounded-lg bg-gradient-to-br ${color} p-2 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5`}>
                        <Icon size={16} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-syne font-semibold">{label}</span>
                        <ChevronRight 
                          size={14} 
                          className={`text-[var(--muted)] transition-all duration-300 ${
                            hoveredPlatformItem === index ? 'translate-x-1 opacity-100' : 'opacity-0'
                          }`}
                        />
                      </div>
                      <p className="text-xs text-[var(--muted)]/50 group-hover:text-[var(--muted)]/70 transition-colors">
                        {description}
                      </p>
                    </div>

                    {/* Animated indicator */}
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-gradient-to-b ${color} transition-all duration-500 group-hover:h-8`} />
                  </Link>
                ))}

                {/* Footer */}
                <div className="px-4 py-3 mt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--muted)]/40">6 learning paths</span>
                    <span className="text-violet flex items-center gap-1">
                      View all <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 relative z-10">
          <div className="flex items-center gap-3 pr-3 border-r border-white/10">
            <ThemeToggle />
          </div>
          <Button 
            onClick={() => { if (isHome) scrollToSection("join"); else window.location.href = "/#join"; }} 
            size="sm" 
            className="relative overflow-hidden group bg-gradient-to-r from-violet to-coral hover:from-violet/90 hover:to-coral/90 border-0"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 flex items-center gap-2">
              Get Early Access
              <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            </span>
          </Button>
        </div>

        {/* Mobile menu button with animation */}
        <button
          className="md:hidden relative w-12 h-12 rounded-xl bg-gradient-to-br from-violet/20 to-coral/20 hover:from-violet/30 hover:to-coral/30 transition-all duration-500 flex items-center justify-center group overflow-hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
            {mobileOpen ? 
              <X size={22} className="text-white" /> : 
              <Menu size={22} className="text-white" />
            }
          </div>
        </button>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-700 ${mobileOpen ? "visible opacity-100" : "invisible opacity-0"}`} aria-hidden={!mobileOpen}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0b1a]/95 to-[#1a1625]/95 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
        
        <div className={`absolute top-[88px] left-4 right-4 bg-gradient-to-b from-[#1f1a2e] to-[#141126] border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl px-6 py-8 flex flex-col gap-3 transition-all duration-700 ${
          mobileOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-8 opacity-0 scale-95"
        }`}>
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-coral/20 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <div className="relative z-10">
            {/* User greeting with animation */}
            <div className="flex items-center gap-4 pb-6 mb-4 border-b border-white/5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-coral to-violet rounded-2xl blur-md animate-pulse" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-coral to-violet flex items-center justify-center transform transition-transform group-hover:scale-110">
                  <span className="text-white font-bold text-2xl">ML</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg font-syne font-semibold text-white">Welcome to MLera</p>
                <p className="text-xs text-[var(--muted)]/70 flex items-center gap-1">
                  <Sparkles size={12} className="text-yellow-400" />
                  structured learning platform
                </p>
              </div>
            </div>

            {/* Navigation sections with icons */}
            <nav className="flex flex-col gap-2" aria-label="Mobile menu">
              <div className="px-1 py-1">
                <span className="text-xs font-syne font-bold uppercase tracking-wider text-[var(--muted)]/50 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-coral" />
                  MAIN MENU
                </span>
              </div>
              
              {NAV_LINKS.map(({ label, href }) => (
                <button 
                  key={label} 
                  onClick={() => handleNav(href)} 
                  className="group flex items-center justify-between w-full px-4 py-4 text-left text-[var(--text-dim)] hover:text-white hover:bg-gradient-to-r hover:from-violet/20 hover:to-coral/20 rounded-2xl transition-all duration-300"
                >
                  <span className="text-base font-syne font-semibold flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]/30 group-hover:bg-coral group-hover:scale-150 transition-all" />
                    {label}
                  </span>
                  <ChevronRight size={18} className="text-[var(--muted)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              ))}
              
              <div className="mt-4 mb-2 px-1 py-1">
                <span className="text-xs font-syne font-bold uppercase tracking-wider text-[var(--muted)]/50 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-violet" />
                  PLATFORM
                </span>
              </div>
              
              {platformLinks.map(({ label, href, icon: Icon, description, color }) => (
                <Link 
                  key={label} 
                  href={href} 
                  onClick={() => setMobileOpen(false)} 
                  className="group flex items-center gap-4 w-full px-4 py-3 text-[var(--muted)] hover:text-white hover:bg-gradient-to-r hover:from-violet/20 hover:to-coral/20 rounded-2xl transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} p-2.5 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-syne font-semibold">{label}</span>
                      <ChevronRight size={16} className="text-[var(--muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-[var(--muted)]/50 group-hover:text-[var(--muted)]/70">
                      {description}
                    </p>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Bottom section with theme and CTA */}
            <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm text-[var(--muted)] font-dm flex items-center gap-2">
                  <Zap size={14} className="text-yellow-400" />
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <Button 
                onClick={() => { if (isHome) scrollToSection("join"); else window.location.href = "/#join"; setMobileOpen(false); }} 
                className="w-full justify-center mt-2 bg-gradient-to-r from-violet to-coral hover:from-violet/90 hover:to-coral/90 border-0 py-4 text-base"
                size="md"
              >
                <span className="flex items-center gap-2">
                  Get Early Access
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>

            <p className="text-center text-[0.65rem] text-[var(--muted)]/30 mt-6 flex items-center justify-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              Built at IIIT Dharwad Research Park
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Scroll Progress Bar - Now tracks actual scroll position */}
      <div className="fixed top-[80px] left-0 right-0 h-[2px] z-50 overflow-hidden bg-white/5">
        <div 
          className="h-full bg-gradient-to-r from-coral via-violet to-lavender transition-all duration-300 ease-out"
          style={{ 
            width: `${scrollProgress}%`,
            boxShadow: "0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)"
          }}
        />
      </div>
    </>
  );
}