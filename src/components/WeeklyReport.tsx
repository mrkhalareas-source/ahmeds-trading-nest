import { CalendarDays, CheckCircle2, Send, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_MAIN = "https://t.me/tradewithahmedofficial";

export type Trade = { pair: string; side: "BUY" | "SELL"; pips: number };

export type WeeklyResults = {
  brand: string;
  dateRange: string;
  trades: number;
  wins: number;
  losses: number;
  totalProfitPips: number;
  totalLossPips: number;
  winningTrades: Trade[];
  losingTrades: Trade[];
};

const DEFAULT_RESULTS: WeeklyResults = {
  brand: "TRADE WITH AHMED - TRADEWITHAHMED.SITE",
  dateRange: "14 - 18 SEP 2026",
  trades: 32,
  wins: 26,
  losses: 6,
  totalProfitPips: 6480,
  totalLossPips: 1200,
  winningTrades: [
    { pair: "XAUUSD", side: "BUY", pips: 250 },
    { pair: "XAUUSD", side: "SELL", pips: 180 },
    { pair: "XAUUSD", side: "BUY", pips: 320 },
    { pair: "XAUUSD", side: "SELL", pips: 150 },
    { pair: "XAUUSD", side: "BUY", pips: 400 },
    { pair: "XAUUSD", side: "SELL", pips: 120 },
    { pair: "XAUUSD", side: "BUY", pips: 280 },
    { pair: "XAUUSD", side: "SELL", pips: 200 },
    { pair: "XAUUSD", side: "BUY", pips: 350 },
    { pair: "XAUUSD", side: "SELL", pips: 160 },
    { pair: "XAUUSD", side: "BUY", pips: 290 },
    { pair: "XAUUSD", side: "SELL", pips: 140 },
    { pair: "XAUUSD", side: "BUY", pips: 380 },
    { pair: "XAUUSD", side: "SELL", pips: 220 },
    { pair: "XAUUSD", side: "BUY", pips: 170 },
    { pair: "XAUUSD", side: "SELL", pips: 300 },
    { pair: "XAUUSD", side: "BUY", pips: 110 },
    { pair: "XAUUSD", side: "SELL", pips: 340 },
    { pair: "XAUUSD", side: "BUY", pips: 260 },
    { pair: "XAUUSD", side: "SELL", pips: 130 },
    { pair: "XAUUSD", side: "BUY", pips: 410 },
    { pair: "XAUUSD", side: "SELL", pips: 190 },
    { pair: "XAUUSD", side: "BUY", pips: 280 },
    { pair: "XAUUSD", side: "SELL", pips: 150 },
    { pair: "XAUUSD", side: "BUY", pips: 320 },
    { pair: "XAUUSD", side: "SELL", pips: 380 },
  ],
  losingTrades: [
    { pair: "XAUUSD", side: "BUY", pips: -80 },
    { pair: "XAUUSD", side: "SELL", pips: -150 },
    { pair: "XAUUSD", side: "BUY", pips: -100 },
    { pair: "XAUUSD", side: "SELL", pips: -250 },
    { pair: "XAUUSD", side: "BUY", pips: -220 },
    { pair: "XAUUSD", side: "SELL", pips: -400 },
  ],
};

const fmt = (n: number) => `${n > 0 ? "+" : n < 0 ? "-" : ""}${Math.abs(n).toLocaleString()}`;

export function WeeklyReport({ results = DEFAULT_RESULTS }: { results?: WeeklyResults }) {
  const net = results.totalProfitPips - results.totalLossPips;
  const winRate = results.trades ? Math.round((results.wins / results.trades) * 100) : 0;

  const metrics = [
    { label: "Trades", value: String(results.trades), tone: "text-foreground" },
    { label: "Wins", value: String(results.wins), tone: "text-accent" },
    { label: "Losses", value: String(results.losses), tone: "text-destructive" },
    { label: "Win Rate", value: `${winRate}%`, tone: "text-primary" },
  ];

  const breakdown = [
    { label: "Total Profit", value: `${fmt(results.totalProfitPips)} PIPS`, tone: "text-accent" },
    { label: "Total Loss", value: `${fmt(-results.totalLossPips)} PIPS`, tone: "text-destructive" },
    { label: "Net Gain", value: `${fmt(net)} PIPS`, tone: "text-primary" },
  ];

  return (
    <section id="weekly-report" className="relative">
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-5">
        <div className="performance-shell overflow-hidden">
          {/* Top bar */}
          <div className="flex flex-col gap-4 border-b border-border bg-background/45 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Financial Intelligence</span>
              <p className="mt-1 text-sm font-semibold text-foreground">{results.brand}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Report
              </span>
              <span className="inline-flex items-center gap-1.5 border-l border-border pl-3 text-xs font-medium text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" /> {results.dateRange}
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="px-5 py-9 text-center sm:px-8">
            <span className="inline-flex rounded-full border border-accent/50 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Official Weekly Report
            </span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
              PREMIUM GROUP <span className="text-gradient-gold">RESULTS</span>
            </h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Total Net Profit
            </p>
            <p className="mt-4 font-mono text-5xl font-extrabold tabular-nums text-primary sm:text-6xl">
              {fmt(net)} PIPS
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 px-5 pb-6 sm:px-8 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="metric-cell p-4 text-left"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {m.label}
                </p>
                <p className={`mt-2 font-mono text-2xl font-bold tabular-nums ${m.tone}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Pips breakdown */}
          <div className="grid gap-4 px-5 pb-8 sm:px-8 lg:grid-cols-3">
            {breakdown.map((b) => (
              <div
                key={b.label}
                className="metric-cell border-accent/20 bg-accent/5 p-5 text-left"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{b.label}</p>
                <p className={`mt-2 font-mono text-2xl font-bold tabular-nums ${b.tone}`}>{b.value}</p>
              </div>
            ))}
          </div>

          {/* Winning trades */}
          <div className="px-5 pb-6 sm:px-8">
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
                  <CheckCircle2 className="mr-1 inline h-4 w-4 -mt-0.5" /> Winning Trades ({results.winningTrades.length} Trades)
                </h3>
                <span className="rounded-full border border-accent/45 bg-accent/10 px-3 py-1 text-sm font-bold text-accent">
                  {fmt(results.totalProfitPips)} PIPS
                </span>
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {results.winningTrades.map((t, i) => (
                  <li
                    key={`win-${i}`}
                    className="flex items-center justify-between rounded-md border border-border bg-background/55 px-3 py-2 text-xs"
                  >
                    <span className="text-muted-foreground">
                      ✓ {t.pair} {t.side}
                    </span>
                    <span className="font-mono font-semibold tabular-nums text-accent">{fmt(t.pips)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Losing trades */}
          <div className="px-5 pb-8 sm:px-8">
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-destructive">
                  <XCircle className="inline h-4 w-4 -mt-0.5" /> Losing Trades ({results.losingTrades.length} Trades)
                </h3>
                <span className="rounded-full border border-destructive/45 bg-destructive/10 px-3 py-1 text-sm font-bold text-destructive">
                  {fmt(-results.totalLossPips)} PIPS
                </span>
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {results.losingTrades.map((t, i) => (
                  <li
                    key={`loss-${i}`}
                    className="flex items-center justify-between rounded-md border border-border bg-background/55 px-3 py-2 text-xs"
                  >
                    <span className="text-muted-foreground">
                      <XCircle className="inline h-3.5 w-3.5 text-destructive" /> {t.pair} {t.side}
                    </span>
                    <span className="font-mono font-semibold tabular-nums text-destructive">{fmt(t.pips)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-background/45 px-5 py-6 sm:px-8">
            <div className="flex items-center justify-center gap-2 rounded-md border border-accent/25 bg-accent/10 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-accent">
              <ShieldCheck className="h-4 w-4 shrink-0" /> The market rewards discipline, not emotions.
            </div>
            <Button asChild variant="cta" size="xl" className="mt-6 w-full">
              <a href={TELEGRAM_MAIN} target="_blank" rel="noopener noreferrer">
                <Send />
                <span className="sm:hidden">JOIN TELEGRAM</span>
                <span className="hidden sm:inline">JOIN TELEGRAM: @tradewithahmedofficial</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
