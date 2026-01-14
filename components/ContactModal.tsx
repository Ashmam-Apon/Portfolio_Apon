import React, { useState } from 'react';
import { X, Send, Loader2, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { addMessage } = usePortfolio();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Save to Internal Dashboard (Backup)
    addMessage(formData);

    // 2. Prepare Mailto Link
    const recipient = "ashmamaponr@gmail.com";
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    // 3. Open Email Client
    // We use a small timeout to allow the UI to update before redirecting
    await new Promise(resolve => setTimeout(resolve, 800));
    
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    setLoading(false);
    setFormData({ name: '', email: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-lg p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Say Hello</h2>
        <p className="text-zinc-500 mb-8">Got a project in mind? Let's talk.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Message</label>
            <textarea 
              required
              rows={4}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Opening Email Client...
              </>
            ) : (
              <>
                <Send size={18} /> Send via Email App
              </>
            )}
          </button>
          
          <p className="text-xs text-center text-zinc-400 mt-4">
            This will open your default email app to send the message.
          </p>
        </form>
      </div>
    </div>
  );
};