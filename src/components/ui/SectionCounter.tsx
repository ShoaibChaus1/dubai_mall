'use client';

import { useEffect, useState, useRef } from 'react';
import { useStore } from '@/lib/store';

const SECTIONS = [
  { id: 'hero',          num: '01', label: 'Welcome' },
  { id: 'why',           num: '02', label: 'The Destination' },
  { id: 'retail',        num: '03', label: 'Retail' },
  { id: 'luxury',        num: '04', label: 'Fashion Avenue' },
  { id: 'dining',        num: '05', label: 'Dining' },
  { id: 'entertainment', num: '06', label: 'Entertainment' },
  { id: 'events',        num: '07', label: 'Events Platform' },
  { id: 'cta',           num: '08', label: 'Get Started' },
];

// SectionCounter — fixed top-left "03 / 08" counter with smooth morphing
// Inspired by Sleep Well Creatives' section navigation system
export default function SectionCounter() {
  const { isIntroVideoComplete, activeSection } = useStore();
  const [displayNum, setDisplayNum] = useState('01');
  const [displayLabel, setDisplayLabel] = useState('Welcome');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const prevSection = useRef(activeSection);
  const prevIndex = useRef(0);

  const current = SECTIONS.find((s) => s.id === activeSection) ?? SECTIONS[0];
  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  useEffect(() => {
    if (activeSection !== prevSection.current) {
      // Determine scroll direction
      const newIndex = SECTIONS.findIndex(s => s.id === activeSection);
      setDirection(newIndex > prevIndex.current ? 'down' : 'up');
      
      setIsTransitioning(true);
      
      // After exit animation, update display and enter
      setTimeout(() => {
        setDisplayNum(current.num);
        setDisplayLabel(current.label);
        setIsTransitioning(false);
      }, 200);
      
      prevSection.current = activeSection;
      prevIndex.current = newIndex;
    } else {
      setDisplayNum(current.num);
      setDisplayLabel(current.label);
    }
  }, [activeSection, current.num, current.label, currentIndex]);

  if (!isIntroVideoComplete) return null;

  return (
    <div
      className="fixed top-6 left-6 z-[150] flex items-center gap-4 select-none"
      aria-label={`Section ${displayNum} of ${SECTIONS.length}`}
    >
      {/* Number with smooth vertical slide */}
      <div className="overflow-hidden" style={{ height: '16px' }}>
        <span
          className="block"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '12px',
            letterSpacing: '0.25em',
            color: '#C9A440',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
            transform: isTransitioning
              ? `translateY(${direction === 'down' ? '-100%' : '100%'})`
              : 'translateY(0)',
            opacity: isTransitioning ? 0 : 1,
            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
          }}
        >
          {displayNum}
        </span>
      </div>

      {/* Separator */}
      <span
        style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: 'rgba(122, 128, 153, 0.3)',
          fontFamily: 'var(--font-dm-sans)',
        }}
      >
        /
      </span>

      {/* Total */}
      <span
        style={{
          fontSize: '11px',
          letterSpacing: '0.25em',
          color: 'rgba(122, 128, 153, 0.4)',
          fontFamily: 'var(--font-dm-sans)',
        }}
      >
        {SECTIONS.length.toString().padStart(2, '0')}
      </span>

      {/* Section label with crossfade */}
      <div 
        className="overflow-hidden hidden md:block"
        style={{ 
          marginLeft: '12px',
          borderLeft: '1px solid rgba(201,164,64,0.15)',
          paddingLeft: '12px',
          height: '16px',
        }}
      >
        <span
          className="block"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#7A8099',
            transform: isTransitioning
              ? `translateY(${direction === 'down' ? '-100%' : '100%'})`
              : 'translateY(0)',
            opacity: isTransitioning ? 0 : 1,
            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
          }}
        >
          {displayLabel}
        </span>
      </div>
    </div>
  );
}
