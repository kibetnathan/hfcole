import { useId } from "react";

const makeWings = (wing: string, deep: string, hind: string) => (
  <g>
    {/* forewing */}
    <path
      d="M97 38 C 90 24 68 14 44 18 C 28 21 22 32 30 45 C 37 57 58 63 80 60 C 91 58 97 52 100 46 Z"
      fill={`url(#${wing})`}
      stroke="#2e1065"
      strokeWidth="2"
    />
    <path
      d="M94 40 C 84 30 66 22 50 24 C 40 25 36 34 41 42 C 46 50 60 54 78 53 C 88 52 94 48 96 44 Z"
      fill="#e9d5ff"
      opacity="0.16"
      stroke="#4c1d95"
      strokeWidth="0.8"
    />
    <g stroke="#4c1d95" strokeWidth="1" opacity="0.65" fill="none">
      <path d="M97 40 C 80 30 62 26 47 25" />
      <path d="M97 40 C 80 40 62 44 38 42" />
      <path d="M98 45 C 84 50 66 54 44 54" />
    </g>
    <circle cx="52" cy="36" r="8" fill="none" stroke="#c4b5fd" strokeWidth="1.4" />
    <circle cx="52" cy="36" r="5.5" fill={`url(#${deep})`} />
    <circle cx="52" cy="36" r="2.4" fill="#e9d5ff" />
    <circle cx="51" cy="34.6" r="0.9" fill="#ffffff" />
    <circle cx="70" cy="29" r="1.1" fill="#c4b5fd" opacity="0.9" />
    <circle cx="77" cy="46" r="1.3" fill="#e9d5ff" opacity="0.8" />
    <circle cx="62" cy="53" r="1" fill="#c4b5fd" opacity="0.9" />

    {/* hindwing */}
    <path
      d="M99 56 C 84 63 64 71 58 86 C 53 99 62 111 78 113 C 92 115 100 105 100 90 Z"
      fill={`url(#${hind})`}
      stroke="#2e1065"
      strokeWidth="2"
    />
    <path
      d="M98 61 C 86 67 72 73 67 84 C 63 94 70 102 80 103 C 90 105 96 99 97 88 Z"
      fill="#e9d5ff"
      opacity="0.14"
      stroke="#4c1d95"
      strokeWidth="0.8"
    />
    <circle cx="72" cy="90" r="4.2" fill="none" stroke="#c4b5fd" strokeWidth="1.2" />
    <circle cx="72" cy="90" r="2.2" fill="#6d28d9" />
    <circle cx="72" cy="90" r="0.9" fill="#e9d5ff" />
    <path
      d="M78 113 C 73 118 75 123 80 125"
      fill="none"
      stroke="#4c1d95"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="80" cy="125" r="1.3" fill="#a78bfa" />
  </g>
);

export default function Butterfly({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const wing = `wing-${uid}`;
  const wingDeep = `wingDeep-${uid}`;
  const hind = `hind-${uid}`;
  const body = `body-${uid}`;

  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={wing} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="55%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id={wingDeep} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id={hind} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#2e1065" />
        </linearGradient>
      </defs>

      {/* antennae */}
      <g stroke="#8b5cf6" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M97 26 C 88 15 80 11 70 9" />
        <path d="M103 26 C 112 15 120 11 130 9" />
      </g>
      <circle cx="70" cy="9" r="2.6" fill="#c4b5fd" />
      <circle cx="130" cy="9" r="2.6" fill="#c4b5fd" />

      {/* left wings */}
      <g>{makeWings(wing, wingDeep, hind)}</g>
      {/* right wings, mirrored */}
      <g transform="translate(200,0) scale(-1,1)">
        {makeWings(wing, wingDeep, hind)}
      </g>

      {/* body */}
      <ellipse
        cx="100"
        cy="72"
        rx="6.5"
        ry="27"
        fill={`url(#${body})`}
        stroke="#1e1b4b"
        strokeWidth="0.8"
      />
      <g stroke="#1e1b4b" strokeWidth="1" opacity="0.7" fill="none">
        <path d="M95 55 Q100 56.5 105 55" />
        <path d="M94 63 Q100 64.5 106 63" />
        <path d="M94 71 Q100 72.5 106 71" />
        <path d="M94 79 Q100 80.5 106 79" />
        <path d="M95 87 Q100 88.5 105 87" />
      </g>
      <ellipse cx="100" cy="41" rx="5.2" ry="8.5" fill="#2e1065" />
      <circle cx="100" cy="30" r="5" fill="#4c1d95" />
      <circle cx="97.4" cy="29.2" r="1.5" fill="#1e1b4b" />
      <circle cx="102.6" cy="29.2" r="1.5" fill="#1e1b4b" />
    </svg>
  );
}
