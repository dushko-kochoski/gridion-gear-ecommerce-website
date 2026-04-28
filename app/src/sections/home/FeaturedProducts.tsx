import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = products.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fp-header', {
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.from('.fp-card', {
        scale: 0.92, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-grid', start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-void py-[clamp(80px,12vh,160px)]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="fp-header flex items-center justify-between mb-12">
          <h2 className="font-archivo font-bold text-[clamp(28px,4vw,48px)] text-white tracking-[-0.02em]">
            GEAR UP
          </h2>
          <Link
            to="/shop"
            className="font-archivo font-semibold text-sm text-neon hover:gap-2 transition-all flex items-center gap-1"
          >
            VIEW ALL <span className="text-lg">&rarr;</span>
          </Link>
        </div>
        <div className="fp-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <div key={product.id} className="fp-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
