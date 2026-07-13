'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export const Partners = () => {
  const t = useTranslations('Partners');

  const partnerLogos = [
    { src: '/images/company1.svg', alt: 'Partner 1' },
    { src: '/images/company2.svg', alt: 'Partner 2' },
    { src: '/images/company3.svg', alt: 'Partner 3' },
    { src: '/images/company3.svg', alt: 'Partner 3' },
    { src: '/images/company4.svg', alt: 'Partner 4' },
    { src: '/images/company5.svg', alt: 'Partner 5' },
    { src: '/images/company5.svg', alt: 'Partner 5' },
  ];

  return (
    <section className="w-full py-16 relative z-10  border-b border-white/5">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col items-center">
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-xl lg:text-2xl font-bold text-white text-center mb-10 tracking-wide"
        >
          {t('title')}
        </motion.h2>

        {/* Separator line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-full h-[1px] bg-white/10 mb-12 origin-left"
        />

        {/* Slider & Navigation Row */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="w-full flex items-center justify-between gap-4 lg:gap-8"
        >
          
          {/* Previous Button (Outline Circle with Chevron) */}
          <button className="swiper-prev-btn w-12 h-12 rounded-full border-2 border-[#ff7b00] hover:bg-[#ff7b00] text-[#ff7b00] hover:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0 cursor-pointer">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Swiper Slider Wrapper */}
          <div className="flex-1 overflow-hidden px-2">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: '.swiper-prev-btn',
                nextEl: '.swiper-next-btn',
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                767: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              className="w-full h-24 flex items-center"
            >
              {partnerLogos.map((partner, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center h-full">
                  <div className="relative w-full h-12 opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      fill
                      className="object-contain filter brightness-100"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Next Button (Outline Circle with Chevron) */}
          <button className="swiper-next-btn w-12 h-12 rounded-full border-2 border-[#ff7b00] hover:bg-[#ff7b00] text-[#ff7b00] hover:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0 cursor-pointer">
            <ChevronLeft className="w-6 h-6" />
          </button>

        </motion.div>

      </div>
    </section>
  );
};
