import React, { useState } from 'react';
import { Navbar } from './components/layout/navbar';
import { Hero } from './components/sections/hero';
import { Insights } from './components/sections/insights';
import { SpecsGrid } from './components/sections/specs-grid';
import { ProductConfig } from './components/sections/product-config';
import { Newsletter } from './components/sections/newsletter';
import { Footer } from './components/layout/footer';
import { ChatButton } from './components/chatbot/chat-button';
import { ChatWindow } from './components/chatbot/chat-window';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sync initial theme to document class on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('auraring-store');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        const currentTheme = parsed.state?.theme || 'light';
        if (currentTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f9fb] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 antialiased">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Sections */}
      <main className="max-w-300 mx-auto">
        <Hero />
        <Insights />
        <SpecsGrid />
        <ProductConfig />
        <Newsletter />
      </main>

      {/* Footer layout */}
      <Footer />

      {/* Chatbot module */}
      <ChatButton onClick={() => setIsChatOpen(!isChatOpen)} isOpen={isChatOpen} />
      {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default App;
