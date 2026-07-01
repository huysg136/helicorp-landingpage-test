import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FeatureCard } from '../ui/feature-card';
import { Moon, Heart, Shield } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const Insights: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, controls, initial } = useScrollAnimation(containerRef);

  const features = [
    {
      title: 'Sleep Tracking',
      description: 'Analyze your REM, deep, and light sleep stages with 99% accuracy. Wake up refreshed with our smart alarm vibration.',
      icon: Moon,
      iconBgColor: 'rgba(59, 130, 246, 0.1)',
      iconColor: '#2563eb',
    },
    {
      title: 'Heart Rate',
      description: 'Continuous monitoring of HRV and blood oxygen (SpO2). Get notified of irregular patterns instantly.',
      icon: Heart,
      iconBgColor: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10b981',
    },
    {
      title: 'Titanium Shell',
      description: 'Engineered with Grade 5 Titanium. Lighter than steel, stronger than carbon. Designed to be worn 24/7.',
      icon: Shield,
      iconBgColor: 'rgba(124, 58, 237, 0.1)',
      iconColor: '#7c3aed',
    },
  ];

  return (
    <section
      id="features"
      ref={ref}
      className="py-24 px-6 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Title area */}
        <motion.div
          animate={controls}
          initial={initial}
          className="max-w-2xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
            Incredible Insight
          </h2>
          <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Smaller than a coin, smarter than a watch. AuraRing X packs industry-leading sensors into a 2.5mm profile.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <FeatureCard
                title={feat.title}
                description={feat.description}
                icon={feat.icon}
                iconBgColor={feat.iconBgColor}
                iconColor={feat.iconColor}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
