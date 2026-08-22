import {
  ArrowUpRight,
  Activity,
  Blocks,
  CheckCircle2,
  Crown,
  Gem,
  GitBranch,
  Layers,
  Send,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_ADMIN = "https://t.me/tradewithahmedofficial";
const TELEGRAM_MENTORSHIP = "https://t.me/+GHPraAZEjz8zYjk0";

const COURSE_FEATURES = [
  {
    icon: Activity,
    title: "Institutional Order Flow",
    text: "Trace banks and institutional buy/sell footprints.",
  },
  {
    icon: Blocks,
    title: "Smart Money Concepts (SMC)",
    text: "Master Order Blocks, Fair Value Gaps (FVG), and Imbalances.",
  },
  {
    icon: Gem,
    title: "Advanced Fibonacci & OTE",
    text: "Precision entries using Golden Ratio (61.8% / 70.5%) models.",
  },
  {
    icon: GitBranch,
    title: "Market Structure Mastery",
    text: "Clear breakdown of BOS (Break of Structure) and CHOCH.",
  },
  {
    icon: Waves,
    title: "Liquidity Sweeps & Stop Hunts",
    text: "Avoid retail traps and trade bank liquidity grabs.",
  },
  {
    icon: Layers,
    title: "Multi-Strategy Suite",
    text: "Trend Continuation, SMC Reversals, and NY/London Kill Zone strategies.",
  },
  {
    icon: ShieldCheck,
    title: "Prop Firm Passing Blueprint",
    text: "Risk management models (1:2 to 1:5 R:R) tailored for FTMO/Funded Accounts.",
  },
  {
    icon: Crown,
    title: "XAUUSD (Gold) Precision",
    text: "Specialized high-volatility session strategies for Gold.",
  },
  {
    icon: CheckCircle2,
    title: "VIP Citadel Community",
    text: "Lifetime private access with daily trade plans and live chart breakdowns.",
  },
];

export function CourseSection() {
  return (
    <section id="course" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Lifetime Mentorship
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            INSTITUTIONAL <span className="text-gradient-gold">TRADING COURSE</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Master Forex &amp; XAUUSD Market Structure with Lifetime Mentorship
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-primary/35 bg-primary/10 px-6 py-3">
            <span className="font-display text-2xl font-bold text-primary">$100</span>
            <span className="text-sm text-muted-foreground">
              One-Time Payment / Lifetime Access
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {COURSE_FEATURES.map((f) => (
            <article key={f.title} className="glass-card flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/12 text-accent">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground sm:text-base">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="cta" size="xl">
            <a href={TELEGRAM_MENTORSHIP} target="_blank" rel="noopener noreferrer">
              Enroll Now ($100 Lifetime) <ArrowUpRight />
            </a>
          </Button>
          <Button
            asChild
            size="xl"
            variant="surface"
            className="border-cyan/40 text-cyan shadow-[0_0_28px_-10px_var(--cyan)] hover:border-cyan hover:text-cyan"
          >
            <a href={TELEGRAM_ADMIN} target="_blank" rel="noopener noreferrer">
              <Send className="text-cyan drop-shadow-[0_0_6px_var(--cyan)]" /> Contact Admin on
              Telegram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
