'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sponsorsData } from '@/data/sponsors';
import MarqueeStrip from '../ui/MarqueeStrip';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const eventsMarqueeItems = [
  'BRAND ACTIVATIONS', 'LIVE EVENTS', 'CORPORATE SUMMITS', 'GRAND ATRIUM',
  '3,500 M² EVENT SPACE', 'FOUNTAIN STAGE', 'FASHION WEEK', 'VIP GALAS',
  'PRODUCT LAUNCHES', 'GLOBAL SPECTACLE', 'CULTURAL FESTIVALS',
];

const eventTypes = [
  {
    id: 'activations',
    type: 'Brand Activations',
    venue: 'Grand Atrium (3,500 m²)',
    desc: 'Towering retail pop-ups, luxury launches, and high-impact physical installations situated in the most visible public atriums.',
    examples: ['Global product launches', 'Seasonal brand takeovers', 'Luxury fashion pop-ups', 'Interactive digital installations'],
  },
  {
    id: 'live',
    type: 'Live Events',
    venue: 'Fountain Stage & Promenade',
    desc: 'Unmatched waterfront concerts, celebrity hostings, cultural festivals, and broadcast runways under the shadow of Burj Khalifa.',
    examples: ['Global artist concerts', 'Haute Couture outdoor runways', 'International award summits', 'Cultural holiday spectaculars'],
  },
  {
    id: 'corporate',
    type: 'Corporate & summits',
    venue: 'Executive Convention Halls',
    desc: 'High-end corporate keynotes, strategic summits, private brand briefings, and networking galas in the world\'s business hub.',
    examples: ['Prestige business summits', 'Automotive brand reveals', 'VIP strategic briefings', 'Private high-net-worth banquets'],
  },
];

