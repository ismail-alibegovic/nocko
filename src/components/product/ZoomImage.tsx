"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  contain?: boolean;
  hint: string;
  className?: string;
};

const ZOOM = 2;
const TAP_SLOP = 10; // px of movement before a touch counts as a scroll/drag, not a tap

/**
 * Inspectable packshot.
 *
 * - Mouse/pen: hovering zooms in; the zoom point follows the pointer continuously.
 * - Touch: feedback on touch-down, zoom commits on release (tap). While zoomed, the
 *   image pans 1:1 under the finger; tap again to zoom out. Scrolling is never blocked
 *   while not zoomed.
 * - Keyboard: Enter/Space toggles zoom.
 *
 * Every value is driven by critically damped springs that re-target from their
 * current value and velocity, so the zoom can be interrupted and reversed at any time.
 */
export function ZoomImage({ src, alt, sizes, priority, contain, hint, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [zoomed, setZoomed] = useState(false);
  const touch = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);

  // Targets (what we want) and springs (what is on screen).
  const scaleTarget = useMotionValue(1);
  const oxTarget = useMotionValue(0.5);
  const oyTarget = useMotionValue(0.5);
  const spring = { bounce: 0, duration: 0.4 };
  const followSpring = { bounce: 0, duration: 0.25 };
  const scaleSpring = useSpring(scaleTarget, spring);
  const oxSpring = useSpring(oxTarget, followSpring);
  const oySpring = useSpring(oyTarget, followSpring);
  const scale = reduce ? scaleTarget : scaleSpring;
  const originX = useTransform(reduce ? oxTarget : oxSpring, (v) => `${v * 100}%`);
  const originY = useTransform(reduce ? oyTarget : oySpring, (v) => `${v * 100}%`);

  const pointAt = (clientX: number, clientY: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    oxTarget.set(Math.min(1, Math.max(0, (clientX - r.left) / r.width)));
    oyTarget.set(Math.min(1, Math.max(0, (clientY - r.top) / r.height)));
  };

  const setZoom = (on: boolean) => {
    setZoomed(on);
    scaleTarget.set(on ? ZOOM : 1);
  };

  const onPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    pointAt(e.clientX, e.clientY);
    setZoom(true);
  };
  const onPointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") setZoom(false);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    touch.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
    if (zoomed) {
      // Direct manipulation: keep tracking even if the finger leaves the frame.
      ref.current?.setPointerCapture(e.pointerId);
      pointAt(e.clientX, e.clientY);
    } else {
      // Acknowledge the press immediately; the zoom itself commits on release.
      scaleTarget.set(1.04);
    }
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return pointAt(e.clientX, e.clientY);
    const t = touch.current;
    if (!t || t.id !== e.pointerId) return;
    if (Math.hypot(e.clientX - t.x, e.clientY - t.y) > TAP_SLOP) t.moved = true;
    if (zoomed) pointAt(e.clientX, e.clientY);
    else if (t.moved) scaleTarget.set(1); // became a scroll: cancel the press feedback
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    const t = touch.current;
    touch.current = null;
    if (!t || t.moved) {
      if (!zoomed) scaleTarget.set(1);
      return;
    }
    if (zoomed) return setZoom(false);
    pointAt(e.clientX, e.clientY);
    setZoom(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    oxTarget.set(0.5);
    oyTarget.set(0.45);
    setZoom(!zoomed);
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-pressed={zoomed}
      aria-label={`${hint}: ${alt}`}
      className={`group relative overflow-hidden select-none [-webkit-tap-highlight-color:transparent] ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"} ${contain ? "bg-cream-deep" : ""} ${className ?? ""}`}
      style={{ touchAction: zoomed ? "none" : "pan-y" }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale, originX, originY }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className={contain ? "object-contain p-[8%]" : "object-cover"}
        />
      </motion.div>
      <span
        className={`pointer-events-none absolute right-4 bottom-4 rounded-full bg-navy/70 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.12em] text-cream uppercase transition-opacity duration-300 ${zoomed ? "opacity-0" : "opacity-100"}`}
        aria-hidden="true"
      >
        {hint}
      </span>
    </div>
  );
}
