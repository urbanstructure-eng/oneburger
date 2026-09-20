import React, { useState } from 'react';
import { PROJECTS } from '../data/brandData';
import { Project } from '../types';
import { ArrowUpRight, Maximize2, X } from 'lucide-react';

export const WorksSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="works"
      className="py-24 px-6 sm:px-8 lg:px-12 bg-[#FAF6EE] border-t border-[#1E1D1A]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1E1D1A]/10">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#1E1D1A]/60">
              Selected Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1D1A] tracking-tight mt-1">
              Monolithic Works
            </h2>
          </div>
          <p className="text-sm text-[#1E1D1A]/70 max-w-md">
            Explorations in monolithic mass, lime-washed mineral facades, and spatial proportion tuned to daylight.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="group cursor-pointer flex flex-col bg-[#F2E7D1]/30 rounded-2xl border border-[#1E1D1A]/10 overflow-hidden hover:shadow-lg transition-all"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#E7DAC0]">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF6EE]/90 backdrop-blur-xs flex items-center justify-center text-[#1E1D1A] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#1E1D1A]/80 text-[#FAF6EE] text-[10px] font-mono tracking-wider">
                  {project.location}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#1E1D1A]/60 mb-2">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#1E1D1A] group-hover:underline decoration-[#1E1D1A]/40 underline-offset-4">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#1E1D1A]/75 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1E1D1A]/10 flex items-center justify-between text-xs text-[#1E1D1A]/80 font-medium">
                  <span>Footprint: {project.area}</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#1E1D1A]">
                    View Specs <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          id="project-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1D1A]/60 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-3xl bg-[#FAF6EE] rounded-3xl border border-[#1E1D1A]/15 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/9 bg-[#E7DAC0]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#1E1D1A] text-[#FAF6EE] hover:bg-[#33302B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#1E1D1A]/60 border-b border-[#1E1D1A]/10 pb-3">
                <span>{selectedProject.category} • {selectedProject.location}</span>
                <span>Year: {selectedProject.year} • Scale: {selectedProject.area}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E1D1A]">
                {selectedProject.title}
              </h3>

              <p className="text-base text-[#1E1D1A]/80 leading-relaxed font-normal">
                {selectedProject.description}
              </p>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-[#1E1D1A]/60">Finishes: Lime plaster in #F2E7D1, brushed bronze, smoked timber</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-xl bg-[#1E1D1A] text-[#FAF6EE] text-xs font-semibold uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
