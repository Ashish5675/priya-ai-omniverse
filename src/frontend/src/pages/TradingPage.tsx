import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SIMULATED_STOCKS,
  TransactionAction,
  useExecuteSimulatedTrade,
  useGetPortfolio,
  useGetStockHistory,
  useGetStockPrice,
  useGetStockSymbols,
  useGetTransactionHistory,
} from "@/hooks/useTrading";
import type { StockPrice, Transaction } from "@/hooks/useTrading";
import { cn } from "@/lib/utils";
import { useAriaStore } from "@/store/useAriaStore";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const RANGE_DAYS: Record<string, number> = {
  "1D": 1,
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
};

const PIE_COLORS = [
  "#00d4ff",
  "#a855f7",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#8b5cf6",
];

function formatPrice(n: number): string {
  return `₹${n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function KpiCard({
  label,
  value,
  sub,
  positive,
}: { label: string; value: string; sub?: string; positive?: boolean }) {
  return (
    <div className="glass-panel border border-primary/30 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
      <span
        className={cn(
          "text-2xl font-bold font-mono",
          positive === true
            ? "text-[#22c55e]"
            : positive === false
              ? "text-destructive"
              : "text-primary glow-cyan",
        )}
      >
        {value}
      </span>
      {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
    </div>
  );
}

function CandlestickBar(props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: StockPrice;
}) {
  const { x = 0, y = 0, width = 0, height = 0, payload } = props;
  if (!payload) return null;
  const isGreen = payload.close >= payload.open;
  const color = isGreen ? "#22c55e" : "#ef4444";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={Math.max(width - 2, 2)}
        height={Math.abs(height)}
        fill={color}
        opacity={0.8}
        rx={1}
      />
    </g>
  );
}

export function TradingPage() {
  const { currentUser } = useAriaStore();
  const userId = currentUser?.id ?? "demo-user";

  const [search, setSearch] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("TCS");
  const [range, setRange] = useState("1M");
  const [qty, setQty] = useState("10");
  const [txSort, setTxSort] = useState<"date" | "symbol" | "type">("date");

  const { data: backendSymbols } = useGetStockSymbols();
  const { data: price, isLoading: priceLoading } =
    useGetStockPrice(selectedSymbol);
  const { data: history, isLoading: histLoading } = useGetStockHistory(
    selectedSymbol,
    RANGE_DAYS[range],
  );
  const { data: portfolio, isLoading: portLoading } = useGetPortfolio(userId);
  const { data: transactions, isLoading: txLoading } =
    useGetTransactionHistory(userId);
  const tradeMutation = useExecuteSimulatedTrade();

  // Merge backend symbols with local fallback
  const stockList = useMemo(() => {
    if (backendSymbols && backendSymbols.length > 0) {
      return backendSymbols.map((s) => {
        const local = SIMULATED_STOCKS.find((l) => l.symbol === s.symbol);
        return {
          symbol: s.symbol,
          name: s.name,
          sector: s.sector,
          basePrice: local?.basePrice ?? 1000,
        };
      });
    }
    return SIMULATED_STOCKS;
  }, [backendSymbols]);

  const filteredStocks = useMemo(
    () =>
      stockList.filter(
        (s) =>
          s.symbol.toLowerCase().includes(search.toLowerCase()) ||
          s.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [stockList, search],
  );

  const selectedStock = stockList.find((s) => s.symbol === selectedSymbol);

  // Current price with fallback
  const currentPrice = price?.close ?? selectedStock?.basePrice ?? 0;
  const prevClose = price?.open ?? currentPrice;
  const changeAmt = currentPrice - prevClose;
  const changePct = prevClose > 0 ? (changeAmt / prevClose) * 100 : 0;

  // Chart data
  const chartData = useMemo(() => {
    if (!history || history.length === 0) {
      // Generate synthetic fallback data
      const base = selectedStock?.basePrice ?? 1000;
      return Array.from(
        { length: RANGE_DAYS[range] > 30 ? 30 : RANGE_DAYS[range] },
        (_, i) => ({
          date: new Date(
            Date.now() -
              (RANGE_DAYS[range] > 30 ? 30 : RANGE_DAYS[range] - i - 1) *
                86_400_000,
          ).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
          open: base + Math.sin(i * 0.4) * base * 0.03,
          close: base + Math.sin(i * 0.4 + 0.1) * base * 0.035,
          high: base + Math.abs(Math.sin(i * 0.4)) * base * 0.05,
          low: base - Math.abs(Math.sin(i * 0.4)) * base * 0.02,
          volume: Math.floor(1_000_000 + Math.random() * 2_000_000),
        }),
      );
    }
    return history.map((h) => ({
      date: formatDate(h.date),
      open: h.open,
      close: h.close,
      high: h.high,
      low: h.low,
      volume: Number(h.volume),
    }));
  }, [history, selectedStock, range]);

  // Portfolio analytics
  const holdings = portfolio?.holdings ?? [];

  const totalValue = portfolio?.totalValue ?? 0;
  const portfolioComposition = holdings.map((h) => ({
    name: h.symbol,
    value:
      Number(h.quantity) *
      (price?.close ?? selectedStock?.basePrice ?? h.avgCost),
  }));

  // Gain/loss simulation over 30 days
  const gainLossData = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        day: `D${i + 1}`,
        value: totalValue * (0.95 + Math.sin(i * 0.3) * 0.05 + i * 0.002),
      })),
    [totalValue],
  );

  // Sector breakdown
  const sectorMap: Record<string, number> = {};
  for (const h of holdings) {
    const stock = stockList.find((s) => s.symbol === h.symbol);
    const sector = stock?.sector ?? "Other";
    sectorMap[sector] =
      (sectorMap[sector] ?? 0) + Number(h.quantity) * h.avgCost;
  }
  const sectorData = Object.entries(sectorMap).map(([name, value]) => ({
    name,
    value: Math.round(value),
  }));

  // Top performers (by simulated change)
  const topPerformers = stockList.slice(0, 8).map((s, i) => ({
    symbol: s.symbol,
    change: Math.round((Math.sin(i * 1.3) * 5 + 2) * 100) / 100,
  }));

  // Holdings enriched
  const enrichedHoldings = holdings.map((h) => {
    const curPrice =
      stockList.find((s) => s.symbol === h.symbol)?.basePrice ?? h.avgCost;
    const curVal = Number(h.quantity) * curPrice;
    const costVal = Number(h.quantity) * h.avgCost;
    const pnl = curVal - costVal;
    const pnlPct = costVal > 0 ? (pnl / costVal) * 100 : 0;
    return { ...h, curPrice, curVal, pnl, pnlPct };
  });

  const totalPnl = enrichedHoldings.reduce((s, h) => s + h.pnl, 0);
  const winRate =
    enrichedHoldings.length > 0
      ? (enrichedHoldings.filter((h) => h.pnl >= 0).length /
          enrichedHoldings.length) *
        100
      : 0;

  // Sorted transactions
  const sortedTx: Transaction[] = useMemo(() => {
    if (!transactions) return [];
    return [...transactions].sort((a, b) => {
      if (txSort === "date") return Number(b.timestamp - a.timestamp);
      if (txSort === "symbol") return a.symbol.localeCompare(b.symbol);
      if (txSort === "type")
        return a.action.toString().localeCompare(b.action.toString());
      return 0;
    });
  }, [transactions, txSort]);

  function handleTrade(action: TransactionAction) {
    const quantity = Number.parseInt(qty);
    if (!quantity || quantity <= 0) {
      toast.error("Enter a valid quantity");
      return;
    }
    tradeMutation.mutate(
      { userId, symbol: selectedSymbol, action, quantity },
      {
        onSuccess: () =>
          toast.success(
            `Trade recorded (Simulation Only) — ${action.toString().toUpperCase()} ${quantity} × ${selectedSymbol}`,
          ),
        onError: () => toast.error("Trade failed. Please try again."),
      },
    );
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground p-4 md:p-6 space-y-6"
      data-ocid="trading.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary glow-cyan font-display">
            Trading Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Indian Market · Simulation Mode Only
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-yellow-400/50 text-yellow-400 bg-yellow-400/10 px-4 py-1.5 text-xs font-mono tracking-widest self-start sm:self-auto"
        >
          ⚠ SIMULATION ONLY
        </Badge>
      </motion.div>

      {/* Search + Stock List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <Input
            data-ocid="trading.search_input"
            placeholder="Search stocks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card border-primary/30 text-foreground placeholder:text-muted-foreground focus:ring-primary"
          />
          <div
            className="space-y-1 max-h-[360px] overflow-y-auto pr-1"
            data-ocid="trading.list"
          >
            {filteredStocks.map((s, i) => (
              <button
                key={s.symbol}
                type="button"
                data-ocid={`trading.stock.item.${i + 1}`}
                onClick={() => setSelectedSymbol(s.symbol)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer",
                  selectedSymbol === s.symbol
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card hover:border-primary/50 hover:bg-card/80",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold">
                    {s.symbol}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0"
                  >
                    {s.sector}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {s.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Stock Details + Chart */}
        <div className="lg:col-span-3 space-y-4">
          {/* Stock Card */}
          <Card className="glass-panel border-primary/30 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-mono text-foreground">
                    {selectedSymbol}
                  </h2>
                  <Badge className="bg-yellow-400/15 text-yellow-400 border-yellow-400/30 text-[10px] tracking-widest">
                    SIMULATION ONLY
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {selectedStock?.name}
                </p>
              </div>
              <div className="text-right">
                {priceLoading ? (
                  <Skeleton className="h-8 w-32 ml-auto" />
                ) : (
                  <>
                    <div className="text-2xl font-bold font-mono text-primary">
                      {formatPrice(currentPrice)}
                    </div>
                    <div
                      className={cn(
                        "text-sm font-mono",
                        changeAmt >= 0 ? "text-[#22c55e]" : "text-destructive",
                      )}
                    >
                      {changeAmt >= 0 ? "+" : ""}
                      {formatPrice(changeAmt)} ({changePct.toFixed(2)}%)
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="text-xs text-center">
                <div className="text-muted-foreground">Open</div>
                <div className="font-mono text-sm">
                  {formatPrice(price?.open ?? 0)}
                </div>
              </div>
              <div className="text-xs text-center">
                <div className="text-muted-foreground">High</div>
                <div className="font-mono text-sm text-[#22c55e]">
                  {formatPrice(price?.high ?? 0)}
                </div>
              </div>
              <div className="text-xs text-center">
                <div className="text-muted-foreground">Low</div>
                <div className="font-mono text-sm text-destructive">
                  {formatPrice(price?.low ?? 0)}
                </div>
              </div>
              <div className="text-xs text-center">
                <div className="text-muted-foreground">Volume</div>
                <div className="font-mono text-sm">
                  {price ? Number(price.volume).toLocaleString("en-IN") : "—"}
                </div>
              </div>
            </div>
          </Card>

          {/* Time Range + Candlestick Chart */}
          <Card className="glass-panel border-primary/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Price History
              </h3>
              <Tabs value={range} onValueChange={setRange}>
                <TabsList className="bg-card border border-primary/20 h-7">
                  {Object.keys(RANGE_DAYS).map((r) => (
                    <TabsTrigger
                      key={r}
                      value={r}
                      data-ocid={`trading.range.tab.${r}`}
                      className="text-xs px-2 py-0.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                    >
                      {r}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            {histLoading ? (
              <Skeleton
                className="h-52 w-full"
                data-ocid="trading.chart.loading_state"
              />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart
                  data={chartData}
                  margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,212,255,0.08)"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    domain={["auto", "auto"]}
                    tickFormatter={(v: number) =>
                      `₹${v.toLocaleString("en-IN")}`
                    }
                    width={70}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0f1117",
                      border: "1px solid rgba(0,212,255,0.3)",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: number) => formatPrice(v)}
                    labelStyle={{ color: "#00d4ff" }}
                  />
                  <Bar
                    dataKey="close"
                    shape={<CandlestickBar />}
                    isAnimationActive={false}
                  >
                    {chartData.map((entry, idx) => (
                      <Cell
                        key={`chart-${idx}-${entry.date}`}
                        fill={entry.close >= entry.open ? "#22c55e" : "#ef4444"}
                      />
                    ))}
                  </Bar>
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke="#00d4ff"
                    fill="rgba(0,212,255,0.05)"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </Card>

          {/* Buy / Sell Panel */}
          <Card className="glass-panel border-primary/30 p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Trade · <span className="text-yellow-400">Simulation Only</span>
            </h3>
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="trading-qty"
                  className="text-xs text-muted-foreground"
                >
                  Quantity
                </label>
                <Input
                  id="trading-qty"
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  data-ocid="trading.qty.input"
                  className="w-28 bg-card border-primary/30 font-mono"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Est. Value
                </span>
                <div className="text-sm font-mono text-primary pt-1">
                  {formatPrice(currentPrice * (Number.parseInt(qty) || 0))}
                </div>
              </div>
              <div className="flex gap-2 ml-auto">
                <Button
                  type="button"
                  data-ocid="trading.buy.primary_button"
                  onClick={() => handleTrade(TransactionAction.buy)}
                  disabled={tradeMutation.isPending}
                  className="bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] hover:bg-[#22c55e]/30 font-mono"
                  variant="outline"
                >
                  ↑ BUY
                </Button>
                <Button
                  type="button"
                  data-ocid="trading.sell.secondary_button"
                  onClick={() => handleTrade(TransactionAction.sell)}
                  disabled={tradeMutation.isPending}
                  className="bg-destructive/10 border border-destructive/40 text-destructive hover:bg-destructive/20 font-mono"
                  variant="outline"
                >
                  ↓ SELL
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Portfolio KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <KpiCard
          label="Portfolio Value"
          value={portLoading ? "…" : formatPrice(totalValue)}
        />
        <KpiCard
          label="Total P&L"
          value={portLoading ? "…" : formatPrice(totalPnl)}
          positive={totalPnl >= 0}
        />
        <KpiCard
          label="Win Rate"
          value={portLoading ? "…" : `${winRate.toFixed(0)}%`}
          positive={winRate >= 50}
        />
        <KpiCard
          label="Holdings"
          value={portLoading ? "…" : String(holdings.length)}
          sub="positions"
        />
      </motion.div>

      {/* Holdings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-panel border-primary/30 overflow-hidden">
          <div className="p-4 border-b border-primary/15">
            <h3 className="font-semibold text-foreground">
              Portfolio Holdings
            </h3>
          </div>
          {portLoading ? (
            <div
              className="p-4 space-y-2"
              data-ocid="trading.holdings.loading_state"
            >
              {["h1", "h2", "h3"].map((k) => (
                <Skeleton key={k} className="h-10 w-full" />
              ))}
            </div>
          ) : enrichedHoldings.length === 0 ? (
            <div
              className="p-8 text-center text-muted-foreground"
              data-ocid="trading.holdings.empty_state"
            >
              <div className="text-4xl mb-2">📊</div>
              <p className="font-medium">No holdings yet</p>
              <p className="text-sm">
                Execute a simulated trade to see your portfolio here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/10 bg-card">
                    {[
                      "Symbol",
                      "Qty",
                      "Avg Cost",
                      "Current",
                      "Value",
                      "P&L",
                      "P&L %",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enrichedHoldings.map((h, i) => (
                    <tr
                      key={h.symbol}
                      data-ocid={`trading.holdings.item.${i + 1}`}
                      className="border-b border-primary/5 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-primary">
                        {h.symbol}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {String(h.quantity)}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {formatPrice(h.avgCost)}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {formatPrice(h.curPrice)}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {formatPrice(h.curVal)}
                      </td>
                      <td
                        className={cn(
                          "px-4 py-3 font-mono font-semibold",
                          h.pnl >= 0 ? "text-[#22c55e]" : "text-destructive",
                        )}
                      >
                        {h.pnl >= 0 ? "+" : ""}
                        {formatPrice(h.pnl)}
                      </td>
                      <td
                        className={cn(
                          "px-4 py-3 font-mono",
                          h.pnlPct >= 0 ? "text-[#22c55e]" : "text-destructive",
                        )}
                      >
                        {h.pnlPct >= 0 ? "+" : ""}
                        {h.pnlPct.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Power BI Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="text-lg font-bold text-primary glow-cyan mb-4">
          Power BI Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Portfolio Composition PieChart */}
          <Card className="glass-panel border-primary/30 p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Portfolio Composition
            </h3>
            {portfolioComposition.length === 0 ? (
              <div
                className="h-48 flex items-center justify-center text-muted-foreground text-sm"
                data-ocid="trading.pie.empty_state"
              >
                No holdings data
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={portfolioComposition}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    stroke="none"
                  >
                    {portfolioComposition.map((entry, idx) => (
                      <Cell
                        key={`pie-${entry.name ?? idx}`}
                        fill={PIE_COLORS[idx % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#0f1117",
                      border: "1px solid rgba(0,212,255,0.3)",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: number) => formatPrice(v)}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>

          {/* Gain/Loss LineChart */}
          <Card className="glass-panel border-primary/30 p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Portfolio Value — 30 Days
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={gainLossData}
                margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,212,255,0.08)"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0f1117",
                    border: "1px solid rgba(0,212,255,0.3)",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                  formatter={(v: number) => formatPrice(v)}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00d4ff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Performers BarChart */}
          <Card className="glass-panel border-primary/30 p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Top Performers (Simulated)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={topPerformers}
                margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,212,255,0.08)"
                />
                <XAxis
                  dataKey="symbol"
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `${v}%`}
                  width={35}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0f1117",
                    border: "1px solid rgba(0,212,255,0.3)",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                  formatter={(v: number) => `${v}%`}
                />
                <Bar dataKey="change" radius={[4, 4, 0, 0]}>
                  {topPerformers.map((entry, idx) => (
                    <Cell
                      key={`top-${entry.symbol ?? idx}`}
                      fill={entry.change >= 0 ? "#22c55e" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Sector Breakdown BarChart */}
          <Card className="glass-panel border-primary/30 p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Sector Breakdown
            </h3>
            {sectorData.length === 0 ? (
              <div
                className="h-48 flex items-center justify-center text-muted-foreground text-sm"
                data-ocid="trading.sector.empty_state"
              >
                No sector data
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={sectorData}
                  layout="vertical"
                  margin={{ top: 4, right: 4, left: 60, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,212,255,0.08)"
                  />
                  <XAxis
                    type="number"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "#9ca3af", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0f1117",
                      border: "1px solid rgba(0,212,255,0.3)",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: number) => formatPrice(v)}
                  />
                  <Bar dataKey="value" fill="#a855f7" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-panel border-primary/30 overflow-hidden">
          <div className="p-4 border-b border-primary/15 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold text-foreground">
              Transaction History
            </h3>
            <div className="flex gap-2">
              {(["date", "symbol", "type"] as const).map((col) => (
                <button
                  key={col}
                  type="button"
                  data-ocid={`trading.tx.sort.${col}`}
                  onClick={() => setTxSort(col)}
                  className={cn(
                    "text-xs px-3 py-1 rounded-full border transition-colors",
                    txSort === col
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:border-primary/40",
                  )}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {txLoading ? (
            <div className="p-4 space-y-2" data-ocid="trading.tx.loading_state">
              {["t1", "t2", "t3", "t4"].map((k) => (
                <Skeleton key={k} className="h-10 w-full" />
              ))}
            </div>
          ) : sortedTx.length === 0 ? (
            <div
              className="p-8 text-center text-muted-foreground"
              data-ocid="trading.tx.empty_state"
            >
              <div className="text-4xl mb-2">📋</div>
              <p className="font-medium">No transactions yet</p>
              <p className="text-sm">Your simulated trades will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/10 bg-card">
                    {["Date", "Symbol", "Action", "Qty", "Price", "Note"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {sortedTx.map((tx, i) => (
                    <tr
                      key={tx.id}
                      data-ocid={`trading.tx.item.${i + 1}`}
                      className="border-b border-primary/5 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                        {new Date(
                          Number(tx.timestamp) / 1_000_000,
                        ).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-primary">
                        {tx.symbol}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] font-mono tracking-widest",
                            tx.action.toString() === "buy"
                              ? "border-[#22c55e]/40 text-[#22c55e] bg-[#22c55e]/10"
                              : "border-destructive/40 text-destructive bg-destructive/10",
                          )}
                        >
                          {tx.action.toString().toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {String(tx.quantity)}
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {formatPrice(tx.price)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className="text-[10px] border-yellow-400/30 text-yellow-400 bg-yellow-400/5 font-mono"
                        >
                          {tx.note || "[Simulation Only]"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
