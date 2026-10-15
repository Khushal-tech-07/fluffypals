import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ShoppingBag, Heart, Star, Sparkles, Check } from 'lucide-react';
import { PRODUCTS, Product, PlushSize, SIZE_PRICES } from '../data/products';
import { PLUSH_COLOURS } from '../data/colours';
import { PlushCardImage } from '../components/PlushCardImage';
import { useCart } from '../context/CartContext';

interface ShopPageProps {
  navigate: (route: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ navigate }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColourId, setSelectedColourId] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickAddNotification, setQuickAddNotification] = useState<string | null>(null);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesColour = product.colourId.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesColour) return false;
      }
      // Colour
      if (selectedColourId !== 'all' && product.colourId !== selectedColourId) {
        return false;
      }
      // Size
      if (selectedSize !== 'all' && product.defaultSize !== selectedSize) {
        return false;
      }
      // Age Group
      if (selectedAgeGroup !== 'all' && product.ageGroup !== selectedAgeGroup) {
        return false;
      }
      // Price
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // Popularity
    });
  }, [searchQuery, selectedColourId, selectedSize, selectedAgeGroup, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedColourId('all');
    setSelectedSize('all');
    setSelectedAgeGroup('all');
    setMaxPrice(2000);
    setSortBy('popularity');
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.defaultSize, 1);
    setQuickAddNotification(product.name);
    setTimeout(() => setQuickAddNotification(null), 2500);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedColourId !== 'all' ||
    selectedSize !== 'all' ||
    selectedAgeGroup !== 'all' ||
    maxPrice < 2000;

  return (
    <div className="min-h-screen py-8 lg:py-12">
      {/* Toast */}
      {quickAddNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 bg-white/20 p-1 rounded-full" />
          <span className="text-sm font-semibold">{quickAddNotification} added to Bag!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Search Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">All FluffyPals</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing {filteredProducts.length} plush companions for kids across India
            </p>
          </div>

          {/* Search bar & Sort */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, colour..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              aria-label="Sort products by"
              className="px-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-pink-500 cursor-pointer"
            >
              <option value="popularity">Sort: Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-medium"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Layout: Filters Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters Sidebar (Desktop or Mobile Accordion) */}
          <aside className={`lg:col-span-3 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-pink-400" />
                  <span>Filters</span>
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-pink-400 hover:text-pink-300 font-semibold"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Size Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Plush Size
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {['all', 'Mini 15 cm', 'Medium 25 cm', 'Jumbo 40 cm'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedSize === size
                          ? 'bg-pink-600/20 border border-pink-500/40 text-pink-300'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] text-slate-300'
                      }`}
                    >
                      {size === 'all' ? 'All Sizes' : size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Group Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Age Suitability
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['all', '2+', '3+', '5+'].map(age => (
                    <button
                      key={age}
                      onClick={() => setSelectedAgeGroup(age)}
                      className={`py-2 rounded-xl text-xs font-medium text-center transition-colors ${
                        selectedAgeGroup === age
                          ? 'bg-purple-600/30 border border-purple-500/50 text-purple-200'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] text-slate-300'
                      }`}
                    >
                      {age === 'all' ? 'All' : `${age} yrs`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Range Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-slate-400">Max Price</span>
                  <span className="font-bold text-white">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="399"
                  max="2000"
                  step="50"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>₹399 (Mini)</span>
                  <span>₹1,999 (Jumbo)</span>
                </div>
              </div>

              {/* Colour Palette Swatch Filter */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Select Colour
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedColourId('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                      selectedColourId === 'all'
                        ? 'bg-pink-600 text-white border-pink-500'
                        : 'bg-slate-800 text-slate-300 border-white/10'
                    }`}
                  >
                    All
                  </button>
                  {PLUSH_COLOURS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColourId(c.id)}
                      title={c.name}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        selectedColourId === c.id
                          ? 'border-white scale-125 ring-2 ring-pink-500'
                          : 'border-white/20 hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.tipColor }}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/30 border border-white/[0.06] space-y-4">
                <span className="text-4xl">🧸🔍</span>
                <h3 className="text-lg font-bold text-white">No plush pals match these filters</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try clearing your search query or broadening the price and colour filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const colour = PLUSH_COLOURS.find(c => c.id === product.colourId) || PLUSH_COLOURS[0];
                  const inWishlist = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      onClick={() => navigate(`#/product/${product.id}`)}
                      className="group cursor-pointer rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/[0.08] hover:border-pink-500/40 transition-all p-4 flex flex-col justify-between shadow-lg"
                    >
                      <div className="relative">
                        {/* Rating & Tag */}
                        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 text-[11px] font-medium text-amber-300 bg-slate-950/70 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400">({product.reviewCount})</span>
                        </div>

                        {/* Age tag */}
                        <div className="absolute bottom-4 left-2 z-10 text-[10px] text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded-md border border-white/10">
                          Age {product.ageGroup}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-slate-300 hover:text-pink-400 transition-colors"
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${inWishlist ? 'text-pink-500 fill-pink-500' : ''}`} />
                        </button>

                        {/* Plush Creature Image with Hover-to-3D */}
                        <div className="h-56 w-full mb-3">
                          <PlushCardImage colour={colour} allowInteractiveHover={true} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[11px] text-pink-400 font-semibold flex items-center gap-1.5">
                          <span>{colour.name}</span>
                          <span>·</span>
                          <span className="text-slate-400">{product.defaultSize}</span>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-1">
                          {product.name}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-white">₹{product.price}</div>
                            <div className="text-xs text-slate-500 line-through">₹{product.originalPrice}</div>
                          </div>

                          <button
                            onClick={e => handleQuickAdd(product, e)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
