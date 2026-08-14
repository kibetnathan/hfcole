import Butterfly from "./Butterfly";

interface Spec {
  left: number;
  top: number;
  size: number;
  rotate: number;
  opacity: number;
  flip?: boolean;
}

const HERO: Spec[] = [
  { left: 6, top: 16, size: 240, rotate: -16, opacity: 0.5 },
  { left: 93, top: 22, size: 280, rotate: 14, opacity: 0.45 },
  { left: 8, top: 84, size: 300, rotate: -24, opacity: 0.42 },
  { left: 92, top: 82, size: 260, rotate: 22, opacity: 0.4 },
];

const GARDEN: Spec[] = [
  { left: 4, top: 5, size: 250, rotate: -20, opacity: 0.5 },
  { left: 93, top: 12, size: 300, rotate: 16, opacity: 0.45 },
  { left: 6, top: 30, size: 210, rotate: 24, opacity: 0.36 },
  { left: 91, top: 42, size: 260, rotate: -14, opacity: 0.42 },
  { left: 10, top: 58, size: 280, rotate: -30, opacity: 0.4 },
  { left: 89, top: 70, size: 230, rotate: 28, opacity: 0.38 },
  { left: 26, top: 88, size: 330, rotate: 8, opacity: 0.4 },
  { left: 74, top: 91, size: 260, rotate: -8, opacity: 0.34 },
];

const GALLERY: Spec[] = [
  { left: 5, top: 8, size: 240, rotate: -12, opacity: 0.45 },
  { left: 94, top: 10, size: 300, rotate: 12, opacity: 0.42 },
  { left: 4, top: 40, size: 280, rotate: 20, opacity: 0.4 },
  { left: 93, top: 55, size: 250, rotate: -18, opacity: 0.4 },
  { left: 8, top: 82, size: 320, rotate: -8, opacity: 0.42 },
  { left: 90, top: 88, size: 260, rotate: 16, opacity: 0.36 },
];

const FOOTER: Spec[] = [
  { left: 12, top: 22, size: 220, rotate: -14, opacity: 0.35 },
  { left: 88, top: 32, size: 260, rotate: 12, opacity: 0.32 },
];

const MAPS = { hero: HERO, garden: GARDEN, gallery: GALLERY, footer: FOOTER };

const width = (size: number) => `min(${size}px, ${Math.round((size / 500) * 100)}vw)`;

export default function ButterflyBackground({
  variant = "garden",
  className = "",
}: {
  variant?: keyof typeof MAPS;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {MAPS[variant].map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: width(b.size),
            opacity: b.opacity,
            transform: `translate(-50%, -50%) rotate(${b.rotate}deg)${
              b.flip ? " scaleX(-1)" : ""
            }`,
          }}
        >
          <Butterfly className="block h-auto w-full drop-shadow-[0_0_26px_rgba(139,92,246,0.35)]" />
        </div>
      ))}
    </div>
  );
}
