interface SealProps {
  className?: string;
}

/** The museum's compass-seal mark, drawn as inline SVG so it is always crisp. */
export default function Seal({ className = "h-10 w-10" }: SealProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sealGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3dda4" />
          <stop offset="1" stopColor="#a8842f" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="none" stroke="url(#sealGold)" strokeWidth="1" opacity="0.55" />
      <circle cx="32" cy="32" r="23" fill="none" stroke="url(#sealGold)" strokeWidth="1.4" opacity="0.9" />
      <path d="M32 9 L35 29 L55 32 L35 35 L32 55 L29 35 L9 32 L29 29 Z" fill="url(#sealGold)" />
      <circle cx="32" cy="32" r="3.2" fill="#0a0c09" />
      <g stroke="url(#sealGold)" strokeWidth="0.7" opacity="0.5">
        <path d="M32 3 V9 M32 55 V61 M3 32 H9 M55 32 H61" />
      </g>
    </svg>
  );
}
