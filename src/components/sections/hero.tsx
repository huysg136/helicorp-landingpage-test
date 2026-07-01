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
      className="relative flex items-center justify-center py-12 px-6 overflow-hidden bg-linear-to-b from-[#f7f9fb] via-[#f7f9fb] to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300"
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-[#2563eb]/5 dark:bg-[#2563eb]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-300 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-10 items-center relative z-10">
        {/* Left Info Column */}
        <motion.div
          animate={controls}
          initial={initial}
          className="flex flex-col text-left space-y-6 max-w-xl"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-blue-400 text-[10px] font-bold tracking-wider uppercase">
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
        <div className="flex justify-center items-center relative">
          <motion.img
            src={heroImg}
            alt="AuraRing X Ring Render"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -14, 0],
              rotate: [0, 6, 0],
            }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut' },
              scale: { duration: 0.8, ease: 'easeOut' },
              y: { duration: 3.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
              rotate: { duration: 3.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
            }}
            className="w-3/5 max-w-105 rounded-2xl h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,74,198,0.25)]"
          />
        </div>
      </div>
    </section>
  );
};