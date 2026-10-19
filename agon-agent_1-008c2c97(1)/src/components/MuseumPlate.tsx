import type { ReactNode } from "react";
import { AUTHENTICITY_LABEL, AUTHENTICITY_NOTE, type Authenticity } from "../lib/data";

const BADGE_STYLE: Record<Authenticity, string> = {
  original: "border-emerald-300/40 text-emerald-100/90 bg-emerald-900/25",
  cast: "border-gold/45 text-goldbright bg-gold/10",
  reconstruction: "border-sky-300/35 text-sky-100/85 bg-sky-900/20",
};

/** Small brass badge that states what kind of object the visitor is looking at. */
export function AuthenticityBadge({
  value,
  className = "",
}: {
  value: Authenticity;
  className?: string;
}) {
  return (
    <span
      className={`label-ui inline-flex items-center gap-2 border px-2.5 py-1 ${BADGE_STYLE[value]} ${className}`}
      title={AUTHENTICITY_NOTE[value]}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {AUTHENTICITY_LABEL[value]}
    </span>
  );
}

interface PlateProps {
  kicker?: string;
  title: string;
  rows: { label: string; value: ReactNode }[];
  className?: string;
}

/** Wall-label plate, styled like an engraved museum card. */
export function MuseumPlate({ kicker, title, rows, className = "" }: PlateProps) {
  return (
    <div className={`plate p-5 sm:p-6 ${className}`}>
      {kicker && <p className="label-ui text-gold/75">{kicker}</p>}
      <h3 className="mt-2 font-display text-xl leading-tight text-bone sm:text-2xl">
        {title}
      </h3>
      <div className="mt-4 h-px w-full rule-gold opacity-60" />
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-3">
            <dt className="label-ui pt-1 text-muted">{row.label}</dt>
            <dd className="font-body text-[15px] leading-snug text-bone/85">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Section heading with brass rule and chapter numeral. */
export function SectionHeading({
  numeral,
  kicker,
  title,
  intro,
  align = "left",
}: {
  numeral: string;
  kicker: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="font-display text-sm text-gold/70">{numeral}</span>
        <span className="h-px w-10 bg-gold/40" />
        <span className="label-ui text-gold/80">{kicker}</span>
      </div>
      <h2 className="mt-5 font-display text-4xl leading-[1.05] text-bone sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-6 font-body text-lg leading-relaxed text-bone/70 sm:text-xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
