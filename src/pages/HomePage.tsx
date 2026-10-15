import React, { useState } from 'react';
import { ArrowRight, Sparkles, Star, Shield, Droplets, Gift, Heart, ShoppingBag, Check } from 'lucide-react';
import { FurViewer3D } from '../components/FurViewer3D';
import { PlushCardImage } from '../components/PlushCardImage';
import { PLUSH_COLOURS, PlushColour } from '../data/colours';
import { PRODUCTS, Product, SIZE_PRICES } from '../data/products';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  // Hero selected colour (defaults to Lavender Purple - the original)
  const [selectedColour, setSelectedColour] = useState<PlushColour>(PLUSH_COLOURS[12] || PLUSH_COLOURS[0]);
  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  // Best sellers
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.defaultSize, 1);
    setAddedItemNotification(product.name);
    setTimeout(() => setAddedItemNotification(null), 2500);
  };

  return (
    <div className="min-h-screen">
      {/* Quick Add Toast */}
      {addedItemNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 bg-white/20 p-1 rounded-full" />
          <span className="text-sm font-semibold">{addedItemNotification} added to Bag!</span>
        </div>
      )}

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-20 border-b border-white/[0.06]">
        {/* Ambient atmospheric glows */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: selectedColour.tipColor }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>India’s Most Huggable Plush Toy</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Soft. Fluffy.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200">
                  Made to be Hugged.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Meet our round, squishy sensory plush creatures. Engineered with ultra-soft 64-layer GPU fur feel,
                certified child-safe materials, and made for endless bedtime snuggles.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigate('#/shop')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-base shadow-lg shadow-pink-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('#/colours')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-base transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore 16 Colours</span>
                </button>
              </div>

              {/* Live Colour Strip Preview Note */}
              <div className="pt-4 border-t border-white/[0.08]">
                <p className="text-xs text-slate-400 mb-2 font-medium flex items-center justify-center lg:justify-start gap-2">
                  <span>Tap swatch to recolour live in 3D:</span>
                  <span className="text-pink-300 font-bold">{selectedColour.name}</span>
                  <span className="text-slate-400">({selectedColour.mood})</span>
                </p>

                {/* Tappable Swatch Strip */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-lg">
                  {PLUSH_COLOURS.map(c => {
                    const isSelected = selectedColour.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColour(c)}
                        title={`${c.name} (${c.mood})`}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all transform ${
                          isSelected
                            ? 'scale-125 border-white ring-2 ring-pink-500 ring-offset-2 ring-offset-slate-900 shadow-md'
                            : 'border-white/20 hover:scale-110 hover:border-white/60'
                        }`}
                        style={{ backgroundColor: c.tipColor }}
                        aria-label={`Select ${c.name}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Hero 3D Interactive Creature */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-md lg:max-w-lg h-[360px] sm:h-[440px] lg:h-[490px] relative rounded-3xl bg-radial from-slate-800/40 via-slate-900/30 to-transparent border border-white/[0.06] p-2 shadow-2xl">
                <FurViewer3D
                  baseColor={selectedColour.baseColor}
                  tipColor={selectedColour.tipColor}
                  interactive={true}
                  autoRotate={true}
                  cameraDistance={5.8}
                  showControlsBadge={true}
                  height="100%"
                />

                {/* Interactive hint tag */}
                <div className="absolute top-4 left-4 bg-slate-950/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] text-slate-300 pointer-events-none">
                  ✨ Interactive 3D Viewer · Touch & Comb Fur
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Best Sellers Section */}
      <section className="py-14 bg-slate-950/40 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-pink-400">Loved by Indian Families</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Our Best Sellers</h2>
            </div>
            <button
              onClick={() => navigate('#/shop')}
              className="text-sm font-semibold text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors"
            >
              <span>View all 24 toys</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => {
              const colour = PLUSH_COLOURS.find(c => c.id === product.colourId) || PLUSH_COLOURS[0];
              const inWishlist = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`#/product/${product.id}`)}
                  className="group cursor-pointer rounded-2xl bg-slate-900/40 hover:bg-slate-900/70 border border-white/[0.08] hover:border-pink-500/30 transition-all p-4 flex flex-col justify-between shadow-md"
                >
                  <div className="relative">
                    {/* Badge */}
                    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 text-[11px] font-medium text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400">({product.reviewCount})</span>
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
                    <div className="h-52 w-full mb-3">
                      <PlushCardImage colour={colour} allowInteractiveHover={true} />
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-pink-400 font-medium">{colour.name} · {colour.mood}</div>
                    <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-base font-bold text-white">₹{product.price}</div>
                        <div className="text-xs text-slate-500 line-through">₹{product.originalPrice}</div>
                      </div>

                      <button
                        onClick={e => handleQuickAdd(product, e)}
                        className="p-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white shadow-md active:scale-95 transition-all"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Festival Gifting Banner (Diwali & Raksha Bandhan) */}
      <section className="py-14 border-b border-white/[0.06] relative overflow-hidden bg-gradient-to-r from-amber-950/50 via-rose-950/40 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl p-6 sm:p-10 border border-amber-500/20 bg-gradient-to-br from-amber-900/20 via-slate-900/60 to-purple-950/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <span>🪔</span>
                <span>Diwali & Raksha Bandhan Special Gifting</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                The Gift of Pure Joy for Little Siblings & Toddlers
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Add our signature festive gift-wrap with satin ribbons, personalized gold-foiled greeting cards, and express dispatch to any address in India.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate('#/shop')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
                >
                  Shop Festive Picks
                </button>
                <div className="flex items-center gap-2 text-xs text-amber-200">
                  <span>Use Coupon:</span>
                  <span className="font-mono bg-amber-400/20 px-2 py-1 rounded border border-amber-400/30 font-bold">
                    DIWALI20
                  </span>
                  <span>(20% Off)</span>
                </div>
              </div>
            </div>

            {/* Decorative Festive Visual Mockup Card */}
            <div className="w-full md:w-72 p-5 rounded-2xl bg-slate-900/80 border border-amber-400/20 text-center space-y-3 shadow-xl">
              <div className="text-4xl">🎁✨</div>
              <h4 className="text-sm font-bold text-amber-300">Complimentary Gift Hamper</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Includes festive greeting card, luxury protective box, and zero invoice slip for direct gifting.
              </p>
              <div className="text-[11px] text-emerald-400 font-medium">
                ✓ Guaranteed On-Time Delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Parents Love Us */}
      <section className="py-16 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-pink-400">Pediatric & Sensory Approved</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Why Parents Love FluffyPals</h2>
            <p className="text-sm text-slate-400 mt-2">
              Engineered with zero compromises on child safety, sensory soothing, and washability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.06] hover:border-pink-500/20 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Ultra-Safe & Non-Toxic</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complies with BIS IS 9873 standards. 100% free from phthalates, BPA, and heavy metals. Tested safe even if babies explore through mouthing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.06] hover:border-pink-500/20 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">100% Machine Washable</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kids get messy! Toss your FluffyPal in a mesh bag on gentle cold wash. Air-dries back to plush, fluffy perfection without matting or clumping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.06] hover:border-pink-500/20 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sensory Calming Weight</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gentle ergonomic distribution provides comforting deep-touch pressure, helping toddlers soothe separation anxiety and settle into naptime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
