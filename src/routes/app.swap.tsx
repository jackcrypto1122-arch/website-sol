import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { usePrices, WATCH } from "@/components/app/data";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Route = createFileRoute("/app/swap")({
  component: SwapPage,
});

function SwapPage() {
  const { connected } = useWallet();
  const { data: prices } = usePrices();
  const [fromSym, setFromSym] = useState("SOL");
  const [toSym, setToSym] = useState("USDC");
  const [amount, setAmount] = useState("1");
  const [slippage, setSlippage] = useState("0.5");

  const from = WATCH.find((t) => t.symbol === fromSym)!;
  const to = WATCH.find((t) => t.symbol === toSym)!;
  const fromPrice = prices?.[from.id]?.usdPrice ?? 0;
  const toPrice = prices?.[to.id]?.usdPrice ?? 0;
  const est = fromPrice && toPrice ? (parseFloat(amount || "0") * fromPrice) / toPrice : 0;

  const flip = () => {
    setFromSym(toSym);
    setToSym(fromSym);
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Swap</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">Manual trade</h1>
      </div>

      <div className="rounded-[24px] border-[3px] border-ink bg-card p-6 shadow-[var(--shadow-brutal-lg)]">
        <TokenInput label="You pay" symbol={fromSym} onSymbolChange={setFromSym} amount={amount} onAmountChange={setAmount} usd={parseFloat(amount || "0") * fromPrice} />

        <div className="my-3 flex justify-center">
          <button
            onClick={flip}
            className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-primary shadow-[var(--shadow-brutal-sm)] transition-transform hover:rotate-180"
          >
            <ArrowDownUp className="h-4 w-4 text-ink" />
          </button>
        </div>

        <TokenInput label="You receive" symbol={toSym} onSymbolChange={setToSym} amount={est ? est.toFixed(6) : "0"} readOnly usd={est * toPrice} />

        <div className="mt-4 flex items-center justify-between rounded-2xl border-[3px] border-ink bg-paper px-4 py-3 text-sm">
          <span className="text-ink/60">Slippage tolerance</span>
          <div className="flex gap-2">
            {["0.1", "0.5", "1.0"].map((v) => (
              <button
                key={v}
                onClick={() => setSlippage(v)}
                className={`rounded-full border-[2px] border-ink px-3 py-1 text-xs font-semibold ${
                  slippage === v ? "bg-ink text-card" : "bg-card"
                }`}
              >
                {v}%
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border-[3px] border-ink bg-paper px-4 py-3 text-sm">
          <div className="flex justify-between">
            <span className="text-ink/60">Rate</span>
            <span className="font-mono">
              1 {fromSym} ≈ {fromPrice && toPrice ? (fromPrice / toPrice).toFixed(6) : "—"} {toSym}
            </span>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-ink/60">Route</span>
            <span className="font-mono">Jupiter v6</span>
          </div>
        </div>

        {connected ? (
          <button className="mt-5 w-full rounded-full border-[3px] border-ink bg-primary py-3 font-semibold text-ink shadow-[var(--shadow-brutal)] transition-transform hover:-translate-y-0.5">
            Review swap
          </button>
        ) : (
          <div className="vt-wallet mt-5 [&>button]:!w-full [&>button]:!justify-center">
            <WalletMultiButton>Connect wallet to swap</WalletMultiButton>
          </div>
        )}
      </div>
    </div>
  );
}

function TokenInput({
  label,
  symbol,
  onSymbolChange,
  amount,
  onAmountChange,
  readOnly,
  usd,
}: {
  label: string;
  symbol: string;
  onSymbolChange: (s: string) => void;
  amount: string;
  onAmountChange?: (v: string) => void;
  readOnly?: boolean;
  usd: number;
}) {
  return (
    <div className="rounded-2xl border-[3px] border-ink bg-paper p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-ink/60">
        <span>{label}</span>
        <span>≈ ${usd.toFixed(2)}</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="number"
          value={amount}
          readOnly={readOnly}
          onChange={(e) => onAmountChange?.(e.target.value)}
          className="w-full bg-transparent font-display text-4xl outline-none placeholder:text-ink/30"
          placeholder="0"
        />
        <select
          value={symbol}
          onChange={(e) => onSymbolChange(e.target.value)}
          className="rounded-full border-[3px] border-ink bg-card px-4 py-2 font-semibold shadow-[var(--shadow-brutal-sm)]"
        >
          {WATCH.map((t) => (
            <option key={t.id} value={t.symbol}>
              {t.symbol}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
