'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarqueeStrip from '../ui/MarqueeStrip';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const diningMarqueeItems = [
  '200+ DINING DESTINATIONS', 'NOBU DUBAI', 'DIN TAI FUNG', 'EATALY',
  'ANGELINA PARIS', 'CHEESECAKE FACTORY', '100,000 DAILY COVERS',
  'FOUNTAIN PROMENADE', 'MICHELIN RECOGNIZED', 'AL FRESCO TERRACES',
];

const beats = [
  {
    title: 'OVER 200 DINING DESTINATIONS',
    subtitle: 'Chapter 04 / Culinary Variety',
    desc: 'From high-speed artisanal street food to Michelin-starred master culinary salons, The Dubai Mall plays host to the most diverse gathering of food concepts in the Middle East.',
    stats: '200+ Options  ·  100,000+ Daily Covers',
    image: '/images/sponsorship.png',
  },
  {
    title: 'MICHELIN-RECOGNIZED MAESTROS',
    subtitle: 'Chapter 04 / Premium Dining',
    desc: 'Elite culinary institutions like Nobu, Din Tai Fung, and Angelina Paris choose this venue to present their iconic creations to a highly affluent, globally-connected audience.',
    stats: 'Nobu Dubai  ·  Din Tai Fung  ·  Angelina',
    image: '/images/luxury.png',
  },
  {
    title: 'AL-FRESCO FOUNTAIN PROMENADE',
    subtitle: 'Chapter 04 / Experiential Terraces',
    desc: 'Breathtaking al-fresco terrace dining directly adjacent to the Burj Khalifa and overlooking the choreographic spectacle of the Dubai Fountain. A highly-sought premium branding backdrop.',
    stats: '2.4KM Waterfront  ·  Burj Khalifa Adjacency',
    image: '/images/hero.png',
  },
];

export default function Dining() {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Section watermark focus-in scrub
      if (watermarkRef.current) {
        gsap.fromTo(watermarkRef.current,
          { scale: 3, filter: 'blur(20px)', opacity: 0 },
          {
            scale: 1, filter: 'blur(0px)', opacity: 0.04,
            ease: 'none',
            scrollTrigger: { 
              trigger: containerRef.current, 
              start: 'top bottom',
              end: 'top center',
              scrub: 1 
            },
          }
        );
      }

      // Pin the dining section and use scroll progress to drive beat transitions
      const pinDuration = window.innerHeight * 2; // 2 screen heights of scroll for 3 beats

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${pinDuration}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Map 0→1 progress to 0→2 (3 beats)
          const beatIndex = Math.min(
            beats.length - 1,
            Math.floor(self.progress * beats.length)
          );
          setActiveBeat(beatIndex);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dining"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: '#080808', borderTop: '1px solid rgba(201,164,64,0.1)' }}
    >
      {/* Section watermark */}
      <span
        ref={watermarkRef}
        className="section-watermark"
        style={{ top: '5%', right: '40px', opacity: 0 }}
      >
        05
      </span>

      {/* Dynamic Amber Glow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(201,164,64,0.04), transparent 70%)' }} 
      />

      {/* Content Layout — always visible, h-screen */}
      <div className="relative h-full w-full flex items-center z-10">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Crossfading Visuals */}
          <div className="lg:col-span-6 relative h-[450px] md:h-[550px] w-full overflow-hidden rounded-[2px] border border-white/5 bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBeat}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-[#C9A440]/5 mix-blend-overlay z-10" />
                <Image
                  src={beats[activeBeat].image}
                  alt={beats[activeBeat].title}
                  fill
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-5 border border-[#C9A440]/15 z-20 pointer-events-none" />
                {/* Dynamic stats overlay */}
                <div className="absolute bottom-8 left-8 right-8 z-20 bg-black/70 backdrop-blur-md border border-white/5 p-4 rounded-[1px]">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C9A440] font-bold block mb-1">
                    Key Performance Indicators
                  </span>
                  <p className="text-xs text-[#F5F5F0] font-mono tracking-widest uppercase">
                    {beats[activeBeat].stats}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Beat progress dots */}
            <div className="absolute top-6 right-6 z-30 flex flex-col gap-2">
              {beats.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    width: '6px',
                    height: activeBeat === i ? '24px' : '6px',
                    borderRadius: '3px',
                    background: activeBeat === i
                      ? 'linear-gradient(to bottom, #C9A440, #E8C96A)'
                      : 'rgba(201,164,64,0.25)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Text content details */}
          <div className="lg:col-span-6 flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBeat}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex flex-col gap-6"
              >
                <span className="text-[10px] tracking-[0.3em] text-[#C9A440] uppercase font-bold">
                  {beats[activeBeat].subtitle}
                </span>
                
                <h3 className="font-serif text-3xl md:text-5xl font-bold tracking-wide leading-tight text-[#F5F5F0]">
                  {beats[activeBeat].title}
                </h3>
                
                <p className="text-[#A8A8A0] font-light leading-relaxed text-sm md:text-base">
                  {beats[activeBeat].desc}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <div className="w-8 h-[1px] bg-[#C9A440]" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A440]">
                    Hospitality Stage
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Marquee strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <MarqueeStrip items={diningMarqueeItems} direction="left" speed={32} />
      </div>
    </section>
  );
}
