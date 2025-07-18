import { useEffect, useState } from 'react';

export default function NetworkOptimizer() {
  const [connectionType, setConnectionType] = useState<string>('');

  useEffect(() => {
    // Detect network connection type
    const detectConnection = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        setConnectionType(connection.effectiveType || 'unknown');
        
        // Adjust loading strategy based on connection
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          // Very slow connection - minimal loading
          document.documentElement.classList.add('slow-connection');
        } else if (connection.effectiveType === '3g') {
          // Moderate connection - selective loading
          document.documentElement.classList.add('moderate-connection');
        } else {
          // Fast connection - normal loading
          document.documentElement.classList.add('fast-connection');
        }
      }
    };

    detectConnection();

    // Listen for connection changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', detectConnection);
      
      return () => {
        connection.removeEventListener('change', detectConnection);
      };
    }
  }, []);

  useEffect(() => {
    // Implement resource hints and prefetching
    const optimizeResourceLoading = () => {
      // Only prefetch on fast connections
      if (connectionType === '4g' || connectionType === '5g') {
        // Prefetch likely next pages
        const prefetchLinks = [
          '/blog',
          '/faq',
          '/creative-avatar',
        ];

        prefetchLinks.forEach(href => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = href;
          document.head.appendChild(link);
        });

        // Prefetch critical resources for next pages
        const criticalResources = [
          '/image/avatar-1.webp',
          '/image/avatar-2.webp',
          '/image/avatar-3.webp',
        ];

        criticalResources.forEach(href => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = href;
          link.as = 'image';
          document.head.appendChild(link);
        });
      }
    };

    if (connectionType) {
      optimizeResourceLoading();
    }
  }, [connectionType]);

  useEffect(() => {
    // Implement adaptive loading based on device capabilities
    const optimizeForDevice = () => {
      const isLowEndDevice = () => {
        // Check device memory
        if ('deviceMemory' in navigator) {
          return (navigator as any).deviceMemory < 4;
        }
        
        // Check hardware concurrency
        if ('hardwareConcurrency' in navigator) {
          return navigator.hardwareConcurrency < 4;
        }
        
        return false;
      };

      if (isLowEndDevice()) {
        document.documentElement.classList.add('low-end-device');
        
        // Reduce image quality for low-end devices
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img.src.includes('.webp') || img.src.includes('.avif')) {
            // Already optimized
            return;
          }
          
          // Replace with WebP version if available
          const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          const testImg = new Image();
          testImg.onload = () => {
            img.src = webpSrc;
          };
          testImg.src = webpSrc;
        });
      }
    };

    optimizeForDevice();
  }, []);

  useEffect(() => {
    // Implement service worker for caching
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered:', registration);
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    registerServiceWorker();
  }, []);

  useEffect(() => {
    // Implement critical resource loading optimization
    const optimizeCriticalResources = () => {
      // Mark critical resources with high priority
      const criticalImages = document.querySelectorAll('img[data-critical="true"]');
      criticalImages.forEach(img => {
        (img as HTMLImageElement).loading = 'eager';
        (img as HTMLImageElement).fetchPriority = 'high';
      });

      // Lazy load non-critical images
      const nonCriticalImages = document.querySelectorAll('img:not([data-critical="true"])');
      nonCriticalImages.forEach(img => {
        (img as HTMLImageElement).loading = 'lazy';
      });
    };

    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeCriticalResources);
    } else {
      optimizeCriticalResources();
    }
  }, []);

  return null;
}
