import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import WorldMap from "../components/WorldMap";
import Reveal from "../components/Reveal";
import { SectionHeading } from "../components/MuseumPlate";
import { DISCOVERIES, TIMELINE, type Discovery, type TimelineEntry } from "../lib/data";
import { useCinematic } from "../lib/motion";

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

const ERA_COLOR: Record<TimelineEntry["scale"], string> = {
  deep: "text-sky-200/80 border-sky-200/25",
  ancient: "text-goldbright border-gold/35",
  modern: "text-emerald-200/80 border-emerald-200/25",
};

function Timeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const cinematic = useCinematic();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });
  const scaleY = useTransform(line, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mt-14">
      {/* rail */}
      <div className="absolute top-0 bottom-0 left-[7px] w-px bg-bone/12 lg:left-1/2" aria-hidden="true" />
      <motion.div
        className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-gradient-to-b from-goldbright via-gold to-golddim lg:left-1/2"
        style={{ scaleY }}
        aria-hidden="true"
      />

      <ol className="space-y-10 lg:space-y-14">
        {TIMELINE.map((entry, i) => {
          const right = i % 2 === 1;
          return (
            <li key={entry.id} className="relative pl-10 lg:pl-0">
              {/* node */}
              <span
                className="absolute top-2 left-0 flex h-[15px] w-[15px] items-center justify-center lg:left-1/2 lg:-translate-x-1/2"
                aria-hidden="true"
              >
                <span className="absolute h-[15px] w-[15px] rotate-45 border border-gold/60 bg-ink" />
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              </span>

              <div
                className={`lg:w-[46%] ${right ? "lg:ml-[54%]" : "lg:mr-[54%] lg:text-right"}`}
              >
                <Reveal y={34} rotateX={cinematic ? 6 : 0} x={right ? 24 : -24}>
                  <div>
                    <span
                      className={`label-ui inline-block border px-2.5 py-1 ${ERA_COLOR[entry.scale]}`}
                    >
                      {entry.era}
                    </span>
                    <p className="mt-3 font-display text-lg text-goldbright sm:text-xl">
                      {entry.when}
                    </p>
                    <h4 className="mt-1.5 font-display text-xl leading-snug text-bone sm:text-2xl">
                      {entry.title}
                    </h4>
                    <p className="mt-2.5 font-body text-[16.5px] leading-relaxed text-bone/70">
                      {entry.text}
                    </p>
                  </div>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Discoveries — laid out as excavation strata                          */
/* ------------------------------------------------------------------ */

function Stratum({ discovery, index }: { discovery: Discovery; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const cinematic = useCinematic();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const imgY = useTransform(smooth, [0, 1], [cinematic ? "-12%" : "0%", cinematic ? "12%" : "0%"]);
  const rulerY = useTransform(smooth, [0, 1], ["18%", "-18%"]);
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`relative grid gap-8 border-t border-gold/12 py-14 lg:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12 ${
        flip ? "" : ""
      }`}
    >
      {/* depth ruler */}
      <div className="relative hidden lg:block">
        <div className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
        <motion.div className="absolute inset-y-0 left-0 w-12" style={{ y: rulerY }}>
          {Array.from({ length: 9 }).map((_, t) => (
            <span
              key={t}
              className="absolute left-4 block h-px bg-gold/30"
              style={{ top: `${t * 12}%`, width: t % 2 === 0 ? "1.1rem" : "0.55rem" }}
            />
          ))}
        </motion.div>
        <p
          className="label-ui absolute top-1/2 left-1 text-gold/60"
          style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
        >
          {discovery.depth}
        </p>
      </div>

      {/* image window */}
      <div className={`relative ${flip ? "lg:order-3" : ""}`}>
        <Reveal y={44} className="relative overflow-hidden border border-gold/20">
          <div className="relative aspect-[4/3] overflow-hidden">
            {discovery.image && (
              <motion.img
                src={discovery.image}
                alt={discovery.title}
                className="absolute inset-0 h-[124%] w-full object-cover"
                style={{ y: imgY }}
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.75)]" />
          </div>
          <span className="label-ui absolute top-3 left-3 border border-gold/40 bg-ink/70 px-2.5 py-1 text-gold">
            {discovery.layer}
          </span>
          <span className="label-ui absolute right-3 bottom-3 text-bone/60">
            {discovery.year}
          </span>
        </Reveal>
      </div>

      {/* field notes */}
      <div className={flip ? "lg:order-2" : ""}>
        <Reveal y={38} delay={0.08}>
          <p className="label-ui text-gold/70">
            {discovery.place} · {discovery.year}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-bone sm:text-4xl">
            {discovery.title}
          </h3>
          <p className="mt-4 font-body text-lg leading-relaxed text-bone/78">{discovery.body}</p>
          <ul className="mt-6 space-y-3 border-l border-gold/25 pl-5">
            {discovery.points.map((p) => (
              <li key={p} className="relative font-body text-[16px] leading-relaxed text-muted">
                <span className="absolute top-2.5 -left-[1.42rem] h-1.5 w-1.5 rotate-45 bg-gold/70" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function Atlas() {
  return (
    <section id="atlas" className="relative overflow-hidden">
      {/* sediment backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(52,56,44,0.5) 0 2px, transparent 2px 46px), radial-gradient(70% 50% at 50% 0%, rgba(31,53,39,0.45), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-10 sm:px-8">
        <Reveal>
          <SectionHeading
            numeral="IV"
            kicker="Atlas & Time"
            title="Where it happened, and how we know"
            intro="History has coordinates. These are the villages, rivers, islands and beaches where this exhibition's objects come from, the order things happened in, and the discoveries that changed what historians thought was true about the Northwest Coast."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <WorldMap />
        </Reveal>

        <div className="mt-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-5">
              <h3 className="font-display text-3xl text-bone sm:text-4xl">
                A timeline from the first hearths to today
              </h3>
              <p className="label-ui text-muted">15 moments · 14,000 years on this coast</p>
            </div>
          </Reveal>
          <Timeline />
        </div>

        <div className="mt-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-5">
              <h3 className="font-display text-3xl text-bone sm:text-4xl">
                Four discoveries that rewrote the story
              </h3>
              <p className="label-ui text-muted">Read downward, like beach strata</p>
            </div>
          </Reveal>
          <div className="mt-4">
            {DISCOVERIES.map((d, i) => (
              <Stratum key={d.id} discovery={d} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
