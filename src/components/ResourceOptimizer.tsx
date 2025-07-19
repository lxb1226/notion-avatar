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
        
        // Prefetch next likely navigation targets (using prefetch instead of preload)
        // These will be handled separately with prefetch
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
    const preloadTimer = setTimeout(preloadCriticalResources, 1000);

    // Prefetch likely navigation targets after a longer delay
    const prefetchTimer = setTimeout(() => {
      const prefetchTargets = ['/blog', '/faq', '/creative-avatar'];
      prefetchTargets.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    }, 3000);

    return () => {
      clearTimeout(preloadTimer);
      clearTimeout(prefetchTimer);
    };
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
