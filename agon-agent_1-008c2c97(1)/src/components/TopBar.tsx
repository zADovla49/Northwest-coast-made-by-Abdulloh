import { motion } from "framer-motion";
import Seal from "./Seal";
import { PROJECT } from "../lib/data";
import { useActiveSection, usePageProgress, scrollToId } from "../lib/motion";

const SECTIONS = [
  { id: "entrance", label: "Entrance" },
  { id: "worlds", label: "The Living Coast" },
  { id: "gallery", label: "Artifact Gallery" },
  { id: "atlas", label: "Atlas & Time" },
  { id: "people", label: "People & Cultures" },
  { id: "finale", label: "Closing Hall" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function TopBar() {
  const progress = usePageProgress();
  const active = useActiveSection(SECTION_IDS);
  const current = SECTIONS.find((s) => s.id === active);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* always-visible credit */}
      <p className="label-ui pt-3 text-center text-[9px] tracking-[0.34em] text-goldbright/60 sm:text-[10px]">
        Made by: Abdulloh
      </p>

      <div className="flex items-center justify-between gap-4 px-5 pt-2 pb-4 sm:px-8">
        <button
          type="button"
          onClick={() => scrollToId("entrance")}
          className="pointer-events-auto group flex items-center gap-3 text-left"
          aria-label="Return to the museum entrance"
        >
          <Seal className="h-8 w-8 shrink-0 transition-transform duration-700 group-hover:rotate-90" />
          <span className="hidden sm:block">
            <span className="label-ui block text-bone/90">{PROJECT.title}</span>
            <span className="block font-body text-[11px] tracking-[0.18em] text-muted uppercase">
              {PROJECT.course}
            </span>
          </span>
        </button>

        <div className="pointer-events-auto flex items-center gap-4">
          <span className="label-ui text-gold/80">
            <span className="hidden md:inline">Now viewing · </span>
            {current?.label ?? "Entrance"}
          </span>
          <span className="hidden h-4 w-px bg-gold/25 md:block" />
          <span className="label-ui hidden text-muted md:inline">{PROJECT.year}</span>
        </div>
      </div>
      <motion.div
        className="h-px origin-left bg-gradient-to-r from-gold/10 via-gold to-gold/10"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
