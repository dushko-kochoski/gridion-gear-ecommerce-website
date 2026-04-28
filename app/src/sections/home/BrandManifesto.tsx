import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandManifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-line', {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.manifesto-sub', {
        opacity: 0, y: 30, duration: 0.7, delay: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-pitch py-[clamp(80px,12vh,160px)]">
      <div className="max-w-[900px] mx-auto px-5 md:px-10 text-center">
        <div className="font-archivo-black text-[clamp(32px,5.5vw,72px)] text-white uppercase italic leading-[1.1] tracking-[-0.02em]">
          <div className="manifesto-line overflow-hidden">
            <span>WE DON&apos;T MAKE GEAR</span>
          </div>
          <div className="manifesto-line overflow-hidden">
            <span>FOR CASUALS.</span>
          </div>
          <div className="manifesto-line overflow-hidden">
            <span>WE BUILD </span>
            <span className="text-neon animate-glow-pulse">WEAPONS</span>
          </div>
          <div className="manifesto-line overflow-hidden">
            <span>FOR THE </span>
            <span className="text-neon animate-glow-pulse">OBSESSED.</span>
          </div>
        </div>
        <p className="manifesto-sub text-lg text-gray-400 max-w-[560px] mx-auto mt-8">
          Every stitch, every grip pattern, every stud placement — engineered for players who live for the fourth quarter.
        </p>
      </div>
    </section>
  );
}
