import React, { useRef, useEffect, useState } from 'react';
import { ChevronRight, Sparkles, Clock, Compass, Mail, Check } from 'lucide-react';
import { personalInfo, portraits } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function Hero() {
  const canvasRef = useRef(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Time-aware greeting state
  const [greeting, setGreeting] = useState({
    timeGreeting: 'Welcome',
    tagline: 'Precision in flight dynamics and cybersecurity',
    currentTime: ''
  });

  // Typewriter effect state for active specializations
  const rotatingTitles = [
    'Aeronautical Engineer (CATIA V5 & Airframe Structures)',
    'Aerodynamics Researcher (NACA 0012 Smoke Flow Tests)',
    'Cybersecurity Specialist (Web Penetration Testing)',
    'Defensive Security Auditor (OWASP Top 10 & Burp Suite)',
    'Creative Technologist (After Effects & Motion Systems)',
    'Embedded Systems Builder (Android Kotlin & ESP32 IoT)'
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(60);

  // 1. Calculate time-aware greetings and live clock
  useEffect(() => {
    const updateTimeGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      let timeStr = '';
      let tag = '';

      if (hour >= 5 && hour < 12) {
        timeStr = 'Good Morning';
        tag = 'The dawn of new engineering frontiers & focused study';
      } else if (hour >= 12 && hour < 17) {
        timeStr = 'Good Afternoon';
        tag = 'Precision in flight dynamics, code auditing & creative flow';
      } else if (hour >= 17 && hour < 22) {
        timeStr = 'Good Evening';
        tag = 'Vigilance, craftsmanship and deep technical review';
      } else {
        timeStr = 'Greetings, Night Visionary';
        tag = 'Quiet hours of mastery, research and innovation';
      }

      const formattedClock = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setGreeting({
        timeGreeting: timeStr,
        tagline: tag,
        currentTime: formattedClock
      });
    };

    updateTimeGreeting();
    const interval = setInterval(updateTimeGreeting, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Typewriter animation loop for hero specializations
  useEffect(() => {
    const currentFullText = rotatingTitles[titleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentFullText.length) {
          setIsDeleting(true);
          setTypingSpeed(2200);
        } else {
          setTypingSpeed(45);
        }
      } else {
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
          setTypingSpeed(400);
        } else {
          setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
          setTypingSpeed(25);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, titleIndex, typingSpeed, rotatingTitles]);

  // 3. Falling sakura petals canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.parentElement.offsetWidth);
    let h = (canvas.height = canvas.parentElement.offsetHeight);

    const onResize = () => {
      if (!canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    const petals = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 3 + Math.random() * 7,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 0.4 + Math.random() * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      opacity: 0.35 + Math.random() * 0.5,
      r: [250, 6, 103, 253][Math.floor(Math.random() * 4)],
      g: [81, 137, 186, 157][Math.floor(Math.random() * 4)],
      b: [104, 167, 230, 115][Math.floor(Math.random() * 4)],
    }));

    const orbs = Array.from({ length: 6 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 80 + Math.random() * 140,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: 0.025 + Math.random() * 0.035
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, w, h);

      orbs.forEach(o => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = w + o.r;
        if (o.x > w + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = h + o.r;
        if (o.y > h + o.r) o.y = -o.r;

        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `rgba(200, 82, 122, ${o.alpha})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      petals.forEach(p => {
        p.x += p.vx + Math.sin(p.y * 0.012) * 0.4;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.58, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(-p.size * 0.15, -p.size * 0.12, p.size * 0.4, p.size * 0.22, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 250, ${p.opacity * 0.55})`;
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      soundManager.playTick();
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const marqueeItems = [
    'CATIA V5 3D CAD',
    'AERODYNAMICS & SMOKE TUNNEL',
    'NACA 0012 WINGLET VORTEX',
    'AIRCRAFT STRUCTURAL MECHANICS',
    'WEB PENETRATION TESTING',
    'OWASP TOP 10 AUDITING',
    'BURP SUITE PROXY',
    'KALI LINUX & WIRESHARK',
    'ADOBE AFTER EFFECTS MOTION',
    'FIGMA UI/UX DESIGN',
    'ANDROID KOTLIN CAMERAX',
    'ESP32 WIRELESS TELEMETRY',
    'BUSHIDO SAMURAI DISCIPLINE'
  ];

  return (
    <section id="hero" className="relative min-h-[96vh] flex flex-col justify-between pt-24 pb-8 bg-transparent overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-90" />
      <div className="absolute inset-0 japanese-grid opacity-60 pointer-events-none" />

      {/* Rotating Samurai Mon crest in rose accents */}
      <div className="absolute -right-24 top-1/4 w-[36rem] h-[36rem] rounded-full border border-[#0689A7]/25 pointer-events-none animate-samurai-mon" />
      <div className="absolute -right-14 top-1/4 w-[28rem] h-[28rem] rounded-full border border-[#FA5168]/25 border-dashed pointer-events-none animate-[spin_45s_linear_infinite_reverse]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Dynamic Cultural Greeting & Real-time Telemetry Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div 
                onClick={() => soundManager.playKatanaChime()}
                className="cursor-pointer group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E8D0DC] shadow-sm hover:border-[#C8527A] hover:shadow-[0_2px_15px_rgba(250,81,104,0.2)] transition-all animate-float"
                title="Click for greeting chime"
              >
                <span className="w-2 h-2 rounded-full bg-[#C8527A] animate-ping" />
                <span className="text-xs font-mono font-bold text-[#C8527A] group-hover:text-[#A8345A] transition-colors">
                  {greeting.timeGreeting}, Honored Guest
                </span>
                <span className="text-[10px] text-[#9B7B8B] hidden sm:inline">•</span>
                <span className="text-[11px] text-[#7B5568] font-mono hidden sm:inline">
                  Welcome to My Atelier
                </span>
              </div>

              {/* Live Clock / Location Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDF2F7] border border-[#E8D0DC] text-[10px] font-mono text-[#9B7B8B]">
                <Clock className="w-3 h-3 text-[#C8527A]" />
                <span className="font-semibold text-[#1A0D14]">{greeting.currentTime || 'LIVE'}</span>
                <span>IST (Kerala)</span>
              </div>

              <span className="text-[#9B7B8B] text-xs font-mono uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A55A]" />
                TRIPLE DISCIPLINE
              </span>
            </div>

            {/* Title with Katana Blade Flash Animation & Small MUHAMMAD size */}
            <div className="relative overflow-hidden inline-block pr-6">
              {/* MUHAMMAD in smaller refined font size */}
              <span className="block text-sm sm:text-base lg:text-lg font-mono uppercase tracking-[0.35em] text-[#C8527A] mb-1 font-bold">
                MUHAMMAD
              </span>
              
              <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#1A0D14] leading-none">
                JABIR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0689A7] via-[#FA5168] to-[#FD9D73] text-glow">
                  JALAL
                </span>
              </h1>
              
              {/* Katana Blade Flash Sweep across text */}
              <div className="absolute inset-0 w-28 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none animate-katana-flash" />
            </div>

            {/* Animated Typewriter Headline */}
            <div className="p-3.5 rounded-2xl bg-white/90 border border-[#E8D0DC] shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <Compass className="w-3.5 h-3.5 text-[#C8527A] animate-spin" style={{ animationDuration: '10s' }} />
                <span className="text-[10px] font-mono uppercase font-bold text-[#C8527A] tracking-wider">
                  ACTIVE SPECIALIZATION:
                </span>
              </div>
              <div className="min-h-[28px] flex items-center">
                <span className="font-heading font-bold text-sm sm:text-base text-[#1A0D14] tracking-wide">
                  {displayedText}
                </span>
                <span className="font-mono text-[#C8527A] font-bold text-base ml-0.5 animate-cursor-blink">|</span>
              </div>
            </div>

            {/* Welcoming Cultural Statement */}
            <p className="text-[#7B5568] text-xs sm:text-sm max-w-lg font-light leading-relaxed border-l-2 border-[#C8527A] pl-4 py-0.5">
              &ldquo;Welcome to my digital proving ground. Where the discipline of the Samurai converges with Aeronautical precision, Cybersecurity defense, and Digital craftsmanship.&rdquo;
            </p>

            {/* 🔗 DIRECT SOCIAL MEDIA BUTTONS (GitHub, LinkedIn, Instagram, Email) */}
            <div className="pt-1 space-y-2">
              <span className="text-[11px] font-mono text-[#9B7B8B] uppercase tracking-widest block font-bold">
                CONNECT ON VERIFIED CHANNELS
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://github.com/jabirjalal12"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playTick()}
                  className="px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#E8D0DC] hover:border-[#C8527A] hover:bg-[#FDF2F7] text-xs font-mono text-[#1A0D14] hover:text-[#C8527A] flex items-center gap-2 transition-all hover:scale-105 shadow-sm group"
                  title="GitHub - @jabirjalal12"
                >
                  <GithubIcon className="w-4 h-4 text-[#7C3B5C] group-hover:text-[#C8527A] transition-colors" />
                  <span className="font-bold">GITHUB</span>
                  <span className="text-[10px] text-[#9B7B8B] font-mono hidden sm:inline">(@jabirjalal12)</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/muhammad-jabir-jalal-141661334"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playTick()}
                  className="px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#E8D0DC] hover:border-[#0077B5] hover:bg-[#F0F8FF] text-xs font-mono text-[#1A0D14] hover:text-[#0077B5] flex items-center gap-2 transition-all hover:scale-105 shadow-sm group"
                  title="LinkedIn - Muhammad Jabir Jalal"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#0077B5] group-hover:scale-110 transition-transform" />
                  <span className="font-bold">LINKEDIN</span>
                  <span className="text-[10px] text-[#9B7B8B] font-mono hidden sm:inline">(/in/muhammad-jabir-jalal)</span>
                </a>

                <a
                  href="https://www.instagram.com/_ja_bir.ja_la.l?stkn=NHJrNnFsbmFsNzRz"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playTick()}
                  className="px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#E8D0DC] hover:border-[#E1306C] hover:bg-[#FDF2F7] text-xs font-mono text-[#1A0D14] hover:text-[#E1306C] flex items-center gap-2 transition-all hover:scale-105 shadow-sm group"
                  title="Instagram - @_ja_bir.ja_la.l"
                >
                  <InstagramIcon className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
                  <span className="font-bold">INSTAGRAM</span>
                  <span className="text-[10px] text-[#9B7B8B] font-mono hidden sm:inline">(@_ja_bir.ja_la.l)</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#E8D0DC] hover:border-[#C8527A] hover:bg-[#FDF2F7] text-xs font-mono text-[#1A0D14] hover:text-[#C8527A] flex items-center gap-2 transition-all hover:scale-105 shadow-sm"
                  title="Copy Email Address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-600 animate-bounce" />
                  ) : (
                    <Mail className="w-4 h-4 text-[#C8527A]" />
                  )}
                  <span className="font-bold">{copiedEmail ? 'COPIED!' : 'EMAIL'}</span>
                  <span className="text-[10px] text-[#9B7B8B] font-mono hidden sm:inline">(jabirjalal785@gmail.com)</span>
                </button>
              </div>
            </div>

            {/* Samurai Shimmer Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#pillars"
                onClick={() => soundManager.playTick()}
                className="relative inline-flex items-center gap-2 px-7 py-3 rounded-xl samurai-btn text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_24px_rgba(250,81,104,0.45)] hover:scale-105"
              >
                <span>EXPLORE TECHNICAL ARSENAL</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                onClick={() => soundManager.playTick()}
                className="inline-flex items-center px-6 py-3 rounded-xl border-2 border-[#E8D0DC] bg-white text-[#6B4D5A] font-semibold text-xs tracking-wider uppercase hover:border-[#C8527A] hover:text-[#C8527A] hover:shadow-[0_0_16px_rgba(250,81,104,0.2)] transition-all hover:scale-105"
              >
                ABOUT ME
              </a>
            </div>

          </div>

                    {/* Right Column: Dynamic Floating Cutout Avatar */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md flex flex-col items-center justify-center">
              
              {/* Concentric Rotating Samurai Mon Halo Rings */}
              <div className="absolute -inset-10 m-auto w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-[#0689A7]/25 pointer-events-none animate-samurai-mon" />
              <div className="absolute -inset-6 m-auto w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-[#FA5168]/25 border-dashed pointer-events-none animate-[spin_35s_linear_infinite_reverse]" />
              
              {/* Ambient Glowing Aura Disk behind cutout */}
              <div className="absolute inset-0 m-auto w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#0689A7]/30 via-[#FA5168]/25 to-[#FD9D73]/30 blur-3xl pointer-events-none animate-pulse" />

              {/* Floating Cutout Container */}
              <div className="relative z-10 w-full flex flex-col items-center animate-cutout-float">
                
                {/* Floating Micro-Badge Top Left: Aeronautical Engineering */}
                <div className="absolute -top-3 -left-2 sm:-left-6 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_25px_rgba(1,47,97,0.18)] flex items-center gap-2 animate-float">
                  <span className="w-2 h-2 rounded-full bg-[#0689A7] animate-ping" />
                  <span className="text-[10px] font-mono font-bold text-[#012F61]">AERO CATIA V5</span>
                </div>

                {/* Floating Micro-Badge Top Right: Cybersecurity Defense */}
                <div 
                  className="absolute top-14 -right-2 sm:-right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_25px_rgba(250,81,104,0.22)] flex items-center gap-2 animate-float"
                  style={{ animationDelay: '1.5s' }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#FA5168] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-[#012F61]">OWASP DEFENSE</span>
                </div>

                {/* Transparent Cutout Image */}
                <div className="relative group cursor-pointer" onClick={() => soundManager.playKatanaChime()} title="Click to trigger Katana sound">
                  <img
                    src={portraits.heroCutout || '/assets/images/jabir-cutout.png'}
                    alt="Muhammad Jabir Jalal - Aeronautical & Cybersecurity Engineer"
                    className="w-auto h-[420px] sm:h-[490px] lg:h-[530px] object-contain drop-shadow-[0_20px_35px_rgba(1,47,97,0.35)] drop-shadow-[0_10px_20px_rgba(250,81,104,0.25)] filter contrast-[1.04] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Floating Identity Capsule Bar Under Cutout */}
                <div className="relative -mt-6 z-20 w-full max-w-[340px] px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/90 shadow-[0_12px_36px_rgba(1,47,97,0.2)] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-[#FA5168] font-bold block uppercase tracking-widest">
                      MUHAMMAD JABIR JALAL
                    </span>
                    <span className="text-xs font-extrabold text-[#0A192F]">Aero • Cyber • Creative Tech</span>
                  </div>
                  <div className="text-right pl-2 border-l border-slate-200">
                    <span className="text-[9px] font-mono text-[#0689A7] font-bold block">KERALA, IN</span>
                    <span className="text-[8px] font-mono text-[#FD9D73] font-bold tracking-wider">BUSHIDO DISCIPLINE</span>
                  </div>
                </div>

              </div>

              {/* Dynamic Grounding Shadow Pedestal under floating avatar */}
              <div className="w-56 sm:w-72 h-8 rounded-full bg-gradient-to-r from-transparent via-[#012F61]/35 to-transparent blur-md mt-4 animate-pedestal pointer-events-none" />

            </div>
          </div>


        </div>
      </div>

      {/* Flowing Horizontal Marquee Ticker at bottom of landing page */}
      <div className="w-full mt-10 pt-4 border-t border-[#E8D0DC]/80 bg-white/60 backdrop-blur-md overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[11px] font-mono text-[#7B5568]">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8527A]" />
              <span className="hover:text-[#C8527A] transition-colors">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
