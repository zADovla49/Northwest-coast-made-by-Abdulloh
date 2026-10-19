import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { useCinematic, useStage, useStageIndex, useViewportWidth } from "../lib/motion";
import { SCENES, type Scene } from "../lib/data";
import StageFade from "../components/StageFade";
import StageFlash from "../components/StageFlash";

interface SceneLayerProps {
  scene: Scene;
  index: number;
  total: number;
  cam: MotionValue<number>;
  cinematic: boolean;
}

/** One immersive environment inside the pinned camera stage. */
function SceneLayer({ scene, index, total, cam, cinematic }: SceneLayerProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;
  const first = index === 0;
  const last = index === total - 1;

  const oIn = start + span * 0.08;
  const oOut = end - span * 0.08;

  const opacity = useTransform(
    cam,
    first ? [start, oOut, end] : [start, oIn, oOut, end],
    first ? [1, 1, last ? 1 : 0] : [0, 1, 1, last ? 1 : 0],
  );

  /* the camera keeps pushing forward through every scene */
  const scale = useTransform(cam, [start, end], [1.26, 1.0]);
  const driftY = useTransform(cam, [start, end], ["7%", "-7%"]);
  const fgY = useTransform(cam, [start, end], ["20%", "-22%"]);
  const fg2Y = useTransform(cam, [start, end], ["30%", "-34%"]);

  /* information surfaces as the camera settles */
  const tA = start + span * 0.16;
  const tB = start + span * 0.32;
  const tC = start + span * 0.72;
  const tD = start + span * 0.9;
  const textOpacity = useTransform(cam, [tA, tB, tC, tD], [0, 1, 1, 0]);
  const textY = useTransform(cam, [tA, tB, tC, tD], [90, 0, 0, -60]);
  const textZ = useTransform(cam, [start, end], [-260, 180]);
  const textRotate = useTransform(cam, [start, end], [cinematic ? 7 : 0, cinematic ? -4 : 0]);
  const numeralOpacity = useTransform(cam, [tA, tB, tC, tD], [0, 0.16, 0.16, 0]);
  const numeralX = useTransform(cam, [start, end], ["-6%", "6%"]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }} aria-hidden={index !== 0}>
      {/* far: the environment */}
      <motion.div className="absolute inset-0" style={{ scale, y: driftY }}>
        <img
          src={scene.image}
          alt={`${scene.title} — ${scene.kicker}`}
          className="h-full w-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      </motion.div>

      {/* colour grade + tint */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(7,8,10,0.86) 0%, rgba(7,8,10,0.25) 32%, rgba(7,8,10,0.55) 68%, rgba(7,8,10,0.96) 100%), radial-gradient(80% 60% at 50% 40%, ${scene.tint}, transparent 70%)`,
        }}
      />

      {/* drifting fog */}
      <div
        className="anim-drift pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 70%, rgba(190,200,180,0.10), transparent 70%), radial-gradient(50% 35% at 80% 60%, rgba(201,164,76,0.08), transparent 70%)",
        }}
      />

      {/* mid + near terrain silhouettes for layered depth */}
      <motion.div className="pointer-events-none absolute inset-x-[-12%] bottom-[-14%] h-[42%]" style={{ y: fgY }}>
        <div
          className="absolute inset-0 bg-black/70"
          style={{ borderRadius: "48% 52% 0 0 / 26% 22% 0 0" }}
        />
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-x-[-16%] bottom-[-18%] h-[34%]" style={{ y: fg2Y }}>
        <div
          className="absolute inset-0 bg-black"
          style={{ borderRadius: "55% 45% 0 0 / 30% 26% 0 0" }}
        />
      </motion.div>

      {/* giant chapter numeral watermark */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: numeralOpacity, x: numeralX }}
      >
        <span className="font-display text-[46vw] leading-none text-goldbright select-none">
          {scene.numeral}
        </span>
      </motion.div>

      {/* the interpretive panel */}
      <motion.div
        className="persp absolute inset-0 flex items-end justify-center px-5 pb-20 sm:items-center sm:justify-start sm:px-10 sm:pb-0 lg:px-20"
        style={{ opacity: textOpacity, y: textY, z: textZ, rotateX: textRotate }}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="label-ui text-gold">{scene.kicker}</span>
          </div>
          <h3 className="mt-4 font-display text-3xl leading-[1.06] text-bone sm:text-5xl lg:text-6xl engraved">
            {scene.title}
          </h3>
          <p className="mt-4 max-w-xl font-body text-[16.5px] leading-relaxed text-bone/80 sm:mt-5 sm:text-xl">
            {scene.body}
          </p>
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-4 border-t border-gold/20 pt-4 sm:mt-7 sm:gap-x-10 sm:pt-5">
            {scene.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-xl text-goldbright sm:text-2xl">{s.value}</dt>
                <dd className="label-ui mt-1 max-w-[8.5rem] text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * CHAPTER II — Immersive historical environments.
 * One pinned stage; scrolling moves the camera through four coastal worlds.
 */
export default function AncientWorlds() {
  const ref = useRef<HTMLElement | null>(null);
  const { cam, raw } = useStage(ref, { stiffness: 62, damping: 20 });
  const cinematic = useCinematic();
  const vw = useViewportWidth();
  const active = useStageIndex(raw, SCENES.length);

  const perScene = vw < 768 ? 140 : vw < 1280 ? 122 : 114;
  const hudOpacity = useTransform(cam, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);
  const barScale = useTransform(cam, [0, 1], [0.02, 1]);

  return (
    <section
      id="worlds"
      ref={ref}
      className="relative w-full"
      style={{ height: `${SCENES.length * perScene}vh` }}
      aria-label="Immersive environments of the Northwest Coast"
    >
      <div className="stage sticky top-0 overflow-hidden bg-ink">
        {SCENES.map((scene, i) => (
          <SceneLayer
            key={scene.id}
            scene={scene}
            index={i}
            total={SCENES.length}
            cam={cam}
            cinematic={cinematic}
          />
        ))}

        {/* cinematic letterbox */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[7vh] bg-black" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[7vh] bg-black" aria-hidden="true" />

        {/* camera HUD */}
        <motion.div
          className="absolute inset-x-0 bottom-[7vh] z-40 flex items-end justify-between gap-6 px-5 pb-4 sm:px-10"
          style={{ opacity: hudOpacity }}
        >
          <div className="flex items-center gap-4">
            <span className="label-ui text-gold/70">Chapter II</span>
            <span className="h-3 w-px bg-gold/30" />
            <span className="label-ui text-bone/80">
              Scene {SCENES[active].numeral} / IV · {SCENES[active].title}
            </span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {SCENES.map((s, i) => (
              <span
                key={s.id}
                className={`h-px w-10 transition-colors duration-500 ${
                  i <= active ? "bg-gold" : "bg-bone/20"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 bottom-[7vh] z-40 h-px origin-left bg-gold/70"
          style={{ scaleX: barScale }}
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 z-40 vignette" aria-hidden="true" />
        <StageFlash cam={cam} to={0.05} peak={0.85} />
        <StageFade cam={cam} from={0.955} />
      </div>
    </section>
  );
}
