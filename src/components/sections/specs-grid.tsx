import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { SpecItem } from '../ui/spec-item';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const SpecsGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, controls, initial } = useScrollAnimation(containerRef);

  const specs = [
    {
      label: 'Battery Life',
      value: '7 Days',
      description: 'Full charge in 60 minutes via magnetic puck.',
    },
    {
      label: 'Durability',
      value: '50m',
      description: 'Water resistant. Ocean and shower safe.',
    },
    {
      label: 'Connectivity',
      value: 'BLE 5.2',
      description: 'Seamless sync with iOS & Android Health.',
    },
  ];

  return (
    <section
      id="specs"
      ref={ref}
      className="py-16 px-6 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          animate={controls}
          initial={initial}
          className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-2 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 divide-slate-200 dark:divide-slate-800">
            {specs.map((spec, index) => (
              <SpecItem
                key={index}
                label={spec.label}
                value={spec.value}
                description={spec.description}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
