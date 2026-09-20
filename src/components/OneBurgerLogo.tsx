import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OneBurgerLogoProps {
  customUrl?: string | null;
  className?: string;
  onSelectFile?: () => void;
  animationKey?: number;
}

// Coordinate positions (in percentages of container) matching the 6 sparkle stars around One Burger
const SPARKLE_STARS = [
  { id: 'star-mid-left', left: '17%', top: '30%', size: 30, delay: 1.2, duration: 2.8 },
  { id: 'star-top-left', left: '21%', top: '24%', size: 16, delay: 1.8, duration: 3.2 },
  { id: 'star-top-right-sm', left: '76%', top: '19.5%', size: 15, delay: 2.1, duration: 2.6 },
  { id: 'star-top-right-lg', left: '80%', top: '24.5%', size: 34, delay: 1.4, duration: 3.0 },
  { id: 'star-bottom-right', left: '79.5%', top: '69.5%', size: 18, delay: 2.3, duration: 2.7 },
  { id: 'star-bottom-left', left: '24.5%', top: '86.5%', size: 19, delay: 1.7, duration: 3.4 },
];

// Elegant spray particle droplets that scatter as the spray can sweeps across
const SPRAY_MIST_PARTICLES = [
  { id: 'p-1', x: -60, y: -25, r: 2.5, delay: 0.15, duration: 0.8 },
  { id: 'p-2', x: -45, y: -10, r: 3, delay: 0.25, duration: 0.9 },
  { id: 'p-3', x: -20, y: -30, r: 2, delay: 0.35, duration: 0.85 },
  { id: 'p-4', x: 0, y: -15, r: 3.5, delay: 0.45, duration: 0.8 },
  { id: 'p-5', x: 25, y: -28, r: 2, delay: 0.6, duration: 0.85 },
  { id: 'p-6', x: 50, y: -10, r: 3, delay: 0.7, duration: 0.9 },
  { id: 'p-7', x: 70, y: 15, r: 2.5, delay: 0.85, duration: 0.8 },
  { id: 'p-8', x: 40, y: 35, r: 2, delay: 0.95, duration: 0.75 },
  { id: 'p-9', x: -10, y: 30, r: 2.5, delay: 1.05, duration: 0.8 },
  { id: 'p-10', x: -40, y: 40, r: 2, delay: 1.15, duration: 0.8 },
];

export const OneBurgerLogo: React.FC<OneBurgerLogoProps> = ({
  customUrl,
  className = '',
  animationKey = 0,
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
      {/* Re-triggerable Spray-Can Graffiti Reveal Container */}
      <div key={animationKey} className="relative w-full h-full flex items-center justify-center">
        {/*
          Graffiti Spray Wipe Layer:
          The logo reveals with a sweeping horizontal stencil spray wipe,
          starting blurred and slightly oversized as airborne aerosol spray paint,
          then crystallizing with rich pigmentation, high-definition contrast,
          and a gentle settling ease.
        */}
        <motion.div
          id="graffiti-spray-logo-container"
          className="relative w-full h-full flex items-center justify-center"
          initial={{
            clipPath: 'inset(0 100% 0 0 round 16px)',
            filter: 'blur(10px) contrast(140%) drop-shadow(0 0 12px rgba(110,20,24,0.65))',
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            clipPath: [
              'inset(0 100% 0 0 round 16px)',
              'inset(0 60% 0 0 round 12px)',
              'inset(0 15% 0 0 round 4px)',
              'inset(0 0% 0 0 round 0px)',
            ],
            filter: [
              'blur(10px) contrast(140%) drop-shadow(0 0 12px rgba(110,20,24,0.65))',
              'blur(6px) contrast(125%) drop-shadow(0 0 8px rgba(110,20,24,0.5))',
              'blur(2px) contrast(110%) drop-shadow(0 0 4px rgba(110,20,24,0.3))',
              'blur(0px) contrast(100%) drop-shadow(0 2px 5px rgba(110,20,24,0.15))',
            ],
            opacity: [0, 0.85, 0.98, 1],
            scale: [1.05, 1.02, 1.005, 1],
          }}
          transition={{
            duration: 1.45,
            times: [0, 0.4, 0.75, 1],
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          {/* Primary Logo Graphic */}
          {!imgError && imageSource ? (
            <img
              id="one-burger-logo-render"
              src={imageSource}
              alt="One Burger"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-[#6E1418] text-4xl">
              One Burger
            </div>
          )}
        </motion.div>

        {/* Aerosol Spray Can Mist Head Sweeping Across the Canvas */}
        <motion.div
          id="spray-can-nozzle-mist"
          className="absolute inset-y-0 w-20 pointer-events-none flex items-center justify-center z-10"
          initial={{
            left: '-10%',
            opacity: 0,
          }}
          animate={{
            left: ['-5%', '35%', '75%', '105%'],
            opacity: [0, 0.85, 0.75, 0],
          }}
          transition={{
            duration: 1.35,
            times: [0, 0.35, 0.75, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Expanding spray vapor glow */}
          <div className="w-16 h-36 rounded-full bg-radial from-[#6E1418]/35 via-[#6E1418]/15 to-transparent blur-md" />
        </motion.div>

        {/* Delicate aerosol spray flecks that settle elegantly */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          {SPRAY_MIST_PARTICLES.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full bg-[#6E1418]"
              style={{
                width: particle.r,
                height: particle.r,
              }}
              initial={{
                x: particle.x * 0.4,
                y: particle.y * 0.4,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: [particle.x * 0.4, particle.x * 1.1, particle.x],
                y: [particle.y * 0.4, particle.y * 1.05, particle.y],
                opacity: [0, 0.7, 0.3, 0],
                scale: [0, 1.4, 0.9, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Subtle, elegant star sparkles appearing sequentially after spray settles */}
        <div className="absolute inset-0 pointer-events-none z-10">
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
              initial={{
                scale: 0,
                opacity: 0,
                rotate: -45,
              }}
              animate={{
                scale: [0, 1.3, 0.95, 1.2, 0.9],
                opacity: [0, 1, 0.55, 0.95, 0.5],
                rotate: [-45, 15, -6, 12, 0],
              }}
              transition={{
                delay: star.delay,
                duration: star.duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
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
                <circle cx="50" cy="50" r="10" fill="#FAF6EE" opacity="0.65" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