export default function Events() {
  const [activeSimulatorId, setActiveSimulatorId] = useState(sponsorsData[0].id);
  const [activeModal, setActiveModal] = useState<typeof eventTypes[0] | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

  const activeSponsor = sponsorsData.find(s => s.id === activeSimulatorId) || sponsorsData[0];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Section watermark focus-in scrub
      if (watermarkRef.current) {
        gsap.fromTo(watermarkRef.current,
          { scale: 4, filter: 'blur(20px)', opacity: 0 },
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

      // 3D Card flip-in entrance on scroll scrub
      const cards = cardsRef.current?.querySelectorAll('.flip-card-wrapper');
      if (cards) {
        gsap.fromTo(cards,
          { rotationY: 90, opacity: 0, y: 100, scale: 0.8 },
          {
            rotationY: 0, opacity: 1, y: 0, scale: 1,
            stagger: 0.1, ease: 'none',
            scrollTrigger: { 
              trigger: cardsRef.current, 
              start: 'top 95%',
              end: 'center 60%',
              scrub: 1 
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative min-h-screen w-full py-28 md:py-36 overflow-hidden"
      style={{ background: '#080808', borderTop: '1px solid rgba(201,164,64,0.1)' }}
    >
      {/* Section watermark */}
      <span
        ref={watermarkRef}
        className="section-watermark"
        style={{ top: '8%', right: '40px', opacity: 0 }}
      >
        07
      </span>
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col gap-24">
        
        {/* Core Header */}
        <div className="max-w-3xl">
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#C9A440',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'block',
              marginBottom: '16px',
            }}
          >
            CHAPTER 06 / GLOBAL BRAND PLATFORM
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-[#F5F5F0]">
            THE STAGE FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A440] to-[#E8C96A]">WORLD-CLASS SPECTACLE.</span>
          </h2>
          <p className="text-[#A8A8A0] font-light leading-relaxed mt-6">
            We don't host events; we provide the default regional launchpad. The Dubai Mall offers brands a massive, multi-dimensional physical stage that turns campaigns into cultural moments.
          </p>
        </div>

        {/* Marquee strip after header */}
        <MarqueeStrip items={eventsMarqueeItems} direction="left" speed={36} />

        {/* 3D Flip Card Deck Row */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-[1000px]">
          {eventTypes.map((event) => (
            <div
              key={event.id}
              className="flip-card-wrapper h-[350px] w-full cursor-pointer group"
              onClick={() => setActiveModal(event)}
            >
              <div className="relative w-full h-full bg-glass border border-white/5 p-8 rounded-[2px] hover:border-[#C9A440]/40 transition-all duration-500 flex flex-col justify-between overflow-hidden">
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A440]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A440]/80 block mb-4">
                    VENUE FORMAT
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#F5F5F0] tracking-wide mb-2">
                    {event.type}
                  </h3>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A440] mb-4">
                    {event.venue}
                  </h4>
                </div>

                <p className="text-xs text-[#D1D5DB] font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                  {event.desc}
                </p>

                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A440]">
                  <span>Explore Capabilities</span>
                  <span className="translate-x-0 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Capabilities Details Modal */}
        <AnimatePresence>
          {activeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="bg-[#0c0c0c] border border-[#C9A440]/30 max-w-2xl w-full p-8 md:p-10 rounded-[2px] relative flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors duration-300 font-mono text-sm uppercase tracking-widest cursor-pointer"
                >
                  [Close]
                </button>

                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#C9A440] font-bold uppercase mb-2 block">
                    {activeModal.venue}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide">
                    {activeModal.type}
                  </h3>
                </div>

                <p className="text-sm text-[#A8A8A0] font-light leading-relaxed">
                  {activeModal.desc}
                </p>

                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A440] mb-4">
                    Activation & Campaign Models
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeModal.examples.map((ex, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs text-[#F5F5F0]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A440]" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-6 border-t border-white/5">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-4 bg-gradient-to-r from-[#C9A440] to-[#E8C96A] text-black font-bold uppercase tracking-widest text-xs rounded-[1px] hover:brightness-110 transition-all cursor-pointer"
                  >
                    Request Platform Kit
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Activation Simulator [Live] */}
        <div className="border border-white/5 bg-glass p-8 md:p-12 rounded-[2px] flex flex-col gap-12 relative overflow-hidden mt-12">
          {/* Subtle tech background */}
          <div className="absolute inset-0 z-0 opacity-10">
            <Image
              src={activeSponsor.image}
              alt="Background overlay"
              fill
              className="object-cover filter blur-[2px]"
            />
            <div className="absolute inset-0 bg-[#080808]" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-8 border-b border-white/5 pb-8">
            <div className="max-w-xl">
              <span className="text-[9px] tracking-[0.25em] text-red-500 font-bold uppercase flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                Live Activation Simulator
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white tracking-wide">
                Simulate Brand Impact Metrics
              </h3>
            </div>
            <p className="text-xs text-[#A8A8A0] font-light max-w-sm">
              Select an activation format below to simulate estimated regional footprint circulation, recall performance, and metrics.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left selector */}
            <div className="lg:col-span-5 flex flex-col gap-3 w-full">
              {sponsorsData.map((sponsor) => (
                <button
                  key={sponsor.id}
                  onClick={() => setActiveSimulatorId(sponsor.id)}
                  className={`text-left p-5 border rounded-[1px] transition-all duration-300 cursor-pointer ${
                    activeSimulatorId === sponsor.id
                      ? 'border-[#C9A440] bg-[#C9A440]/10 text-white'
                      : 'border-white/5 hover:border-white/20 text-gray-400'
                  }`}
                >
                  <div className="text-base font-bold tracking-tight mb-1">{sponsor.name}</div>
                  <div className="text-[10px] text-gray-400 font-light leading-relaxed">{sponsor.description}</div>
                </button>
              ))}
            </div>

            {/* Right dynamic results */}
            <div className="lg:col-span-7 bg-black/60 backdrop-blur-md border border-white/5 p-6 md:p-8 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C9A440]/60 uppercase block mb-4">
                  Simulated Circulation Forecast
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSimulatorId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter text-[#C9A440] mb-2">
                      {activeSponsor.reach}
                    </h3>
                    <p className="text-xs text-[#A8A8A0] font-light leading-relaxed uppercase tracking-widest mb-6">
                      Estimated Campaign Viewership
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                      <div>
                        <span className="text-2xl font-mono font-bold text-white block mb-0.5">94%</span>
                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#A8A8A0]">
                          Avg Brand Recall
                        </span>
                      </div>
                      <div>
                        <span className="text-2xl font-mono font-bold text-white block mb-0.5">2.4 Hours</span>
                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#A8A8A0]">
                          Avg Session Dwell
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 w-full py-4.5 bg-white hover:bg-[#C9A440] text-black font-bold uppercase tracking-widest text-xs rounded-[1px] transition-all cursor-pointer"
              >
                Inquire Sponsorship Package
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
