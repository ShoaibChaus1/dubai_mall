'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatCounterProps {
  value: number;
  suffix: string;
  decimals?: number;
}

export default function StatCounter({ value, suffix, decimals = 0 }: StatCounterProps) {
  const [displayVal, setDisplayVal] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const targetObj = { val: 0 };
    
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(targetObj, {
          val: value,
          duration: 2.0,
          ease: 'power3.out',
          onUpdate: () => {
            setDisplayVal(Number(targetObj.val.toFixed(decimals)));
          },
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [value, decimals]);

  return (
    <span ref={elementRef}>
      {displayVal}
      {suffix}
    </span>
  );
}
