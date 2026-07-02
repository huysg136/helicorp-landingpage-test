import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { BatteryCharging, Droplets, Bluetooth } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface Spec {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
  accent: string;       // text color for icon + value
  iconBg: string;        // icon background
}

const specs: Spec[] = [
  {
    label: 'Battery Life',
    value: '7 Days',
    description: 'Full charge in 60 minutes via magnetic puck.',
    icon: BatteryCharging,
    accent: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
  },
  {
    label: 'Durability',
    value: '50m',
    description: 'Water resistant. Ocean and shower safe.',
    icon: Droplets,
    accent: 'text-sky-500',
    iconBg: 'bg-sky-500/10',
  },
  {
    label: 'Connectivity',
    value: 'BLE 5.2',
    description: 'Seamless sync with iOS & Android Health.',
    icon: Bluetooth,
    accent: 'text-[#004ac6] dark:text-blue-400',
    iconBg: 'bg-[#004ac6]/10 dark:bg-blue-400/10',
  },
];

const SpecCard: React.FC<{ spec: Spec; delay: number }> = ({ spec, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, controls, initial } = useScrollAnimation(cardRef, delay);
  const Icon = spec.icon;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={initial}
      animate={controls}
      className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-black/30 transition-all duration-500"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-2xl ${spec.iconBg} flex items-center justify-center ${spec.accent} mb-6`}>
        <Icon size={22} />
      </div>

      {/* Label */}
      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
        {spec.label}
      </span>

      {/* Big value */}
      <p className={`text-4xl font-bold tracking-tight mt-1 mb-3 ${spec.accent}`}>
        {spec.value}
      </p>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {spec.description}
      </p>

      {/* Decorative corner glow */}
      <div className={`absolute -bottom-8 -right-8 w-28 h-28 rounded-full ${spec.iconBg} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  );
};

export const SpecsGrid: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { ref: titleAnimRef, controls: titleControls, initial: titleInitial } = useScrollAnimation(titleRef);

  return (
    <section
      id="specs"
      className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-300 mx-auto">
        <motion.div
          ref={titleAnimRef as React.RefObject<HTMLDivElement>}
          initial={titleInitial}
          animate={titleControls}
          className="max-w-xl mx-auto mb-10 text-center space-y-2"
        >
          <span className="text-[10px] font-bold text-[#004ac6] dark:text-blue-400 tracking-wider uppercase">
            By the numbers
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
            Built to Perform
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {specs.map((spec, index) => (
            <SpecCard key={spec.label} spec={spec} delay={index * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
};