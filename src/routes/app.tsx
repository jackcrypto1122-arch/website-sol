import { createFileRoute } from "@tanstack/react-router";
import { SolanaProviders } from "@/components/app/SolanaProviders";
import { AppShell } from "@/components/app/AppShell";
import "@/components/app/wallet-overrides.css";

export const Route = createFileRoute("/app")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Solvox — dApp" },
      { name: "description", content: "Trade Solana tokens with your voice. Connect your wallet to get started." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppLayout,
});

function AppLayout() {
  return (
    <SolanaProviders>
      <AppShell />
    </SolanaProviders>
  );
}
