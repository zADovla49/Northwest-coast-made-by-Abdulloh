import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CULTURES, NATIONS, PEOPLE, type Culture, type Person } from "../lib/data";
import {
  useCinematic,
  useStage,
  useStageIndex,
  useViewportWidth,
} from "../lib/motion";
import Reveal from "../components/Reveal";
import { SectionHeading } from "../components/MuseumPlate";
import StageFade from "../components/StageFade";

/* ------------------------------------------------------------------ */
/* Portrait + story, shared by both layouts                            */
/* ------------------------------------------------------------------ */

function PortraitFrame({
  person,
  imgScale,
  className = "",
}: {
  person: Person;
  imgScale?: MotionValue<number>;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-48 w-[130%] -translate-x-1/2"
        aria-hidden="true"
        style={{
          background: "linear-gradient(180deg, rgba(255,236,190,0.20), transparent 78%)",
          clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          filter: "blur(8px)",
        }}
      />
      <div className="relative overflow-hidden border border-gold/40 shadow-[0_50px_120px_-40px_rgba(0,0,0,1)]">
        <motion.img
          src={person.image}
          alt={`Artistic reconstruction representing ${person.name}`}
          className="aspect-[4/5] w-full object-cover"
          style={imgScale ? { scale: imgScale } : undefined}
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.6)]" />
      </div>
      <p className="label-ui mt-3 text-center text-golddim lg:text-left">
        Artistic reconstruction · not an authentic likeness
      </p>
    </div>
  );
}

