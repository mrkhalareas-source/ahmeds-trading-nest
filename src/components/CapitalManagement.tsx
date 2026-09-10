import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_ADMIN = "https://t.me/tradewithahmedofficial";
const WHATSAPP_CHANNEL = "https://www.whatsapp.com/channel/0029VbAzGiwATRSpsC9ZL90F";


export function CapitalManagement() {
  return (
    <section id="investment" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Investment Program
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            CAPITAL MANAGEMENT / <span className="text-gradient-gold">INVESTMENT PROGRAM</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Professional capital growth with strict risk rules and transparent profit sharing.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="cta" size="xl">
            <a href={TELEGRAM_ADMIN} target="_blank" rel="noopener noreferrer">
              Apply for Capital Management <ArrowUpRight />
            </a>
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Capital management is subject to eligibility and a signed profit-sharing agreement.
          Trading involves risk of loss.
        </p>
      </div>
    </section>
  );
}
