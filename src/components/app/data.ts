import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";

const WATCH = [
  { id: "So11111111111111111111111111111111111111112", symbol: "SOL", name: "Solana" },
  { id: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", symbol: "USDC", name: "USD Coin" },
  { id: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", symbol: "JUP", name: "Jupiter" },
  { id: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", symbol: "BONK", name: "Bonk" },
];

async function fetchPrices() {
  const ids = WATCH.map((w) => w.id).join(",");
  const res = await fetch(`https://lite-api.jup.ag/price/v3?ids=${ids}`);
  if (!res.ok) throw new Error("price fetch failed");
  return (await res.json()) as Record<string, { usdPrice: number; priceChange24h?: number }>;
}

export function usePrices() {
  return useQuery({
    queryKey: ["jup-prices"],
    queryFn: fetchPrices,
    refetchInterval: 20_000,
    staleTime: 15_000,
  });
}

export function useSolBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }
    let cancelled = false;
    connection
      .getBalance(publicKey)
      .then((lamports) => !cancelled && setBalance(lamports / LAMPORTS_PER_SOL))
      .catch(() => !cancelled && setBalance(null));
    return () => {
      cancelled = true;
    };
  }, [connection, publicKey]);

  return balance;
}

export { WATCH };
