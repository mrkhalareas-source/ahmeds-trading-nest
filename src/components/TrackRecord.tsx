import { CalendarDays, Compass, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_ADMIN = "https://t.me/tradewithahmedofficial";

export type WeekResult = {
  dateRange: string;
  gain: string;
  pips: string;
  winRate: string;
  image?: string;
};

const LATEST: WeekResult = {
  dateRange: "14 - 18 SEP  2026",
  gain: "+18.4%",
  pips: "+5,280",
  winRate: "81%",
};

export function TrackRecord({ week = LATEST }: { week?: WeekResult }) {
  const stats = [
    { label: "Gain", value: week.gain, tone: "text-accent" },
    { label: "Pips Gained", value: week.pips, tone: "text-primary" },
    { label: "Win Rate", value: week.winRate, tone: "text-foreground" },
  ];

  return (
    <section id="track-record" className="relative">
      <div className="mx-auto max-w-5xl px-5 pb-5 pt-20">
        <article className="performance-shell overflow-hidden">
          <header className="flex flex-col gap-5 border-b border-border bg-background/45 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <Compass className="h-5 w-5" />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Latest Weekly Performance
                </span>
                <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                  WEEKLY RESULTS <span className="font-normal text-muted-foreground">of Investment</span>
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                {week.dateRange}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </span>
            </div>
          </header>

          <div className="p-5 sm:p-7">
            <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="metric-cell p-5 text-left"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {s.label}
                </p>
                <p className={`mt-2 font-mono text-3xl font-bold tabular-nums ${s.tone}`}>{s.value}</p>
              </div>
            ))}
            </div>

            <Button asChild variant="cta" size="xl" className="mt-5 w-full">
              <a href={TELEGRAM_ADMIN} target="_blank" rel="noopener noreferrer">
                <Download /> Download Week Statement
              </a>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
