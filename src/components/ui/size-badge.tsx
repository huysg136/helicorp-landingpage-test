import React from 'react';

interface SizeBadgeProps {
  size: number;
  isSelected: boolean;
  onClick: () => void;
}

export const SizeBadge: React.FC<SizeBadgeProps> = ({
  size,
  isSelected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center border focus:outline-none ${
        isSelected
          ? 'bg-[#004ac6] border-[#004ac6] text-white shadow-md shadow-[#004ac6]/15'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {size}
    </button>
  );
};
