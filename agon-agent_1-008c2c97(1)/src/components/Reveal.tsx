import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useCinematic } from "../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  rotateX?: number;
  z?: number;
  once?: boolean;
  amount?: number;
}

/**
 * Scroll-triggered reveal with a gentle 3D lift.
 * Falls back to a plain fade when the visitor prefers reduced motion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
  x = 0,
  rotateX = 0,
  z = 0,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const cinematic = useCinematic();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: cinematic ? y : 0,
      x: cinematic ? x : 0,
      rotateX: cinematic ? rotateX : 0,
      z: cinematic ? z : 0,
      filter: cinematic ? "blur(6px)" : "blur(0px)",
    },
    shown: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      z: 0,
      filter: "blur(0px)",
      transition: {
        duration: cinematic ? 1.05 : 0.4,
        delay: cinematic ? delay : 0,
        ease: [0.16, 0.84, 0.34, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
