import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance animations
      gsap.from('.hero-overline', { opacity: 0, y: 20, duration: 0.5, delay: 0.8, ease: 'power3.out' });
      gsap.from('.hero-headline-line', {
        y: 110,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.9,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      });
      gsap.from('.hero-sub', { opacity: 0, y: 30, duration: 0.7, delay: 1.4, ease: 'power3.out' });
      gsap.from('.hero-buttons', { opacity: 0, y: 30, duration: 0.7, delay: 1.6, ease: 'power3.out' });
      gsap.from('.hero-stat', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, delay: 1.8, ease: 'power3.out' });
      gsap.from('.hero-scroll', { opacity: 0, duration: 0.5, delay: 2.2 });

      // Parallax on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: '60% top', end: 'bottom top', scrub: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/lookbook-hero-bg.jpg"
      >
        <source src="/videos/hero-football-action.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.3)] via-[rgba(10,10,10,0.5)] to-[rgba(10,10,10,0.85)]" />

      {/* Content */}
      <div ref={textRef} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-[800px] px-6 -mt-10">
          {/* Overline */}
          <p className="hero-overline text-xs text-white/80 tracking-[0.12em] uppercase mb-6">
            Premium Football Gear &mdash; Est. 2025
          </p>

          {/* Headline */}
          <div className="overflow-hidden">
            <h1 className="hero-headline-line font-archivo-black text-[clamp(48px,8vw,96px)] text-white uppercase leading-[0.92] tracking-[-0.03em]">
              ELEVATE YOUR
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-headline-line font-archivo-black text-[clamp(48px,8vw,96px)] uppercase leading-[0.92] tracking-[-0.03em] text-neon">
              GAME
            </h1>
          </div>

          {/* Subheadline */}
          <p className="hero-sub text-lg text-gray-400 max-w-[520px] mx-auto mt-6">
            Engineered for the gridiron. Built for those who refuse to settle.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/shop"
              className="px-8 py-3.5 rounded-3xl font-archivo font-bold text-sm text-void gradient-warm hover:shadow-[0_0_30px_rgba(57,255,20,0.25),0_0_30px_rgba(0,212,255,0.2)] hover:-translate-y-px transition-all duration-200"
            >
              SHOP NOW
            </Link>
            <Link
              to="/lookbook"
              className="px-8 py-3.5 rounded-3xl font-archivo font-bold text-sm text-white border border-[rgba(255,255,255,0.25)] hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-200"
            >
              VIEW LOOKBOOK
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mt-16">
            {[
              { value: '50K+', label: 'ATHLETES EQUIPPED' },
              { value: '12', label: 'PRO TEAMS TRUSTED' },
              { value: '4.9★', label: 'AVERAGE RATING' },
            ].map(stat => (
              <div key={stat.label} className="hero-stat text-center">
                <p className="font-archivo-black text-2xl md:text-4xl text-neon">{stat.value}</p>
                <p className="text-[10px] text-gray-400 tracking-[0.05em] uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-px h-10 bg-white/40 animate-bounce-down" />
        <span className="text-[10px] text-white/40 tracking-[0.15em] mt-2">SCROLL</span>
      </div>
    </section>
  );
}
