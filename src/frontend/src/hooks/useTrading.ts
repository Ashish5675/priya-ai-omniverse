import { createActor } from "@/backend";
import type {
  Portfolio,
  StockPrice,
  StockSymbol,
  Transaction,
} from "@/backend";
import { TransactionAction } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { StockSymbol, StockPrice, Portfolio, Transaction };
export { TransactionAction };

export interface SimulatedStock {
  symbol: string;
  name: string;
  sector: string;
  basePrice: number;
}

export const SIMULATED_STOCKS: SimulatedStock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    sector: "Energy",
    basePrice: 2870,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    sector: "IT",
    basePrice: 4120,
  },
  { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking", basePrice: 1640 },
  { symbol: "INFY", name: "Infosys", sector: "IT", basePrice: 1890 },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    sector: "Banking",
    basePrice: 1240,
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever",
    sector: "FMCG",
    basePrice: 2750,
  },
  { symbol: "ITC", name: "ITC Limited", sector: "FMCG", basePrice: 460 },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    sector: "Banking",
    basePrice: 820,
  },
  {
    symbol: "BAJFINANCE",
    name: "Bajaj Finance",
    sector: "Finance",
    basePrice: 7800,
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    sector: "Telecom",
    basePrice: 1450,
  },
  { symbol: "AXISBANK", name: "Axis Bank", sector: "Banking", basePrice: 1180 },
  { symbol: "WIPRO", name: "Wipro", sector: "IT", basePrice: 560 },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki",
    sector: "Automobile",
    basePrice: 12500,
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical",
    sector: "Pharma",
    basePrice: 1720,
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors",
    sector: "Automobile",
    basePrice: 980,
  },
  {
    symbol: "POWERGRID",
    name: "Power Grid Corporation",
    sector: "Power",
    basePrice: 340,
  },
  {
    symbol: "ADANIENT",
    name: "Adani Enterprises",
    sector: "Conglomerate",
    basePrice: 2950,
  },
  {
    symbol: "NESTLEIND",
    name: "Nestle India",
    sector: "FMCG",
    basePrice: 2480,
  },
  {
    symbol: "HCLTECH",
    name: "HCL Technologies",
    sector: "IT",
    basePrice: 1890,
  },
  {
    symbol: "ONGC",
    name: "Oil & Natural Gas Corp",
    sector: "Energy",
    basePrice: 280,
  },
];

export function useGetStockSymbols() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StockSymbol[]>({
    queryKey: ["stockSymbols"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStockSymbols();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetStockPrice(symbol: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StockPrice>({
    queryKey: ["stockPrice", symbol],
    queryFn: async () => {
      if (!actor || !symbol) throw new Error("No actor or symbol");
      return actor.getStockPrice(symbol);
    },
    enabled: !!actor && !isFetching && !!symbol,
    refetchInterval: 30_000,
  });
}

export function useGetStockHistory(symbol: string, days: number) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StockPrice[]>({
    queryKey: ["stockHistory", symbol, days],
    queryFn: async () => {
      if (!actor || !symbol) return [];
      return actor.getStockHistory(symbol, BigInt(days));
    },
    enabled: !!actor && !isFetching && !!symbol,
  });
}

export function useExecuteSimulatedTrade() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    Transaction,
    Error,
    {
      userId: string;
      symbol: string;
      action: TransactionAction;
      quantity: number;
    }
  >({
    mutationFn: async ({ userId, symbol, action, quantity }) => {
      if (!actor) throw new Error("Not connected");
      return actor.executeSimulatedTrade(
        userId,
        symbol,
        action,
        BigInt(quantity),
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["portfolio", vars.userId] });
      qc.invalidateQueries({ queryKey: ["transactions", vars.userId] });
    },
  });
}

export function useGetPortfolio(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Portfolio>({
    queryKey: ["portfolio", userId],
    queryFn: async () => {
      if (!actor || !userId) throw new Error("No actor or userId");
      return actor.getPortfolio(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
    refetchInterval: 60_000,
  });
}

export function useGetTransactionHistory(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Transaction[]>({
    queryKey: ["transactions", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getTransactionHistory(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}
