import React from 'react';
import { LogoConfig } from '../types';
import { BrandLogo } from './BrandLogo';
import { SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  logoConfig: LogoConfig;
  onOpenLogoCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  logoConfig,
  onOpenLogoCustomizer,
}) => {
  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F2E7D1]/75 border-b border-[#1E1D1A]/10 transition-all"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Left */}
        <a
          href="#"
          id="navbar-brand-link"
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-[#FAF6EE] border border-[#1E1D1A]/15 flex items-center justify-center overflow-hidden p-1 shadow-xs transition-transform group-hover:scale-105">
            <BrandLogo config={logoConfig} size="sm" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-wider text-base text-[#1E1D1A] uppercase leading-none">
              Urban Structure
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#1E1D1A]/60 mt-1">
              Atelier & Architecture
            </span>
          </div>
        </a>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-[#1E1D1A]/70">
          <a
            href="#vision"
            className="hover:text-[#1E1D1A] transition-colors relative py-1"
          >
            Vision
          </a>
          <a
            href="#works"
            className="hover:text-[#1E1D1A] transition-colors relative py-1"
          >
            Works
          </a>
          <a
            href="#palette"
            className="hover:text-[#1E1D1A] transition-colors relative py-1"
          >
            Palette #f2e7d1
          </a>
          <a
            href="#principles"
            className="hover:text-[#1E1D1A] transition-colors relative py-1"
          >
            Principles
          </a>
          <a
            href="#inquire"
            className="hover:text-[#1E1D1A] transition-colors relative py-1"
          >
            Contact
          </a>
        </nav>

        {/* Right CTA / Logo Switcher */}
        <div className="flex items-center gap-3">
          <button
            id="open-logo-modal-nav-btn"
            onClick={onOpenLogoCustomizer}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#1E1D1A]/20 bg-[#FAF6EE]/80 hover:bg-[#FAF6EE] text-[#1E1D1A] text-xs font-medium transition-all shadow-xs hover:border-[#1E1D1A]/40"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Change / Upload Logo</span>
            <span className="sm:hidden">Logo</span>
          </button>

          <a
            href="#inquire"
            id="inquire-cta-btn"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E1D1A] text-[#FAF6EE] text-xs font-semibold uppercase tracking-wider hover:bg-[#322F2A] transition-colors shadow-xs"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
