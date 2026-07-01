import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col text-left h-full">
      {/* Icon box */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon size={20} style={{ color: iconColor }} />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};
