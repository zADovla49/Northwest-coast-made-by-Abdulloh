import { useEffect, useRef } from "react";
import { useCinematic } from "../lib/motion";

interface Mote {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  hue: number;
}

/**
 * Atmospheric dust drifting through the museum's light beams.
 * One full-screen canvas, ~60 particles, DPR capped at 1.5, paused when the
 * tab is hidden. With reduced motion it paints a single static frame instead.
 */
export default function DustField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cinematic = useCinematic();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let motes: Mote[] = [];
    let frame = 0;
    let running = true;

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 700 ? 32 : width < 1200 ? 48 : 64;
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + Math.random() * 1.7,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -0.05 - Math.random() * 0.22,
        a: 0.08 + Math.random() * 0.4,
        hue: Math.random() > 0.72 ? 46 : 40,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${m.hue}, 62%, ${m.r > 1.4 ? 78 : 66}%, ${m.a})`;
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      if (!running) return;
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -8) {
          m.y = height + 8;
          m.x = Math.random() * width;
        }
        if (m.x < -8) m.x = width + 8;
        if (m.x > width + 8) m.x = -8;
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const onResize = () => {
      build();
      if (!cinematic) draw();
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (cinematic) {
        running = true;
        frame = requestAnimationFrame(step);
      }
    };

    build();
    if (cinematic) {
      frame = requestAnimationFrame(step);
    } else {
      draw();
    }

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [cinematic]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[46]"
      style={{ opacity: 0.5, mixBlendMode: "screen" }}
    />
  );
}
