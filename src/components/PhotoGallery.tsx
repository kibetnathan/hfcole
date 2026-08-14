import React from 'react';
import { motion } from 'motion/react';

const PHOTOS = [
  { src: '/23b2d2d69cd20f395584a40c855fabff.jpg', alt: 'memory 1' },
  { src: '/3620c1bb5a9b0d4bd72186a36e1759a9.jpg', alt: 'memory 2' },
  { src: '/5dc7f19b7512bb1cbffe0cf7acd3871c.jpg', alt: 'memory 3' },
  { src: '/5fa6061d5d9795d968af74b684580929.jpg', alt: 'memory 4' },
  { src: '/a02fc8b4e985a94233fbad6ce8c81a55.jpg', alt: 'memory 5' },
  { src: '/IMG_20260731_175757_835.JPG', alt: 'memory 6' },
  { src: '/IMG_9114.jpg', alt: 'memory 7' },
  { src: '/IMG_9504.jpg', alt: 'memory 8' },
  { src: '/IMG_9535.jpg', alt: 'memory 9' },
];

const COUNT = PHOTOS.length;
const X_LEFT = 18;
const X_RIGHT = 82;

const pinAt = (i: number) => {
  const x = i % 2 === 0 ? X_LEFT : X_RIGHT;
  const y = 4 + (i + 0.5) * (88 / COUNT);
  return { x, y };
};

function PhotoFrame({ src, alt, uid }: { src: string; alt: string; uid: string }) {
  const clip = `clip-${uid}`;
  const frameGrad = `frame-${uid}`;
  const vignette = `vignette-${uid}`;

  return (
    <svg viewBox="0 0 100 124" className="block w-full" aria-hidden="true">
      <defs>
        <linearGradient id={frameGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b2361" />
          <stop offset="100%" stopColor="#170b2b" />
        </linearGradient>
        <radialGradient id={vignette} cx="50%" cy="42%" r="72%">
          <stop offset="50%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        <clipPath id={clip}>
          <rect x="15" y="23" width="70" height="84" rx="2" />
        </clipPath>
      </defs>

      <path d="M40 11 Q50 20 60 11" fill="none" stroke="#9ca3af" strokeWidth="1.6" />
      <path d="M18 14 L50 8 L82 14" fill="none" stroke="#9ca3af" strokeWidth="1.2" />

      <rect
        x="6"
        y="15"
        width="88"
        height="101"
        rx="5"
        fill={`url(#${frameGrad})`}
        stroke="#5b21b6"
        strokeWidth="2.5"
      />
      <rect x="11" y="20" width="78" height="90" fill="#140a26" />

      <image
        href={src}
        x="15"
        y="23"
        width="70"
        height="84"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clip})`}
      />
      <rect x="15" y="23" width="70" height="84" rx="2" fill={`url(#${vignette})`} />

      <rect
        x="11"
        y="20"
        width="78"
        height="90"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="0.8"
        opacity="0.55"
      />
      <circle cx="13.5" cy="22.5" r="2" fill="#a78bfa" opacity="0.7" />
      <circle cx="86.5" cy="22.5" r="2" fill="#a78bfa" opacity="0.7" />
      <circle cx="13.5" cy="107.5" r="2" fill="#a78bfa" opacity="0.7" />
      <circle cx="86.5" cy="107.5" r="2" fill="#a78bfa" opacity="0.7" />
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
    <section id="gallery" className="relative w-full overflow-hidden bg-[#0a0618]">
      <div className="relative mx-auto max-w-md px-6 pt-14 pb-6 text-center">
        <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-purple-soft/60 mb-2">
          memory lane
        </h3>
        <p className="font-mono italic text-white/25 text-xs">photos connected by a thread</p>
      </div>

      <div className="relative w-full h-[calc(min(220px,30vw)*13.4)]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={d}
            fill="none"
            stroke="#854d0e"
            strokeWidth={3.4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={d}
            fill="none"
            stroke="#b45309"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {pins.map((p, i) => (
          <div
            key={`pin-${i}`}
            className="absolute z-20 h-3 w-3 rounded-full border border-yellow-900/60 bg-gradient-to-b from-yellow-200 to-yellow-600 shadow-[0_0_6px_rgba(245,200,107,0.8)]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}
          />
        ))}

        {PHOTOS.map((photo, i) => {
          const p = pins[i];
          const rot = (i % 2 === 0 ? 1 : -1) * (1 + (i % 3) * 0.75);
          return (
            <motion.div
              key={i}
              aria-label={photo.alt}
              className="absolute z-10 w-[min(220px,30vw)]"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ opacity: 0, y: 40, x: '-50%' }}
              whileInView={{ opacity: 1, y: 0, x: '-50%' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: 'easeOut' }}
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