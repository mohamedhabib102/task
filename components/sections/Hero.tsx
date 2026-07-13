'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Play, Edit } from 'lucide-react';
import { Button } from '../ui/Button';
import { VideoModal } from '../ui/VideoModal';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero = () => {
  const t = useTranslations('Hero');
  const tVideo = useTranslations('Video');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [triggerOverlay, setTriggerOverlay] = useState(0);
  // becomes true once the planet mount animation finishes
  const [overlayReady, setOverlayReady] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Smoothly move the earth down as the user scrolls
  const earthY = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Trigger overlay only after earth entrance animation finishes (delay 0.2 + duration 0.8 = 1s)
  useEffect(() => {
    const readyTimer = setTimeout(() => {
      setOverlayReady(true);
    }, 1100);
    return () => clearTimeout(readyTimer);
  }, []);

  // After overlay is ready, repeat the sweep every 10 seconds
  useEffect(() => {
    if (!overlayReady) return;
    const interval = setInterval(() => {
      setTriggerOverlay((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [overlayReady]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen pt-28 pb-20 mb-35 flex items-center">

      <motion.div
        key={`planet-${locale}`}
        initial={{ opacity: 0, x: isRtl ? -200 : 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute z-20 pointer-events-none hidden lg:block"
        style={{
          top: '-160px',
          width: '530px',
          height: '530px',
          ...(isRtl ? { left: '-240px', right: 'auto' } : { right: '-240px', left: 'auto' }),
        }}
      >
        <Image
          src="/images/orange-planet.webp"
          alt="Orange Planet"
          fill
          className="w-full h-full object-contain opacity-80"
          priority
        />
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 items-center justify-between relative z-10">

        {/* Mobile glowing center logo background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-65 z-2 lg:hidden pointer-events-none select-none">
          <div className="relative w-[340px] h-[340px] rounded-full shadow-[0_0_120px_rgba(37,99,235,0.4)] flex items-center justify-center">
            <Image 
              src="/images/logo.svg" 
              alt="Serv5 Mobile Backdrop Logo" 
              width={200} 
              height={200} 
              className="object-contain animate-pulse"
            />
          </div>
        </div>

        {/* ── TEXT COLUMN ── */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col space-y-5 flex-1 text-center lg:text-start items-center lg:items-start relative z-10"
        >
          <h1 className="text-2xl font-bold leading-tight whitespace-pre-line text-white">
            {t('title')}
          </h1>
          <p className="text-base lg:text-lg text-gray-300 leading-relaxed max-w-md">
            {t('description')}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Button size="lg" variant="primary" className="bg-gradient-to-r from-[#FF8A00] to-[#FF5C00] hover:from-[#FF5C00] hover:to-[#FF8A00] text-white text-xs sm:text-sm px-6 py-3 rounded-xl font-black uppercase tracking-widest flex items-center gap-2.5 transition-all transform hover:scale-105 shadow-[0_15px_30px_-10px_rgba(255,138,0,0.5)] active:scale-95 cursor-pointer border-none">
              <Edit className="w-5 h-5 flex-shrink-0" />
              <span>{t('orderPricing')}</span>
            </Button>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex cursor-pointer group items-center gap-3 group text-white hover:text-gray-200 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-white text-[#111A54] flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg flex-shrink-0">
                <Play className="w-5 h-5 fill-current group-hover:text-yellow-600 transition-all" />
              </div>
              <span className="font-medium text-lg hover:text-yellow-600">{t('watchMore')}</span>
            </button>
          </div>
        </motion.div>

        {/* ── VISUAL COLUMN — Earth + Logo + Astronaut (Hidden on mobile) ── */}
        <motion.div
          layout
          initial={{ opacity: 0, x: isRtl ? 120 : -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative w-full h-[480px] lg:h-[560px] flex-1 hidden lg:block"
          style={{ y: earthY }}
        >
          <div
            className="absolute top-15 rounded-full overflow-hidden shadow-[0_0_80px_rgba(0,20,80,0.8)]"
            style={{
              width: 'clamp(310px, 79%, 510px)',
              aspectRatio: '1 / 1',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="absolute inset-0 animate-[spin_80s_linear_infinite]">
              <Image
                src="/images/earth.png"
                alt="Earth"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.35, 1, 0.35]
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  },
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
                className="relative"
                style={{ width: '55%', aspectRatio: '1 / 1' }}
              >
                <Image
                  src="/images/logo.svg"
                  alt="Serv5 Logo on Earth"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>

            <motion.div
              key={`overlay-${overlayReady ? triggerOverlay : 'idle'}`}
              initial={{ x: '-105%' }}
              animate={overlayReady ? {
                x: ['-105%', '0%', '0%', '-105%'],
              } : { x: '-105%' }}
              transition={overlayReady ? {
                duration: 7.5,
                times: [0, 0.25, 0.75, 1],
                ease: 'easeInOut',
              } : { duration: 0 }}
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              style={{
                background: 'rgba(0, 0, 0, 0.55)',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: isRtl ? -200 : 200 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: [0, -15, 0]
            }}
            transition={{
              x: { duration: 1.2, ease: 'easeOut', delay: 0.5 },
              opacity: { duration: 1, delay: 0.5 },
              y: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.7
              }
            }}
            className="absolute z-30"
            style={{
              width: 'clamp(180px, 52%, 290px)',
              aspectRatio: '1 / 1',
              bottom: '8px',
              ...(isRtl ? { right: '2%' } : { left: '2%' }),
            }}
          >
            <Image
              src="/images/man.png"
              alt="Astronaut"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

        </motion.div>
      </div>

      {/* VIDEO MODAL */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://www.youtube.com/watch?v=krDWc30PAGg"
        errorMessage={tVideo('comingSoon')}
      />
    </section>
  );
};
