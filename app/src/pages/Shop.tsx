import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Truck, ArrowRight } from 'lucide-react';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const allCategories = ['Gloves', 'Cleats', 'Arm Sleeves', 'Mouthguards', 'Training', 'Accessories'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    const min = parseFloat(priceRange.min);
    const max = parseFloat(priceRange.max);
    if (!isNaN(min)) result = result.filter(p => p.price >= min);
    if (!isNaN(max)) result = result.filter(p => p.price <= max);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0)); break;
      case 'bestselling': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return result;
  }, [selectedCategories, priceRange, sortBy]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const hasFilters = selectedCategories.length > 0 || priceRange.min || priceRange.max;

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
  };

  return (
    <div className="min-h-screen bg-void pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
        {/* Shop Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span>SHOP</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-archivo-black text-[clamp(36px,6vw,72px)] text-white tracking-[-0.02em]">
                ALL GEAR
              </h1>
              <p className="text-sm text-gray-400 mt-1">{filteredProducts.length} products</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-pitch border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-sm text-white focus:border-[rgba(255,255,255,0.2)] focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bestselling">Bestselling</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-[240px] flex-shrink-0">
            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-xs text-white tracking-[0.05em] uppercase mb-3">Category</h4>
              <div className="space-y-2.5">
                {allCategories.map(cat => {
                  const count = products.filter(p => p.category === cat).length;
                  return (
                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                          selectedCategories.includes(cat)
                            ? 'bg-neon border-neon'
                            : 'border-[rgba(255,255,255,0.2)] group-hover:border-white/40'
                        }`}
                        onClick={() => toggleCategory(cat)}
                      >
                        {selectedCategories.includes(cat) && (
                          <svg className="w-2.5 h-2.5 text-void" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${selectedCategories.includes(cat) ? 'text-white' : 'text-gray-400'}`}>
                        {cat} <span className="text-gray-600">({count})</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="text-xs text-white tracking-[0.05em] uppercase mb-3">Price</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={e => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-full bg-pitch border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(255,255,255,0.2)]"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={e => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-full bg-pitch border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[rgba(255,255,255,0.2)]"
                />
              </div>
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="w-full py-2.5 text-sm font-archivo font-bold text-white hover:bg-[rgba(255,255,255,0.06)] rounded-lg transition-colors"
              >
                CLEAR ALL
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No products match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-neon font-archivo font-semibold hover:underline">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="mt-20 bg-pitch border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          <Truck className="w-8 h-8 text-neon flex-shrink-0" />
          <div className="text-center sm:text-left">
            <p className="font-archivo font-bold text-base text-white uppercase tracking-wide">
              FREE SHIPPING ON ORDERS OVER $75
            </p>
            <p className="text-sm text-gray-400 mt-0.5">
              Use code <span className="bg-[rgba(57,255,20,0.1)] text-neon px-2 py-0.5 rounded text-xs font-archivo font-semibold">GRIDIRON25</span> for 25% off your first order.
            </p>
          </div>
          <Link to="/shop" className="font-archivo font-semibold text-sm text-neon flex items-center gap-1 hover:gap-2 transition-all flex-shrink-0">
            SHOP BESTSELLERS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
