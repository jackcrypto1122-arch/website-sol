import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import {
  Mic,
  ArrowRight,
  Play,
  Zap,
  Lock,
  Globe,
  MessageCircle,
  Send,
  Twitter,
  BookOpen,
  Plus,
  Minus,
  Check,
} from "lucide-react";

import appMockup from "@/assets/app-mockup.png";
import solanaIllustration from "@/assets/solana-illustration.png";
import tokenSol from "@/assets/solana-logo.svg";
import tokenUsdc from "@/assets/token-usdc.png";
import tokenUsdt from "@/assets/token-usdt.png";
import tokenBonk from "@/assets/token-bonk.png";
import tokenJup from "@/assets/token-jup.png";

export const Route = createFileRoute("/")({
  component: SolvoxLanding,
});

const TOKENS = [
  { name: "SOL", label: "Solana", src: tokenSol },
  { name: "USDC", label: "USD Coin", src: tokenUsdc },
  { name: "USDT", label: "Tether", src: tokenUsdt },
  { name: "BONK", label: "Bonk", src: tokenBonk },
  { name: "JUP", label: "Jupiter", src: tokenJup },
];

function SolvoxLanding() {
  useCursorGlow();
  useLenis();
  useScrollReveal();
  useHeroAnimation();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper text-ink font-sans">
      {/* Grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-grain opacity-[0.18] mix-blend-multiply" />

      <Nav />
      <Hero />
      <HowItWorks />
      <VoiceCommands />
      <WhySolvox />
      <SupportedTokens />
      <WhySolana />
      <Roadmap />
      <DemoSection />
      <FAQ />
      <Footer />
    </div>
  );
}

/* ------------------------------- Nav ------------------------------- */

function Nav() {
  return (
    <header className="relative z-30 mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-10">
      <a href="#" className="flex items-center gap-3">
        <Logo />
        <span className="font-display text-2xl tracking-tight">Solvox</span>
      </a>
      <nav className="hidden items-center gap-10 text-sm font-medium md:flex">
        <a href="#how" className="hover:text-primary transition-colors">How it works</a>
        <a href="#commands" className="hover:text-primary transition-colors">Commands</a>
        <a href="#tokens" className="hover:text-primary transition-colors">Tokens</a>
        <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
      </nav>
      <MagneticButton className="hidden md:inline-flex">Launch App <ArrowRight className="h-4 w-4" /></MagneticButton>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] brutal-border bg-primary brutal-shadow-sm">
      <Mic className="h-5 w-5 text-ink" strokeWidth={2.5} />
    </div>
  );
}

/* ------------------------------- Hero ------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-10 md:px-10 md:pb-40 md:pt-16">
      {/* Parallax blurred emerald circles */}
      <div data-parallax="0.3" className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-primary/40 blur-3xl" />
      <div data-parallax="0.5" className="pointer-events-none absolute -right-40 top-40 h-[520px] w-[520px] rounded-full bg-primary-glow/40 blur-3xl" />
      <div data-parallax="0.2" className="pointer-events-none absolute left-1/3 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        {/* Left */}
        <div className="relative z-10">
          <div data-hero="pill" className="inline-flex items-center gap-2 rounded-full brutal-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-widest brutal-shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Voice AI on Solana
          </div>

          <h1 data-hero="title" className="mt-8 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.03em]">
            Trade Crypto
            <br />
            <span className="italic text-primary">With Your Voice.</span>
          </h1>

          <p data-hero="sub" className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75 md:text-xl">
            The fastest way to swap tokens on Solana using natural voice commands. Speak, swap, done — no forms, no friction.
          </p>

          <div data-hero="ctas" className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton size="lg">Launch App <ArrowRight className="h-5 w-5" /></MagneticButton>
            <MagneticButton size="lg" variant="ghost"><Play className="h-4 w-4" fill="currentColor" /> Watch Demo</MagneticButton>
          </div>

          <div data-hero="stats" className="mt-14 grid max-w-lg grid-cols-3 gap-6">
            {[
              ["<400ms", "Voice latency"],
              ["0.5%", "Avg. slippage"],
              ["24/7", "On-chain"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl md:text-4xl">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-ink/60">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Browser mockup with floating tokens */}
        <div data-hero="mockup" className="relative">
          <FloatingTokens />
          <BrowserMockup />
        </div>
      </div>
    </section>
  );
}

