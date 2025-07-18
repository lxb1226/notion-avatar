import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    const reportWebVitals = (metrics: PerformanceMetrics) => {
      // Only report in production
      if (process.env.NODE_ENV === 'production') {
        // Send to analytics service (Google Analytics, etc.)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          Object.entries(metrics).forEach(([key, value]) => {
            if (value !== undefined) {
              (window as any).gtag('event', key, {
                event_category: 'Web Vitals',
                value: Math.round(value),
                non_interaction: true,
              });
            }
          });
        }
      } else {
        // Log in development for debugging
        console.log('Performance Metrics:', metrics);
      }
    };

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      const metrics: PerformanceMetrics = {};

      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            metrics.lcp = lastEntry.startTime;
            reportWebVitals({ lcp: metrics.lcp });
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP measurement not supported');
        }

        // First Input Delay (FID)
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              metrics.fid = entry.processingStart - entry.startTime;
              reportWebVitals({ fid: metrics.fid });
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID measurement not supported');
        }

        // Cumulative Layout Shift (CLS)
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            metrics.cls = clsValue;
            reportWebVitals({ cls: metrics.cls });
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS measurement not supported');
        }

        // First Contentful Paint (FCP)
        try {
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.name === 'first-contentful-paint') {
                metrics.fcp = entry.startTime;
                reportWebVitals({ fcp: metrics.fcp });
              }
            });
          });
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('FCP measurement not supported');
        }
      }

      // Time to First Byte (TTFB)
      if (performance.timing) {
        const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
        metrics.ttfb = ttfb;
        reportWebVitals({ ttfb: metrics.ttfb });
      }
    };

    // Start measuring after page load
    if (document.readyState === 'complete') {
      measureWebVitals();
    } else {
      window.addEventListener('load', measureWebVitals);
    }

    return () => {
      window.removeEventListener('load', measureWebVitals);
    };
  }, []);

  useEffect(() => {
    // Monitor resource loading performance
    const monitorResourcePerformance = () => {
      if ('PerformanceObserver' in window) {
        try {
          const resourceObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              // Log slow resources in development
              if (process.env.NODE_ENV === 'development' && entry.duration > 1000) {
                console.warn(`Slow resource detected: ${entry.name} took ${entry.duration}ms`);
              }
            });
          });
          resourceObserver.observe({ entryTypes: ['resource'] });
        } catch (e) {
          console.warn('Resource performance monitoring not supported');
        }
      }
    };

    monitorResourcePerformance();
  }, []);

  return null;
}
