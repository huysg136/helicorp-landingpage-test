import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Moon, HeartPulse, Shield, Zap, Droplets } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const Insights: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { ref: titleAnimRef, controls: titleControls, initial: titleInitial } = useScrollAnimation(titleRef);

  const sleepRef = useRef<HTMLDivElement>(null);
  const { ref: sleepAnimRef, controls: sleepControls, initial: sleepInitial } = useScrollAnimation(sleepRef);

  const heartRef = useRef<HTMLDivElement>(null);
  const { ref: heartAnimRef, controls: heartControls, initial: heartInitial } = useScrollAnimation(heartRef, 0.15);

  const shellRef = useRef<HTMLDivElement>(null);
  const { ref: shellAnimRef, controls: shellControls, initial: shellInitial } = useScrollAnimation(shellRef, 0.3);

  return (
    <section id="features" className="py-24 px-6 bg-[#f7f9fb] dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-300 mx-auto">

        {/* Title area */}
        <motion.div
          ref={titleAnimRef as React.RefObject<HTMLDivElement>}
          initial={titleInitial}
          animate={titleControls}
          className="max-w-2xl mx-auto mb-12 space-y-3 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
            Incredible Insight
          </h2>
          <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Smaller than a coin, smarter than a watch. AuraRing X packs industry-leading sensors{' '}
            <br className="hidden md:block" />
            into a{' '}
            <span className="text-[#004ac6] dark:text-blue-400 font-medium">2.5mm profile.</span>
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Card lớn: Sleep Tracking - chiếm 2 hàng bên trái */}
          <motion.div
            ref={sleepAnimRef as React.RefObject<HTMLDivElement>}
            initial={sleepInitial}
            animate={sleepControls}
            className="md:row-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-8 flex flex-col justify-between min-h-105 hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-black/20 transition-shadow duration-500"
          >
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Moon size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white pt-2">
                Sleep Tracking
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                Analyze your REM, deep, and light sleep stages with 99% accuracy.{' '}
                <span className="text-[#004ac6] dark:text-blue-400">Wake up refreshed with our smart alarm vibration.</span>
              </p>
            </div>

            {/* Hình minh họa lớn - sleep wave visualization */}
            <div className="relative mt-8 flex-1 rounded-2xl bg-linear-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900/50 border border-indigo-100/60 dark:border-indigo-900/30 flex items-end p-6 overflow-hidden">
              <svg viewBox="0 0 300 100" className="w-full h-32" preserveAspectRatio="none">
                <path
                  d="M0,70 C20,60 30,80 50,50 C70,20 90,30 110,45 C130,60 150,20 170,15 C190,10 210,40 230,55 C250,70 270,35 300,45"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                />
              </svg>
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur text-[10px] font-semibold text-indigo-600 dark:text-indigo-300">
                REM · Deep · Light
              </div>
            </div>
          </motion.div>

          {/* Card nhỏ: Heart Rate */}
          <motion.div
            ref={heartAnimRef as React.RefObject<HTMLDivElement>}
            initial={heartInitial}
            animate={heartControls}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-8 flex items-center justify-between gap-6 min-h-50 hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-black/20 transition-shadow duration-500"
          >
            <div className="space-y-2 flex-1">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                <HeartPulse size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white pt-2">
                Heart Rate
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Continuous monitoring of HRV and blood oxygen (SpO2).{' '}
                <span className="text-[#004ac6] dark:text-blue-400">Instant irregular pattern alerts.</span>
              </p>
            </div>

            {/* Mini stat visual */}
            <div className="hidden sm:flex flex-col items-center justify-center shrink-0 w-24 h-24 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-900/30">
              <span className="text-2xl font-bold text-rose-500">72</span>
              <span className="text-[10px] text-rose-400 font-medium tracking-wide">BPM</span>
            </div>
          </motion.div>

          {/* Card nhỏ: Titanium Shell */}
          <motion.div
            ref={shellAnimRef as React.RefObject<HTMLDivElement>}
            initial={shellInitial}
            animate={shellControls}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-8 flex items-center justify-between gap-6 min-h-50 hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-black/20 transition-shadow duration-500"
          >
            <div className="space-y-2 flex-1">
              <div className="w-11 h-11 rounded-2xl bg-slate-500/10 flex items-center justify-center text-slate-500 dark:text-slate-300">
                <Shield size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white pt-2">
                Titanium Shell
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Engineered with Grade 5 Titanium.{' '}
                <span className="text-[#004ac6] dark:text-blue-400">Lighter than steel, worn 24/7.</span>
              </p>
            </div>

            {/* Mini badges */}
            <div className="hidden sm:flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <Zap size={12} className="text-amber-500" />
                <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Grade 5</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <Droplets size={12} className="text-sky-500" />
                <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">50m WR</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};