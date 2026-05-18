'use client';

interface NebulaOrbProps {
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

// NebulaOrb — the blurred ambient gold glow orb from Sleep Well Creatives
// Used in hero and CTA sections
export default function NebulaOrb({
  color = '#C9A440',
  size = 800,
  opacity = 0.12,
  className = '',
  style,
}: NebulaOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        filter: 'blur(80px)',
        animation: 'nebulaFloat 12s ease-in-out infinite',
        zIndex: 1,
        ...style,
      }}
    />
  );
}
