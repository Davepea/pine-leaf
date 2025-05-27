'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Rotate the loading circle infinitely
    const spinnerTween = gsap.to(circleRef.current, {
      rotation: 360,
      transformOrigin: '50% 50%',
      repeat: -1,
      ease: 'linear',
      duration: 1,
    });

    // Slide the loader screen away after delay
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    tl.to(loaderRef.current, {
      y: '-100%',
      duration: 1,
      delay: 1.5,
      ease: 'power2.inOut',
    });

    return () => {
      spinnerTween.kill();
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fff3] text-[#2F5318] text-2xl font-bold"
    >
      {/* Spinner using SVG and GSAP */}
      <svg
        ref={circleRef}
        className="mb-4"
        width="40"
        height="40"
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#2F5318"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset="75"
        />
      </svg>
    
    </div>
  );
}
