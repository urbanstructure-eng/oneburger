import React from 'react';
import { LogoConfig } from '../types';
import { BrandLogo } from './BrandLogo';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  logoConfig: LogoConfig;
}

export const Footer: React.FC<FooterProps> = ({ logoConfig }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#1E1D1A] text-[#FAF6EE] py-16 px-6 sm:px-8 lg:px-12 border-t border-[#FAF6EE]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-[#FAF6EE]/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#FAF6EE] p-1 flex items-center justify-center">
              <BrandLogo config={logoConfig} size="sm" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-wider uppercase block text-[#FAF6EE]">
                Urban Structure
              </span>
              <span className="text-xs text-[#FAF6EE]/60 font-mono">
                Primary Brand Canvas #f2e7d1
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono text-[#FAF6EE]/70">
            <a href="#vision" className="hover:text-[#FAF6EE] transition-colors">Vision</a>
            <a href="#works" className="hover:text-[#FAF6EE] transition-colors">Works</a>
            <a href="#palette" className="hover:text-[#FAF6EE] transition-colors">Palette</a>
            <a href="#inquire" className="hover:text-[#FAF6EE] transition-colors">Contact</a>
          </div>

          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="w-10 h-10 rounded-full border border-[#FAF6EE]/20 hover:border-[#FAF6EE] flex items-center justify-center text-[#FAF6EE] transition-all hover:bg-[#FAF6EE]/10 self-start md:self-auto"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6EE]/50 font-mono">
          <p>© {new Date().getFullYear()} Urban Structure. All architectural intellectual property reserved.</p>
          <div className="flex items-center gap-4">
            <span>Primary Brand Palette: #F2E7D1</span>
            <span>•</span>
            <span>Minimalist Identity System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
