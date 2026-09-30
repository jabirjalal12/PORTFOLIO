import React, { useEffect } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#012F61]/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-[#E8D0DC] shadow-2xl overflow-hidden my-8 animate-[fadeIn_0.3s_ease-out]">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playTick();
            onClose();
          }}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/80 border border-[#E8D0DC] text-[#334E68] hover:text-[#FA5168] hover:border-[#FA5168] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-zinc-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FA5168] text-white text-xs font-mono font-bold shadow-sm">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E8D0DC] text-[#0A192F] text-xs font-mono">
              {project.badge}
            </span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0A192F] tracking-wide">
              {project.title}
            </h2>
            <p className="text-[#334E68] text-sm mt-2 font-light leading-relaxed">
              {project.desc}
            </p>
          </div>

          {/* Deep Details */}
          <div className="p-5 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC] space-y-2">
            <span className="text-[11px] font-mono text-[#FA5168] font-bold uppercase block">
              ENGINEERING & ARCHITECTURAL BREAKDOWN
            </span>
            <p className="text-xs sm:text-sm text-[#4A2D3A] font-light leading-relaxed">
              {project.details}
            </p>
          </div>

          {/* Technologies Used */}
          <div>
            <span className="text-xs font-mono text-[#334E68] block mb-2 font-bold">
              TECHNOLOGIES & TOOLS:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF6F4] border border-[#E8D0DC] text-xs font-mono text-[#0A192F] flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FA5168]" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#F2E4EA] flex items-center justify-between">
            <a
              href={project.link}
              onClick={() => {
                soundManager.playKatanaChime();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl samurai-btn text-white font-mono text-xs font-bold transition-all shadow-[0_4px_15px_rgba(200,82,122,0.35)] flex items-center gap-2 hover:scale-105"
            >
              <span>JUMP TO SECTION</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
