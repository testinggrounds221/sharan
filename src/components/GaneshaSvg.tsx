import React from 'react';
import { motion } from 'motion/react';

interface GaneshaSvgProps {
  className?: string;
  size?: number;
}

export default function GaneshaSvg({ className = '', size = 120 }: GaneshaSvgProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Tilak on Forehead */}
        <motion.path
          d="M47 32 H53 M46 34 H54 M48 36 H52"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.circle
          cx="50"
          cy="28"
          r="1.5"
          fill="#800020"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />

        {/* Ganesha Main Outline - crown, ears, face, trunk */}
        <motion.path
          d="
            M50,12 
            C54,12 56,8 50,4 
            C44,8 46,12 50,12 Z
            M50,12 C52,15 54,15 55,18 C58,23 58,25 54,26 C53,26 50,22 50,20 C50,22 47,26 46,26 C42,25 42,23 45,18 C46,15 48,15 50,12 Z
            
            M43,21 C33,18 27,24 28,34 C28,42 35,46 41,41 C43,39 42,32 40,32
            M57,21 C67,18 73,24 72,34 C72,42 65,46 59,41 C57,39 58,32 60,32
            
            M46,26 C43,31 43,36 45,41 C47,45 49,47 50,50 C51,53 51,57 53,60 C55,63 58,64 59,61 C60,59 58,57 56,56 C54,55 53,53 53,50 C53,46 55,42 54,36 C53,31 51,28 50,27
          "
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />

        {/* Small details: Tusks, modak */}
        <motion.path
          d="
            M45,34 L43,35 M55,34 L57,35.5
          "
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        />

        {/* Belly & Lotus Base */}
        <motion.path
          d="
            M38,48 C32,53 32,65 41,72 C46,76 54,76 59,72 C68,65 68,53 62,48
            M35,68 C28,73 24,80 32,82 C41,84 59,84 68,82 C76,80 72,73 65,68
            M32,82 L30,85 C29,86 32,88 38,87 C44,86 56,86 62,87 C68,88 71,86 70,85 L68,82
          "
          stroke="url(#goldGradient)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Modak in trunk/hand */}
        <motion.path
          d="M60,56 C62,55 64,57 65,59 C65,61 63,62 61,62 C59,62 58,60 60,56 Z"
          fill="#D4AF37"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
        />

        {/* Halo / Aura behind */}
        <motion.circle
          cx="50"
          cy="34"
          r="26"
          stroke="#D4AF37"
          strokeWidth="0.5"
          strokeDasharray="2, 4"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: 0.4 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1C5" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
