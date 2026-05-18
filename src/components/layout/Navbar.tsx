'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useStore } from '@/lib/store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const sections = [
  { id: 'hero',          num: '01', label: 'Welcome' },
  { id: 'why',           num: '02', label: 'The Destination' },
  { id: 'retail',        num: '03', label: 'Retail' },
  { id: 'luxury',        num: '04', label: 'Fashion Avenue' },
  { id: 'dining',        num: '05', label: 'Dining' },
  { id: 'entertainment', num: '06', label: 'Entertainment' },
  { id: 'events',        num: '07', label: 'Events Platform' },
  { id: 'cta',           num: '08', label: 'Get Started' },
];

export default function Navbar() {
  const { activeSection, setActiveSection, isIntroVideoComplete } = useStore();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});
  const navRef = useRef<HTMLElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // ScrollTrigger-based section detection — correctly handles GSAP pin spacers
  useEffect(() => {
    if (!isIntroVideoComplete) return;

    // Small delay to let GSAP pins initialize first
    const timer = setTimeout(() => {
      // Clean up any previous triggers
      triggersRef.current.forEach(t => t.kill());
      triggersRef.current = [];

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(section.id);
            }
          },
          onUpdate: (self) => {
            setSectionProgress(prev => ({
              ...prev,
              [section.id]: self.progress,
            }));
          },
        });

        triggersRef.current.push(trigger);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      triggersRef.current.forEach(t => t.kill());
      triggersRef.current = [];
    };
  }, [isIntroVideoComplete, setActiveSection]);

  // Global scroll progress for the top bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDotClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const activeIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <>
      {/* Top Gold Scroll Progress Bar — 1px, gold, left-origin */}
      <div className="fixed top-0 left-0 right-0 h-[1px] z-[180]" style={{ background: 'rgba(201,164,64,0.08)' }}>
        <div
          className="h-full origin-left"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(to right, #C9A440, #E8C96A)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Floating Header */}
      <header
        className="fixed top-0 left-0 right-0 z-[160] px-6 md:px-12 py-6 flex justify-between items-center"
        style={{
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.85), transparent)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* Wordmark */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleDotClick('hero')}
        >
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(16px, 2vw, 20px)',
              letterSpacing: '0.25em',
              fontWeight: 400,
              color: '#F0EDE8',
            }}
          >
            THE DUBAI MALL
          </span>
          <span
            className="hidden sm:inline-block"
            style={{
              width: '1px',
              height: '14px',
              background: 'rgba(255,255,255,0.15)',
            }}
          />
          <span
            className="hidden sm:inline-block"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: '#C9A440',
              textTransform: 'uppercase',
              paddingTop: '2px',
            }}
          >
            Downtown Dubai
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => handleDotClick('cta')}
          className="cursor-pointer transition-all duration-300 hover:border-[#C9A440]/60 hover:text-[#C9A440]"
          style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#F0EDE8',
            borderRadius: '1px',
          }}
        >
          Book Conversation
        </button>
      </header>

      {/* Numbered Dot Navigation — right edge, vertical with connecting lines */}
      {isIntroVideoComplete && (
        <>
          {/* Left Side Global Interactive Watermark */}
          <div 
            className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-[150] pointer-events-none select-none"
            style={{ opacity: 0.08 }}
          >
            <span
              className="font-serif font-bold text-transparent"
              style={{
                WebkitTextStroke: '1px #C9A440',
                fontSize: 'clamp(80px, 12vw, 160px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {sections.find(s => s.id === activeSection)?.num || '01'}
            </span>
          </div>

          {/* Right Edge Dot Navigation with Connecting Lines */}
          <nav
            ref={navRef}
            className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-[160] hidden sm:flex flex-col items-center"
            aria-label="Section navigation"
            style={{ gap: 0 }}
          >
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredDot === section.id;
            const isPast = index < activeIndex;
            const isCurrentOrPast = isPast || isActive;

            // Calculate line fill for the line ABOVE this dot
            let lineFill = 0;
            if (index > 0) {
              const prevSection = sections[index - 1];
              if (isPast) {
                lineFill = 1;
              } else if (index === activeIndex) {
                lineFill = sectionProgress[prevSection.id] ?? 0;
              }
            }

            return (
              <div key={section.id} className="flex flex-col items-center">
                {/* Connecting line ABOVE this dot (not for first dot) */}
                {index > 0 && (
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: '1px',
                      height: '18px',
                      background: 'rgba(201,164,64,0.1)',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${lineFill * 100}%`,
                        background: 'linear-gradient(to bottom, #C9A440, #E8C96A)',
                        transition: 'height 0.3s ease-out',
                      }}
                    />
                  </div>
                )}

                {/* Dot with number */}
                <div
                  className="relative flex items-center justify-end cursor-pointer"
                  onMouseEnter={() => setHoveredDot(section.id)}
                  onMouseLeave={() => setHoveredDot(null)}
                  onClick={() => handleDotClick(section.id)}
                  role="button"
                  aria-label={`Navigate to ${section.label}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleDotClick(section.id)}
                  style={{ padding: '3px 0' }}
                >
                  {/* Tooltip label — slides in from right */}
                  <span
                    className="absolute"
                    style={{
                      right: 'calc(100% + 14px)',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '9px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#F0EDE8',
                      whiteSpace: 'nowrap',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateX(0)' : 'translateX(8px)',
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                      pointerEvents: 'none',
                    }}
                  >
                    {section.label}
                  </span>

                  {/* Numbered Dot */}
                  <div
                    style={{
                      width: isActive ? 32 : 26,
                      height: isActive ? 32 : 26,
                      borderRadius: '50%',
                      border: `1px solid ${isCurrentOrPast ? '#C9A440' : 'rgba(201,164,64,0.2)'}`,
                      background: isActive
                        ? 'linear-gradient(135deg, #C9A440, #E8C96A)'
                        : isPast
                          ? 'rgba(201,164,64,0.12)'
                          : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isHovered && !isActive ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: isActive
                        ? '0 0 20px rgba(201,164,64,0.3), 0 0 40px rgba(201,164,64,0.1)'
                        : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: isActive ? '9px' : '8px',
                        letterSpacing: '0.05em',
                        color: isActive ? '#080808' : isPast ? '#C9A440' : '#7A8099',
                        fontWeight: isActive ? 700 : 600,
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {section.num}
                    </span>
                  </div>

                  {/* Active pulse ring */}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '50%',
                        border: '1px solid rgba(201,164,64,0.2)',
                        animation: 'dotPulse 2s ease-in-out infinite',
                        right: 'auto',
                        left: 'auto',
                        width: 40,
                        height: 40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </nav>
        </>
      )}
    </>
  );
}
