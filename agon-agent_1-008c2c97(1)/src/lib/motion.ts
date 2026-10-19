import { useEffect, useRef, useState, type RefObject } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";

/** Global "is cinematic motion allowed" switch (respects OS reduced-motion). */
export function useCinematic(): boolean {
  const reduced = useReducedMotion();
  return reduced !== true;
}

export interface Stage {
  /** Smoothed (spring-damped) progress — use for camera-like transforms. */
  cam: MotionValue<number>;
  /** Raw progress — use for discrete UI such as scene counters. */
  raw: MotionValue<number>;
  reduced: boolean;
}

/**
 * Drives a pinned "camera stage": the section is much taller than the viewport
 * and the inner element is sticky, so scroll position becomes a 0→1 timeline.
 */
export function useStage(
  target: RefObject<HTMLElement | null>,
  options: { stiffness?: number; damping?: number; mass?: number } = {},
): Stage {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const reduced = useReducedMotion() === true;
  const cam = useSpring(scrollYProgress, {
    stiffness: options.stiffness ?? 70,
    damping: options.damping ?? 22,
    mass: options.mass ?? 0.55,
  });
  return { cam, raw: scrollYProgress, reduced };
}

/** Tracks which of `n` chapters the stage is currently in (cheap: only updates on change). */
export function useStageIndex(raw: MotionValue<number>, n: number): number {
  const [index, setIndex] = useState(0);
  useMotionValueEvent(raw, "change", (v) => {
    const next = Math.max(0, Math.min(n - 1, Math.floor(v * n - 0.0001)));
    setIndex((prev) => (prev === next ? prev : next));
  });
  return index;
}

/** Viewport width, kept in sync (used for responsive 3D spacing). */
export function useViewportWidth(): number {
  const [width, setWidth] = useState(() =>
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return width;
}

/** Which section id is currently on screen (for the nav rail). */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/** Whole-page scroll progress (top gold hairline). */
export function usePageProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
}

export function scrollToId(id: string, smooth = true): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

/**
 * Scroll a pinned stage to a specific 0→1 point of its own timeline.
 * Used by the gallery so clicking an artifact "walks" the camera to it.
 */
export function scrollStageTo(
  section: RefObject<HTMLElement | null>,
  point: number,
  smooth = true,
): void {
  const el = section.current;
  if (!el) return;
  const travel = Math.max(1, el.offsetHeight - window.innerHeight);
  const top = el.getBoundingClientRect().top + window.scrollY + point * travel;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
}

/** Fires once when the element enters the viewport. */
export function useEntered<T extends HTMLElement>(amount = 0.25) {
  const ref = useRef<T | null>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: amount },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);
  return { ref, entered };
}

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
