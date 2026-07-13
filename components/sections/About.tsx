'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export const About = () => {
  const t = useTranslations('About');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background glowing elements to enhance aesthetics */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        
        {/* ── TEXT COLUMN ── */}
        <div className="flex-1 flex flex-col space-y-6 text-start">
          {/* Subtitle: "من نحن" - Animates from the side */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-3"
          >
            <span className="text-[#ff7b00] font-bold tracking-wider text-base uppercase">
              {t('subtitle')}
            </span>
            <div className="w-12 h-[2px] bg-[#ff7b00]/60"></div>
          </motion.div>

          {/* Title: "خبرة تمتد..." - Animates from the bottom */}
          <motion.h2
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight"
          >
            {t('title')}
          </motion.h2>

          {/* Description - Animates from the bottom */}
          <motion.p
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-base lg:text-lg text-gray-300 leading-relaxed max-w-2xl font-light"
          >
            {t('description')}
          </motion.p>
        </div>

        {/* ── IMAGE COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex-1 w-full flex justify-center"
        >
          {/* Inner motion div handles infinite floating seamlessly */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="relative w-full max-w-[500px] aspect-[16/9] lg:aspect-[4/3] rounded-2xl group"
          >
            <Image
              src="/images/15Y.png"
              alt="15 Years of Experience"
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
