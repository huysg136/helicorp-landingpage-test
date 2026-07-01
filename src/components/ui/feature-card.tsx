import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
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
    <div className="bg-[#f8fafc] dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 flex flex-col text-left">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: iconBgColor, color: iconColor }}
      >
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};
