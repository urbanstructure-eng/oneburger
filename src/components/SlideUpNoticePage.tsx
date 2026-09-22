import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Check, Sparkles } from 'lucide-react';
import { OneBurgerLogo } from './OneBurgerLogo';
import { HangingMascot } from './HangingMascot';
import { UberEatsLogo, SkipTheDishesLogo } from './DeliveryPartnerLogos';
import { ScooterMascot } from './ScooterMascot';

interface SlideUpNoticePageProps {
  isOpen: boolean;
  onClose: () => void;
  burgerBgUrl?: string | null;
  onUpdateBurgerBg?: (url: string) => void;
  logoUrl?: string | null;
  hangingMascotUrl?: string | null;
  onUpdateHangingMascotUrl?: (url: string) => void;
}

const STORAGE_BURGER_BG = 'oneburger_form_burger_bg';

export const SlideUpNoticePage: React.FC<SlideUpNoticePageProps> = ({
  isOpen,
  onClose,
  burgerBgUrl,
  onUpdateBurgerBg,
  logoUrl,
  hangingMascotUrl,
  onUpdateHangingMascotUrl,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localBurgerImg, setLocalBurgerImg] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_BURGER_BG) || '/burger_collage.jpg';
    } catch {
      return '/burger_collage.jpg';
    }
  });

  const bgFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const testImg = new Image();
    testImg.src = '/burger_bg.png';
    testImg.onload = () => {
      setLocalBurgerImg('/burger_bg.png');
    };
  }, []);

  const activeBurgerBg = burgerBgUrl || localBurgerImg || '/burger_collage.jpg';

  const handleBurgerFile = (file: File) => {
    if (file && (file.type.startsWith('image/') || file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.webp'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const dataUrl = e.target.result as string;
          setLocalBurgerImg(dataUrl);
          onUpdateBurgerBg?.(dataUrl);
          try {
            localStorage.setItem(STORAGE_BURGER_BG, dataUrl);
          } catch {
            // Ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      const existing = JSON.parse(localStorage.getItem('oneburger_waitlist') || '[]');
      existing.push({
        name: name.trim(),
        email: email.trim(),
        date: new Date().toISOString(),
      });
      localStorage.setItem('oneburger_waitlist', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
    }, 600);
  };

  // Close when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <motion.div
      id="slide-up-form-panel"
      initial={false}
      animate={{
        y: isOpen ? '0%' : '100%',
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={(e) => {
        // Clicking backdrop outside the card closes the form
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      className={`fixed inset-0 z-40 w-full h-full overflow-y-auto flex flex-col items-center justify-center py-6 px-4 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        backgroundColor: '#F5F1E9',
        backgroundImage: 'radial-gradient(circle at 50% 40%, #FAF7F0 0%, #F5F1E9 60%, #ECE7DC 100%)',
      }}
    >
      {/* Hidden file input for uploading the burger background if user wants custom */}
      <input
        ref={bgFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleBurgerFile(e.target.files[0]);
          }
        }}
      />

      {/* Hanging King Burger Mascot hanging from the top ceiling - ONLY on the form page */}
      <HangingMascot
        isOpen={isOpen}
        customUrl={hangingMascotUrl}
        onUpdateMascotUrl={onUpdateHangingMascotUrl}
      />

      {/* Unified Center Content Area: Form Card + Closely Attached Available Soon Delivery Logos */}
      <div className="relative z-30 w-full max-w-sm sm:max-w-md flex flex-col items-center text-center pointer-events-auto mt-7 sm:mt-9">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full bg-white/95 backdrop-blur-md rounded-3xl pt-2 px-7 pb-7 sm:pt-2 sm:px-9 sm:pb-9 border border-[#70121D]/15 shadow-[0_20px_50px_rgba(112,18,29,0.1)] text-[#4A0A0D]"
          >
            {/* Close Button on top right of form card */}
            <button
              id="btn-form-card-close-success"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-[#70121D]/10 hover:bg-[#70121D]/25 active:bg-[#70121D]/35 text-[#70121D] flex items-center justify-center transition-colors cursor-pointer pointer-events-auto"
              aria-label="Close form"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>

            {/* Brand Logo overlapping top edge of form card */}
            <div className="relative z-20 w-44 h-26 sm:w-52 sm:h-30 mx-auto -mt-13 sm:-mt-15 mb-2 flex items-center justify-center filter drop-shadow-[0_6px_14px_rgba(112,18,29,0.16)]">
              <OneBurgerLogo customUrl={logoUrl} className="w-full h-full object-contain" />
            </div>

            <div className="w-14 h-14 rounded-full bg-[#70121D] text-[#FAF6EE] flex items-center justify-center mx-auto mb-3 shadow-md">
              <Check className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-[#70121D] tracking-tight mb-2">
              You're On The VIP List!
            </h2>
            <p className="text-sm text-[#70121D]/85 leading-relaxed max-w-xs mx-auto mb-6">
              We've reserved your first taste. You'll receive opening coordinates and exclusive launch perks.
            </p>
            <button
              id="btn-return-home"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              className="px-7 py-2.5 rounded-full bg-[#70121D] text-[#FAF6EE] font-bold text-sm hover:bg-[#580D16] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Return to Main
            </button>
          </motion.div>
        ) : (
          <div className="relative w-full bg-white/95 backdrop-blur-md rounded-3xl pt-2 px-6 pb-6 sm:pt-2 sm:px-7 sm:pb-7 border border-[#70121D]/15 shadow-[0_20px_50px_rgba(112,18,29,0.1)] text-[#4A0A0D]">
            {/* Close Button on top right of the form */}
            <button
              id="btn-form-card-close"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-3.5 right-3.5 z-50 w-10 h-10 rounded-full bg-[#70121D]/10 hover:bg-[#70121D]/25 active:bg-[#70121D]/35 text-[#70121D] flex items-center justify-center transition-colors cursor-pointer pointer-events-auto"
              aria-label="Close form"
              title="Close"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>

            {/* The One Burger Logo on TOP of the form with overlapping badge effect */}
            <div className="relative z-20 w-44 h-26 sm:w-52 sm:h-30 mx-auto -mt-13 sm:-mt-15 mb-2 flex items-center justify-center filter drop-shadow-[0_6px_14px_rgba(112,18,29,0.16)]">
              <OneBurgerLogo customUrl={logoUrl} className="w-full h-full object-contain" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#70121D]/10 text-[#70121D] text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3 text-[#70121D]" />
              <span>Opening Soon</span>
            </div>

            <h2 className="text-2xl sm:text-[26px] font-black text-[#70121D] tracking-tight mb-1">
              Get Notified
            </h2>
            <p className="text-xs text-[#70121D]/80 leading-relaxed max-w-xs mx-auto mb-4">
              Be the first to taste One Burger. Drop your email for opening alerts & first-order rewards.
            </p>

            <form onSubmit={handleSubmit} className="space-y-2.5 text-left">
              <div>
                <label htmlFor="input-name" className="block text-[11px] font-bold text-[#70121D] mb-0.5 ml-1">
                  Name (optional)
                </label>
                <input
                  id="input-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF6EE]/70 border border-[#70121D]/25 text-[#4A0A0D] placeholder-[#70121D]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#70121D] transition-all shadow-xs"
                />
              </div>

              <div>
                <label htmlFor="input-email" className="block text-[11px] font-bold text-[#70121D] mb-0.5 ml-1">
                  Email Address <span className="text-[#70121D]">*</span>
                </label>
                <input
                  id="input-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF6EE]/70 border border-[#70121D]/25 text-[#4A0A0D] placeholder-[#70121D]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#70121D] transition-all shadow-xs"
                />
              </div>

              <button
                id="btn-submit-vip-form"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-1.5 py-2.5 px-5 rounded-xl bg-[#70121D] text-[#FAF6EE] font-bold text-sm hover:bg-[#580D16] transition-all transform active:scale-[0.99] shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer border border-[#FAF6EE]/20"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-[#FAF6EE] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Notify Me at Launch</span>
                )}
              </button>
            </form>

            <p className="text-[10px] text-[#70121D]/65 mt-3">
              No spam. Only hot launch announcements.
            </p>
          </div>
        )}

        {/* Available Soon On + Delivery Logos */}
        <div className="w-full pt-4 pb-2 flex flex-col items-center justify-center gap-1.5 text-center text-xs font-semibold text-[#70121D]">
          <div className="text-[10.5px] uppercase tracking-widest text-[#70121D]/75 font-semibold">
            Available Soon On
          </div>
          <div className="flex items-center justify-center gap-5 sm:gap-6 opacity-95">
            <div className="flex items-center justify-center transition-transform hover:scale-105" title="SkipTheDishes">
              <SkipTheDishesLogo className="h-5 sm:h-5.5 w-auto" color="#70121D" />
            </div>
            <span className="h-3.5 w-px bg-[#70121D]/30" />
            <div className="flex items-center justify-center transition-transform hover:scale-105" title="Uber Eats">
              <UberEatsLogo className="h-3.5 sm:h-4 w-auto" color="#70121D" />
            </div>
          </div>

          {/* Delivery Scooter Mascot */}
          <div className="mt-1 mb-0.5 w-full flex items-center justify-center">
            <ScooterMascot isParentOpen={isOpen} />
          </div>

          <span className="text-[9.5px] sm:text-[10px] text-[#70121D]/60 font-normal tracking-wide mt-0.5">
            One Burger • Vintage Griddled Goodness
          </span>
        </div>
      </div>
    </motion.div>
  );
};
