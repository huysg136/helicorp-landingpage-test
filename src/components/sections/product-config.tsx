import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ColorSwatch } from '../ui/color-swatch';
import { SizeBadge } from '../ui/size-badge';
import { Button } from '../ui/button';
import { useStore } from '../../store/useStore';
import { sendWebhookNotification } from '../../services/webhook';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Heart } from 'lucide-react';
import productImg from '../../assets/images/product-variants.webp';

export const ProductConfig: React.FC = () => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, controls, initial } = useScrollAnimation(containerRef);

  const colors = [
    { name: 'Matte Black', hex: '#0a0a0c' },
    { name: 'Chrome Silver', hex: '#e2e8f0' },
    { name: 'Rose Gold', hex: '#fcd34d' },
  ];

  const sizes = [6, 7, 8, 9];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]); // Default size 8
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart({
      color: selectedColor.name,
      size: selectedSize,
      quantity: 1,
    });

    await sendWebhookNotification({
      event: 'pre_order',
      details: `Pre-ordered AuraRing X (${selectedColor.name}, Size: ${selectedSize})`,
      timestamp: new Date().toLocaleString(),
    });

    setTimeout(() => {
      setIsAdding(false);
      alert(`Success! AuraRing X (${selectedColor.name}, Size: ${selectedSize}) added to cart.`);
    }, 800);
  };

  const handleToggleWishlist = async () => {
    toggleWishlist();
    await sendWebhookNotification({
      event: 'wishlist_toggle',
      details: `Toggled wishlist. Current State: ${!wishlist ? 'Active' : 'Inactive'}`,
      timestamp: new Date().toLocaleString(),
    });
  };

  return (
    <section
      id="pre-order"
      ref={ref}
      className="relative py-24 px-6 overflow-hidden bg-linear-to-b from-[#f7f9fb] via-[#f7f9fb] to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300"
    >
      {/* Dynamic Background Accents - matches Hero */}
      <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-[#2563eb]/5 dark:bg-[#2563eb]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-300 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Product Showcase Rendering Image */}
          <motion.div
            animate={controls}
            initial={initial}
            className="relative flex items-center justify-center"
          >
            <img
              src={productImg}
              alt="AuraRing X Configurator Showcase"
              className="w-full max-w-105 h-auto object-contain rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:scale-102 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          {/* Right Column: Interactive Configuration Form Details */}
          <motion.div
            animate={controls}
            initial={initial}
            className="flex flex-col text-left space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-white mb-2">
                AuraRing X
              </h2>
              <p className="text-2xl font-bold text-[#004ac6] dark:text-blue-400">
                9.990.000 VNĐ
              </p>
            </div>

            {/* Select Variant Finish */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                Select Finish
              </span>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <ColorSwatch
                    key={c.name}
                    colorHex={c.hex}
                    colorName={c.name}
                    isSelected={selectedColor.name === c.name}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
              <p className="text-xs italic text-slate-500 dark:text-slate-400">
                {selectedColor.name}
              </p>
            </div>

            {/* Select Sizing Config */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                  Select Size
                </span>
                <button
                  type="button"
                  onClick={() => alert('Sizing Kit Guide: We recommend ordering our free sizing kit first. Sizes match US standards (6-9).')}
                  className="text-xs font-semibold text-[#004ac6] dark:text-blue-400 hover:underline"
                >
                  Sizing Guide
                </button>
              </div>

              <div className="flex items-center gap-3">
                {sizes.map((s) => (
                  <SizeBadge
                    key={s}
                    size={s}
                    isSelected={selectedSize === s}
                    onClick={() => setSelectedSize(s)}
                  />
                ))}
              </div>
            </div>

            {/* Actions Block */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="primary"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>

              <button
                type="button"
                onClick={handleToggleWishlist}
                className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-300"
                title="Save variant to wishlist"
              >
                <Heart size={20} className={wishlist ? 'fill-red-500 text-red-500' : ''} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};