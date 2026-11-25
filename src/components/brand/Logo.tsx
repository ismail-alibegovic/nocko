import Image from "next/image";
import { getLogo } from "@/lib/assets";

type Props = {
  className?: string;
  title?: string;
};

/**
 * Noćko logo.
 *
 * If the approved refreshed logo is present at /public/images/brand/logo.(svg|png|webp)
 * it is used as-is. Until then an interim vector mark is rendered, built only from the
 * brief's description of the existing identity (dark-blue oval, yellow outline,
 * green landscape, white lettering). It must be replaced before launch.
 */
export function Logo({ className, title = "Noćko" }: Props) {
  const approved = getLogo();
  if (approved) {
    return (
      <Image
        src={approved.src}
        alt={title}
        width={approved.width || 200}
        height={approved.height || 120}
        className={className}
        priority
        unoptimized={approved.src.endsWith(".svg")}
      />
    );
  }
  return <InterimLogo className={className} title={title} />;
}

function InterimLogo({ className, title }: Props) {
  return (
    <svg viewBox="0 0 200 120" className={className} role="img" aria-label={title}>
      <defs>
        <clipPath id="nocko-oval-clip">
          <ellipse cx="100" cy="60" rx="90" ry="50" />
        </clipPath>
      </defs>
      <ellipse cx="100" cy="60" rx="96" ry="56" fill="#073B77" stroke="#F4C331" strokeWidth="6" />
      <g clipPath="url(#nocko-oval-clip)">
        <ellipse cx="100" cy="60" rx="90" ry="50" fill="#073B77" />
        <path d="M0 90 C34 74 62 78 96 88 C128 97 160 76 200 80 V120 H0 Z" fill="#427B36" />
        <path d="M0 100 C44 88 86 104 128 97 C158 92 182 99 200 97 V120 H0 Z" fill="#5A9A49" />
        <circle cx="150" cy="40" r="7" fill="#F4C331" opacity="0.9" />
      </g>
      <ellipse cx="100" cy="60" rx="90" ry="50" fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1" />
      <text
        x="100"
        y="31"
        textAnchor="middle"
        fill="#F4C331"
        style={{ font: "700 8.5px var(--font-manrope), sans-serif", letterSpacing: "0.32em" }}
      >
        MLJEKARA
      </text>
      <text
        x="99"
        y="74"
        textAnchor="middle"
        fill="#FFFFFF"
        style={{
          font: "italic 600 44px var(--font-fraunces), Georgia, serif",
          fontVariationSettings: '"SOFT" 100, "WONK" 1',
          letterSpacing: "-0.02em",
        }}
      >
        Noćko
      </text>
    </svg>
  );
}
