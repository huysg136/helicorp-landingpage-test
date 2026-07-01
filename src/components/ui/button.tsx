import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 transform active:scale-95 focus:outline-none flex items-center justify-center gap-2 text-sm';
  
  const variants = {
    primary: 'bg-[#004ac6] hover:bg-[#2563eb] text-white shadow-lg shadow-[#004ac6]/20 hover:shadow-[#2563eb]/30',
    secondary: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
