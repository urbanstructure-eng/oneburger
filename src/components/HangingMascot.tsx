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

const STORAGE_HANGING_MASCOT_KEY = 'oneburger_hanging_mascot_url_v11';

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

  // Uses custom upload if provided, otherwise the authentic clean PNG with bar removed and transparent edges
  const imageSource = customUrl || localUrl || '/hang.png';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="hanging-mascot-wrapper"
          className={`fixed -top-4 sm:-top-5 md:-top-7 lg:-top-8 xl:-top-9 right-1 sm:right-4 md:right-8 lg:right-14 xl:right-20 z-20 select-none pointer-events-none ${className}`}
          initial={{
            y: -400,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -420,
            opacity: 0,
            transition: { duration: 0.35, ease: 'easeIn' },
          }}
          transition={{
            type: 'spring',
            damping: 18,
            stiffness: 110,
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
            Hand is moved a bit up so the knuckles hook cleanly over the top edge.
            pointer-events-none ensures it never interferes with form buttons or clicking.
          */}
          <div
            className={`relative w-48 aspect-[795/863] sm:w-64 md:w-[340px] lg:w-[410px] xl:w-[460px] max-h-[85vh] transition-all pointer-events-none ${
              isDragging ? 'ring-2 ring-[#70121D] ring-offset-2 rounded-2xl' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/*
              Subtle hanging motion:
              Natural, very gentle pendulum sway pivoting directly from the clutched hand knuckles at top edge (30.2% width, 0% height)
            */}
            <motion.div
              id="hanging-mascot-subtle-sway"
              className="w-full h-full relative pointer-events-none group"
              style={{
                transformOrigin: '30.2% 24px',
              }}
              animate={{
                rotate: [-0.9, 0.95, -0.9],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="relative w-full h-full flex items-start justify-center pointer-events-none">
                <img
                  id="hanging-burger-king-mascot-img"
                  src={imageSource}
                  alt="One Burger King Mascot Hanging"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-top select-none pointer-events-none"
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
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#FAF6EE]/95 hover:bg-[#FAF6EE] text-[#70121D] border border-[#70121D]/25 flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 active:scale-95 cursor-pointer z-30 pointer-events-auto"
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
