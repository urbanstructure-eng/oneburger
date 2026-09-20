import React from 'react';
import { Layers, Compass, Feather, Square } from 'lucide-react';

export const EssenceSection: React.FC = () => {
  const principles = [
    {
      icon: Square,
      number: '01',
      title: 'Structural Reduction',
      description: 'Stripping back decorative excess until only the essential geometry, load paths, and raw light remain.',
    },
    {
      icon: Feather,
      number: '02',
      title: 'Tactile Materiality',
      description: 'Honoring honest materials—unpolished travertine, lime plaster in #f2e7d1, raw oak, and hand-cast bronze.',
    },
    {
      icon: Layers,
      number: '03',
      title: 'Acoustic & Spatial Calm',
      description: 'Designing volumes that decelerate human rhythm, diffusing daylight softly through organic linen textures.',
    },
    {
      icon: Compass,
      number: '04',
      title: 'Topographic Resonance',
      description: 'Embedding each structure into its native terrain so the architecture appears to emerge from the stone itself.',
    },
  ];

  return (
    <section
      id="vision"
      className="py-24 px-6 sm:px-8 lg:px-12 bg-[#F2E7D1]/30 border-t border-[#1E1D1A]/10 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Vision Statement */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#1E1D1A]/60">
              Studio Manifesto
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1D1A] tracking-tight leading-tight">
              Quiet spaces for deep presence.
            </h2>
            <p className="text-lg text-[#1E1D1A]/80 leading-relaxed font-normal">
              At Urban Structure, we reject transient architectural trends. Our practice is dedicated to timeless spatial compositions that harmonize raw natural geometry with refined craftsmanship.
            </p>
            <div className="pt-4 p-6 rounded-2xl bg-[#FAF6EE] border border-[#1E1D1A]/10 space-y-2">
              <span className="text-xs font-mono uppercase text-[#1E1D1A]/50">Brand Philosophy</span>
              <p className="font-serif-editorial italic text-xl text-[#1E1D1A]">
                “The true measure of a building is the quality of light it captures and the peace it grants to the occupant.”
              </p>
              <p className="text-xs font-semibold text-[#1E1D1A]/70 uppercase tracking-wider pt-2">
                Urban Structure Atelier • Est. 2018
              </p>
            </div>
          </div>

          {/* Right Column: 4 Core Disciplines */}
          <div id="principles" className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-7 rounded-2xl bg-[#FAF6EE] border border-[#1E1D1A]/10 hover:border-[#1E1D1A]/30 transition-all shadow-xs flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-[#1E1D1A]/40 tracking-wider">
                        {item.number}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#F2E7D1] border border-[#1E1D1A]/10 flex items-center justify-center text-[#1E1D1A] transition-transform group-hover:scale-110">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#1E1D1A] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#1E1D1A]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
