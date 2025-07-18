import { useEffect } from 'react';

export default function ResourceOptimizer() {
  useEffect(() => {
    // Preload critical resources after initial page load
    const preloadCriticalResources = () => {
      const criticalResources = [
        // Critical icons that appear above the fold
        { href: '/icon/dice.svg', as: 'image', type: 'image/svg+xml' },
        { href: '/icon/x-logo.svg', as: 'image', type: 'image/svg+xml' },
        { href: '/icon/ins-logo.svg', as: 'image', type: 'image/svg+xml' },
        
        // Critical images for LCP
        { href: '/image/scribble.png', as: 'image', type: 'image/png' },
        
        // Preload next likely navigation targets
        { href: '/blog', as: 'document' },
        { href: '/faq', as: 'document' },
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) {
          link.type = resource.type;
        }
        if (resource.as === 'image') {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      });
    };

    // Delay preloading to avoid blocking critical resources
    const timer = setTimeout(preloadCriticalResources, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Optimize third-party scripts loading
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical analytics scripts
      const scripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="clarity"]');
      scripts.forEach(script => {
        if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
          script.setAttribute('defer', '');
        }
      });
    };

    optimizeThirdPartyScripts();
  }, []);

  return null;
}
