import React, { useEffect, useRef } from 'react';
import { soundManager } from '../utils/audio';

export default function SamuraiCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !follower || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    const particles = [];
    const slashes = [];

    const themeColors = [
      'rgba(250, 81, 104, ',  // Cherry Rose
      'rgba(6, 137, 167, ',   // Peacock Teal
      'rgba(103, 186, 230, ', // Electric Sky Blue
      'rgba(253, 157, 115, '  // Sunset Coral
    ];

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Spawn drifting themed petal embers
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 6,
          y: mouseY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.5,
          life: 1,
          decay: 0.022 + Math.random() * 0.03,
          size: 1.5 + Math.random() * 3,
          color: themeColors[Math.floor(Math.random() * themeColors.length)]
        });
      }
    };

    // Click triggers dynamic katana blade slash with theme gradient glow
    const onMouseDown = (e) => {
      soundManager.playKatanaChime();
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.4;
      const length = 110 + Math.random() * 80;
      slashes.push({
        x: e.clientX,
        y: e.clientY,
        angle: angle,
        length: length,
        life: 1,
        decay: 0.055
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lag follower
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

      // Render Katana Blade Slash
      for (let i = slashes.length - 1; i >= 0; i--) {
        const s = slashes[i];
        s.life -= s.decay;

        if (s.life <= 0) {
          slashes.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        // Core white-cyan blade flash
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.life * 0.95})`;
        ctx.lineWidth = 2.5 * s.life;
        ctx.shadowColor = `rgba(103, 186, 230, ${s.life})`;
        ctx.shadowBlur = 20 * s.life;
        ctx.beginPath();
        ctx.moveTo(-s.length * 0.35, 0);
        ctx.lineTo(s.length * 0.65, 0);
        ctx.stroke();

        // Outer Rose-Coral blade halo
        ctx.strokeStyle = `rgba(250, 81, 104, ${s.life * 0.8})`;
        ctx.lineWidth = 6 * s.life;
        ctx.shadowBlur = 35 * s.life;
        ctx.shadowColor = `rgba(253, 157, 115, ${s.life * 0.8})`;
        ctx.stroke();

        ctx.restore();
      }

      // Render Theme Petal Embers
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size, p.size * 0.55, p.vx * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.life * 0.9})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />
      {/* Theme cursor dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ top: 0, left: 0 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#0689A7] via-[#FA5168] to-[#FD9D73] shadow-[0_0_10px_rgba(250,81,104,0.9)]" />
      </div>
      {/* Soft follower ring */}
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2"
        style={{ top: 0, left: 0 }}
      >
        <div className="w-8 h-8 rounded-full border border-[#67BAE6]/70 shadow-[0_0_10px_rgba(103,186,230,0.4)]" />
      </div>
    </>
  );
}