function PersonStory({ person, className = "" }: { person: Person; className?: string }) {
  return (
    <div className={className}>
      <p className="label-ui text-gold/80">{person.culture}</p>
      <h3 className="mt-3 font-display text-3xl leading-[1.04] text-bone sm:text-5xl lg:text-6xl engraved">
        {person.name}
      </h3>
      <p className="mt-3 font-body text-lg italic text-goldbright/85">
        {person.lived} · {person.role}
      </p>

      {person.quote && (
        <blockquote className="mt-6 border-l-2 border-gold/50 pl-5">
          <p className="font-body text-xl leading-relaxed text-bone/90 italic">
            “{person.quote}”
          </p>
          {person.quoteSource && (
            <footer className="label-ui mt-2 text-muted">{person.quoteSource}</footer>
          )}
        </blockquote>
      )}

      <p className="mt-5 font-body text-[17px] leading-relaxed text-bone/75">{person.body}</p>

      <ul className="mt-5 space-y-2">
        {person.facts.map((f) => (
          <li key={f} className="flex gap-3 font-body text-[15.5px] leading-snug text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold/70" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <p className="label-ui mt-5 border-t border-gold/15 pt-3 text-bone/40">{person.likeness}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned portrait sequence                                   */
/* ------------------------------------------------------------------ */

function PortraitScene({
  person,
  index,
  total,
  cam,
  flip,
}: {
  person: Person;
  index: number;
  total: number;
  cam: MotionValue<number>;
  flip: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;
  const first = index === 0;
  const last = index === total - 1;
  const cinematic = useCinematic();

  const oIn = start + span * 0.07;
  const oOut = end - span * 0.07;
  const opacity = useTransform(
    cam,
    first ? [start, oOut, end] : [start, oIn, oOut, end],
    first ? [1, 1, last ? 1 : 0] : [0, 1, 1, last ? 1 : 0],
  );

  const frameRotate = useTransform(
    cam,
    [start, start + span * 0.4, end],
    [flip ? -22 : 22, 0, flip ? 16 : -16],
  );
  const frameZ = useTransform(cam, [start, start + span * 0.45, end], [-320, 0, 220]);
  const frameScale = useTransform(cam, [start, end], [1.1, 0.98]);
  const imgScale = useTransform(cam, [start, end], [1.22, 1.02]);

  const tA = start + span * 0.18;
  const tB = start + span * 0.34;
  const tC = start + span * 0.74;
  const tD = start + span * 0.92;
  const textOpacity = useTransform(cam, [tA, tB, tC, tD], [0, 1, 1, 0]);
  const textX = useTransform(cam, [tA, tB, tC, tD], [flip ? 90 : -90, 0, 0, flip ? -70 : 70]);
  const textY = useTransform(cam, [tA, tD], [30, -30]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }} aria-hidden={index !== 0}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, rgba(31,53,39,0.55), transparent 72%), radial-gradient(45% 40% at 50% 12%, rgba(201,164,76,0.14), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className={`persp absolute inset-0 flex flex-row items-center justify-center gap-16 px-16 ${
          flip ? "flex-row-reverse" : ""
        }`}
      >
        <motion.div
          className="w-[26rem] shrink-0"
          style={{ rotateY: cinematic ? frameRotate : 0, z: frameZ, scale: frameScale }}
        >
          <PortraitFrame person={person} imgScale={imgScale} />
        </motion.div>

        <motion.div className="max-w-xl" style={{ opacity: textOpacity, x: textX, y: textY }}>
          <PersonStory person={person} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function PortraitStage() {
  const ref = useRef<HTMLElement | null>(null);
  const { cam, raw } = useStage(ref, { stiffness: 66, damping: 21 });
  const active = useStageIndex(raw, PEOPLE.length);
  const barScale = useTransform(raw, [0, 1], [0.02, 1]);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ height: `${PEOPLE.length * 120}vh` }}
      aria-label="Stories of real people and cultures"
    >
      <div className="stage sticky top-0 overflow-hidden bg-charcoal">
        <div className="absolute inset-0 stone-panel opacity-45" aria-hidden="true" />

        {PEOPLE.map((p, i) => (
          <PortraitScene
            key={p.id}
            person={p}
            index={i}
            total={PEOPLE.length}
            cam={cam}
            flip={i % 2 === 1}
          />
        ))}

        <div className="absolute inset-x-0 bottom-6 z-40 flex items-center justify-between gap-4 px-10">
          <span className="label-ui text-gold/70">
            Chapter V · {String(active + 1).padStart(2, "0")} /{" "}
            {String(PEOPLE.length).padStart(2, "0")}
          </span>
          <span className="label-ui text-muted">{PEOPLE[active].culture}</span>
        </div>
        <div className="absolute inset-x-10 bottom-4 z-40">
          <div className="h-px w-full bg-bone/12">
            <motion.div className="h-px origin-left bg-gold" style={{ scaleX: barScale }} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-40 vignette" aria-hidden="true" />
        <StageFade cam={cam} from={0.955} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Small screens: the same portraits, walked vertically                */
/* ------------------------------------------------------------------ */

function PortraitScrollItem({ person, index }: { person: Person; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const cinematic = useCinematic();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const imgScale = useTransform(smooth, [0, 1], [1.18, 1]);
  const rotateY = useTransform(smooth, [0, 0.5, 1], [cinematic ? -16 : 0, 0, cinematic ? 16 : 0]);
  const z = useTransform(smooth, [0, 0.5, 1], [-90, 0, -90]);
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-8 border-t border-gold/12 py-14 lg:flex-row lg:items-center lg:gap-14 ${
        flip ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="persp-sm mx-auto w-full max-w-sm lg:mx-0 lg:w-[40%]">
        <motion.div style={{ rotateY, z, transformStyle: "preserve-3d" }}>
          <PortraitFrame person={person} imgScale={imgScale} />
        </motion.div>
      </div>
      <Reveal y={40} className="lg:w-[60%]">
        <PersonStory person={person} />
      </Reveal>
    </div>
  );
}

function PortraitScroll() {
  return (
    <section
      className="relative mx-auto max-w-6xl px-5 pb-16 sm:px-8"
      aria-label="Stories of real people and cultures"
    >
      <div className="absolute inset-0 stone-panel opacity-25" aria-hidden="true" />
      <div className="relative">
        {PEOPLE.map((p, i) => (
          <PortraitScrollItem key={p.id} person={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** One brass-ruled entry — used for both the exhibits and the Nations. */
function ExhibitCard({ c }: { c: Culture }) {
  return (
    <article className="group relative border-l border-gold/25 pl-6 transition-colors duration-500 hover:border-gold/70">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-display text-2xl text-bone transition-colors duration-500 group-hover:text-goldbright">
          {c.name}
        </h4>
        <span className="label-ui text-gold/60">{c.span}</span>
      </div>
      <p className="label-ui mt-1.5 text-muted">{c.place}</p>
      <p className="mt-3 font-body text-[16.5px] leading-relaxed text-bone/75">{c.text}</p>
      <p className="mt-3 font-body text-[15.5px] leading-relaxed text-goldbright/70 italic">
        Today: {c.legacy}
      </p>
    </article>
  );
}

export default function People() {
  const vw = useViewportWidth();
  const compact = vw < 900;

  return (
    <>
      <section id="people" className="relative mx-auto max-w-6xl px-5 pt-28 pb-14 sm:px-8">
        <Reveal>
          <SectionHeading
            numeral="V"
            kicker="People & Cultures"
            title="History is carried by people"
            intro="Behind every object is a person with a job, a family and a worldview. Some Northwest Coast artists are known to us by name; many more are known only through the tradition they carried. The portraits here are artistic reconstructions, made with respect — never authentic likenesses."
          />
        </Reveal>
      </section>

      {compact ? <PortraitScroll /> : <PortraitStage />}

      {/* cultures band */}
      <section className="relative mx-auto max-w-6xl px-5 pt-24 pb-28 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-5">
            <h3 className="font-display text-3xl text-bone sm:text-4xl">
              The eight exhibits of this museum
            </h3>
            <p className="label-ui text-muted">Land, resources and living culture</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {CULTURES.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.08} y={36}>
              <ExhibitCard c={c} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-5">
            <h3 className="font-display text-3xl text-bone sm:text-4xl">
              The Nations of this coast
            </h3>
            <p className="label-ui text-muted">
              Distinct languages, territories and art styles · all living nations
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {NATIONS.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.08} y={36}>
              <ExhibitCard c={c} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
