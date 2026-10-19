import { motion } from "framer-motion";
import DustField from "./DustField";

/**
 * Fixed cinematic overlays: film grain, vignette, dust and a slow warm bloom.
 * Pure paint layers — no layout cost, no pointer events, and they sit above
 * section content but below the navigation chrome.
 */
export default function Overlays() {
  return (
    <>
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-[45] opacity-[0.055] mix-blend-overlay"
      />
      <div aria-hidden="true" className="vignette pointer-events-none fixed inset-0 z-[45]" />
      <DustField />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[44]"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(201,164,76,0.06), transparent 70%)",
        }}
      />
    </>
  );
}
