import React, { useState } from 'react';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import { PLUSH_COLOURS, COLOUR_CATEGORIES, ColourCategory, PlushColour } from '../data/colours';
import { PRODUCTS, Product } from '../data/products';
import { PlushCardImage } from '../components/PlushCardImage';

interface ColoursPageProps {
  navigate: (route: string) => void;
}

export const ColoursPage: React.FC<ColoursPageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ColourCategory>('All');

  const filteredColours = PLUSH_COLOURS.filter(c => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  const getProductForColour = (colourId: string): Product => {
    return PRODUCTS.find(p => p.colourId === colourId) || PRODUCTS[0];
  };

  const handleCardClick = (colour: PlushColour) => {
    const product = getProductForColour(colour.id);
    navigate(`#/product/${product.id}?colour=${colour.id}`);
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>16 Signature Shades</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            The Fluffy Colour Spectrum
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Every FluffyPal is created in our signature round puffy shape, dressed in a distinct rich coat.
            Each card has a live 3D creature—orbit and tap to explore!
          </p>

          {/* Category Filter Tabs (Interactive controls following design guidelines) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-slate-900/60 border border-white/[0.08] rounded-2xl max-w-xl mx-auto">
            {COLOUR_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 16 Colours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredColours.map(colour => {
            const product = getProductForColour(colour.id);

            return (
              <div
                key={colour.id}
                onClick={() => handleCardClick(colour)}
                className="group cursor-pointer rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/[0.08] hover:border-pink-500/40 transition-all p-4 flex flex-col justify-between shadow-lg relative overflow-hidden"
              >
                {/* Mood Tag & Category */}
                <div className="flex items-center justify-between text-xs mb-2 z-10">
                  <span className="font-semibold text-white">{colour.mood}</span>
                  <span className="text-[11px] text-slate-400">{colour.category}</span>
                </div>

                {/* 3D Plush Creature Card Image with Hover Orbit */}
                <div className="h-56 w-full mb-3">
                  <PlushCardImage colour={colour} allowInteractiveHover={true} />
                </div>

                {/* Details */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                      {colour.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-300">from ₹399</span>
                  </div>

                  <p className="text-xs text-pink-400 font-medium">
                    {colour.tagline}
                  </p>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed pt-1">
                    {colour.description}
                  </p>

                  <div className="pt-3 mt-2 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-slate-400">View Plush Options</span>
                    <div className="w-7 h-7 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
