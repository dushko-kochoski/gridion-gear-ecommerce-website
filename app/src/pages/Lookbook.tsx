import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Lookbook() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      gsap.from('.lb-hero-text > *', { opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.5 });
      gsap.from('.lb-hero-cue', { opacity: 0, duration: 0.5, delay: 1.5 });

      // Grid images
      gsap.utils.toArray<HTMLElement>('.lb-grid-img').forEach((el, i) => {
        gsap.from(el, {
          scale: 0.92, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          delay: (i % 3) * 0.12,
        });
      });

      // Full bleed parallax
      const fullBleed = document.querySelector('.lb-fullbleed-img');
      if (fullBleed) {
        gsap.to(fullBleed, {
          y: -60, ease: 'none',
          scrollTrigger: { trigger: '.lb-fullbleed', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const grid1Images = [
    { src: '/images/lookbook-huddle.jpg', caption: 'THE HUDDLE', sub: 'Where games are won before the whistle', aspect: 'aspect-video' },
    { src: '/images/lookbook-preparation.jpg', caption: 'THE PREPARATION', sub: 'Every rep counts', aspect: 'aspect-[3/4]' },
    { src: '/images/lookbook-gear-closeup.jpg', caption: 'THE GEAR', sub: 'Engineered for the obsessed', aspect: 'aspect-[3/4]' },
    { src: '/images/lookbook-the-catch.jpg', caption: 'THE CATCH', sub: 'Hands that refuse to drop', aspect: 'aspect-video' },
  ];

  const grid2Images = [
    { src: '/images/lookbook-the-cleats.jpg', caption: 'THE CLEATS', sub: 'Leave your mark' },
    { src: '/images/lookbook-the-wrist.jpg', caption: 'THE WRIST', sub: 'Every signal, every play' },
    { src: '/images/lookbook-the-protection.jpg', caption: 'THE PROTECTION', sub: 'Armor for battle' },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-void">
      {/* Hero */}
      <section className="relative w-full h-screen overflow-hidden">
        <img
          src="/images/lookbook-hero-bg.jpg"
          alt="Lookbook"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-[zoomIn_8s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.4)] to-[rgba(10,10,10,0.7)]" />
        <div className="lb-hero-text absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs text-neon tracking-[0.15em] uppercase mb-5">SS25 COLLECTION</p>
          <h1 className="font-archivo-black text-[clamp(48px,8vw,96px)] text-white uppercase tracking-[-0.03em] max-w-[900px]">
            BUILT FOR THE MOMENT
          </h1>
          <p className="text-lg text-gray-400 max-w-[500px] mt-6">
            A visual story of athletes, obsession, and the gear that carries them through.
          </p>
        </div>
        <div className="lb-hero-cue absolute bottom-10 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-6 h-6 text-white/50 animate-scroll-cue" />
        </div>
      </section>

      {/* Editorial Grid Part 1 */}
      <section className="py-[clamp(80px,12vh,160px)] px-5 md:px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Row 1 */}
            <div className="md:col-span-3 lb-grid-img relative rounded-lg overflow-hidden aspect-video group">
              <img src={grid1Images[0].src} alt={grid1Images[0].caption} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-archivo font-bold text-lg text-white">{grid1Images[0].caption}</h3>
                <p className="text-sm text-gray-400">{grid1Images[0].sub}</p>
              </div>
            </div>
            <div className="md:col-span-2 lb-grid-img relative rounded-lg overflow-hidden aspect-[3/4] md:aspect-auto group">
              <img src={grid1Images[1].src} alt={grid1Images[1].caption} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-archivo font-bold text-lg text-white">{grid1Images[1].caption}</h3>
                <p className="text-sm text-gray-400">{grid1Images[1].sub}</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="md:col-span-2 lb-grid-img relative rounded-lg overflow-hidden aspect-[3/4] md:aspect-auto group">
              <img src={grid1Images[2].src} alt={grid1Images[2].caption} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-archivo font-bold text-lg text-white">{grid1Images[2].caption}</h3>
                <p className="text-sm text-gray-400">{grid1Images[2].sub}</p>
              </div>
            </div>
            <div className="md:col-span-3 lb-grid-img relative rounded-lg overflow-hidden aspect-video group">
              <img src={grid1Images[3].src} alt={grid1Images[3].caption} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-archivo font-bold text-lg text-white">{grid1Images[3].caption}</h3>
                <p className="text-sm text-gray-400">{grid1Images[3].sub}</p>
              </div>
            </div>

            {/* Row 3 - Three squares */}
            {[
              { src: '/images/lookbook-the-grind.jpg', caption: 'THE GRIND', sub: 'Off-season is a myth' },
              { src: '/images/lookbook-the-field.jpg', caption: 'THE FIELD', sub: 'Home turf advantage' },
              { src: '/images/lookbook-the-team.jpg', caption: 'THE TEAM', sub: 'Brotherhood over everything' },
            ].map((img, i) => (
              <div key={i} className={`lb-grid-img relative rounded-lg overflow-hidden aspect-square group ${i === 0 ? 'md:col-span-1' : 'md:col-span-1'}`}>
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-archivo font-bold text-sm text-white">{img.caption}</h3>
                  <p className="text-xs text-gray-400">{img.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Bleed Feature */}
      <section className="lb-fullbleed relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
        <img
          src="/images/lookbook-feature-fullbleed.jpg"
          alt="The Moment Before"
          className="lb-fullbleed-img absolute inset-0 w-full h-[120%] object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-12 left-5 md:left-10 lg:left-20">
          <h3 className="font-archivo-black text-[clamp(28px,4vw,48px)] text-white uppercase">
            THE MOMENT BEFORE
          </h3>
          <p className="text-base text-gray-400 mt-1">Everything stops. Everything matters.</p>
        </div>
      </section>

      {/* Editorial Grid Part 2 */}
      <section className="py-[clamp(80px,12vh,160px)] px-5 md:px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          {/* Row 1 - Three squares */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {grid2Images.map((img, i) => (
              <div key={i} className="lb-grid-img relative rounded-lg overflow-hidden aspect-square group">
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-archivo font-bold text-sm text-white">{img.caption}</h3>
                  <p className="text-xs text-gray-400">{img.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - Tall left, wide right */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-2 lb-grid-img relative rounded-lg overflow-hidden aspect-[3/4] md:aspect-auto group">
              <img src="/images/lookbook-the-road.jpg" alt="The Road" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-archivo font-bold text-lg text-white">THE ROAD</h3>
                <p className="text-sm text-gray-400">The journey is the destination</p>
              </div>
            </div>
            <div className="md:col-span-3 lb-grid-img relative rounded-lg overflow-hidden aspect-video group">
              <img src="/images/lookbook-the-victory.jpg" alt="The Victory" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-archivo font-bold text-lg text-white">THE VICTORY</h3>
                <p className="text-sm text-gray-400">Earned, never given</p>
              </div>
            </div>
          </div>

          {/* Row 3 - Full width panoramic */}
          <div className="lb-grid-img relative rounded-lg overflow-hidden aspect-video group">
            <img src="/images/lookbook-final-panoramic.jpg" alt="This is Gridiron" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="font-archivo-black text-[clamp(32px,5vw,72px)] text-white uppercase">
                THIS IS GRIDIRON
              </h3>
              <p className="text-gray-400 mt-2">GEAR THAT RAISES THE STAKES</p>
              <Link
                to="/shop"
                className="mt-6 px-8 py-3.5 rounded-3xl font-archivo font-bold text-sm text-void gradient-warm hover:shadow-[0_0_30px_rgba(57,255,20,0.25),0_0_30px_rgba(0,212,255,0.2)] hover:-translate-y-px transition-all"
              >
                SHOP THE COLLECTION &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook CTA Banner */}
      <section className="bg-pitch border-t border-[rgba(255,255,255,0.06)] py-16 px-5 md:px-10">
        <div className="max-w-[640px] mx-auto text-center">
          <div className="w-20 h-0.5 bg-neon mx-auto mb-8" />
          <h2 className="font-archivo font-bold text-[clamp(28px,4vw,48px)] text-white uppercase tracking-[-0.02em]">
            GEAR UP. SHOW OUT.
          </h2>
          <p className="text-gray-400 mt-3">Shop the full collection and find your edge.</p>
          <Link
            to="/shop"
            className="inline-block mt-6 px-8 py-3.5 rounded-3xl font-archivo font-bold text-sm text-void gradient-warm hover:shadow-[0_0_30px_rgba(57,255,20,0.25),0_0_30px_rgba(0,212,255,0.2)] hover:-translate-y-px transition-all"
          >
            SHOP ALL GEAR
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes zoomIn {
          from { transform: scale(1.05); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
