import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * Fades a pinned stage to black at the very end of its own scroll timeline,
 * so the cut into the next chapter is invisible — one continuous journey.
 */
export default function StageFade({
  cam,
  from = 0.93,
}: {
  cam: MotionValue<number>;
  from?: number;
}) {
  const opacity = useTransform(cam, [from, 1], [0, 1]);
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-50 bg-ink"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
