import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/voice")({
  component: VoicePage,
});

type ParsedTrade = { action: "swap" | "buy" | "sell"; amount: number; from: string; to: string } | null;

function parseCommand(text: string): ParsedTrade {
  const t = text.toLowerCase();
  // "swap 1 sol for usdc", "buy 100 usdc of jup", "sell 2 sol"
  const swap = t.match(/(?:swap|convert)\s+(\d*\.?\d+)\s+(\w+)\s+(?:for|to|into)\s+(\w+)/);
  if (swap) return { action: "swap", amount: parseFloat(swap[1]), from: swap[2].toUpperCase(), to: swap[3].toUpperCase() };
  const buy = t.match(/buy\s+(\d*\.?\d+)\s+(\w+)/);
  if (buy) return { action: "buy", amount: parseFloat(buy[1]), from: "USDC", to: buy[2].toUpperCase() };
  const sell = t.match(/sell\s+(\d*\.?\d+)\s+(\w+)/);
  if (sell) return { action: "sell", amount: parseFloat(sell[1]), from: sell[2].toUpperCase(), to: "USDC" };
  return null;
}

function VoicePage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);
  const recRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (e: any) => {
      let out = "";
      for (let i = 0; i < e.results.length; i++) out += e.results[i][0].transcript;
      setTranscript(out);
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    return () => rec.stop();
  }, []);

  const toggle = () => {
    if (!recRef.current) return;
    if (listening) {
      recRef.current.stop();
      setListening(false);
    } else {
      setTranscript("");
      try {
        recRef.current.start();
        setListening(true);
      } catch {
        // already started
      }
    }
  };

  const parsed = parseCommand(transcript);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Voice trading</p>
        <h1 className="mt-2 font-display text-5xl font-semibold md:text-6xl">Speak to trade.</h1>
        <p className="mt-3 text-ink/70">Try: "Swap 1 SOL for USDC" or "Buy 50 USDC of JUP"</p>
      </div>

      <div className="rounded-[24px] border-[3px] border-ink bg-card p-8 shadow-[var(--shadow-brutal-lg)]">
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={toggle}
            disabled={!supported}
            className={`group relative grid h-32 w-32 place-items-center rounded-full border-[3px] border-ink shadow-[var(--shadow-brutal)] transition-transform hover:-translate-y-1 disabled:opacity-40 ${
              listening ? "bg-destructive" : "bg-primary"
            }`}
          >
            {listening && (
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
            )}
            {listening ? (
              <MicOff className="h-12 w-12 text-ink" />
            ) : (
              <Mic className="h-12 w-12 text-ink" />
            )}
          </button>

          <div className="min-h-[90px] w-full rounded-2xl border-[3px] border-ink bg-paper px-5 py-4 font-mono text-sm">
            {!supported ? (
              <span className="text-destructive">Speech recognition isn't available in this browser. Try Chrome.</span>
            ) : transcript ? (
              <span>{transcript}</span>
            ) : (
              <span className="text-ink/40">
                {listening ? "Listening…" : "Press the mic and speak a command"}
              </span>
            )}
          </div>

          {parsed && (
            <div className="w-full rounded-2xl border-[3px] border-ink bg-primary/15 p-5 shadow-[var(--shadow-brutal-sm)]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/60">
                <Sparkles className="h-3.5 w-3.5" /> Parsed intent
              </div>
              <div className="mt-2 font-display text-3xl">
                {parsed.action.toUpperCase()} {parsed.amount} {parsed.from} → {parsed.to}
              </div>
              <div className="mt-4 flex gap-3">
                <button className="rounded-full border-[3px] border-ink bg-ink px-5 py-2 font-semibold text-card shadow-[var(--shadow-brutal-sm)]">
                  Confirm trade
                </button>
                <button
                  onClick={() => setTranscript("")}
                  className="rounded-full border-[3px] border-ink bg-card px-5 py-2 font-semibold text-ink shadow-[var(--shadow-brutal-sm)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {["Swap 2 SOL for USDC", "Buy 100 USDC of BONK", "Sell 1 SOL"].map((c) => (
          <div
            key={c}
            className="rounded-2xl border-[3px] border-ink bg-card p-4 font-mono text-sm shadow-[var(--shadow-brutal-sm)]"
          >
            "{c}"
          </div>
        ))}
      </div>
    </div>
  );
}
