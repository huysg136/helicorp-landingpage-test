import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#004ac6] hover:bg-[#2563eb] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ${
        isOpen ? 'rotate-90 bg-slate-700 hover:bg-slate-800' : ''
      }`}
      title="Ask AuraRing AI Assistant"
    >
      <MessageSquare size={24} className="animate-pulse" />
    </button>
  );
};
