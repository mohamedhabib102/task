'use client';

import React from 'react';
import Image from 'next/image';
import { motion, MotionValue, useTransform } from 'framer-motion';

export interface ServiceDef {
  id: string;
  image: string;
  glowColor: string;
  nameKey: string;
  titleKey: string;
  descKey: string;
  pos: { x: number; y: number };
  mobilePos: { x: number; y: number };
  from: { x: number; y: number };
  size: number;
}

export interface PlanetItemProps {
  svc: ServiceDef;
  targetPos: { x: number; y: number };
  targetSize: number;
  isCurrentActive: boolean;
  smoothProgress: MotionValue<number>;
  onClick: () => void;
  label: string;
  isRtl: boolean;
  isMobile: boolean;
}

export const PlanetItem = ({
  svc,
  targetPos,
  targetSize,
  isCurrentActive,
  smoothProgress,
  onClick,
  label,
  isRtl,
  isMobile,
}: PlanetItemProps) => {
  const x = useTransform(smoothProgress, [0, 1], [svc.from.x * (isMobile ? 0.35 : 1), 0]);
  const y = useTransform(smoothProgress, [0, 1], [svc.from.y * (isMobile ? 0.35 : 1), 0]);
  const opacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  const isLeft = targetPos.x < 50;
  const isRight = targetPos.x > 70;

  // Set visual scale strictly. Desktop active = 480px. Mobile active = 180px.
  // Active planet: 180px on mobile — sits on galaxy inner orbit, clear of the 4 inactive planets.
  // 160→180px: recalculated with section pb-28 giving enough bottom room.
  const activeSize = isMobile ? 180 : 480;
  // Inactive planets slightly smaller on mobile for better tap-target spacing
  const inactiveSize = isMobile ? targetSize * 0.48 : targetSize;
  const renderSize = isCurrentActive ? activeSize : inactiveSize;

  let labelStyle: React.CSSProperties = {};
  if (isLeft) {
    labelStyle = isRtl
      ? { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: isMobile ? 6 : 16 }
      : { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: isMobile ? 6 : 16 };
  } else if (isRight) {
    labelStyle = isRtl
      ? { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: isMobile ? 6 : 16 }
      : { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: isMobile ? 6 : 16 };
  } else {
    labelStyle = { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 10 };
  }

  return (
    <motion.div
      layoutId={`planet-wrapper-${svc.id}`}
      transition={{
        type: 'spring',
        stiffness: 85,
        damping: 18,
      }}
      style={{
        position: 'absolute',
        zIndex: isCurrentActive ? 30 : 10,
        x,
        y,
        opacity,
      }}
      animate={{
        left: `${targetPos.x}%`,
        top: `${targetPos.y}%`,
        width: renderSize,
        height: renderSize,
      }}
      className="flex items-center justify-center"
    >
      <div
        className="relative w-full h-full flex items-center justify-center cursor-pointer"
        onClick={onClick}
        style={{
          transform: isMobile
            ? 'translate(-50%, -50%)'
            : `translate(-50%, ${isCurrentActive ? '-25%' : '-50%'})`,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-full h-full rounded-full bg-transparent border-0 p-0"
          style={{
            filter: `drop-shadow(0 0 ${isCurrentActive ? '20px' : '8px'} ${svc.glowColor})`,
          }}
          aria-label={label}
        >
          <Image
            src={svc.image}
            alt={label}
            fill
            className="object-contain rounded-full select-none pointer-events-none"
            draggable={false}
            priority
          />
        </motion.div>

        {!isCurrentActive && (
          <div
            className="absolute whitespace-nowrap"
            style={labelStyle}
          >
            <span className="text-white text-[10px] md:text-sm font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              {label}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
