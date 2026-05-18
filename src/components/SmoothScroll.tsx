'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useStore } from '@/lib/store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { isIntroVideoComplete } = useStore();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to top on load
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateGSAP = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGSAP);
    gsap.ticker.lagSmoothing(0);

    // Set ScrollTrigger defaults for consistent scrub behavior
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    return () => {
      gsap.ticker.remove(updateGSAP);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isIntroVideoComplete) {
        window.scrollTo(0, 0);
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.start();
        
        // Refresh all ScrollTriggers after preloader completes to recalculate positions
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      } else {
        lenisRef.current.stop();
      }
    }
  }, [isIntroVideoComplete]);

  return <>{children}</>;
}
