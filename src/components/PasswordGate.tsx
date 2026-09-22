import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { OneBurgerLogo } from './OneBurgerLogo';
import juicyBurgerAndFriesImg from '../assets/images/burger_and_fries_bg_1790104402796.jpg';

interface PasswordGateProps {
  onUnlock: () => void;
  customLogoUrl?: string | null;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock, customLogoUrl }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsSubmitting(true);
    // Required password: 1970
    if (password.trim() === '1970') {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setIsSubmitting(false);
      setPassword('');
    }
  };

  return (
    <div
      id="password-gate-screen"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 select-none overflow-hidden"
    >
      {/* Full-Screen Juicy Burger & Crispy Fries Backdrop */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          id="password-gate-burger-bg"
          src={juicyBurgerAndFriesImg}
          alt="Juicy Gourmet One Burger with Crispy Golden Fries"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform animate-subtle-zoom"
          onError={(e) => {
            e.currentTarget.src = '/burger_and_fries.jpg';
          }}
        />
        {/* Cinematic contrast overlay to keep form card crisp & appetizing */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Decorative Brand watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
        <span className="text-[28vw] font-black text-white leading-none select-none tracking-tighter">
          1970
        </span>
      </div>

      {/* Centered Glassmorphic Password Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#FAF6EE]/92 backdrop-blur-xl border border-white/50 shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-black/10"
      >
        {/* One Burger Logo that appears on the Home Page above the form */}
        <div className="w-full max-w-[270px] sm:max-w-[310px] h-[95px] sm:h-[110px] flex items-center justify-center mb-1">
          <OneBurgerLogo
            customUrl={customLogoUrl}
            className="w-full h-full"
          />
        </div>

        {/* Header Label */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#70121D]/10 text-[#70121D] text-[10.5px] font-bold tracking-[0.16em] uppercase mb-2">
          <Lock className="w-3 h-3 stroke-[2.4]" />
          <span>Private Access</span>
        </div>

        <p className="text-xs sm:text-[13px] text-[#70121D]/80 mb-5 max-w-xs leading-relaxed font-medium">
          Please enter password to view site.
        </p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-3">
          <motion.div
            animate={error ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full"
          >
            <input
              id="input-site-password"
              type="password"
              inputMode="numeric"
              maxLength={12}
              autoFocus
              placeholder="••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              className={`w-full h-12 px-4 text-center tracking-[0.35em] text-lg sm:text-xl font-bold text-[#70121D] rounded-xl bg-white/95 border transition-all duration-200 outline-none placeholder:tracking-normal placeholder:font-normal placeholder:text-xs placeholder:text-[#70121D]/35 ${
                error
                  ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/70'
                  : 'border-[#70121D]/25 focus:border-[#70121D] focus:ring-2 focus:ring-[#70121D]/20 shadow-inner'
              }`}
            />
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-1.5 text-xs text-red-600 font-semibold"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect password. Please try again.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enter Button */}
          <button
            id="btn-unlock-site"
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full h-11 mt-1 rounded-xl bg-[#70121D] hover:bg-[#580d16] disabled:opacity-45 disabled:pointer-events-none text-[#FAF6EE] font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Enter Site</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <span className="mt-4 text-[10px] text-[#70121D]/55 tracking-wider uppercase font-semibold">
          Protected • One Burger 1970
        </span>
      </motion.div>
    </div>
  );
};
