'use client';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // Loads only essential features
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: { enable: true },
        particles: {
          number: { value: 50 },
          move: { enable: true, speed: 1 },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 3 } },
        },
      }}
    />
  );
};

export default ParticleBackground;
