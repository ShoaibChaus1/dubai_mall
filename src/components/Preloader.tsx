'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '@/lib/store';

// Preloader — Sleep Well Creatives style
// Thin gold progress bar → "ENTER SITE" button → fade out
export default function Preloader() {
  const { isPreloaderComplete, setPreloaderComplete } = useStore();
  const [showEnter, setShowEnter] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const progressObj = useRef({ value: 0 });

  useEffect(() => {
    if (isPreloaderComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Wordmark fades in with tracking expansion
      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, letterSpacing: '0em', y: 20 },
        { opacity: 1, letterSpacing: '0.35em', y: 0, duration: 1.5, ease: 'power3.out' }
      );

      // 2. Progress counter and bar
      tl.to(
        progressObj.current,
        {
          value: 100,
          duration: 2.8,
          ease: 'power2.inOut',
          onUpdate: () => {
            setProgress(Math.round(progressObj.current.value));
            gsap.set(barRef.current, { scaleX: progressObj.current.value / 100 });
          },
          onComplete: () => setShowEnter(true),
        },
        '-=0.5'
      );
    });

    return () => ctx.revert();
  }, [isPreloaderComplete]);

  const handleEnter = () => {
    if (exiting) return;
    setExiting(true);

    const tl = gsap.timeline({
      onComplete: () => setPreloaderComplete(true),
    });

    // Fade out contents
    tl.to([wordmarkRef.current, barRef.current, enterBtnRef.current?.parentElement], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    });

    // Curtain reveal up
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: 'expo.inOut',
    });
  };

  if (isPreloaderComplete) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#080808]"
    >
      {/* Grain texture on preloader */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          opacity: 0.18,
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Wordmark */}
        <div ref={wordmarkRef} className="flex flex-col items-center gap-2 opacity-0">
          <span
            className="text-[#F0EDE8]"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(20px, 3vw, 28px)',
              letterSpacing: '0.35em',
              fontWeight: 400,
              textTransform: 'uppercase',
            }}
          >
            The Dubai Mall
          </span>
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '9px',
              letterSpacing: '0.35em',
              color: '#7A8099',
              textTransform: 'uppercase',
            }}
          >
            LOADING
          </span>
        </div>

        {/* Percentage Counter */}
        <div 
          className="text-[#C9A440] font-serif font-bold text-4xl mb-[-20px] tabular-nums transition-all duration-700 ease-out drop-shadow-[0_0_15px_rgba(201,164,64,0.3)]"
          style={{ 
            opacity: showEnter ? 0 : 1,
            transform: showEnter ? 'scale(0.9)' : 'scale(1)',
          }}
        >
          {progress.toString().padStart(3, '0')}%
        </div>

        {/* Thin Gold Progress Bar */}
        <div
          style={{
            width: '240px',
            height: '1px',
            background: 'rgba(201, 164, 64, 0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            ref={barRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, transparent, #C9A440, #F5D372, #C9A440, transparent)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* Enter Site Button — fades in after bar completes */}
        <div
          style={{
            position: 'relative',
            opacity: showEnter ? 1 : 0,
            transform: showEnter ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            pointerEvents: showEnter ? 'auto' : 'none',
          }}
          className="flex items-center justify-center mt-2"
        >
          {/* Animated Pulse Rings */}
          <div className="absolute inset-0 rounded-full border border-[#C9A440]/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <div className="absolute inset-[-6px] rounded-full border border-[#C9A440]/15 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          
          <button
            ref={enterBtnRef}
            onClick={handleEnter}
            disabled={!showEnter || exiting}
            className="cursor-pointer transition-all duration-500 hover:text-[#F5D372] hover:tracking-[0.4em] hover:drop-shadow-[0_0_12px_rgba(201,164,64,0.8)] relative z-10"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '11px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#C9A440',
              background: 'rgba(8,8,8,0.5)',
              border: '1px solid rgba(201,164,64,0.2)',
              borderRadius: '30px',
              padding: '12px 28px',
              transition: 'all 0.4s ease',
            }}
          >
            ENTER SITE
          </button>
        </div>
      </div>

      {/* Bottom info */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-between items-end px-10"
        style={{ opacity: 0.35 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: '#7A8099',
            textTransform: 'uppercase',
          }}
        >
          Downtown Dubai
        </span>
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: '#7A8099',
            textTransform: 'uppercase',
          }}
        >
          Emaar Properties
        </span>
      </div>
    </div>
  );
}
