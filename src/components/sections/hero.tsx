import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Play, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import heroImg from '../../assets/images/hero-ring.png'

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, controls, initial } = useScrollAnimation(containerRef);

  const scrollToPreOrder = () => {
    const preOrderSec = document.getElementById('pre-order');
    if (preOrderSec) {
      preOrderSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-6 overflow-hidden bg-linear-to-b from-[#f7f9fb] via-[#f7f9fb] to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300"
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-[#2563eb]/5 dark:bg-[#2563eb]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-300 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Info Column */}
        <motion.div
          animate={controls}
          initial={initial}
          className="flex flex-col text-left space-y-6 max-w-xl"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-[#6ffbbe] text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Next Gen Health
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-800 dark:text-white leading-[1.1]">
            Your Health. <br />
            <span className="text-[#004ac6] dark:text-[#2563eb]">On Your Finger.</span>
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Precision biometric monitoring crafted into a single band of aerospace-grade titanium. The AuraRing X tracks what matters, so you can focus on being your best self.
          </p>

          {/* Core Checklist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-300">
              <CheckCircle size={18} className="text-emerald-500" />
              <span>Clinical-grade heart rate monitoring</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-300">
              <CheckCircle size={18} className="text-emerald-500" />
              <span>Advanced sleep phase analysis</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" onClick={scrollToPreOrder}>
              Pre-order Now
            </Button>
            <Button
              variant="secondary"
              onClick={() => alert('Watch Film: Introducing the AuraRing X (Coming Soon!)')}
            >
              <Play size={16} className="fill-slate-800 dark:fill-white text-slate-800 dark:text-white" />
              Watch Film
            </Button>
          </div>
        </motion.div>

        {/* Right Ring Render Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="flex justify-center items-center relative"
        >
          {/* Card shadow reflection background panel */}
          <div className="absolute inset-0 bg-linear-to-tr from-[#004ac6]/10 to-emerald-500/10 dark:from-[#2563eb]/20 dark:to-emerald-500/20 rounded-3xl blur-2xl -z-10 transform scale-95" />

          <div className="p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl relative max-w-105 w-full aspect-square flex items-center justify-center overflow-hidden">
            <img
              src={heroImg}
              alt="AuraRing X Ring Render"
              className="w-4/5 h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,74,198,0.25)] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
