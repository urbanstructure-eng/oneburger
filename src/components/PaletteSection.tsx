import React, { useState } from 'react';
import { BRAND_PALETTE } from '../data/brandData';
import { Copy, Check, Info } from 'lucide-react';

export const PaletteSection: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <section
      id="palette"
      className="py-24 px-6 sm:px-8 lg:px-12 bg-[#FAF6EE] border-t border-[#1E1D1A]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1E1D1A]/10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#1E1D1A]/60">
              Color Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1D1A] tracking-tight">
              The #F2E7D1 Brand Palette
            </h2>
            <p className="text-[#1E1D1A]/75 text-base leading-relaxed">
              Formulated as an organic mineral system. The primary #F2E7D1 tone provides a warm, tactile foundation reminiscent of bleached limestone, unspun linen, and soft ambient daylight.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2E7D1]/60 border border-[#1E1D1A]/10 text-xs text-[#1E1D1A]">
            <Info className="w-4 h-4 text-[#1E1D1A]/70 shrink-0" />
            <span>Click any swatch to copy its precise HEX specification</span>
          </div>
        </div>

        {/* Primary Color Hero Card */}
        <div className="mt-12 rounded-3xl bg-[#F2E7D1] border border-[#1E1D1A]/15 p-8 sm:p-12 shadow-[0_20px_40px_-15px_rgba(30,29,26,0.06)] relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#FAF6EE]/50 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EE] text-[#1E1D1A] text-xs font-bold uppercase tracking-wider border border-[#1E1D1A]/10">
                Primary Brand Color
              </div>
              <h3 className="font-display text-4xl sm:text-6xl font-bold text-[#1E1D1A]">
                #F2E7D1
              </h3>
              <p className="text-lg text-[#1E1D1A]/80 font-normal leading-relaxed">
                Warm Linen Cream. The bedrock of our identity, calibrated to pass AA contrast standards against dark charcoal typography while delivering warm tactile composure.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                id="copy-primary-hex-card"
                onClick={() => handleCopy('#F2E7D1')}
                className="px-6 py-3.5 rounded-2xl bg-[#1E1D1A] text-[#FAF6EE] font-mono text-sm font-semibold flex items-center justify-center gap-2.5 hover:bg-[#33302B] transition-colors shadow-sm"
              >
                {copiedHex === '#F2E7D1' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY HEX #F2E7D1</span>
                  </>
                )}
              </button>

              <div className="px-5 py-3 rounded-2xl bg-[#FAF6EE]/80 border border-[#1E1D1A]/10 text-xs font-mono text-[#1E1D1A]/80 flex items-center justify-between gap-4">
                <span>RGB: 242, 231, 209</span>
                <span>•</span>
                <span>HSL: 40°, 53%, 88%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Harmonious Swatches Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_PALETTE.filter(p => !p.isPrimary).map((color) => {
            const isCopied = copiedHex === color.hex;
            return (
              <div
                key={color.hex}
                onClick={() => handleCopy(color.hex)}
                className="group cursor-pointer rounded-2xl border border-[#1E1D1A]/12 bg-[#FAF6EE] p-5 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-full h-24 rounded-xl border border-[#1E1D1A]/15 mb-4 shadow-xs flex items-end justify-end p-2 transition-transform group-hover:scale-[1.02]"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-xs">
                      {color.hex}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-[#1E1D1A]">{color.name}</h4>
                  <p className="text-xs text-[#1E1D1A]/60 font-medium mt-0.5">{color.role}</p>
                  <p className="text-xs text-[#1E1D1A]/70 mt-2 leading-relaxed">
                    {color.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1E1D1A]/10 flex items-center justify-between text-xs font-mono text-[#1E1D1A]/70">
                  <span>{color.hex}</span>
                  <span className="group-hover:text-[#1E1D1A] flex items-center gap-1">
                    {isCopied ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-sans">
                        <Check className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
