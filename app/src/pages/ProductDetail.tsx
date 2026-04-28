import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useStore } from '@/store/useStore';
import StarRating from '@/components/StarRating';
import ProductCard from '@/components/ProductCard';
import { Truck, RotateCcw, Shield, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const addToCart = useStore(s => s.addToCart);
  const toggleWishlist = useStore(s => s.toggleWishlist);
  const isInWishlist = useStore(s => isInWishlistFn(s.wishlist, product?.id || ''));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedImage(0);
    setSelectedColor(0);
    setSelectedSize(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pd-info > *', { opacity: 0, y: 30, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.2 });
    }, sectionRef);
    return () => ctx.revert();
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl text-white font-archivo font-bold">Product Not Found</h1>
          <Link to="/shop" className="text-neon mt-4 inline-block hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const color = product.colors[selectedColor];
  const size = product.sizes[selectedSize];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: color?.name || 'Default',
      size: size || 'One Size',
    });
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-void pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
          <Link to="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white transition-colors">SHOP</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-white transition-colors uppercase">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-400 uppercase">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery */}
          <div className="lg:w-[55%]">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-pitch">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-neon' : 'border-[rgba(255,255,255,0.1)] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-[45%] pd-info">
            <h1 className="font-archivo font-bold text-[clamp(28px,4vw,48px)] text-white tracking-[-0.02em]">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={product.rating} />
              <span className="font-archivo font-bold text-base text-white">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <span className="font-archivo font-bold text-2xl text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="font-archivo text-lg text-gray-600 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice && (
                <span className="font-archivo text-sm text-neon">SALE</span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-6 leading-relaxed">{product.description}</p>

            {/* Color Selector */}
            <div className="mt-8">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white tracking-[0.05em] uppercase">Color:</span>
                <span className="text-sm text-neon">{color?.name?.toUpperCase()}</span>
              </div>
              <div className="flex gap-2.5 mt-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === i ? 'border-neon ring-1 ring-neon' : 'border-[rgba(255,255,255,0.15)]'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white tracking-[0.05em] uppercase">Size:</span>
                </div>
                <button onClick={() => setShowSizeGuide(true)} className="text-sm text-neon hover:underline">
                  SIZE GUIDE &rarr;
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(i)}
                    className={`px-5 py-2.5 rounded-lg font-archivo font-semibold text-sm transition-all ${
                      selectedSize === i
                        ? 'bg-white text-void'
                        : 'bg-pitch text-white border border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <span className="text-xs text-white tracking-[0.05em] uppercase">QTY:</span>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center border border-[rgba(255,255,255,0.15)] rounded-l text-white hover:border-neon"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="w-11 h-11 flex items-center justify-center border-t border-b border-[rgba(255,255,255,0.15)] font-archivo font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-11 h-11 flex items-center justify-center border border-[rgba(255,255,255,0.15)] rounded-r text-white hover:border-neon"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              {quantity >= 5 && <p className="text-[10px] text-gray-600 mt-1.5">Max 5 per order</p>}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full mt-8 py-4.5 rounded-3xl font-archivo font-bold text-sm text-void gradient-warm hover:shadow-[0_0_30px_rgba(57,255,20,0.25),0_0_30px_rgba(0,212,255,0.2)] hover:-translate-y-px active:translate-y-0 transition-all duration-200"
            >
              ADD TO CART
            </button>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-full mt-3 py-3.5 rounded-3xl font-archivo font-bold text-sm text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors flex items-center justify-center gap-2"
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-magenta text-magenta' : ''}`} />
              {isInWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
            </button>

            {/* Meta */}
            <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)] space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Truck className="w-4 h-4 text-neon" />
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <RotateCcw className="w-4 h-4 text-neon" />
                <span>30-day hassle-free returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-neon" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-20 max-w-[900px] mx-auto">
          <div className="flex border-b border-[rgba(255,255,255,0.1)]">
            {(['description', 'specs', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-archivo font-semibold text-sm uppercase tracking-[0.04em] transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-white border-neon'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                {tab === 'reviews' ? `REVIEWS (${product.reviewCount})` : tab}
              </button>
            ))}
          </div>

          <div className="py-8 transition-opacity duration-250">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-400 leading-relaxed">{product.description}</p>
                <ul className="mt-6 space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-neon rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'specs' && (
              <div className="space-y-0">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex py-3.5 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="w-1/3 text-sm text-white">{key}</span>
                    <span className="w-2/3 text-sm text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                {/* Review Summary */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[rgba(255,255,255,0.06)] mb-6">
                  <div className="flex items-center gap-4">
                    <span className="font-archivo-black text-5xl text-white">{product.rating}</span>
                    <div>
                      <StarRating rating={product.rating} size={16} />
                      <p className="text-sm text-white mt-1">{product.reviewCount} reviews</p>
                    </div>
                  </div>
                  <button className="mt-4 sm:mt-0 px-5 py-2.5 border border-[rgba(255,255,255,0.25)] rounded-3xl font-archivo font-bold text-xs text-white hover:border-white transition-colors">
                    WRITE A REVIEW
                  </button>
                </div>
                {/* Reviews */}
                <div className="space-y-6">
                  {product.reviews.map((review, i) => (
                    <div key={i} className="pb-6 border-b border-[rgba(255,255,255,0.06)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-archivo font-semibold text-sm text-white">{review.name}</span>
                        {review.verified && <span className="text-[10px] text-neon">&#10003; Verified Purchase</span>}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={review.rating} size={12} />
                        <span className="text-xs text-gray-600">{review.date}</span>
                      </div>
                      <h4 className="font-archivo font-semibold text-base text-white">{review.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{review.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-archivo font-bold text-[clamp(28px,4vw,48px)] text-white tracking-[-0.02em] mb-10">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center" onClick={() => setShowSizeGuide(false)}>
          <div className="absolute inset-0 bg-black/75 backdrop-blur-lg" />
          <div
            className="relative bg-pitch rounded-2xl shadow-dropdown max-w-[640px] w-full mx-4 p-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-archivo font-bold text-2xl text-white">SIZE GUIDE</h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-10 h-10 rounded-full bg-pitch border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white hover:border-neon"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[rgba(57,255,20,0.08)]">
                  {['SIZE', 'PALM WIDTH (IN)', 'PALM WIDTH (CM)', 'HAND LENGTH (IN)'].map(h => (
                    <th key={h} className="text-left px-3 py-3 font-archivo font-semibold text-xs text-white uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['S', '3.0-3.25"', '7.6-8.3cm', '6.5-6.75"'],
                  ['M', '3.25-3.5"', '8.3-8.9cm', '6.75-7.0"'],
                  ['L', '3.5-3.75"', '8.9-9.5cm', '7.0-7.25"'],
                  ['XL', '3.75-4.0"', '9.5-10.2cm', '7.25-7.5"'],
                  ['XXL', '4.0-4.5"', '10.2-11.4cm', '7.5-8.0"'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[rgba(255,255,255,0.02)]' : ''}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-3 py-3 text-sm text-gray-400 border-b border-[rgba(255,255,255,0.06)]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6">
              <p className="font-archivo font-semibold text-sm text-white">How to measure:</p>
              <p className="text-sm text-gray-400 mt-1">
                Wrap a tape measure around the widest part of your palm, just below the knuckles.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function isInWishlistFn(wishlist: string[], productId: string) {
  return wishlist.includes(productId);
}
