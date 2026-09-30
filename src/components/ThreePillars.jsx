import React, { useState, useRef, useEffect } from 'react';
import { Plane, Shield, Briefcase, ChevronRight, Wind, Terminal, Code2, Layers, Cpu, Video, Palette, CheckCircle2, Sliders, Sparkles } from 'lucide-react';
import { portraits, aeroProjectFeatured, technicalArsenal } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

export default function ThreePillars() {
  const [activeTab, setActiveTab] = useState('aero');
  const [activeWinglet, setActiveWinglet] = useState('withWinglet');
  const [activeToolCategory, setActiveToolCategory] = useState('ALL');
  
  // Terminal console state
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'INFO', text: 'SYSTEM: DEFENSIVE SECURITY & WEB PENTESTING CONSOLE READY.' },
    { type: 'BURP', text: 'Burp Suite Proxy active on 127.0.0.1:8080. Intercepting HTTP/S traffic.' },
    { type: 'SCAN', text: 'Nmap 7.94 scan on interface wlan0: 4 active verified services. 0 open critical ports.' },
    { type: 'OWASP', text: 'OWASP Top 10 audit initialized: SQLi safe, XSS headers verified, strict CSP enforced.' }
  ]);

  const tunnelCanvasRef = useRef(null);

  useEffect(() => {
    if (activeTab !== 'aero') return;
    const canvas = tunnelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: 30 + Math.random() * (height - 60),
      speed: 3 + Math.random() * 2,
      len: 15 + Math.random() * 20
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.42;
      const cy = height * 0.5;
      const chord = width * 0.24;

      // Draw NACA 0012 Airfoil
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((-5 * Math.PI) / 180);

      ctx.beginPath();
      ctx.moveTo(-chord / 2, 0);
      ctx.bezierCurveTo(-chord / 4, -chord * 0.16, chord / 4, -chord * 0.12, chord / 2, 0);
      ctx.bezierCurveTo(chord / 4, chord * 0.12, -chord / 4, chord * 0.16, -chord / 2, 0);
      ctx.closePath();
      ctx.fillStyle = '#221520';
      ctx.fill();
      ctx.strokeStyle = '#FA5168';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (activeWinglet === 'withWinglet') {
        ctx.beginPath();
        ctx.moveTo(chord / 2, 0);
        ctx.lineTo(chord / 2 + 8, -28);
        ctx.lineTo(chord / 2 + 14, -28);
        ctx.lineTo(chord / 2 + 4, 0);
        ctx.closePath();
        ctx.fillStyle = '#E07898';
        ctx.fill();
      }
      ctx.restore();

      // Smoke streamlines
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width) { p.x = 0; p.y = 30 + Math.random() * (height - 60); }

        let curY = p.y;
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < chord * 0.8) {
          const push = (1 - dist / (chord * 0.8)) * 20;
          curY = dy < 0 ? p.y - push : p.y + push;
        }

        if (p.x > cx + chord * 0.4 && Math.abs(dy) < 35) {
          const factor = activeWinglet === 'withWinglet' ? 0.2 : 1.0;
          curY += Math.sin((p.x - cx) * 0.08) * (12 * factor);
        }

        ctx.strokeStyle = activeWinglet === 'withWinglet' ? 'rgba(200, 82, 122, 0.65)' : 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x, curY);
        ctx.lineTo(p.x + p.len, curY);
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [activeTab, activeWinglet]);

  const handleSimCommand = (type) => {
    soundManager.playTick();
    if (type === 'burp') {
      setTerminalOutput(prev => [
        ...prev,
        { type: 'BURP', text: '$ burp --intercept-on --target https://defense-lab.internal' },
        { type: 'BURP', text: 'HTTP POST /api/v1/auth intercepted. Parameter tampering check: No SQL injection vector found.' },
        { type: 'BURP', text: 'Headers injected: X-Content-Type-Options: nosniff, Content-Security-Policy: strict.' }
      ]);
    } else if (type === 'scan') {
      setTerminalOutput(prev => [
        ...prev,
        { type: 'SCAN', text: '$ nmap -sV -sC -Pn -T4 10.10.6.79' },
        { type: 'SCAN', text: 'PORT 3000/tcp OPEN (Node.js production server). TLS 1.3 enabled.' },
        { type: 'SCAN', text: 'PORT 22/tcp FILTERED. Zero unauthorized listening daemons.' }
      ]);
    } else if (type === 'webtest') {
      setTerminalOutput(prev => [
        ...prev,
        { type: 'OWASP', text: '$ python3 -m owasp_scanner --target https://app.internal --depth 3' },
        { type: 'OWASP', text: 'Testing OWASP Top 10: A01 (Access Control) PASSED | A03 (Injection) NONE | A07 (Auth) SECURED' },
        { type: 'OWASP', text: 'Audit status: 100% compliant with authorized defensive baselines.' }
      ]);
    } else if (type === 'sniff') {
      setTerminalOutput(prev => [
        ...prev,
        { type: 'SNIFF', text: '$ wireshark --interface wlan0 --filter "tcp.port == 3000"' },
        { type: 'SNIFF', text: 'TLS 1.3 session key exchanged: AES-GCM-256 encrypted payload.' }
      ]);
    } else {
      setTerminalOutput([
        { type: 'INFO', text: 'Console reset. Defensive Web & Network Listener standing by.' }
      ]);
    }
  };

  // Combine all tools for the master matrix
  const allMasterTools = [
    ...technicalArsenal.aeronautical.tools.map(t => ({ ...t, pillar: 'AERONAUTICAL' })),
    ...technicalArsenal.cybersecurity.tools.map(t => ({ ...t, pillar: 'CYBERSECURITY' })),
    ...technicalArsenal.creative.tools.map(t => ({ ...t, pillar: 'CREATIVE' }))
  ];

  const filteredMasterTools = activeToolCategory === 'ALL'
    ? allMasterTools
    : allMasterTools.filter(t => t.pillar === activeToolCategory);

  return (
    <section id="pillars" className="py-24 bg-white/75 backdrop-blur-xl relative border-t border-white/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FA5168] font-bold">
            THE SAMURAI TECHNICAL ARSENAL
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#0A192F] tracking-tight">
            THE THREE PILLARS
          </h2>
          <p className="text-[#334E68] text-sm font-light leading-relaxed">
            Where aeronautical mechanics (CATIA, aerodynamics, structures), cybersecurity defense (web penetration testing, network triage), and creative technology (graphic design, After Effects motion) converge.
          </p>
        </div>

        {/* 3 Pillars Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-white border border-[#E8D0DC] gap-2 shadow-sm">
            <button
              onClick={() => { setActiveTab('aero'); soundManager.playKatanaChime(); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center gap-2 transition-all ${
                activeTab === 'aero'
                  ? 'bg-[#FA5168] text-white shadow-[0_0_15px_rgba(250,81,104,0.4)] scale-[1.02]'
                  : 'text-[#334E68] hover:text-[#FA5168] hover:bg-[#FDF2F7]'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>01. AERONAUTICAL (CATIA & AERO)</span>
            </button>

            <button
              onClick={() => { setActiveTab('cyber'); soundManager.playKatanaChime(); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center gap-2 transition-all ${
                activeTab === 'cyber'
                  ? 'bg-[#FA5168] text-white shadow-[0_0_15px_rgba(250,81,104,0.4)] scale-[1.02]'
                  : 'text-[#334E68] hover:text-[#FA5168] hover:bg-[#FDF2F7]'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>02. CYBERSECURITY (WEB PENTEST)</span>
            </button>

            <button
              onClick={() => { setActiveTab('tech'); soundManager.playKatanaChime(); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center gap-2 transition-all ${
                activeTab === 'tech'
                  ? 'bg-[#FA5168] text-white shadow-[0_0_15px_rgba(250,81,104,0.4)] scale-[1.02]'
                  : 'text-[#334E68] hover:text-[#FA5168] hover:bg-[#FDF2F7]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>03. CREATIVE (DESIGN & AFTER EFFECTS)</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: AERONAUTICAL ENGINEERING */}
        {/* ============================================================ */}
        {activeTab === 'aero' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E8D0DC] space-y-8 animate-[fadeIn_0.4s_ease-out] shadow-[0_10px_40px_rgba(250,81,104,0.08)] katana-card">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F2E4EA] gap-2">
              <div>
                <span className="text-xs font-mono text-[#FA5168] font-bold uppercase tracking-wider block">
                  {technicalArsenal.aeronautical.metaphor}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#0A192F] mt-1">
                  Aeronautical Engineering: CATIA, Aerodynamics & Structures
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FDF2F7] border border-[#E8D0DC] text-[#FA5168] text-xs font-mono font-semibold self-start sm:self-auto">
                PHYSICAL DYNAMICS
              </span>
            </div>

            {/* 3 Sub-Domains */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {technicalArsenal.aeronautical.domains.map((dom, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC] space-y-2 katana-card hover:border-[#FA5168] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#FA5168] font-bold">0{idx + 1}. DOMAIN</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white text-[#7B5568] border border-[#E8D0DC]">
                      {dom.badge}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#0A192F]">
                    {dom.name}
                  </h4>
                  <p className="text-xs text-[#334E68] font-light leading-relaxed">
                    {dom.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Wind Tunnel Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#E8D0DC] shadow-lg">
                  <img
                    src={portraits.heroAero}
                    alt="Muhammad Jabir Jalal - Aeronautical Engineer"
                    className="w-full h-full object-cover object-center filter contrast-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#9B7B8B] font-bold uppercase">
                  <span>FLAGSHIP AERODYNAMICS EXPERIMENT</span>
                  <span>•</span>
                  <span className="text-[#FA5168]">NACA 0012 AIRFOIL</span>
                </div>
                
                <h4 className="font-heading font-black text-xl sm:text-2xl text-[#0A192F]">
                  Flow Visualisation of Induced Vortex Behavior
                </h4>
                <p className="text-[#4A2D3A] text-xs sm:text-sm font-light leading-relaxed">
                  Experimental research investigating wingtip vortex formation, spanwise crossflow dissipation, and downwash reduction using kerosene smoke wire visualization in a subsonic closed-circuit low-speed wind tunnel.
                </p>

                {/* Interactive Winglet Comparison Toggle */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="text-xs font-mono text-[#334E68]">WINGTIP CONFIGURATION:</span>
                  <button
                    onClick={() => { setActiveWinglet('withoutWinglet'); soundManager.playTick(); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeWinglet === 'withoutWinglet' ? 'bg-[#0A192F] text-white font-bold' : 'bg-white border border-[#E8D0DC] text-[#334E68] hover:text-[#FA5168]'
                    }`}
                  >
                    WITHOUT WINGLET
                  </button>
                  <button
                    onClick={() => { setActiveWinglet('withWinglet'); soundManager.playTick(); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeWinglet === 'withWinglet' ? 'bg-[#FA5168] text-white font-bold shadow-[0_0_10px_rgba(250,81,104,0.4)]' : 'bg-white border border-[#E8D0DC] text-[#334E68] hover:text-[#FA5168]'
                    }`}
                  >
                    WITH WINGLET (+18% EFFICIENCY)
                  </button>
                </div>

                {/* Wind Tunnel Canvas */}
                <div className="relative w-full h-44 rounded-2xl bg-[#150D14] border border-[#E8D0DC] overflow-hidden shadow-inner">
                  <canvas ref={tunnelCanvasRef} className="absolute inset-0 w-full h-full" />
                  <div className="absolute top-2 left-3 text-[10px] font-mono text-[#C9A55A]">
                    NACA 0012 • SUBSONIC SMOKE FLOW SIMULATION (KEROSENE WIRE)
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-[#FAF6F4] border border-[#E8D0DC] text-center">
                    <span className="text-[10px] font-mono text-[#9B7B8B] block">CAD LOFTING</span>
                    <span className="text-xs font-bold text-[#0A192F]">CATIA V5</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF6F4] border border-[#E8D0DC] text-center">
                    <span className="text-[10px] font-mono text-[#9B7B8B] block">FLOW SPEED</span>
                    <span className="text-xs font-bold text-[#0A192F]">18.5 m/s</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF6F4] border border-[#E8D0DC] text-center">
                    <span className="text-[10px] font-mono text-[#9B7B8B] block">VORTEX CORE</span>
                    <span className="text-xs font-bold text-[#FA5168]">{activeWinglet === 'withWinglet' ? 'Diffused & Displaced' : 'Tight & Concentrated'}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Dedicated Aeronautical Tools Shelf */}
            <div className="pt-4 border-t border-[#F2E4EA] space-y-3">
              <span className="text-xs font-mono text-[#334E68] block font-bold uppercase tracking-wider">
                AERONAUTICAL TOOLS ARSENAL:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {technicalArsenal.aeronautical.tools.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC] text-center hover:border-[#FA5168] hover:bg-white transition-all group">
                    <span className="font-heading font-bold text-xs text-[#0A192F] block group-hover:text-[#FA5168] transition-colors">
                      {t.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#7B5568] block mt-0.5">
                      {t.category}
                    </span>
                    <span className="text-[9px] font-mono text-[#C9A55A] font-semibold block mt-1">
                      {t.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: CYBERSECURITY & WEB PENTESTING */}
        {/* ============================================================ */}
        {activeTab === 'cyber' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E8D0DC] space-y-8 animate-[fadeIn_0.4s_ease-out] shadow-[0_10px_40px_rgba(250,81,104,0.08)] katana-card">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F2E4EA] gap-2">
              <div>
                <span className="text-xs font-mono text-[#FA5168] font-bold uppercase tracking-wider block">
                  {technicalArsenal.cybersecurity.metaphor}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#0A192F] mt-1">
                  Cybersecurity: Web Penetration Testing & Threat Defense
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FDF2F7] border border-[#E8D0DC] text-[#FA5168] text-xs font-mono font-semibold self-start sm:self-auto">
                DEFENSIVE AGILITY
              </span>
            </div>

            {/* 3 Sub-Domains */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {technicalArsenal.cybersecurity.domains.map((dom, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC] space-y-2 katana-card hover:border-[#FA5168] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#FA5168] font-bold">0{idx + 1}. DOMAIN</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white text-[#7B5568] border border-[#E8D0DC]">
                      {dom.badge}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#0A192F]">
                    {dom.name}
                  </h4>
                  <p className="text-xs text-[#334E68] font-light leading-relaxed">
                    {dom.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Defensive Console Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#E8D0DC] shadow-lg">
                  <img
                    src={portraits.cybersecurity}
                    alt="Muhammad Jabir Jalal - Cybersecurity Specialist"
                    className="w-full h-full object-cover object-center filter contrast-110"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#9B7B8B] font-bold uppercase">
                  <span>AUTHORIZED SECURITY LAB</span>
                  <span>•</span>
                  <span className="text-[#FA5168]">OWASP TOP 10 & NETWORK AUDIT</span>
                </div>
                
                <h4 className="font-heading font-black text-xl sm:text-2xl text-[#0A192F]">
                  Interactive Defensive & Web Testing Terminal
                </h4>
                <p className="text-[#4A2D3A] text-xs sm:text-sm font-light leading-relaxed">
                  Simulating Burp Suite HTTP interception, Nmap network scanning, Wireshark TLS packet triage, and automated OWASP Top 10 vulnerability verification in an authorized defensive lab environment.
                </p>

                {/* Interactive Defensive Terminal Console */}
                <div className="rounded-2xl bg-[#150D14] border border-[#E8D0DC] p-4 font-mono text-xs space-y-2 shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="text-[#FA5168] font-bold">jabir@defense-lab: ~</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button onClick={() => handleSimCommand('burp')} className="px-2.5 py-0.5 rounded bg-zinc-900 hover:bg-[#FA5168] hover:text-white text-zinc-300 text-[10px] transition-colors">
                        $burp
                      </button>
                      <button onClick={() => handleSimCommand('webtest')} className="px-2.5 py-0.5 rounded bg-zinc-900 hover:bg-[#FA5168] hover:text-white text-zinc-300 text-[10px] transition-colors">
                        $webtest
                      </button>
                      <button onClick={() => handleSimCommand('scan')} className="px-2.5 py-0.5 rounded bg-zinc-900 hover:bg-cyan-900 hover:text-cyan-200 text-zinc-300 text-[10px] transition-colors">
                        $scan
                      </button>
                      <button onClick={() => handleSimCommand('sniff')} className="px-2.5 py-0.5 rounded bg-zinc-900 hover:bg-amber-900 hover:text-amber-200 text-zinc-300 text-[10px] transition-colors">
                        $sniff
                      </button>
                      <button onClick={() => handleSimCommand('clear')} className="px-2.5 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-500 text-[10px] transition-colors">
                        $clear
                      </button>
                    </div>
                  </div>

                  <div className="h-36 overflow-y-auto space-y-1 text-[11px]">
                    {terminalOutput.map((l, i) => (
                      <div key={i} className={
                        l.type === 'BURP' ? 'text-pink-400' :
                        l.type === 'SCAN' ? 'text-cyan-400' :
                        l.type === 'OWASP' ? 'text-emerald-400' :
                        l.type === 'SNIFF' ? 'text-amber-400' : 'text-zinc-400'
                      }>
                        {l.text}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Dedicated Cybersecurity Tools Shelf */}
            <div className="pt-4 border-t border-[#F2E4EA] space-y-3">
              <span className="text-xs font-mono text-[#334E68] block font-bold uppercase tracking-wider">
                CYBERSECURITY & WEB PENTESTING TOOLS:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {technicalArsenal.cybersecurity.tools.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC] text-center hover:border-[#FA5168] hover:bg-white transition-all group">
                    <span className="font-heading font-bold text-xs text-[#0A192F] block group-hover:text-[#FA5168] transition-colors">
                      {t.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#7B5568] block mt-0.5">
                      {t.category}
                    </span>
                    <span className="text-[9px] font-mono text-[#C9A55A] font-semibold block mt-1">
                      {t.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: CREATIVE TECHNOLOGY & DIGITAL DESIGN (After Effects) */}
        {/* ============================================================ */}
        {activeTab === 'tech' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E8D0DC] space-y-8 animate-[fadeIn_0.4s_ease-out] shadow-[0_10px_40px_rgba(250,81,104,0.08)] katana-card">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F2E4EA] gap-2">
              <div>
                <span className="text-xs font-mono text-[#FA5168] font-bold uppercase tracking-wider block">
                  {technicalArsenal.creative.metaphor}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#0A192F] mt-1">
                  Creative Technology: Graphic Design & After Effects Motion
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FFFBF0] border border-[#F0E4C8] text-[#C9A55A] text-xs font-mono font-semibold self-start sm:self-auto">
                DIGITAL CRAFTSMANSHIP
              </span>
            </div>

            {/* 3 Sub-Domains */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {technicalArsenal.creative.domains.map((dom, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC] space-y-2 katana-card hover:border-[#FA5168] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#C9A55A] font-bold">0{idx + 1}. DOMAIN</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white text-[#7B5568] border border-[#E8D0DC]">
                      {dom.badge}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#0A192F]">
                    {dom.name}
                  </h4>
                  <p className="text-xs text-[#334E68] font-light leading-relaxed">
                    {dom.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Showcase details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#E8D0DC] shadow-lg">
                  <img
                    src={portraits.professional}
                    alt="Muhammad Jabir Jalal - Creative Technologist"
                    className="w-full h-full object-cover object-top filter contrast-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#9B7B8B] font-bold uppercase">
                  <span>CRAFT & PRODUCTION CAPABILITIES</span>
                  <span>•</span>
                  <span className="text-[#C9A55A]">AFTER EFFECTS & FIGMA</span>
                </div>
                
                <h4 className="font-heading font-black text-xl sm:text-2xl text-[#0A192F]">
                  Motion Systems & High-Production Visual Storytelling
                </h4>
                <p className="text-[#4A2D3A] text-xs sm:text-sm font-light leading-relaxed">
                  Bridging visual art with technical rigor. Engineering custom kinetic motion design and visual effects in Adobe After Effects, designing vector identity systems and digital UI in Figma and Illustrator, and writing native Android Kotlin CameraX broadcast pipelines.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FDF2F7] border border-[#F2D5E0] space-y-1">
                    <div className="flex items-center gap-1.5 text-[#FA5168]">
                      <Video className="w-4 h-4" />
                      <span className="text-[10px] font-mono font-bold">MOTION GRAPHICS</span>
                    </div>
                    <h5 className="font-bold text-sm text-[#0A192F]">After Effects</h5>
                    <p className="text-[11px] text-[#7B5568] font-light">Kinetic title animation, visual effects, procedural motion, and technical showreels.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFBF0] border border-[#F0E4C8] space-y-1">
                    <div className="flex items-center gap-1.5 text-[#C9A55A]">
                      <Palette className="w-4 h-4" />
                      <span className="text-[10px] font-mono font-bold">GRAPHIC DESIGN</span>
                    </div>
                    <h5 className="font-bold text-sm text-[#0A192F]">Figma & Adobe</h5>
                    <p className="text-[11px] text-[#7B5568] font-light">Vector emblems, Japanese tech motifs, branding guides, and Canva Pro layouts.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#D5E5F7] space-y-1">
                    <div className="flex items-center gap-1.5 text-[#2B6CB0]">
                      <Cpu className="w-4 h-4" />
                      <span className="text-[10px] font-mono font-bold">MOBILE & IOT</span>
                    </div>
                    <h5 className="font-bold text-sm text-[#0A192F]">Kotlin & ESP32</h5>
                    <p className="text-[11px] text-[#7B5568] font-light">Low-latency CameraX RTMP streaming and wireless sensor telemetry hubs.</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Dedicated Creative Tools Shelf */}
            <div className="pt-4 border-t border-[#F2E4EA] space-y-3">
              <span className="text-xs font-mono text-[#334E68] block font-bold uppercase tracking-wider">
                GRAPHIC DESIGN, VIDEO & SOFTWARE TOOLS:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {technicalArsenal.creative.tools.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC] text-center hover:border-[#C9A55A] hover:bg-white transition-all group">
                    <span className="font-heading font-bold text-xs text-[#0A192F] block group-hover:text-[#C9A55A] transition-colors">
                      {t.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#7B5568] block mt-0.5">
                      {t.category}
                    </span>
                    <span className="text-[9px] font-mono text-[#C9A55A] font-semibold block mt-1">
                      {t.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* MASTER TOOLS ARSENAL MATRIX */}
        {/* ============================================================ */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8D0DC] space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F2E4EA] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FA5168]" />
                <h3 className="font-heading font-bold text-lg text-[#0A192F] tracking-wider">
                  MASTER TOOLS ARSENAL
                </h3>
              </div>
              <p className="text-xs text-[#7B5568] font-light mt-0.5">
                Complete catalog of software, hardware, and engineering instrumentation across all domains.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1 p-1 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC]">
              {['ALL', 'AERONAUTICAL', 'CYBERSECURITY', 'CREATIVE'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveToolCategory(cat); soundManager.playTick(); }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all ${
                    activeToolCategory === cat
                      ? 'bg-[#FA5168] text-white font-bold shadow-[0_0_10px_rgba(250,81,104,0.4)]'
                      : 'text-[#334E68] hover:text-[#FA5168]'
                  }`}
                >
                  {cat === 'ALL' ? 'ALL TOOLS (25)' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredMasterTools.map((tool, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#FAF6F4] border border-[#E8D0DC] hover:border-[#FA5168] hover:bg-white hover:shadow-md transition-all group katana-card"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                    tool.pillar === 'AERONAUTICAL' ? 'bg-[#FDF2F7] text-[#FA5168] border border-[#F2D5E0]' :
                    tool.pillar === 'CYBERSECURITY' ? 'bg-[#F0F7FF] text-[#2B6CB0] border border-[#D5E5F7]' :
                    'bg-[#FFFBF0] text-[#C9A55A] border border-[#F0E4C8]'
                  }`}>
                    {tool.pillar === 'AERONAUTICAL' ? 'AERO' : tool.pillar === 'CYBERSECURITY' ? 'CYBER' : 'DESIGN'}
                  </span>
                  <span className="text-[9px] font-mono text-[#9B7B8B]">{tool.level}</span>
                </div>
                <h5 className="font-heading font-bold text-xs text-[#0A192F] group-hover:text-[#FA5168] transition-colors">
                  {tool.name}
                </h5>
                <p className="text-[10px] text-[#7B5568] font-light mt-0.5 line-clamp-1">
                  {tool.category}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
