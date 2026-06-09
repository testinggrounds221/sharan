import React from 'react';
import { motion } from 'motion/react';

interface MonogramProps {
  className?: string;
  size?: number;
  watermark?: boolean;
}

export default function MonogramSvg({ className = '', size = 150, watermark = false }: MonogramProps) {
  // Configurable colors to match the premium warm royal feel
  const outerGold = "url(#emblemGold)";
  const innerGold = "url(#emblemGold)";
  const letterColor = watermark ? "#D4AF37" : "#800020"; // Royal deep maroon or gold

  // Generate 60 tiny beads/dots for the outer royal bezel rim of the coin/emblem
  const beadCount = 60;
  const beads = Array.from({ length: beadCount }).map((_, i) => {
    const angle = (i * 360) / beadCount;
    const rad = (angle * Math.PI) / 180;
    const r = 94; // Radius of bead ring
    const x = 100 + r * Math.cos(rad);
    const y = 100 + r * Math.sin(rad);
    return { x, y, id: i };
  });

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      {/* Dynamic Gold Gradient Background Glow highlighting the metallic details of the coin */}
      {!watermark && (
        <div className="absolute inset-1.5 gold-gradient-bg monogram-glow-pulse rounded-full opacity-[0.25] blur" />
      )}
      
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(128,0,32,0.12)] relative z-10"
      >
        <defs>
          {/* Radiant Authentic Gold Gradient */}
          <linearGradient id="emblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2C6" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#7E5906" />
          </linearGradient>

          {/* Premium soft cream paper filler */}
          <radialGradient id="creamFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="90%" stopColor="#FAF5EE" />
            <stop offset="100%" stopColor="#EFEBDE" />
          </radialGradient>
        </defs>

        {/* ============================================== */}
        {/* OUTER DESIGN: SEALS & SCALLOPS FROM PHOTO */}
        {/* ============================================== */}
        
        {/* Outer Circular Beaded Detailing Rim - Slowly rotating counter-clockwise */}
        {!watermark && (
          <motion.g 
            opacity="0.85"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "100px 100px" }}
          >
            {beads.map((bead) => (
              <circle
                key={bead.id}
                cx={bead.x}
                cy={bead.y}
                r="1.75"
                fill={outerGold}
              />
            ))}
          </motion.g>
        )}

        {/* Main Solid Gold Outer Border Ring */}
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke={innerGold}
          strokeWidth="2.2"
          fill={watermark ? "none" : "url(#creamFill)"}
        />

        {/* Traditional Accent Concentric Ring - Rotating slowly clockwise */}
        <motion.circle
          cx="100"
          cy="100"
          r="84"
          stroke={innerGold}
          strokeWidth="0.75"
          strokeDasharray="3 2"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Interior Gold Circle border to hold the initials */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke={innerGold}
          strokeWidth="1.25"
        />

        {/* ============================================== */}
        {/* CORE INITIALS: S & A (No ampersand, side-by-side) */}
        {/* ============================================== */}
        {/* A classic, highly structured, heavy serif ligature/initial pairing */}
        <g className="font-serif select-none">
          {/* Elegant Heavy Serif Letter "S" on the Left */}
          <motion.text
            x="68"
            y="126"
            fontSize="78"
            fontWeight="bold"
            fontFamily="Georgia, 'Times New Roman', serif"
            fill={letterColor}
            textAnchor="middle"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.98, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            style={{ transformOrigin: "68px 100px" }}
          >
            S
          </motion.text>

          {/* Elegant Heavy Serif Letter "A" on the Right, slightly overlapping */}
          <motion.text
            x="132"
            y="126"
            fontSize="78"
            fontWeight="bold"
            fontFamily="Georgia, 'Times New Roman', serif"
            fill={letterColor}
            textAnchor="middle"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.98, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            style={{ transformOrigin: "132px 100px" }}
          >
            A
          </motion.text>
        </g>

        {/* Fine horizontal dividing hairline beneath the letters for royal card aesthetics */}
        {!watermark && (
          <line
            x1="55"
            y1="140"
            x2="145"
            y2="140"
            stroke={innerGold}
            strokeWidth="1"
            opacity="0.65"
          />
        )}
      </svg>
    </div>
  );
}
