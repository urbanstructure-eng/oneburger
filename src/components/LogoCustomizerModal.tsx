import React, { useRef } from 'react';
import { LogoConfig, LogoVariant } from '../types';
import { Upload, X, RotateCcw, Sliders, Check, Sparkles } from 'lucide-react';

interface LogoCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LogoConfig;
  onChange: (newConfig: LogoConfig) => void;
}

export const LogoCustomizerModal: React.FC<LogoCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange({
          ...config,
          variant: 'custom',
          customUrl: result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const setVariant = (variant: LogoVariant) => {
    onChange({ ...config, variant });
  };

  const handleReset = () => {
    onChange({
      variant: 'generated',
      customUrl: null,
      scale: 1,
      contrast: 'charcoal',
      showFrame: true,
    });
  };

  return (
    <div
      id="logo-customizer-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1D1A]/50 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        id="logo-customizer-card"
        className="w-full max-w-lg bg-[#FAF6EE] text-[#1E1D1A] rounded-2xl border border-[#1E1D1A]/12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E1D1A]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E1D1A] text-[#F2E7D1] flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#1E1D1A]">Logo & Identity Studio</h3>
              <p className="text-xs text-[#1E1D1A]/60">Customize or upload your exact brand mark</p>
            </div>
          </div>
          <button
            id="close-logo-customizer-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#1E1D1A]/60 hover:text-[#1E1D1A] hover:bg-[#1E1D1A]/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Custom Logo Section */}
        <div className="mt-6">
          <label className="block text-xs font-semibold tracking-wider uppercase text-[#1E1D1A]/70 mb-2">
            Upload Your Own Logo
          </label>
          <div
            id="logo-dropzone"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed border-[#1E1D1A]/20 hover:border-[#1E1D1A]/60 hover:bg-[#F2E7D1]/40 rounded-xl p-5 text-center transition-all group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/svg+xml,image/jpeg,image/webp"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="w-10 h-10 rounded-full bg-[#1E1D1A]/5 group-hover:bg-[#1E1D1A]/10 flex items-center justify-center mx-auto mb-2.5 text-[#1E1D1A]">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-[#1E1D1A]">
              Click to select or drag & drop logo
            </p>
            <p className="text-xs text-[#1E1D1A]/50 mt-1">
              Supports SVG, PNG, WebP or JPG (transparent background recommended)
            </p>
          </div>
          {config.customUrl && (
            <div className="mt-2.5 flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-[#EFE4CF] text-[#1E1D1A]">
              <span className="font-medium truncate">Custom logo active</span>
              <button
                onClick={() => onChange({ ...config, customUrl: null, variant: 'generated' })}
                className="text-red-700 hover:underline ml-2"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Preset Brand Variations */}
        <div className="mt-6">
          <label className="block text-xs font-semibold tracking-wider uppercase text-[#1E1D1A]/70 mb-2.5">
            Or Select Brand Mark Variant
          </label>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <button
              id="variant-generated-btn"
              onClick={() => setVariant('generated')}
              className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-2 transition-all ${
                config.variant === 'generated'
                  ? 'border-[#1E1D1A] bg-[#1E1D1A] text-[#F2E7D1]'
                  : 'border-[#1E1D1A]/15 hover:border-[#1E1D1A]/40 bg-[#FAF6EE] text-[#1E1D1A]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium text-center">Studio Emblem</span>
            </button>

            <button
              id="variant-architectural-btn"
              onClick={() => setVariant('architectural')}
              className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-2 transition-all ${
                config.variant === 'architectural'
                  ? 'border-[#1E1D1A] bg-[#1E1D1A] text-[#F2E7D1]'
                  : 'border-[#1E1D1A]/15 hover:border-[#1E1D1A]/40 bg-[#FAF6EE] text-[#1E1D1A]'
              }`}
            >
              <div className="w-4 h-4 border-2 border-current flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-current" />
              </div>
              <span className="text-xs font-medium text-center">Architectural</span>
            </button>

            <button
              id="variant-monogram-btn"
              onClick={() => setVariant('monogram')}
              className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-2 transition-all ${
                config.variant === 'monogram'
                  ? 'border-[#1E1D1A] bg-[#1E1D1A] text-[#F2E7D1]'
                  : 'border-[#1E1D1A]/15 hover:border-[#1E1D1A]/40 bg-[#FAF6EE] text-[#1E1D1A]'
              }`}
            >
              <span className="font-display font-extrabold text-sm">US</span>
              <span className="text-xs font-medium text-center">Monogram</span>
            </button>

            <button
              id="variant-minimalist-btn"
              onClick={() => setVariant('minimalist')}
              className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-2 transition-all ${
                config.variant === 'minimalist'
                  ? 'border-[#1E1D1A] bg-[#1E1D1A] text-[#F2E7D1]'
                  : 'border-[#1E1D1A]/15 hover:border-[#1E1D1A]/40 bg-[#FAF6EE] text-[#1E1D1A]'
              }`}
            >
              <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                <div className="w-2 h-2 bg-current" />
              </div>
              <span className="text-xs font-medium text-center">Geometric</span>
            </button>
          </div>
        </div>

        {/* Scale Slider */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold tracking-wider uppercase text-[#1E1D1A]/70">
              Logo Scale: {Math.round(config.scale * 100)}%
            </label>
            <button
              onClick={() => onChange({ ...config, scale: 1 })}
              className="text-xs text-[#1E1D1A]/60 hover:text-[#1E1D1A] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
          <input
            type="range"
            min="0.7"
            max="1.4"
            step="0.05"
            value={config.scale}
            onChange={(e) => onChange({ ...config, scale: parseFloat(e.target.value) })}
            className="w-full accent-[#1E1D1A] cursor-pointer"
          />
        </div>

        {/* Action Footer */}
        <div className="mt-8 pt-4 border-t border-[#1E1D1A]/10 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs font-medium text-[#1E1D1A]/70 hover:text-[#1E1D1A] transition-colors"
          >
            Restore Default Mark
          </button>
          <button
            id="confirm-logo-settings-btn"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1E1D1A] text-[#FAF6EE] text-sm font-medium hover:bg-[#33302b] transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};
