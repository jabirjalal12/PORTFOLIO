import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

export default function ProjectShowcase({ onSelectProject }) {
  const [activeCat, setActiveCat] = useState('ALL');

  const filtered = activeCat === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeCat);

  return (
    <section id="projects" className="py-24 bg-white/80 backdrop-blur-xl relative border-t border-white/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#F2E4EA]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FA5168] block mb-1">
              ENGINEERED BUILDS & RESEARCH
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#0A192F] tracking-tight">
              FEATURED PROJECTS
            </h2>
            <p className="text-[#334E68] text-xs sm:text-sm font-light mt-1">
              Aero structures & wind tunnel, web pentesting labs, graphic design, and cinematic video edits.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-1 bg-[#FAF6F4] p-1 rounded-2xl border border-[#E8D0DC]">
            {['ALL', 'AERONAUTICAL', 'CYBERSECURITY', 'VIDEO', 'DESIGN', 'SOFTWARE', 'ELECTRONICS'].map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); soundManager.playTick(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeCat === cat
                    ? 'bg-[#FA5168] text-white font-bold shadow-[0_0_10px_rgba(1,47,97,0.4)]'
                    : 'text-[#334E68] hover:text-[#FA5168]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-3xl bg-[#FAF6F4] border border-[#E8D0DC] hover:border-[#FA5168] hover:shadow-[0_10px_40px_rgba(1,47,97,0.15)] transition-all duration-300 overflow-hidden flex flex-col justify-between katana-card"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-top filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E8D0DC] text-[#FA5168] text-[10px] font-mono font-bold">
                    {proj.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E8D0DC] text-[#334E68] text-[10px] font-mono">
                    {proj.badge}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#0A192F] group-hover:text-[#FA5168] transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-[#334E68] text-xs font-light leading-relaxed mt-1.5 line-clamp-2">
                    {proj.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAF6F4] border border-[#E8D0DC] text-[10px] font-mono text-[#7B5568]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playKatanaChime();
                      onSelectProject(proj);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#FAF6F4] hover:bg-[#FA5168] text-[#334E68] hover:text-white border border-[#E8D0DC] hover:border-[#FA5168] font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>INSPECT SPECS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
