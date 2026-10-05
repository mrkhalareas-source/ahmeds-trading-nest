const TELEGRAM_MAIN = "https://t.me/tradewithahmedofficial";

export function WhatsAppFallbackNote({
  href = TELEGRAM_MAIN,
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <p
      className={`text-center text-[11px] leading-relaxed text-muted-foreground/80 ${className}`}
    >
      If WhatsApp is not responding,{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline decoration-primary/40 underline-offset-2 transition-colors hover:text-foreground hover:decoration-primary"
      >
        contact on Telegram
      </a>
    </p>
  );
}
