import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { usePrices, WATCH } from "@/components/app/data";

export const Route = createFileRoute("/app/markets")({
  component: MarketsPage,
});

function MarketsPage() {
  const { data: prices, isLoading } = usePrices();
  const [q, setQ] = useState("");

  const rows = WATCH.filter(
    (t) =>
      t.symbol.toLowerCase().includes(q.toLowerCase()) ||
      t.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Markets</p>
          <h1 className="mt-2 font-display text-5xl font-semibold">Live prices</h1>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tokens"
            className="w-64 rounded-full border-[3px] border-ink bg-card py-2 pl-9 pr-4 text-sm shadow-[var(--shadow-brutal-sm)] outline-none"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border-[3px] border-ink bg-card shadow-[var(--shadow-brutal)]">
        <table className="w-full text-sm">
          <thead className="border-b-[3px] border-ink bg-paper text-xs uppercase tracking-widest text-ink/60">
            <tr>
              <th className="px-5 py-3 text-left">Token</th>
              <th className="px-5 py-3 text-right">Price</th>
              <th className="px-5 py-3 text-right">24h</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y-[2px] divide-ink/10">
            {rows.map((t) => {
              const p = prices?.[t.id];
              const price = p?.usdPrice ?? 0;
              const chg = p?.priceChange24h ?? 0;
              const up = chg >= 0;
              return (
                <tr key={t.id} className="hover:bg-primary/5">
                  <td className="px-5 py-4">
                    <div className="font-semibold">{t.symbol}</div>
                    <div className="text-xs text-ink/60">{t.name}</div>
                  </td>
                  <td className="px-5 py-4 text-right font-mono">
                    {isLoading ? "…" : `$${price < 1 ? price.toFixed(6) : price.toFixed(2)}`}
                  </td>
                  <td className={`px-5 py-4 text-right ${up ? "text-primary" : "text-destructive"}`}>
                    <span className="inline-flex items-center gap-1">
                      {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {chg.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="rounded-full border-[2px] border-ink bg-primary px-3 py-1 text-xs font-semibold text-ink shadow-[var(--shadow-brutal-sm)]">
                      Trade
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
