import { ArrowUpRight, CalendarClock, Compass, LineChart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_UPDATES = "https://t.me/updatesoftradewithahmedofficial";

const NEWS_EVENTS = [
  { tag: "CPI", text: "US Inflation print — high volatility on Gold within the first 15 minutes." },
  { tag: "NFP", text: "Non-Farm Payrolls — expect liquidity sweeps before the true weekly direction." },
  { tag: "FOMC", text: "Rate decision & press conference — the week's primary XAUUSD driver." },
];

const ZONES = [
  { label: "Key Resistance", value: "Weekly supply / previous week high liquidity" },
  { label: "Equilibrium", value: "50% of the weekly dealing range — decision zone" },
  { label: "Key Support", value: "Weekly demand / previous week low liquidity" },
];

export function WeeklyReport() {
  return (
    <section id="weekly-report" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
            Weekly Desk Note
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            WEEKLY MARKET <span className="text-gradient-gold">REPORT &amp; BIAS</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every Sunday we publish the institutional roadmap for the week ahead — directional
            bias, high-impact news and the levels that actually matter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="glass-card p-6">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/12 text-primary">
              <LineChart className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">Weekly Gold (XAUUSD) Outlook</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Higher-timeframe market structure read on Gold: weekly bias, the dealing range in
              play, and the draw on liquidity we expect price to target through the week.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Weekly & daily bias with invalidation levels
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                London & New York kill zone game plan
              </li>
            </ul>
          </article>

          <article className="glass-card p-6">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan/12 text-cyan">
              <CalendarClock className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">High-Impact News Events</h3>
            <ul className="mt-4 space-y-3">
              {NEWS_EVENTS.map((e) => (
                <li key={e.tag} className="rounded-lg border border-border bg-card/50 p-3">
                  <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-0.5 text-xs font-semibold text-cyan">
                    {e.tag}
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{e.text}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="glass-card p-6">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/12 text-accent">
              <Compass className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">Key Support / Resistance Zones</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {ZONES.map((z) => (
                <li key={z.label} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <p className="font-semibold text-foreground">{z.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{z.value}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="cta" size="xl">
            <a href={TELEGRAM_UPDATES} target="_blank" rel="noopener noreferrer">
              <Send /> Get Full Weekly Bias on Telegram <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
