import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "navy" | "outline-light" | "outline-dark" | "text-dark" | "text-light";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full text-[0.95rem] font-semibold tracking-[0.01em] [-webkit-tap-highlight-color:transparent] transition-[background-color,color,border-color,box-shadow,scale] duration-500 ease-[var(--ease-soft)] active:scale-[0.97] active:duration-100 active:ease-out motion-reduce:active:scale-100 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-navy px-7 py-4 hover:bg-[#ffd552] hover:shadow-[0_14px_30px_-12px_rgba(244,195,49,0.7)]",
  navy: "bg-navy text-cream px-7 py-4 hover:bg-blue",
  "outline-light": "border border-cream/50 text-cream px-7 py-[0.95rem] hover:border-cream hover:bg-cream/10",
  "outline-dark": "border border-navy/30 text-navy px-7 py-[0.95rem] hover:border-navy hover:bg-navy hover:text-cream",
  "text-dark": "text-navy py-2",
  "text-light": "text-cream py-2",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  icon?: "arrow" | "external" | "none";
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export function ButtonLink({ href, children, variant = "gold", className, external, icon = "arrow", ...rest }: Props) {
  const isText = variant.startsWith("text");
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span className={isText ? "link-underline" : undefined}>{children}</span>
      {icon !== "none" && (
        <Icon
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1"
          strokeWidth={2}
        />
      )}
    </>
  );
  const cls = `${base} ${variants[variant]} ${className ?? ""}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
