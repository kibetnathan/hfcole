import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import Flower3D from './Flower3D';

const PETAL_COLORS = ['#c4b5fd', '#d8b4fe', '#a78bfa', '#8b5cf6', '#e9d5ff'];
const DEEP_COLORS = ['#8b5cf6', '#7c3aed', '#6d28d9', '#a855f7', '#5b21b6'];

interface FieldFlower {
  position: [number, number, number];
  scale: number;
  petalCount: number;
  petalColor: string;
  deepColor: string;
  seed: number;
}

function Field() {
  const flowers = useMemo<FieldFlower[]>(() => {
    const arr: FieldFlower[] = [];
    const count = 34;
    let guard = 0;
    while (arr.length < count && guard++ < 2000) {
      const x = (Math.random() * 2 - 1) * 3.2;
      const y = (Math.random() * 2 - 1) * 2.8 + 0.3;
      const z = (Math.random() * 2 - 1) * 1.6;
      const radius = Math.hypot(x, y);
      if (radius < 1.1 && Math.abs(z) < 0.9) continue;

      const depth = 1 - (z + 1.6) / 3.2;
      arr.push({
        position: [x, y, z],
        scale: 0.55 + depth * 0.85 + Math.random() * 0.2,
        petalCount: 5 + Math.floor(Math.random() * 4),
        petalColor: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        deepColor: DEEP_COLORS[Math.floor(Math.random() * DEEP_COLORS.length)],
        seed: Math.floor(Math.random() * 360),
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {flowers.map((f, i) => (
        <Flower3D key={i} {...f} />
      ))}
    </group>
  );
}

export default function FlowerScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0.6, 7.5], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={['#0a0618']} />
        <fog attach="fog" args={['#0a0618', 8, 14]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 5, 6]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-4, -3, 4]} intensity={0.6} color="#7c3aed" />

        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
          <Field />
        </Float>

        <Stars radius={80} depth={40} count={1200} factor={3} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
