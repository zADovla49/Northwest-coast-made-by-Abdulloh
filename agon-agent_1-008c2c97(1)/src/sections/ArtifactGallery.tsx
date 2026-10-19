import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ARTIFACTS,
  AUTHENTICITY_NOTE,
  type Artifact,
  type Authenticity,
} from "../lib/data";
import {
  clamp,
  scrollStageTo,
  useCinematic,
  useStage,
  useViewportWidth,
} from "../lib/motion";
import { AuthenticityBadge, SectionHeading } from "../components/MuseumPlate";
import Reveal from "../components/Reveal";
import StageFade from "../components/StageFade";

const LEGEND: { value: Authenticity; text: string }[] = [
  { value: "original", text: "The kind of real object held in the museum or cultural centre named on its label." },
  { value: "cast", text: "A replica made for display — originals may be too fragile, or too sacred, to handle." },
  { value: "reconstruction", text: "Re-created from archaeological evidence and the knowledge of living practitioners." },
];

/* ------------------------------------------------------------------ */
/* Shared: the wall label                                              */
/* ------------------------------------------------------------------ */

function ArtifactLabel({ artifact, compact = false }: { artifact: Artifact; compact?: boolean }) {
  return (
    <div className={compact ? "" : "plate p-5 sm:p-6"}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="label-ui text-gold/70">{artifact.case}</span>
        <AuthenticityBadge value={artifact.authenticity} />
      </div>
      <h3 className="mt-3 font-display text-2xl leading-tight text-bone sm:text-3xl">
        {artifact.name}
      </h3>
      <p className="mt-1 font-body text-base italic text-goldbright/80">{artifact.culture}</p>

      <div className="mt-4 h-px w-full rule-gold opacity-60" />

      <dl className={`mt-4 grid gap-x-6 gap-y-2.5 ${compact ? "" : "sm:grid-cols-2"}`}>
        {[
          { label: "Date", value: artifact.date },
          { label: "Material", value: artifact.material },
          { label: "Size", value: artifact.size },
          { label: "Found", value: artifact.found },
        ].map((row) => (
          <div key={row.label} className="grid grid-cols-[4.6rem_1fr] gap-2">
            <dt className="label-ui pt-0.5 text-muted">{row.label}</dt>
            <dd className="font-body text-[15px] leading-snug text-bone/85">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 font-body text-[16px] leading-relaxed text-bone/75">{artifact.summary}</p>

      <ul className="mt-4 space-y-2 border-t border-gold/15 pt-4">
        {artifact.facts.map((f) => (
          <li key={f} className="flex gap-3 font-body text-[15px] leading-snug text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold/70" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <p className="label-ui mt-4 text-golddim">
        Home: <span className="normal-case tracking-normal">{artifact.home}</span>
      </p>
      <p className="label-ui mt-1.5 text-bone/35">
        {AUTHENTICITY_NOTE[artifact.authenticity]} · Image: AI-generated rendering for this
        student project
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned 3D carousel                                         */
/* ------------------------------------------------------------------ */

interface ItemProps {
  artifact: Artifact;
  index: number;
  center: MotionValue<number>;
  spacing: number;
  cardW: number;
  cardH: number;
  active: number;
  onSelect: (i: number) => void;
}

function CarouselItem({
  artifact,
  index,
  center,
  spacing,
  cardW,
  cardH,
  active,
  onSelect,
}: ItemProps) {
  const x = useTransform(center, (c) => (index - c) * spacing);
  const rotateY = useTransform(center, (c) => clamp((index - c) * 34, -58, 58));
  const z = useTransform(center, (c) => -Math.abs(index - c) * 250);
  const y = useTransform(center, (c) => Math.abs(index - c) * 10);
  const opacity = useTransform(center, (c) => 1 - Math.min(Math.abs(index - c) * 0.3, 0.86));
  const scale = useTransform(center, (c) => 1 - Math.min(Math.abs(index - c) * 0.07, 0.26));
  const zIndex = useTransform(center, (c) => 100 - Math.round(Math.abs(index - c) * 10));
  const isActive = active === index;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(index);
        }
      }}
      className="absolute top-1/2 left-1/2 cursor-pointer text-left outline-none focus-visible:ring-1 focus-visible:ring-gold"
      style={{
        x,
        y,
        z,
        rotateY,
        opacity,
        scale,
        zIndex,
        width: cardW,
        height: cardH,
        marginLeft: -cardW / 2,
        marginTop: -cardH / 2,
      }}
      aria-label={`Bring ${artifact.name} forward`}
    >
      <div
        className="relative h-full w-full overflow-hidden border transition-colors duration-700"
        style={{
          borderColor: isActive ? "rgba(201,164,76,0.75)" : "rgba(201,164,76,0.18)",
          boxShadow: isActive
            ? "0 0 0 1px rgba(243,221,164,0.25), 0 40px 90px -30px rgba(0,0,0,0.95), 0 0 90px -20px rgba(201,164,76,0.35)"
            : "0 30px 70px -30px rgba(0,0,0,0.9)",
        }}
      >
        <img
          src={artifact.image}
          alt={`${artifact.name} — ${artifact.culture}`}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/45" />
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: isActive ? 0 : 0.55,
            background: "linear-gradient(180deg, rgba(7,8,10,0.5), rgba(7,8,10,0.75))",
          }}
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="label-ui text-gold/70">{artifact.case.split("·")[1]?.trim()}</span>
          <span className="label-ui text-bone/45">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="label-ui text-gold/80">{artifact.era}</p>
          <h4 className="mt-1.5 font-display text-lg leading-tight text-bone">{artifact.name}</h4>
          <p className="mt-1 font-body text-[13px] leading-snug text-muted">{artifact.culture}</p>
        </div>
      </div>

      {/* floor shadow */}
      <div
        className="absolute left-1/2 h-6 w-4/5 -translate-x-1/2 rounded-[50%] bg-black blur-md"
        style={{ top: "100%", opacity: isActive ? 0.75 : 0.4 }}
      />
    </motion.div>
  );
}

function GalleryStage() {
  const ref = useRef<HTMLElement | null>(null);
  const { cam, raw } = useStage(ref, { stiffness: 78, damping: 22 });
  const vw = useViewportWidth();
  const cinematic = useCinematic();
  const n = ARTIFACTS.length;

  const spacing = vw < 1280 ? 350 : 440;
  const cardW = vw < 1280 ? 250 : 292;
  const cardH = Math.round(cardW * 1.42);

  const center = useTransform(cam, [0, 1], [0, n - 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(center, "change", (v) => {
    const next = clamp(Math.round(v), 0, n - 1);
    setActive((prev) => (prev === next ? prev : next));
  });

  const railScale = useTransform(raw, [0, 1], [0, 1]);
  const floorY = useTransform(cam, [0, 1], ["0%", "-6%"]);

  const focus = (i: number) => {
    const target = clamp(i, 0, n - 1);
    scrollStageTo(ref, n === 1 ? 0 : target / (n - 1), cinematic);
  };

  const artifact = ARTIFACTS[active];

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ height: `${(n - 1) * 46 + 165}vh` }}
      aria-label="Artifact gallery"
    >
      <div className="stage sticky top-0 overflow-hidden bg-ink">
        {/* backdrop */}
        <div className="absolute inset-0 stone-panel opacity-70" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 38%, rgba(201,164,76,0.16), transparent 70%), radial-gradient(90% 70% at 50% 120%, rgba(31,53,39,0.5), transparent 70%)",
          }}
        />

        {/* spotlight cone over the current case */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[70%] w-[46vw] max-w-[560px] -translate-x-1/2"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,236,190,0.20), rgba(255,236,190,0.05) 45%, transparent 82%)",
            clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
            filter: "blur(10px)",
          }}
        />

        {/* perspective floor */}
        <motion.div
          className="persp-sm pointer-events-none absolute inset-x-0 bottom-0 h-[46%] overflow-hidden"
          style={{ y: floorY }}
          aria-hidden="true"
        >
          <div
            className="h-[220%] w-full origin-top"
            style={{
              transform: "rotateX(76deg)",
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(201,164,76,0.16) 0 1px, transparent 1px 90px), repeating-linear-gradient(0deg, rgba(201,164,76,0.12) 0 1px, transparent 1px 90px)",
              maskImage: "radial-gradient(70% 60% at 50% 0%, #000 10%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(70% 60% at 50% 0%, #000 10%, transparent 75%)",
            }}
          />
        </motion.div>

        {/* the carousel */}
        <div className="persp p3d absolute inset-0">
          {ARTIFACTS.map((a, i) => (
            <CarouselItem
              key={a.id}
              artifact={a}
              index={i}
              center={center}
              spacing={spacing}
              cardW={cardW}
              cardH={cardH}
              active={active}
              onSelect={focus}
            />
          ))}
        </div>

        {/* counter */}
        <div className="absolute top-[11vh] right-6 z-40 text-right sm:right-10">
          <p className="font-display text-4xl leading-none text-goldbright sm:text-5xl">
            {String(active + 1).padStart(2, "0")}
            <span className="text-lg text-muted"> / {String(n).padStart(2, "0")}</span>
          </p>
          <p className="label-ui mt-2 text-muted">{artifact.era}</p>
        </div>

        {/* wall label */}
        <div className="absolute bottom-[10vh] left-6 z-40 w-[min(26rem,42vw)] sm:left-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={artifact.id}
              initial={{ opacity: 0, y: 26, rotateX: cinematic ? 8 : 0 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.16, 0.84, 0.34, 1] }}
              className="persp-sm"
            >
              <ArtifactLabel artifact={artifact} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="absolute right-6 bottom-[10vh] z-40 flex items-center gap-3 sm:right-10">
          <button
            type="button"
            onClick={() => focus(active - 1)}
            disabled={active === 0}
            className="label-ui border border-gold/30 px-4 py-3 text-gold transition hover:border-gold/70 hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous artifact"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => focus(active + 1)}
            disabled={active === n - 1}
            className="label-ui border border-gold/30 px-4 py-3 text-gold transition hover:border-gold/70 hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next artifact"
          >
            Next →
          </button>
        </div>

        {/* progress rail */}
        <div className="absolute inset-x-6 bottom-[6vh] z-40 sm:inset-x-10">
          <div className="h-px w-full bg-bone/12">
            <motion.div className="h-px origin-left bg-gold" style={{ scaleX: railScale }} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-40 vignette" aria-hidden="true" />
        <StageFade cam={cam} from={0.96} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Small screens: the same gallery, walked vertically                  */
