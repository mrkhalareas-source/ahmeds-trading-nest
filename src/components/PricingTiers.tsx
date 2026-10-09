import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WhatsAppFallbackNote } from "@/components/WhatsAppFallbackNote";

const WHATSAPP_DIRECT = "https://wa.me/923269861604";
const WHATSAPP_NUMBER = "+92 326 9861604";

const TIERS = [
  {
    id: "basic",
    badge: "Beginner Friendly",
    title: "Basic Course",
    price: "Rs. 5,000",
    cadence: "One-Time Payment",
    text: "Yeh course beginners ke liye hai jo market ko shuru se seekhna chahte hain.",
    points: ["Market basics bilkul shuru se", "Beginner-friendly step-by-step pace"],
    featured: false,
  },
  {
    id: "advance",
    badge: "Advanced Level",
    title: "Advance Course",
    price: "$100",
    cadence: "One-Time Payment / Lifetime Access",
    text: "Yeh mentorship aur advanced institutional strategies (SMC & ICT) ke liye hai.",
    points: ["1 to 1 mentorship", "Institutional strategies — SMC & ICT"],
    featured: true,
  },
];

export function PricingTiers() {
  return (
    <section id="pricing" className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Courses &amp; Mentorship
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Choose Your <span className="text-gradient-gold">Course</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Do tiers — beginners ke liye Basic Course, aur advanced institutional trading ke liye
            Advance Course.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TIERS.map((t) => (
            <article
              key={t.id}
              className={`glass-card relative flex flex-col p-7 sm:p-8 ${
                t.featured ? "border-primary/45" : ""
              }`}
            >
              <span
                className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  t.featured
                    ? "border-primary/45 bg-primary/10 text-primary"
                    : "border-accent/40 bg-accent/10 text-accent"
                }`}
              >
                {t.badge}
              </span>

              <h3 className="mt-5 text-xl font-bold text-foreground sm:text-2xl">{t.title}</h3>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className={`font-display text-4xl font-bold sm:text-5xl ${
                    t.featured ? "text-gradient-gold" : "text-foreground"
                  }`}
                >
                  {t.price}
                </span>
                <span className="text-sm text-muted-foreground">{t.cadence}</span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t.text}
              </p>

              <ul className="mt-6 space-y-2.5">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        t.featured ? "text-primary" : "text-accent"
                      }`}
                    />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-2 pt-2">
                <Button asChild variant={t.featured ? "gold" : "cta"} size="lg" className="w-full">
                  <a href={WHATSAPP_DIRECT} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="h-5 w-5" /> Enroll Now on WhatsApp
                  </a>
                </Button>
                <WhatsAppFallbackNote className="mt-1" />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Enrollment aur payment dono WhatsApp par direct —{" "}
          <a
            href={WHATSAPP_DIRECT}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline decoration-primary/60 underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
          >
            {WHATSAPP_NUMBER}
          </a>
          <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
        </p>
      </div>
    </section>
  );
}
