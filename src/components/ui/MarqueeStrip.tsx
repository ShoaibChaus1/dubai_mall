'use client';

interface MarqueeStripProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number; // seconds for one full cycle
  className?: string;
}

// MarqueeStrip — infinite scrolling text strip
// Matches Sleep Well Creatives' exact marquee implementation
export default function MarqueeStrip({
  items,
  direction = 'left',
  speed = 35,
  className = '',
}: MarqueeStripProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  const trackClass = direction === 'left' ? 'marquee-track-left' : 'marquee-track-right';

  return (
    <div
      className={`w-full overflow-hidden py-3.5 ${className}`}
      style={{
        borderTop: '1px solid rgba(201, 164, 64, 0.12)',
        borderBottom: '1px solid rgba(201, 164, 64, 0.12)',
      }}
    >
      <div
        className={trackClass}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#7A8099',
              padding: '0 32px',
            }}
          >
            {item}
            <span style={{ color: '#C9A440', marginLeft: '32px' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
