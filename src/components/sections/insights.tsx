import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FeatureCard } from '../ui/feature-card';
import { Moon, Heart, Shield, LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface Feature {
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    title: 'Sleep Tracking',
    description: (
      <>
        Analyze your REM, deep, and light sleep stages with 99% accuracy.{' '}
        <span className="text-[#004ac6] dark:text-[#6ffbbe]">Wake up refreshed with our smart alarm vibration.</span>
      </>
    ),
    icon: Moon,
    iconBgColor: 'rgba(99, 102, 241, 0.12)',
    iconColor: '#6366f1',
  },
  {
    title: 'Heart Rate',
    description: (
      <>
        Continuous monitoring of HRV and blood oxygen (SpO2).{' '}
        <span className="text-[#004ac6] dark:text-[#6ffbbe]">Get notified of irregular patterns instantly.</span>
      </>
    ),
    icon: Heart,
    iconBgColor: 'rgba(16, 185, 129, 0.12)',
    iconColor: '#10b981',
  },
  {
    title: 'Titanium Shell',
    description: (
      <>
        Engineered with Grade 5 Titanium.{' '}
        <span className="text-[#004ac6] dark:text-[#6ffbbe]">Lighter than steel, stronger than carbon. Designed to be worn 24/7.</span>
      </>
    ),
    icon: Shield,
    iconBgColor: 'rgba(124, 58, 237, 0.12)',
    iconColor: '#7c3aed',
  },
];

// Each card observes the viewport independently, so animation isn't
// dependent on Framer Motion's variant-propagation (which requires the
// parent's `animate` prop to be a variant label string, not a raw object).
const AnimatedFeatureCard: React.FC<{ feat: Feature; delay: number }> = ({ feat, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, controls, initial } = useScrollAnimation(cardRef, delay);

  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} initial={initial} animate={controls}>
      <FeatureCard
        title={feat.title}
        description={feat.description}
        icon={feat.icon}
        iconBgColor={feat.iconBgColor}
        iconColor={feat.iconColor}
      />
    </motion.div>
  );
};

export const Insights: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { ref: titleAnimRef, controls: titleControls, initial: titleInitial } = useScrollAnimation(titleRef);

  return (
    <section id="features" className="py-24 px-6 bg-[#f7f9fb] dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-300 mx-auto text-center">
        {/* Title area */}
        <motion.div
          ref={titleAnimRef as React.RefObject<HTMLDivElement>}
          initial={titleInitial}
          animate={titleControls}
          className="max-w-2xl mx-auto mb-12 space-y-3"
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
            Incredible Insight
          </h2>
          <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Smaller than a coin, smarter than a watch. AuraRing X packs industry-leading sensors{' '}
            <br className="hidden md:block" />
            into a{' '}
            <span className="text-[#004ac6] dark:text-[#6ffbbe] font-medium">2.5mm profile.</span>
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feat, index) => (
            <AnimatedFeatureCard key={feat.title} feat={feat} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};