import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * Warm light-bloom that washes out at the start of a stage — used as a
 * match-cut from the bright doorway of the previous chapter.
 */
export default function StageFlash({
  cam,
  to = 0.05,
  peak = 0.8,
}: {
  cam: MotionValue<number>;
  to?: number;
  peak?: number;
}) {
  const opacity = useTransform(cam, [0, to], [peak, 0]);
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[45]"
      style={{
        opacity,
        background:
          "radial-gradient(65% 55% at 50% 50%, rgba(255,240,205,0.95), rgba(255,226,170,0.35) 45%, transparent 75%)",
      }}
      aria-hidden="true"
    />
  );
}
