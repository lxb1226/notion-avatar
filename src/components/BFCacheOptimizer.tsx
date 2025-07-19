import { useEffect } from 'react';

export default function BFCacheOptimizer() {
  useEffect(() => {
    // Optimize for back/forward cache (bfcache)
    const optimizeBFCache = () => {
      // 1. Clean up event listeners on page hide
      const handlePageHide = (event: PageTransitionEvent) => {
        if (event.persisted) {
          // Page is being cached, clean up resources
          console.log('Page cached for bfcache');
        }
      };

      const handlePageShow = (event: PageTransitionEvent) => {
        if (event.persisted) {
          // Page restored from cache, reinitialize if needed
          console.log('Page restored from bfcache');
          // Refresh any time-sensitive data
          window.dispatchEvent(new Event('bfcache-restore'));
        }
      };

      // 2. Avoid unload event listeners (they prevent bfcache)
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // Only prevent unload if there's unsaved data
        const hasUnsavedData = false; // Check your app state
        if (hasUnsavedData) {
          event.preventDefault();
          event.returnValue = '';
        }
      };

      // 3. Clean up timers and intervals
      const activeTimers: number[] = [];
      const originalSetTimeout = window.setTimeout;
      const originalSetInterval = window.setInterval;

      // Store original functions for cleanup
      const customSetTimeout = (callback: TimerHandler, delay?: number, ...args: any[]): number => {
        const id = originalSetTimeout(callback, delay, ...args);
        activeTimers.push(id);
        return id;
      };

      const customSetInterval = (callback: TimerHandler, delay?: number, ...args: any[]): number => {
        const id = originalSetInterval(callback, delay, ...args);
        activeTimers.push(id);
        return id;
      };

      // Override with proper typing
      (window as any).setTimeout = customSetTimeout;
      (window as any).setInterval = customSetInterval;

      const cleanupTimers = () => {
        activeTimers.forEach(id => {
          clearTimeout(id);
          clearInterval(id);
        });
        activeTimers.length = 0;

        // Restore original functions
        window.setTimeout = originalSetTimeout;
        window.setInterval = originalSetInterval;
      };

      // Add event listeners
      window.addEventListener('pagehide', handlePageHide);
      window.addEventListener('pageshow', handlePageShow);
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('pagehide', cleanupTimers);

      // Cleanup function
      return () => {
        window.removeEventListener('pagehide', handlePageHide);
        window.removeEventListener('pageshow', handlePageShow);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('pagehide', cleanupTimers);
        cleanupTimers();
      };
    };

    const cleanup = optimizeBFCache();
    return cleanup;
  }, []);

  useEffect(() => {
    // 4. Avoid keeping connections open
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, close unnecessary connections
        // Close WebSocket connections, stop polling, etc.
        console.log('Page hidden, cleaning up connections');
      } else {
        // Page is visible again, restore connections if needed
        console.log('Page visible, restoring connections');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // 5. Handle IndexedDB transactions properly
    const handleBFCacheRestore = () => {
      // Close any open IndexedDB transactions
      // Refresh cached data if needed
      console.log('Handling bfcache restore');
    };

    window.addEventListener('bfcache-restore', handleBFCacheRestore);

    return () => {
      window.removeEventListener('bfcache-restore', handleBFCacheRestore);
    };
  }, []);

  return null;
}
