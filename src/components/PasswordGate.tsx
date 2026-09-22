import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { OneBurgerLogo } from './OneBurgerLogo';

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
      try {
        sessionStorage.setItem('oneburger_access_granted_1970', 'true');
      } catch {
        // ignore
      }
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 select-none"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #FAF6EE 0%, #F2E7D1 55%, #E5D5BB 100%)',
      }}
    >
      {/* Decorative background brand element */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <span className="text-[28vw] font-black text-[#70121D] leading-none select-none tracking-tighter">
          1970
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm sm:max-w-md flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#FAF6EE]/90 backdrop-blur-md border border-[#70121D]/15 shadow-[0_16px_40px_rgba(112,18,29,0.08)]"
      >
        {/* Same One Burger Logo that appears on the Home Page above the form */}
        <div className="w-full max-w-[270px] sm:max-w-[310px] h-[95px] sm:h-[110px] flex items-center justify-center mb-1">
          <OneBurgerLogo
            customUrl={customLogoUrl}
            className="w-full h-full"
          />
        </div>

        {/* Header Label */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#70121D]/8 text-[#70121D] text-[10.5px] font-bold tracking-[0.16em] uppercase mb-2">
          <Lock className="w-3 h-3 stroke-[2.4]" />
          <span>Private Access</span>
        </div>

        <p className="text-xs sm:text-[13px] text-[#70121D]/75 mb-5 max-w-xs leading-relaxed">
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
                  ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/60'
                  : 'border-[#70121D]/20 focus:border-[#70121D] focus:ring-2 focus:ring-[#70121D]/15'
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
                className="flex items-center gap-1.5 text-xs text-red-600 font-medium"
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
            className="w-full h-11 mt-1 rounded-xl bg-[#70121D] hover:bg-[#580d16] disabled:opacity-45 disabled:pointer-events-none text-[#FAF6EE] font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Enter Site</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <span className="mt-4 text-[10px] text-[#70121D]/45 tracking-wider uppercase font-medium">
          Protected • One Burger
        </span>
      </motion.div>
    </div>
  );
};
