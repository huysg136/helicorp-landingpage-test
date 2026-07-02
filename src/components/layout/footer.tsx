import React from 'react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../utils/translations';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguageStore();
  const t = translations[language];

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
              {t.brandDesc}
            </p>
          </div>

          {/* Col 2: Support list */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-semibold text-sm mb-4">
              {t.support}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#pre-order" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  {t.sizingKit}
                </a>
              </li>
              <li>
                <a href="#pre-order" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  {t.warranty}
                </a>
              </li>
              <li>
                <a href="#pre-order" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  {t.shippingReturns}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal stuff */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-semibold text-sm mb-4">
              {t.legal}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#privacy" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  {t.privacyPolicy}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  {t.termsOfService}
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors">
                  {t.cookiePolicy}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {currentYear} {t.allRightsReserved}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {t.systemOnline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
