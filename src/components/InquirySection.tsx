import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

export const InquirySection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Residential',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="inquire"
      className="py-24 px-6 sm:px-8 lg:px-12 bg-[#F2E7D1]/50 border-t border-[#1E1D1A]/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#1E1D1A]/60">
              Initiate Dialogue
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1D1A] tracking-tight">
              Begin a Spatial Commission.
            </h2>
            <p className="text-[#1E1D1A]/80 text-base leading-relaxed">
              We collaborate with discerning private clients, cultural institutions, and developers who value permanence, tactile honesty, and architectural reserve.
            </p>

            <div className="pt-6 space-y-4 border-t border-[#1E1D1A]/10 text-sm text-[#1E1D1A]/80">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1E1D1A]" />
                <span className="font-mono">atelier@urbanstructure.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#1E1D1A]" />
                <span>482 Broome Street, New York, NY 10013</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1E1D1A]" />
                <span className="font-mono">+1 (212) 890-3410</span>
              </div>
            </div>
          </div>

          {/* Right form card */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF6EE] rounded-3xl border border-[#1E1D1A]/12 p-8 sm:p-10 shadow-sm">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#1E1D1A] text-[#FAF6EE] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#1E1D1A]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#1E1D1A]/70 max-w-md mx-auto">
                    Thank you for reaching out. A partner from Urban Structure will review your architectural brief and contact you within two business days.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full border border-[#1E1D1A]/20 text-xs font-semibold uppercase tracking-wider text-[#1E1D1A] hover:bg-[#F2E7D1]/50"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1D1A]/70 mb-1.5">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Helena Vance"
                        className="w-full px-4 py-3 rounded-xl bg-[#F2E7D1]/30 border border-[#1E1D1A]/15 focus:outline-none focus:border-[#1E1D1A] text-sm text-[#1E1D1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1D1A]/70 mb-1.5">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="helena@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F2E7D1]/30 border border-[#1E1D1A]/15 focus:outline-none focus:border-[#1E1D1A] text-sm text-[#1E1D1A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1D1A]/70 mb-1.5">
                      Typology
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Residential', 'Cultural / Civic', 'Commercial'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                            formData.projectType === type
                              ? 'bg-[#1E1D1A] text-[#FAF6EE] border-[#1E1D1A]'
                              : 'bg-[#F2E7D1]/30 text-[#1E1D1A]/80 border-[#1E1D1A]/15 hover:border-[#1E1D1A]/40'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1D1A]/70 mb-1.5">
                      Brief & Site Location
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the scale, site conditions, anticipated timeline, and architectural ambitions..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F2E7D1]/30 border border-[#1E1D1A]/15 focus:outline-none focus:border-[#1E1D1A] text-sm text-[#1E1D1A]"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-inquiry-btn"
                    className="w-full py-3.5 rounded-xl bg-[#1E1D1A] text-[#FAF6EE] text-xs font-semibold uppercase tracking-widest hover:bg-[#33302B] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Transmit Commission Brief</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
