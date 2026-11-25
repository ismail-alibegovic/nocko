"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stepArt } from "@/components/brand/Art";

const ease = [0.22, 1, 0.36, 1] as const;

export type FarmStep = {
  n: string;
  title: string;
  body: string;
  image: { src: string; alt: string } | null;
};

/**
 * Editorial sticky-scroll sequence (desktop): the text column scrolls while the
 * pinned visual crossfades to the matching stage. On small screens each step
 * stacks with its own visual. No scroll hijacking — native scrolling throughout.
 */
export function FarmSequence({ steps, caption }: { steps: FarmStep[]; caption: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative lg:grid lg:grid-cols-12 lg:gap-10">
      {/* Pinned visual (desktop) */}
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-0 flex h-screen items-center py-24">
          <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-navy">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease }}
              >
                <StepVisual step={steps[active]} index={active} sizes="45vw" caption={caption} />
              </motion.div>
            </AnimatePresence>
            {/* progress */}
            <div className="absolute top-1/2 right-6 z-10 flex -translate-y-1/2 flex-col gap-3" aria-hidden="true">
              {steps.map((s, i) => (
                <span
                  key={s.n}
                  className={`block w-1.5 rounded-full transition-all duration-700 ease-[var(--ease-soft)] ${i === active ? "h-10 bg-gold" : "h-1.5 bg-cream/50"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol className="space-y-16 lg:col-span-5 lg:col-start-8 lg:space-y-0">
        {steps.map((s, i) => (
          <Step key={s.n} step={s} index={i} onActive={setActive} caption={caption} />
        ))}
      </ol>
    </div>
  );
}

function Step({
  step,
  index,
  onActive,
  caption,
}: {
  step: FarmStep;
  index: number;
  onActive: (i: number) => void;
  caption: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  const Art = stepArt[index % stepArt.length];

  return (
    <li ref={ref} data-step={index} className="lg:flex lg:min-h-[85vh] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.9, ease }}
        className="w-full"
      >
        {/* mobile visual */}
        <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-navy sm:aspect-[16/10] lg:hidden">
          <StepVisual step={step} index={index} sizes="92vw" caption={caption} />
        </div>
        <div className="flex items-center gap-5">
          <span className="display display-italic display-xl text-6xl text-gold lg:text-7xl">{step.n}</span>
          <Art className="size-14 text-green lg:size-16" />
        </div>
        <h3 className="display mt-6 text-4xl text-navy lg:text-5xl">{step.title}</h3>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75">{step.body}</p>
      </motion.div>
    </li>
  );
}

function StepVisual({ step, index, sizes, caption }: { step: FarmStep; index: number; sizes: string; caption: string }) {
  const Art = stepArt[index % stepArt.length];
  if (!step.image) {
    // Packaging stage: no facility photography exists, so an illustration is used instead.
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-navy">
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(60%_50%_at_50%_45%,#073b77,transparent)]" />
        <div className="absolute size-[62%] rounded-full border border-gold/30" />
        <div className="absolute size-[44%] rounded-full border border-dashed border-gold/25" />
        <Art className="relative w-[46%] text-gold" />
      </div>
    );
  }
  return (
    <>
      <Image src={step.image.src} alt={step.image.alt} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,26,53,0.55),transparent_45%)]" />
      <Art className="absolute bottom-6 left-6 size-16 text-cream/90" />
      <span className="absolute right-6 bottom-7 rounded-full bg-navy/55 px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.14em] text-cream/90 uppercase backdrop-blur-sm">
        {caption}
      </span>
    </>
  );
}
