import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  image: string;
  tagline: string;
  className?: string;
}

export default function CategoryCard({ name, image, tagline, className = '' }: CategoryCardProps) {
  return (
    <Link to="/shop" className={`group relative block overflow-hidden rounded-2xl ${className}`}>
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="font-archivo font-bold text-2xl text-white">{name}</h3>
        <p className="text-sm text-gray-400 mt-1">{tagline}</p>
        <span className="inline-flex items-center gap-1 mt-2 font-archivo font-semibold text-sm text-neon group-hover:gap-2 transition-all">
          SHOP NOW <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
