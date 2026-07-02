import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Menu, X, Heart, ShoppingBag, Sun, Moon, Trash2, Sparkles, Gauge, PackageCheck, ChevronRight } from 'lucide-react';
import logoImg from '../../assets/logo/logo.webp'

const navLinks = [
  { id: 'features', label: 'Features', icon: Sparkles },
  { id: 'specs', label: 'Specs', icon: Gauge },
  { id: 'pre-order', label: 'Pre-order', icon: PackageCheck },
];

export const Navbar: React.FC = () => {
  const { wishlist, cart, theme, toggleWishlist, toggleTheme, removeFromCart, clearCart } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const scrollToSection = (id: string) => {
    const isMobileMenuOpen = isMenuOpen;
    setIsMenuOpen(false);

    const doScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (isMobileMenuOpen) {
      // Đợi animation đóng mobile menu hoàn tất (300ms) trước khi scroll,
      // để layout ổn định — tránh 2 animation (menu collapse + scroll) đá nhau.
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 dark:bg-slate-900/75 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-300 mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <img
              src={logoImg}
              alt="AuraRing Logo"
              className="w-10 h-10 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">
              AuraRing X
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#004ac6] dark:bg-blue-400 rounded scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            {/* Wishlist toggle */}
            <button
              onClick={toggleWishlist}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              title="Favorite list"
            >
              <Heart size={19} className={wishlist ? 'fill-red-500 text-red-500' : ''} />
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-[#004ac6] dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Cart"
            >
              <ShoppingBag size={19} />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#004ac6] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Dark mode switcher */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-[#004ac6] dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
            </button>

            {/* Mobile Menu trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 ml-1 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={isMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="px-6 py-4 flex flex-col">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`flex items-center justify-between py-3.5 group ${
                        idx !== navLinks.length - 1 ? 'border-b border-slate-100 dark:border-slate-800/60' : ''
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-[#004ac6]/10 group-hover:text-[#004ac6] dark:group-hover:bg-blue-400/10 dark:group-hover:text-blue-400 transition-colors">
                          <Icon size={16} />
                        </span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-[#004ac6] dark:group-hover:text-blue-400 transition-colors">
                          {link.label}
                        </span>
                      </span>
                      <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Shopping Cart Sidebar Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-950 shadow-2xl flex flex-col">
              <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <ShoppingBag size={20} /> Cart ({totalCartCount})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center gap-2">
                    <ShoppingBag size={48} className="stroke-1 text-slate-300" />
                    <p className="text-sm font-medium">Your cart is empty.</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        scrollToSection('pre-order');
                      }}
                      className="text-xs text-[#004ac6] font-semibold hover:underline"
                    >
                      Pre-order yours now
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="text-left">
                        <p className="font-semibold text-sm text-slate-800 dark:text-white">
                          AuraRing X ({item.color})
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-[#004ac6] dark:text-blue-400 mt-1">
                          ${item.price * item.quantity} USD
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer pricing info */}
              {cart.length > 0 && (
                <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-white">
                    <span>Total Amount:</span>
                    <span className="text-lg font-bold text-[#004ac6] dark:text-blue-400">
                      ${totalCartPrice} USD
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={clearCart}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-500 hover:border-red-200 transition-all text-center"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => {
                        alert('Pre-order Checkout is simulated! Form webhook sent to admin.');
                        setIsCartOpen(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-xs font-semibold text-white transition-all text-center shadow-md shadow-[#004ac6]/10"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};