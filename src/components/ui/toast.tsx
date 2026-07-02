import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToastStore, Toast as ToastType } from '../../store/useToastStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastType; onClose: () => void }> = ({ toast, onClose }) => {
  const icons = {
    success: <CheckCircle className="text-emerald-500 w-5 h-5 flex-shrink-0" />,
    error: <AlertCircle className="text-rose-500 w-5 h-5 flex-shrink-0" />,
    info: <Info className="text-blue-500 w-5 h-5 flex-shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/20 dark:border-emerald-500/30',
    error: 'border-rose-500/20 dark:border-rose-500/30',
    info: 'border-blue-500/20 dark:border-blue-500/30',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl ${borders[toast.type]} transition-all`}
    >
      {icons[toast.type]}
      <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200 text-left leading-relaxed">
        {toast.message}
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
