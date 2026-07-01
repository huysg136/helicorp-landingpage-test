import React from 'react';

interface SpecItemProps {
  label: string;
  value: string;
  description: string;
}

export const SpecItem: React.FC<SpecItemProps> = ({
  label,
  value,
  description,
}) => {
  return (
    <div className="flex flex-col text-left px-6 py-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 last:border-0">
      <span className="text-[10px] font-bold text-[#004ac6] dark:text-[#6ffbbe] tracking-wider uppercase mb-2">
        {label}
      </span>
      <h3 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        {value}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};
