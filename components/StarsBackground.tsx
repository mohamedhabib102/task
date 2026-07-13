'use client';

import React from 'react';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

const particleOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: "#ffffff",
    },
    move: {
      direction: "none" as const,
      enable: true,
      outModes: {
        default: "bounce" as const,
      },
      random: true,
      speed: 0.3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      value: 90,
    },
    opacity: {
      value: { min: 0.05, max: 0.5 },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 0.5, max: 2 },
    },
  },
  detectRetina: true,
};

async function initEngine(engine: Engine) {
  await loadSlim(engine);
}

export const StarsBackground = () => {
  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="tsparticles"
        className="fixed inset-0 z-0 pointer-events-none"
        options={particleOptions}
      />
    </ParticlesProvider>
  );
};
