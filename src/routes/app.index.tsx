import { createFileRoute, Link } from "@tanstack/react-router";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ArrowUpRight, Mic, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { usePrices, useSolBalance, WATCH } from "@/components/app/data";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[20px] border-[3px] border-ink bg-card p-5 shadow-[var(--shadow-brutal)] ${className}`}
    >
      {children}
    </div>
  );
}

function Dashboard() {
  const { publicKey, connected } = useWallet();
  const sol = useSolBalance();
  const { data: prices } = usePrices();

  const solPrice = prices?.[WATCH[0].id]?.usdPrice ?? 0;
  const portfolio = (sol ?? 0) * solPrice;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Portfolio</p>
          <h1 className="font-display text-5xl font-semibold md:text-6xl">
            {connected ? `$${portfolio.toFixed(2)}` : "—"}
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            {connected && publicKey
              ? `${publicKey.toBase58().slice(0, 4)}…${publicKey.toBase58().slice(-4)}`
              : "Connect a wallet to see your balances"}
          </p>
        </div>
        {!connected && (
          <div className="vt-wallet">
            <WalletMultiButton />
          </div>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Card>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/60">
            <Wallet className="h-3.5 w-3.5" /> SOL Balance
          </div>
          <div className="mt-3 font-display text-4xl">
            {sol !== null ? sol.toFixed(4) : "0.0000"}
          </div>
          <div className="mt-1 text-sm text-ink/60">≈ ${((sol ?? 0) * solPrice).toFixed(2)}</div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/60">
            <TrendingUp className="h-3.5 w-3.5" /> SOL Price
          </div>
          <div className="mt-3 font-display text-4xl">${solPrice.toFixed(2)}</div>
          <div className="mt-1 text-sm text-primary">Live · Jupiter</div>
        </Card>
        <Card className="bg-primary/10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/60">
            <Mic className="h-3.5 w-3.5" /> Quick Trade
          </div>
          <p className="mt-3 font-display text-2xl leading-tight">
            "Swap 1 SOL for USDC"
          </p>
          <Link
            to="/app/voice"
            className="mt-4 inline-flex items-center gap-1 rounded-full border-[3px] border-ink bg-ink px-4 py-2 text-sm font-semibold text-card shadow-[var(--shadow-brutal-sm)] transition-transform hover:-translate-y-0.5"
          >
            Open voice <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">Watchlist</h2>
          <Link to="/app/markets" className="text-sm text-ink/60 underline underline-offset-4">
            All markets →
          </Link>
        </div>
        <div className="divide-y-[2px] divide-ink/10">
          {WATCH.map((t) => {
            const p = prices?.[t.id];
            const price = p?.usdPrice ?? 0;
            const chg = p?.priceChange24h ?? 0;
            const up = chg >= 0;
            return (
              <div key={t.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold">{t.symbol}</div>
                  <div className="text-xs text-ink/60">{t.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${price < 1 ? price.toFixed(6) : price.toFixed(2)}</div>
                  <div
                    className={`flex items-center justify-end gap-1 text-xs ${up ? "text-primary" : "text-destructive"}`}
                  >
                    {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {chg.toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
