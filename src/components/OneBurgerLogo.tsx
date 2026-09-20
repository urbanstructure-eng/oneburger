import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface OneBurgerLogoProps {
  customUrl?: string | null;
  className?: string;
  onSelectFile?: () => void;
}

// Coordinate positions (in percentages of container) matching the 6 sparkle stars around One Burger:
// 1. Far left of "One" / "Burger" (mid-left)
// 2. Upper-left above "One"
// 3. Top-right beside "One" (small)
// 4. Far-right beside "One" (large)
// 5. Lower-right below "Burger"
// 6. Bottom-left under the swoosh flourish
const SPARKLE_STARS = [
  { id: 'star-mid-left', left: '17%', top: '30%', size: 30, delay: 0, duration: 2.8 },
  { id: 'star-top-left', left: '21%', top: '24%', size: 16, delay: 0.9, duration: 3.2 },
  { id: 'star-top-right-sm', left: '76%', top: '19.5%', size: 15, delay: 1.4, duration: 2.6 },
  { id: 'star-top-right-lg', left: '80%', top: '24.5%', size: 34, delay: 0.4, duration: 3.0 },
  { id: 'star-bottom-right', left: '79.5%', top: '69.5%', size: 18, delay: 1.8, duration: 2.7 },
  { id: 'star-bottom-left', left: '24.5%', top: '86.5%', size: 19, delay: 1.1, duration: 3.4 },
];

export const OneBurgerLogo: React.FC<OneBurgerLogoProps> = ({
  customUrl,
  className = '',
}) => {
  const [publicImgExists, setPublicImgExists] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Check if oneburger.png was placed into /public/oneburger.png
  useEffect(() => {
    const testImg = new Image();
    testImg.src = '/oneburger.png';
    testImg.onload = () => setPublicImgExists(true);
    testImg.onerror = () => setPublicImgExists(false);
  }, []);

  const imageSource =
    customUrl ||
    (publicImgExists
      ? '/oneburger.png'
      : '/oneburger_exact_v2.png');

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Primary Logo Graphic */}
      {!imgError && imageSource ? (
        <img
          id="one-burger-logo-render"
          src={imageSource}
          alt="One Burger"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-bold text-[#6E1418] text-4xl">
          One Burger
        </div>
      )}

      {/* Subtle, elegant star sparkles overlaid perfectly on the star positions */}
      <div className="absolute inset-0 pointer-events-none">
        {SPARKLE_STARS.map((star) => (
          <motion.div
            key={star.id}
            id={star.id}
            className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            }}
            animate={{
              scale: [0.85, 1.18, 0.92, 1.25, 0.85],
              opacity: [0.4, 1, 0.6, 0.95, 0.4],
              rotate: [0, 8, -6, 12, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.delay,
            }}
          >
            {/* Elegant 4-pointed retro star matching brand color #6E1418 with gentle glow */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full filter drop-shadow-[0_0_4px_rgba(242,231,209,0.9)]"
            >
              <path
                d="M 50 0 C 50 28, 28 50, 0 50 C 28 50, 50 72, 50 100 C 50 72, 72 50, 100 50 C 72 50, 50 28, 50 0 Z"
                fill="#6E1418"
              />
              {/* Subtle warm center glint */}
              <circle cx="50" cy="50" r="10" fill="#FAF6EE" opacity="0.6" />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
