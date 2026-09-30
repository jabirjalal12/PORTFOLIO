import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'PILLARS', href: '#pillars' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl py-3 border-b border-[#E8D0DC] shadow-[0_2px_20px_rgba(250,81,104,0.1)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Mon Logo with Small MUHAMMAD and JABIR JALAL */}
        <a
          href="#hero"
          onClick={() => soundManager.playTick()}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-full border-2 border-[#FA5168]/60 flex items-center justify-center bg-white group-hover:border-[#FA5168] group-hover:shadow-[0_0_15px_rgba(250,81,104,0.35)] transition-all">
            <span className="font-display font-black text-xs tracking-wider text-[#FA5168] group-hover:text-[#0689A7]">
              JJ
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] font-mono tracking-widest text-[#FA5168] font-bold">
                MUHAMMAD
              </span>
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-widest text-[#0A192F] group-hover:text-[#FA5168] transition-colors">
                JABIR JALAL
              </span>
            </div>
            <span className="text-[10px] text-[#9B7B8B] font-mono tracking-widest -mt-0.5">
              BUSHIDO DISCIPLINE • SAKURA PRECISION
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => soundManager.playTick()}
              className="text-xs font-mono tracking-widest text-[#6B4D5A] hover:text-[#FA5168] transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FA5168] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls: Sound & CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAudioToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8D0DC] bg-white hover:bg-[#FDF2F7] transition-all text-xs text-[#6B4D5A]"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#9B7B8B]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#FA5168] animate-pulse" />
            )}
            <span className="text-[10px] font-mono hidden sm:inline">
              {isMuted ? 'SOUND OFF' : 'SOUND ON'}
            </span>
          </button>

          <a
            href="#contact"
            onClick={() => soundManager.playTick()}
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full samurai-btn text-white font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(250,81,104,0.4)]"
          >
            CONNECT
          </a>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-[#E8D0DC] bg-white text-[#6B4D5A] hover:text-[#FA5168]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E8D0DC] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => { soundManager.playTick(); setMobileMenuOpen(false); }}
              className="block px-4 py-2.5 rounded-xl text-xs font-mono tracking-widest text-[#6B4D5A] hover:bg-[#FDF2F7] hover:text-[#FA5168] transition-all flex items-center gap-2"
            >
              <ChevronRight className="w-3 h-3 text-[#FA5168]" />
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => { soundManager.playTick(); setMobileMenuOpen(false); }}
            className="block w-full text-center px-4 py-2.5 rounded-xl samurai-btn text-white font-mono text-xs font-bold mt-2"
          >
            CONNECT
          </a>
        </div>
      )}
    </header>
  );
}
