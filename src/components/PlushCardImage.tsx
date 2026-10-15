import React, { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { PlushColour } from '../data/colours';
import { getPlushSnapshot } from '../services/snapshotCache';
import { FurViewer3D } from './FurViewer3D';

interface PlushCardImageProps {
  colour: PlushColour;
  className?: string;
  allowInteractiveHover?: boolean;
}

export const PlushCardImage: React.FC<PlushCardImageProps> = ({
  colour,
  className = '',
  allowInteractiveHover = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);

  const snapshotUrl = getPlushSnapshot(colour.id);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (allowInteractiveHover) {
      setIs3DActive(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIs3DActive(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-b from-[#151f33] via-[#0d1424] to-[#080d19] border border-white/[0.06] flex items-center justify-center select-none group/img ${className}`}
    >
      {/* 1. Interactive 3D Viewer (Active ONLY on hover to avoid WebGL context limits) */}
      {is3DActive ? (
        <div className="w-full h-full animate-fadeIn">
          <FurViewer3D
            baseColor={colour.baseColor}
            tipColor={colour.tipColor}
            interactive={true}
            autoRotate={true}
            autoRotateSpeed={1.2}
            cameraDistance={5.6}
            lightweight={true}
            height="100%"
          />
        </div>
      ) : (
        /* 2. Instant Pre-Rendered High-Resolution 3D Snapshot (Always visible, 0 context overhead) */
        <img
          src={snapshotUrl}
          alt={`${colour.name} plush creature`}
          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover/img:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Floating 3D Hover Affordance Pill */}
      {allowInteractiveHover && !is3DActive && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/10 text-[10px] text-slate-300 opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 shadow-lg whitespace-nowrap">
          <Sparkles className="w-3 h-3 text-pink-400" />
          <span>Interactive 3D</span>
        </div>
      )}

      {/* Subtle indicator dot matching the tip colour in corner */}
      <div
        className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm pointer-events-none"
        style={{ backgroundColor: colour.tipColor }}
        title={colour.name}
      />
    </div>
  );
};
