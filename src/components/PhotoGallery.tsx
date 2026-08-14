import React from "react";
import { motion } from "motion/react";

const ORDER_SEED = 20260814;

const ALL_PHOTOS = [
  { src: "/23b2d2d69cd20f395584a40c855fabff.jpg", alt: "memory 1" },
  { src: "/3620c1bb5a9b0d4bd72186a36e1759a9.jpg", alt: "memory 2" },
  { src: "/5dc7f19b7512bb1cbffe0cf7acd3871c.jpg", alt: "memory 3" },
  { src: "/5fa6061d5d9795d968af74b684580929.jpg", alt: "memory 4" },
  { src: "/a02fc8b4e985a94233fbad6ce8c81a55.jpg", alt: "memory 5" },
  { src: "/IMG_20260731_175757_835.JPG", alt: "memory 6" },
  { src: "/IMG_9114.jpg", alt: "memory 7" },
  { src: "/IMG_9504.jpg", alt: "memory 8" },
  { src: "/IMG_9535.jpg", alt: "memory 9" },
];

// seeded Fisher-Yates so the order is randomised but stable per build
function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const PHOTOS = seededShuffle(ALL_PHOTOS, ORDER_SEED);

const COUNT = PHOTOS.length;
const X_LEFT = 18;
const X_RIGHT = 82;

const pinAt = (i: number) => {
  const x = i % 2 === 0 ? X_LEFT : X_RIGHT;
  const y = 4 + (i + 0.5) * (88 / COUNT);
  return { x, y };
};

function PhotoFrame({
  src,
  alt,
  uid,
}: {
  src: string;
  alt: string;
  uid: string;
}) {
  const clip = `clip-${uid}`;
  const charcoal = `charcoal-${uid}`;
  const vignette = `vignette-${uid}`;

  const topTicks = [10, 20, 30, 40, 60, 70, 80, 90];
  const sideRunes = [22, 36, 50, 64, 78, 92];

  return (
    <svg viewBox="0 0 100 124" className="block w-full" aria-hidden="true">
      <defs>
        {/* charcoal body gradient */}
        <linearGradient id={charcoal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2c2c36" />
          <stop offset="55%" stopColor="#1c1c24" />
          <stop offset="100%" stopColor="#12121a" />
        </linearGradient>
        {/* purple-tinted vignette over the print */}
        <radialGradient id={vignette} cx="50%" cy="42%" r="75%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#2a0a4a" stopOpacity="0.55" />
        </radialGradient>
        <clipPath id={clip}>
          <rect x="14" y="18" width="72" height="78" />
        </clipPath>
      </defs>

      {/* hanging loop + nail */}
      <path
        d="M40 8 Q50 15 60 8"
        fill="none"
        stroke="#c4b5fd"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="50" cy="5" r="2.3" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="0.6" />

      {/* charcoal card */}
      <rect x="0" y="0" width="100" height="124" rx="3" fill={`url(#${charcoal})`} />
      {/* double sigil border */}
      <rect
        x="1"
        y="1"
        width="98"
        height="122"
        rx="2.5"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="1.2"
      />
      <rect
        x="3.2"
        y="3.2"
        width="93.6"
        height="117.6"
        rx="2"
        fill="none"
        stroke="#8b5cf6"
        strokeOpacity="0.5"
        strokeWidth="0.8"
      />

      {/* runic ticks along top/bottom edges */}
      {topTicks.map((x, i) => (
        <path
          key={`t${i}`}
          d={`M${x} 7 h4`}
          stroke="#a855f7"
          strokeWidth="1.1"
          opacity="0.8"
        />
      ))}
      {topTicks.map((x, i) => (
        <path
          key={`b${i}`}
          d={`M${x} 117 h4`}
          stroke="#a855f7"
          strokeWidth="1.1"
          opacity="0.8"
        />
      ))}

      {/* rune columns down the sides */}
      {sideRunes.map((y, i) => (
        <g key={i} opacity="0.75">
          <path d={`M6 ${y} h3.5 M6 ${y} l1.75 2.4`} stroke="#c4b5fd" strokeWidth="1" />
          <path d={`M90.5 ${y} h3.5 M90.5 ${y} l-1.75 2.4`} stroke="#c4b5fd" strokeWidth="1" />
        </g>
      ))}

      {/* mystic dots in the top band */}
      <circle cx="20" cy="12" r="0.8" fill="#a855f7" opacity="0.6" />
      <circle cx="30" cy="11" r="0.8" fill="#a855f7" opacity="0.6" />
      <circle cx="70" cy="12" r="0.8" fill="#a855f7" opacity="0.6" />
      <circle cx="80" cy="11" r="0.8" fill="#a855f7" opacity="0.6" />

      {/* corner sigils */}
      <g stroke="#e9d5ff" strokeWidth="1" fill="none" opacity="0.85">
        {/* top-left: crosshair target */}
        <circle cx="10" cy="10" r="3.4" />
        <circle cx="10" cy="10" r="1" fill="#a855f7" stroke="none" />
        <path d="M10 5.2 v2 M10 12.8 v2 M5.2 10 h2 M12.8 10 h2" />
        {/* top-right: chevrons */}
        <path d="M90 7 l4 3 -4 3" />
        <path d="M86.4 7 l4 3 -4 3" opacity="0.6" />
        {/* bottom-left: triangle */}
        <path d="M10 110.4 L14 114 L6 114 Z" />
        <circle cx="10" cy="114" r="0.9" fill="#a855f7" stroke="none" />
        {/* bottom-right: diamond */}
        <path d="M90 110.8 l3 3.2 -3 3.2 -3 -3.2 Z" />
        <circle cx="90" cy="114" r="0.8" fill="#e9d5ff" stroke="none" />
      </g>

      {/* photo */}
      <image
        href={src}
        x="14"
        y="18"
        width="72"
        height="78"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clip})`}
      />
      {/* purple vignette + inner sigil stroke */}
      <rect x="14" y="18" width="72" height="78" fill={`url(#${vignette})`} />
      <rect
        x="14"
        y="18"
        width="72"
        height="78"
        fill="none"
        stroke="#a855f7"
        strokeOpacity="0.5"
        strokeWidth="0.8"
      />

      {/* sigil rule + eye under the print */}
      <path d="M30 103.5 h13 M57 103.5 h13" stroke="#8b5cf6" strokeWidth="1" opacity="0.7" />
      <circle cx="50" cy="103.5" r="1.6" fill="none" stroke="#c4b5fd" />
      <circle cx="50" cy="103.5" r="0.7" fill="#a855f7" />

      {/* faint glitch double-lines, bottom-right */}
      <path d="M72 110.5 h14 M74 114.5 h10 M71 118.5 h16" stroke="#7c3aed" strokeWidth="0.8" opacity="0.55" />
    </svg>
  );
}

