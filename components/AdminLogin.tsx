import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get password from storage or default to 'iamtheadmin321'
    const currentPassword = localStorage.getItem('admin_password') || 'iamtheadmin321';
    
    if (password === currentPassword) {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
            <Lock size={32} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-2">Admin Access</h2>
        <p className="text-center text-zinc-500 text-sm mb-6">Enter password to manage content</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-900 dark:text-zinc-100 transition-all"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">Incorrect password</p>}
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Access Dashboard
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};