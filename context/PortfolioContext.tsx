import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ContactMessage } from '../types';
import { DATA as INITIAL_DATA } from '../constants';

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  markRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize data from LocalStorage or constants
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge profile to ensure new fields (like bio) are present
        return {
          ...INITIAL_DATA,
          ...parsed,
          profile: {
            ...INITIAL_DATA.profile,
            ...parsed.profile
          },
          // Ensure arrays exist
          slideshow: parsed.slideshow || INITIAL_DATA.slideshow,
          socials: parsed.socials || INITIAL_DATA.socials,
          education: parsed.education || INITIAL_DATA.education,
          experience: parsed.experience || INITIAL_DATA.experience,
          skills: parsed.skills || INITIAL_DATA.skills,
          projects: parsed.projects || INITIAL_DATA.projects,
          awards: parsed.awards || INITIAL_DATA.awards,
          extracurricular: parsed.extracurricular || INITIAL_DATA.extracurricular,
          socialWork: parsed.socialWork || INITIAL_DATA.socialWork,
        };
      } catch (e) {
        console.error("Failed to parse saved data", e);
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('portfolio_messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
    // Update timestamp whenever data changes
    localStorage.setItem('portfolio_data_timestamp', Date.now().toString());
  }, [data]);

  useEffect(() => {
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));
  }, [messages]);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    
    // Notify user on mobile devices to reload for changes to take effect
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Set a flag that can be checked by the app
      sessionStorage.setItem('portfolio_updated', 'true');
    }
  };

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all content to default? This cannot be undone.")) {
      setData(INITIAL_DATA);
      localStorage.removeItem('portfolio_data');
    }
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const markRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: string) => {
    if (window.confirm("Delete this message?")) {
      setMessages(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, messages, addMessage, markRead, deleteMessage, resetToDefaults }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};