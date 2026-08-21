import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  Bitcoin,
  CandlestickChart,
  Check,
  CheckCircle,
  Clock,
  Copy,
  Facebook,
  Instagram,
  Landmark,
  Layers,
  Link2,
  Lock,
  Menu,
  Music2,
  Scale,
  Send,
  ShieldCheck,
  Smartphone,
  Target,
  TrendingDown,
  Trophy,
  Wallet,
  Youtube,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroChart from "@/assets/hero-chart.jpg";

const TELEGRAM_MAIN = "https://t.me/tradewithahmedofficial";
const WHATSAPP_CHANNEL = "https://www.whatsapp.com/channel/0029VbAzGiwATRSpsC9ZL90F";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "Strategy", href: "#strategy" },
  { label: "Brokers", href: "#brokers" },
  { label: "Communities", href: "#communities" },
  { label: "Contact", href: "#contact" },
];

const FOCUS = [
  {
    icon: CandlestickChart,
    title: "Gold (XAUUSD) Mastery",
    text: "Deep dive into intraday market structure, session liquidity, and execution models for XAUUSD.",
  },
  {
    icon: Layers,
    title: "Smart Money Concepts (SMC) & ICT",
    text: "Identify bank orders, Fair Value Gaps (FVG), order blocks, and liquidity sweeps.",
  },
  {
    icon: ShieldCheck,
    title: "Institutional Risk Management",
    text: "Master position sizing, drawdown control, and disciplined equity growth strategies.",
  },
];

const BROKERS = [
  {
    name: "VANTAGE",
    features: ["1:500 Leverage", "Raw Spreads from 0.0 pips", "Instant Execution"],
    cta: "Trade on Vantage",
    href: "https://vigco.co/la-com-inv/Ahmed123",
  },
  {
    name: "EXNESS",
    features: ["Unlimited Leverage", "Low Spreads", "Instant Local Withdrawals"],
    cta: "Trade on Exness",
    href: "https://one.exnessonelink.com/a/kl0jmybzqk",
  },
  {
    name: "DOO PRIME",
    features: ["Multi-Asset Coverage", "Institutional Liquidity", "Low Slippage"],
    cta: "Trade on Doo Prime",
    href: "https://my.dooprime.com/links/go/73751",
  },
  {
    name: "DERIV",
    features: ["Synthetic Indices", "24/7 Trading", "Low Minimum Deposit"],
    cta: "Trade on Deriv",
    href: "https://affs.click/RXAwT",
  },
  {
    name: "BINANCE",
    features: ["Global Crypto Liquidity", "Spot & Futures Trading", "Top Security"],
    cta: "Trade on Binance",
    href: "https://accounts.binance.com/register?ref=787567422",
  },
  {
    name: "TRADINGVIEW",
    features: ["Advanced Charting Tools", "Real-Time Data", "Custom Indicators"],
    cta: "Get TradingView",
    href: "https://www.tradingview.com/?aff_id=164732",
  },
];

const COMMUNITIES = [
  {
    title: "Main Telegram Community",
    access: "Public",
    text: "The core hub for daily discussion, analysis and trader support.",
    href: TELEGRAM_MAIN,
  },
  {
    title: "Market Updates Channel",
    access: "Public",
    text: "Live XAUUSD and Forex market updates, bias and session outlooks.",
    href: "https://t.me/updatesoftradewithahmedofficial",
  },
  {
    title: "Copy Trading Channel",
    access: "Public",
    text: "Follow executions and copy-trading updates in real time.",
    href: "https://t.me/copytradingoftradewithahmed",
  },
  {
    title: "Trading Challenge Channel",
    access: "Public",
    text: "Account challenges, growth journeys and performance tracking.",
    href: "https://t.me/tradingchallengeoftradewithahmed",
  },
  {
    title: "Mentorship & Strategy Group",
    access: "Private",
    text: "Structured SMC/ICT mentorship, strategy breakdowns and Q&A.",
    href: "https://t.me/+GHPraAZEjz8zYjk0",
  },
  {
    title: "VIP Signals Group",
    access: "Private",
    text: "Premium XAUUSD and Forex signals with entries, SL and TP.",
    href: "https://t.me/+1RLONurHJM82MzVk",
  },
];

const SOCIALS = [
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@tradewithahmed.official" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/tradewithahmed.official" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/tradewithahmedofficial" },
  { name: "TikTok", icon: Music2, href: "https://www.tiktok.com/@tradewithahmed.official" },
  { name: "All Links Hub", icon: Link2, href: "https://linktr.ee/tradewithahmed.official" },
];

