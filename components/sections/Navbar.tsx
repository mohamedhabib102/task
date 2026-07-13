'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isRtl = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 160) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { name: t('home'), href: '#', hasDropdown: false },
    { name: t('about'), href: '#', hasDropdown: false },
    { name: t('services'), href: '#', hasDropdown: false },
    { name: t('portfolio'), href: '#', hasDropdown: false },
    { name: t('blog'), href: '#', hasDropdown: false },
    { name: t('products'), href: '#', hasDropdown: false },
    { name: t('contact'), href: '#', hasDropdown: false },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled 
            && 'backdrop-blur-sm bg-[#0c1445]/10 shadow-lg' 
            
        }`}
      >
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image 
            src="/images/logo.svg" 
            alt="Serv5 Logo" 
            width={80} 
            height={80} 
            className="object-contain"
          />
        </div>

        {/* Nav Links (Desktop only) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`text-[12px] font-semibold transition-colors whitespace-nowrap flex items-center gap-1 ${
                index === 0 ? 'text-[#ff7b00] border-b-2 border-[#ff7b00] pb-1' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>{link.name}</span>
              {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-70" />}
            </a>
          ))}
        </div>

        {/* Desktop Language Toggle (hidden on mobile) */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center gap-2 space-x-2 space-x-reverse text-sm border border-white/20 rounded-full px-3 py-1.5 hover:bg-white/10 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{t('lang')}</span>
          </button>
        </div>

        {/* Mobile Hamburger (visible on mobile only) */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Language Toggle next to menu on mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 space-x-reverse gap-2 text-sm border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{t('lang')}</span>
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="text-white hover:text-[#ff7b00] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* Sidebar Drawer for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            />

            {/* Sidebar Menu Panel — يجي من اليمين عربي ومن الشمال إنجليزي */}
            <motion.div
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`fixed top-0 bottom-0 w-[280px] bg-[#050b2d] z-50 flex flex-col lg:hidden ${
                isRtl
                  ? 'right-0 border-l border-white/10 text-end'
                  : 'left-0 border-r border-white/10 text-start'
              }`}
            >
              {/* Header inside Sidebar */}
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-[#ff7b00] transition-colors focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* Navigation Links inside Sidebar */}
              <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-semibold transition-colors flex items-center justify-between ${
                      index === 0 ? 'text-[#ff7b00]' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-70" />}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
