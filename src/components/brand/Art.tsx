import type { CategoryId } from "@/data/products";

type ArtProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/* Category illustrations — engraved-style line drawings, deliberately generic so
   they can never be mistaken for actual packaging. */

export function JugArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M44 30h30l-3 9c11 8 16 22 16 38 0 13-7 21-19 21H50c-12 0-19-8-19-21 0-16 5-30 16-38z" />
        <path d="M44 30l-7-5h14" />
        <path d="M85 50c11 0 15 8 15 15s-5 15-14 14" />
        <path d="M36 66c8 4 16-4 24 0s16 4 24 0" />
        <path d="M40 80c6 2 12 2 18 0" opacity="0.5" />
      </g>
    </svg>
  );
}

export function BowlArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g {...stroke}>
        <ellipse cx="60" cy="62" rx="38" ry="8" />
        <path d="M22 62c0 22 17 34 38 34s38-12 38-34" />
        <path d="M46 98h28" />
        <path d="M70 54l26-30c2-2 6-1 6 2l-1 2-25 28" />
        <path d="M34 62c6-3 12 2 18 0s12-3 18 0" opacity="0.6" />
      </g>
    </svg>
  );
}

export function CrockArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M30 50h60" />
        <path d="M32 50c-2 6-4 12-4 22 0 16 10 26 32 26s32-10 32-26c0-10-2-16-4-22" />
        <path d="M42 50c0-10 8-12 12-18 2 6 8 4 10 10 2-4 8-4 10 0 2 3 2 6 2 8" />
        <path d="M36 70h48" opacity="0.5" />
        <path d="M38 78h44" opacity="0.35" />
      </g>
    </svg>
  );
}

export function GlassArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M40 28h40l-6 70H46z" />
        <path d="M42 44h36" />
        <circle cx="52" cy="38" r="2.5" />
        <circle cx="62" cy="36" r="3.5" />
        <circle cx="71" cy="39" r="2" />
        <path d="M58 20c0-6 6-6 6-12" opacity="0.5" />
        <path d="M30 98h60" />
      </g>
    </svg>
  );
}

export function CategoryArt({ category, className }: { category: CategoryId; className?: string }) {
  switch (category) {
    case "mlijeko":
      return <JugArt className={className} />;
    case "jogurt":
      return <BowlArt className={className} />;
    case "pavlaka":
      return <CrockArt className={className} />;
    case "ayran":
      return <GlassArt className={className} />;
  }
}

/* Farm-to-table step illustrations */

export function MilkCanArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M48 18h24v8H48z" />
        <path d="M50 26c0 6-10 10-10 18v46c0 6 4 10 10 10h20c6 0 10-4 10-10V44c0-8-10-12-10-18" />
        <path d="M40 54h40M40 80h40" />
        <path d="M34 50c-6 0-8 6-6 10M86 50c6 0 8 6 6 10" />
        <path d="M14 104c16-6 30-6 46 0s30 6 46 0" opacity="0.6" />
      </g>
    </svg>
  );
}

export function QualityArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M50 16h20M54 16v26L34 88c-3 7 1 14 9 14h34c8 0 12-7 9-14L66 42V16" />
        <path d="M42 72c6-3 12 3 18 0s12-3 18 0" />
        <circle cx="86" cy="34" r="12" />
        <path d="M80 34l4 4 8-8" />
      </g>
    </svg>
  );
}

export function CrateArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M20 46l40-18 40 18-40 18z" />
        <path d="M20 46v36l40 18 40-18V46" />
        <path d="M60 64v36" />
        <path d="M40 37l40 18" opacity="0.6" />
        <path d="M30 60l20 9M30 72l20 9" opacity="0.45" />
      </g>
    </svg>
  );
}

export function TableArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g {...stroke}>
        <circle cx="86" cy="26" r="9" />
        <path d="M14 70h92" />
        <path d="M24 70l-6 32M96 70l6 32" />
        <ellipse cx="46" cy="62" rx="16" ry="4" />
        <path d="M34 62c2-10 22-10 24 0" />
        <path d="M74 44h12l-2 22h-8z" />
        <path d="M18 52c10-10 22-10 32-4" opacity="0.5" />
      </g>
    </svg>
  );
}

export const stepArt = [MilkCanArt, QualityArt, CrateArt, TableArt];

/** Decorative hills used as an organic section divider. */
export function HillsDivider({ className, fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M0 72 C 160 30 300 30 470 64 C 640 98 760 104 930 70 C 1100 36 1260 28 1440 58 L1440 120 L0 120 Z"
        fill={fill}
      />
    </svg>
  );
}

/** Small ornamental rule — a sprig between two hairlines. */
export function Sprig({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 16" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M0 8h44M76 8h44" opacity="0.6" />
        <path d="M50 8c4-6 10-6 10 0 0 6 6 6 10 0" />
        <circle cx="60" cy="8" r="1.5" />
      </g>
    </svg>
  );
}
