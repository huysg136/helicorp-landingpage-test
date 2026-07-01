import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f8fafc] dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-300 mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {/* Col 1: Brand details */}
          <div>
            <h3 className="text-[#004ac6] dark:text-blue-400 font-bold text-lg mb-4 tracking-tight">
              AuraRing Tech
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Revolutionizing the way we connect with our biological rhythms. Founded in 2026.
            </p>
          </div>

          {/* Col 2: Support list */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-semibold text-sm mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#sizing" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  Sizing Kit
                </a>
              </li>
              <li>
                <a href="#warranty" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal stuff */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-semibold text-sm mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#privacy" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {currentYear} AuraRing Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-xs text-slate-400 dark:text-slate-500">
              System Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
