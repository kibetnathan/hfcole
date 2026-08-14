import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Flower3DProps {
  position: [number, number, number];
  scale?: number;
  petalCount?: number;
  petalColor?: string;
  deepColor?: string;
  seed?: number;
}

// deterministic pseudo-random generator so each flower instance is
// stable across renders but visually distinct via `seed`
function makeRng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function createPetalShape(length: number, width: number) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(
    width * 0.55,
    length * 0.08,
    width * 0.7,
    length * 0.55,
    width * 0.32,
    length * 0.85,
  );
  shape.bezierCurveTo(
    width * 0.16,
    length * 0.98,
    width * 0.05,
    length * 1.03,
    0,
    length,
  );
  shape.bezierCurveTo(
    -width * 0.05,
    length * 1.03,
    -width * 0.16,
    length * 0.98,
    -width * 0.32,
    length * 0.85,
  );
  shape.bezierCurveTo(
    -width * 0.7,
    length * 0.55,
    -width * 0.55,
    length * 0.08,
    0,
    0,
  );
  return shape;
}

function bendPetal(
  geo: THREE.BufferGeometry,
  length: number,
  curl: number,
  cup: number,
) {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const t = THREE.MathUtils.clamp(y / length, 0, 1);
    // curl the tip backward
    const curlZ = Math.pow(t, 2) * curl;
    // cup the petal inward across its width
    const cupZ = Math.pow(x, 2) * cup;
    pos.setZ(i, pos.getZ(i) - curlZ - cupZ);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

function createPetalGeometry(
  length: number,
  width: number,
  curl: number,
  cup: number,
  base: string,
  tip: string,
) {
  const shape = createPetalShape(length, width);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.025,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.01,
    bevelSegments: 2,
    curveSegments: 12,
  });
  geo.translate(0, 0, -0.0125);
  bendPetal(geo, length, curl, cup);

  // vertex color gradient: darker base -> lighter tip so petals
  // shade across their surface instead of reading as a flat sticker
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const baseColor = new THREE.Color(base);
  const tipColor = new THREE.Color(tip);
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp(pos.getY(i) / length, 0, 1);
    const eased = THREE.MathUtils.smoothstep(t, 0.15, 1);
    const c = baseColor.clone().lerp(tipColor, eased);
    colors.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return geo;
}

function createLeafGeometry(length: number, width: number) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(width, length * 0.18, width * 0.75, length * 0.55);
  shape.quadraticCurveTo(width * 0.4, length * 0.85, 0, length);
  shape.quadraticCurveTo(
    -width * 0.4,
    length * 0.85,
    -width * 0.75,
    length * 0.55,
  );
  shape.quadraticCurveTo(-width, length * 0.18, 0, 0);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 1,
    curveSegments: 8,
  });
  geo.translate(0, 0, -0.01);
  // gentle downward taper/droop along the length + slight center-vein ridge
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const t = THREE.MathUtils.clamp(y / length, 0, 1);
    pos.setZ(
      i,
      pos.getZ(i) -
        Math.pow(t, 1.5) * 0.12 +
        (1 - Math.abs(x) / (width || 1)) * 0.015,
    );
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

