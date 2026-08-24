import { CalendarDays, Send, XCircle } from "lucide-react";
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
  dateRange: "17 - 21 AUG 2026",
  trades: 25,
  wins: 21,
  losses: 4,
  totalProfitPips: 4100,
  totalLossPips: 350,
  winningTrades: [
    { pair: "XAUUSD", side: "BUY", pips: 100 },
    { pair: "XAUUSD", side: "SELL", pips: 180 },
    { pair: "XAUUSD", side: "BUY", pips: 600 },
    { pair: "XAUUSD", side: "SELL", pips: 150 },
    { pair: "XAUUSD", side: "BUY", pips: 220 },
    { pair: "XAUUSD", side: "SELL", pips: 90 },
    { pair: "XAUUSD", side: "BUY", pips: 310 },
    { pair: "XAUUSD", side: "SELL", pips: 260 },
    { pair: "XAUUSD", side: "BUY", pips: 140 },
    { pair: "XAUUSD", side: "SELL", pips: 200 },
    { pair: "XAUUSD", side: "BUY", pips: 175 },
    { pair: "XAUUSD", side: "SELL", pips: 120 },
    { pair: "XAUUSD", side: "BUY", pips: 240 },
    { pair: "XAUUSD", side: "SELL", pips: 95 },
    { pair: "XAUUSD", side: "BUY", pips: 330 },
    { pair: "XAUUSD", side: "SELL", pips: 160 },
    { pair: "XAUUSD", side: "BUY", pips: 110 },
    { pair: "XAUUSD", side: "SELL", pips: 210 },
    { pair: "XAUUSD", side: "BUY", pips: 185 },
    { pair: "XAUUSD", side: "SELL", pips: 130 },
    { pair: "XAUUSD", side: "BUY", pips: 94 },
  ],
  losingTrades: [
    { pair: "XAUUSD", side: "BUY", pips: -50 },
    { pair: "XAUUSD", side: "SELL", pips: -130 },
    { pair: "XAUUSD", side: "BUY", pips: -80 },
    { pair: "XAUUSD", side: "SELL", pips: -90 },
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
      <div className="mx-auto max-w-5xl px-5 py-20">
        <div className="overflow-hidden rounded-2xl border border-accent/30 bg-card/70 shadow-[0_0_60px_-30px_var(--accent)] backdrop-blur-xl">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-background/60 px-5 py-4">
            <span className="text-xs font-semibold tracking-[0.16em] text-muted-foreground sm:text-sm">
              {results.brand}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/45 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <CalendarDays className="h-3.5 w-3.5" /> {results.dateRange}
            </span>
          </div>

          {/* Header */}
          <div className="px-5 py-10 text-center sm:px-8">
            <span className="inline-flex rounded-full border border-accent/50 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Official Weekly Report
            </span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
              PREMIUM GROUP <span className="text-gradient-gold">RESULTS</span>
            </h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Total Net Profit
            </p>
            <p className="mt-4 font-display text-5xl font-extrabold text-primary drop-shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_45%,transparent)] sm:text-6xl">
              {fmt(net)} PIPS
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 px-5 pb-6 sm:px-8 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-background/50 p-4 text-center"
              >
                <p className={`font-display text-2xl font-bold ${m.tone}`}>{m.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* Pips breakdown */}
          <div className="grid gap-4 px-5 pb-8 sm:px-8 lg:grid-cols-3">
            {breakdown.map((b) => (
              <div
                key={b.label}
                className="rounded-xl border border-border bg-background/50 p-5 text-center"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{b.label}</p>
                <p className={`mt-2 font-display text-2xl font-bold ${b.tone}`}>{b.value}</p>
              </div>
            ))}
          </div>

          {/* Winning trades */}
          <div className="px-5 pb-6 sm:px-8">
            <div className="rounded-xl border border-accent/35 bg-accent/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
                  ✔ Winning Trades ({results.winningTrades.length} Trades)
                </h3>
                <span className="rounded-full border border-accent/45 bg-accent/10 px-3 py-1 text-sm font-bold text-accent">
                  {fmt(results.totalProfitPips)} PIPS
                </span>
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {results.winningTrades.map((t, i) => (
                  <li
                    key={`win-${i}`}
                    className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2 text-sm"
                  >
                    <span className="text-muted-foreground">
                      ✓ {t.pair} {t.side}
                    </span>
                    <span className="font-semibold text-accent">{fmt(t.pips)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Losing trades */}
          <div className="px-5 pb-8 sm:px-8">
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5">
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
                    className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2 text-sm"
                  >
                    <span className="text-muted-foreground">
                      <XCircle className="inline h-3.5 w-3.5 text-destructive" /> {t.pair} {t.side}
                    </span>
                    <span className="font-semibold text-destructive">{fmt(t.pips)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border/70 bg-background/60 px-5 py-8 text-center sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              The market rewards discipline, not emotions.
            </p>
            <Button asChild variant="cta" size="xl" className="mt-6 w-full">
              <a href={TELEGRAM_MAIN} target="_blank" rel="noopener noreferrer">
                <Send /> JOIN TELEGRAM: @tradewithahmedofficial
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
