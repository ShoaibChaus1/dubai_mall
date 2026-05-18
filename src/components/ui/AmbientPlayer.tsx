'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/lib/store';

// AmbientPlayer — top-right pill with animated sound bars
// Matches Sleep Well Creatives' audio ambient pill exactly
export default function AmbientPlayer() {
  const { isPreloaderComplete, soundEnabled, setSoundEnabled } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    audioRef.current = new Audio('/audio/ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Start playing when preloader exits, if user previously clicked Sound On
  useEffect(() => {
    if (!audioRef.current) return;
    if (soundEnabled) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [soundEnabled]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (soundEnabled) {
      audioRef.current.pause();
      setSoundEnabled(false);
    } else {
      audioRef.current.play().catch(() => {});
      setSoundEnabled(true);
    }
  };

  if (!mounted || !isPreloaderComplete) return null;

  return (
    <button
      onClick={toggle}
      aria-label={soundEnabled ? 'Pause ambient audio' : 'Play ambient audio'}
      className="fixed top-6 right-6 z-[150] flex items-center gap-2.5 px-3.5 py-2 border border-[rgba(201,164,64,0.25)] bg-[rgba(8,8,8,0.7)] backdrop-blur-md hover:border-[#C9A440]/50 transition-all duration-300 cursor-pointer group"
      style={{ borderRadius: '2px' }}
    >
      {/* Animated Sound Bars */}
      <div className="flex items-end gap-[3px] h-[14px]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`sound-bar sound-bar-${i} ${!soundEnabled ? 'paused' : ''}`}
          />
        ))}
      </div>
      {/* Label */}
      <span
        className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#7A8099] group-hover:text-[#C9A440] transition-colors duration-300"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        {soundEnabled ? 'SOUND ON' : 'SOUND OFF'}
      </span>
    </button>
  );
}
