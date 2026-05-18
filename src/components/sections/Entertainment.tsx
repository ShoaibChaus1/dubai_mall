'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tabs = [
  {
    id: 'aquarium',
    name: 'Dubai Aquarium',
    title: 'Dubai Aquarium & Underwater Zoo',
    stat1: '33,000 Aquatic Animals',
    stat2: '400 Sharks & Rays',
    stat3: 'World\'s Largest Acrylic Panel',
    image: '/images/luxury.png',
    desc: 'A 10 million litre suspended tank housing one of the world\'s largest collections of aquatic life. Visible from three floors of the mall, it acts as a permanent live anchor drawing millions of eyes daily.',
  },
  {
    id: 'icerink',
    name: 'Dubai Ice Rink',
    title: 'Olympic-Size Ice Rink',
    stat1: 'Olympic Size (2,000 m²)',
    stat2: 'Year-Round Programming',
    stat3: 'Full Brand Takeover Ready',
    image: '/images/hero.png',
    desc: 'The social and entertainment heartbeat of Downtown Dubai. Hosting live concert transformations, ice shows, professional matches, and massive high-impact brand activations inside a high-volume arena.',
  },
  {
    id: 'vrpark',
    name: 'VR Park',
    title: 'Immersive VR Theme Park',
    stat1: '30+ VR & AR Experiences',
    stat2: 'Dubai-Exclusive Concepts',
    stat3: '750 m² High-Tech Space',
    image: '/images/sponsorship.png',
    desc: 'The ultimate high-tech indoor attraction. Blurs the lines between perception and reality, offering brand activation partners an unparalleled audience demographic of young, tech-savvy consumers.',
  },
  {
    id: 'kidzania',
    name: 'KidZania',
    title: 'Edutainment Interactive City',
    stat1: '80+ Career Roles',
    stat2: 'Scaled Micro-City',
    stat3: '8,000 m² Edutainment Hub',
    image: '/images/luxury.png',
    desc: 'A complete, highly immersive scaled-down city built exclusively for child development. Allows children to experience reality through simulated career activities sponsored by leading global brands.',
  },
];

export default function Entertainment() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

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

      // Fade in heading scrub
      const heading = headingRef.current;
      if (heading) {
        gsap.fromTo(heading,
          { clipPath: 'inset(0 0 100% 0)', y: 40 },
          {
            clipPath: 'inset(0 0 0% 0)', y: 0,
            ease: 'none',
            scrollTrigger: { 
              trigger: containerRef.current, 
              start: 'top 60%',
              end: 'top 30%',
              scrub: 1 
            },
          }
        );
      }

      // Content Panel slide up
      const currentContainer = containerRef.current;
      if (currentContainer) {
        const panel = currentContainer.querySelector('.immersive-panel');
        if (panel) {
          gsap.fromTo(panel,
            { opacity: 0, y: 120, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                end: 'center 60%',
                scrub: 1
              }
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="entertainment"
      ref={containerRef}
      className="relative min-h-screen w-full py-28 md:py-36 overflow-hidden flex flex-col justify-center"
      style={{ background: '#050505', borderTop: '1px solid rgba(201,164,64,0.1)' }}
    >
      {/* Section watermark */}
      <span
        ref={watermarkRef}
        className="section-watermark"
        style={{ top: '8%', left: '40px', opacity: 0 }}
      >
        06
      </span>
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col gap-12">
        
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl">
          <span className="text-[10px] tracking-[0.3em] text-[#C9A440] uppercase font-bold mb-4 block">
            CHAPTER 05 / ENTERTAINMENT CITY
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-[#F5F5F0]">
            NOT JUST A DESTINATION. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A440] to-[#E8C96A]">A MASSIVE SOCIAL ANCHOR.</span>
          </h2>
          <p className="text-[#A8A8A0] font-light leading-relaxed mt-6">
            With world-famous leisure landmarks integrated directly into the retail floor, The Dubai Mall represents an experiential ecosystem that commands attention and makes visitors stay longer.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-3 border-b border-white/5 pb-6">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2.5 text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-300 border rounded-[1px] cursor-pointer ${
                activeTab === index
                  ? 'border-[#C9A440] bg-[#C9A440]/10 text-white'
                  : 'border-white/5 text-gray-400 hover:text-[#F5F5F0] hover:border-white/20'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Immersive Content Panel */}
        <div className="immersive-panel relative min-h-[500px] w-full overflow-hidden bg-glass border border-white/5 rounded-[2px] p-6 md:p-12 flex flex-col lg:flex-row gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 z-0 pointer-events-none select-none"
            >
              <Image
                src={tabs[activeTab].image}
                alt={tabs[activeTab].title}
                fill
                className="object-cover opacity-15 filter blur-[3px]"
              />
              <div className="absolute inset-0 bg-[#050505]/80" />
            </motion.div>
          </AnimatePresence>

          {/* Left Block: Image */}
          <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] relative overflow-hidden rounded-[2px] border border-white/10 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-[#C9A440]/5 mix-blend-overlay z-10" />
                <Image
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-4 border border-[#C9A440]/15 z-20 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Block: Content & stats */}
          <div className="w-full lg:w-1/2 z-10 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-5"
              >
                <span className="text-[#C9A440] font-mono tracking-widest text-xs uppercase">
                  Featured Attraction
                </span>
                
                <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-[#F5F5F0]">
                  {tabs[activeTab].title}
                </h3>
                
                <p className="text-[#A8A8A0] font-light leading-relaxed text-sm">
                  {tabs[activeTab].desc}
                </p>

                {/* 3 Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/5">
                  <div className="flex flex-col gap-0.5 border-l border-[#C9A440]/30 pl-4">
                    <span className="text-xs uppercase font-bold tracking-[0.1em] text-[#C9A440]">
                      Scale
                    </span>
                    <span className="text-sm font-mono text-[#F5F5F0] tracking-tight">
                      {tabs[activeTab].stat1}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-l border-[#C9A440]/30 pl-4">
                    <span className="text-xs uppercase font-bold tracking-[0.1em] text-[#C9A440]">
                      Draw
                    </span>
                    <span className="text-sm font-mono text-[#F5F5F0] tracking-tight">
                      {tabs[activeTab].stat2}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-l border-[#C9A440]/30 pl-4">
                    <span className="text-xs uppercase font-bold tracking-[0.1em] text-[#C9A440]">
                      Format
                    </span>
                    <span className="text-sm font-mono text-[#F5F5F0] tracking-tight">
                      {tabs[activeTab].stat3}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
