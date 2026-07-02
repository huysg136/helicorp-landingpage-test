import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { validateEmail, validateName } from '../../utils/validation';
import { useToastStore } from '../../store/useToastStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { translations } from '../../utils/translations';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const Newsletter: React.FC = () => {
  const { addToast } = useToastStore();
  const { language } = useLanguageStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, controls, initial } = useScrollAnimation(containerRef);

  const t = translations[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    setNameError('');
    setEmailError('');

    if (!validateName(name)) {
      setNameError(t.nameError);
      isValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError(t.emailError);
      isValid = false;
    }

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // Simulate network request delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      setIsSuccess(true);
      addToast(t.successSubscribe, 'success');
      setName('');
      setEmail('');
    } catch (err) {
      console.error(err);
      addToast(t.subscribeFailed, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="newsletter"
      ref={ref}
      className="py-24 px-6 bg-[#f8fafc] dark:bg-[#0a0e14] transition-colors duration-300"
    >
      <div className="max-w-160 mx-auto text-center">
        <motion.div
          animate={controls}
          initial={initial}
          className="relative overflow-hidden bg-white dark:bg-[#12161f] border border-slate-100 dark:border-slate-800/60 rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-900/5 dark:shadow-2xl dark:shadow-black/40 space-y-8"
        >
          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-blue-500 via-cyan-400 to-emerald-400" />

          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
              {t.stayAhead}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.newsletterDesc}
            </p>
          </div>

          {isSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium animate-fadeIn">
              {t.successSubscribe}
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="fullNameInput"
                type="text"
                placeholder={t.fullNamePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                disabled={isSubmitting}
                className="bg-slate-50 dark:bg-[#191d27] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#004ac6]/40 dark:focus-visible:ring-cyan-400/50"
              />
              <Input
                id="emailAddressInput"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                disabled={isSubmitting}
                className="bg-slate-50 dark:bg-[#191d27] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl h-12 px-4 focus-visible:ring-1 focus-visible:ring-[#004ac6]/40 dark:focus-visible:ring-cyan-400/50"
              />
              
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#191c1e] hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-[#12161f] font-semibold rounded-xl h-12 shadow-none"
              >
                {isSubmitting ? t.submitting : t.getEarlyAccess}
              </Button>
            </form>
          )}

          {/* Privacy Note */}
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            {language === 'vi' ? (
              <>
                Bằng việc đăng ký, bạn đồng ý với{' '}
                <span className="text-slate-600 dark:text-slate-300 underline underline-offset-2">{t.privacyPolicy}</span> của chúng tôi.
              </>
            ) : (
              <>
                By subscribing, you agree to our{' '}
                <span className="text-slate-600 dark:text-slate-300 underline underline-offset-2">{t.privacyPolicy}</span>.
              </>
            )}
          </p>

        </motion.div>
      </div>
    </section>
  );
};  