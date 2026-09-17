import React, {
  useState, useEffect, useMemo, useRef, useCallback,
} from "react";
import {
  motion, AnimatePresence, useScroll, useTransform, useSpring,
  useInView, useMotionValue, useAnimationFrame, useReducedMotion,
} from "framer-motion";
import {
  Sparkles, ArrowLeft, ArrowRight, CheckCircle2,
  Code2, Monitor, Warehouse, Stethoscope,
  Mail, MapPin, Search, Plus, Globe, Sun, Moon, Menu, X,
  Star, Check, Copy, Clock, Wrench, ShieldCheck, Users,
  Compass, FileCheck2, Cpu, MonitorCheck, ChevronRight, ChevronLeft,
  Database, Wifi, BarChart3, Palette, Receipt,
} from "lucide-react";

import {
  EMAIL, TRUST_LOGOS, COPY,
  TESTIMONIAL_AVATARS, SERVICE_IMAGES, PORTFOLIO_IMAGES, ABOUT_IMAGE,
  CLINIC_SCREENSHOTS, POS_SCREENSHOTS,
} from "./i18n.js";

// ── Motion Variants ──────────────────────────────────────────────────────────
const FI_UP = {
  hidden:  { opacity: 0, y: 50, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const STAGGER = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const SLIDE_LEFT  = {
  hidden:  { opacity: 0, x:  60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const SLIDE_RIGHT = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

// ── Count-Up Hook ────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1.8) {
  const [count, setCount] = useState(0);
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const isArabic  = /[٠-٩]/.test(String(target));
    // extract numeric part
    const rawStr    = String(target).replace(/[^0-9٠-٩.٪+]/g, "");
    const numeric   = parseFloat(rawStr.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)));
    const suffix    = String(target).replace(/[0-9٠-٩.]/g, "");

    const arDigit = n => String(n).replace(/[0-9]/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);

    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      const val  = Math.floor(ease * numeric);
      setCount(isArabic ? arDigit(val) + suffix : val + suffix);
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return [ref, count || (String(target).startsWith("٠") ? "٠" : "0")];
}

// ── Stat Card with Count-Up ───────────────────────────────────────────────────
function StatCard({ n, l }) {
  const [ref, count] = useCountUp(n);
  return (
    <div ref={ref} className="stat-card text-center p-8 rounded-3xl bg-[var(--bg)] dark:bg-slate-900
      border border-[var(--border)] dark:border-slate-800 hover:border-[var(--brand)]/40 transition-colors">
      <p className="font-heading font-black text-4xl sm:text-6xl text-[var(--brand)] mb-2 tracking-tight">
        {count}
      </p>
      <p className="text-xs sm:text-sm text-[var(--muted)] dark:text-slate-400 font-bold uppercase tracking-wider">
        {l}
      </p>
    </div>
  );
}

// ── Interactive Spotlight Card (Mercury SaaS dynamic card) ─────────────────
function SpotlightCard({ children, className = "", onClick, ...props }) {
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${(e.clientX - rect.left).toFixed(1)}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${(e.clientY - rect.top).toFixed(1)}px`);
  }, []);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`mercury-card relative overflow-hidden group ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(var(--brand-rgb), 0.12), transparent 65%)",
          willChange: "opacity",
        }}
      />
      {children}
    </motion.div>
  );
}

// ── Elegant Ambient Scan Light & Constellation Dots (Ultra-Light GPU Accelerated) ───
function ElegantTechBackground({ darkMode }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* 1. Subtle Cyan / Blue Laser Scan Light Beam */}
      <div className="cyber-scan-beam" />

      {/* 2. Ambient Soft Glow Orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full blur-[120px] opacity-25 dark:opacity-35 pointer-events-none"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse at center, rgba(45, 212, 191, 0.25) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(15, 92, 82, 0.12) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%)",
        }}
      />

      {/* 3. Subtle Constellation Tech Dots */}
      <svg className="absolute inset-0 w-full h-full opacity-45 dark:opacity-65" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Constellation lines */}
        <line x1="12%" y1="18%" x2="22%" y2="28%" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="22%" y1="28%" x2="16%" y2="44%" stroke="rgba(45, 212, 191, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="82%" y1="15%" x2="90%" y2="30%" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="90%" y1="30%" x2="78%" y2="42%" stroke="rgba(45, 212, 191, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="78%" y1="75%" x2="88%" y2="85%" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="10%" y1="70%" x2="20%" y2="82%" stroke="rgba(45, 212, 191, 0.18)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Constellation pulsing dots */}
        <circle cx="12%" cy="18%" r="3" fill="#38BDF8" filter="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "3s" }} />
        <circle cx="22%" cy="28%" r="2" fill="#2DD4BF" />
        <circle cx="16%" cy="44%" r="2.5" fill="#38BDF8" className="animate-pulse" style={{ animationDuration: "4s" }} />
        <circle cx="82%" cy="15%" r="3" fill="#38BDF8" filter="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "3.5s" }} />
        <circle cx="90%" cy="30%" r="2" fill="#2DD4BF" />
        <circle cx="78%" cy="42%" r="2.5" fill="#38BDF8" className="animate-pulse" style={{ animationDuration: "4.5s" }} />
        <circle cx="10%" cy="70%" r="2" fill="#2DD4BF" />
        <circle cx="20%" cy="82%" r="3" fill="#38BDF8" filter="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "3.2s" }} />
        <circle cx="78%" cy="75%" r="2.5" fill="#2DD4BF" />
        <circle cx="88%" cy="85%" r="3" fill="#38BDF8" filter="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "3.8s" }} />
        <circle cx="50%" cy="12%" r="2" fill="#38BDF8" />
        <circle cx="52%" cy="65%" r="2" fill="#2DD4BF" />
      </svg>
    </div>
  );
}

// ── Process Line-Art Icons ──────────────────────────────────────────────────
const PROCESS_ICONS = [Compass, FileCheck2, Cpu, MonitorCheck];

const SERVICE_ICONS = { pos: Monitor, warehouse: Warehouse, clinic: Stethoscope };

