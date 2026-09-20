import React from 'react';
import { LogoConfig } from '../types';

interface BrandLogoProps {
  config: LogoConfig;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  config,
  className = '',
  size = 'hero',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    hero: 'w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64',
  };

  const currentSizeClass = sizeMap[size];

  // If custom logo is provided
  if (config.variant === 'custom' && config.customUrl) {
    return (
      <div
        id="custom-brand-logo-container"
        className={`relative flex items-center justify-center transition-transform duration-300 ${currentSizeClass} ${className}`}
        style={{ transform: `scale(${config.scale})` }}
      >
        <img
          id="custom-brand-logo-img"
          src={config.customUrl}
          alt="Custom Brand Logo"
          referrerPolicy="no-referrer"
          className="max-w-full max-h-full object-contain filter drop-shadow-sm select-none"
        />
      </div>
    );
  }

  // If generated AI emblem asset is selected
  if (config.variant === 'generated') {
    return (
      <div
        id="generated-brand-logo-container"
        className={`relative flex items-center justify-center overflow-hidden transition-transform duration-300 ${currentSizeClass} ${className}`}
        style={{ transform: `scale(${config.scale})` }}
      >
        <div className="relative w-full h-full p-2.5 rounded-2xl bg-[#fbf8f2]/80 backdrop-blur-sm border border-[#22201d]/10 shadow-[0_12px_30px_-10px_rgba(34,32,29,0.08)] flex items-center justify-center">
          <img
            id="brand-mark-image"
            src="/src/assets/images/brand_logo_mark_1789856531905.jpg"
            alt="Urban Structure Brand Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain rounded-xl mix-blend-multiply transition-opacity duration-300"
          />
        </div>
      </div>
    );
  }

  // Precision vector SVG emblems
  if (config.variant === 'architectural') {
    return (
      <div
        id="architectural-brand-logo-container"
        className={`relative flex items-center justify-center transition-transform duration-300 ${currentSizeClass} ${className}`}
        style={{ transform: `scale(${config.scale})` }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#1E1D1A]"
        >
          {/* Architectural structural framing: cantilevered grid, golden ratio proportions */}
          <rect
            x="32"
            y="32"
            width="136"
            height="136"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeOpacity="0.85"
          />
          {/* Horizontal floor plate cantilever */}
          <line
            x1="18"
            y1="100"
            x2="182"
            y2="100"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          {/* Offset vertical structural columns */}
          <line
            x1="80"
            y1="32"
            x2="80"
            y2="168"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
          />
          <line
            x1="130"
            y1="18"
            x2="130"
            y2="182"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          {/* Core geometry monolith fill */}
          <rect
            x="80"
            y="100"
            width="50"
            height="68"
            fill="currentColor"
            fillOpacity="0.9"
          />
          {/* Diagonal solar inclination line */}
          <line
            x1="32"
            y1="168"
            x2="168"
            y2="32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.25"
          />
          {/* Anchor coordinate dot */}
          <circle cx="100" cy="100" r="3.5" fill="#FAF6EE" />
        </svg>
      </div>
    );
  }

  if (config.variant === 'monogram') {
    return (
      <div
        id="monogram-brand-logo-container"
        className={`relative flex items-center justify-center transition-transform duration-300 ${currentSizeClass} ${className}`}
        style={{ transform: `scale(${config.scale})` }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#1E1D1A]"
        >
          {/* U & S Intersecting Architectural Monogram */}
          <path
            d="M50 45 V125 C50 152 72 170 100 170 C128 170 150 152 150 125 V45"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="square"
          />
          <path
            d="M65 65 H135 V100 C135 115 125 125 100 125 C75 125 65 135 65 150 H135"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="square"
            strokeOpacity="0.9"
          />
          <line x1="25" y1="100" x2="175" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      </div>
    );
  }

  // Default: Pure Minimalist Modernist Structure
  return (
    <div
      id="minimalist-brand-logo-container"
      className={`relative flex items-center justify-center transition-transform duration-300 ${currentSizeClass} ${className}`}
      style={{ transform: `scale(${config.scale})` }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#1E1D1A]"
      >
        {/* Outer Minimalist Diamond-Square Boundary */}
        <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
        <rect x="52" y="52" width="96" height="96" stroke="currentColor" strokeWidth="4" />
        {/* Internal Tonal Plane */}
        <rect x="52" y="52" width="48" height="96" fill="currentColor" fillOpacity="0.88" />
        {/* Spatial Axis */}
        <circle cx="124" cy="76" r="10" fill="currentColor" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.5" />
      </svg>
    </div>
  );
};
