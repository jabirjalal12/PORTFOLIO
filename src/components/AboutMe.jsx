import React, { useState, useEffect } from 'react';
import { portraits, personalInfo, bushidoVirtues } from '../data/portfolioData';
import { Download, Mail, Check, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function AboutMe() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [count, setCount] = useState({ disciplines: 0, hours: 0, tools: 0, ethics: 0 });

  useEffect(() => {
    let currentStep = 0;
    const steps = 40;
    const timer = setInterval(() => {
      currentStep++;
      const p = Math.min(currentStep / steps, 1);
      setCount({
        disciplines: Math.floor(p * 3),
        hours: Math.floor(p * 120),
        tools: Math.floor(p * 26),
        ethics: Math.floor(p * 100)
      });
      if (p >= 1) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      soundManager.playTick();
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handlePrintResume = () => {
    soundManager.playKatanaChime();
    window.print();
  };

  return (
    <section id="about" className="py-24 bg-white/75 backdrop-blur-xl relative border-t border-white/60 overflow-hidden">
      {/* Decorative sakura petal watermark */}
      <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-gradient-to-bl from-[#FDF2F7] to-transparent opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gradient-to-tr from-[#FDF2F7] to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Executive Suit Portrait (Photo 3) with Small MUHAMMAD Name Display */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#E8D0DC] shadow-[0_20px_60px_rgba(250,81,104,0.15)] katana-card group hover:border-[#FA5168] transition-all duration-500">
              <img
                src={portraits.professional}
                alt="Muhammad Jabir Jalal - Professional Identity"
                className="w-full h-full object-cover object-top filter contrast-[1.04] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/20 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E8D0DC] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#9B7B8B] block tracking-widest uppercase">EXECUTIVE IDENTITY</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[11px] font-mono text-[#FA5168] font-bold">MUHAMMAD</span>
                    <span className="text-sm font-bold text-[#0A192F] tracking-wide">JABIR JALAL</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#FD9D73] font-bold block tracking-wider">DISCIPLINED CRAFT</span>
                  <span className="text-[9px] font-mono text-[#9B7B8B]">BUSHIDO ETHOS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Animated Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-[#FA5168]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#FA5168]">
                  SECTION 02 — THE MULTI-DISCIPLINARY MINDSET
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#0A192F] tracking-tight leading-tight">
                ONE PERSON. MULTIPLE DISCIPLINES. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0689A7] via-[#FA5168] to-[#FD9D73] text-glow">
                  ONE UNIFIED PATH.
                </span>
              </h2>
            </div>

            <p className="text-[#334E68] text-sm sm:text-base font-light leading-relaxed">
              I am an aeronautical engineer, cybersecurity practitioner, and creative technologist. In the spirit of Japanese craftsmanship, true technical mastery requires both mechanical precision in physical systems and sharp defensive agility in digital architectures.
            </p>

            {/* Explicit 3 Core Areas Highlight (After Effects included) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {[
                { num: "01", color: "text-[#FA5168]", border: "border-[#F2D5E0]", bg: "bg-[#FDF2F7]", title: "Aeronautical", sub: "CATIA & Aerodynamics", desc: "CATIA V5 CAD modeling, NACA 0012 wind tunnel flow tests, airframe structural stress analysis." },
                { num: "02", color: "text-[#7C3B5C]", border: "border-[#E8D5E5]", bg: "bg-[#FBF0F7]", title: "Cybersecurity", sub: "Web Pentesting", desc: "OWASP Top 10 web application testing, Burp Suite proxying, Nmap reconnaissance, and network defense." },
                { num: "03", color: "text-[#FD9D73]", border: "border-[#F0E4C8]", bg: "bg-[#FFFBF0]", title: "Creative", sub: "Design & After Effects", desc: "Adobe After Effects motion graphics, video editing, Figma UI/UX, and IoT telemetry systems." }
              ].map((item, i) => (
                <div key={i} className={`p-3.5 rounded-2xl ${item.bg} border ${item.border} space-y-1 katana-card hover:shadow-md transition-all`}>
                  <span className={`text-[10px] font-mono ${item.color} font-bold block`}>{item.num}. {item.sub.toUpperCase()}</span>
                  <h4 className="text-xs font-bold text-[#0A192F]">{item.title}</h4>
                  <p className="text-[11px] text-[#7B5568] font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* 4 Animated Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {[
                { val: `${count.disciplines}`, label: "Core Pillars", sub: "Aero, Cyber, Creative" },
                { val: `${count.hours}+`, label: "CAD & Lab Hours", sub: "CATIA & NACA 0012 tests" },
                { val: `${count.tools}+`, label: "Mastered Tools", sub: "After Effects, Burp, CATIA…" },
                { val: `${count.ethics}%`, label: "Ethical Defense", sub: "Authorized auditing" }
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC] hover:border-[#FA5168] hover:shadow-[0_4px_20px_rgba(250,81,104,0.12)] transition-all duration-300 katana-card">
                  <span className="font-heading font-black text-2xl text-[#FA5168] block">{m.val}</span>
                  <span className="text-xs font-bold text-[#0A192F] block mt-0.5">{m.label}</span>
                  <span className="text-[10px] text-[#9B7B8B] block mt-0.5">{m.sub}</span>
                </div>
              ))}
            </div>

            {/* Actions: Download Resume & Email */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handlePrintResume}
                className="px-6 py-2.5 rounded-xl samurai-btn text-white font-mono text-xs font-bold transition-all shadow-[0_4px_20px_rgba(250,81,104,0.35)] flex items-center gap-2 hover:scale-105"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD RESUME</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FDF2F7] border-2 border-[#E8D0DC] hover:border-[#FA5168] text-[#6B4D5A] font-mono text-xs flex items-center gap-2 transition-all hover:scale-105"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Mail className="w-3.5 h-3.5 text-[#FA5168]" />}
                <span>{copiedEmail ? 'COPIED!' : personalInfo.email}</span>
              </button>
            </div>

          </div>
        </div>

        {/* ⚔️ THE BUSHIDO ENGINEERING CODE */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FAF6F4] to-[#FDF2F7] border border-[#E8D0DC] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFE2E8] gap-2">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-[#FD9D73]" />
              <h3 className="font-heading font-bold text-lg text-[#0A192F] tracking-wider">
                THE BUSHIDO CODE OF ENGINEERING
              </h3>
            </div>
            <span className="text-xs font-mono text-[#9B7B8B]">
              PHILOSOPHICAL ANCHOR • PRECISION CRAFTSMANSHIP
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bushidoVirtues.map((v, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E8D0DC] space-y-1.5 katana-card hover:border-[#FA5168] hover:shadow-[0_4px_20px_rgba(250,81,104,0.12)] transition-all">
                <span className="text-[10px] font-mono text-[#FA5168] font-bold tracking-widest block">
                  TENET 0{idx + 1}
                </span>
                <h4 className="font-heading font-bold text-sm text-[#0A192F] tracking-wider">
                  {v.name}
                </h4>
                <div className="text-[11px] font-mono text-[#FD9D73] font-medium">
                  {v.subtitle}
                </div>
                <p className="text-xs text-[#7B5568] font-light leading-relaxed pt-1">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
