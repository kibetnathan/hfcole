import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import Flower3D from './Flower3D';

const field = [
  { position: [-2.3, -0.9, 0.3], scale: 0.85, seed: 20 },
  { position: [-0.6, -1.2, 0.1], scale: 1.0, seed: 80 },
  { position: [1.4, -0.6, 0.6], scale: 0.75, seed: 140 },
  { position: [-1.4, 0.5, -0.6], scale: 1.15, seed: 40 },
  { position: [0.4, 0.9, -0.4], scale: 1.25, seed: 100 },
  { position: [2.3, 0.7, 0.2], scale: 0.9, seed: 180 },
];

function Field() {
  return (
    <group>
      {field.map((f, i) => (
        <Flower3D key={i} position={f.position} scale={f.scale} seed={f.seed} />
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
