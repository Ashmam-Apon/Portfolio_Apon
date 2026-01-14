import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick, onContactClick }) => {
  const { data } = usePortfolio();

  return (
    <footer id="contact" className="py-24 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">
          Let's Work Together
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-12 text-lg">
          I'm currently available for projects and open to new opportunities. 
          Feel free to reach out if you want to build something amazing.
        </p>
        
        <button 
          onClick={onContactClick}
          className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-semibold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 transition-all duration-300"
        >
          <Mail size={20} />
          Say Hello
        </button>

        <div className="mt-24 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-600 text-sm">
            <button 
              onClick={onAdminClick}
              className="hover:text-zinc-900 dark:hover:text-zinc-400 transition-colors"
              aria-label="Admin Access"
            >
              <Lock size={12} />
            </button>
            <span>© {new Date().getFullYear()} {data.profile.name}. All rights reserved.</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-700 text-xs font-medium">
            Designed & Built by {data.profile.alias}
          </p>
        </div>
      </div>
    </footer>
  );
};
