'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const PageLoader = () => {
  const t = useTranslations('Loader');
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
      const timer = setTimeout(() => setShouldRender(false), 500); // matches CSS duration
      return () => clearTimeout(timer);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      const fallback = setTimeout(handleLoad, 1500);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050b2d] transition-opacity duration-500 ease-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Spinning Outer Ring */}
        <div className="w-24 h-24 rounded-full border-4 border-t-[#ff7b00] border-r-transparent border-b-[#ff7b00]/30 border-l-transparent animate-spin"></div>
        
        {/* Inner Static Logo */}
        <div className="absolute w-12 h-12">
          <Image
            src="/images/logo.svg"
            alt="Loading..."
            fill
            className="object-contain animate-pulse"
            priority
          />
        </div>
      </div>
      
      {/* Decorative Loading Text */}
      <span className="mt-4 text-sm font-semibold tracking-widest text-[#ff7b00] uppercase animate-pulse">
        {t('loading')}
      </span>
    </div>
  );
};
