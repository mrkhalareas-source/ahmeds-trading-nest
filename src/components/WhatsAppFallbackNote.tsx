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
      className={`text-center text-[13px] font-semibold leading-snug text-foreground sm:text-sm ${className}`}
    >
      If WhatsApp is not responding,{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-primary underline decoration-primary/60 underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
      >
        contact on Telegram
      </a>
    </p>
  );
}