function BrowserMockup() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute -inset-6 rounded-[32px] bg-primary/40 blur-3xl" />
      <div className="relative overflow-hidden rounded-[22px] brutal-border brutal-shadow-lg bg-card">
        {/* Browser bar */}
        <div className="flex items-center gap-2 border-b-[3px] border-ink bg-paper px-4 py-3">
          <span className="h-3 w-3 rounded-full brutal-border" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full brutal-border" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full brutal-border" style={{ background: "#28c840" }} />
          <div className="mx-auto rounded-full border-2 border-ink/70 bg-card px-4 py-1 text-xs font-mono">solvox.app/swap</div>
        </div>
        <img
          src={appMockup}
          alt="Solvox dApp interface"
          width={1024}
          height={768}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

function FloatingTokens() {
  const positions = [
    { src: tokenSol, className: "-top-6 -left-8 h-20 w-20 animate-float-slow" },
    { src: tokenUsdc, className: "top-16 -right-10 h-24 w-24 animate-float-med" },
    { src: tokenBonk, className: "bottom-20 -left-14 h-24 w-24 animate-float-med" },
    { src: tokenJup, className: "-bottom-6 right-16 h-20 w-20 animate-float-slow" },
    { src: tokenUsdt, className: "top-1/2 -right-16 h-16 w-16 animate-float-slow" },
  ];
  return (
    <>
      {positions.map((p, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute z-20 rounded-full brutal-border brutal-shadow bg-card p-1 ${p.className}`}
          style={{ animationDelay: `${i * 0.4}s` }}
        >
          <img src={p.src} alt="" width={96} height={96} className="h-full w-full rounded-full" />
        </div>
      ))}
    </>
  );
}

/* ---------------------------- How It Works ---------------------------- */

function HowItWorks() {
  const steps = [
    { n: 1, title: "Select Token", body: "Pick the token you want to swap from — SOL, USDC, or anything in your wallet." },
    { n: 2, title: "Say Amount", body: "Speak the amount naturally. \"Swap 2 SOL\" — that's it." },
    { n: 3, title: "Choose Output Token", body: "Tell Solvox what you want to receive. Any Solana token, instantly quoted." },
    { n: 4, title: "Confirm Swap", body: "Review the route, approve in your wallet, and settle on-chain in under a second." },
  ];
  return (
    <section id="how" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader eyebrow="Process" title={<>How <span className="italic text-primary">it works</span></>} sub="Four voice steps stand between you and your next trade." />

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal relative">
              <StepCard step={s} />
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute right-[-1.5rem] top-14 hidden text-ink/40 lg:block">
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: { n: number; title: string; body: string } }) {
  const pct = step.n * 25;
  return (
    <div className="brutal-card lift-hover flex h-full flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs uppercase tracking-widest text-ink/50">Step {step.n} / 4</div>
        <ProgressRing pct={pct} label={`${step.n}`} />
      </div>
      <h3 className="font-display text-3xl">{step.title}</h3>
      <p className="text-sm leading-relaxed text-ink/70">{step.body}</p>
    </div>
  );
}

function ProgressRing({ pct, label }: { pct: number; label: string }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative h-14 w-14">
      <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
        <circle cx="30" cy="30" r={r} strokeWidth="4" className="stroke-ink/15" fill="none" />
        <circle
          cx="30"
          cy="30"
          r={r}
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-primary transition-[stroke-dashoffset] duration-700"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-lg">{label}</span>
    </div>
  );
}

/* --------------------------- Voice Commands --------------------------- */

function VoiceCommands() {
  const commands = [
    "Swap 2 SOL to USDC",
    "Convert 150 USDC to BONK",
    "Trade 0.5 SOL into JUP",
    "Buy BONK with 100 USDT",
  ];
  return (
    <section id="commands" className="relative bg-ink px-6 py-32 text-card md:px-10 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-card/30 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-card/70">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Live voice engine
          </div>
          <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1] tracking-tight md:text-7xl">
            Just <span className="italic text-primary">speak</span>.
            <br />
            We handle the rest.
          </h2>
        </div>

        <div className="mt-16 flex justify-center">
          <Waveform />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {commands.map((c, i) => (
            <TerminalCard key={c} command={c} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Waveform() {
  return (
    <div className="flex h-24 items-center gap-1.5">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="wave-bar w-1 rounded-full bg-primary"
          style={{
            height: `${20 + Math.abs(Math.sin(i * 0.4)) * 60}px`,
            animationDelay: `${i * 60}ms`,
            animationDuration: `${900 + (i % 5) * 100}ms`,
          }}
        />
      ))}
    </div>
  );
}

function TerminalCard({ command, delay }: { command: string; delay: number }) {
  const [typed, setTyped] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setTimeout(() => {
            let i = 0;
            const iv = setInterval(() => {
              i++;
              setTyped(command.slice(0, i));
              if (i >= command.length) clearInterval(iv);
            }, 45);
          }, delay * 1000);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [command, delay]);

  return (
    <div ref={ref} className="reveal rounded-[18px] border-[3px] border-card/40 bg-ink/50 p-6 shadow-[4px_4px_0px_var(--color-primary)]">
      <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-card/50">
        <span className="h-2 w-2 rounded-full bg-primary" />
        voice ▸ command
      </div>
      <div className="font-mono text-xl md:text-2xl text-primary">
        &gt; {typed}
        <span className="animate-blink">▊</span>
      </div>
    </div>
  );
}

/* ------------------------------ Why Solvox ------------------------------ */

function WhySolvox() {
  const cards = [
    { icon: <Zap className="h-6 w-6" />, title: "Fast", body: "Swap in seconds. Sub-second execution on Solana with instant voice parsing." },
    { icon: <MessageCircle className="h-6 w-6" />, title: "Natural", body: "Speak like talking to a friend. No syntax, no jargon — just intent." },
    { icon: <Lock className="h-6 w-6" />, title: "Secure", body: "Wallet approvals stay on-chain. Solvox never touches your keys." },
    { icon: <Globe className="h-6 w-6" />, title: "Accessible", body: "No complex interfaces. Designed for anyone who can hold a phone." },
  ];
  return (
    <section className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader eyebrow="Why" title={<>Built for <span className="italic text-primary">humans</span>, not spreadsheets.</>} />
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="reveal brutal-card lift-hover flex flex-col gap-4 p-8">
              <div className="grid h-14 w-14 place-items-center rounded-[14px] brutal-border bg-primary text-ink brutal-shadow-sm">
                {c.icon}
              </div>
              <h3 className="font-display text-3xl">{c.title}</h3>
              <p className="text-sm leading-relaxed text-ink/70">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Supported Tokens --------------------------- */

function SupportedTokens() {
  return (
    <section id="tokens" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader eyebrow="Assets" title={<>Supported <span className="italic text-primary">tokens</span></>} sub="Trade the most liquid assets across Solana with a single sentence." />

        <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {TOKENS.map((t, i) => (
            <div
              key={t.name}
              className="reveal group brutal-card flex flex-col items-center gap-4 p-8 transition-transform duration-500 hover:rotate-[-3deg] hover:-translate-y-2"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-primary/30 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                <img src={t.src} alt={t.name} width={128} height={128} className="relative h-24 w-24 rounded-full brutal-border animate-float-slow" style={{ animationDelay: `${i * 0.3}s` }} loading="lazy" />
              </div>
              <div className="text-center">
                <div className="font-display text-2xl">{t.name}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-ink/60">{t.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Why Solana ------------------------------ */

function WhySolana() {
  return (
    <section className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
        <div className="reveal">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">Infrastructure</div>
          <h2 className="mt-4 font-display text-5xl leading-[1] tracking-tight md:text-7xl">
            Why <span className="italic text-primary">Solana</span>.
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/75">
            Built on Solana for ultra-fast transactions, low fees, and seamless DeFi execution. Voice belongs on the fastest chain — nothing else keeps up with how quickly you can speak.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              ["~400ms", "block times keep voice interactions instant"],
              ["<$0.001", "average transaction cost per swap"],
              ["Native", "integration with Jupiter and top DEXes"],
            ].map(([n, l]) => (
              <li key={l} className="flex items-baseline gap-6">
                <span className="font-display text-3xl text-primary">{n}</span>
                <span className="text-sm text-ink/70">{l}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal relative">
          <div className="absolute -inset-8 rounded-[32px] bg-primary/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-[22px] brutal-border brutal-shadow-lg bg-card">
            <img src={solanaIllustration} alt="Solana network illustration" width={1024} height={1024} className="block h-auto w-full animate-spin-slow" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Roadmap ------------------------------- */

const ROADMAP: {
  phase: string;
  title: string;
  emoji: string;
  status: "done" | "active" | "upcoming";
  items: string[];
}[] = [
  {
    phase: "01",
    title: "Foundation",
    emoji: "✅",
    status: "done",
    items: [
      "Solvox MVP",
      "Wallet Integration",
      "Token Swaps",
      "Voice Recognition",
      "Mainnet Launch",
    ],
  },
  {
    phase: "02",
    title: "Growth",
    emoji: "🚀",
    status: "active",
    items: [
      "More Supported Tokens",
      "Transaction History",
      "Improved AI Voice Parsing",
      "Mobile Optimization",
      "Performance Improvements",
    ],
  },
  {
    phase: "03",
    title: "Expansion",
    emoji: "🌍",
    status: "upcoming",
    items: [
      "Cross-Chain Swaps",
      "Portfolio Management",
      "Multi-Language Voice Commands",
      "Advanced Trading Modes",
      "Referral Program",
    ],
  },
  {
    phase: "04",
    title: "AI Future",
    emoji: "🤖",
    status: "upcoming",
    items: [
      "AI Trading Assistant",
      "Smart Trading Suggestions",
      "Limit Orders via Voice",
      "Portfolio Insights",
      "Voice Automation",
    ],
  },
];

function Roadmap() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const vLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * 0.6;
      const progressed = Math.min(Math.max((vh - r.top) / total, 0), 1);
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${progressed})`;
      if (vLineRef.current) vLineRef.current.style.transform = `scaleY(${progressed})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="roadmap" ref={sectionRef} className="relative overflow-hidden px-6 py-32 md:px-10 md:py-48">
      {/* Floating decoration */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-primary animate-float-slow" />
        <div className="absolute right-[12%] top-[30%] h-2 w-2 rounded-full bg-primary/70 animate-float-med" />
        <div className="absolute left-[22%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-primary/60 animate-float-med" />
        <div className="absolute right-[20%] bottom-[14%] h-2 w-2 rounded-full bg-primary animate-float-slow" />
        <svg className="absolute inset-x-0 top-1/2 h-24 w-full opacity-30" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M0 50 Q 250 10, 500 50 T 1000 50" stroke="var(--color-ink)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <SectionHeader
          eyebrow="Roadmap"
          title={<>The <span className="italic text-primary">Roadmap</span></>}
          sub="Building the future of voice-powered DeFi, one milestone at a time."
        />

        {/* Desktop horizontal */}
        <div className="relative mt-28 hidden lg:block">
          {/* Track */}
          <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-ink/15" />
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 origin-left bg-primary transition-transform duration-300"
            style={{ transform: "scaleX(0)" }}
          />

          <div className="relative grid grid-cols-4 gap-8">
            {ROADMAP.map((m, i) => {
              const above = i % 2 === 0;
              return (
                <div key={m.phase} className="relative flex flex-col items-center">
                  {above ? (
                    <>
                      <div className="reveal mb-10 w-full" style={{ transitionDelay: `${i * 120}ms` }}>
                        <RoadmapCard milestone={m} />
                      </div>
                      <MilestoneDot phase={m.phase} status={m.status} />
                      <div className="h-32" />
                    </>
                  ) : (
                    <>
                      <div className="h-32" />
                      <MilestoneDot phase={m.phase} status={m.status} />
                      <div className="reveal mt-10 w-full" style={{ transitionDelay: `${i * 120}ms` }}>
                        <RoadmapCard milestone={m} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet vertical */}
        <div className="relative mt-20 lg:hidden">
          <div className="absolute left-6 top-0 bottom-0 w-[3px] bg-ink/15" />
          <div
            ref={vLineRef}
            className="absolute left-6 top-0 bottom-0 w-[3px] origin-top bg-primary transition-transform duration-300"
            style={{ transform: "scaleY(0)" }}
          />
          <div className="space-y-10">
            {ROADMAP.map((m, i) => (
              <div key={m.phase} className="relative pl-20">
                <div className="absolute left-0 top-2">
                  <MilestoneDot phase={m.phase} status={m.status} />
                </div>
                <div className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                  <RoadmapCard milestone={m} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneDot({ phase, status }: { phase: string; status: "done" | "active" | "upcoming" }) {
  const isDone = status === "done";
  const isActive = status === "active";
  return (
    <div className="relative z-10">
      {(isDone || isActive) && (
        <span className="pointer-events-none absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
      )}
      <div
        className={`relative grid h-14 w-14 place-items-center rounded-full brutal-border brutal-shadow-sm font-display text-xl ${
          isDone || isActive ? "bg-primary text-ink" : "bg-card text-ink"
        }`}
      >
        {phase}
      </div>
      {isDone && (
        <div className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full brutal-border bg-ink text-primary">
          <Check className="h-3 w-3" strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

function RoadmapCard({ milestone }: { milestone: (typeof ROADMAP)[number] }) {
  return (
    <div className="brutal-card lift-hover flex h-full flex-col gap-4 p-6 md:p-7">
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs uppercase tracking-widest text-ink/50">Phase {milestone.phase}</div>
        <span className="text-xl leading-none">{milestone.emoji}</span>
      </div>
      <h3 className="font-display text-3xl leading-tight">{milestone.title}</h3>
      <ul className="mt-1 space-y-2.5">
        {milestone.items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-sm text-ink/75">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-2">
        <span
          className={`inline-flex items-center gap-2 rounded-full border-2 border-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${
            milestone.status === "done"
              ? "bg-primary text-ink"
              : milestone.status === "active"
                ? "bg-ink text-primary"
                : "bg-card text-ink/60"
          }`}
        >
          {milestone.status === "done" ? "Shipped" : milestone.status === "active" ? "In Progress" : "Upcoming"}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------- Demo -------------------------------- */

function DemoSection() {
  return (
    <section className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader eyebrow="Demo" title={<>See <span className="italic text-primary">Solvox</span> in motion.</>} />

        <div className="reveal relative mt-20">
          <div className="absolute -inset-10 rounded-[40px] bg-primary/40 blur-3xl" />
          <div className="relative overflow-hidden rounded-[22px] brutal-border brutal-shadow-lg bg-card">
            <div className="flex items-center gap-2 border-b-[3px] border-ink bg-paper px-4 py-3">
              <span className="h-3 w-3 rounded-full brutal-border" style={{ background: "#ff5f57" }} />
              <span className="h-3 w-3 rounded-full brutal-border" style={{ background: "#febc2e" }} />
              <span className="h-3 w-3 rounded-full brutal-border" style={{ background: "#28c840" }} />
              <div className="mx-auto rounded-full border-2 border-ink/70 bg-card px-4 py-1 text-xs font-mono">solvox.app · live demo</div>
            </div>
            <div className="relative aspect-video w-full bg-ink">
              {/* Auto-playing looping demo placeholder */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center text-card">
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full brutal-border bg-primary text-ink brutal-shadow-lg animate-pulse">
                    <Mic className="h-10 w-10" strokeWidth={2.5} />
                  </div>
                  <div className="mt-6 font-mono text-xs uppercase tracking-widest text-card/60">Now recording</div>
                  <div className="mt-4 font-display text-3xl italic text-primary">"Swap 2 SOL to USDC"</div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-6 flex justify-center">
                <Waveform />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FAQ --------------------------------- */

function FAQ() {
  const items = [
    { q: "What is Solvox?", a: "Solvox is a Solana dApp that lets you swap tokens using natural voice commands. Speak your trade, review the route, and confirm in your wallet — all in seconds." },
    { q: "How secure is it?", a: "All transactions are approved in your wallet and settled on-chain. Solvox never holds your keys or custodies your funds. Voice processing runs client-side wherever possible." },
    { q: "Which wallets are supported?", a: "Phantom, Solflare, Backpack, and any wallet that supports the Solana Wallet Adapter standard." },
    { q: "Which tokens can I trade?", a: "SOL, USDC, USDT, BONK, JUP, and every liquid Solana token routed through Jupiter — anything speakable, anything tradeable." },
  ];
  return (
    <section id="faq" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1000px]">
        <SectionHeader eyebrow="FAQ" title={<>Questions, <span className="italic text-primary">answered</span>.</>} />
        <div className="mt-16 space-y-5">
          {items.map((it, i) => (
            <FAQItem key={i} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="reveal brutal-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 p-6 text-left md:p-8"
      >
        <span className="font-display text-2xl md:text-3xl">{q}</span>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full brutal-border bg-primary">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-500"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="px-6 pb-8 pt-0 text-base leading-relaxed text-ink/75 md:px-8 md:text-lg">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Footer -------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t-[3px] border-ink bg-ink px-6 py-16 text-card md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-display text-2xl">Solvox</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-card/70">
            Trade crypto with your voice. Built on Solana for the next generation of DeFi.
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-8 text-sm">
          <a href="#" className="flex items-center gap-2 text-card/80 transition-colors hover:text-primary"><Send className="h-4 w-4" /> TG</a>
          <a href="#" className="flex items-center gap-2 text-card/80 transition-colors hover:text-primary"><Twitter className="h-4 w-4" /> Twitter</a>
          <a href="#" className="flex items-center gap-2 text-card/80 transition-colors hover:text-primary"><BookOpen className="h-4 w-4" /> Docs</a>
        </div>

        <div>
          <MagneticButton>Launch App <ArrowRight className="h-4 w-4" /></MagneticButton>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-card/15 pt-6 text-xs text-card/50">
        <div>© {new Date().getFullYear()} Solvox. All rights reserved.</div>
        <div className="font-mono uppercase tracking-widest">Built on Solana</div>
      </div>
    </footer>
  );
}

/* ------------------------------ Shared UI ------------------------------ */

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="reveal max-w-3xl">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">{eyebrow}</div>
      <h2 className="mt-4 font-display text-5xl leading-[1] tracking-tight md:text-7xl">{title}</h2>
      {sub && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">{sub}</p>}
    </div>
  );
}

function MagneticButton({
  children,
  className = "",
  size = "md",
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const strength = 16;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: (x / r.width) * strength, y: (y / r.height) * strength, duration: 0.4, ease: "power3.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const base = "inline-flex items-center justify-center gap-2 rounded-full brutal-border font-medium transition-shadow";
  const sizes = size === "lg" ? "px-8 py-4 text-base" : "px-5 py-2.5 text-sm";
  const variants =
    variant === "primary"
      ? "bg-primary text-ink brutal-shadow hover:brutal-shadow-lg"
      : "bg-card text-ink brutal-shadow hover:brutal-shadow-lg";

  return (
    <button ref={ref} className={`${base} ${sizes} ${variants} ${className}`}>
      {children}
    </button>
  );
}

/* ------------------------------- Hooks ------------------------------- */

function useCursorGlow() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = document.createElement("div");
    el.className = "cursor-glow";
    el.style.opacity = "0";
    document.body.appendChild(el);
    const onMove = (e: MouseEvent) => {
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power3.out", opacity: 1 });
    };
    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      el.remove();
    };
  }, []);
}

function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let rafId = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Parallax
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const onScroll = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.2");
        el.style.transform = `translate3d(0, ${y * speed * -0.4}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useHeroAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
      tl.from("[data-hero='pill']", { y: 20, opacity: 0, duration: 0.6 })
        .from("[data-hero='title']", { y: 40, opacity: 0, duration: 1.1 }, "-=0.2")
        .from("[data-hero='sub']", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from("[data-hero='ctas']", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from("[data-hero='stats'] > *", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.3")
        .from("[data-hero='mockup']", { y: 60, opacity: 0, duration: 1.2 }, "-=1");
    });
    return () => ctx.revert();
  }, []);
}
