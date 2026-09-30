import React from 'react';
import { Plane, ShieldAlert, Terminal, Cpu, Palette, Film, Activity, Sparkles } from 'lucide-react';
import { currentFocus } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

export default function CurrentFocus() {
  const getIcon = (name) => {
    switch (name) {
      case 'Plane': return <Plane className="w-5 h-5 text-red-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-amber-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-red-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-amber-400" />;
      case 'Film': return <Film className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5 text-green-400" />;
    }
  };

  return (
    <section id="focus" className="py-24 bg-[#070709] relative border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-red-500">
                SECTION 11 — ACTIVE RADAR
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
              CURRENTLY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">BUILDING</span>
            </h2>
            <p className="font-display text-lg text-zinc-300 mt-1">
              Active engineering investigations & exploratory work.
            </p>
          </div>
          <span className="mt-4 md:mt-0 font-mono text-xs text-zinc-500">
            UPDATED: SEPTEMBER 2026
          </span>
        </div>

        {/* 7 Active Cards Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentFocus.map((f, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundManager.playTick()}
              className="p-5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-red-600/60 hover:bg-zinc-900/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                    {getIcon(f.icon)}
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm text-white tracking-wide">
                  {f.label}
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-zinc-900 text-[10px] font-mono text-zinc-600">
                DISCIPLINE 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
