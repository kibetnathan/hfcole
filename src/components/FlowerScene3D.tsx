import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Flower3D from './Flower3D';

const PALETTES = [
  { petal: '#c4b5fd', deep: '#8b5cf6' },
  { petal: '#d8b4fe', deep: '#7c3aed' },
  { petal: '#a78bfa', deep: '#6d28d9' },
  { petal: '#e9d5ff', deep: '#a855f7' },
  { petal: '#a78bfa', deep: '#5b21b6' },
  { petal: '#c4b5fd', deep: '#7c3aed' },
];

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
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      arr.push({
        position: [x, y, z],
        scale: 0.55 + depth * 0.85 + Math.random() * 0.2,
        petalCount: 5 + Math.floor(Math.random() * 4),
        petalColor: palette.petal,
        deepColor: palette.deep,
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
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.8, 7.5], fov: 50 }}
      >
        <color attach="background" args={['#0a0618']} />
        <fog attach="fog" args={['#0a0618', 8, 14]} />
        <ambientLight intensity={0.25} />
        <hemisphereLight args={['#e9d5ff', '#1e1b4b', 0.35]} />
        <directionalLight
          position={[3, 5, 2]}
          intensity={1.5}
          castShadow
          shadow-bias={-0.0005}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#a78bfa" />
        <pointLight position={[4, 5, 6]} intensity={0.3} color="#a78bfa" />
        <pointLight position={[-4, -3, 4]} intensity={0.2} color="#7c3aed" />

        <Field />

        <Stars radius={80} depth={40} count={500} factor={3} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
