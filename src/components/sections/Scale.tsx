'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatCounter from '../ui/StatCounter';
import MarqueeStrip from '../ui/MarqueeStrip';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const metrics = [
  { value: 100, suffix: 'M+', label: 'Annual Visitors', description: 'The most visited retail & lifestyle destination on the planet, surpassing all major global landmarks.' },
  { value: 1300, suffix: '+', label: 'Retail Stores', description: 'A monumental ecosystem comprising standard flagships, boutique start-ups, and the world\'s finest luxury brands.' },
  { value: 502000, suffix: ' m²', label: 'Total GLA', description: 'Equivalent to over 50 professional football fields of premium, high-density retail space.' },
  { value: 1, suffix: '', label: 'Ranked #1 Globally', description: 'Recognized as the primary commercial launch stage and the global capital of high-impact retail activations.' },
];

const marqueeItems = [
  'DOWNTOWN DUBAI', 'ADJACENT TO BURJ KHALIFA', 'DUBAI METRO DIRECT ACCESS',
  '2.4KM DUBAI FOUNTAIN', 'EMAAR PROPERTIES', 'OPENED 2008',
  'FASHION AVENUE', 'DUBAI AQUARIUM', 'OLYMPIC-SIZE ICE RINK', '100M+ VISITORS',
  '502,000 M² GLA', '1,300 STORES', 'VR PARK', 'KIDZANIA',
];

export default function Scale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

  const [footfall, setFootfall] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFootfall(prev => prev + Math.floor(Math.random() * 3 + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Section watermark: scale 4→1 + blur reveal linked to scroll (scrub)
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { scale: 4, filter: 'blur(20px)', opacity: 0 },
          {
            scale: 1,
            filter: 'blur(0px)',
            opacity: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'center center',
              scrub: 1,
            },
          }
        );
      }

      // Heading clip reveal tied to scroll
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { clipPath: 'inset(0 0 100% 0)', y: 40 },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }

      // Paragraph reveal
      if (paraRef.current) {
        gsap.fromTo(
          paraRef.current,
          { opacity: 0.1, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: paraRef.current,
              start: 'top 85%',
              scrub: 1,
            },
          }
        );
      }

      // Stat cards stagger scrub
      const cards = cardsRef.current?.querySelectorAll('.stat-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 40%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center py-28 md:py-36 overflow-hidden"
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(201,164,64,0.1)',
      }}
    >
      {/* Section watermark */}
      <span
        ref={watermarkRef}
        className="section-watermark"
        style={{
          top: '10%',
          right: '40px',
          opacity: 0,
        }}
      >
        02
      </span>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 z-10 flex flex-col gap-20">

        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <span
              className="block mb-4"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: '#C9A440',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              CHAPTER 01 / THE DATA PLATFORM
            </span>
            <h2
              ref={headlineRef}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: 400,
                letterSpacing: '0.04em',
                lineHeight: 1.05,
                color: '#F0EDE8',
              }}
            >
              A NATION-SCALE{' '}
              <span
                style={{
                  background: 'linear-gradient(to right, #C9A440, #E8C96A)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                AUDIENCE ENGINE.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-8">
            <p
              ref={paraRef}
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                color: '#7A8099',
                lineHeight: 1.8,
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              The Dubai Mall represents the ultimate fusion of extreme scale, elite global brands, and continuous experiential entertainment. As the undisputed focal point of Downtown Dubai, it offers brands a permanent commercial stage that converts premium global traffic into direct prestige.
            </p>
          </div>
        </div>

        {/* 4-up Glassmorphism Stats Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="stat-card group relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201,164,64,0.1)',
                padding: '32px',
                borderRadius: '2px',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.5s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,164,64,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,164,64,0.1)')}
            >
              {/* Gold hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(201,164,64,0.05), transparent)' }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span
                  className="block mb-6"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    color: 'rgba(201,164,64,0.5)',
                  }}
                >
                  0{index + 1}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(36px, 4vw, 50px)',
                    fontWeight: 400,
                    color: '#F0EDE8',
                    letterSpacing: '-0.01em',
                    marginBottom: '8px',
                    lineHeight: 1,
                  }}
                >
                  <StatCounter value={metric.value} suffix={metric.suffix} />
                </h3>
                <h4
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#C9A440',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  {metric.label}
                </h4>
              </div>
              <p
                className="group-hover:text-[#F0EDE8] transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '11px',
                  color: '#9CA3AF',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Live Footfall Simulation */}
        <div
          className="relative overflow-hidden group"
          style={{
            border: '1px solid rgba(201,164,64,0.15)',
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(12px)',
            padding: '24px 32px',
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h3
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '16px',
                letterSpacing: '0.05em',
                color: '#F0EDE8',
                fontWeight: 400,
              }}
            >
              Audience Circulation — Live Simulation
            </h3>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '16px',
                color: '#E8C96A',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px rgba(34,197,94,0.6)',
                  animation: 'glowPulse 2s infinite',
                  display: 'inline-block',
                }}
              />
              +{footfall} visitors entered since your session started
            </div>
          </div>
        </div>

      </div>

      {/* Marquee strip at bottom of section */}
      <div className="mt-20">
        <MarqueeStrip items={marqueeItems} direction="left" speed={40} />
      </div>
    </section>
  );
}