/* ------------------------------------------------------------------ */

function GalleryItemVertical({ artifact, index }: { artifact: Artifact; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const cinematic = useCinematic();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const rotateY = useTransform(smooth, [0, 0.5, 1], [cinematic ? -26 : 0, 0, cinematic ? 26 : 0]);
  const z = useTransform(smooth, [0, 0.5, 1], [-140, 0, -140]);
  const imgScale = useTransform(smooth, [0, 1], [1.16, 1]);
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:gap-14 ${
        flip ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="persp-sm lg:w-[42%]">
        <motion.div
          className="relative overflow-hidden border border-gold/25"
          style={{ rotateY, z, transformStyle: "preserve-3d" }}
        >
          <motion.img
            src={artifact.image}
            alt={`${artifact.name} — ${artifact.culture}`}
            className="w-full object-cover"
            style={{ scale: imgScale }}
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.7)]" />
          <span className="label-ui absolute top-3 left-3 text-gold/80">{artifact.case}</span>
        </motion.div>
      </div>
      <div className="lg:w-[58%]">
        <Reveal y={40}>
          <ArtifactLabel artifact={artifact} compact />
        </Reveal>
      </div>
    </div>
  );
}

function GalleryScroll() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      {ARTIFACTS.map((a, i) => (
        <GalleryItemVertical key={a.id} artifact={a} index={i} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function ArtifactGallery() {
  const vw = useViewportWidth();
  const compact = vw < 900;

  return (
    <>
      <section id="gallery" className="relative mx-auto max-w-6xl px-5 pt-28 pb-16 sm:px-8">
        <Reveal>
          <SectionHeading
            numeral="III"
            kicker="The Artifact Gallery"
            title="Ten objects, ten ways into this coast"
            intro="Walk the cases. Each object rotates toward you as the camera passes, and its wall label surfaces with the material, the Nation that made it, where it was found — and whether you are looking at an original, a replica, or a reconstruction."
          />
        </Reveal>

        <Reveal delay={0.15} className="mt-12 grid gap-4 sm:grid-cols-3">
          {LEGEND.map((l) => (
            <div
              key={l.value}
              className="border border-gold/15 bg-charcoal/60 p-4 transition hover:border-gold/40 hover:bg-charcoal2/70"
            >
              <AuthenticityBadge value={l.value} />
              <p className="mt-3 font-body text-[15px] leading-snug text-muted">{l.text}</p>
            </div>
          ))}
        </Reveal>

        {!compact && (
          <Reveal delay={0.25} className="mt-10 flex items-center gap-4">
            <span className="label-ui text-gold/70">Scroll to walk the gallery</span>
            <span className="h-px flex-1 rule-gold opacity-40" />
            <span className="label-ui text-muted">Click any case to bring it forward</span>
          </Reveal>
        )}
      </section>

      {compact ? <GalleryScroll /> : <GalleryStage />}
    </>
  );
}
