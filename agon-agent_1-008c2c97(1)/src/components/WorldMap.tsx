import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GRATICULE,
  LAND_PATHS,
  MAP_H,
  MAP_W,
  arcPath,
  projectXY,
} from "../lib/geo";
import { ARTIFACTS, MAP_SITES, MUSEUM_SITE, type MapSite } from "../lib/data";
import { useCinematic } from "../lib/motion";

const [mx, my] = projectXY(MUSEUM_SITE.lon, MUSEUM_SITE.lat);

/**
 * A stylised equirectangular world map. Coastlines are hand-simplified;
 * every marker is placed by real longitude/latitude, so the geography is
 * accurate even though the drawing is not a chart.
 */
export default function WorldMap() {
  const [selected, setSelected] = useState<MapSite>(MAP_SITES[0]);
  const cinematic = useCinematic();
  const linked = ARTIFACTS.find((a) => a.id === selected.artifactId);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
      {/* ---------------- map ---------------- */}
      <div className="relative overflow-hidden border border-gold/20 bg-forestdeep">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 70% at 50% 45%, rgba(31,53,39,0.55), rgba(7,8,10,0.95) 78%)",
          }}
        />
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="relative block w-full"
          role="img"
          aria-label="Map showing where each object, place and event in this exhibition comes from"
        >
          <defs>
            <radialGradient id="oceanGlow" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#1f3527" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#07080a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="landFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a44c" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#7e6b36" stopOpacity="0.08" />
            </linearGradient>
            <filter id="markerGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={MAP_W} height={MAP_H} fill="url(#oceanGlow)" />

          {/* graticule */}
          <g stroke="#c9a44c" strokeOpacity="0.10" strokeWidth="0.6">
            {GRATICULE.map((g) => (
              <path key={g.key} d={g.d} />
            ))}
          </g>

          {/* land */}
          <g fill="url(#landFill)" stroke="#c9a44c" strokeOpacity="0.5" strokeWidth="0.9">
            {LAND_PATHS.map((d, i) => (
              <path key={i} d={d} strokeLinejoin="round" />
            ))}
          </g>

          {/* journey arcs to the museum */}
          <g fill="none" strokeLinecap="round">
            {MAP_SITES.map((site) => {
              const isSel = site.id === selected.id;
              return (
                <motion.path
                  key={site.id}
                  d={arcPath([site.lon, site.lat], [MUSEUM_SITE.lon, MUSEUM_SITE.lat], 0.2)}
                  stroke="#f3dda4"
                  strokeOpacity={isSel ? 0.85 : 0.16}
                  strokeWidth={isSel ? 1.6 : 0.8}
                  strokeDasharray="5 7"
                  initial={false}
                  animate={
                    isSel && cinematic
                      ? { strokeDashoffset: [0, -240] }
                      : { strokeDashoffset: 0 }
                  }
                  transition={
                    isSel && cinematic
                      ? { duration: 9, repeat: Infinity, ease: "linear" }
                      : { duration: 0.4 }
                  }
                />
              );
            })}
          </g>

          {/* the museum */}
          <g transform={`translate(${mx}, ${my})`} filter="url(#markerGlow)">
            <path d="M0,-9 L7,0 L0,9 L-7,0 Z" fill="#f3dda4" />
            <circle r="16" fill="none" stroke="#f3dda4" strokeOpacity="0.35" strokeWidth="0.8" />
            <text
              x="12"
              y="-12"
              fill="#f3dda4"
              fontSize="12"
              fontFamily="Inter, sans-serif"
              letterSpacing="1.4"
            >
              NEW YORK
            </text>
          </g>

          {/* sites */}
          {MAP_SITES.map((site) => {
            const [x, y] = projectXY(site.lon, site.lat);
            const isSel = site.id === selected.id;
            return (
              <g
                key={site.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
                onClick={() => setSelected(site)}
                role="button"
                tabIndex={0}
                aria-label={`${site.name}, ${site.region}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(site);
                  }
                }}
              >
                <circle r="18" fill="transparent" />
                {isSel && cinematic && (
                  <motion.circle
                    r="6"
                    fill="none"
                    stroke="#c9a44c"
                    strokeWidth="1.2"
                    initial={{ r: 5, opacity: 0.9 }}
                    animate={{ r: 22, opacity: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <circle
                  r={isSel ? 5.4 : 3.6}
                  fill={isSel ? "#f3dda4" : "#c9a44c"}
                  stroke="#07080a"
                  strokeWidth="1"
                  filter={isSel ? "url(#markerGlow)" : undefined}
                />
                <text
                  x="9"
                  y="4"
                  fill={isSel ? "#ece5d5" : "#9c9583"}
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="0.8"
                >
                  {site.name}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 border-t border-gold/15 bg-ink/70 px-4 py-2.5">
          <span className="label-ui text-muted">
            Select a site — the dotted line traces how objects travelled to museums
          </span>
          <span className="label-ui text-gold/60">Stylised map · markers at true coordinates</span>
        </div>
      </div>

      {/* ---------------- detail ---------------- */}
      <div className="plate min-h-[19rem] p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: cinematic ? 18 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: cinematic ? -12 : 0 }}
            transition={{ duration: 0.45, ease: [0.16, 0.84, 0.34, 1] }}
          >
            <p className="label-ui text-gold/75">{selected.region}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-bone sm:text-3xl">
              {selected.name}
            </h3>
            <p className="label-ui mt-2 text-goldbright/70">{selected.era}</p>
            <div className="mt-4 h-px w-full rule-gold opacity-60" />
            <p className="mt-4 font-body text-[17px] leading-relaxed text-bone/80">
              {selected.note}
            </p>
            {linked && (
              <div className="mt-5 flex items-center gap-3 border border-gold/20 bg-ink/50 p-3">
                <img
                  src={linked.image}
                  alt=""
                  className="h-14 w-14 shrink-0 object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="label-ui text-gold/70">Object from this place</p>
                  <p className="font-display text-base text-bone">{linked.name}</p>
                  <p className="font-body text-sm text-muted">{linked.date}</p>
                </div>
              </div>
            )}
            <p className="label-ui mt-5 text-bone/40">
              {selected.lon.toFixed(2)}°, {selected.lat.toFixed(2)}°
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* site chips */}
      <div className="flex flex-wrap gap-2 lg:col-span-2">
        {MAP_SITES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelected(s)}
            className={`label-ui border px-3 py-2 transition ${
              s.id === selected.id
                ? "border-gold/70 bg-gold/12 text-goldbright"
                : "border-gold/20 text-muted hover:border-gold/50 hover:text-bone"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
