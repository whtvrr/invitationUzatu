'use client'

interface FloralDividerProps {
  width?: number;
  color?: string;
}

export default function FloralDivider({ width = 280, color = 'var(--accent2)' }: FloralDividerProps) {
  return (
    <svg
      width={width}
      height={28}
      viewBox="0 0 200 28"
      fill="none"
      className="block mx-auto max-w-full"
    >
      <line x1="0" y1="14" x2="80" y2="14" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      <line x1="120" y1="14" x2="200" y2="14" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      <path d="M80,14 Q86,6 91,10 Q88,16 80,14Z" fill={color} opacity="0.3"/>
      <path d="M80,14 Q86,22 91,18 Q88,12 80,14Z" fill={color} opacity="0.22"/>
      <path d="M73,14 Q78,7 82,11 Q80,16 73,14Z" fill={color} opacity="0.18"/>
      <circle cx="100" cy="14" r="4" stroke={color} strokeWidth="0.8" fill="none" opacity="0.7"/>
      <circle cx="100" cy="14" r="2" fill={color} opacity="0.5"/>
      <path d="M120,14 Q114,6 109,10 Q112,16 120,14Z" fill={color} opacity="0.3"/>
      <path d="M120,14 Q114,22 109,18 Q112,12 120,14Z" fill={color} opacity="0.22"/>
      <path d="M127,14 Q122,7 118,11 Q120,16 127,14Z" fill={color} opacity="0.18"/>
    </svg>
  );
}