// ── Main Component ────────────────────────────────────────────────────────────
export default function AgencyWebsite() {
  const [isLoading,   setIsLoading]  = useState(false);
  const [lang,       setLang]       = useState(() => localStorage.getItem("Aura_lang") || "ar");
  const [darkMode,   setDarkMode]   = useState(() => localStorage.getItem("Aura_theme") === "dark");
  const [theme,      setTheme]      = useState(() => localStorage.getItem("shaghal_theme") || "ledger");
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [filter,     setFilter]     = useState("all");
  const [openFaq,    setOpenFaq]    = useState(0);
  const [faqQuery,   setFaqQuery]   = useState("");
  const [showTop,    setShowTop]    = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [toastMsg,   setToastMsg]   = useState(null);
  const [formState,  setFormState]  = useState({ name: "", contact: "", service: "", details: "" });
  const [formSent,   setFormSent]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [activeCase,    setActiveCase]    = useState(null);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(null);

  const t     = COPY[lang] || COPY.ar;
  const isRTL = lang === "ar";
  const shouldReduceMotion = useReducedMotion();

  // Page-wide scroll progress bar
  const { scrollYProgress: pageScroll } = useScroll();
  const scrollProgressSpring = useSpring(pageScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });


  // Theme & Dark-mode & Lang sync
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("shaghal_theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("Aura_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir  = t.dir;
    localStorage.setItem("Aura_lang", lang);
  }, [lang, t.dir]);

  // High-performance scroll listener: rAF-throttled + only triggers state updates when boolean flips
  useEffect(() => {
    let lastScrolled = window.scrollY > 40;
    let lastShowTop = window.scrollY > 500;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const nextScrolled = y > 40;
          const nextShowTop = y > 500;
          if (nextScrolled !== lastScrolled) {
            lastScrolled = nextScrolled;
            setScrolled(nextScrolled);
          }
          if (nextShowTop !== lastShowTop) {
            lastShowTop = nextShowTop;
            setShowTop(nextShowTop);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dynamic active screenshots based on activeService (POS vs Clinic)
  const activeScreenshots = activeService?.screenshots || CLINIC_SCREENSHOTS;

  // Lightbox keyboard navigation & focus trapping
  useEffect(() => {
    if (activeScreenshotIdx === null) return;
    const total = activeScreenshots.length;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveScreenshotIdx(null);
      } else if (e.key === "ArrowRight") {
        setActiveScreenshotIdx(prev => {
          if (prev === null) return null;
          return isRTL ? (prev === 0 ? total - 1 : prev - 1) : (prev === total - 1 ? 0 : prev + 1);
        });
      } else if (e.key === "ArrowLeft") {
        setActiveScreenshotIdx(prev => {
          if (prev === null) return null;
          return isRTL ? (prev === total - 1 ? 0 : prev + 1) : (prev === 0 ? total - 1 : prev - 1);
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScreenshotIdx, isRTL, activeScreenshots]);

  // Toast
  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    showToast(t.toast.emailCopied);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.contact) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSent(true);
      showToast(t.toast.formSubmitted);
      setFormState({ name: "", contact: "", service: "", details: "" });
    }, 900);
  };

  const filteredPortfolio = useMemo(() => {
    if (filter === "all") return t.portfolio;
    return t.portfolio.filter(p => p.key === filter);
  }, [filter, t.portfolio]);

  const filteredFaqs = useMemo(() => {
    if (!faqQuery.trim()) return t.faqs;
    const q = faqQuery.toLowerCase();
    return t.faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [faqQuery, t.faqs]);

  // Shared viewport transition prop
  const vp = { once: true, margin: "-60px" };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative ${
      darkMode ? "bg-[#101828] text-slate-100" : "bg-[var(--bg)] text-[var(--ink)]"
    }`} dir={t.dir}>

      {/* ── Background Cyber Scan Light & Constellation Dots ───── */}
      <ElegantTechBackground darkMode={darkMode} />

      {/* ── Scroll Progress Bar (Neon Top Indicator) ───────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--brand)] via-[var(--brand-hover)] to-[var(--brand)] z-[100] origin-left shadow-[0_0_14px_rgba(var(--brand-rgb),0.9)]"
        style={{ scaleX: scrollProgressSpring }}
      />

      {/* ── TOAST ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#101828] text-white
              dark:bg-white dark:text-[#101828] px-6 py-3.5 rounded-full shadow-2xl flex items-center
              gap-3 border border-[var(--brand)]/40 text-sm max-w-md w-[90%]"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--brand)] shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVBAR ────────────────────────────────────────────────────────── */}
      <header className={`sticky top-0 z-50 glass-nav transition-all duration-300 ${
        scrolled ? "shadow-sm bg-white/92 dark:bg-[#101828]/92 py-2" : "bg-transparent py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-lg p-1">
            <img src="/logo.svg" alt="Shaghal Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-md" />
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight text-[var(--ink)] dark:text-white">
                {lang === "ar" ? "شغال" : "Shaghal"}
              </span>
              <span className="text-[10px] tracking-widest text-[var(--muted)] dark:text-slate-400 font-semibold -mt-1 uppercase">
                {lang === "ar" ? "استوديو الأنظمة الرقمية" : "Digital Systems Studio"}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {[
              ["#hero", t.nav.home], ["#about", t.nav.about], ["#services", t.nav.services],
              ["#process", t.nav.process], ["#work", t.nav.work],
              ["#testimonials", t.nav.testimonials], ["#faq", t.nav.faq],
            ].map(([href, label]) => (
              <a key={href} href={href}
                className="text-sm font-bold text-[var(--ink)] dark:text-slate-200 hover:text-[var(--brand)] transition-colors py-1 focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-md">
                {label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
              aria-label="Toggle dark mode">
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[var(--ink)]" />}
            </button>

            {/* Language Switch */}
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)]
                dark:border-slate-800 text-xs font-bold text-[var(--ink)] dark:text-slate-200
                hover:border-[var(--brand)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
              aria-label="Change language">
              <Globe className="w-3.5 h-3.5 text-[var(--brand)]" />
              {t.langSwitch}
            </button>

            <a href="#contact"
              className="cta-pulse-btn mercury-pill-btn mercury-pill-btn-primary px-6 py-2.5 rounded-full
                text-white font-heading font-bold text-sm flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
              {t.cta}
              {isRTL
                ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </a>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-slate-200/60 dark:bg-slate-800" aria-label="Toggle dark mode">
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-2.5 py-1 rounded-full border border-[var(--border)] dark:border-slate-800 text-xs font-bold" aria-label="Change language">
              {t.langSwitch}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full bg-[#101828] text-white dark:bg-slate-800" aria-label="Open navigation menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-modal border-t border-[var(--border)] dark:border-slate-800 px-6 py-6 overflow-hidden"
            >
              <div className="flex flex-col gap-4 font-semibold text-[var(--ink)] dark:text-white">
                {[
                  ["#hero", t.nav.home], ["#about", t.nav.about], ["#services", t.nav.services],
                  ["#process", t.nav.process], ["#work", t.nav.work],
                  ["#testimonials", t.nav.testimonials], ["#faq", t.nav.faq],
                ].map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}
                    className="py-2 border-b border-[var(--border)] dark:border-slate-800 hover:text-[var(--brand)]">
                    {label}
                  </a>
                ))}
                
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  className="mt-2 w-full text-center py-3.5 rounded-full text-white font-heading font-bold brand-green-gradient">
                  {t.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="hero"
        className="relative pt-16 pb-28 lg:pt-24 lg:pb-36 overflow-hidden bg-[var(--bg)] dark:bg-[#101828] tech-grid-pattern">
        {/* Soft ambient glow with GPU-composited radial gradient */}
        {shouldReduceMotion ? (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none -z-10"
            style={{ background: "radial-gradient(ellipse at center, rgba(var(--brand-rgb), 0.14) 0%, rgba(var(--brand-rgb), 0.03) 50%, transparent 70%)" }} />
        ) : (
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none -z-10"
            style={{ background: "radial-gradient(ellipse at center, rgba(var(--brand-rgb), 0.14) 0%, rgba(var(--brand-rgb), 0.03) 50%, transparent 70%)", willChange: "transform", transform: "translateZ(0)" }}
            animate={{ x: [0, 35, -25, 0], y: [0, -15, 12, 0], scale: [1, 1.05, 0.97, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={STAGGER} className="max-w-5xl mx-auto">

            {/* Eyebrow */}
            <motion.div variants={FI_UP} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                bg-[var(--soft)] border border-[var(--brand)]/30 text-xs sm:text-sm font-bold text-[var(--ink)] dark:text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand)] animate-ping" />
                {t.hero.eyebrow}
              </span>
            </motion.div>

            {/* Giant Headline */}
            <motion.h1 variants={FI_UP}
              className="mercury-h1 text-4xl sm:text-6xl md:text-7xl lg:text-[76px]
                text-[var(--ink)] dark:text-white mb-8 tracking-tight font-black flex flex-col items-center justify-center">
              {isRTL && t.hero.titleLine1 ? (
                <>
                  <span className="block leading-[1.3] pb-2 sm:pb-3">{t.hero.titleLine1}</span>
                  <span className="block leading-[1.3] pt-2 sm:pt-4 mb-3">{t.hero.titleLine2}</span>
                </>
              ) : (
                <span className="block whitespace-pre-line mb-3 leading-[1.3]">{t.hero.title}</span>
              )}
              <span className="text-[var(--brand)] block leading-[1.3] pt-1">{t.hero.titleAccent}</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={FI_UP}
              className="text-base sm:text-lg lg:text-xl text-[var(--muted)] dark:text-slate-300
                max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.hero.desc}
            </motion.p>

            {/* CTA Pills */}
            <motion.div variants={FI_UP}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a href="#services"
                className="w-full sm:w-auto px-9 py-4 rounded-full text-white font-heading font-bold
                  text-base mercury-pill-btn mercury-pill-btn-primary cta-pulse-btn flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                {t.hero.explore}
                {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </a>
              <a href="#work"
                className="w-full sm:w-auto px-9 py-4 rounded-full font-heading font-bold text-base
                  mercury-pill-btn mercury-pill-btn-secondary flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                {t.hero.portfolio}
              </a>
            </motion.div>


            {/* Hero Mockup — Simple, Clean & High Performance */}
            <div className="mb-16">
              <div
                className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[var(--border)]
                  dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 p-3 sm:p-5"
              >
                <div className="relative rounded-2xl overflow-hidden bg-[#101828] aspect-[16/9]
                  flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop"
                    alt="Shaghal Digital Systems Dashboard"
                    className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-[#101828]/25 to-transparent" />

                  {/* Feature Badges */}
                  <div className="absolute bottom-6 right-6 left-6 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex items-center gap-3 bg-white/95 dark:bg-[#101828]/95 backdrop-blur-md
                        p-3.5 px-5 rounded-2xl border border-[var(--border)] dark:border-slate-800 shadow-xl">
                      <div className="mercury-line-art-badge w-10 h-10">
                        <Database className="w-5 h-5 text-[var(--brand)]" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-[var(--ink)] dark:text-white">
                          {isRTL ? "أنظمة برمجية مخصصة ١٠٠٪" : "100% Custom Systems"}
                        </span>
                        <span className="text-[11px] text-[var(--muted)] dark:text-slate-400">
                          {isRTL ? "نقاط بيع • مخازن • عيادات" : "POS • Warehouse • Clinics"}
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 bg-white/95 dark:bg-[#101828]/95 backdrop-blur-md
                        p-3.5 px-5 rounded-2xl border border-[var(--border)] dark:border-slate-800 shadow-xl">
                      <Wifi className="w-5 h-5 text-[var(--brand)]" />
                      <span className="text-xs font-bold text-[var(--ink)] dark:text-white">
                        {isRTL ? "تزامن فوري بين الفروع" : "Instant Multi-Branch Sync"}
                      </span>
                    </div>

                    <div className="hidden md:flex items-center gap-3 bg-white/95 dark:bg-[#101828]/95 backdrop-blur-md
                        p-3.5 px-5 rounded-2xl border border-[var(--border)] dark:border-slate-800 shadow-xl">
                      <BarChart3 className="w-5 h-5 text-[var(--brand)]" />
                      <span className="text-xs font-bold text-[var(--ink)] dark:text-white">
                        {isRTL ? "تقارير لحظية وذكية" : "Real-Time BI Analytics"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 System Spotlight Cards */}
            <motion.div variants={STAGGER} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
              {t.services.map((srv) => {
                const Icon = SERVICE_ICONS[srv.key] || Code2;
                const img  = SERVICE_IMAGES[srv.key];
                return (
                  <SpotlightCard key={srv.key}
                    variants={FI_UP}
                    className="p-6 flex flex-col justify-between">
                    <a href="#services" className="block focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-xl p-1">
                      <div className="relative h-48 rounded-2xl overflow-hidden mb-5">
                        <img src={img} alt={srv.title} loading="lazy" decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/90 via-transparent to-transparent" />
                        <span className="absolute top-3 right-3 bg-[#101828]/90 text-white font-bold text-xs px-2.5 py-1 rounded-md border border-[var(--brand)]/40">
                          {srv.label}
                        </span>
                        <div className="absolute bottom-3 right-3 left-3 text-white flex items-center gap-3">
                          <div className="mercury-line-art-badge w-9 h-9 shrink-0">
                            <Icon className="w-4 h-4 text-[var(--brand)]" />
                          </div>
                          <div>
                            <span className="font-heading font-black text-lg block">{srv.title}</span>
                            <span className="text-[11px] text-slate-300 block">{srv.sub}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] dark:border-slate-800">
                        <div>
                          <span className="block text-[11px] text-[var(--muted)] dark:text-slate-400">
                            {t.servicesSection.from}
                          </span>
                          <strong className="text-sm sm:text-base font-black text-[var(--ink)] dark:text-white">
                            {srv.priceFrom}
                          </strong>
                        </div>
                        <span className="text-xs font-bold text-[var(--brand)] flex items-center gap-1 group-hover:translate-x-[-3px] transition-transform">
                          {lang === "ar" ? "تفاصيل النظام" : "System Details"}
                          {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </span>
                      </div>
                    </a>
                  </SpotlightCard>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Trusted Brands Strip */}
          <div className="mt-20 max-w-5xl mx-auto border-t border-[var(--border)] dark:border-slate-800 pt-10">
            <p className="text-xs font-bold text-[var(--muted)] dark:text-slate-400 uppercase tracking-widest mb-6">
              {t.trustSection.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-80">
              {TRUST_LOGOS.map((b, i) => (
                <div key={i} className="px-4 py-2 rounded-full bg-white dark:bg-slate-900
                  border border-[var(--border)] dark:border-slate-800 text-xs font-bold text-[var(--ink)] dark:text-slate-200">
                  {b.name} <span className="text-[var(--brand)] font-semibold">({b.tag})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 lg:py-40 bg-white dark:bg-slate-950
        border-y border-[var(--border)] dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Image */}
            <motion.div initial="hidden" whileInView="visible" viewport={vp}
              variants={isRTL ? SLIDE_LEFT : SLIDE_RIGHT}
              className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[var(--border)]
                dark:border-slate-800 shadow-xl">
                <img src={ABOUT_IMAGE} alt={t.about.imageAlt} loading="lazy" decoding="async"
                  className="w-full h-[460px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/50 via-transparent to-transparent" />
              </div>

              {/* Floating Badge 1 (In-House Team) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={vp} transition={{ delay: 0.35 }}
                className="absolute -bottom-6 right-6 sm:right-10 bg-white dark:bg-[#101828] p-4 px-6
                  rounded-2xl border border-[var(--border)] dark:border-slate-800 shadow-2xl flex items-center gap-4 animate-gentle-float">
                <div className="mercury-line-art-badge">
                  <Users className="w-6 h-6 text-[var(--brand)]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[var(--ink)] dark:text-white">
                    {t.about.badgeTitle}
                  </h4>
                  <p className="text-xs text-[var(--muted)] dark:text-slate-400">
                    {t.about.badgeSub}
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge 2 (99.9% Uptime Guarantee) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={vp} transition={{ delay: 0.45 }}
                className="absolute -top-6 left-6 sm:left-10 bg-white dark:bg-[#101828] p-3.5 px-5
                  rounded-2xl border border-[var(--border)] dark:border-slate-800 shadow-2xl flex items-center gap-3.5 animate-gentle-float"
                style={{ animationDelay: "2s" }}>
                <div className="mercury-line-art-badge w-10 h-10">
                  <ShieldCheck className="w-5 h-5 text-[var(--brand)]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[var(--ink)] dark:text-white">
                    {isRTL ? "ضمان استقرار ٩٩.٩٪" : "99.9% Uptime SLA"}
                  </h4>
                  <p className="text-[11px] text-[var(--muted)] dark:text-slate-400">
                    {isRTL ? "دعم وتحديثات مستمرة" : "SLA & Active Support"}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div initial="hidden" whileInView="visible" viewport={vp}
              variants={STAGGER} className="lg:col-span-6">
              <motion.span variants={FI_UP} className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] block mb-3">
                {t.about.eyebrow}
              </motion.span>
              <motion.h2 variants={FI_UP} className="mercury-h2 text-3xl sm:text-4xl md:text-5xl
                text-[var(--ink)] dark:text-white mb-2">
                {t.about.title}
              </motion.h2>
              <motion.h2 variants={FI_UP} className="mercury-h2 text-3xl sm:text-4xl md:text-5xl
                text-[var(--brand)] mb-6">
                {t.about.titleAccent}
              </motion.h2>

              <motion.p variants={FI_UP} className="text-[var(--muted)] dark:text-slate-300 text-base lg:text-lg leading-relaxed mb-4">
                {t.about.p1}
              </motion.p>
              <motion.p variants={FI_UP} className="text-[var(--muted)] dark:text-slate-300 text-base lg:text-lg leading-relaxed mb-10">
                {t.about.p2}
              </motion.p>

              <div className="space-y-4">
                {t.about.highlights.map((hl, idx) => (
                  <motion.div key={idx} variants={FI_UP}
                    className="flex gap-4 p-5 rounded-2xl bg-[var(--bg)] dark:bg-slate-900
                      border border-[var(--border)] dark:border-slate-800 hover:border-[var(--brand)]/50 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-[var(--soft)] text-[var(--brand)] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[var(--ink)] dark:text-white mb-1">{hl[0]}</h4>
                      <p className="text-xs sm:text-sm text-[var(--muted)] dark:text-slate-400 leading-normal">{hl[1]}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" className="py-28 lg:py-40 bg-[var(--bg)] dark:bg-[#101828] tech-grid-pattern relative overflow-hidden">
        {/* Ambient accent glow with GPU-composited radial gradient */}
        {shouldReduceMotion ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full pointer-events-none -z-10"
            style={{ background: "radial-gradient(ellipse at center, rgba(var(--brand-rgb), 0.12) 0%, rgba(var(--brand-rgb), 0.02) 55%, transparent 70%)" }} />
        ) : (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full pointer-events-none -z-10"
            style={{ background: "radial-gradient(ellipse at center, rgba(var(--brand-rgb), 0.12) 0%, rgba(var(--brand-rgb), 0.02) 55%, transparent 70%)", willChange: "transform", transform: "translateZ(0)" }}
            animate={{ x: [0, -30, 20, 0], y: [0, 20, -12, 0], scale: [1, 0.96, 1.04, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] block mb-3">
              {t.servicesSection.eyebrow}
            </span>
            <h2 className="mercury-h2 text-3xl sm:text-5xl text-[var(--ink)] dark:text-white mb-4">
              {t.servicesSection.title}
            </h2>
            <p className="text-[var(--muted)] dark:text-slate-300 text-base sm:text-lg">
              {t.servicesSection.desc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {t.services.map((srv, idx) => {
              const Icon = SERVICE_ICONS[srv.key] || Code2;
              const img  = SERVICE_IMAGES[srv.key];
              return (
                <SpotlightCard key={srv.key}
                  initial={{ opacity: 0, y: 50, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.6, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Mockup Preview Area */}
                    <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6">
                      <img src={img} alt={srv.title} loading="lazy" decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-[#101828]/45 to-transparent" />
                      
                      {/* Number Pill */}
                      <span className="absolute top-4 right-4 bg-[#101828]/90 text-white font-heading font-black text-sm
                        px-3.5 py-1 rounded-lg border border-[var(--brand)]/40 shadow-lg">
                        {srv.label}
                      </span>

                      {/* Ready Badge */}
                      <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[#101828]/85 backdrop-blur-md
                        text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/15 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-[var(--brand)] animate-pulse" />
                        {isRTL ? "متاح للتنفيذ" : "Ready to Deploy"}
                      </span>

                      {/* Title Header */}
                      <div className="absolute bottom-4 right-4 left-4 text-white">
                        <div className="flex items-center gap-3">
                          <div className="mercury-line-art-badge w-11 h-11 shrink-0">
                            <Icon className="w-5 h-5 text-[var(--brand)]" />
                          </div>
                          <div>
                            <h3 className="font-heading font-black text-xl sm:text-2xl">{srv.title}</h3>
                            <span className="text-xs text-slate-200 font-medium">{srv.sub}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[var(--muted)] dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {srv.desc}
                    </p>

                    {/* Feature Preview Box (Enlarged Card Feature) */}
                    <div className="space-y-2.5 mb-6 bg-[var(--bg)] dark:bg-slate-900/80 p-5 rounded-2xl border border-[var(--border)] dark:border-slate-800">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] dark:text-slate-400 block mb-1">
                        {isRTL ? "أبرز مخرجات النظام:" : "Key System Capabilities:"}
                      </span>
                      {srv.deliverables.slice(0, 3).map((item, di) => (
                        <div key={di} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--ink)] dark:text-slate-200">
                          <div className="w-4 h-4 rounded-full bg-[var(--soft)] text-[var(--brand)] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {srv.tags.map((tag, ti) => (
                        <span key={ti}
                          className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--soft)] text-[var(--ink)]
                            border border-[var(--brand)]/20 group-hover:bg-[var(--brand)] group-hover:text-white transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="pt-6 border-t border-[var(--border)] dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="block text-[11px] text-[var(--muted)] dark:text-slate-400 uppercase font-bold">
                        {t.servicesSection.from}
                      </span>
                      <strong className="font-heading font-black text-xl sm:text-2xl text-[var(--ink)] dark:text-white">
                        {srv.priceFrom}
                      </strong>
                    </div>
                    <button onClick={() => setActiveService(srv)}
                      className="px-6 py-3 rounded-full font-heading font-bold text-xs sm:text-sm
                        mercury-pill-btn mercury-pill-btn-primary flex items-center gap-2 shadow-md focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                      {t.servicesSection.learnMore}
                      {isRTL ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICE MODAL */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              className="fixed inset-0 bg-[#101828]/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-modal rounded-3xl p-6 sm:p-8 max-w-2xl w-full
                border border-[var(--border)] dark:border-slate-800 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setActiveService(null)}
                className="absolute top-6 left-6 p-2.5 rounded-full bg-slate-100 dark:bg-slate-800
                  hover:bg-[var(--brand)] hover:text-white transition-colors text-[var(--ink)] dark:text-slate-300 focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                aria-label="Close modal">
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold text-[var(--brand)] uppercase tracking-wider block mb-1">
                  {activeService.sub}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[var(--ink)] dark:text-white">
                  {activeService.title}
                </h3>
              </div>

              <p className="text-[var(--muted)] dark:text-slate-300 text-sm leading-relaxed mb-6">
                {activeService.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-[var(--soft)]/60 dark:bg-slate-900
                  border border-[var(--brand)]/30 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[var(--brand)]" />
                  <div>
                    <span className="block text-xs font-semibold text-[var(--muted)] dark:text-slate-400">
                      {t.serviceDetailModal.timelineLabel}
                    </span>
                    <strong className="text-sm font-bold text-[var(--ink)] dark:text-white">
                      {activeService.timeline}
                    </strong>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--bg)] dark:bg-slate-900
                  border border-[var(--border)] dark:border-slate-800 flex items-center gap-3">
                  <Wrench className="w-6 h-6 text-[var(--brand)]" />
                  <div>
                    <span className="block text-xs font-semibold text-[var(--muted)] dark:text-slate-400">
                      {t.serviceDetailModal.toolsLabel}
                    </span>
                    <strong className="text-xs font-bold text-[var(--ink)] dark:text-white block max-w-[180px] truncate">
                      {activeService.tools.join(", ")}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Deliverables Section */}
              <h4 className="font-heading font-bold text-base text-[var(--ink)] dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--brand)]" />
                {t.serviceDetailModal.deliverablesLabel}
              </h4>
              <div className="space-y-3 mb-8">
                {activeService.deliverables.map((item, di) => (
                  <div key={di} className="flex items-start gap-3 text-sm text-[var(--ink)] dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-[var(--soft)] text-[var(--brand)]
                      flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* Task 2: Real Product Screenshot Gallery (Only when activeService.screenshots exists) */}
              {activeService.screenshots && activeService.screenshots.length > 0 && (
                <div className="mb-8 pt-4 border-t border-[var(--border)] dark:border-slate-800">
                  <h4 className="font-heading font-bold text-base text-[var(--ink)] dark:text-white mb-4 flex items-center gap-2">
                    <MonitorCheck className="w-5 h-5 text-[var(--brand)]" />
                    {t.serviceDetailModal.screenshotsLabel}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {activeService.screenshots.map((shot, sIdx) => {
                      const label = lang === "ar" ? shot.labelAr : shot.labelEn;
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setActiveScreenshotIdx(sIdx)}
                          className="group relative aspect-video rounded-2xl overflow-hidden border border-[var(--border)]
                            dark:border-slate-800 bg-slate-900 focus-visible:ring-2 focus-visible:ring-[var(--brand)]
                            focus-visible:ring-offset-2 outline-none text-left cursor-pointer"
                        >
                          <img
                            src={shot.src}
                            alt={label}
                            className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300"
                          />
                          <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2 bg-gradient-to-t from-black/85 via-black/55 to-transparent">
                            <p className="text-[10px] sm:text-[11px] font-semibold text-white truncate text-center">
                              {label}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Task A: Clinic Pricing Sheet & Packages */}
              {activeService.pricingPlans && (
                <div className="mb-8 pt-6 border-t border-[var(--border)] dark:border-slate-800">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[var(--ink)] dark:text-white mb-5 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[var(--brand)]" />
                    {t.serviceDetailModal.pricingLabel || (lang === "ar" ? "الباقات والأسعار المعتمدة" : "Official Plans & Pricing")}
                  </h4>

                  {/* Base Plans: 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {activeService.pricingPlans.basePlans.map((plan, pIdx) => {
                      const price = lang === "ar" ? plan.priceAr : plan.priceEn;
                      const subtitle = lang === "ar" ? plan.subtitleAr : plan.subtitleEn;
                      const badge = lang === "ar" ? plan.badgeAr : plan.badgeEn;
                      const features = lang === "ar" ? plan.featuresAr : plan.featuresEn;

                      return (
                        <div
                          key={pIdx}
                          className={`relative p-5 sm:p-6 rounded-2xl flex flex-col justify-between transition-all ${
                            plan.featured
                              ? "bg-[var(--soft)]/40 dark:bg-slate-900 border-2 border-[var(--brand)] shadow-md"
                              : "bg-[var(--bg)] dark:bg-slate-900/60 border border-[var(--border)] dark:border-slate-800"
                          }`}
                        >
                          {plan.featured && badge && (
                            <span className="absolute top-3 end-3 bg-[var(--brand)] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                              ★ {badge}
                            </span>
                          )}

                          <div>
                            <h5 className="font-heading font-black text-lg sm:text-xl text-[var(--ink)] dark:text-white mb-1">
                              {plan.name}
                            </h5>
                            <p className="text-xs text-[var(--muted)] dark:text-slate-400 font-medium mb-3">
                              {subtitle}
                            </p>
                            <div className="font-heading font-black text-xl sm:text-2xl text-[var(--brand)] mb-5">
                              {price}
                            </div>

                            <div className="space-y-2.5 mb-2">
                              {features.map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[var(--ink)] dark:text-slate-300">
                                  <div className="w-4 h-4 rounded-full bg-[var(--soft)] text-[var(--brand)] flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  </div>
                                  <span className="leading-snug">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dental Pro Suite (Upsell Bundle) */}
                  <div className="mb-6">
                    <h5 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-[var(--muted)] dark:text-slate-400 mb-3">
                      {t.serviceDetailModal.dentalProLabel || (lang === "ar" ? "باقات عيادات الأسنان (Dental Pro Suite)" : "Dental Clinic Packages (Dental Pro Suite)")}
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeService.pricingPlans.dentalPlans.map((dPlan, dIdx) => {
                        const price = lang === "ar" ? dPlan.priceAr : dPlan.priceEn;
                        const desc = lang === "ar" ? dPlan.descAr : dPlan.descEn;
                        const note = lang === "ar" ? dPlan.noteAr : dPlan.noteEn;

                        return (
                          <div
                            key={dIdx}
                            className="p-4 rounded-xl bg-[var(--bg)] dark:bg-slate-900/60 border border-[var(--border)] dark:border-slate-800"
                          >
                            <div className="flex items-baseline justify-between gap-2 mb-1.5">
                              <strong className="font-heading font-bold text-sm text-[var(--ink)] dark:text-white">
                                {dPlan.name}
                              </strong>
                              <span className="font-heading font-black text-sm text-[var(--brand)] whitespace-nowrap">
                                {price}
                              </span>
                            </div>
                            <p className="text-[11px] text-[var(--ink)] dark:text-slate-300 leading-relaxed mb-1.5">
                              {desc}
                            </p>
                            <p className="text-[10px] text-[var(--muted)] dark:text-slate-400 font-semibold italic">
                              {note}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add-ons List */}
                  <div className="mb-4">
                    <h5 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-[var(--muted)] dark:text-slate-400 mb-3">
                      {t.serviceDetailModal.addonsLabel || (lang === "ar" ? "الإضافات التخصصية الاختيارية (Add-ons)" : "Optional Specialized Add-ons")}
                    </h5>
                    <div className="rounded-xl border border-[var(--border)] dark:border-slate-800 bg-[var(--bg)] dark:bg-slate-900/50 overflow-hidden divide-y divide-[var(--border)] dark:divide-slate-800">
                      {activeService.pricingPlans.addons.map((addon, aIdx) => {
                        const name = lang === "ar" ? addon.nameAr : addon.nameEn;
                        const price = lang === "ar" ? addon.priceAr : addon.priceEn;

                        return (
                          <div
                            key={aIdx}
                            className="p-3 sm:px-4 flex items-center justify-between gap-3 text-xs"
                          >
                            <span className="font-medium text-[var(--ink)] dark:text-slate-300">
                              {name}
                            </span>
                            <strong className="font-heading font-bold text-[var(--brand)] text-end shrink-0">
                              {price}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Note */}
                  <p className="text-[11px] text-[var(--muted)] dark:text-slate-400 italic leading-relaxed text-center px-2">
                    {lang === "ar" ? activeService.pricingPlans.footerNoteAr : activeService.pricingPlans.footerNoteEn}
                  </p>
                </div>
              )}

              {/* Bottom CTA Row */}
              <div className="flex gap-3 pt-4 border-t border-[var(--border)] dark:border-slate-800">
                <a href="#contact"
                  onClick={() => { setFormState(p => ({ ...p, service: activeService.title })); setActiveService(null); }}
                  className="flex-1 text-center py-3.5 rounded-full font-heading font-bold text-sm
                    text-white brand-green-gradient shadow-md focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                  {t.serviceDetailModal.cta}
                </a>
                <button onClick={() => setActiveService(null)}
                  className="px-6 py-3.5 rounded-full text-sm font-bold border border-[var(--border)]
                    dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                    text-[var(--ink)] dark:text-white focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                  {t.serviceDetailModal.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LIGHTBOX (FOR PRODUCT SYSTEM SCREENSHOTS) ────────────────────── */}
      <AnimatePresence>
        {activeScreenshotIdx !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveScreenshotIdx(null)}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 max-w-5xl w-full flex flex-col items-center"
            >
              {/* Top Controls Bar */}
              <div className="w-full flex items-center justify-between pb-3 text-white px-2">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-sm sm:text-base text-white drop-shadow">
                    {lang === "ar"
                      ? activeScreenshots[activeScreenshotIdx]?.labelAr
                      : activeScreenshots[activeScreenshotIdx]?.labelEn}
                  </span>
                  <span className="text-xs text-slate-400 bg-white/10 px-2.5 py-0.5 rounded-full font-mono">
                    {activeScreenshotIdx + 1} / {activeScreenshots.length}
                  </span>
                </div>

                <button
                  onClick={() => setActiveScreenshotIdx(null)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                  title="Close (Esc)"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Viewport */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-white/10 shadow-2xl flex items-center justify-center p-2 sm:p-4">
                <img
                  src={activeScreenshots[activeScreenshotIdx]?.src}
                  alt={lang === "ar" ? activeScreenshots[activeScreenshotIdx]?.labelAr : activeScreenshots[activeScreenshotIdx]?.labelEn}
                  className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-lg"
                />

                {/* Prev/Next Navigation Controls */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveScreenshotIdx(prev => {
                      if (prev === null) return 0;
                      const total = activeScreenshots.length;
                      return isRTL ? (prev === total - 1 ? 0 : prev + 1) : (prev === 0 ? total - 1 : prev - 1);
                    });
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/15 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                  title="Previous screenshot"
                  aria-label="Previous screenshot"
                >
                  {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveScreenshotIdx(prev => {
                      if (prev === null) return 0;
                      const total = activeScreenshots.length;
                      return isRTL ? (prev === 0 ? total - 1 : prev - 1) : (prev === total - 1 ? 0 : prev + 1);
                    });
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/15 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                  title="Next screenshot"
                  aria-label="Next screenshot"
                >
                  {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex items-center gap-2 mt-4 overflow-x-auto max-w-full py-1 px-2">
                {activeScreenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveScreenshotIdx(idx)}
                    className={`relative w-16 sm:w-20 aspect-video rounded-md overflow-hidden border transition-all shrink-0 ${
                      activeScreenshotIdx === idx
                        ? "border-[var(--brand)] ring-2 ring-[var(--brand)] scale-105"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={shot.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── PROCESS (DARK SECTION) ─────────────────────────────────────────── */}
      <section id="process" className="py-28 lg:py-40 bg-[#101828] text-white relative overflow-hidden tech-grid-pattern">
        {shouldReduceMotion ? (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(var(--brand-rgb), 0.14) 0%, rgba(var(--brand-rgb), 0.03) 50%, transparent 70%)" }} />
        ) : (
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(var(--brand-rgb), 0.14) 0%, rgba(var(--brand-rgb), 0.03) 50%, transparent 70%)", willChange: "transform", transform: "translateZ(0)" }}
            animate={{ x: [0, 25, -18, 0], y: [0, -12, 16, 0], scale: [1, 1.04, 0.98, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] block mb-3">
              {t.processSection.eyebrow}
            </span>
            <h2 className="mercury-h2 text-3xl sm:text-5xl text-white mb-4">{t.processSection.title}</h2>
            <p className="text-slate-300 text-base sm:text-lg">{t.processSection.desc}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.process.map((step, idx) => {
              const Icon = PROCESS_ICONS[idx];
              return (
                <SpotlightCard key={idx}
                  initial={{ opacity: 0, y: 50, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.6, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-slate-900/95 p-8 sm:p-10 flex flex-col justify-between border-slate-800 hover:border-[var(--brand)]">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="mercury-line-art-badge w-12 h-12">
                        <Icon className="w-6 h-6 text-[var(--brand)]" />
                      </div>
                      <span className="font-heading font-black text-3xl text-slate-600
                        group-hover:text-[var(--brand)] transition-colors dir-ltr">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3">{step.t}</h3>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{step.d}</p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────────────────── */}
      <section id="work" className="py-28 lg:py-40 bg-[var(--bg)] dark:bg-[#101828] tech-grid-pattern relative overflow-hidden">
        {/* Ambient accent glow with GPU-composited radial gradient */}
        {shouldReduceMotion ? (
          <div className="absolute top-1/2 right-10 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
            style={{ background: "radial-gradient(circle, rgba(var(--brand-rgb), 0.12) 0%, rgba(var(--brand-rgb), 0.02) 55%, transparent 70%)" }} />
        ) : (
          <motion.div
            className="absolute top-1/2 right-10 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
            style={{ background: "radial-gradient(circle, rgba(var(--brand-rgb), 0.12) 0%, rgba(var(--brand-rgb), 0.02) 55%, transparent 70%)", willChange: "transform", transform: "translateZ(0)" }}
            animate={{ x: [0, -20, 24, 0], y: [0, 24, -16, 0], scale: [1, 1.05, 0.96, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] block mb-3">
              {t.workSection.eyebrow}
            </span>
            <h2 className="mercury-h2 text-3xl sm:text-5xl text-[var(--ink)] dark:text-white mb-4">
              {t.workSection.title}
            </h2>
            <p className="text-[var(--muted)] dark:text-slate-300 text-base sm:text-lg">{t.workSection.desc}</p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {Object.entries(t.workSection.filters).map(([key, label]) => {
              const active = filter === key;
              return (
                <motion.button key={key} onClick={() => setFilter(key)}
                  layout
                  className={`relative px-7 py-3 rounded-full text-xs sm:text-sm font-heading font-bold transition-all focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
                    active
                      ? "bg-[var(--brand)] text-white shadow-md scale-105"
                      : "bg-white dark:bg-slate-900 border border-[var(--border)] dark:border-slate-800 text-[var(--ink)] dark:text-slate-300 hover:border-[var(--brand)]"
                  }`}>
                  {label}
                  {active && (
                    <motion.div layoutId="filterUnderline"
                      className="absolute -bottom-1 left-4 right-4 h-0.5 bg-white rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredPortfolio.map((item) => {
                const imgUrl = item.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop";
                return (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="h-full"
                  >
                    <SpotlightCard
                      onClick={() => setActiveCase(item)}
                      className="cursor-pointer p-8 sm:p-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Image Frame */}
                      <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6">
                        <img src={imgUrl} alt={item.title} loading="lazy" decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/90 via-[#101828]/35 to-transparent" />
                        
                        {/* Year Badge */}
                        <span className="absolute top-4 right-4 bg-[#101828]/90 text-white font-bold text-xs
                          px-3 py-1 rounded-full border border-[var(--brand)]/40 shadow-md">
                          {item.year}
                        </span>

                        {/* Category Tag */}
                        <span className="absolute top-4 left-4 bg-[var(--brand)] text-white font-bold text-[11px]
                          px-3 py-1 rounded-full shadow-md">
                          {t.workSection.filters[item.key] || item.key}
                        </span>

                        <div className="absolute bottom-4 right-4 left-4 text-white">
                          <span className="text-xs text-[var(--brand)] font-bold block mb-1">{item.client}</span>
                          <h3 className="font-heading font-black text-xl leading-snug">{item.title}</h3>
                        </div>
                      </div>

                      <p className="text-xs text-[var(--muted)] dark:text-slate-400 font-semibold mb-2">{item.sub}</p>
                      <p className="text-[var(--muted)] dark:text-slate-300 text-sm line-clamp-2 leading-relaxed mb-6">
                        {item.challenge}
                      </p>

                      {/* Verified Result Highlight Box */}
                      <div className="p-4 rounded-2xl bg-[var(--soft)]/80 dark:bg-slate-900/90 border border-[var(--brand)]/30 mb-6 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--brand)] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] dark:text-[var(--brand)]">
                            {isRTL ? "الأثر والنتيجة المحققة:" : "Verified Impact:"}
                          </span>
                          <strong className="text-xs sm:text-sm font-bold text-[var(--ink)] dark:text-slate-200 block leading-snug">
                            {item.results}
                          </strong>
                        </div>
                      </div>

                      {/* Deliverables Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.deliverables.map((deliv, di) => (
                          <span key={di} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--bg)] dark:bg-slate-800 text-[var(--muted)] dark:text-slate-300 border border-[var(--border)] dark:border-slate-700">
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[var(--brand)] pt-4 border-t border-[var(--border)] dark:border-slate-800">
                      <span className="group-hover:underline">{t.workSection.viewCase}</span>
                      <div className="w-8 h-8 rounded-full bg-[var(--soft)] text-[var(--brand)] flex items-center justify-center group-hover:bg-[var(--brand)] group-hover:text-white transition-colors">
                        {isRTL ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDY MODAL */}
      <AnimatePresence>
        {activeCase && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveCase(null)}
              className="fixed inset-0 bg-[#101828]/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-modal rounded-3xl p-8 max-w-2xl w-full
                border border-[var(--border)] dark:border-slate-800 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setActiveCase(null)}
                className="absolute top-6 left-6 p-2.5 rounded-full bg-slate-100 dark:bg-slate-800
                  hover:bg-[var(--brand)] hover:text-white transition-colors text-[var(--ink)] dark:text-slate-300 focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                aria-label="Close modal">
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 text-xs font-bold text-[var(--brand)] mb-2">
                  <span>{activeCase.client}</span><span>•</span><span>{activeCase.year}</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[var(--ink)] dark:text-white">
                  {activeCase.title}
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-heading font-bold text-sm text-red-600 dark:text-red-400 mb-1">
                    {t.caseStudyModal.challengeLabel}
                  </h4>
                  <p className="text-[var(--ink)] dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {activeCase.challenge}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--soft)] dark:bg-slate-900 border border-[var(--brand)]/30">
                  <h4 className="font-heading font-bold text-sm text-[var(--brand)] mb-1">
                    {t.caseStudyModal.solutionLabel}
                  </h4>
                  <p className="text-[var(--ink)] dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {activeCase.solution}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-heading font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-1">
                    {t.caseStudyModal.resultsLabel}
                  </h4>
                  <p className="text-[var(--ink)] dark:text-slate-300 text-xs sm:text-sm font-bold">
                    {activeCase.results}
                  </p>
                </div>
              </div>

              <h4 className="font-heading font-bold text-sm text-[var(--ink)] dark:text-white mb-3">
                {t.caseStudyModal.deliverablesLabel}
              </h4>
              <div className="space-y-2 mb-8">
                {activeCase.deliverables.map((item, di) => (
                  <div key={di} className="flex items-center gap-2 text-xs sm:text-sm text-[var(--ink)] dark:text-slate-300">
                    <Check className="w-4 h-4 text-[var(--brand)]" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[var(--border)] dark:border-slate-800">
                <a href="#contact" onClick={() => setActiveCase(null)}
                  className="block w-full text-center py-3.5 rounded-full font-heading font-bold
                    text-sm text-white brand-green-gradient shadow-md focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                  {t.caseStudyModal.cta}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── STATS (Big Numbers) ────────────────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-slate-950
        border-y border-[var(--border)] dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={STAGGER}
            className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, i) => (
              <motion.div key={i} variants={FI_UP}>
                <StatCard n={stat.n} l={stat.l} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-28 lg:py-40 bg-[var(--bg)] dark:bg-[#101828]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] block mb-3">
              {t.testimonialsSection.eyebrow}
            </span>
            <h2 className="mercury-h2 text-3xl sm:text-5xl text-[var(--ink)] dark:text-white">
              {t.testimonialsSection.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.map((item, idx) => {
              const avatar = TESTIMONIAL_AVATARS[idx];
              const fromRight = idx % 2 === 0;
              return (
                <SpotlightCard key={idx}
                  initial={{ opacity: 0, x: fromRight ? (isRTL ? 60 : -60) : (isRTL ? -60 : 60) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.65, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="secondary-card p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-6 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-[var(--ink)] dark:text-slate-300 text-sm lg:text-base leading-relaxed italic mb-8">
                      "{item.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-[var(--border)] dark:border-slate-800">
                    <img src={avatar} alt={item.name} loading="lazy" decoding="async"
                      className="avatar-img w-12 h-12 rounded-full object-cover border-2 border-[var(--brand)] shadow-md" />
                    <div>
                      <h4 className="font-heading font-bold text-base text-[var(--ink)] dark:text-white">{item.name}</h4>
                      <p className="text-xs text-[var(--muted)] dark:text-slate-400 font-medium">{item.role}</p>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-28 lg:py-40 bg-white dark:bg-slate-950
        border-t border-[var(--border)] dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] block mb-3">
              {t.faqSection.eyebrow}
            </span>
            <h2 className="mercury-h2 text-3xl sm:text-5xl text-[var(--ink)] dark:text-white mb-6">
              {t.faqSection.title}
            </h2>
            <div className="relative">
              <input type="text" value={faqQuery} onChange={e => setFaqQuery(e.target.value)}
                placeholder={t.faqSearch.placeholder}
                className="w-full px-6 py-4 pl-12 rounded-full bg-[var(--bg)] dark:bg-slate-900
                  border border-[var(--border)] dark:border-slate-800 focus:border-[var(--brand)] focus:outline-none
                  text-sm text-[var(--ink)] dark:text-white placeholder-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]" />
              <Search className="w-5 h-5 text-[var(--brand)] absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none" />
            </div>
          </motion.div>

          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <p className="text-center text-[var(--muted)] text-sm py-8">{t.faqSearch.noResults}</p>
            ) : filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div key={idx}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp} transition={{ delay: idx * 0.07 }}
                  className="secondary-card mercury-card overflow-hidden">
                  <button onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-right flex items-center justify-between gap-4
                      font-heading font-bold text-base sm:text-lg text-[var(--ink)] dark:text-white
                      hover:text-[var(--brand)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                    <span>{faq.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }}
                      className="w-8 h-8 rounded-full bg-[var(--soft)] text-[var(--brand)]
                        flex items-center justify-center shrink-0">
                      <Plus className="w-5 h-5" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 text-sm sm:text-base text-[var(--muted)] dark:text-slate-300
                          leading-relaxed border-t border-[var(--border)] dark:border-slate-800 pt-4">
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT (DARK SECTION) ─────────────────────────────────────────── */}
      <section id="contact" className="py-28 lg:py-40 bg-[#101828] text-white relative overflow-hidden">
        {shouldReduceMotion ? (
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(var(--brand-rgb), 0.14) 0%, rgba(var(--brand-rgb), 0.03) 50%, transparent 70%)" }} />
        ) : (
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(var(--brand-rgb), 0.14) 0%, rgba(var(--brand-rgb), 0.03) 50%, transparent 70%)", willChange: "transform", transform: "translateZ(0)" }}
            animate={{ x: [0, -25, 18, 0], y: [0, 20, -12, 0], scale: [1, 1.05, 0.98, 1] }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={vp} className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] block mb-3">
                {t.contact.eyebrow}
              </span>
              <h2 className="mercury-h2 text-3xl sm:text-5xl text-white mb-6">{t.contact.title}</h2>
              <p className="text-slate-300 text-base leading-relaxed mb-10">{t.contact.desc}</p>

              <div className="space-y-4">
                <button onClick={handleCopyEmail}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10
                    hover:border-[var(--brand)] transition-colors w-full text-right group focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                  <Mail className="w-5 h-5 text-[var(--brand)]" />
                  <span className="text-sm font-semibold text-slate-200 flex-1">{EMAIL}</span>
                  <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </button>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="w-5 h-5 text-[var(--brand)]" />
                  <span className="text-sm font-semibold text-slate-200">{t.contact.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={vp} transition={{ delay: 0.2 }} className="lg:col-span-7">
              <div className="bg-[#101828] rounded-3xl p-8 sm:p-12 border border-[var(--brand)]/25 shadow-2xl">
                {formSent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12">
                    <div className="w-16 h-16 rounded-full brand-green-gradient flex items-center
                      justify-center mx-auto mb-4 text-white shadow-xl">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-black text-2xl text-white mb-2">{t.contact.sent}</h3>
                    <button onClick={() => setFormSent(false)}
                      className="mt-6 px-6 py-2.5 rounded-full text-xs font-bold bg-white/10
                        hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                      {t.contact.sendAnother}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {[
                      { key: "name",    label: t.contact.namePh,    type: "text",     ph: t.contact.namePh },
                      { key: "contact", label: t.contact.contactPh, type: "text",     ph: t.contact.contactPh },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                          {f.label}
                        </label>
                        <input type={f.type} required value={formState[f.key]}
                          onChange={e => setFormState(p => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.ph}
                          className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-slate-700
                            text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]" />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        {t.contact.servicePh}
                      </label>
                      <select value={formState.service}
                        onChange={e => setFormState(p => ({ ...p, service: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#101828] border border-slate-700
                          text-white text-sm focus:outline-none focus:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                        <option value="">{t.contact.selectPlaceholder}</option>
                        {t.contact.serviceOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        {t.contact.detailsPh}
                      </label>
                      <textarea rows={4} value={formState.details}
                        onChange={e => setFormState(p => ({ ...p, details: e.target.value }))}
                        placeholder={t.contact.detailsPh}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-slate-700
                          text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]" />
                    </div>

                    <button type="submit" disabled={submitting}
                      className="w-full py-4 rounded-full font-heading font-black text-base text-white
                        brand-green-gradient cta-pulse-btn hover:opacity-95 transition-opacity
                        flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--brand)]">
                      {submitting ? t.contact.sending : (
                        <>
                          {t.contact.submit}
                          {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#101828] text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-3 mb-4 focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-lg p-1 w-fit">
                <img src="/logo.svg" alt="Shaghal Logo" className="w-9 h-9 object-contain" />
                <span className="font-heading font-black text-xl text-white">
                  {lang === "ar" ? "شغال" : "Shaghal"}
                </span>
              </a>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">{t.footer.tagline}</p>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
                {t.footer.links}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {[["#hero", t.nav.home], ["#about", t.nav.about], ["#services", t.nav.services], ["#work", t.nav.work]].map(([href, label]) => (
                  <li key={href}><a href={href} className="hover:text-[var(--brand)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded">{label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
                {t.footer.contact}
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={handleCopyEmail} className="hover:text-[var(--brand)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded">
                    {EMAIL}
                  </button>
                </li>
                <li>{t.contact.location}</li>
                <li className="pt-2 flex items-center gap-3">
                  {t.contact.social.map((soc, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10
                      hover:border-[var(--brand)] text-slate-300 cursor-pointer">
                      {soc}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            {t.footer.rights}
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full brand-green-gradient
              text-white shadow-2xl hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
            title={t.float.top}
            aria-label="Back to top">
            <ArrowRight className="w-5 h-5 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
