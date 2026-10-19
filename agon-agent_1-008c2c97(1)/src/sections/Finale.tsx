import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { PROJECT, SOURCES } from "../lib/data";
import { scrollToId, useCinematic, useStage } from "../lib/motion";
import Reveal from "../components/Reveal";
import Seal from "../components/Seal";

const CLOSING = [
  "The cedar was never a resource. It was a relative.",
  "Every tide line is a garden. Every river is a road.",
  "This coast has been home for fourteen thousand years — and still is.",
];

const METHOD = [
  "Facts, dates and place names were checked against museum, tribal and academic sources, which are listed below.",
  "Each wall label states whether the object is an authentic original, a replica, or a reconstruction — and names the Nation whose heritage it is, because those three things are not the same and a visitor deserves to know which one they are looking at.",
  "All imagery on this site is AI-generated for a school project. No photograph of a real museum object is used, and the portraits are artistic reconstructions of roles — never authentic likenesses of identified people.",
  "The building itself is imaginary. Its model is the American Museum of Natural History in New York, which holds the Great Canoe, the Yuquot whalers' shrine and one of the world's largest Northwest Coast collections.",
  "These are living cultures. Haida, Tlingit, Kwakwaka'wakw, Nuu-chah-nulth, Coast Salish, Heiltsuk, Makah and Chinook peoples are here today — carving, weaving, fishing, potlatching and repatriating their own heritage.",
];

