import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className = '' }: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate blobs
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: {
          ease: 'sine.inOut',
          duration: 8,
        },
      });

      tl.to(blob1Ref.current, {
        x: 100,
        y: 50,
        scale: 1.2,
      })
        .to(
          blob2Ref.current,
          {
            x: -80,
            y: -60,
            scale: 0.9,
          },
          0
        )
        .to(
          blob3Ref.current,
          {
            x: 60,
            y: -40,
            scale: 1.1,
          },
          0
        );
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  // Pause animation when off-screen using ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: () => {
          // Animation will automatically pause when off-screen via ScrollTrigger
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Gradient blobs - CSS-based for performance */}
      <div
        ref={blob1Ref}
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)',
          top: '10%',
          left: '10%',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)',
          top: '50%',
          right: '10%',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <div
        ref={blob3Ref}
        className="absolute w-[450px] h-[450px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0) 70%)',
          bottom: '10%',
          left: '20%',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      {/* Subtle grid pattern overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
