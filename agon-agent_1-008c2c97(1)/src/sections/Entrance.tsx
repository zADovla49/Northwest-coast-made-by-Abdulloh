import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useCinematic, useStage } from "../lib/motion";
import { PROJECT } from "../lib/data";
import Seal from "../components/Seal";

const TITLE = "Transformation: The Living Art of the Kwakiutl";
const META = ["10 artifacts", "4 living landscapes", "14,000 years of history"];

/**
 * CHAPTER I — The entrance.
 * A pinned stage: the camera dollies toward the doors, the title rises in gold,
 * then the stone leaves swing apart and light floods the hall.
 */
export default function Entrance() {
  const ref = useRef<HTMLElement | null>(null);
  const { cam } = useStage(ref, { stiffness: 90, damping: 26 });
  const cinematic = useCinematic();

  /* camera: slow push-in toward the doorway */
  const bgScale = useTransform(cam, [0, 1], [1.36, 1.02]);
  const bgY = useTransform(cam, [0, 1], ["-5%", "3%"]);
  const veil = useTransform(cam, [0, 0.42, 1], [0.62, 0.24, 0]);
  const glow = useTransform(cam, [0.3, 0.85, 1], [0, 0.5, 0.92]);

  /* title: holds, then drifts past the lens */
  const titleOpacity = useTransform(cam, [0, 0.16, 0.34, 0.46], [0, 1, 1, 0]);
  const titleScale = useTransform(cam, [0, 0.46], [0.94, 1.22]);
  const titleY = useTransform(cam, [0, 0.46], ["8%", "-14%"]);

  /* doors swing apart */
  const doorRange: [number, number] = cinematic ? [0.34, 0.86] : [0.34, 0.52];
  const leftX = useTransform(cam, doorRange, ["0%", "-104%"]);
  const rightX = useTransform(cam, doorRange, ["0%", "104%"]);
  const leftRot = useTransform(cam, doorRange, [0, -24]);
  const rightRot = useTransform(cam, doorRange, [0, 24]);
  const seamLight = useTransform(cam, [0.3, 0.55, 0.9], [0, 0.5, 1]);

  /* foreground pilasters sweep past the lens */
  const frameLeft = useTransform(cam, [0.22, 1], ["0%", "-130%"]);
  const frameRight = useTransform(cam, [0.22, 1], ["0%", "130%"]);
  const cueOpacity = useTransform(cam, [0, 0.06], [1, 0]);
  const plaqueOpacity = useTransform(cam, [0, 0.1, 0.3], [0, 1, 0]);

  const letters = TITLE.split("");

  return (
    <section
      id="entrance"
      ref={ref}
      className="relative h-[300vh] w-full"
      aria-label="Museum entrance"
    >
      <div className="stage sticky top-0 overflow-hidden bg-ink">
        {/* ---------- far layer: the hall itself ---------- */}
        <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
          <img
            src="/img/env/hall.jpg"
            alt="A vast neoclassical museum hall lit by warm spotlights"
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

        {/* atmospheric washes */}
        <motion.div className="absolute inset-0 bg-ink" style={{ opacity: veil }} aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 42%, rgba(201,164,76,0.16), transparent 65%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="beam absolute -top-1/4 left-[18%] h-[130%] w-[9vw] -skew-x-[9deg] anim-scan" />
          <div
            className="beam absolute -top-1/4 right-[16%] h-[130%] w-[7vw] skew-x-[8deg] anim-scan"
            style={{ animationDelay: "1.6s" }}
          />
        </div>

        {/* ---------- the doors ---------- */}
        <div className="persp absolute inset-0" aria-hidden="true">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 origin-left"
            style={{ x: leftX, rotateY: leftRot }}
          >
            <div className="stone-panel relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/45 to-transparent" />
              <div className="absolute inset-y-[8%] right-[12%] w-px bg-gold/20" />
              <div className="absolute inset-y-[8%] right-[26%] w-px bg-gold/10" />
              <div className="absolute inset-x-[10%] top-[10%] h-px bg-gold/15" />
              <div className="absolute inset-x-[10%] bottom-[10%] h-px bg-gold/15" />
              <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/85 to-transparent" />
            </div>
          </motion.div>
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 origin-right"
            style={{ x: rightX, rotateY: rightRot }}
          >
            <div className="stone-panel relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-l from-ink/95 via-ink/45 to-transparent" />
              <div className="absolute inset-y-[8%] left-[12%] w-px bg-gold/20" />
              <div className="absolute inset-y-[8%] left-[26%] w-px bg-gold/10" />
              <div className="absolute inset-x-[10%] top-[10%] h-px bg-gold/15" />
              <div className="absolute inset-x-[10%] bottom-[10%] h-px bg-gold/15" />
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/85 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* light escaping through the seam */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[42vw] -translate-x-1/2"
          style={{ opacity: seamLight }}
          aria-hidden="true"
        >
          <div className="h-full w-full bg-[radial-gradient(50%_60%_at_50%_50%,rgba(255,232,178,0.5),transparent_70%)] blur-xl" />
        </motion.div>

        {/* ---------- foreground frame ---------- */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 w-[13vw] max-w-28"
          style={{ x: frameLeft }}
          aria-hidden="true"
        >
          <div className="h-full w-full bg-gradient-to-r from-black via-black/85 to-transparent" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 w-[13vw] max-w-28"
          style={{ x: frameRight }}
          aria-hidden="true"
        >
          <div className="h-full w-full bg-gradient-to-l from-black via-black/85 to-transparent" />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/70 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/75 to-transparent"
          aria-hidden="true"
        />

        {/* ---------- the title ---------- */}
        <motion.div
          className="persp absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 0.84, 0.34, 1] }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-8 bg-gold/50 sm:w-16" />
            <Seal className="h-9 w-9 sm:h-11 sm:w-11" />
            <span className="h-px w-8 bg-gold/50 sm:w-16" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6 }}
            className="label-ui mt-6 max-w-md text-gold/85"
          >
            {PROJECT.inspiredBy}
          </motion.p>

          <h1 className="persp mt-5 flex flex-wrap justify-center font-display text-[12.5vw] leading-[0.94] font-semibold tracking-[0.04em] sm:text-[9vw] lg:text-[7rem]">
            {letters.map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                className="gold-text engraved inline-block"
                initial={cinematic ? { opacity: 0, y: 60, rotateX: -70 } : { opacity: 0 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: cinematic ? 1.25 : 0.6,
                  delay: 0.75 + i * (cinematic ? 0.055 : 0.02),
                  ease: [0.16, 0.84, 0.34, 1],
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 1.9 }}
            className="mt-6 max-w-2xl font-body text-xl italic text-bone/75 sm:text-2xl"
          >
            {PROJECT.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 2.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {META.map((t) => (
              <span key={t} className="label-ui text-muted">
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- scroll cue ---------- */}
        <motion.div
          className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3"
          style={{ opacity: cueOpacity }}
        >
          <span className="label-ui text-gold/80">Scroll to enter</span>
          <span className="relative block h-14 w-px overflow-hidden bg-gold/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-5 bg-gold"
              animate={cinematic ? { y: [-20, 56] } : { y: 20 }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>

        {/* ---------- plaque ---------- */}
        <motion.div
          className="absolute bottom-8 left-6 z-20 hidden max-w-xs border-l border-gold/30 pl-4 lg:block"
          style={{ opacity: plaqueOpacity }}
        >
          <p className="label-ui text-gold/70">A virtual exhibition</p>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted">
            {PROJECT.course} · {PROJECT.year}. Every image on this site is an
            AI-generated rendering made for a school project — each label states
            whether the object is an original, a replica, or a reconstruction,
            and which Nation it belongs to.
          </p>
        </motion.div>

        {/* light flood as the doors finish opening */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(60%_50%_at_50%_55%,rgba(255,238,200,0.32),transparent_70%)]"
          style={{ opacity: glow }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
