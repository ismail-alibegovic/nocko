type Props = {
  top: string;
  years: string;
  className?: string;
  tone?: "light" | "dark";
};

/** 30-year anniversary emblem (1996–2026) with a slowly turning text ring. */
export function AnniversaryBadge({ top, years, className, tone = "light" }: Props) {
  const ring = `${top} · ${years} · ${top} · ${years} ·`.toUpperCase();
  // Circumference of the r=78 text path, so the ring closes exactly.
  const circumference = 2 * Math.PI * 78;
  const fg = tone === "light" ? "#F7F4EB" : "#06264C";
  return (
    <div className={className} role="img" aria-label={`${top}, ${years}`}>
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
        <defs>
          <path id="badge-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="#F4C331" />
        <circle cx="100" cy="100" r="62" fill="#06264C" />
        <circle cx="100" cy="100" r="56" fill="none" stroke="#F4C331" strokeWidth="0.8" strokeDasharray="1.5 3" />
        <g className="animate-spin-slow motion-reduce:animate-none" style={{ transformOrigin: "100px 100px" }}>
          <text style={{ font: "700 10.5px var(--font-manrope), sans-serif" }} fill="#06264C">
            <textPath href="#badge-ring" startOffset="0" textLength={circumference - 6} lengthAdjust="spacing">
              {ring}
            </textPath>
          </text>
        </g>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fill="#F4C331"
          style={{
            font: "italic 600 54px var(--font-fraunces), Georgia, serif",
            fontVariationSettings: '"SOFT" 100, "WONK" 1',
          }}
        >
          30
        </text>
        <text
          x="100"
          y="134"
          textAnchor="middle"
          fill={tone === "light" ? "#F7F4EB" : fg}
          style={{ font: "700 8px var(--font-manrope), sans-serif", letterSpacing: "0.3em" }}
        >
          1996 — 2026
        </text>
        <path d="M78 76 q22 -14 44 0" fill="none" stroke="#F4C331" strokeWidth="1" />
      </svg>
    </div>
  );
}
