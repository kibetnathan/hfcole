import React from 'react';
import { motion } from 'motion/react';
import Flower2D from './Flower2D';

interface GardenItem {
  type: 'flower' | 'message';
  left: string;
  top: string;
  size: number;
  rotation: number;
  text?: string;
  delay?: number;
}

const items: GardenItem[] = [
  { type: 'message', left: '4%', top: '1%', size: 0, rotation: 0, text: 'i love you', delay: 0 },
  { type: 'flower', left: '16%', top: '12%', size: 92, rotation: 15 },
  { type: 'flower', left: '74%', top: '8%', size: 64, rotation: -20 },
  { type: 'message', left: '48%', top: '18%', size: 0, rotation: 0, text: 'i love you', delay: 0.1 },
  { type: 'flower', left: '58%', top: '30%', size: 104, rotation: 8 },
  { type: 'flower', left: '28%', top: '36%', size: 58, rotation: -12 },
  { type: 'flower', left: '6%', top: '46%', size: 96, rotation: 24 },
  { type: 'message', left: '38%', top: '48%', size: 0, rotation: 0, text: 'i love you', delay: 0.15 },
  { type: 'flower', left: '70%', top: '50%', size: 84, rotation: -6 },
  { type: 'flower', left: '86%', top: '30%', size: 52, rotation: 32 },
  { type: 'message', left: '10%', top: '64%', size: 0, rotation: 0, text: 'i love you', delay: 0.2 },
  { type: 'flower', left: '48%', top: '70%', size: 72, rotation: -24 },
  { type: 'flower', left: '22%', top: '82%', size: 116, rotation: 10 },
  { type: 'flower', left: '66%', top: '80%', size: 92, rotation: 18 },
  { type: 'message', left: '52%', top: '88%', size: 0, rotation: 0, text: 'i love you', delay: 0.25 },
];

const flowerWidth = (size: number) => `min(${size}px, ${Math.round((size / 375) * 100)}vw)`;

export default function FlowerGarden() {
  return (
    <section id="garden" className="relative w-full overflow-hidden bg-[#0a0618]">
      <div className="relative mx-auto max-w-md px-6 pt-14 pb-10 text-center">
        <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase text-purple-soft/60 mb-2">
          keep scrolling
        </h3>
        <p className="font-display italic text-white/25 text-sm">the garden keeps blooming</p>
      </div>

      <div className="relative h-[160vh] w-full">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 48, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, delay: item.delay ?? 0, ease: 'easeOut' }}
            className="absolute"
            style={{ left: item.left, top: item.top }}
          >
            {item.type === 'flower' ? (
              <div style={{ width: flowerWidth(item.size) }}>
                <Flower2D
                  rotation={item.rotation}
                  className="drop-shadow-[0_0_18px_rgba(139,92,246,0.35)]"
                />
              </div>
            ) : (
              <span className="block font-display italic text-purple-soft glow-text text-lg sm:text-xl whitespace-nowrap">
                {item.text}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
