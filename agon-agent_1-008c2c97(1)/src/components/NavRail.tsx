import { motion } from "framer-motion";
import { useActiveSection, scrollToId } from "../lib/motion";

const SECTIONS = [
  { id: "entrance", label: "Entrance", numeral: "I" },
  { id: "worlds", label: "The Living Coast", numeral: "II" },
  { id: "gallery", label: "Artifact Gallery", numeral: "III" },
  { id: "atlas", label: "Atlas & Time", numeral: "IV" },
  { id: "people", label: "People & Cultures", numeral: "V" },
  { id: "finale", label: "Closing Hall", numeral: "VI" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

/** Right-hand brass rail: chapter markers you can jump between. */
export default function NavRail() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Museum chapters"
      className="fixed top-1/2 right-3 z-50 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToId(s.id)}
            className="group flex items-center gap-3"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`label-ui transition-all duration-500 ${
                isActive
                  ? "text-gold opacity-100"
                  : "text-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span className="relative flex h-3 w-3 items-center justify-center">
              <motion.span
                className="absolute inset-0 rounded-full border"
                animate={{
                  borderColor: isActive ? "rgba(201,164,76,0.9)" : "rgba(201,164,76,0.25)",
                  scale: isActive ? 1 : 0.7,
                }}
                transition={{ duration: 0.5 }}
              />
              <motion.span
                className="h-1 w-1 rounded-full bg-gold"
                animate={{ opacity: isActive ? 1 : 0.25, scale: isActive ? 1.4 : 1 }}
                transition={{ duration: 0.5 }}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
