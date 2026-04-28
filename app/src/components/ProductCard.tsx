import { Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const addToCart = useStore(s => s.addToCart);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors[0]?.name || 'Default',
      size: product.sizes[0] || 'One Size',
    });
  };

  return (
    <Link to={`/product/${product.slug}`} className={`group block ${className}`}>
      <div className="relative aspect-square rounded-lg overflow-hidden bg-pitch shadow-card">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-archivo font-medium tracking-wider uppercase"
            style={{
              backgroundColor: product.badgeColor || '#39FF14',
              color: product.badgeColor === '#FF00A0' ? '#fff' : '#0A0A0A',
            }}
          >
            {product.badge}
          </span>
        )}
        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 bg-neon text-void font-archivo font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all"
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="text-[10px] text-gray-400 tracking-[0.05em] uppercase">{product.category}</p>
        <h3 className="font-archivo font-semibold text-sm text-white truncate mt-0.5">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-archivo font-bold text-sm text-white">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="font-archivo text-xs text-gray-600 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
          {product.originalPrice && (
            <span className="font-archivo text-xs text-neon">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
