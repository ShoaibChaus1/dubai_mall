'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const flagships = [
  {
    name: 'Apple Store',
    category: 'Technology Flagship',
    desc: 'Featuring an iconic 186-foot curved balcony overlooking the Dubai Fountain, this flagship is a marvel of architecture and community activation.',
    image: '/images/retail_apple_1779117781192.png',
  },
  {
    name: 'Hermès',
    category: 'High Luxury',
    desc: 'Prestige High Jewelry & Leather boutique featuring rich warm amber lighting, elegant glass displays, and premium wood textures.',
    image: '/images/retail_hermes_1779117805410.png',
  },
  {
    name: 'Louis Vuitton',
    category: 'Maison Flagship',
    desc: 'A modern luxury architecture marvel displaying iconic designer patterns and premium lighting in an immersive environment.',
    image: '/images/retail_louis_vuitton_1779117824095.png',
  },
  {
    name: 'Rolex',
    category: 'Haute Horlogerie',
    desc: 'The world\'s largest Rolex showroom with emerald green and gold accents, offering extreme luxury and glowing displays.',
    image: '/images/retail_rolex_1779117840183.png',
  },
  {
    name: 'Chanel',
    category: 'Couture Salon',
    desc: 'Black and white minimalist elegance meets double-height ceilings in this high fashion couture salon.',
    image: '/images/retail_chanel_1779117860137.png',
  },
];

export default function Retail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate total scroll distance for the horizontal track
      const trackWidth = trackRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      const scrollDistance = trackWidth - windowWidth;

      // Pinned Horizontal Scroll
      gsap.to(trackRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true,
        },
      });

      // Section watermark focus-in with scrub
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { scale: 2, filter: 'blur(20px)', opacity: 0 },
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

      // Headline parallax entrance with scrub
      if (headlineRef.current) {
        gsap.fromTo(headlineRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0,
            ease: 'none',
            scrollTrigger: { 
              trigger: containerRef.current, 
              start: 'top 80%',
              end: 'top 20%',
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
      id="retail"
      ref={containerRef}
      className="relative w-full bg-[#080808]"
      style={{ borderTop: '1px solid rgba(201,164,64,0.1)' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Section watermark */}
        <span
          ref={watermarkRef}
          className="section-watermark pointer-events-none"
          style={{ top: '8%', right: '40px', opacity: 0 }}
        >
          03
        </span>

        {/* Intro Text & Track Wrapper */}
        <div className="relative w-full h-full flex items-center">
          
          <div ref={trackRef} className="flex flex-row items-center gap-16 px-[10vw] absolute h-full">
            
            {/* Title Slide */}
            <div ref={headlineRef} className="w-[80vw] md:w-[50vw] flex-shrink-0 flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.3em] text-[#C9A440] uppercase font-bold block">
                CHAPTER 02 / RETAIL FOOTPRINT
              </span>
              <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-wide leading-[1.05] text-[#F5F5F0]">
                THE WORLD'S FIRST <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A440] to-[#E8C96A]">FLAGSHIP PLATFORM.</span>
              </h2>
              <p className="text-[#A8A8A0] text-lg font-light leading-relaxed max-w-xl">
                Securing a presence in The Dubai Mall is more than retail; it represents regional domination. Here, standard retail layouts transform into towering corporate architectural wonders.
              </p>
            </div>

            {/* Flagship Cards */}
            {flagships.map((store, i) => (
              <div key={i} className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 relative group">
                <div className="w-full h-full relative overflow-hidden rounded-[2px] border border-white/10">
                  <Image
                    src={store.image}
                    alt={store.name}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    priority={i < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent opacity-90" />
                  
                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] tracking-[0.25em] text-[#C9A440] font-bold uppercase block">
                      {store.category}
                    </span>
                    <h3 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-wide">
                      {store.name}
                    </h3>
                    <p className="text-sm md:text-base text-[#A8A8A0] font-light leading-relaxed max-w-2xl">
                      {store.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* End Padding */}
            <div className="w-[20vw] flex-shrink-0" />

          </div>
        </div>
      </div>
    </section>
  );
}
