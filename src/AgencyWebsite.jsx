import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Plus, Mail, MapPin, Copy, Sun, Moon, Menu, X,
  ChevronLeft, ChevronRight, Clock, Users, Images, WifiOff, Network, ShieldCheck,
  Headset, CheckCircle2, ScanBarcode, Stethoscope, Boxes,
} from "lucide-react";

import { EMAIL, PHONE, whatsappLink, SCREENSHOTS, COPY, FACEBOOK_URL, INSTAGRAM_URL } from "./i18n.js";

const EASE = [0.16, 1, 0.3, 1];
const SYSTEM_ICONS = { pos: ScanBarcode, clinic: Stethoscope, warehouse: Boxes };
const WHY_ICONS = { offline: WifiOff, branches: Network, security: ShieldCheck, support: Headset };

// ── Brand ────────────────────────────────────────────────────────────────────
// Horizontal lockup built from the original logo artwork: bars mark + wordmark.
function Lockup({ lang, className = "" }) {
  const isAr = lang === "ar";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src="/brand/shaghal-mark.svg" alt="" className="h-10 w-auto" draggable={false} />
      <img
        src={isAr ? "/brand/shaghal-word-ar.svg" : "/brand/shaghal-word-en.svg"}
        alt={isAr ? "شغال" : "Shaghal"}
        className={isAr ? "h-[22px] w-auto mt-1" : "h-[21px] w-auto mt-0.5"}
        draggable={false}
      />
    </span>
  );
}

// The logo's three rising bars, drawn as a scalable decorative graphic.
// Geometry mirrors the logo: equal-width pills, a dot above each, rising heights.
function BarsGraphic({ className = "", animate = true, id = "bars" }) {
  const reduce = useReducedMotion();
  const bars = [
    { x: 0,   h: 84,  delay: 0.15 },
    { x: 52,  h: 116, delay: 0.3 },
    { x: 104, h: 148, delay: 0.45 },
  ];
  const W = 40, R = 20, GAP = 12, TOP = 196;
  const run = animate && !reduce;
  return (
    <svg viewBox="0 -8 144 208" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8BC8E7" />
          <stop offset="1" stopColor="#257DB6" />
        </linearGradient>
      </defs>
      {bars.map((b, i) => (
        <g key={i}>
          <motion.rect
            x={b.x} width={W} rx={R} fill={`url(#${id}-g)`}
            initial={run ? { y: TOP, height: 0 } : false}
            animate={{ y: TOP - b.h, height: b.h }}
            transition={{ duration: 0.9, delay: b.delay, ease: EASE }}
          />
          <motion.circle
            cx={b.x + R} r={R} fill={`url(#${id}-g)`}
            initial={run ? { cy: TOP - R, opacity: 0 } : false}
            animate={{ cy: TOP - b.h - GAP - R, opacity: 1 }}
            transition={{ duration: 0.9, delay: b.delay + 0.1, ease: EASE }}
          />
        </g>
      ))}
    </svg>
  );
}

// ── Product screenshot. `fill` crops to the parent's box, top-aligned. ─────
function Shot({ shot, alt, className = "", eager = false, fill = true }) {
  return (
    <img
      src={shot.src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`block w-full ${fill ? "h-full object-cover object-top" : "h-auto"} ${className}`}
    />
  );
}

