'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NebulaOrb from '../ui/NebulaOrb';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tracks = [
  { id: 'leasing', name: 'Premium Retail Leasing', desc: 'Secure high-footfall flagship or luxury boutique spaces in the world\'s premium commercial address.' },
  { id: 'sponsorship', name: 'Experiential Sponsorship', desc: 'Acquire high-impact physical activations, large-scale media takeovers, and brand sponsorships.' },
  { id: 'booking', name: 'Private Event Bookings', desc: 'Reserve exclusive amphitheaters, waterfront terraces, or corporate conference facilities.' },
];

export default function Conversion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  
  const [selectedTrack, setSelectedTrack] = useState('leasing');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

      // Fade in form and tracks with scrub
      const form = formRef.current;
      if (form) {
        // Form container slide up
        gsap.fromTo(form,
          { opacity: 0, y: 150 },
          {
            opacity: 1, y: 0, ease: 'power3.out',
            scrollTrigger: { 
              trigger: containerRef.current, 
              start: 'top 70%',
              end: 'top 20%',
              scrub: 1 
            },
          }
        );

        // Staggered tracks entrance
        const trackCards = form.querySelectorAll('.inquiry-track');
        if (trackCards.length > 0) {
          gsap.fromTo(trackCards,
            { opacity: 0, y: 50, rotateX: 20 },
            {
              opacity: 1, y: 0, rotateX: 0,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: form,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1
              }
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative min-h-screen w-full py-28 md:py-36 overflow-hidden flex flex-col justify-between"
      style={{ background: '#050505', borderTop: '1px solid rgba(201,164,64,0.1)' }}
    >
      {/* Section watermark */}
      <span
        ref={watermarkRef}
        className="section-watermark"
        style={{ bottom: '-10px', left: '40px', opacity: 0 }}
      >
        08
      </span>

      {/* Nebula orb glow — gold, center */}
      <NebulaOrb
        size={1000}
        opacity={0.08}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Background radial gold glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,164,64,0.04), transparent 70%)' }}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex-1 flex flex-col justify-center gap-16">
        
        {/* Header */}
        <div className="max-w-3xl text-center md:text-left">
          <span className="text-[10px] tracking-[0.3em] text-[#C9A440] uppercase font-bold mb-4 block">
            CHAPTER 07 / CONNECT WITH EMAAR
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-[#F5F5F0]">
            SECURE YOUR PRESENCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A440] to-[#E8C96A]">IN DOWNTOWN DUBAI.</span>
          </h2>
          <p className="text-[#A8A8A0] font-light leading-relaxed mt-6">
            Inquire about our premium retail spaces, dynamic outdoor activation stages, and corporate sponsorship packages. Start the conversation with the Emaar Properties commercial team today.
          </p>
        </div>

        {/* Form Container */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full bg-glass border border-white/5 p-8 md:p-12 rounded-[2px] flex flex-col gap-10"
        >
          {/* Inquiry Track Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`inquiry-track p-6 border rounded-[1px] cursor-pointer transition-all duration-300 flex flex-col justify-between h-40 group relative overflow-hidden ${
                  selectedTrack === track.id
                    ? 'border-[#C9A440] bg-[#C9A440]/10 text-white'
                    : 'border-white/5 hover:border-white/20 text-gray-400'
                }`}
              >
                {/* Gold Glow Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A440]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  <h4 className={`text-base font-bold tracking-tight mb-2 ${selectedTrack === track.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {track.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {track.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A440]">
                  <span>{selectedTrack === track.id ? 'Selected' : 'Select Track'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Focused Form Fields */}
          <div className="border-t border-white/5 pt-10 flex flex-col gap-6">
            {!submitted ? (
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A440]">
                    Corporate Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-white/10 px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A440] transition-colors rounded-[1px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-[17px] bg-gradient-to-r from-[#C9A440] to-[#E8C96A] text-black font-bold uppercase tracking-widest text-xs rounded-[1px] hover:brightness-110 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
                >
                  Book Private Conversation
                </button>
              </div>
            ) : (
              <div className="bg-[#C9A440]/10 border border-[#C9A440]/30 p-6 text-center rounded-[1px]">
                <h4 className="text-lg font-serif font-bold text-white tracking-wide mb-2">
                  Thank You
                </h4>
                <p className="text-xs text-[#A8A8A0] font-light leading-relaxed">
                  Your request for the <b>{tracks.find(t => t.id === selectedTrack)?.name}</b> track has been registered. An Emaar representative will connect with you via <b>{email}</b> within 24 hours.
                </p>
              </div>
            )}
          </div>
        </form>

      </div>

      {/* Luxury Copyright Footer */}
      <footer className="max-w-7xl mx-auto w-full px-6 md:px-12 border-t border-white/5 py-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
        <span className="text-[9px] tracking-[0.25em] text-[#A8A8A0]/65 uppercase">
          © {new Date().getFullYear()} EMAAR PROPERTIES PJSC. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-6">
          <span className="text-[9px] tracking-[0.25em] text-[#A8A8A0]/65 hover:text-white transition-colors uppercase cursor-pointer">
            LEASING TERMS
          </span>
          <span className="text-[9px] tracking-[0.25em] text-[#A8A8A0]/65 hover:text-white transition-colors uppercase cursor-pointer">
            PRIVACY CHARTER
          </span>
        </div>
      </footer>
    </section>
  );
}
