import { ArrowUpRight, CalendarDays, FileCheck2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_UPDATES = "https://t.me/updatesoftradewithahmedofficial";
const TELEGRAM_ADMIN = "https://t.me/tradewithahmedofficial";

export type WeekResult = {
  dateRange: string;
  gain: string;
  pips: string;
  winRate: string;
  image?: string;
};

const WEEKS: WeekResult[] = [
  { dateRange: "17 - 21 Aug 2026", gain: "+18.4%", pips: "+3,750", winRate: "84%" },
  { dateRange: "10 - 14 Aug 2026", gain: "+12.1%", pips: "+2,410", winRate: "79%" },
  { dateRange: "03 - 07 Aug 2026", gain: "+9.7%", pips: "+1,880", winRate: "76%" },
  { dateRange: "27 - 31 Jul 2026", gain: "+15.2%", pips: "+3,120", winRate: "81%" },
  { dateRange: "20 - 24 Jul 2026", gain: "+7.9%", pips: "+1,460", winRate: "74%" },
  { dateRange: "13 - 17 Jul 2026", gain: "+11.3%", pips: "+2,205", winRate: "78%" },
];

export function TrackRecord({ weeks = WEEKS }: { weeks?: WeekResult[] }) {
  return (
    <section id="track-record" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Performance Tracker
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            WEEKLY TRADING RESULTS &amp; <span className="text-gradient-gold">TRACK RECORD</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every trading week logged with gain %, pips gained, win rate, and the matching statement
            screenshot — so results can be checked, not just claimed.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {weeks.map((w) => (
            <article key={w.dateRange} className="glass-card overflow-hidden p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <span className="inline-flex min-w-0 items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                  <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">{w.dateRange}</span>
                </span>
                <span className="shrink-0 rounded-full border border-accent/45 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                  {w.gain}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-border bg-background/50 p-3 text-center">
                  <p className="font-display text-lg font-bold text-accent">{w.pips}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Pips
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/50 p-3 text-center">
                  <p className="font-display text-lg font-bold text-primary">{w.winRate}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Win Rate
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/50 p-3 text-center">
                  <p className="font-display text-lg font-bold text-foreground">{w.gain}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Gain
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-lg border border-border/80 bg-background/40">
                {w.image ? (
                  <img
                    src={w.image}
                    alt={`Trading statement screenshot for ${w.dateRange}`}
                    loading="lazy"
                    className="h-36 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-36 flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-5 w-5" />
                    <span className="px-4 text-center text-xs">
                      Statement screenshot available on request
                    </span>
                  </div>
                )}
              </div>

              <Button asChild variant="surface" className="mt-4 w-full">
                <a href={TELEGRAM_ADMIN} target="_blank" rel="noopener noreferrer">
                  <FileCheck2 /> Verify Statement
                </a>
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="cta" size="xl">
            <a href={TELEGRAM_UPDATES} target="_blank" rel="noopener noreferrer">
              View Full Track Record <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
