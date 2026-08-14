import React from 'react';

interface Flower2DProps {
  size?: number;
  rotation?: number;
  petalCount?: number;
  petalColor?: string;
  petalDeep?: string;
  centerColor?: string;
  opacity?: number;
  className?: string;
  petalClassName?: string;
}

const defaultPalette = {
  petal: '#c4b5fd',
  petalDeep: '#8b5cf6',
  center: '#7c3aed',
};

export default function Flower2D({
  size = 100,
  rotation = 0,
  petalCount = 6,
  petalColor = defaultPalette.petal,
  petalDeep = defaultPalette.petalDeep,
  centerColor = defaultPalette.center,
  opacity = 1,
  className = '',
  petalClassName = '',
}: Flower2DProps) {
  const petals = Array.from({ length: petalCount }, (_, i) => (360 / petalCount) * i);
  const gradientId = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      style={{ transform: `rotate(${rotation}deg)`, opacity }}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={centerColor} />
          <stop offset="100%" stopColor={petalDeep} />
        </radialGradient>
      </defs>

      {petals.map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <ellipse
            cx="0"
            cy="-16"
            rx="9"
            ry="20"
            fill={petalColor}
            opacity="0.9"
            className={petalClassName}
          />
          <ellipse
            cx="0"
            cy="-16"
            rx="5"
            ry="16"
            fill={petalDeep}
            opacity="0.35"
          />
        </g>
      ))}

      <circle r="9" fill={`url(#${gradientId})`} />
      <circle r="4" fill="#f5f3ff" opacity="0.85" />
    </svg>
  );
}
