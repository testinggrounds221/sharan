import React, { useEffect, useState } from 'react';
import { useAnimationFrame } from 'motion/react';

interface AkshataParticle {
  id: number;
  isLeft: boolean;      // Left or right margin
  xOffset: number;     // Percentage of margin rail width
  size: number;        // Particle diameter size
  speedY: number;      // Drift speed down screen (significantly reduced)
  speedX: number;      // Swaying frequency
  swayAmplitude: number;
  rotationSpeed: number;
  colorType: 'akshata-gold' | 'akshata-yellow' | 'kumkum-red' | 'rose-peach';
  y: number;           // Current position (0 to 110vh)
  angle: number;       // Rotation angle
  phase: number;       // Sine wave phase
}

export default function LeafParticle() {
  const [particles, setParticles] = useState<AkshataParticle[]>([]);

  useEffect(() => {
    // Generate initial set of Akshata grains and petals with randomized parameters
    const initialParticles: AkshataParticle[] = Array.from({ length: 22 }, (_, idx) => {
      const isLeft = idx % 2 === 0;
      return {
        id: idx,
        isLeft,
        xOffset: Math.random() * 85 + 5, // Wide distribution across side rails
        size: Math.random() * 12 + 8,    // Slender sizes: 8px to 20px
        speedY: Math.random() * 0.15 + 0.08, // Extraordinarily slow falling speed
        speedX: Math.random() * 0.015 + 0.005,
        swayAmplitude: Math.random() * 15 + 5, // Gentle sway
        rotationSpeed: (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
        colorType: getRandomColor(),
        y: Math.random() * -120 - 20, // Stagger initial starts
        angle: Math.random() * 360,
        phase: Math.random() * Math.PI * 2
      };
    });

    // Stagger layout coordinates
    initialParticles.forEach((p) => {
      p.y = Math.random() * 100;
    });

    setParticles(initialParticles);
  }, []);

  const getRandomColor = (): 'akshata-gold' | 'akshata-yellow' | 'kumkum-red' | 'rose-peach' => {
    const r = Math.random();
    if (r < 0.40) return 'akshata-gold'; // Turmeric gold
    if (r < 0.70) return 'akshata-yellow'; // Bright celebratory yellow
    if (r < 0.85) return 'kumkum-red'; // Devotional crimson vermilion
    return 'rose-peach'; // Auspicious rose petals
  };

  useAnimationFrame((time, delta) => {
    const speedFactor = Math.min(delta / 16.666, 2.5);
    
    setParticles((prev) =>
      prev.map((p) => {
        let nextY = p.y + p.speedY * speedFactor;
        let nextPhase = p.phase + p.speedX * speedFactor;
        let nextAngle = p.angle + p.rotationSpeed * speedFactor;

        // Reset if it flows past the viewport
        if (nextY > 105) {
          nextY = -10;
          nextAngle = Math.random() * 360;
          nextPhase = Math.random() * Math.PI * 2;
        }

        return {
          ...p,
          y: nextY,
          phase: nextPhase,
          angle: nextAngle
        };
      })
    );
  });

  const getParticleColor = (type: string) => {
    switch (type) {
      case 'akshata-gold':
        return '#D4AF37'; // Premium Gold
      case 'akshata-yellow':
        return '#FFD700'; // Turmeric Yellow
      case 'kumkum-red':
        return '#800020'; // Sacred Crimson
      case 'rose-peach':
      default:
        return '#F3A3A6'; // Soft Rose Petal Pink
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden no-select">
      {/* Left Margin Rail */}
      <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 md:w-32">
        {particles
          .filter((p) => p.isLeft)
          .map((p) => {
            const color = getParticleColor(p.colorType);
            const xSway = Math.sin(p.phase) * p.swayAmplitude;
            const xPos = `calc(${p.xOffset}% + ${xSway}px)`;
            const isRiceGrain = p.colorType.startsWith('akshata');

            return (
              <div
                key={p.id}
                className="absolute"
                style={{
                  top: `${p.y}%`,
                  left: xPos,
                  transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
                  width: isRiceGrain ? p.size * 0.7 : p.size,
                  height: p.size,
                  opacity: p.colorType === 'kumkum-red' ? 0.3 : 0.45,
                }}
              >
                {isRiceGrain ? (
                  /* Sacred Rice Grain Shape (Elongated oval) */
                  <svg
                    viewBox="0 0 12 24"
                    fill={color}
                    className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse cx="6" cy="12" rx="4" ry="11" />
                    {/* Tiny highlight lines on rice */}
                    <path d="M6,3 C7,7 7,17 6,21" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none" />
                  </svg>
                ) : (
                  /* Auspicious Soft Flower Petal Shape */
                  <svg
                    viewBox="0 0 20 20"
                    fill={color}
                    className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10,2 C12.5,5.5 15,8 15,11.5 C15,15 12,17.5 10,17.5 C8,17.5 5,15 5,11.5 C5,8 7.5,5.5 10,2 Z" />
                  </svg>
                )}
              </div>
            );
          })}
      </div>

      {/* Right Margin Rail */}
      <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 md:w-32">
        {particles
          .filter((p) => !p.isLeft)
          .map((p) => {
            const color = getParticleColor(p.colorType);
            const xSway = Math.sin(p.phase) * p.swayAmplitude;
            const xPos = `calc(${p.xOffset}% + ${xSway}px)`;
            const isRiceGrain = p.colorType.startsWith('akshata');

            return (
              <div
                key={p.id}
                className="absolute"
                style={{
                  top: `${p.y}%`,
                  right: xPos,
                  transform: `translate(50%, -50%) rotate(${p.angle}deg)`,
                  width: isRiceGrain ? p.size * 0.7 : p.size,
                  height: p.size,
                  opacity: p.colorType === 'kumkum-red' ? 0.3 : 0.45,
                }}
              >
                {isRiceGrain ? (
                  /* Sacred Rice Grain Shape (Elongated oval) */
                  <svg
                    viewBox="0 0 12 24"
                    fill={color}
                    className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse cx="6" cy="12" rx="4" ry="11" />
                    <path d="M6,3 C7,7 7,17 6,21" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none" />
                  </svg>
                ) : (
                  /* Auspicious Soft Flower Petal Shape */
                  <svg
                    viewBox="0 0 20 20"
                    fill={color}
                    className="w-full h-full drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10,2 C12.5,5.5 15,8 15,11.5 C15,15 12,17.5 10,17.5 C8,17.5 5,15 5,11.5 C5,8 7.5,5.5 10,2 Z" />
                  </svg>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
