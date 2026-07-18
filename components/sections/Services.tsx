'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  LayoutGroup,
  MotionValue,
} from 'framer-motion';

import { PlanetItem, type ServiceDef } from './PlanetItem';

// ─── Mobile slot positions ─────────────────────────────────────────────────
// Container on mobile: aspect-[4/3] at 390px wide = 390×292px
// Space.png (16:9) with object-contain → fills width, image h≈219px, letterbox top≈36px
// Galaxy center (bottom of image) ≈ y:87% = 254px from container top
//
// Active planet = 180px (radius 90px).
//   SLOT 0 at y:82% → center=239px, bottom=329px. With section pb-28(112px):
//   section height=96+292+112=500px, planet bottom from section top=96+329=425<500 ✓
//
// Minimum edge gap between planets calculated per pair (must be ≥20px for tap targets).
const MOBILE_SLOTS = [
  { x: 50, y: 82 }, // SLOT 0: Active – galaxy inner orbit, bottom center
  { x: 12, y: 74 }, // SLOT 1: Lower Left  – outer orbit, left wing
  { x: 88, y: 74 }, // SLOT 2: Lower Right – outer orbit, right wing (symmetric)
  { x: 20, y: 50 }, // SLOT 3: Upper Left  – upper-left orbit arc
  { x: 80, y: 50 }, // SLOT 4: Upper Right – upper-right orbit arc (symmetric)
];

const INITIAL_SERVICES: ServiceDef[] = [
  {
    id: 'hosting',
    image: '/images/Purple Planet.png',
    glowColor: 'rgba(180, 100, 255, 0.45)',
    nameKey: 'webHosting',
    titleKey: 'webHostingTitle',
    descKey: 'webHostingDesc',
    pos: { x: 50, y: 80 }, // Lighter bottom offset (lifted from 88)
    mobilePos: MOBILE_SLOTS[0], // Active slot
    from: { x: 0, y: 400 },
    size: 240,
  },
  {
    id: 'marketing',
    image: '/images/Purple-earth.png',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    nameKey: 'digitalMarketing',
    titleKey: 'digitalMarketingTitle',
    descKey: 'digitalMarketingDesc',
    pos: { x: 12, y: 68 }, // SLOT 1: Lower Left
    mobilePos: MOBILE_SLOTS[1],
    from: { x: -600, y: 200 },
    size: 145,
  },
  {
    id: 'design',
    image: '/images/MArs 2.png',
    glowColor: 'rgba(251, 146, 60, 0.4)',
    nameKey: 'webDesign',
    titleKey: 'webDesignTitle',
    descKey: 'webDesignDesc',
    pos: { x: 88, y: 68 }, // SLOT 2: Lower Right
    mobilePos: MOBILE_SLOTS[2],
    from: { x: 600, y: 200 },
    size: 145,
  },
  {
    id: 'app',
    image: '/images/Purple Planet (1).png',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    nameKey: 'appDev',
    titleKey: 'appDevTitle',
    descKey: 'appDevDesc',
    pos: { x: 22, y: 44 }, // SLOT 3: Upper Left
    mobilePos: MOBILE_SLOTS[3],
    from: { x: -400, y: -400 },
    size: 75,
  },
  {
    id: 'seo',
    image: '/images/Purple Planet (3).png',
    glowColor: 'rgba(52, 211, 153, 0.35)',
    nameKey: 'seo',
    titleKey: 'seoTitle',
    descKey: 'seoDesc',
    pos: { x: 78, y: 44 }, // SLOT 4: Upper Right
    mobilePos: MOBILE_SLOTS[4],
    from: { x: 400, y: -400 },
    size: 70,
  },
];