const CHALLENGE_OPTIONS = [
  {
    name: "Option 1 - The Standard Challenge",
    account: "$5,000 Account",
    fee: "Rs. 1,500",
    profitTarget: "16% ($800)",
    dailyDrawdown: "2% ($100)",
    maxLoss: "8% ($400)",
    reward: "Rs. 1,500 Fee Refund + $500 Live Account Challenge",
    cta: "Join Option 1",
  },
  {
    name: "Option 2 - The Flexible Challenge",
    account: "$5,000 Account",
    fee: "Rs. 2,500",
    profitTarget: "12% ($600)",
    dailyDrawdown: "4% ($200)",
    maxLoss: "10% ($500)",
    reward: "Rs. 2,500 Fee Refund + $500 Live Account Challenge",
    cta: "Join Option 2",
  },
  {
    name: "Option 3 - The Ultra-Easy Challenge",
    account: "$5,000 Account",
    fee: "Rs. 3,500",
    profitTarget: "9% ($450)",
    dailyDrawdown: "6% ($300)",
    maxLoss: "12% ($600)",
    reward: "Rs. 3,500 Fee Refund + $500 Live Account Challenge",
    cta: "Join Option 3",
  },
];

const CHALLENGE_RULES = [
  {
    icon: Wallet,
    title: "Account Setup",
    text: "Create $5,000 Demo Account on Doo Prime, Vantage, or XM under Admin monitoring.",
  },
  {
    icon: Clock,
    title: "Minimum Trade Time",
    text: "Trades must stay open for at least 5 MINUTES (Scalping strictly disallowed).",
  },
  {
    icon: ShieldCheck,
    title: "Trade Management",
    text: "No multi-positions allowed. Strictly 1 trade open at a time.",
  },
  {
    icon: Scale,
    title: "Lot Management",
    text: "Lot size fixed at start must remain consistent.",
  },
  {
    icon: Zap,
    title: "News Trading",
    text: "News trading is ALLOWED.",
  },
];

const PAYMENT_METHODS = [
  {
    icon: Landmark,
    title: "Bank Alfalah",
    accountLabel: "Account Title",
    account: "Ahmed Salleem",
    valueLabel: "IBAN / Account Number",
    value: "PK56ALFH0100001004895493",
    copyLabel: "Copy IBAN",
  },
  {
    icon: Smartphone,
    title: "EasyPaisa & JazzCash",
    accountLabel: "Account Title",
    account: "Ahmed Saleem",
    valueLabel: "Mobile Number",
    value: "03315119895",
    copyLabel: "Copy Number",
  },
  {
    icon: Wallet,
    title: "Binance Pay / ID",
    accountLabel: "Account Name",
    account: "Ahmed Saleem 90",
    valueLabel: "Binance ID",
    value: "787567422",
    copyLabel: "Copy Binance ID",
  },
  {
    icon: Bitcoin,
    title: "Binance Wallet (TRC20)",
    accountLabel: "Network",
    account: "TRC20",
    valueLabel: "Wallet Address",
    value: "TExU5qQhTh1BKi5p7NwLvq1dRbPNBAjviS",
    copyLabel: "Copy Address",
  },
];

const PAYMENT_BADGES = [
  { icon: ShieldCheck, label: "100% Secure" },
  { icon: CheckCircle, label: "Trusted & Verified" },
  { icon: Zap, label: "Fast & Reliable" },
];

