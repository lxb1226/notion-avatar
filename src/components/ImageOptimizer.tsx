import { useEffect } from 'react';

export default function ImageOptimizer() {
  useEffect(() => {
    // Check for WebP support and preload WebP versions of critical images
    const checkWebPSupport = () => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        const isWebPSupported = webP.height === 2;
        
        if (isWebPSupported) {
          // Preload WebP versions of critical images
          const criticalImages = [
            '/image/scribble.webp',
            '/image/avatar-1.webp',
            '/image/avatar-2.webp',
            '/image/avatar-3.webp',
            '/image/avatar-4.webp',
            '/image/avatar-5.webp',
            '/image/avatar-6.webp',
            '/social.webp'
          ];

          criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            link.type = 'image/webp';
            document.head.appendChild(link);
          });
        }
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    // Check for AVIF support
    const checkAVIFSupport = () => {
      const avif = new Image();
      avif.onload = avif.onerror = () => {
        const isAVIFSupported = avif.height === 2;
        
        if (isAVIFSupported) {
          // Store AVIF support info for future use
          sessionStorage.setItem('avif-supported', 'true');
        }
      };
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    };

    checkWebPSupport();
    checkAVIFSupport();
  }, []);

  useEffect(() => {
    // Optimize image loading with Intersection Observer
    const optimizeImageLoading = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
      }
    };

    // Delay optimization to avoid blocking critical rendering
    const timer = setTimeout(optimizeImageLoading, 1000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
