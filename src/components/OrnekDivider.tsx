'use client'

interface OrnekDividerProps {
  width?: number;
  color?: string;
}

export default function OrnekDivider({ width = 280, color = 'var(--accent)' }: OrnekDividerProps) {
  const patternId = `op-${width}`;

  return (
    <svg
      width={width}
      height={18}
      viewBox={`0 0 ${width} 18`}
      fill="none"
      className="block mx-auto max-w-full"
    >
      <defs>
        <pattern id={patternId} width="36" height="18" patternUnits="userSpaceOnUse">
          <polygon points="18,3 26,9 18,15 10,9" stroke={color} strokeWidth="0.8" fill="none"/>
          <circle cx="18" cy="9" r="1.5" fill={color} opacity="0.6"/>
          <line x1="0" y1="9" x2="10" y2="9" stroke={color} strokeWidth="0.5" opacity="0.5"/>
          <line x1="26" y1="9" x2="36" y2="9" stroke={color} strokeWidth="0.5" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width={width} height="18" fill={`url(#${patternId})`}/>
    </svg>
  );
}