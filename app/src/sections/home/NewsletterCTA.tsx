import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nl-headline', { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.nl-desc', { opacity: 0, y: 30, duration: 0.7, delay: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.nl-form', { opacity: 0, y: 30, duration: 0.7, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section ref={sectionRef} className="bg-void py-[clamp(80px,12vh,160px)]">
      <div className="border-t border-[rgba(57,255,20,0.2)] max-w-[640px] mx-auto px-5 md:px-10 pt-16">
        <div className="text-center">
          <h2 className="nl-headline font-archivo-black text-[clamp(36px,6vw,72px)] text-white tracking-[-0.02em]">
            JOIN THE SQUAD
          </h2>
          <div className="w-20 h-[3px] bg-neon mx-auto mt-4" />
          <p className="nl-desc text-gray-400 max-w-[480px] mx-auto mt-6">
            Get first access to limited drops, exclusive discounts, and training content from the pros. No spam — just heat.
          </p>

          {submitted ? (
            <div className="mt-10 p-4 bg-[rgba(57,255,20,0.1)] border border-neon/30 rounded-2xl">
              <p className="text-neon font-archivo font-semibold">You&apos;re in! Welcome to the squad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="nl-form flex flex-col sm:flex-row gap-3 mt-10 justify-center">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:w-80 bg-pitch border border-[rgba(255,255,255,0.12)] rounded-3xl px-6 py-3.5 text-sm text-white placeholder-gray-600 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon/20 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-3xl font-archivo font-bold text-sm text-void gradient-warm hover:shadow-[0_0_30px_rgba(57,255,20,0.25),0_0_30px_rgba(0,212,255,0.2)] hover:-translate-y-px transition-all duration-200 whitespace-nowrap"
              >
                SIGN UP
              </button>
            </form>
          )}

          <p className="nl-desc text-xs text-gray-600 mt-4">
            Join 50,000+ athletes. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
