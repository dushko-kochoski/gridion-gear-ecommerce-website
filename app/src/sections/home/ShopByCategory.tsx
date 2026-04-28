import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function ShopByCategory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cat-header', {
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.cat-card', {
        scale: 0.92, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.cat-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="gradient-dark py-[clamp(80px,12vh,160px)]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="cat-header text-center mb-12">
          <h2 className="font-archivo font-bold text-[clamp(28px,4vw,48px)] text-white tracking-[-0.02em]">
            FIND YOUR EDGE
          </h2>
          <p className="text-gray-400 mt-2">Explore our collections, built for every position.</p>
        </div>
        <div className="cat-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(cat => (
            <div key={cat.name} className="cat-card">
              <CategoryCard
                name={cat.name}
                image={cat.image}
                tagline={cat.tagline}
                className="aspect-[3/4] md:aspect-[16/10]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
