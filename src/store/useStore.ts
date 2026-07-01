import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface StoreState {
  cart: CartItem[];
  wishlist: boolean;
  theme: 'light' | 'dark';
  addToCart: (item: Omit<CartItem, 'price'>) => void;
  removeFromCart: (index: number) => void;
  toggleWishlist: () => void;
  toggleTheme: () => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: false,
      theme: 'light',
      addToCart: (item) =>
        set((state) => {
          // Check if item with same color and size exists
          const existingIndex = state.cart.findIndex(
            (i) => i.color === item.color && i.size === item.size
          );
          if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += item.quantity;
            return { cart: newCart };
          }
          return { cart: [...state.cart, { ...item, price: 399 }] };
        }),
      removeFromCart: (index) =>
        set((state) => ({
          cart: state.cart.filter((_, i) => i !== index),
        })),
      toggleWishlist: () => set((state) => ({ wishlist: !state.wishlist })),
      toggleTheme: () =>
        set((state) => {
          const nextTheme = state.theme === 'light' ? 'dark' : 'light';
          if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: nextTheme };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'auraring-store',
    }
  )
);
