'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '@/lib/store';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';

export default function IntroVideo() {
  const { isPreloaderComplete, isIntroVideoComplete, setIntroVideoComplete } = useStore();
  const [isMuted, setIsMuted] = useState(false); // Play with sound by default as requested
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isExiting = useRef(false);

  useEffect(() => {
    // Only start if preloader is done and video hasn't completed
    if (isPreloaderComplete && !isIntroVideoComplete) {
      // Small delay to let preloader curtain rise before fading in controls/video
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch((e) => {
            console.log('Autoplay prevented by browser, muting to allow play', e);
            setIsMuted(true);
            videoRef.current?.play();
          });
        }
        setShowControls(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPreloaderComplete, isIntroVideoComplete]);

  const handleComplete = () => {
    if (isExiting.current) return;
    isExiting.current = true;
    setShowControls(false);

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        setIntroVideoComplete(true);
      }
    });
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isPreloaderComplete || isIntroVideoComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[500] bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        className="absolute w-full h-full object-cover"
        playsInline
        muted={isMuted}
        onEnded={handleComplete}
      />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />

      {/* Controls Overlay */}
      <div 
        className="absolute bottom-8 right-8 flex items-center gap-4 transition-opacity duration-500"
        style={{ opacity: showControls ? 1 : 0 }}
      >
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[#C9A440] hover:bg-black/60 hover:scale-105 transition-all duration-300"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button
          onClick={handleComplete}
          className="flex items-center gap-2 px-4 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[#F0EDE8] hover:bg-black/60 hover:border-[#C9A440]/50 transition-all duration-300 group"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Skip</span>
          <SkipForward size={14} className="text-[#C9A440] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
