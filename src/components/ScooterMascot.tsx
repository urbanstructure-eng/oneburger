import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, RotateCcw } from 'lucide-react';

interface ScooterMascotProps {
  className?: string;
  customUrl?: string | null;
  onImageChange?: (url: string) => void;
  isParentOpen?: boolean;
}

export const ScooterMascot: React.FC<ScooterMascotProps> = ({
  className = '',
  customUrl,
  onImageChange,
  isParentOpen = true,
}) => {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger delivery scooter rush-in whenever the parent opens or when re-triggered
  useEffect(() => {
    if (isParentOpen) {
      setRunKey((k) => k + 1);
    }
  }, [isParentOpen]);

  const triggerDriveIn = () => {
    setRunKey((k) => k + 1);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLocalUrl(result);
      if (onImageChange) onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const imageSrc = customUrl || localUrl || '/llambreta.png';

  return (
    <div
      id="scooter-delivery-track"
      className={`relative w-full max-w-[340px] h-24 sm:h-28 mx-auto flex items-center justify-center overflow-visible group select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerDriveIn}
      title="Click to rev delivery scooter!"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Control buttons on hover */}
      {isHovered && (
        <div className="absolute -top-3 right-4 z-20 flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerDriveIn();
            }}
            title="Deliver again!"
            className="p-1 bg-white/95 text-[#70121D] rounded-full shadow-md hover:bg-[#70121D] hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title="Replace scooter mascot image"
            className="p-1 bg-white/95 text-[#70121D] rounded-full shadow-md hover:bg-[#70121D] hover:text-white transition-all cursor-pointer"
          >
            <Upload className="w-3 h-3" />
          </button>
        </div>
      )}

      {/*
        Scooter Delivery Drive-In Animation:
        - Image faces FORWARD (facing right with front wheel, headlight and burger mascot leading).
        - Moves FORWARD from left (x: -190) directly to center (x: 0) with clean deceleration.
        - NO moving back and forth (no bouncing overshoot, no continuous wobble).
        - NO line underneath.
      */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`scooter-run-${runKey}`}
          id="scooter-mascot-vehicle"
          className="relative cursor-pointer flex items-center justify-center"
          initial={{
            x: -190,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // Smooth forward deceleration into stop, no back-and-forth
          }}
        >
          <div className="relative flex items-center justify-center">
            <img
              id="scooter-mascot-img"
              src={imageSrc}
              alt="One Burger Delivery Scooter Mascot"
              referrerPolicy="no-referrer"
              className="w-20 h-auto max-h-24 sm:w-24 sm:max-h-28 object-contain filter drop-shadow-[0_4px_10px_rgba(112,18,29,0.14)] select-none pointer-events-none"
              onError={(e) => {
                e.currentTarget.src = '/mascot_scooter.png';
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
