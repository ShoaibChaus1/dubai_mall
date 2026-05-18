'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NebulaOrb from '../ui/NebulaOrb';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADLINE_WORDS = ['WHERE', 'THE', 'WORLD', 'SHOPS.'];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Ken Burns background: scale in slowly
      gsap.fromTo(
        bgRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1.0, opacity: 0.6, duration: 3.5, ease: 'power2.out' }
      );

      const tl = gsap.timeline({ delay: 2.4 });

      // Word-by-word clip-path reveal (Sleep Well Creatives style)
      tl.fromTo(
        wordsRef.current,
        {
          clipPath: 'inset(0 0 100% 0)',
          y: 40,
          opacity: 0,
        },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          opacity: 1,
          stagger: 0.14,
          duration: 0.9,
          ease: 'power3.out',
        }
      );

      // Subhead + CTA fade up
      tl.fromTo(
        ['.hero-sub', '.hero-cta'],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      );

      // Scroll indicator
      tl.fromTo(
        '.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Parallax on scroll for background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Scroll-driven scale & fade for the text content
      gsap.to('.hero-content-wrapper', {
        scale: 0.85,
        opacity: 0,
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Mouse Parallax Interaction
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to('.hero-content-wrapper', {
          x: x,
          y: y,
          rotationY: x * 0.5,
          rotationX: -y * 0.5,
          ease: 'power2.out',
          duration: 1
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollClick = () => {
    document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: '#080808' }}
    >
      {/* Section watermark number */}
      <span
        className="section-watermark"
        style={{
          bottom: '-10px',
          right: '40px',
          fontSize: 'clamp(120px, 20vw, 220px)',
          opacity: 0.035,
        }}
      >
        01
      </span>

      {/* Nebula orb — center-right position */}
      <NebulaOrb
        size={900}
        opacity={0.1}
        className="top-1/2 -translate-y-1/2"
        style={{ right: '-100px' } as React.CSSProperties}
      />

      {/* Cinematic Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/hero.png"
          alt="The Dubai Mall and Burj Khalifa aerial view"
          fill
          className="object-cover"
          priority
        />
        {/* Vignette overlays */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8,8,8,0.75) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />
        <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #080808, transparent)' }} />
        {/* Grain texture on image */}
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />
      </div>

      {/* Hero Core Content */}
      <div className="hero-content-wrapper relative z-10 flex flex-col items-center text-center px-6 max-w-5xl" style={{ perspective: '1000px' }}>
        {/* Eyebrow */}
        <span
          className="block mb-8"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C9A440',
            fontWeight: 600,
          }}
        >
          THE WORLD&rsquo;S MOST VISITED DESTINATION
        </span>

        {/* Headline — word by word clip reveal */}
        <h1
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(52px, 10vw, 120px)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            lineHeight: 0.95,
            color: '#F0EDE8',
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={word}
              ref={(el) => { if (el) wordsRef.current[i] = el; }}
              style={{
                display: 'inline-block',
                color: word === 'WORLD' ? 'transparent' : '#F0EDE8',
                backgroundImage: word === 'WORLD'
                  ? 'linear-gradient(to right, #C9A440, #E8C96A)'
                  : undefined,
                WebkitBackgroundClip: word === 'WORLD' ? 'text' : undefined,
                backgroundClip: word === 'WORLD' ? 'text' : undefined,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Gold divider line */}
        <div
          className="mb-8"
          style={{
            width: '200px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A440, transparent)',
          }}
        />

        {/* Subhead */}
        <p
          className="hero-sub mb-12 opacity-0"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            color: '#7A8099',
            maxWidth: '560px',
            lineHeight: 1.8,
            letterSpacing: '0.03em',
          }}
        >
          100 Million Visitors. 1,300 Stores. One Address in Downtown Dubai.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center gap-5 opacity-0">
          <button
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="cursor-pointer transition-all duration-300 hover:brightness-110"
            style={{
              padding: '14px 36px',
              background: 'linear-gradient(to right, #C9A440, #E8C96A)',
              color: '#080808',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 700,
              borderRadius: '1px',
              border: 'none',
              boxShadow: '0 0 30px rgba(201,164,64,0.2)',
            }}
          >
            Explore Opportunity
          </button>
          <button
            onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}
            className="cursor-pointer transition-all duration-300 hover:border-[#C9A440]/60 hover:text-[#C9A440]"
            style={{
              padding: '14px 36px',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(12px)',
              color: '#F0EDE8',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 700,
              borderRadius: '1px',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            Request Deck
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group z-20 opacity-0"
        onClick={handleScrollClick}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#7A8099',
            transition: 'color 0.3s',
          }}
          className="group-hover:text-[#C9A440]"
        >
          SCROLL TO EXPLORE
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, #C9A440, transparent)',
              animation: 'scrollLine 1.8s linear infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
