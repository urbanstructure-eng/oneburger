import React, { useRef, useState } from 'react';
import { LogoConfig, GradientStyle } from '../types';
import { BrandLogo } from './BrandLogo';
import { Upload, Copy, Check, Sparkles, Compass, Palette } from 'lucide-react';

interface HeroSectionProps {
  logoConfig: LogoConfig;
  activeGradient: GradientStyle;
  gradientPresets: GradientStyle[];
  onSelectGradient: (gradient: GradientStyle) => void;
  onOpenLogoCustomizer: () => void;
  onLogoUpload: (fileUrl: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  logoConfig,
  activeGradient,
  gradientPresets,
  onSelectGradient,
  onOpenLogoCustomizer,
  onLogoUpload,
}) => {
  const [copiedHex, setCopiedHex] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyHex = () => {
    navigator.clipboard.writeText('#F2E7D1');
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type.includes('svg'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onLogoUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onLogoUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] flex flex-col justify-between pt-10 pb-16 px-6 sm:px-8 lg:px-12 transition-all duration-700 overflow-hidden"
      style={{ background: activeGradient.background }}
    >
      {/* Subtle architectural grid lines watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #1E1D1A 1px, transparent 1px), linear-gradient(to bottom, #1E1D1A 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top Meta Bar */}
      <div className="relative max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1D1A]/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#1E1D1A]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#1E1D1A]/80">
            Brand Identity Showcase • Primary Canvas #f2e7d1
          </span>
        </div>

        {/* Copy Primary Hex button */}
        <button
          id="copy-hex-hero-btn"
          onClick={handleCopyHex}
          className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/90 border border-[#1E1D1A]/15 text-[#1E1D1A] text-xs font-mono font-medium hover:bg-[#FAF6EE] transition-all shadow-xs"
          title="Click to copy primary brand hex #F2E7D1"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#F2E7D1] border border-[#1E1D1A]/20" />
          <span>#F2E7D1</span>
          {copiedHex ? (
            <span className="text-emerald-700 flex items-center gap-1 font-sans text-[11px]">
              <Check className="w-3 h-3" /> Copied
            </span>
          ) : (
            <Copy className="w-3 h-3 text-[#1E1D1A]/50 hover:text-[#1E1D1A]" />
          )}
        </button>
      </div>

      {/* Centerpiece Hero Content: The Logo & Clean Minimalist Gradient */}
      <div className="relative max-w-5xl mx-auto w-full my-auto py-12 sm:py-16 text-center flex flex-col items-center">
        {/* Interactive Logo Spotlight Container */}
        <div
          id="hero-logo-spotlight"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={handleDrop}
          className={`relative group cursor-pointer transition-all duration-300 p-6 sm:p-8 rounded-3xl ${
            isDraggingOver
              ? 'ring-2 ring-[#1E1D1A] bg-[#FAF6EE]/80 scale-105'
              : 'hover:bg-[#FAF6EE]/40'
          }`}
          onClick={onOpenLogoCustomizer}
        >
          {/* Ambient subtle glow ring */}
          <div className="absolute -inset-4 rounded-3xl bg-radial from-[#FAF6EE]/70 to-transparent opacity-80 blur-xl pointer-events-none" />

          {/* Logo Mark */}
          <div className="relative z-10 flex flex-col items-center">
            <BrandLogo config={logoConfig} size="hero" />

            {/* Hover overlay hint */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1D1A] text-[#FAF6EE] text-[11px] font-medium shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>Click to adjust scale, mark or upload file</span>
            </div>
          </div>
        </div>

        {/* Hidden drag and drop file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />

        {/* Typography & Brand Statement */}
        <div className="relative mt-8 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EE]/80 border border-[#1E1D1A]/10 text-xs font-semibold tracking-widest uppercase text-[#1E1D1A]/70">
            <Compass className="w-3.5 h-3.5" />
            <span>Monolithic Form & Modernist Space</span>
          </div>

          <h1
            id="brand-primary-headline"
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1E1D1A] leading-[1.08]"
          >
            URBAN STRUCTURE
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#1E1D1A]/75 font-normal max-w-2xl mx-auto leading-relaxed">
            A quiet, modernist architectural studio defined by tactile materials, structural purity, and an organic warm palette centered on <span className="font-mono font-medium text-[#1E1D1A] bg-[#FAF6EE]/80 px-1.5 py-0.5 rounded border border-[#1E1D1A]/10">#f2e7d1</span>.
          </p>

          {/* Quick Action CTA bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              id="hero-upload-logo-btn"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1D1A] text-[#FAF6EE] text-xs font-semibold tracking-wider uppercase hover:bg-[#322F2A] transition-all shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Drop or Upload Your Logo</span>
            </button>

            <button
              id="hero-customizer-btn"
              onClick={onOpenLogoCustomizer}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF6EE]/90 border border-[#1E1D1A]/20 text-[#1E1D1A] text-xs font-semibold tracking-wider uppercase hover:bg-[#FAF6EE] transition-all shadow-xs"
            >
              <span>Explore Variations</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Minimalist Gradient Controller */}
      <div className="relative max-w-7xl mx-auto w-full pt-6 border-t border-[#1E1D1A]/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#1E1D1A]/70 font-medium">
          <Palette className="w-4 h-4 text-[#1E1D1A]" />
          <span>Minimalist #f2e7d1 Gradient Presets:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-center">
          {gradientPresets.map((preset) => {
            const isSelected = activeGradient.id === preset.id;
            return (
              <button
                key={preset.id}
                id={`gradient-preset-${preset.id}`}
                onClick={() => onSelectGradient(preset)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#1E1D1A] text-[#FAF6EE] shadow-xs'
                    : 'bg-[#FAF6EE]/70 hover:bg-[#FAF6EE] text-[#1E1D1A]/80 border border-[#1E1D1A]/15'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ background: preset.background }}
                />
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-[#1E1D1A]/60">
          <span>LAT: 40.7128° N</span>
          <span>•</span>
          <span>LNG: 74.0060° W</span>
        </div>
      </div>
    </section>
  );
};
