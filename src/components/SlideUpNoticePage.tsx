import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Check, Sparkles } from 'lucide-react';
import { OneBurgerLogo } from './OneBurgerLogo';
import { UberEatsLogoWhite, SkipTheDishesLogoWhite } from './DeliveryPartnerLogos';

interface SlideUpNoticePageProps {
  isOpen: boolean;
  onClose: () => void;
  burgerBgUrl?: string | null;
  onUpdateBurgerBg?: (url: string) => void;
  logoUrl?: string | null;
}

const STORAGE_BURGER_BG = 'oneburger_form_burger_bg';

export const SlideUpNoticePage: React.FC<SlideUpNoticePageProps> = ({
  isOpen,
  onClose,
  burgerBgUrl,
  onUpdateBurgerBg,
  logoUrl,
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
      className="fixed inset-0 z-40 w-full h-full bg-[#140809] text-[#FAF6EE] overflow-y-auto flex flex-col items-center justify-center py-6 px-4 select-none"
    >
      {/* Background Burger Collage - Full clarity and appetite appeal */}
      <div
        id="form-burger-background"
        className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            id="revealed-burger-photo"
            src={activeBurgerBg}
            alt="One Burger Delicious Burger Collage"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-100 filter brightness-[0.88] contrast-[1.05]"
          />
          {/* Subtle cinematic vignette for focus on the center form card */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70" />
        </div>
      </div>

      {/* Hidden file input for uploading the burger background */}
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

      {/* Unified Center Content Area: Form Card + Closely Attached Available Soon Delivery Logos */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center text-center">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full bg-[#FAF6EE]/92 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-[#FAF6EE]/60 shadow-[0_25px_65px_rgba(0,0,0,0.65)] text-[#4A0A0D]"
          >
            {/* Close Button on top right of form card */}
            <button
              id="btn-form-card-close-success"
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#6E1418]/10 hover:bg-[#6E1418]/20 text-[#6E1418] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close form"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Brand Logo on top of success card */}
            <div className="w-32 h-20 mx-auto mb-2 flex items-center justify-center">
              <OneBurgerLogo customUrl={logoUrl} className="w-full h-full" />
            </div>

            <div className="w-14 h-14 rounded-full bg-[#6E1418] text-[#FAF6EE] flex items-center justify-center mx-auto mb-3 shadow-md">
              <Check className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-[#6E1418] tracking-tight mb-2">
              You're On The VIP List!
            </h2>
            <p className="text-sm text-[#6E1418]/85 leading-relaxed max-w-xs mx-auto mb-6">
              We've reserved your first taste. You'll receive opening coordinates and exclusive launch perks.
            </p>
            <button
              id="btn-return-home"
              onClick={handleClose}
              className="px-7 py-2.5 rounded-full bg-[#6E1418] text-[#FAF6EE] font-bold text-sm hover:bg-[#540E12] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Return to Main
            </button>
          </motion.div>
        ) : (
          <div className="relative w-full bg-[#FAF6EE]/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#FAF6EE]/60 shadow-[0_25px_70px_rgba(0,0,0,0.7)] text-[#4A0A0D]">
            {/* Close Button on top right of the form */}
            <button
              id="btn-form-card-close"
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#6E1418]/10 hover:bg-[#6E1418]/20 text-[#6E1418] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close form"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* The One Burger Logo on TOP of the form */}
            <div className="w-32 h-20 sm:w-36 sm:h-22 mx-auto -mt-1 mb-0.5 flex items-center justify-center">
              <OneBurgerLogo customUrl={logoUrl} className="w-full h-full" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#6E1418]/10 text-[#6E1418] text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3 text-[#6E1418]" />
              <span>Opening Soon</span>
            </div>

            <h2 className="text-2xl sm:text-[26px] font-black text-[#6E1418] tracking-tight mb-1">
              Get Notified
            </h2>
            <p className="text-xs text-[#6E1418]/80 leading-relaxed max-w-xs mx-auto mb-4">
              Be the first to taste One Burger. Drop your email for opening alerts & first-order rewards.
            </p>

            <form onSubmit={handleSubmit} className="space-y-2.5 text-left">
              <div>
                <label htmlFor="input-name" className="block text-[11px] font-bold text-[#6E1418] mb-0.5 ml-1">
                  Name (optional)
                </label>
                <input
                  id="input-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/95 border border-[#6E1418]/25 text-[#4A0A0D] placeholder-[#6E1418]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#6E1418] transition-all shadow-xs"
                />
              </div>

              <div>
                <label htmlFor="input-email" className="block text-[11px] font-bold text-[#6E1418] mb-0.5 ml-1">
                  Email Address <span className="text-[#6E1418]">*</span>
                </label>
                <input
                  id="input-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/95 border border-[#6E1418]/25 text-[#4A0A0D] placeholder-[#6E1418]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#6E1418] transition-all shadow-xs"
                />
              </div>

              <button
                id="btn-submit-vip-form"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-1.5 py-2.5 px-5 rounded-xl bg-[#6E1418] text-[#FAF6EE] font-bold text-sm hover:bg-[#520B0E] transition-all transform active:scale-[0.99] shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer border border-[#FAF6EE]/20"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-[#FAF6EE] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Notify Me at Launch</span>
                )}
              </button>
            </form>

            <p className="text-[10px] text-[#6E1418]/65 mt-3">
              No spam. Only hot launch announcements.
            </p>
          </div>
        )}

        {/* Pushed Closer to Form: Available Soon On + Delivery Logos */}
        <div className="w-full pt-4 pb-2 flex flex-col items-center justify-center gap-1.5 text-center text-xs font-semibold text-white drop-shadow-md">
          <div className="text-[10.5px] uppercase tracking-widest text-white/80 font-medium">
            Available Soon On
          </div>
          <div className="flex items-center justify-center gap-5 sm:gap-6 opacity-95">
            <div className="flex items-center justify-center transition-transform hover:scale-105" title="SkipTheDishes">
              <SkipTheDishesLogoWhite className="h-4.5 sm:h-5 w-auto drop-shadow-md" />
            </div>
            <span className="h-3.5 w-px bg-white/30" />
            <div className="flex items-center justify-center transition-transform hover:scale-105" title="Uber Eats">
              <UberEatsLogoWhite className="h-4.5 sm:h-5 w-auto drop-shadow-md" />
            </div>
          </div>
          <span className="text-[9.5px] sm:text-[10px] text-white/60 font-normal tracking-wide mt-1">
            One Burger • Vintage Griddled Goodness
          </span>
        </div>
      </div>
    </motion.div>
  );
};
