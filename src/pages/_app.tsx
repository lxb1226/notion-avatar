import { AppProps } from 'next/app';
import '@/styles/global.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';

import { Toaster } from 'react-hot-toast';
import * as ga from '../lib/ga';
import { initClarity } from '../lib/clarity';
import FontOptimizer from '../components/FontOptimizer';
import ResourceOptimizer from '../components/ResourceOptimizer';
import ImageOptimizer from '../components/ImageOptimizer';
import PerformanceMonitor from '../components/PerformanceMonitor';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const AnyComponent = Component as any;

  useEffect(() => {
    // Initialize Microsoft Clarity
    initClarity();

    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on(`routeChangeComplete`, handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off(`routeChangeComplete`, handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <FontOptimizer />
      <ResourceOptimizer />
      <ImageOptimizer />
      <PerformanceMonitor />
      <AnyComponent {...pageProps} />
      <Toaster />
    </>
  );
}

export default appWithTranslation(MyApp);
