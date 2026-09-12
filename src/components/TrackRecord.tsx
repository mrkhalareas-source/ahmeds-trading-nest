import { CalendarDays, FileCheck2, ImageIcon } from "lucide-react";
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
  dateRange: "07 - 11 SEP  2026",
  gain: "+18.4%",
  pips: "+3,750",
  winRate: "84%",
};

export function TrackRecord({ week = LATEST }: { week?: WeekResult }) {
  const stats = [
    { label: "Gain", value: week.gain, tone: "text-accent" },
    { label: "Pips Gained", value: week.pips, tone: "text-primary" },
    { label: "Win Rate", value: week.winRate, tone: "text-foreground" },
  ];

  return (
    <section id="track-record" className="relative">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-primary/45 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Latest Weekly Performance
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
            WEEKLY  RESULTS of Investment
          </h2>
        </div>

        <article className="glass-card mt-10 p-6 sm:p-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <span className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-muted-foreground">
              <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{week.dateRange}</span>
            </span>
            <span className="shrink-0 rounded-full border border-accent/45 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
              Verified
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-background/50 p-4 text-center"
              >
                <p className={`font-display text-2xl font-bold ${s.tone}`}>{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border/80 bg-background/40">
            {week.image ? (
              <img
                src={week.image}
                alt={`Trading statement screenshot for ${week.dateRange}`}
                loading="lazy"
                className="h-56 w-full object-cover"
              />
            ) : (
              <div className="flex h-44 flex-col items-center justify-center gap-2 text-muted-foreground sm:h-56">
                <ImageIcon className="h-6 w-6" />
                <span className="px-6 text-center text-xs">
                  Statement screenshot preview
                </span>
              </div>
            )}
          </div>

          <Button asChild variant="cta" size="xl" className="mt-6 w-full">
            <a href={TELEGRAM_ADMIN} target="_blank" rel="noopener noreferrer">
              <FileCheck2 /> Download / Verify Statement
            </a>
          </Button>
        </article>
      </div>
    </section>
  );
}
