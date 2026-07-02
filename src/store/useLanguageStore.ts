import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'vi';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en', // Default language is English
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'auraring-language',
    }
  )
);
