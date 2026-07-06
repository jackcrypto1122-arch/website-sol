import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LayoutDashboard, Mic, ArrowLeftRight, LineChart } from "lucide-react";
import type { ComponentType } from "react";

const NAV: { to: string; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/voice", label: "Voice", icon: Mic },
  { to: "/app/swap", label: "Swap", icon: ArrowLeftRight },
  { to: "/app/markets", label: "Markets", icon: LineChart },
];

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/app" ? pathname === "/app" : pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl border-[3px] border-ink bg-primary shadow-[var(--shadow-brutal-sm)]">
              <Mic className="h-4 w-4 text-ink" />
            </div>
            <span className="font-display text-2xl font-semibold leading-none">
              Sol<span className="text-primary">vox</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border-[3px] border-ink bg-card p-1 shadow-[var(--shadow-brutal-sm)] md:flex">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive(to)
                    ? "bg-ink text-card"
                    : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="vt-wallet">
            <WalletMultiButton />
          </div>
        </div>

        {/* mobile nav */}
        <nav className="flex items-center gap-1 overflow-x-auto border-t-[3px] border-ink bg-card px-3 py-2 md:hidden">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
                isActive(to) ? "bg-ink text-card" : "text-ink/70"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <Outlet />
      </main>

      <footer className="border-t-[3px] border-ink bg-card/50 py-6 text-center text-xs text-ink/60">
        Solvox dApp · Solana Mainnet · Not financial advice
      </footer>
    </div>
  );
}