export default function Flower3D({
  position,
  scale = 1,
  petalCount = 7,
  petalColor = "#c4b5fd",
  deepColor = "#8b5cf6",
  seed = 0,
}: Flower3DProps) {
  const group = useRef<THREE.Group>(null!);
  const petalsRef = useRef<THREE.Group>(null!);

  const rng = useMemo(() => makeRng(seed * 1000 + 1), [seed]);

  // static per-flower lean/yaw/roll so petals don't all face the camera
  const baseTilt = useMemo<[number, number, number]>(() => {
    const lean = (rng() - 0.5) * 0.55;
    const yaw = (rng() - 0.5) * 1.6;
    const roll = (rng() - 0.5) * 0.35;
    return [lean, yaw, roll];
  }, [rng]);

  // outer, larger, more open petals
  const outerPetalGeometry = useMemo(
    () => createPetalGeometry(1.0, 0.62, 0.35, 0.12, deepColor, "#f3e8ff"),
    [deepColor],
  );
  // inner, smaller, more upright petals for depth/fullness
  const innerPetalGeometry = useMemo(
    () => createPetalGeometry(0.62, 0.42, 0.22, 0.16, deepColor, petalColor),
    [deepColor, petalColor],
  );

  const centerGeometry = useMemo(
    () => new THREE.SphereGeometry(0.22, 16, 12),
    [],
  );
  const stamenFilamentGeometry = useMemo(
    () => new THREE.CylinderGeometry(0.01, 0.014, 0.26, 5),
    [],
  );
  const stamenAntherGeometry = useMemo(
    () => new THREE.SphereGeometry(0.032, 8, 6),
    [],
  );

  const leafGeometryA = useMemo(() => createLeafGeometry(0.55, 0.24), []);
  const leafGeometryB = useMemo(() => createLeafGeometry(0.4, 0.18), []);

  // gently curved stem instead of a straight cylinder
  const stemGeometry = useMemo(() => {
    const sway = (rng() - 0.5) * 0.12;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.2, 0),
      new THREE.Vector3(sway * 0.4, -0.65, sway * 0.3),
      new THREE.Vector3(sway * 0.7, -1.05, sway * 0.1),
      new THREE.Vector3(sway, -1.55, 0),
    ]);
    return new THREE.TubeGeometry(curve, 24, 0.045, 6, false);
  }, [rng]);

  const outerPetals = useMemo(
    () =>
      Array.from({ length: petalCount }, (_, i) => {
        const angle = (360 / petalCount) * i + seed * 13;
        const jitter = (rng() - 0.5) * 6;
        const tilt = 0.55 + (rng() - 0.5) * 0.15;
        return { angle: angle + jitter, tilt, key: `o${i}` };
      }),
    [petalCount, seed, rng],
  );

  const innerCount = Math.max(3, Math.round(petalCount * 0.7));
  const innerPetals = useMemo(
    () =>
      Array.from({ length: innerCount }, (_, i) => {
        const angle = (360 / innerCount) * i + seed * 13 + 180 / innerCount;
        const jitter = (rng() - 0.5) * 6;
        const tilt = 0.22 + (rng() - 0.5) * 0.1;
        return { angle: angle + jitter, tilt, key: `i${i}` };
      }),
    [innerCount, seed, rng],
  );

  const stamens = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const angle = (360 / 10) * i + seed * 7;
        const outTilt = 0.5 + (rng() - 0.5) * 0.2;
        const len = 0.85 + rng() * 0.3;
        return { angle, outTilt, len, key: `s${i}` };
      }),
    [seed, rng],
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
    <group position={position} scale={scale} rotation={baseTilt}>
      <group ref={group}>
        <group rotation={[-0.4, 0, 0]}>
          <group ref={petalsRef}>
            {outerPetals.map(({ angle, tilt, key }) => (
              <mesh
                key={key}
                geometry={outerPetalGeometry}
                position={[0, 0.06, 0]}
                rotation={[tilt, 0, (angle * Math.PI) / 180]}
                castShadow
                receiveShadow
              >
                <meshPhysicalMaterial
                  vertexColors
                  roughness={0.45}
                  clearcoat={0.3}
                  clearcoatRoughness={0.4}
                  sheen={0.5}
                  sheenColor={petalColor}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}

            {innerPetals.map(({ angle, tilt, key }) => (
              <mesh
                key={key}
                geometry={innerPetalGeometry}
                position={[0, 0.05, 0]}
                rotation={[tilt, 0, (angle * Math.PI) / 180]}
                castShadow
                receiveShadow
              >
                <meshPhysicalMaterial
                  vertexColors
                  roughness={0.5}
                  clearcoat={0.25}
                  clearcoatRoughness={0.45}
                  sheen={0.4}
                  sheenColor={petalColor}
                  emissive={deepColor}
                  emissiveIntensity={0.05}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}

            {stamens.map(({ angle, outTilt, len, key }) => (
              <group key={key} rotation={[0, 0, (angle * Math.PI) / 180]}>
                <mesh
                  geometry={stamenFilamentGeometry}
                  scale={[1, len, 1]}
                  position={[0, 0.13 * len, 0]}
                  rotation={[outTilt, 0, 0]}
                  castShadow
                >
                  <meshStandardMaterial color="#fef3c7" roughness={0.6} />
                </mesh>
                <mesh
                  geometry={stamenAntherGeometry}
                  position={[0, 0.26 * len, 0.03 * len]}
                  rotation={[outTilt, 0, 0]}
                  castShadow
                >
                  <meshStandardMaterial color="#f59e0b" roughness={0.4} />
                </mesh>
              </group>
            ))}

            <mesh geometry={centerGeometry} castShadow>
              <meshStandardMaterial
                color={deepColor}
                roughness={0.4}
                emissive={deepColor}
                emissiveIntensity={0.35}
              />
            </mesh>
          </group>

          <mesh geometry={stemGeometry} position={[0, -0.2, 0]} receiveShadow>
            <meshStandardMaterial color="#4c1d95" roughness={0.7} />
          </mesh>

          <mesh
            geometry={leafGeometryA}
            position={[0.05, -0.7, 0.02]}
            rotation={[0.3, 0.5, -0.7]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#6d28d9"
              roughness={0.65}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh
            geometry={leafGeometryB}
            position={[-0.06, -1.05, -0.02]}
            rotation={[0.25, -0.6, 0.65]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#5b21b6"
              roughness={0.65}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
