import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { validateEmail, validateName } from '../../utils/validation';
import { sendWebhookNotification } from '../../services/webhook';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const Newsletter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, controls, initial } = useScrollAnimation(containerRef);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset Validation statuses
    let isValid = true;
    setNameError('');
    setEmailError('');

    if (!validateName(name)) {
      setNameError('Full name must be at least 2 characters.');
      isValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // Dispatches Webhook Notification
      await sendWebhookNotification({
        event: 'newsletter',
        email: email.trim(),
        name: name.trim(),
        details: 'User registered via newsletter stay ahead subscription form',
        timestamp: new Date().toLocaleString(),
      });
      
      setIsSuccess(true);
      setName('');
      setEmail('');
    } catch (err) {
      console.error(err);
      alert('Subscription failed. Please check connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="newsletter"
      ref={ref}
      className="py-24 px-6 bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-[640px] mx-auto text-center">
        <motion.div
          animate={controls}
          initial={initial}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-900/5 dark:shadow-none space-y-8"
        >
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
              Stay Ahead of the Curve
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Join 50,000+ early adopters receiving weekly health optimization tips and exclusive firmware updates.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium animate-fadeIn">
              🎉 Thank you for subscribing! We will send updates to your inbox.
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="fullNameInput"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                disabled={isSubmitting}
              />
              <Input
                id="emailAddressInput"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                disabled={isSubmitting}
              />
              
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#191c1e] hover:bg-slate-800 text-white dark:bg-[#191c1e] shadow-none"
              >
                {isSubmitting ? 'Registering...' : 'Get Early Access'}
              </Button>
            </form>
          )}

          {/* Privacy Note */}
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            By subscribing, you agree to our Privacy Policy.
          </p>

        </motion.div>
      </div>
    </section>
  );
};
