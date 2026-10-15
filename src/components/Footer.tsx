import React from 'react';
import { ShieldCheck, RefreshCw, Truck, HeartHandshake, Sparkles, MessageCircle } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-[#050811] border-t border-white/[0.08] text-slate-400 text-sm">
      {/* 4 Trust Badges Strip */}
      <div className="border-b border-white/[0.06] bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">100% Child Safe</h4>
              <p className="text-xs text-slate-400 mt-0.5">Non-toxic, BIS IS 9873 safety standard certified.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Easy 7-Day Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free doorstep exchanges if not 100% in love.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Free Delivery ₹999+</h4>
              <p className="text-xs text-slate-400 mt-0.5">Express insured courier across all Indian pincodes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Artisan Crafted</h4>
              <p className="text-xs text-slate-400 mt-0.5">Double-stitched seams made for years of bedtime hugs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧸</span>
              <span className="font-heading text-xl font-bold text-white">FluffyPals India</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Designing the softest, safest sensory plush friends for India's children. Round, puffy, and endlessly huggable.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/919876543210?text=Hi%20FluffyPals!%20I%20have%20a%20question%20about%20your%20plush%20toys."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Support: +91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Shop Collections</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('#/shop')} className="hover:text-pink-400 transition-colors">
                  All 24 Plush Pals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/colours')} className="hover:text-pink-400 transition-colors">
                  16 Vibrant Colours Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/shop')} className="hover:text-pink-400 transition-colors">
                  Mini 15cm Pocket Buddies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/shop')} className="hover:text-pink-400 transition-colors">
                  Jumbo 40cm Snuggle Pillows
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/shop')} className="hover:text-pink-400 transition-colors">
                  Diwali & Rakhi Festive Hamper
                </button>
              </li>
            </ul>
          </div>

          {/* Parent Help & Care */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Parents & Safety</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('#/about')} className="hover:text-pink-400 transition-colors">
                  BIS Safety Standards & Testing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/contact')} className="hover:text-pink-400 transition-colors">
                  Washing & Care Instructions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/track')} className="hover:text-pink-400 transition-colors">
                  Track Delivery Status
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/contact')} className="hover:text-pink-400 transition-colors">
                  School Return Gifts & Wholesale
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/contact')} className="hover:text-pink-400 transition-colors">
                  Shipping & Return Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Care Promise */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider">Safety & Care Promise</h5>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs space-y-1.5">
              <p className="text-slate-300 font-medium">🧼 Machine Washable</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Use a mesh laundry bag, wash on delicate 30°C cycle with baby detergent, and air-dry flat for fluffiness.
              </p>
              <p className="text-slate-300 font-medium pt-1">👶 Zero Detachable Choking Hazards</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Ultrasonic heat-fused eyes and double-lock seam construction designed specifically for little hands.
              </p>
            </div>
          </div>
        </div>

        {/* Quiet Copyright & Disclaimers */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FluffyPals India Consumer Goods Pvt. Ltd. Made with love for Indian families.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>BIS Certified IS 9873 (Part 1, 2 & 3)</span>
            <span aria-hidden="true">·</span>
            <span>Non-Toxic Fabric</span>
            <span aria-hidden="true">·</span>
            <span>Pan-India Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
