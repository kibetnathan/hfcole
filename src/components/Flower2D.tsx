import React from 'react';

interface Flower2DProps {
  rotation?: number;
  petalCount?: number;
  petalColor?: string;
  petalDeep?: string;
  centerColor?: string;
  opacity?: number;
  petalLength?: number;
  petalWidth?: number;
  withStem?: boolean;
  className?: string;
  petalClassName?: string;
}

const defaultPalette = {
  petal: '#c4b5fd',
  petalDeep: '#8b5cf6',
  center: '#7c3aed',
};

export default function Flower2D({
  rotation = 0,
  petalCount = 6,
  petalColor = defaultPalette.petal,
  petalDeep = defaultPalette.petalDeep,
  centerColor = defaultPalette.center,
  opacity = 1,
  petalLength = 20,
  petalWidth = 9,
  withStem = false,
  className = '',
  petalClassName = '',
}: Flower2DProps) {
  const petals = Array.from({ length: petalCount }, (_, i) => (360 / petalCount) * i);
  const gradientId = React.useId().replace(/:/g, '');
  const cy = -petalLength * 0.8;

  return (
    <svg
      width="100%"
      viewBox={withStem ? '-50 -50 100 115' : '-50 -50 100 100'}
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

      {withStem && (
        <>
          <path
            d="M0 8 C -3 28, 4 42, 0 58"
            stroke="#4c1d95"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M-1 30 C -16 28, -20 38, -14 44 C -8 40, -4 34, -1 34" fill="#6d28d9" />
          <path d="M2 40 C 16 38, 20 48, 14 54 C 8 50, 4 44, 2 44" fill="#5b21b6" />
        </>
      )}

      {petals.map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <ellipse
            cx="0"
            cy={cy}
            rx={petalWidth}
            ry={petalLength}
            fill={petalColor}
            opacity="0.9"
            className={petalClassName}
          />
          <ellipse
            cx="0"
            cy={cy}
            rx={petalWidth * 0.55}
            ry={petalLength * 0.8}
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