import React, { useState } from 'react';
import { ShoppingBag, Heart, Menu, X, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, navigate }) => {
  const { totalItemsCount, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const navLinks = [
    { label: 'Home', route: '#/home' },
    { label: 'Colours', route: '#/colours' },
    { label: 'Shop', route: '#/shop' },
    { label: 'About', route: '#/about' },
    { label: 'Track Order', route: '#/track' },
    { label: 'Help', route: '#/contact' }
  ];

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  const isActive = (route: string) => {
    if (route === '#/home' && (currentRoute === '' || currentRoute === '#/' || currentRoute === '#/home')) {
      return true;
    }
    return currentRoute.startsWith(route);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080c16]/90 backdrop-blur-md border-b border-white/[0.08]">
      {/* Promotional Top Ribbon */}
      {showPromoBanner && (
        <div className="bg-gradient-to-r from-amber-950/90 via-rose-950/80 to-purple-950/90 border-b border-amber-500/20 px-4 py-1.5 text-xs text-amber-200 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2 mx-auto text-center font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Festive Gifting: Free All-India Express Delivery on orders over ₹999</span>
            </span>
            <span className="hidden sm:inline text-amber-400/60">|</span>
            <span className="hidden sm:inline bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono text-[11px]">
              Code: FLUFFY10
            </span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            aria-label="Dismiss banner"
            className="text-amber-300/60 hover:text-amber-200 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract (3 Zones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('#/home')}
            className="flex items-center gap-2 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🧸</span>
            </div>
            <div>
              <span className="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                FluffyPals
                <span className="text-[10px] font-sans font-semibold tracking-wider text-pink-400 uppercase bg-pink-500/10 border border-pink-500/20 px-1.5 py-0.2 rounded">
                  India
                </span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean, unboxed typography) */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <button
              key={link.route}
              onClick={() => handleNav(link.route)}
              className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                isActive(link.route)
                  ? 'text-pink-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.route) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action (Cart, Wishlist, Mobile menu) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNav('#/shop')}
            title="Wishlist"
            className="relative p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 hidden sm:flex items-center justify-center"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-pink-500 fill-pink-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-pink-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('#/cart')}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-sm font-semibold shadow-md shadow-pink-600/20 active:scale-95 transition-all whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="w-5 h-5 rounded-full bg-white/20 text-white text-xs flex items-center justify-center font-bold">
              {totalItemsCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0c1222] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map(link => (
            <button
              key={link.route}
              onClick={() => handleNav(link.route)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.route)
                  ? 'bg-pink-500/15 text-pink-400 font-semibold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between px-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-pink-400" />
              Pan-India Express Dispatch
            </span>
            <span>Delivery 3-5 days</span>
          </div>
        </div>
      )}
    </header>
  );
};
