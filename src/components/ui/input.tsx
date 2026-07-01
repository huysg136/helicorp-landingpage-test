import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  error,
  label,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 tracking-wider uppercase"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all duration-300 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};
