import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface MascotProps {
  className?: string;
  customUrl?: string | null;
  animationKey?: number;
}

export const RocketMascot: React.FC<MascotProps> = ({
  className = '',
  customUrl,
  animationKey = 0,
}) => {
  const [localFileExists, setLocalFileExists] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Check if oneburger--2.png was placed in /public
    const testImg = new Image();
    testImg.src = '/oneburger--2.png';
    testImg.onload = () => setLocalFileExists(true);
    testImg.onerror = () => setLocalFileExists(false);
  }, []);

  // Priority:
  // 1. customUrl (direct user drag & drop / upload of oneburger--2.png)
  // 2. /oneburger--2.png (if placed in public root)
  // 3. /exact_rocket_mascot.png (high-res recreation matching the user's brand artwork)
  // 4. /rocket_mascot.png
  const src =
    customUrl ||
    (localFileExists ? '/oneburger--2.png' : '/exact_rocket_mascot.png');

  return (
    /* Flight path wrapper: Fly in from the left and land directly on top of the logo */
    <motion.div
      key={animationKey}
      id="rocket-mascot-flight-wrapper"
      className={`relative flex items-center justify-center select-none ${className}`}
      initial={{
        x: -420,
        y: -140,
        opacity: 0,
        scale: 0.45,
        rotate: 18,
      }}
      animate={{
        x: [-420, -180, 20, 0],
        y: [-140, -40, -15, 0],
        opacity: [0, 0.9, 1, 1],
        scale: [0.45, 0.85, 1.06, 1],
        rotate: [18, 8, -4, 0],
      }}
      transition={{
        duration: 1.6,
        times: [0, 0.55, 0.85, 1],
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Continuous post-landing hover loop */}
      <motion.div
        id="rocket-mascot-idle-hover"
        className="w-full h-full flex items-center justify-center"
        animate={{
          y: [-5, 5, -5],
          rotate: [-1.5, 2, -1.5],
        }}
        transition={{
          delay: 1.6,
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {!imgError && src ? (
          <img
            id="burger-rocket-mascot-img"
            src={src}
            alt="One Burger Rocket Mascot"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain filter drop-shadow-sm pointer-events-none"
          />
        ) : (
          /* SVG fallback */
          <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-contain"
          >
            <path d="M 85 110 C 85 118, 77 125, 68 125 C 77 125, 85 132, 85 140 C 85 132, 93 125, 102 125 C 93 125, 85 118, 85 110 Z" fill="#701215" />
            <path d="M 325 140 C 325 148, 317 155, 308 155 C 317 155, 325 162, 325 170 C 325 162, 333 155, 342 155 C 333 155, 325 148, 325 140 Z" fill="#701215" />
            <path d="M 310 270 C 310 276, 304 282, 298 282 C 304 282, 310 288, 310 294 C 310 288, 316 282, 322 282 C 316 282, 310 276, 310 270 Z" fill="#701215" />

            <path
              d="M 170 300 C 230 240, 290 200, 330 185 C 325 240, 260 290, 190 320 Z"
              fill="#FAF6EE"
              stroke="#701215"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            <path d="M 285 200 C 315 190, 330 185, 330 185 C 330 185, 320 215, 300 240 Z" fill="#701215" />
            <path d="M 180 305 C 165 330, 140 340, 140 340 C 155 315, 175 300, 180 305 Z" fill="#701215" />
            <path d="M 155 315 C 130 335, 110 350, 95 345 C 115 330, 135 310, 155 315 Z" fill="#701215" />

            <path
              d="M 115 160 C 120 90, 250 85, 265 155 C 240 160, 135 160, 115 160 Z"
              fill="#FAF6EE"
              stroke="#701215"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            <path
              d="M 110 110 L 125 75 L 140 100 L 160 70 L 175 95 L 160 115 Z"
              fill="#FAF6EE"
              stroke="#701215"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <ellipse cx="165" cy="130" rx="14" ry="20" fill="#701215" />
            <ellipse cx="205" cy="130" rx="14" ry="20" fill="#701215" />
            <circle cx="161" cy="125" r="4" fill="#FAF6EE" />
            <circle cx="201" cy="125" r="4" fill="#FAF6EE" />

            <path d="M 150 155 Q 185 190 220 155 Z" fill="#701215" />
            <path d="M 110 170 Q 185 185 265 170 Q 255 195 120 195 Z" fill="#701215" />
            <path d="M 120 200 Q 185 210 250 200 Q 230 225 140 225 Z" fill="#FAF6EE" stroke="#701215" strokeWidth="7" />

            <path d="M 255 145 C 275 130, 290 100, 305 95" stroke="#701215" strokeWidth="8" strokeLinecap="round" />
            <circle cx="310" cy="90" r="16" fill="#FAF6EE" stroke="#701215" strokeWidth="6" />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
};