function BrowserFrame({ children, className = "" }) {
  return (
    <div className={`frame ${className}`}>
      <div className="frame-bar" dir="ltr"><i /><i /><i /></div>
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

function SectionHead({ eyebrow, title, desc, center = true }) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12 lg:mb-16`}>
      <span className="eyebrow mb-4">{eyebrow}</span>
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.25] text-[var(--ink)] text-balance">
        {title}
      </h2>
      {desc && <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">{desc}</p>}
    </Reveal>
  );
}

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
  </svg>
);

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AgencyWebsite() {
  // ?lang=en|ar wins (shareable links), then the saved choice, then Arabic.
  const [lang, setLang] = useState(() => {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "ar" || q === "en") return q;
    try { return localStorage.getItem("Aura_lang") || "en"; } catch { return "en"; }
  });
  // Saved choice, otherwise follow the OS setting.
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("Aura_theme");
      if (saved) return saved === "dark";
    } catch {}
    return false;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroTab, setHeroTab] = useState("pos");
  const [heroPaused, setHeroPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [gallery, setGallery] = useState(null); // { key, idx }
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: "", contact: "", system: "", details: "" });

  const t = COPY[lang] || COPY.ar;
  const isRTL = lang === "ar";
  const Fwd = isRTL ? ArrowLeft : ArrowRight;
  const reduce = useReducedMotion();

  // Language, direction, theme
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = t.dir;
    try { localStorage.setItem("Aura_lang", lang); } catch {}
    document.title = isRTL
      ? "شغال | Shaghal — أنظمة نقاط البيع والعيادات والمخازن"
      : "Shaghal — Custom POS, Clinic & Inventory Systems";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", isRTL
      ? "شغال (Shaghal) — شركة برمجيات بتبني أنظمة مخصصة لنقاط البيع POS وإدارة العيادات والمخازن والعهد. تعمل أونلاين وتكمّل أوفلاين، مع دعم ٢٤/٧."
      : "Shaghal builds custom POS, clinic management and inventory systems that run online, keep working offline, and come with 24/7 support.");
  }, [lang, t.dir, isRTL]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#08182A" : "#FFFFFF");
  }, [dark]);

  // Header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero tabs auto-advance until the visitor interacts
  useEffect(() => {
    if (heroPaused || reduce) return;
    const order = ["pos", "clinic", "warehouse"];
    const id = setInterval(() => {
      setHeroTab(k => order[(order.indexOf(k) + 1) % order.length]);
    }, 5000);
    return () => clearInterval(id);
  }, [heroPaused, reduce]);

  // Lock scroll under overlays
  useEffect(() => {
    document.body.style.overflow = menuOpen || gallery ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, gallery]);

  const shotsFor = key => SCREENSHOTS[key] || [];
  const step = useCallback((dir) => {
    setGallery(g => {
      if (!g) return g;
      const n = shotsFor(g.key).length;
      return { ...g, idx: (g.idx + dir + n) % n };
    });
  }, []);

  useEffect(() => {
    if (!gallery) return;
    const onKey = (e) => {
      if (e.key === "Escape") setGallery(null);
      // "Next" is visually to the left in RTL
      if (e.key === "ArrowRight") step(isRTL ? -1 : 1);
      if (e.key === "ArrowLeft") step(isRTL ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gallery, isRTL, step]);

  const toggleTheme = () => setDark(d => {
    try { localStorage.setItem("Aura_theme", d ? "light" : "dark"); } catch {}
    return !d;
  });

  const toastTimer = useRef(null);
  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); showToast(t.toast.emailCopied); } catch {}
  };

  const submit = (e) => {
    e.preventDefault();
    const c = t.contact;
    const lines = [
      c.waIntro,
      `${c.waName}: ${form.name}`,
      `${c.waContact}: ${form.contact}`,
      form.system && `${c.waSystem}: ${form.system}`,
      form.details && `${c.waDetails}: ${form.details}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const navItems = [
    ["#services", t.nav.systems], ["#why", t.nav.why], ["#process", t.nav.process],
    ["#faq", t.nav.faq], ["#contact", t.nav.contact],
  ];

  const heroShot = shotsFor(heroTab)[0];

  return (
    <div dir={t.dir} className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 border-b ${
          scrolled || menuOpen
            ? "bg-[var(--bg)]/85 backdrop-blur-xl border-[var(--line)] shadow-[0_6px_24px_-18px_rgba(21,61,104,.5)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container-x h-[72px] flex items-center justify-between gap-6">
          <a href="#top" aria-label={t.brandAlt} className="shrink-0 rounded-xl">
            <Lockup lang={lang} />
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navItems.map(([href, label]) => (
              <a key={href} href={href}
                className="px-3.5 py-2 rounded-full text-[15px] font-semibold text-[var(--ink-2)] hover:text-[var(--accent)] hover:bg-[var(--surface)] transition-colors">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <button onClick={() => setLang(isRTL ? "en" : "ar")}
              className="h-10 px-3.5 rounded-full text-sm font-bold text-[var(--ink-2)] hover:bg-[var(--surface)] transition-colors"
              aria-label="Switch language">
              {t.langSwitch}
            </button>
            <button onClick={toggleTheme}
              className="w-10 h-10 grid place-items-center rounded-full text-[var(--ink-2)] hover:bg-[var(--surface)] transition-colors"
              aria-label={dark ? t.themeLight : t.themeDark}>
              {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
            <a href="#contact" className="btn btn-primary btn-sm ms-1">{t.cta}</a>
          </div>

          <button onClick={() => setMenuOpen(o => !o)}
            className="lg:hidden w-11 h-11 grid place-items-center rounded-full border border-[var(--line)] bg-[var(--card)]"
            aria-label="Menu" aria-expanded={menuOpen}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="lg:hidden overflow-hidden border-t border-[var(--line)] bg-[var(--bg)]"
            >
              <div className="container-x py-4 flex flex-col">
                {navItems.map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between min-h-[52px] text-base font-semibold border-b border-[var(--line)]">
                    {label}
                    <Fwd className="w-4 h-4 text-[var(--muted)]" />
                  </a>
                ))}
                <div className="flex gap-2 pt-4">
                  <button onClick={() => setLang(isRTL ? "en" : "ar")} className="btn btn-ghost btn-sm flex-1">
                    {t.langSwitch}
                  </button>
                  <button onClick={toggleTheme} className="btn btn-ghost btn-sm flex-1">
                    {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {dark ? t.themeLight : t.themeDark}
                  </button>
                </div>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="btn btn-primary mt-3 w-full">
                  {t.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden -mt-[72px] pt-[72px]">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--grad-soft)" }} />
          <div className="absolute inset-0 -z-10 bg-dots mask-fade-b" />
          <div className="absolute -top-40 start-1/2 -z-10 w-[900px] h-[900px] rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(139,200,231,.35), transparent 60%)" }} />

          <div className="container-x pt-12 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Copy */}
            <div className="lg:col-span-5 text-center lg:text-start">
              <Reveal>
                <span className="chip bg-[var(--card)] shadow-[var(--shadow)]">
                  <span className="dot" />
                  {t.hero.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 font-display font-black text-[40px] leading-[1.2] sm:text-[52px] lg:text-[58px] lg:leading-[1.15] tracking-tight text-balance">
                  {t.hero.title}{" "}
                  <span className="text-grad">{t.hero.accent}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg leading-relaxed text-[var(--muted)] max-w-xl mx-auto lg:mx-0">
                  {t.hero.desc}
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a href="#contact" className="btn btn-primary">
                  {t.hero.primary}
                  <Fwd className="w-4 h-4" />
                </a>
                <a href="#services" className="btn btn-ghost">{t.hero.secondary}</a>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-sm font-semibold text-[var(--ink-2)]">
                  {t.hero.points.map(p => (
                    <li key={p} className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Product visual */}
            <div className="lg:col-span-7 relative">
              <Reveal delay={0.1} className="relative">
                {/* System tabs + the logo bars, side by side above the product frame */}
                <div className="mb-4 flex items-end justify-between gap-4">
                <div role="tablist" aria-label={t.nav.systems}
                  className="inline-flex p-1 rounded-full bg-[var(--card)] border border-[var(--line)] shadow-[var(--shadow)] max-w-full overflow-x-auto no-scrollbar">
                  {Object.entries(t.hero.tabs).map(([key, label]) => {
                    const Icon = SYSTEM_ICONS[key];
                    const active = heroTab === key;
                    return (
                      <button key={key} role="tab" aria-selected={active}
                        onClick={() => { setHeroTab(key); setHeroPaused(true); }}
                        className={`relative h-10 px-4 rounded-full text-sm font-bold inline-flex items-center gap-2 whitespace-nowrap transition-colors ${
                          active ? "text-white" : "text-[var(--ink-2)] hover:text-[var(--accent)]"
                        }`}>
                        {active && (
                          <motion.span layoutId="hero-tab" className="absolute inset-0 rounded-full"
                            style={{ background: "linear-gradient(100deg,#3A93C9,#257DB6 50%,#1B5E92)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                        )}
                        <Icon className="relative w-4 h-4" />
                        <span className="relative">{label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="hidden sm:flex items-end gap-2.5 shrink-0 pointer-events-none" aria-hidden="true">
                  <BarsGraphic id="hero-bars" className="h-20 lg:h-24 w-auto shrink-0 drop-shadow-[0_12px_20px_rgba(37,125,182,.25)]" />
                  <motion.img
                    src={isRTL ? "/brand/shaghal-word-ar.svg" : "/brand/shaghal-word-en.svg"}
                    alt="" draggable={false}
                    className="h-8 lg:h-9 w-auto max-w-none shrink-0 mb-0.5"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
                  />
                </div>
                </div>

                <BrowserFrame className="relative z-10">
                  <div className="relative aspect-[1024/466] overflow-hidden">
                    <AnimatePresence initial={false}>
                      <motion.div key={heroTab}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0">
                        <Shot shot={heroShot} alt={isRTL ? heroShot.ar : heroShot.en} eager />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </BrowserFrame>

                {/* Floating facts */}
                <div className="hidden sm:flex absolute z-20 -bottom-6 start-6 card !rounded-2xl px-4 py-3 items-center gap-3">
                  <span className="w-9 h-9 rounded-xl grid place-items-center bg-[var(--surface-2)] text-[var(--accent)]">
                    <WifiOff className="w-[18px] h-[18px]" />
                  </span>
                  <span className="text-sm font-bold leading-tight">
                    {t.why.items[0].t}
                    <span className="block text-xs font-semibold text-[var(--muted)]">{t.hero.points[1]}</span>
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SECTORS ──────────────────────────────────────────────────── */}
        <section className="border-y border-[var(--line)] bg-[var(--bg)]">
          <div className="container-x py-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="text-sm font-bold text-[var(--muted)] shrink-0">{t.sectors.title}</span>
            <ul className="flex flex-wrap justify-center md:justify-start gap-2">
              {t.sectors.items.map(s => (
                <li key={s} className="chip"><span className="dot" />{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── SYSTEMS ──────────────────────────────────────────────────── */}
        <section id="services" className="section">
          <div className="container-x">
            <SectionHead eyebrow={t.systemsSection.eyebrow} title={t.systemsSection.title} desc={t.systemsSection.desc} />

            <div className="space-y-20 lg:space-y-28">
              {t.systems.map((sys, i) => {
                const Icon = SYSTEM_ICONS[sys.key];
                const shots = shotsFor(sys.key);
                const flip = i % 2 === 1;
                return (
                  <article key={sys.key} id={sys.key} className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Visual */}
                    <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                      <button type="button" onClick={() => setGallery({ key: sys.key, idx: 0 })}
                        className="group block w-full text-start rounded-[20px]"
                        aria-label={`${sys.title} — ${t.systemsSection.viewScreens}`}>
                        <div className="relative rounded-[28px] p-3 sm:p-5" style={{ background: "var(--grad-soft)" }}>
                          <BrowserFrame className="transition-transform duration-500 group-hover:-translate-y-1">
                            <div className="aspect-[1024/466] overflow-hidden">
                              <Shot shot={shots[0]} alt={isRTL ? shots[0].ar : shots[0].en} />
                            </div>
                          </BrowserFrame>
                          <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                            {shots.slice(1, 4).map((s, k) => (
                              <div key={k} className="rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--card)] aspect-[1024/466]">
                                <Shot shot={s} alt={isRTL ? s.ar : s.en} />
                              </div>
                            ))}
                          </div>
                          <span className="absolute top-6 end-6 sm:top-8 sm:end-8 chip bg-[var(--card)]/95 backdrop-blur shadow-[var(--shadow)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                            <Images className="w-4 h-4 text-[var(--accent)]" />
                            {t.systemsSection.viewScreens} · {shots.length}
                          </span>
                        </div>
                      </button>
                    </Reveal>

                    {/* Copy */}
                    <Reveal delay={0.08} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-12 h-12 rounded-2xl grid place-items-center text-white shadow-[0_10px_24px_-10px_rgba(37,125,182,.8)]"
                          style={{ background: "linear-gradient(140deg,#8BC8E7,#257DB6 60%,#153D68)" }}>
                          <Icon className="w-6 h-6" />
                        </span>
                        <span className="font-display font-black text-[var(--line)] text-5xl leading-none select-none" dir="ltr">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">{sys.title}</h3>
                      <p className="mt-1.5 font-bold text-[var(--accent)]">{sys.tagline}</p>
                      <p className="mt-4 text-[var(--muted)] leading-relaxed">{sys.desc}</p>

                      <ul className="mt-6 space-y-3">
                        {sys.features.map(f => (
                          <li key={f} className="flex items-start gap-3 text-[15px] text-[var(--ink-2)]">
                            <span className="mt-1 w-5 h-5 rounded-full grid place-items-center bg-[var(--surface-2)] text-[var(--accent)] shrink-0">
                              <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <dl className="mt-7 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--line)] p-3.5">
                          <dt className="flex items-center gap-1.5 text-xs font-bold text-[var(--muted)]">
                            <Users className="w-3.5 h-3.5" />{t.systemsSection.forLabel}
                          </dt>
                          <dd className="mt-1 text-sm font-bold leading-snug">{sys.audience}</dd>
                        </div>
                        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--line)] p-3.5">
                          <dt className="flex items-center gap-1.5 text-xs font-bold text-[var(--muted)]">
                            <Clock className="w-3.5 h-3.5" />{t.systemsSection.timelineLabel}
                          </dt>
                          <dd className="mt-1 text-sm font-bold leading-snug">{sys.timeline}</dd>
                        </div>
                      </dl>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <a href="#contact" onClick={() => setForm(f => ({ ...f, system: t.contact.systemOptions[i] }))}
                          className="btn btn-primary">
                          {t.systemsSection.requestDemo}
                          <Fwd className="w-4 h-4" />
                        </a>
                        <button type="button" onClick={() => setGallery({ key: sys.key, idx: 0 })} className="btn btn-ghost">
                          <Images className="w-4 h-4" />
                          {t.systemsSection.viewScreens}
                        </button>
                      </div>
                    </Reveal>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── WHY ──────────────────────────────────────────────────────── */}
        <section id="why" className="section bg-[var(--surface)] border-y border-[var(--line)]">
          <div className="container-x">
            <SectionHead eyebrow={t.why.eyebrow} title={t.why.title} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.why.items.map((w, i) => {
                const Icon = WHY_ICONS[w.icon];
                return (
                  <Reveal key={w.t} delay={i * 0.06} className="card p-7 h-full transition-transform duration-300 hover:-translate-y-1">
                    <span className="w-12 h-12 rounded-2xl grid place-items-center bg-[var(--surface-2)] text-[var(--accent)]">
                      <Icon className="w-6 h-6" />
                    </span>
                    <h3 className="mt-5 font-display font-extrabold text-lg">{w.t}</h3>
                    <p className="mt-2 text-[15px] text-[var(--muted)] leading-relaxed">{w.d}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PROCESS — steps rise like the logo's bars ────────────────── */}
        <section id="process" className="section">
          <div className="container-x">
            <SectionHead eyebrow={t.process.eyebrow} title={t.process.title} />
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 lg:items-end">
              {t.process.steps.map((s, i) => (
                <Reveal as="li" key={s.t} delay={i * 0.08} className="relative">
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="w-11 h-11 rounded-full grid place-items-center text-white font-black text-lg shadow-[0_10px_24px_-10px_rgba(37,125,182,.9)]"
                      style={{ background: "linear-gradient(140deg,#8BC8E7,#257DB6 70%)" }} dir="ltr">
                      {i + 1}
                    </span>
                    <div className="mt-3 w-full card !rounded-[22px] p-6 text-center lg:text-start"
                      style={{ minHeight: `${150 + i * 28}px` }}>
                      <h3 className="font-display font-extrabold text-lg">{s.t}</h3>
                      <p className="mt-2 text-[15px] text-[var(--muted)] leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CLIENTS / TRUST ──────────────────────────────────────────── */}
        <section className="pb-8">
          <div className="container-x">
            <Reveal>
              <div className="relative overflow-hidden rounded-[32px] px-6 py-10 sm:px-12 sm:py-12 text-white"
                style={{ background: "linear-gradient(120deg,#153D68 0%,#1E6599 55%,#257DB6 100%)" }}>
                <BarsGraphic id="trust-bars" animate={false}
                  className="absolute -bottom-6 end-6 w-40 sm:w-52 opacity-15 pointer-events-none" />
                <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#BFE3F5]">
                      <Stethoscope className="w-4 h-4" />
                      {t.systems[1].title}
                    </span>
                    <h2 className="mt-3 font-display font-extrabold text-2xl sm:text-3xl leading-snug">{t.clients.title}</h2>
                    <p className="mt-3 text-[#D6ECF8] leading-relaxed">{t.clients.desc}</p>
                  </div>
                  <a href={whatsappLink(t.clients.wa)} target="_blank" rel="noopener noreferrer"
                    className="btn bg-white text-[#153D68] hover:bg-[#EAF5FC] shadow-[0_12px_30px_-12px_rgba(0,0,0,.45)]">
                    <WhatsAppIcon className="w-4 h-4" />
                    {t.clients.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="section">
          <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} desc={t.faq.desc} center={false} />
                <a href={whatsappLink(t.waFloat)} target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost -mt-4 lg:-mt-8">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  {t.faq.ask}
                </a>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-3">
              {t.faq.items.map((f, i) => {
                const open = openFaq === i;
                return (
                  <Reveal key={f.q} delay={i * 0.04}
                    className={`rounded-2xl border transition-colors ${open ? "bg-[var(--card)] border-[var(--accent)]/40 shadow-[var(--shadow)]" : "bg-[var(--surface)] border-[var(--line)]"}`}>
                    <h3>
                      <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open}
                        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-start font-bold text-base sm:text-lg rounded-2xl">
                        {f.q}
                        <span className={`w-8 h-8 rounded-full grid place-items-center shrink-0 transition-all duration-300 ${open ? "rotate-45 bg-[var(--accent)] text-white dark:text-[#08182A]" : "bg-[var(--card)] text-[var(--accent)] border border-[var(--line)]"}`}>
                          <Plus className="w-4 h-4" />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                          <p className="px-5 sm:px-6 pb-6 -mt-1 text-[var(--muted)] leading-relaxed">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────── */}
        <section id="contact" className="section pt-0">
          <div className="container-x">
            <div className="card !rounded-[28px] sm:!rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-5 p-6 sm:p-10 lg:p-12 relative" style={{ background: "var(--grad-soft)" }}>
                <span className="eyebrow mb-4">{t.contact.eyebrow}</span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">{t.contact.title}</h2>
                <p className="mt-4 text-[var(--muted)] leading-relaxed">{t.contact.desc}</p>

                <ul className="mt-8 space-y-3">
                  <li>
                    <a href={whatsappLink(t.waFloat)} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--card)] border border-[var(--line)] hover:border-[#25D366] transition-colors">
                      <span className="w-10 h-10 rounded-xl grid place-items-center bg-[#25D366] text-white"><WhatsAppIcon className="w-5 h-5" /></span>
                      <span>
                        <span className="block text-xs font-bold text-[var(--muted)]">{t.contact.waLabel}</span>
                        <span className="block font-bold" dir="ltr">{PHONE}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--card)] border border-[var(--line)]">
                      <span className="w-10 h-10 rounded-xl grid place-items-center bg-[var(--surface-2)] text-[var(--accent)] shrink-0"><Mail className="w-5 h-5" /></span>
                      <a href={`mailto:${EMAIL}`} className="min-w-0 flex-1">
                        <span className="block text-xs font-bold text-[var(--muted)]">{t.contact.emailLabel}</span>
                        <span className="block font-bold text-sm sm:text-base [overflow-wrap:anywhere]" dir="ltr">{EMAIL.split("@")[0]}@<wbr />{EMAIL.split("@")[1]}</span>
                      </a>
                      <button type="button" onClick={copyEmail} aria-label={t.contact.copy}
                        className="w-9 h-9 grid place-items-center rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)]">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 px-3.5 text-sm font-semibold text-[var(--muted)]">
                    <MapPin className="w-4 h-4 text-[var(--accent)]" />{t.contact.location}
                  </li>
                  <li className="flex items-center gap-3 px-3.5 pt-2">
                    <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                      className="w-9 h-9 grid place-items-center rounded-xl bg-[var(--card)] border border-[var(--line)] text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors">
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                      className="w-9 h-9 grid place-items-center rounded-xl bg-[var(--card)] border border-[var(--line)] text-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-colors">
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  </li>
                </ul>
              </div>

              <form onSubmit={submit} className="min-w-0 lg:col-span-7 p-6 sm:p-10 lg:p-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="block mb-2 text-sm font-bold">{t.contact.name}</span>
                  <input className="field" required autoComplete="name" value={form.name} placeholder={t.contact.namePh}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </label>
                <label className="block">
                  <span className="block mb-2 text-sm font-bold">{t.contact.phone}</span>
                  <input className="field" required value={form.contact} placeholder={t.contact.phonePh}
                    onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} />
                </label>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-sm font-bold">{t.contact.system}</legend>
                  <div className="flex flex-wrap gap-2">
                    {t.contact.systemOptions.map(opt => {
                      const on = form.system === opt;
                      return (
                        <button type="button" key={opt} aria-pressed={on}
                          onClick={() => setForm(f => ({ ...f, system: on ? "" : opt }))}
                          className={`h-10 px-4 rounded-full text-sm font-bold border transition-colors ${
                            on ? "bg-[var(--accent)] border-[var(--accent)] text-white dark:text-[#08182A]" : "bg-[var(--bg)] border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--accent)]"
                          }`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <label className="block sm:col-span-2">
                  <span className="block mb-2 text-sm font-bold">{t.contact.details}</span>
                  <textarea className="field min-h-[120px] resize-y" rows={4} value={form.details} placeholder={t.contact.detailsPh}
                    onChange={e => setForm(f => ({ ...f, details: e.target.value }))} />
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    <WhatsAppIcon className="w-4 h-4" />
                    {t.contact.submit}
                  </button>
                  <p className="mt-3 text-xs text-[var(--muted)]">{t.contact.note}</p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="container-x py-12 grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <Lockup lang={lang} />
            <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed max-w-sm">{t.footer.tagline}</p>
          </div>
          <nav className="md:col-span-4 grid grid-cols-2 gap-y-2 text-sm font-semibold" aria-label="Footer">
            {navItems.map(([href, label]) => (
              <a key={href} href={href} className="text-[var(--ink-2)] hover:text-[var(--accent)] py-1 w-fit">{label}</a>
            ))}
          </nav>
          <div className="md:col-span-3 space-y-2 text-sm">
            <a href={whatsappLink(t.waFloat)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-[var(--ink-2)] hover:text-[var(--accent)] w-fit">
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /><span dir="ltr">{PHONE}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 font-semibold text-[var(--ink-2)] hover:text-[var(--accent)] w-fit break-all">
              <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />{EMAIL}
            </a>
            <div className="flex items-center gap-2 pt-1">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-8 h-8 grid place-items-center rounded-lg text-[var(--ink-2)] hover:text-[#1877F2] transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-8 h-8 grid place-items-center rounded-lg text-[var(--ink-2)] hover:text-[#E4405F] transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="container-x py-5 border-t border-[var(--line)] text-xs text-[var(--muted)]">
          {t.footer.rights}
        </div>
      </footer>

      {/* ── WhatsApp float ─────────────────────────────────────────────── */}
      <a href={whatsappLink(t.waFloat)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        className="fixed z-40 bottom-5 end-5 sm:bottom-7 sm:end-7 w-14 h-14 rounded-full grid place-items-center bg-[#25D366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,.7)] hover:scale-105 active:scale-95 transition-transform">
        <WhatsAppIcon className="w-7 h-7" />
      </a>

      {/* ── Toast ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div role="status"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
            className="fixed z-[70] bottom-6 inset-x-0 mx-auto w-fit max-w-[90vw] px-5 py-3 rounded-full bg-[#0F2A46] text-white text-sm font-bold shadow-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8BC8E7]" />{toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Screenshot gallery ─────────────────────────────────────────── */}
      <AnimatePresence>
        {gallery && (() => {
          const shots = shotsFor(gallery.key);
          const cur = shots[gallery.idx];
          const sys = t.systems.find(s => s.key === gallery.key);
          const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
          const NextIcon = isRTL ? ChevronLeft : ChevronRight;
          return (
            <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              role="dialog" aria-modal="true" aria-label={sys?.title}>
              <div className="absolute inset-0 bg-[#06121F]/85 backdrop-blur-sm" onClick={() => setGallery(null)} />
              <motion.div initial={{ scale: 0.97, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, y: 10 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative w-full max-w-6xl">
                <div className="flex items-center justify-between gap-3 mb-3 text-white">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#8BC8E7]">{sys?.title}</p>
                    <p className="font-bold truncate">{isRTL ? cur.ar : cur.en}
                      <span className="ms-2 text-xs font-semibold text-white/60" dir="ltr">{gallery.idx + 1} / {shots.length}</span>
                    </p>
                  </div>
                  <button onClick={() => setGallery(null)} aria-label={t.gallery.close}
                    className="w-11 h-11 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={gallery.idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Shot shot={cur} alt={isRTL ? cur.ar : cur.en} eager fill={false} className="max-h-[72vh] object-contain" />
                    </motion.div>
                  </AnimatePresence>
                  <button onClick={() => step(-1)} aria-label={t.gallery.prev}
                    className="absolute top-1/2 -translate-y-1/2 start-3 w-11 h-11 grid place-items-center rounded-full bg-[#0F2A46]/75 text-white hover:bg-[#0F2A46]">
                    <PrevIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => step(1)} aria-label={t.gallery.next}
                    className="absolute top-1/2 -translate-y-1/2 end-3 w-11 h-11 grid place-items-center rounded-full bg-[#0F2A46]/75 text-white hover:bg-[#0F2A46]">
                    <NextIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {shots.map((s, k) => (
                    <button key={k} onClick={() => setGallery(g => ({ ...g, idx: k }))}
                      aria-label={isRTL ? s.ar : s.en} aria-current={k === gallery.idx}
                      className={`shrink-0 w-24 sm:w-28 rounded-lg overflow-hidden border-2 transition-all ${
                        k === gallery.idx ? "border-[#8BC8E7] opacity-100" : "border-transparent opacity-50 hover:opacity-90"
                      }`}>
                      <div className="aspect-[1024/466] overflow-hidden bg-white"><Shot shot={s} alt="" /></div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
