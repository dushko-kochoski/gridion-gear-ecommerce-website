import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LookbookPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lb-header', { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.lb-main', { opacity: 0, x: -60, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.lb-grid', start: 'top 85%' },
      });
      gsap.from('.lb-small', { scale: 0.92, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.lb-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-void py-[clamp(80px,12vh,160px)]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="lb-header flex items-center justify-between mb-12">
          <h2 className="font-archivo font-bold text-[clamp(28px,4vw,48px)] text-white tracking-[-0.02em]">
            THE LOOKBOOK
          </h2>
          <Link to="/lookbook" className="font-archivo font-semibold text-sm text-neon flex items-center gap-1 hover:gap-2 transition-all">
            VIEW FULL LOOKBOOK <span className="text-lg">&rarr;</span>
          </Link>
        </div>

        <div className="lb-grid grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Main large image */}
          <div className="lg:col-span-3 lb-main relative rounded-lg overflow-hidden aspect-[4/5] lg:aspect-auto">
            <img
              src="/images/lookbook-hero.jpg"
              alt="Lookbook"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent">
              <p className="text-xs text-neon tracking-[0.1em] uppercase">SS25 Collection</p>
              <h3 className="font-archivo font-bold text-2xl lg:text-3xl text-white mt-1">BUILT FOR THE MOMENT</h3>
              <p className="text-sm text-gray-400 mt-1">Discover the latest drops.</p>
            </div>
          </div>

          {/* Small grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[
              '/images/lookbook-grid-1.jpg',
              '/images/lookbook-grid-2.jpg',
              '/images/lookbook-grid-3.jpg',
              '/images/lookbook-grid-4.jpg',
            ].map((src, i) => (
              <div key={i} className="lb-small relative rounded-lg overflow-hidden aspect-square group">
                <img src={src} alt={`Lookbook ${i + 1}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-400" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
