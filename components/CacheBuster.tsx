import { useEffect } from 'react';

/**
 * CacheBuster component
 * Monitors for changes in portfolio data and forces a reload on mobile browsers
 * This helps overcome aggressive caching on mobile devices
 */
export const CacheBuster: React.FC = () => {
  useEffect(() => {
    // Check every 30 seconds if running on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!isMobile) return; // Desktop browsers handle cache better
    
    const checkInterval = setInterval(() => {
      const lastUpdate = localStorage.getItem('portfolio_data_timestamp');
      const lastChecked = sessionStorage.getItem('last_cache_check');
      
      if (lastUpdate && lastChecked && lastUpdate > lastChecked) {
        // Data was updated in another tab/session, reload to get fresh data
        console.log('Portfolio data updated, reloading...');
        window.location.reload();
      }
      
      // Update last checked time
      sessionStorage.setItem('last_cache_check', Date.now().toString());
    }, 30000); // Check every 30 seconds
    
    // Set initial check time
    sessionStorage.setItem('last_cache_check', Date.now().toString());
    
    return () => clearInterval(checkInterval);
  }, []);
  
  return null;
};
