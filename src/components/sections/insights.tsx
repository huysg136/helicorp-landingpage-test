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
        <span className="text-[#004ac6] dark:text-blue-400">Wake up refreshed with our smart alarm vibration.</span>
      </>
    ),
    icon: Moon,
    iconBgColor: 'rgba(96, 165, 250, 0.12)',   // đồng bộ theo blue-400
    iconColor: '#60a5fa',
  },
  {
    title: 'Heart Rate',
    description: (
      <>
        Continuous monitoring of HRV and blood oxygen (SpO2).{' '}
        <span className="text-[#004ac6] dark:text-blue-400">Get notified of irregular patterns instantly.</span>
      </>
    ),
    icon: Heart,
    iconBgColor: 'rgba(52, 211, 153, 0.12)',   // emerald-400, giữ làm điểm nhấn "sức khỏe"
    iconColor: '#34d399',
  },
  {
    title: 'Titanium Shell',
    description: (
      <>
        Engineered with Grade 5 Titanium.{' '}
        <span className="text-[#004ac6] dark:text-blue-400">Lighter than steel, stronger than carbon. Designed to be worn 24/7.</span>
      </>
    ),
    icon: Shield,
    iconBgColor: 'rgba(148, 163, 184, 0.12)',  // slate-400, trung tính thay vì tím
    iconColor: '#94a3b8',
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
            <span className="text-[#004ac6] dark:text-blue-400 font-medium">2.5mm profile.</span>
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