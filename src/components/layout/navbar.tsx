import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Menu, X, Heart, ShoppingBag, Sun, Moon, Trash2 } from 'lucide-react';
import logoImg from '../../assets/logo/logo.webp'

export const Navbar: React.FC = () => {
  const { wishlist, cart, theme, toggleWishlist, toggleTheme, removeFromCart, clearCart } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 dark:bg-slate-900/75 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-300 mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src={logoImg}
              alt="AuraRing Logo" 
              className="w-12 h-12" 
            />
            <span className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">
              AuraRing X
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('specs')}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors"
            >
              Specs
            </button>
            <button
              onClick={() => scrollToSection('pre-order')}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors relative"
            >
              Pre-order
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#004ac6] dark:text-blue-400 rounded" />
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist toggle */}
            <button
              onClick={toggleWishlist}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
              title="Favorite list"
            >
              <Heart size={20} className={wishlist ? 'fill-red-500 text-red-500' : ''} />
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors relative"
              title="Cart"
            >
              <ShoppingBag size={20} />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#004ac6] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Dark mode switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#004ac6] dark:hover:text-blue-400 transition-colors"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Mobile Menu trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex flex-col gap-4 animate-fadeIn">
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-2 font-medium text-slate-600 dark:text-slate-300 hover:text-[#004ac6]"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('specs')}
              className="text-left py-2 font-medium text-slate-600 dark:text-slate-300 hover:text-[#004ac6]"
            >
              Specs
            </button>
            <button
              onClick={() => scrollToSection('pre-order')}
              className="text-left py-2 font-medium text-slate-600 dark:text-slate-300 hover:text-[#004ac6] text-[#004ac6] dark:text-blue-400"
            >
              Pre-order
            </button>
          </div>
        )}
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