export default function PhotoGallery() {
  const pins = PHOTOS.map((_, i) => pinAt(i));

  let d = `M ${pins[0].x} ${pins[0].y}`;
  for (let i = 1; i < pins.length; i++) {
    const prev = pins[i - 1];
    const cur = pins[i];
    const cx = (prev.x + cur.x) / 2;
    const cy = (prev.y + cur.y) / 2;
    const sag = 4 + Math.abs(cur.x - prev.x) * 0.12;
    d += ` Q ${cx} ${cy + sag} ${cur.x} ${cur.y}`;
  }

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden bg-[#0a0618]"
    >
      <div className="relative mx-auto max-w-md px-6 pt-14 pb-6 text-center">
        <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-purple-soft/60 mb-2">
          memory lane
        </h3>
        <p className="font-mono italic text-white/25 text-xs">
          photos connected by a thread
        </p>
      </div>

      <div className="relative w-full h-[calc(min(280px,40vw)*13.4)]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={d}
            fill="none"
            stroke="#3b1361"
            strokeWidth={5.5}
            strokeLinecap="round"
            opacity={0.9}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={d}
            fill="none"
            stroke="#7c3aed"
            strokeWidth={4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={d}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth={2.4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={d}
            fill="none"
            stroke="#c4b5fd"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeDasharray="7 7"
            opacity={0.8}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {pins.map((p, i) => (
          <div
            key={`pin-${i}`}
            className="absolute z-20 h-3 w-3 rounded-full border border-yellow-900/60 bg-gradient-to-b from-yellow-200 to-yellow-600 shadow-[0_0_6px_rgba(245,200,107,0.8)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}

        {PHOTOS.map((photo, i) => {
          const p = pins[i];
          const rot = (i % 2 === 0 ? 1 : -1) * (1 + (i % 3) * 0.75);
          return (
            <motion.div
              key={i}
              aria-label={photo.alt}
              className="absolute z-10 w-[min(280px,40vw)]"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ opacity: 0, y: 40, x: "-50%" }}
              whileInView={{ opacity: 1, y: 0, x: "-50%" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: (i % 3) * 0.08,
                ease: "easeOut",
              }}
            >
              <div
                className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
                style={{ transform: `rotate(${rot}deg)` }}
              >
                <PhotoFrame src={photo.src} alt={photo.alt} uid={`${i}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

