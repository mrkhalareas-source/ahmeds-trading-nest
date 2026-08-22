/**
 * Global decorative background: trading grid, low-opacity candlestick /
 * trendline line art and an ambient glassmorphism gradient overlay.
 * Purely presentational — never interactive.
 */
export function TradingWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="grid-lines absolute inset-0 opacity-[0.35]" />
      <div className="ambient-overlay absolute inset-0" />

      {/* Candlestick + trendline line art */}
      <svg
        className="watermark-float absolute -left-16 top-24 h-[420px] w-[620px] opacity-[0.07]"
        viewBox="0 0 620 420"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <g className="text-primary">
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 24 + i * 42;
            const mid = 220 - Math.sin(i / 1.9) * 70;
            const body = 26 + ((i * 13) % 46);
            return (
              <g key={i}>
                <line x1={x} y1={mid - body - 26} x2={x} y2={mid + body + 26} />
                <rect x={x - 9} y={mid - body} width="18" height={body * 2} rx="2" />
              </g>
            );
          })}
          <path d="M10 330 L180 250 L300 286 L440 160 L610 96" strokeDasharray="8 10" />
        </g>
      </svg>

      <svg
        className="watermark-float absolute -right-24 bottom-10 h-[460px] w-[660px] opacity-[0.06]"
        viewBox="0 0 660 460"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <g className="text-cyan">
          <path d="M0 380 L90 330 L150 356 L230 250 L310 288 L400 170 L500 214 L660 80" />
          <path d="M0 420 L120 392 L240 330 L360 348 L480 262 L660 190" strokeDasharray="6 12" />
          <rect x="230" y="230" width="150" height="70" rx="4" strokeDasharray="4 8" />
          <rect x="430" y="140" width="130" height="60" rx="4" strokeDasharray="4 8" />
        </g>
      </svg>

      <svg
        className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 opacity-[0.05]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <g className="text-primary">
          <circle cx="100" cy="100" r="88" strokeDasharray="3 9" />
          <circle cx="100" cy="100" r="58" strokeDasharray="3 9" />
          <text
            x="100"
            y="106"
            textAnchor="middle"
            className="font-display"
            fontSize="26"
            stroke="none"
            fill="currentColor"
          >
            XAUUSD
          </text>
        </g>
      </svg>
    </div>
  );
}
