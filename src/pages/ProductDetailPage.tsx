import React, { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Gift,
  Heart,
  ShoppingBag,
  Check,
  ChevronDown,
  Info,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Product, PlushSize, SIZE_PRICES, PRODUCTS, getProductById } from '../data/products';
import { PLUSH_COLOURS, PlushColour, getColourById } from '../data/colours';
import { FurViewer3D } from '../components/FurViewer3D';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  productId: string;
  initialColourId?: string;
  navigate: (route: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  initialColourId,
  navigate
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const product: Product = getProductById(productId) || PRODUCTS[0];

  // Active colour selection
  const [activeColour, setActiveColour] = useState<PlushColour>(() => {
    if (initialColourId) {
      const match = PLUSH_COLOURS.find(c => c.id === initialColourId);
      if (match) return match;
    }
    return PLUSH_COLOURS.find(c => c.id === product.colourId) || PLUSH_COLOURS[0];
  });

  // Active size selection
  const [activeSize, setActiveSize] = useState<PlushSize>(product.defaultSize);
  const [quantity, setQuantity] = useState(1);

  // Gift wrap option
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // Pincode checker
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid: boolean;
    message: string;
    city?: string;
    date?: string;
  }>({ checked: false, valid: false, message: '' });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync if route changes
  useEffect(() => {
    if (initialColourId) {
      const match = PLUSH_COLOURS.find(c => c.id === initialColourId);
      if (match) setActiveColour(match);
    }
  }, [initialColourId]);

  const sizeData = SIZE_PRICES[activeSize] || {
    price: product.price,
    originalPrice: product.originalPrice,
    heightCm: 25,
    weightG: 420
  };

  const currentPrice = sizeData.price;
  const currentOriginalPrice = sizeData.originalPrice;
  const inWishlist = isInWishlist(product.id);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setPincodeStatus({
        checked: true,
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
      return;
    }

    const firstDigit = clean[0];
    let city = 'Mumbai';
    if (firstDigit === '1') city = 'Delhi / NCR';
    else if (firstDigit === '4') city = 'Maharashtra / Pune';
    else if (firstDigit === '5') city = 'Bengaluru / Hyderabad';
    else if (firstDigit === '6') city = 'Chennai / Kochi';
    else if (firstDigit === '7') city = 'Kolkata / Eastern Hub';
    else if (firstDigit === '3') city = 'Ahmedabad / Jaipur';

    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const dateStr = estDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

    setPincodeStatus({
      checked: true,
      valid: true,
      message: `Delivery available to ${clean} (${city}) by ${dateStr}. Free shipping eligible.`,
      city,
      date: dateStr
    });
  };

  const handleAddToCart = () => {
    addToCart(product, activeSize, quantity, isGiftWrap, giftMessage, activeColour.id);
    setToastMessage(`Added ${quantity}x ${product.name} to Bag!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, activeSize, quantity, isGiftWrap, giftMessage, activeColour.id);
    navigate('#/cart');
  };

  // Sample verified Indian parent reviews
  const reviews = [
    {
      author: 'Ananya Deshmukh',
      location: 'Pune, Maharashtra',
      rating: 5,
      date: '2 days ago',
      title: 'The fur feels unreal — like warm velvet!',
      comment: 'Bought this for my 3-year-old Kabir who has mild sensory aversions. The round puffy shape and non-shedding fur immediately comforted him. He won’t sleep without it now!'
    },
    {
      author: 'Rohan Mehta',
      location: 'Bengaluru, Karnataka',
      rating: 5,
      date: '1 week ago',
      title: 'Survived the first machine wash flawlessly',
      comment: 'I was skeptical about washing a 3D fur plush, but washed it on 30°C gentle cycle in a pillowcase as advised. Dried fluffy and good as new. Zero dye run!'
    },
    {
      author: 'Meera Sengupta',
      location: 'Kolkata, West Bengal',
      rating: 5,
      date: '2 weeks ago',
      title: 'Perfect Diwali gift for my niece',
      comment: 'Opted for festive gift packaging. The box arrived in pristine shape with a handwritten festive card. The eyes are securely fixed and won’t come off.'
    }
  ];

  return (
    <div className="min-h-screen py-8 lg:py-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 bg-white/20 p-1 rounded-full" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-6 flex items-center gap-2">
          <button onClick={() => navigate('#/home')} className="hover:text-white transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('#/shop')} className="hover:text-white transition-colors">
            Shop
          </button>
          <span>/</span>
          <span className="text-pink-400 font-medium truncate">{product.name}</span>
        </nav>

        {/* Contiguous Purchase Module (PDP Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive 3D Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] rounded-3xl bg-slate-900/50 border border-white/[0.08] overflow-hidden p-2 shadow-2xl">
              <FurViewer3D
                baseColor={activeColour.baseColor}
                tipColor={activeColour.tipColor}
                interactive={true}
                autoRotate={true}
                cameraDistance={5.6}
                showControlsBadge={true}
                height="100%"
              />

              {/* Wishlist Floating Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-slate-950/70 hover:bg-slate-950 border border-white/10 text-slate-300 hover:text-pink-400 transition-colors shadow-lg"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'text-pink-500 fill-pink-500' : ''}`} />
              </button>

              {/* Live Colour Tag in 3D scene */}
              <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full border border-white/40"
                  style={{ backgroundColor: activeColour.tipColor }}
                />
                <span className="font-semibold text-white">{activeColour.name}</span>
                <span className="text-slate-400">· {activeColour.mood}</span>
              </div>
            </div>

            {/* Viewer Hint */}
            <div className="text-center text-xs text-slate-400">
              💡 Tip: Click creature to make it boop happily · Drag across to comb and part fur
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-white/[0.08]">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-pink-400 font-semibold uppercase tracking-wider">
                  {activeColour.category} · Age {product.ageGroup}
                </span>
                <div className="flex items-center gap-1 text-amber-300">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {product.name}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Price block */}
            <div className="py-3 border-y border-white/[0.08] flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-white">₹{currentPrice}</span>
              <span className="text-base text-slate-500 line-through">₹{currentOriginalPrice}</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Save ₹{currentOriginalPrice - currentPrice} (Inclusive of all taxes)
              </span>
            </div>

            {/* Colour Swatch Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">
                  Colour:{' '}
                  <span className="text-pink-400 font-bold">{activeColour.name}</span>
                </span>
                <span className="text-slate-400">{activeColour.mood}</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {PLUSH_COLOURS.map(c => {
                  const isCurrent = activeColour.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveColour(c)}
                      title={`${c.name} (${c.mood})`}
                      className={`w-8 h-8 rounded-full border-2 transition-all transform ${
                        isCurrent
                          ? 'scale-110 border-white ring-2 ring-pink-500 shadow-md'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.tipColor }}
                      aria-label={c.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Choose Size</span>
                <span className="text-slate-400">
                  Height: {sizeData.heightCm} cm · {sizeData.weightG}g
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {(['Mini 15 cm', 'Medium 25 cm', 'Jumbo 40 cm'] as PlushSize[]).map(size => {
                  const sPrice = SIZE_PRICES[size];
                  const isSelected = activeSize === size;

                  return (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-pink-600/20 border-pink-500 text-white shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="text-xs font-bold">{size}</div>
                      <div className="text-xs font-semibold text-pink-400 mt-0.5">₹{sPrice.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-300">Quantity</span>
              <div className="flex items-center bg-slate-950/70 border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-white min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Gift Wrap Addon Option */}
            <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={e => setIsGiftWrap(e.target.checked)}
                  className="mt-1 rounded accent-pink-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-amber-200">Include Festive Gift Wrap (+₹49)</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Wrapped in satin ribbon box with a personalized printed greeting card.
                  </p>
                </div>
              </label>

              {isGiftWrap && (
                <div className="pt-2">
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={e => setGiftMessage(e.target.value)}
                    placeholder="Enter custom gift message (e.g. Happy Birthday Aarav! Love, Dadi)..."
                    className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag · ₹{currentPrice * quantity}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-colors"
              >
                Buy Now with 1-Click
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Truck className="w-4 h-4 text-pink-400" />
                <span>Check Delivery Pincode</span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeStatus.checked && (
                <div
                  className={`text-xs p-2.5 rounded-xl flex items-start gap-2 ${
                    pincodeStatus.valid
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {pincodeStatus.valid ? (
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <span>{pincodeStatus.message}</span>
                </div>
              )}
            </div>

            {/* Trust points */}
            <div className="pt-3 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                <span>BIS IS 9873 Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                <span>7-Day Return Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs / Sections */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Care & Materials */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🧼</span>
              <span>Washing & Safety Care</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-pink-400">✓</span>
                <span>
                  <strong>Machine Washable:</strong> Place in a mesh laundry bag. Wash on gentle 30°C cycle with mild baby shampoo or detergent.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400">✓</span>
                <span>
                  <strong>Air Dry Flat:</strong> Do not wring. Allow to air dry in shaded breeze; fluff gently with your fingers to restore the volumetric coat.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400">✓</span>
                <span>
                  <strong>Lock-Stitch Cornea Eyes:</strong> High-impact acrylic eyes tested to withstand 150 N pull force without detaching.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400">✓</span>
                <span>
                  <strong>Anti-Bacterial Core:</strong> Virgin hollow conjugate fiber filling that resists mold, odors, and dust mites.
                </span>
              </li>
            </ul>
          </div>

          {/* Child Safety & Hypoallergenic Testing */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🛡️</span>
              <span>Parent Trust & Standards</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                FluffyPals was created by Indian parents and child psychologists to offer high-sensory comfort without the microplastic shedding or harsh chemical dyes found in cheap imported stuffed toys.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                <div className="text-pink-300 font-bold">Compliant with:</div>
                <div className="text-slate-400 text-[11px]">
                  • Bureau of Indian Standards (BIS) IS 9873 (Part 1: Mechanical, Part 2: Flammability, Part 3: Toxic Elements).
                </div>
                <div className="text-slate-400 text-[11px]">
                  • Heavy metals migration test: PASS (Lead & Cadmium free).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 pt-12 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Verified Parent Reviews</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-400">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <span className="text-xs text-slate-300 font-bold">4.9 out of 5</span>
                <span className="text-xs text-slate-400">based on {product.reviewCount} reviews</span>
              </div>
            </div>

            <div className="text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
              ✓ 100% Verified Indian Buyers
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.06] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-sm">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.date}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{rev.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{rev.comment}</p>
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-300">{rev.author}</span>
                  <span className="text-slate-500">{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