/* ─────────────────────────────────────────────
   Main Services Component
───────────────────────────────────────────── */
export const Services = () => {
  const t = useTranslations('Services');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState<string>('hosting');

  // Map each service to its slot index (0: Active/Center Bottom, 1: L-Bottom, 2: R-Bottom, 3: L-Top, 4: R-Top)
  const [positions, setPositions] = useState<string[]>([
    'hosting',
    'marketing',
    'design',
    'app',
    'seo',
  ]);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    restDelta: 0.001,
  });

  const sceneScale = useTransform(smoothProgress, [0, 1], [0.75, 1]);
  const sceneOpacity = useTransform(smoothProgress, [0, 0.45], [0, 1]);

  const handleSelectPlanet = (clickedId: string) => {
    if (clickedId === activeId) return;

    setPositions((prev) => {
      const next = [...prev];
      const activeIdx = next.indexOf(activeId);
      const clickedIdx = next.indexOf(clickedId);

      // Swap position slot indexes
      next[activeIdx] = clickedId;
      next[clickedIdx] = activeId;
      return next;
    });

    setActiveId(clickedId);
  };

  const activeService = INITIAL_SERVICES.find((s) => s.id === activeId) || INITIAL_SERVICES[0];

  if (!mounted) return null;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-transparent select-none pt-24 pb-28 md:pb-20"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <LayoutGroup>
        {/* Orbit Arena */}
        <motion.div
          style={{ scale: sceneScale, opacity: sceneOpacity, transformOrigin: 'center center' }}
          className="relative w-full mx-auto md:max-w-[1250px] aspect-[4/3] md:aspect-[1512/820] flex items-center justify-center overflow-visible"
        >
          {/* Space Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/images/Space.png"
              alt="Space orbits"
              fill
              className="object-contain object-center opacity-90"
              priority
            />
          </div>

          {/* Section Title */}
          <div className="absolute z-20 -top-[20%] w-full md:top-[16%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center px-6 pointer-events-none">
            <p className="text-[11px] font-extrabold tracking-[0.35em] uppercase text-[#ff7b00] mb-2">
              {t('subtitle')}
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-wide">
              {t('title')}
            </h2>
          </div>

          {/* Description Block */}
          <div className="absolute z-20 top-[25%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-6 pb-8 md:pb-0 text-center pointer-events-none">
            <motion.h3
              key={`title-${activeId}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm md:text-3.5xl font-extrabold text-white mb-1 md:mb-2 tracking-wide"
            >
              {t(activeService.titleKey)}
            </motion.h3>
            <motion.p
              key={`desc-${activeId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-gray-300 text-[10px] md:text-sm leading-relaxed max-w-[270px] md:max-w-md mx-auto"
            >
              {t(activeService.descKey)}
            </motion.p>
            <motion.div
              key={`btn-${activeId}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-2"
            >
              <a
                href="#"
                className="inline-block pointer-events-auto text-[9px] md:text-[10px] font-black tracking-[0.25em] text-white/80 hover:text-white uppercase border-b border-white/40 hover:border-white pb-0.5 transition-all"
              >
                {t('knowMore')}
              </a>
            </motion.div>
          </div>

          {/* Render All Planets */}
          {INITIAL_SERVICES.map((svc) => {
            const currentPositionIndex = positions.indexOf(svc.id);
            // Get coordinates mapped to its current slot (Index 0 represents the active slot at center bottom)
            const slotSvc = INITIAL_SERVICES[currentPositionIndex];
            const targetPos = isMobile && slotSvc.mobilePos ? slotSvc.mobilePos : slotSvc.pos;

            const isCurrentActive = svc.id === activeId;
            const targetSize = INITIAL_SERVICES[currentPositionIndex].size;

            return (
              <PlanetItem
                key={svc.id}
                svc={svc}
                targetPos={targetPos}
                targetSize={targetSize}
                isCurrentActive={isCurrentActive}
                smoothProgress={smoothProgress}
                onClick={() => handleSelectPlanet(svc.id)}
                label={t(svc.nameKey)}
                isRtl={isRtl}
                isMobile={isMobile}
              />
            );
          })}
        </motion.div>
      </LayoutGroup>
    </section>
  );
};
