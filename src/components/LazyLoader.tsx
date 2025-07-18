import { lazy, Suspense, ComponentType, useState, useEffect } from 'react';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Loading fallback component
const LoadingFallback = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-200 rounded h-32 w-full"></div>
  </div>
);

// Higher-order component for lazy loading
export function withLazyLoading<T extends {}>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc);
  
  return function LazyLoadedComponent(props: T) {
    return (
      <Suspense fallback={fallback || <LoadingFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Intersection Observer based lazy loader
export function LazyLoader({ children, fallback }: LazyLoaderProps) {
  return (
    <Suspense fallback={fallback || <LoadingFallback />}>
      {children}
    </Suspense>
  );
}

// Hook for lazy loading with intersection observer
export function useLazyLoad(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return { isVisible, ref: setRef };
}

export default LazyLoader;
