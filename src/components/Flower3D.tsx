import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Flower3DProps {
  position: [number, number, number];
  scale?: number;
  petalCount?: number;
  petalColor?: string;
  deepColor?: string;
  seed?: number;
}

export default function Flower3D({
  position,
  scale = 1,
  petalCount = 7,
  petalColor = '#c4b5fd',
  deepColor = '#8b5cf6',
  seed = 0,
}: Flower3DProps) {
  const group = useRef<THREE.Group>(null!);
  const petalsRef = useRef<THREE.Group>(null!);

  const petalGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.5, 10, 8);
    geo.scale(0.55, 1.1, 0.12);
    return geo;
  }, []);

  const centerGeometry = useMemo(() => new THREE.SphereGeometry(0.3, 12, 10), []);
  const stemGeometry = useMemo(() => new THREE.CylinderGeometry(0.04, 0.06, 1.4, 6), []);

  const leafGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.22, 8, 6);
    geo.scale(0.5, 1, 2);
    return geo;
  }, []);

  const petals = useMemo(
    () => Array.from({ length: petalCount }, (_, i) => (360 / petalCount) * i + seed),
    [petalCount, seed],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.4 + seed) * 0.15;
    }
    if (petalsRef.current) {
      petalsRef.current.rotation.z = Math.sin(t * 0.8 + seed) * 0.06;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <group rotation={[-0.4, 0, 0]}>
        <group ref={petalsRef}>
          {petals.map((angle, i) => (
            <mesh
              key={i}
              geometry={petalGeometry}
              position={[0, 0.72, 0]}
              rotation={[0, 0, (angle * Math.PI) / 180]}
            >
              <meshStandardMaterial color={petalColor} roughness={0.6} />
            </mesh>
          ))}
          <mesh geometry={centerGeometry}>
            <meshStandardMaterial
              color={deepColor}
              roughness={0.4}
              emissive={deepColor}
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>
        <mesh geometry={stemGeometry} position={[0, -0.95, 0]}>
          <meshStandardMaterial color="#4c1d95" roughness={0.7} />
        </mesh>
        <mesh geometry={leafGeometry} position={[0.18, -0.85, 0.05]} rotation={[0.2, 0.4, -0.5]}>
          <meshStandardMaterial color="#6d28d9" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
