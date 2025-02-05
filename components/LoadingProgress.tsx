'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';

export function LoadingProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,
      trickleSpeed: 100,
      minimum: 0.3,
    });
  }, []);

  useEffect(() => {
    NProgress.start();
    
    // Small delay to show progress bar even on fast navigations
    const timer = setTimeout(() => {
      NProgress.done();
    }, 250);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return null;
} 