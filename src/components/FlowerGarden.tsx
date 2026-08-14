import React from 'react';
import { motion } from 'motion/react';
import Flower2D from './Flower2D';
import ButterflyBackground from './ButterflyBackground';

export interface FlowerItem {
  type: 'flower' | 'message';
  left: string;
  top: string;
  size: number;
  rotation?: number;
  text?: string;
  delay?: number;
  petalCount?: number;
  petalColor?: string;
  petalDeep?: string;
  centerColor?: string;
  petalLength?: number;
  petalWidth?: number;
  withStem?: boolean;
  opacity?: number;
  swayDelay?: number;
  swayDuration?: number;
}

const PALETTES = [
  { petal: '#c4b5fd', petalDeep: '#8b5cf6', center: '#7c3aed' },
  { petal: '#a78bfa', petalDeep: '#6d28d9', center: '#5b21b6' },
  { petal: '#e9d5ff', petalDeep: '#a855f7', center: '#7c3aed' },
  { petal: '#b794f6', petalDeep: '#7c3aed', center: '#f5f3ff' },
  { petal: '#f3e8ff', petalDeep: '#c084fc', center: '#a855f7' },
  { petal: '#d8b4fe', petalDeep: '#9333ea', center: '#6d28d9' },
];

const MESSAGES: { left: string; top: string; delay: number; size: number }[] = [
  { left: '5%', top: '3%', delay: 0, size: 18 },
  { left: '46%', top: '12%', delay: 0.05, size: 22 },
  { left: '12%', top: '26%', delay: 0.1, size: 15 },
  { left: '70%', top: '32%', delay: 0.12, size: 20 },
  { left: '30%', top: '42%', delay: 0.16, size: 17 },
  { left: '60%', top: '52%', delay: 0.2, size: 22 },
  { left: '8%', top: '60%', delay: 0.24, size: 16 },
  { left: '82%', top: '66%', delay: 0.26, size: 19 },
  { left: '42%', top: '76%', delay: 0.3, size: 15 },
  { left: '16%', top: '88%', delay: 0.34, size: 21 },
  { left: '66%', top: '90%', delay: 0.38, size: 17 },
  { left: '88%', top: '44%', delay: 0.28, size: 18 },
];

function makeRng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rng = makeRng(20260814);

function buildFlowers(): FlowerItem[] {
  const flowers: FlowerItem[] = [];
  const count = 44;
  let guard = 0;
  while (flowers.length < count && guard++ < 2000) {
    const left = 2 + rng() * 92;
    const top = 3 + rng() * 90;
    const collides = MESSAGES.some((m) => {
      const dx = left - parseFloat(m.left);
      const dy = top - parseFloat(m.top);
      return Math.hypot(dx, dy) < 9;
    });
    if (collides) continue;

    const palette = PALETTES[Math.floor(rng() * PALETTES.length)];
    flowers.push({
      type: 'flower',
      left: `${left.toFixed(1)}%`,
      top: `${top.toFixed(1)}%`,
      size: 42 + rng() * 86,
      rotation: (rng() - 0.5) * 70,
      petalCount: 5 + Math.floor(rng() * 8),
      petalColor: palette.petal,
      petalDeep: palette.petalDeep,
      centerColor: palette.center,
      petalLength: 16 + rng() * 8,
      petalWidth: 7 + rng() * 6,
      withStem: rng() < 0.45,
      opacity: 0.75 + rng() * 0.25,
      swayDelay: rng() * 4,
      swayDuration: 2.8 + rng() * 2.2,
    });
  }
  return flowers;
}

const FIELD = buildFlowers();

const flowerWidth = (size: number) => `min(${size}px, ${Math.round((size / 375) * 100)}vw)`;

export default function FlowerGarden() {
  return (
    <section id="garden" className="relative w-full overflow-hidden bg-[#0a0618]">
      <ButterflyBackground variant="garden" />

      <div className="relative mx-auto max-w-md px-6 pt-14 pb-10 text-center">
        <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-purple-soft/60 mb-2">
          keep scrolling
        </h3>
        <p className="font-mono italic text-white/25 text-xs">the garden keeps blooming</p>
      </div>

      <div className="relative h-[200vh] w-full">
        {FIELD.map((item, i) => (
          <motion.div
            key={`f${i}`}
            initial={{ opacity: 0, y: 48, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute"
            style={{ left: item.left, top: item.top }}
          >
            <div
              className="flower-sway"
              style={{
                width: flowerWidth(item.size),
                animationDelay: `${item.swayDelay}s`,
                animationDuration: `${item.swayDuration}s`,
              }}
            >
              <Flower2D
                rotation={item.rotation}
                petalCount={item.petalCount}
                petalColor={item.petalColor}
                petalDeep={item.petalDeep}
                centerColor={item.centerColor}
                petalLength={item.petalLength}
                petalWidth={item.petalWidth}
                withStem={item.withStem}
                opacity={item.opacity}
                className="drop-shadow-[0_0_18px_rgba(139,92,246,0.35)]"
              />
            </div>
          </motion.div>
        ))}

        {MESSAGES.map((m, i) => (
          <motion.div
            key={`m${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: m.delay, ease: 'easeOut' }}
            className="absolute"
            style={{ left: m.left, top: m.top }}
          >
            <span
              className="block font-mono lowercase text-purple-soft glow-text tracking-[0.15em] whitespace-nowrap"
              style={{ fontSize: m.size }}
            >
              i love you
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}