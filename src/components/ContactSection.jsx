import React, { useState } from 'react';
import { Mail, Send, Check, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
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

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    soundManager.playKatanaChime();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      soundManager.playTick();
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <footer id="contact" className="py-24 bg-white/80 backdrop-blur-xl relative border-t border-white/60 overflow-hidden">
      {/* Sakura watermark orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-bl from-[#F8E4ED]/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gradient-to-tr from-[#F5E9CF]/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-[#FA5168]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#FA5168]">
                  INITIATE CONTACT
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#0A192F] tracking-tight">
                THE JOURNEY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FA5168] to-[#C9A55A] text-glow">
                  CONTINUES.
                </span>
              </h2>
            </div>

            <p className="text-sm text-[#6B4D5A] font-light leading-relaxed">
              Have an engineering project, cybersecurity inquiry, or technology collaboration? Reach out directly across verified channels.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FDF2F7] border-2 border-[#E8D0DC] hover:border-[#FA5168] text-xs font-mono text-[#6B4D5A] hover:text-[#FA5168] flex items-center gap-2 transition-all hover:scale-105 shadow-sm"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Mail className="w-4 h-4 text-[#FA5168]" />}
                <span>{copiedEmail ? 'COPIED!' : personalInfo.email}</span>
              </button>

              <a
                href="https://github.com/jabirjalal12"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playTick()}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF6F4] border-2 border-[#E8D0DC] hover:border-[#7C3B5C] text-xs font-mono text-[#6B4D5A] hover:text-[#7C3B5C] flex items-center gap-2 transition-all hover:scale-105 shadow-sm"
              >
                <GithubIcon className="w-4 h-4 text-[#7C3B5C]" />
                <span>GITHUB (jabirjalal12)</span>
              </a>

              <a
                href="https://www.linkedin.com/in/muhammad-jabir-jalal-141661334"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playTick()}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F0F8FF] border-2 border-[#E8D0DC] hover:border-[#0077B5] text-xs font-mono text-[#6B4D5A] hover:text-[#0077B5] flex items-center gap-2 transition-all hover:scale-105 shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                <span>LINKEDIN</span>
              </a>

              <a
                href="https://www.instagram.com/_ja_bir.ja_la.l?stkn=NHJrNnFsbmFsNzRz"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playTick()}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FDF2F7] border-2 border-[#E8D0DC] hover:border-[#E1306C] text-xs font-mono text-[#6B4D5A] hover:text-[#E1306C] flex items-center gap-2 transition-all hover:scale-105 shadow-sm group"
              >
                <InstagramIcon className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
                <span>INSTAGRAM</span>
              </a>
            </div>

            {/* Decorative sakura divider */}
            <div className="hamon-divider" />

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-mono text-[#334E68]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FA5168]" />
                <span>Location: Kerala, India</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#334E68]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A55A]" />
                <span>{personalInfo.status}</span>
              </div>
            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8D0DC] shadow-[0_8px_40px_rgba(250,81,104,0.1)]">
            {sent ? (
              <div className="p-6 rounded-2xl bg-[#FDF2F7] border border-[#E8D0DC] text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#FA5168]/10 border border-[#E8D0DC] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 text-[#FA5168]" />
                </div>
                <h4 className="font-heading font-bold text-[#0A192F] text-sm">TRANSMISSION RECEIVED</h4>
                <p className="text-xs text-[#334E68] font-light">I will respond to your message shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#EFE2E8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FA5168]" />
                  <span className="text-xs font-mono font-bold text-[#0A192F] tracking-wider">DIRECT TRANSMISSION</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#9B7B8B] mb-1 tracking-wider">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF6F4] border-2 border-[#E8D0DC] text-xs text-[#0A192F] focus:outline-none focus:border-[#FA5168] font-mono transition-colors placeholder:text-[#C9B8BF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#9B7B8B] mb-1 tracking-wider">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF6F4] border-2 border-[#E8D0DC] text-xs text-[#0A192F] focus:outline-none focus:border-[#FA5168] font-mono transition-colors placeholder:text-[#C9B8BF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#9B7B8B] mb-1 tracking-wider">MESSAGE</label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Your project inquiry, engineering consultation, or opportunity..."
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF6F4] border-2 border-[#E8D0DC] text-xs text-[#0A192F] focus:outline-none focus:border-[#FA5168] font-mono transition-colors placeholder:text-[#C9B8BF] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl samurai-btn text-white font-mono text-xs font-bold transition-all shadow-[0_4px_20px_rgba(250,81,104,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND TRANSMISSION</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Minimal Kyoto-style Footer with Small MUHAMMAD Name Display */}
        <div className="pt-10 border-t border-[#EFE2E8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-[#FA5168]/50 flex items-center justify-center bg-white shadow-[0_0_10px_rgba(250,81,104,0.2)]">
              <span className="font-display font-black text-xs text-[#FA5168]">JJ</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] font-mono text-[#FA5168] font-bold">MUHAMMAD</span>
                <span className="font-heading font-black text-xs text-[#0A192F] tracking-wider block">
                  JABIR JALAL
                </span>
              </div>
              <span className="text-[10px] text-[#9B7B8B] font-mono block">
                Aeronautical Engineer • Cybersecurity • Creative Tech
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#9B7B8B]">
            <span>© 2026 Muhammad Jabir Jalal. All rights reserved.</span>
            <button
              onClick={() => { soundManager.playTick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="p-2 rounded-full bg-white border border-[#E8D0DC] hover:bg-[#FDF2F7] hover:border-[#FA5168] text-[#9B7B8B] hover:text-[#FA5168] transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
