import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload } from 'lucide-react';
import { EXACT_HANGING_MASCOT_DATA_URL } from '../assets/hang_exact_data';

interface HangingMascotProps {
  isOpen?: boolean;
  customUrl?: string | null;
  className?: string;
  onUpdateMascotUrl?: (url: string) => void;
}

const STORAGE_HANGING_MASCOT_KEY = 'oneburger_hanging_mascot_url_v9';

export const HangingMascot: React.FC<HangingMascotProps> = ({
  isOpen = true,
  customUrl,
  className = '',
  onUpdateMascotUrl,
}) => {
  const [localUrl, setLocalUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_HANGING_MASCOT_KEY) || null;
    } catch {
      return null;
    }
  });

  const [bounceCount, setBounceCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (file && (file.type.startsWith('image/') || file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.svg'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const dataUrl = e.target.result as string;
          setLocalUrl(dataUrl);
          onUpdateMascotUrl?.(dataUrl);
          try {
            localStorage.setItem(STORAGE_HANGING_MASCOT_KEY, dataUrl);
          } catch {
            // Ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMascotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBounceCount((prev) => prev + 1);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Uses custom upload if provided, otherwise the authentic clean PNG or data URL fallback
  const imageSource = customUrl || localUrl || '/hang.png';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="hanging-mascot-wrapper"
          className={`fixed top-0 right-1 sm:right-3 md:right-6 lg:right-10 xl:right-16 z-50 select-none pointer-events-none ${className}`}
          initial={{
            y: -500,
            opacity: 0,
            rotate: -12,
          }}
          animate={{
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          exit={{
            y: -520,
            opacity: 0,
            rotate: -8,
            transition: { duration: 0.45, ease: 'easeIn' },
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 90,
            delay: 0.1,
          }}
        >
          {/* Hidden file input for uploading / replacing the mascot image */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />

          {/*
            Hanging Mascot Container:
            No suspension line or cord. Hand is moved up directly to top: 0, clutching the top edge.
          */}
          <div
            className={`relative w-56 h-[243px] sm:w-72 sm:h-[313px] md:w-[340px] md:h-[369px] lg:w-[400px] lg:h-[434px] xl:w-[450px] xl:h-[488px] transition-all pointer-events-auto ${
              isDragging ? 'ring-2 ring-[#70121D] ring-offset-2 rounded-2xl' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/*
              Pendulum Sway:
              Rotates directly from the clutched hand knuckles at the top edge (30.8% width, 0% height)
            */}
            <motion.div
              key={bounceCount}
              id="hanging-mascot-sway"
              className="w-full h-full relative cursor-pointer group"
              style={{
                transformOrigin: '30.8% 0%',
              }}
              animate={{
                rotate: [-3.2, 3.6, -2.4, 2.6, -1.2, 1.2, -0.4, 0, -3.2],
              }}
              transition={{
                duration: 6.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: 1.02,
                rotate: [0, -2.5, 2.5, -1, 0],
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.97 }}
              onClick={handleMascotClick}
              title="Click the King mascot to swing, or drag & drop your image here"
            >
              <div className="relative w-full h-full flex items-start justify-center">
                <img
                  id="hanging-burger-king-mascot-img"
                  src={imageSource}
                  alt="One Burger King Mascot Hanging"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-top select-none pointer-events-none drop-shadow-sm"
                  onError={(e) => {
                    // Fallback to embedded base64 data URL if file loading fails
                    e.currentTarget.src = EXACT_HANGING_MASCOT_DATA_URL;
                  }}
                />

                {/* Subtle upload badge on hover for user customization */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#FAF6EE]/95 hover:bg-[#FAF6EE] text-[#70121D] border border-[#70121D]/25 flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 active:scale-95 cursor-pointer z-30"
                  title="Upload / replace mascot with your file"
                  aria-label="Upload custom hanging image"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
