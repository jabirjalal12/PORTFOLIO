import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SamuraiCursor from './components/SamuraiCursor';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import ThreePillars from './components/ThreePillars';
import ProjectShowcase from './components/ProjectShowcase';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="relative min-h-screen text-[#0A192F] selection:bg-[#FA5168] selection:text-white overflow-x-hidden">
      {/* Full-Screen Dynamic Background Theme System */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        {/* Base Theme Gradient Layer (Exact Image Asset) */}
        <img
          src="/assets/background-gradient.jpg"
          alt="Theme Background"
          className="absolute inset-0 w-full h-full object-cover opacity-85 scale-105 filter blur-[2px]"
        />

        {/* Animated Living Mesh Gradient Overlay */}
        <div className="absolute inset-0 theme-mesh-bg opacity-65 mix-blend-screen" />

        {/* Floating Ambient Glowing Light Orbs matching User Palette */}
        {/* 1. Deep Navy & Sapphire (Top Left) */}
        <div className="absolute -top-24 -left-24 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#012F61] via-[#2E5FC6]/70 to-transparent blur-[110px] animate-float-theme-1" />

        {/* 2. Luminous Peacock Teal (Top Center-Left) */}
        <div className="absolute top-2 left-1/3 w-[550px] h-[550px] rounded-full bg-gradient-to-b from-[#0689A7]/80 via-[#67BAE6]/50 to-transparent blur-[100px] animate-float-theme-2" />

        {/* 3. Radiant Lilac-White Mist Highlight (Center-Right) */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#E6CBDE]/85 via-[#FDF4FF]/60 to-transparent blur-[90px] animate-float-theme-3" />

        {/* 4. Electric Sky Blue (Mid Left) */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#67BAE6]/75 via-[#3F79CB]/50 to-transparent blur-[105px] animate-float-theme-1" />

        {/* 5. Sunset Coral & Amber Peach (Top Right) */}
        <div className="absolute -top-10 -right-20 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#FD9D73]/85 via-[#FD9A95]/75 to-transparent blur-[115px] animate-float-theme-2" />

        {/* 6. Cherry Rose & Orchid Magenta (Bottom Right) */}
        <div className="absolute bottom-0 -right-16 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-[#FA5168]/85 via-[#C85FA2]/75 to-transparent blur-[120px] animate-float-theme-3" />

        {/* 7. Royal Blue & Cobalt (Bottom Left) */}
        <div className="absolute -bottom-20 left-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#2E5FC6]/80 via-[#012F61]/90 to-transparent blur-[120px] animate-float-theme-1" />

        {/* Subtle Japanese Washi Grid overlay */}
        <div className="absolute inset-0 japanese-grid opacity-25 pointer-events-none" />
      </div>

      {/* Trailing Theme Petal Cursor */}
      <SamuraiCursor />

      {/* Floating Glassmorphic Navigation Bar */}
      <Navbar />

      <main className="relative z-10">
        {/* 1. Cinematic Hero with Social Media Links & Time-Aware Greetings */}
        <Hero />

        {/* 2. About Me (Personal Brand, Suit Portrait, Bushido Code) */}
        <AboutMe />

        {/* 3. The Three Pillars & Master Tools Matrix (Aero, Cyber, Creative Tech) */}
        <ThreePillars />

        {/* 4. Curated Project Showcase */}
        <ProjectShowcase onSelectProject={(p) => setSelectedProject(p)} />

        {/* 5. Contact & Minimal Kyoto-Style 2026 Footer */}
        <ContactSection />
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
