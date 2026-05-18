'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const luxuryBrands = [
  { name: 'Hermès', image: '/images/luxury.png', desc: 'The Peak of High Luxury Handcrafted Leather' },
  { name: 'Chanel', image: '/images/hero.png', desc: 'Double-Height Haute Couture Concept Salon' },
  { name: 'Louis Vuitton', image: '/images/sponsorship.png', desc: 'Middle East Flagship Destination Store' },
  { name: 'Cartier', image: '/images/luxury.png', desc: 'Middle East primary High Jewelry Showcase' },
  { name: 'Dior', image: '/images/hero.png', desc: 'Double-Height Custom Couture Palace' },
  { name: 'Saint Laurent', image: '/images/sponsorship.png', desc: 'Sleek French Minimalistic Maison' },
];

const luxuryStats = [
  { value: '200+', label: 'Luxury Boutiques' },
  { value: 'Dedicated', label: 'Valet & Entrance' },
  { value: 'VIP', label: 'Shopping Suite' },
  { value: 'Prestige', label: 'Brand Adjacency' },
];

export default function Luxury() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const letterSpacingHeadlineRef = useRef<HTMLHeadingElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !carouselRef.current) return;

    const ctx = gsap.context(() => {
      // Spotlight mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const rect = containerRef.current!.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      };
      const container = containerRef.current!;
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovering(true));
      container.addEventListener('mouseleave', () => setIsHovering(false));

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
              end: 'center center',
              scrub: 1
            },
          }
        );
      }

      // Camera flash on section entry
      if (flashRef.current) {
        gsap.fromTo(flashRef.current,
          { opacity: 0 },
          {
            opacity: 0,
            duration: 0.4,
            keyframes: { opacity: [0, 0.18, 0] },
            ease: 'none',
            scrollTrigger: { trigger: containerRef.current, start: 'top 60%', once: true },
          }
        );
      }

      // Headline letter-spacing expansion on scroll
      const heading = letterSpacingHeadlineRef.current;
      if (heading) {
        gsap.fromTo(heading,
          { letterSpacing: '-0.05em', opacity: 0 },
          {
            letterSpacing: '0.12em', opacity: 1,
            ease: 'none',
            scrollTrigger: { 
              trigger: containerRef.current, 
              start: 'top 50%',
              end: 'top 0%',
              scrub: 1 
            },
          }
        );
      }

      // Horizontal pinned scroll for carousel — same pattern as Retail
      const track = carouselRef.current;
      if (track) {
        const totalScroll = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            pin: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });
      }

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="luxury"
      ref={containerRef}
      className="relative w-full bg-[#050505]"
      style={{ borderTop: '1px solid rgba(201,164,64,0.1)' }}
    >
      {/* Camera flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ background: 'rgba(240,237,232,0.15)', opacity: 0 }}
      />

      {/* Section watermark */}
      <span
        ref={watermarkRef}
        className="section-watermark"
        style={{ top: '10%', left: '40px', opacity: 0, letterSpacing: '0.15em' }}
      >
        04
      </span>

      {/* Luxury Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(201, 164, 64, 0.05), transparent 45%)`,
        }}
      />

      {/* Sticky viewport for horizontal scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div ref={carouselRef} className="flex items-center gap-12 px-[8vw] absolute h-full">
          
          {/* Title Slide (first panel) */}
          <div className="w-[80vw] md:w-[50vw] flex-shrink-0 flex flex-col gap-6 justify-center">
            <span className="text-[10px] tracking-[0.3em] text-[#C9A440] uppercase font-bold mb-4 block">
              CHAPTER 03 / FASHION AVENUE
            </span>
            <h2
              ref={letterSpacingHeadlineRef}
              className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-[#F5F5F0] uppercase"
            >
              WHERE THE ELITE CONGREGATE.
            </h2>
            <p className="text-[#A8A8A0] font-light leading-relaxed mt-2 max-w-xl">
              Fashion Avenue represents the absolute highest density of luxury retail on earth. Home to over 200 double-height boutiques, private personal shopping salons, and exclusive dedicated VIP arrival suites.
            </p>

            {/* Luxury Stat Strip — inline with title slide */}
            <div className="grid grid-cols-2 gap-6 border-t border-b border-white/5 py-6 mt-4 max-w-lg">
              {luxuryStats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-2xl md:text-3xl font-serif font-bold text-[#C9A440]">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A8A8A0]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Cards */}
          {luxuryBrands.map((brand, index) => (
            <div
              key={index}
              className="flex-none w-[320px] md:w-[450px] bg-glass border border-white/5 p-5 rounded-[2px] hover:border-[#C9A440]/30 transition-all duration-500 flex flex-col gap-5 group relative overflow-hidden"
            >
              <div className="relative h-[450px] w-full overflow-hidden">
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-[#C9A440]/10 mix-blend-overlay z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-500" />
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-4 border border-[#C9A440]/15 z-20 pointer-events-none" />
              </div>
              <div>
                <h4 className="font-serif text-3xl font-semibold text-[#F5F5F0] tracking-wide mb-1">
                  {brand.name}
                </h4>
                <p className="text-[11px] text-[#A8A8A0] font-light tracking-widest uppercase">
                  {brand.desc}
                </p>
              </div>
            </div>
          ))}

          {/* End Padding */}
          <div className="w-[15vw] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