function ClosingStage() {
  const ref = useRef<HTMLElement | null>(null);
  const { cam } = useStage(ref, { stiffness: 60, damping: 20 });
  const cinematic = useCinematic();

  /* the camera pulls back out of the building */
  const bgScale = useTransform(cam, [0, 1], [1.2, 0.92]);
  const bgY = useTransform(cam, [0, 1], ["-3%", "4%"]);
  const skyFade = useTransform(cam, [0, 0.55, 1], [0.35, 0.1, 0.55]);

  const line1 = useTransform(cam, [0.05, 0.2, 0.55, 0.7], [0, 1, 1, 0]);
  const line2 = useTransform(cam, [0.2, 0.35, 0.6, 0.75], [0, 1, 1, 0]);
  const line3 = useTransform(cam, [0.38, 0.55, 0.78, 0.9], [0, 1, 1, 0]);
  const sealOpacity = useTransform(cam, [0.62, 0.8, 0.93, 1], [0, 1, 1, 0]);
  const sealScale = useTransform(cam, [0.62, 1], [0.86, 1.1]);

  const iris = useTransform(cam, [0.82, 1], [0, 1.25]);
  const textZ = useTransform(cam, [0, 1], [-120, 260]);

  const lines = [line1, line2, line3];

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ height: "300vh" }}
      aria-label="Closing hall"
    >
      <div className="stage sticky top-0 overflow-hidden bg-ink">
        <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
          <img
            src="/img/env/night.jpg"
            alt="The Milky Way above a dark desert mesa"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <motion.div className="absolute inset-0 bg-ink" style={{ opacity: skyFade }} aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 60%, rgba(201,164,76,0.12), transparent 70%)",
          }}
        />

        <motion.div
          className="persp absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ z: textZ }}
        >
          {CLOSING.map((text, i) => (
            <motion.p
              key={text}
              className="max-w-4xl font-display text-2xl leading-[1.35] text-bone sm:text-4xl lg:text-5xl engraved"
              style={{ opacity: lines[i] }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          style={{ opacity: sealOpacity, scale: sealScale }}
        >
          <Seal className="h-20 w-20" />
          <p className="label-ui text-gold/85">{PROJECT.title}</p>
          <p className="max-w-md font-body text-lg text-bone/70 italic">
            Thank you for walking through history with us.
          </p>
        </motion.div>

        {/* blackout bloom — the iris closes as the journey ends */}
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[130vmax] w-[130vmax] rounded-full bg-ink"
          style={{
            scale: iris,
            marginLeft: "-65vmax",
            marginTop: "-65vmax",
          }}
          aria-hidden="true"
        />
        {!cinematic && (
          <div className="pointer-events-none absolute inset-0 bg-ink/70" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}

export default function Finale() {
  return (
    <>
      <div id="finale" className="relative">
        <ClosingStage />
      </div>

      {/* ---------------- credits ---------------- */}
      <section className="relative bg-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 0%, rgba(31,53,39,0.5), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-16 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-center gap-5 text-center">
              <Seal className="h-14 w-14" />
              <h2 className="font-display text-3xl text-bone sm:text-4xl">
                About this exhibition
              </h2>
              <p className="max-w-3xl font-body text-lg leading-relaxed text-bone/75">
                <span className="text-goldbright">{PROJECT.title}</span> is a virtual museum
                about the Indigenous Peoples of this coast and the environment that shaped
                them, built as a {PROJECT.course} project in {PROJECT.year}.{" "}
                {PROJECT.inspiredBy}. It is not a real building and not a real collection —
                it is a student exhibition that borrows the way museums organise knowledge:
                objects, labels, maps, timelines and the people behind them.
              </p>
            </div>
          </Reveal>

          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <Reveal y={40}>
              <h3 className="font-display text-2xl text-bone">How it was made</h3>
              <div className="mt-4 h-px w-full rule-gold opacity-50" />
              <ol className="mt-6 space-y-4">
                {METHOD.map((m, i) => (
                  <li key={m} className="flex gap-4">
                    <span className="font-display text-sm text-gold/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[16.5px] leading-relaxed text-bone/75">{m}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-10 border border-gold/20 bg-charcoal/60 p-5">
                <p className="label-ui text-gold/75">Colophon</p>
                <p className="mt-3 font-body text-[16px] leading-relaxed text-muted">
                  Built with React, TypeScript, Tailwind CSS and Framer Motion. All motion is
                  scroll-driven CSS 3D — no WebGL, so it runs smoothly on an ordinary school
                  laptop. Typefaces: Cinzel for the inscriptions, Cormorant Garamond for the
                  body text, Inter for the labels. The exhibition respects the
                  “reduce motion” setting in your operating system.
                </p>
              </div>
            </Reveal>

            <Reveal y={40} delay={0.1}>
              <h3 className="font-display text-2xl text-bone">Sources</h3>
              <div className="mt-4 h-px w-full rule-gold opacity-50" />
              <ul className="mt-6 space-y-5">
                {SOURCES.map((s) => (
                  <li key={s.title} className="border-l border-gold/25 pl-5">
                    <p className="font-display text-[17px] leading-snug text-bone">{s.title}</p>
                    <p className="label-ui mt-1.5 text-gold/65">{s.publisher}</p>
                    <p className="mt-2 font-body text-[15.5px] leading-relaxed text-muted">
                      Used for: {s.used}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-20 flex flex-col items-center gap-6 border-t border-gold/15 pt-14 text-center">
            <p className="max-w-2xl font-body text-xl leading-relaxed text-bone/80 italic">
              The canoes are still carved, the clam gardens are still being rebuilt, and the
              regalia is still coming home. This is not a story about the past — it is a
              story about a coast that is still inhabited.
            </p>
            <button
              type="button"
              onClick={() => scrollToId("entrance")}
              className="label-ui group relative border border-gold/45 px-8 py-4 text-gold transition hover:border-gold hover:bg-gold/10 hover:text-goldbright"
            >
              Return to the entrance
              <span className="absolute inset-x-6 -bottom-px h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </button>
          </Reveal>

          {/* credit */}
          <Reveal className="mt-16 flex flex-col items-center gap-3 text-center">
            <span className="h-px w-24 rule-gold opacity-60" />
            <p className="label-ui text-gold/80">Made by Abdulloh</p>
            <p className="font-body text-sm text-bone/40 italic">
              {PROJECT.course} · {PROJECT.year}
            </p>
          </Reveal>

          <p className="label-ui mt-10 text-center text-bone/35">
            {PROJECT.title} · Made by Abdulloh · {PROJECT.course} · {PROJECT.year} · All
            imagery AI-generated for educational use
          </p>
        </div>
      </section>
    </>
  );
}