function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: silently ignore if clipboard is unavailable
    }
  };

  return (
    <Button
      type="button"
      variant="surface"
      onClick={handleCopy}
      className={className}
    >
      {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trade With Ahmed | XAUUSD & Forex Mentorship (SMC + ICT)" },
      {
        name: "description",
        content:
          "Premium Forex & Gold trading mentorship. Learn institutional market structure, Smart Money Concepts and ICT strategies for XAUUSD and major FX pairs.",
      },
      { property: "og:title", content: "Trade With Ahmed | XAUUSD & Forex Mentorship" },
      {
        property: "og:description",
        content:
          "Master institutional trading and XAUUSD market structure with SMC & ICT precision price action mentorship.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {text ? <p className="mt-3 text-muted-foreground">{text}</p> : null}
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="#home" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary">
              <BarChart3 className="h-4 w-4" />
            </span>
            <span className="font-display text-base font-bold tracking-tight">
              Trade With <span className="text-primary">Ahmed</span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild variant="cta" className="hidden sm:inline-flex">
              <a href={TELEGRAM_MAIN} target="_blank" rel="noopener noreferrer">
                <Send /> Join Telegram
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu />
            </Button>
          </div>
        </nav>

        {open ? (
          <ul className="border-t border-border px-5 py-4 lg:hidden">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild variant="cta" className="w-full">
                <a href={TELEGRAM_MAIN} target="_blank" rel="noopener noreferrer">
                  <Send /> Join Telegram
                </a>
              </Button>
            </li>
          </ul>
        ) : null}
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="hero-glow relative overflow-hidden">
          <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                XAUUSD • SMC • ICT Mentorship
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                Master Institutional Trading &{" "}
                <span className="text-gradient-gold">XAUUSD Market Structure</span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Learn precision price action, Smart Money Concepts (SMC), and Inner Circle Trader
                (ICT) strategies tailored for Gold (XAUUSD) and major Forex markets.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="cta" size="xl">
                  <a href={TELEGRAM_MAIN} target="_blank" rel="noopener noreferrer">
                    <Send /> Join Free Telegram
                  </a>
                </Button>
                <Button asChild variant="goldOutline" size="xl">
                  <a href={WHATSAPP_CHANNEL} target="_blank" rel="noopener noreferrer">
                    WhatsApp Channel <ArrowUpRight />
                  </a>
                </Button>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
                {[
                  ["6+", "Trading Communities"],
                  ["XAUUSD", "Primary Focus"],
                  ["24/5", "Market Coverage"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-lg border border-border bg-card/60 p-3">
                    <dt className="font-display text-lg font-bold text-primary">{v}</dt>
                    <dd className="text-xs text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="panel overflow-hidden p-2">
              <img
                src={heroChart}
                width={1280}
                height={896}
                alt="XAUUSD dark trading chart showing liquidity pools, order blocks and fair value gaps"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Trading Challenge */}
        <section id="challenge" className="relative overflow-hidden">
          <div className="grid-lines absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                $500 Live Account
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
                OFFICIAL <span className="text-gradient-gold">TRADING CHALLENGE</span>
              </h2>
              <p className="mt-3 text-lg font-semibold text-primary sm:text-xl">
                $500 LIVE ACCOUNT CHALLENGE
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Designed like a Funded Account model to build professional trading discipline.
                Choose one of the three options below:
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {CHALLENGE_OPTIONS.map((opt) => (
                <article
                  key={opt.name}
                  className="panel relative flex flex-col overflow-hidden p-6"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-bold">{opt.name}</h3>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {opt.account}
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-foreground">
                    {opt.fee}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      (100% Refundable upon passing)
                    </span>
                  </p>
                  <ul className="mt-5 flex-1 space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Target className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        <strong className="text-foreground">Profit Target:</strong>{" "}
                        {opt.profitTarget}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      <span>
                        <strong className="text-foreground">Daily Drawdown:</strong>{" "}
                        {opt.dailyDrawdown}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        <strong className="text-foreground">Max Overall Loss Limit:</strong>{" "}
                        {opt.maxLoss}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        <strong className="text-foreground">Reward:</strong> {opt.reward}
                      </span>
                    </li>
                  </ul>
                  <Button asChild variant="cta" className="mt-6 w-full">
                    <a
                      href="https://t.me/tradingchallengeoftradewithahmed"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {opt.cta} <ArrowUpRight />
                    </a>
                  </Button>
                </article>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-center text-xl font-bold sm:text-2xl">
                Challenge <span className="text-gradient-gold">Rules</span>
              </h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {CHALLENGE_RULES.map((rule) => (
                  <article key={rule.title} className="panel p-5 text-center">
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/12 text-accent">
                      <rule.icon className="h-5 w-5" />
                    </span>
                    <h4 className="mt-4 text-sm font-semibold">{rule.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {rule.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-accent/25 bg-accent/5 p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Note:</span> You must pass the
                  specific option selected. Option changes are not allowed once registered. Pass
                  the challenge, get 100% fee refunded + $500 Live Account reward!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section id="payment" className="relative overflow-hidden">
          <div className="grid-lines absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Payments
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
                PAYMENT <span className="text-gradient-gold">DETAILS</span>
              </h2>
              <p className="mt-3 text-lg font-semibold text-primary sm:text-xl">
                Easy • Secure • Trusted
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {PAYMENT_METHODS.map((method) => (
                <article key={method.title} className="panel flex flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/12 text-accent">
                      <method.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-bold">{method.title}</h3>
                  </div>
                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex flex-col justify-between gap-1 border-b border-border pb-3 sm:flex-row sm:gap-4">
                      <span className="text-muted-foreground">{method.accountLabel}</span>
                      <span className="font-semibold text-foreground">{method.account}</span>
                    </div>
                    <div className="flex flex-col justify-between gap-1 border-b border-border pb-3 sm:flex-row sm:gap-4">
                      <span className="text-muted-foreground">{method.valueLabel}</span>
                      <span className="break-all font-mono font-medium text-primary">
                        {method.value}
                      </span>
                    </div>
                  </div>
                  <CopyButton value={method.value} label={method.copyLabel} className="mt-6 w-full" />
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {PAYMENT_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground"
                >
                  <badge.icon className="h-4 w-4 text-accent" />
                  {badge.label}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-primary/25 bg-primary/5 p-5 text-center">
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                After making the payment, send the transaction receipt screenshot to Admin{"\n"}via{"\u00a0\u00a0"}
                <a
                  href={TELEGRAM_MAIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline-offset-2 hover:underline"
                >
                  Telegram
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Market focus */}
        <section id="strategy" className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Market Focus"
            title="What You Will Learn"
            text="A structured curriculum built around institutional order flow and disciplined execution."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FOCUS.map((f) => (
              <article key={f.title} className="panel p-6">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/12 text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Mentorship CTA band */}
        <section id="mentorship" className="mx-auto max-w-7xl px-5 pb-20">
          <div className="panel hero-glow p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Premium Forex & Gold Trading Mentorship
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Structured mentorship, live market breakdowns and a trader community built around
              institutional concepts — not indicators.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild variant="cta" size="lg">
                <a
                  href="https://t.me/+GHPraAZEjz8zYjk0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Lock /> Mentorship Group
                </a>
              </Button>
              <Button asChild variant="gold" size="lg">
                <a
                  href="https://t.me/+1RLONurHJM82MzVk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VIP Signals
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Brokers */}
        <section id="brokers" className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Brokers & Tools"
            title="Recommended Trading Platforms"
            text="Platforms and tools used for execution, charting and market access."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BROKERS.map((b) => (
              <article key={b.name} className="panel flex flex-col p-6">
                <h3 className="font-display text-xl font-bold tracking-wide text-primary">
                  {b.name}
                </h3>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                  {b.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="cta" className="mt-6 w-full">
                  <a href={b.href} target="_blank" rel="noopener noreferrer">
                    {b.cta} <ArrowUpRight />
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </section>

        {/* Communities */}
        <section id="communities" className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Community Hub"
            title="Telegram Channels & Groups"
            text="Join the free public channels or step into the private mentorship and signals rooms."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITIES.map((c) => (
              <article key={c.title} className="panel flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/12 text-accent">
                    <Send className="h-4 w-4" />
                  </span>
                  <span
                    className={
                      c.access === "Private"
                        ? "rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        : "rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    }
                  >
                    {c.access}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.text}</p>
                <Button
                  asChild
                  variant={c.access === "Private" ? "gold" : "surface"}
                  className="mt-5 w-full"
                >
                  <a href={c.href} target="_blank" rel="noopener noreferrer">
                    Join Now <ArrowUpRight />
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </section>

        {/* Socials */}
        <section id="contact" className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Connect"
            title="Follow Trade With Ahmed"
            text="Daily content, breakdowns and market recaps across every platform."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="panel group flex flex-col items-center gap-3 p-6 text-center"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium">{s.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="cta" size="lg">
              <a href={TELEGRAM_MAIN} target="_blank" rel="noopener noreferrer">
                <Send /> Join Free Telegram
              </a>
            </Button>
            <Button asChild variant="goldOutline" size="lg">
              <a href={WHATSAPP_CHANNEL} target="_blank" rel="noopener noreferrer">
                WhatsApp Channel
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <span className="font-display text-lg font-bold">
                Trade With <span className="text-primary">Ahmed</span>
              </span>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Institutional-grade Forex & Gold mentorship built on SMC and ICT price action.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Quick Links</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Communities</h3>
              <ul className="mt-4 space-y-2">
                {COMMUNITIES.slice(0, 4).map((c) => (
                  <li key={c.title}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 rounded-lg border border-destructive/25 bg-destructive/5 p-4 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Risk Warning:</span> Trading Forex,
            Commodities (Gold), and CFDs involves high risk and may not be suitable for all
            investors. Ensure you fully understand the risks involved before trading.
          </p>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            © 2026 Trade With Ahmed. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
