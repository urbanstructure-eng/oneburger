/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { OneBurgerLogo } from './components/OneBurgerLogo';
import { RocketMascot } from './components/RocketMascot';
import { SlideUpNoticePage } from './components/SlideUpNoticePage';
import { PasswordGate } from './components/PasswordGate';
import { Palette, Upload, RotateCcw, Play, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GRADIENTS = [
  'radial-gradient(circle at 50% 50%, #FAF6EE 0%, #F2E7D1 55%, #E5D5BB 100%)',
  'linear-gradient(135deg, #FAF7F0 0%, #F2E7D1 50%, #E2D1B4 100%)',
  'radial-gradient(ellipse at 50% 40%, #FCF9F3 0%, #F2E7D1 60%, #E6D6BD 100%)',
  'linear-gradient(180deg, #FAF7F1 0%, #F2E7D1 55%, #E4D3B8 100%)',
];

const STORAGE_KEY = 'oneburger_logo_custom_data';
const STORAGE_MASCOT_KEY = 'oneburger_mascot_custom_data';
const STORAGE_BURGER_BG_KEY = 'oneburger_form_burger_bg';
const STORAGE_HANGING_MASCOT_KEY = 'oneburger_hanging_mascot_url_v11';

export default function App() {
  const [gradientIdx, setGradientIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  // Always require password 1970 on first landing / page load
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [burgerBgUrl, setBurgerBgUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_BURGER_BG_KEY) || null;
    } catch {
      return null;
    }
  });

  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });
  const [customMascotUrl, setCustomMascotUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_MASCOT_KEY) || null;
    } catch {
      return null;
    }
  });
  const [customHangingMascotUrl, setCustomHangingMascotUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_HANGING_MASCOT_KEY) || null;
    } catch {
      return null;
    }
  });

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const replayLanding = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAnimKey((prev) => prev + 1);
  };

  const handleFile = (file: File) => {
    if (file && (file.type.startsWith('image/') || file.name.endsWith('.svg') || file.name.endsWith('.png') || file.name.endsWith('.jpg'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const dataUrl = e.target.result as string;
          if (file.name.includes('17') || file.name.toLowerCase().includes('hang') || file.name.toLowerCase().includes('king')) {
            setCustomHangingMascotUrl(dataUrl);
            try {
              localStorage.setItem(STORAGE_HANGING_MASCOT_KEY, dataUrl);
            } catch {
              // Ignore
            }
          } else if (file.name.includes('2') || file.name.toLowerCase().includes('rocket') || file.name.toLowerCase().includes('mascot')) {
            setCustomMascotUrl(dataUrl);
            try {
              localStorage.setItem(STORAGE_MASCOT_KEY, dataUrl);
            } catch {
              // Ignore
            }
          } else if (file.name.toLowerCase().includes('burger') && (file.name.toLowerCase().includes('photo') || file.name.toLowerCase().includes('bg') || file.name.toLowerCase().includes('real'))) {
            setBurgerBgUrl(dataUrl);
            try {
              localStorage.setItem(STORAGE_BURGER_BG_KEY, dataUrl);
            } catch {
              // Ignore
            }
          } else {
            setCustomLogoUrl(dataUrl);
            try {
              localStorage.setItem(STORAGE_KEY, dataUrl);
            } catch {
              // Ignore
            }
          }
          replayLanding();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const cycleGradient = () => {
    setGradientIdx((prev) => (prev + 1) % GRADIENTS.length);
  };

  const resetAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomLogoUrl(null);
    setCustomMascotUrl(null);
    setCustomHangingMascotUrl(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_MASCOT_KEY);
      localStorage.removeItem(STORAGE_HANGING_MASCOT_KEY);
    } catch {
      // Ignore
    }
    replayLanding();
  };

  return (
    <div
      id="brand-canvas"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center select-none transition-all duration-700"
      style={{
        background: GRADIENTS[gradientIdx],
      }}
    >
      {/* Hidden File Input for uploading custom images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.svg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Main Front Landing Page Layer that slides up slightly when revealing form */}
      <motion.div
        id="main-landing-view"
        animate={{
          y: isNoticeOpen ? '-20%' : '0%',
          opacity: isNoticeOpen ? 0.35 : 1,
          scale: isNoticeOpen ? 0.95 : 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-full flex flex-col items-center justify-center px-4 py-6"
      >
        {/* Main Center Composition */}
        <div
          id="center-brand-lockup"
          className={`relative flex flex-col items-center justify-center transition-all duration-300 p-2 sm:p-4 rounded-3xl ${
            isDragging ? 'scale-105 ring-2 ring-[#7B181B]/40 bg-[#FAF6EE]/50' : ''
          }`}
        >
          {/* Animated Rocket Burger Mascot */}
          <div
            onClick={() => fileInputRef.current?.click()}
            title="Click to change rocket mascot"
            className="w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 mb-0 sm:mb-1 z-10 cursor-pointer"
          >
            <RocketMascot customUrl={customMascotUrl} animationKey={animKey} />
          </div>

          {/* One Burger Script Logo with elegant spray graffiti reveal */}
          <div
            onClick={replayLanding}
            title="Click to replay spray-paint reveal"
            className="w-[280px] h-[210px] sm:w-[380px] sm:h-[280px] md:w-[480px] md:h-[350px] lg:w-[540px] lg:h-[400px] flex items-center justify-center cursor-pointer"
          >
            <OneBurgerLogo customUrl={customLogoUrl} animationKey={animKey} />
          </div>

          {/* Minimalist Coming Soon Button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2 sm:mt-3 z-20"
          >
            <button
              id="btn-coming-soon"
              onClick={() => setIsNoticeOpen(true)}
              className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide text-[#6E1418] border border-[#6E1418]/25 bg-[#FAF6EE]/40 hover:bg-[#FAF6EE]/80 hover:border-[#6E1418]/50 active:scale-95 transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6E1418]/70 group-hover:bg-[#6E1418] transition-colors" />
              <span>Coming Soon</span>
              <span className="text-[10px] text-[#6E1418]/60 group-hover:text-[#6E1418] transition-colors">
                • Notify me
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Full-Page Slide-Up "Get Notified" View (with Burger Photo Background support) */}
      <SlideUpNoticePage
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        burgerBgUrl={burgerBgUrl}
        onUpdateBurgerBg={(url) => setBurgerBgUrl(url)}
        logoUrl={customLogoUrl}
        hangingMascotUrl={customHangingMascotUrl}
        onUpdateHangingMascotUrl={(url) => setCustomHangingMascotUrl(url)}
      />

      {/* Drag & Drop Visual Cue overlay */}
      {isDragging && (
        <div className="pointer-events-none absolute inset-8 border-2 border-dashed border-[#781517]/40 rounded-3xl flex items-center justify-center bg-[#FAF6EE]/60 backdrop-blur-xs z-50">
          <div className="text-center font-medium text-[#781517]">
            <Upload className="w-10 h-10 mx-auto mb-2 opacity-80 animate-bounce" />
            <p className="text-lg">Drop your image to update</p>
          </div>
        </div>
      )}

      {/* Discreet Minimal Controls in Bottom-Right */}
      <div className="absolute bottom-5 right-5 flex items-center gap-2 z-20">
        {/* Replay landing flight button */}
        <button
          id="btn-replay-flight"
          onClick={replayLanding}
          className="w-9 h-9 rounded-full bg-[#FAF6EE]/80 hover:bg-[#FAF6EE] text-[#781517] border border-[#781517]/15 flex items-center justify-center shadow-xs transition-transform active:scale-95"
          aria-label="Replay rocket flight"
          title="Replay landing"
        >
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        </button>

        {(customLogoUrl || customMascotUrl) && (
          <button
            id="btn-reset-assets"
            onClick={resetAll}
            className="w-9 h-9 rounded-full bg-[#FAF6EE]/80 hover:bg-[#FAF6EE] text-[#781517] border border-[#781517]/15 flex items-center justify-center shadow-xs transition-transform active:scale-95"
            title="Reset assets to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          id="btn-upload-file"
          onClick={() => fileInputRef.current?.click()}
          className="w-9 h-9 rounded-full bg-[#FAF6EE]/80 hover:bg-[#FAF6EE] text-[#781517] border border-[#781517]/15 flex items-center justify-center shadow-xs transition-transform active:scale-95"
          aria-label="Upload image"
          title="Upload image file"
        >
          <Upload className="w-4 h-4" />
        </button>

        <button
          id="btn-switch-gradient"
          onClick={cycleGradient}
          className="w-9 h-9 rounded-full bg-[#FAF6EE]/80 hover:bg-[#FAF6EE] text-[#781517] border border-[#781517]/15 flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
          aria-label="Cycle #f2e7d1 gradient variation"
          title="Change gradient tone"
        >
          <Palette className="w-4 h-4" />
        </button>

        {/* Lock site button */}
        <button
          id="btn-lock-site"
          onClick={() => {
            setIsUnlocked(false);
          }}
          className="w-9 h-9 rounded-full bg-[#FAF6EE]/80 hover:bg-[#FAF6EE] text-[#781517] border border-[#781517]/15 flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
          aria-label="Lock site with password"
          title="Lock site (requires 1970)"
        >
          <Lock className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Password Gate Screen (Requires 1970 to enter) */}
      <AnimatePresence>
        {!isUnlocked && (
          <PasswordGate
            customLogoUrl={customLogoUrl}
            onUnlock={() => setIsUnlocked(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
