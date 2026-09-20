import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Bell } from 'lucide-react';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetNotifiedModal: React.FC<NoticeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubmitting(true);
    // Persist signups in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('oneburger_waitlist') || '[]');
      existing.push({ email: email.trim(), date: new Date().toISOString() });
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
      setEmail('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop overlay */}
          <motion.div
            id="notice-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#340709]/45 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            id="get-notified-card"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#FAF6EE] text-[#4A0A0D] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#701215]/20"
          >
            {/* Close Button */}
            <button
              id="btn-close-notice-modal"
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#701215]/5 hover:bg-[#701215]/10 text-[#701215] flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 18 }}
                  className="w-14 h-14 rounded-full bg-[#701215] text-[#FAF6EE] flex items-center justify-center mx-auto mb-4 shadow-sm"
                >
                  <Check className="w-7 h-7" strokeWidth={2.8} />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#701215] tracking-tight mb-2">
                  You're on the list!
                </h3>
                <p className="text-sm text-[#701215]/80 leading-relaxed max-w-xs mx-auto mb-6">
                  We'll send you an exclusive alert the exact moment One Burger fires up the griddle.
                </p>
                <button
                  id="btn-done-notice-modal"
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-[#701215] text-[#FAF6EE] font-semibold text-sm hover:bg-[#5C0D10] transition-colors shadow-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-[#701215] mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#701215]/10 flex items-center justify-center">
                    <Bell className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">Early Access</span>
                </div>

                <h3 className="text-2xl font-black text-[#701215] tracking-tight mb-2">
                  Get Notified First
                </h3>
                <p className="text-sm text-[#701215]/80 leading-relaxed mb-6">
                  Be the first to taste the launch. Drop your email to receive opening day updates and exclusive perks.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="input-notify-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="input-notify-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#701215]/25 text-[#4A0A0D] placeholder-[#701215]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#701215] transition-all"
                    />
                  </div>

                  <button
                    id="btn-submit-notice-form"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 rounded-xl bg-[#701215] text-[#FAF6EE] font-bold text-sm hover:bg-[#580B0E] transition-all transform active:scale-[0.99] shadow-sm disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-[#FAF6EE] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Notify Me'
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-center text-[#701215]/60 mt-4">
                  No spam ever. Only real launch announcements.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
