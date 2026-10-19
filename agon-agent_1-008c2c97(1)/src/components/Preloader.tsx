import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Seal from "./Seal";
import { PROJECT } from "../lib/data";

/**
 * Brief "opening the doors" curtain. Always resolves — window load, or a hard
 * 2.4 s timeout — so the page can never stay blank behind it.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) setDone(true);
    };
    if (document.readyState === "complete") {
      const t = window.setTimeout(finish, 500);
      return () => {
        cancelled = true;
        window.clearTimeout(t);
      };
    }
    window.addEventListener("load", finish);
    const fallback = window.setTimeout(finish, 2400);
    return () => {
      cancelled = true;
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      style={{ visibility: done ? "hidden" : "visible" }}
      aria-hidden={done}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 0.84, 0.34, 1] }}
      >
        <Seal className="h-16 w-16 anim-pulse-gold" />
      </motion.div>
      <div className="text-center">
        <p className="label-ui text-gold/80">{PROJECT.title}</p>
        <p className="mt-3 font-body text-sm tracking-[0.3em] text-muted uppercase">
          Opening the galleries…
        </p>
      </div>
      <div className="h-px w-40 overflow-hidden bg-gold/15">
        <motion.div
          className="h-full w-full origin-left bg-gold/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: done ? 1 : 0.72 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
