import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import MonogramSvg from './MonogramSvg';

interface CoverViewProps {
  onRevealComplete: () => void;
}

export default function CoverView({ onRevealComplete }: CoverViewProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const leftTreeControls = useAnimation();
  const rightTreeControls = useAnimation();
  const contentControls = useAnimation();

  const handleReveal = async () => {
    if (isRevealing) return;
    setIsRevealing(true);

    // Staggered cinematic parting animation of the Banyan Trees and Content zoom
    await Promise.all([
      leftTreeControls.start({
        x: '-100%',
        rotate: -12,
        opacity: 0,
        transition: { duration: 1.6, ease: [0.77, 0, 0.175, 1] }
      }),
      rightTreeControls.start({
        x: '100%',
        rotate: 12,
        opacity: 0,
        transition: { duration: 1.6, ease: [0.77, 0, 0.175, 1] }
      }),
      contentControls.start({
        scale: 1.25,
        opacity: 0,
        transition: { duration: 1.2, ease: "easeIn" }
      })
    ]);

    // Proceed to Phase 3 after tree division and content zoom-in
    onRevealComplete();
  };

  // Option: Detect scroll to auto-reveal / Trigger entrance on mount
  useEffect(() => {
    contentControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 1.4, ease: "easeOut" }
    });

    const handleScrollOrWheel = (e: WheelEvent | TouchEvent) => {
      // Any wheel scroll or swipe-up triggers reveal
      handleReveal();
    };

    window.addEventListener('wheel', handleScrollOrWheel);
    window.addEventListener('touchmove', handleScrollOrWheel);

    return () => {
      window.removeEventListener('wheel', handleScrollOrWheel);
      window.removeEventListener('touchmove', handleScrollOrWheel);
    };
  }, [isRevealing]);

  return (
    <div className="absolute inset-0 min-h-screen w-full flex flex-col items-center justify-center bg-cream overflow-hidden z-30 no-select">
      
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* BACKGROUND MATTE WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <MonogramSvg size={500} watermark={true} />
      </div>

      {/* CENTRAL INVITE PANEL INFO */}
      <motion.div
        animate={contentControls}
        initial={{ opacity: 0, scale: 0.95 }}
        className="z-10 w-[310px] sm:w-[430px] bg-white shadow-2xl border-[8px] sm:border-[12px] border-[#D4AF37] flex flex-col items-center py-8 px-4 sm:p-8 text-center relative cursor-pointer"
        onClick={handleReveal}
      >
        {/* Immersive UI Offset Crimson Corner Brackets */}
        <div className="absolute -left-2.5 -top-2.5 sm:-left-6 sm:-top-6 w-6 h-6 sm:w-12 sm:h-12 border-t-4 border-l-4 border-[#800020]"></div>
        <div className="absolute -right-2.5 -top-2.5 sm:-right-6 sm:-top-6 w-6 h-6 sm:w-12 sm:h-12 border-t-4 border-r-4 border-[#800020]"></div>
        <div className="absolute -left-2.5 -bottom-2.5 sm:-left-6 sm:-bottom-6 w-6 h-6 sm:w-12 sm:h-12 border-b-4 border-l-4 border-[#800020]"></div>
        <div className="absolute -right-2.5 -bottom-2.5 sm:-right-6 sm:-bottom-6 w-6 h-6 sm:w-12 sm:h-12 border-b-4 border-r-4 border-[#800020]"></div>

        {/* Decorative Golden Topper */}
        <div className="mb-4">
          <span className="text-gold tracking-[0.3em] text-[10px] sm:text-xs font-semibold uppercase block">
            The Auspicious Union
          </span>
          <div className="h-[1px] w-12 bg-gold/50 mx-auto mt-2" />
        </div>

        {/* Elegant Couple Monogram Crest */}
        <div className="mb-4 sm:mb-6">
          <MonogramSvg size={110} />
        </div>

        {/* Sharanraj & Annapurna Calligraphy Title */}
        <h1 className="font-serif text-crimson text-2xl sm:text-3.5xl md:text-4xl font-semibold tracking-wide leading-tight px-2">
          Sharanraj
          <span className="block text-gold text-sm sm:text-lg font-serif italic my-1 font-light capitalize">and</span>
          Annapurna
        </h1>

        <div className="h-[1.5px] w-24 sm:w-36 bg-gold/60 mx-auto my-4 sm:my-5" />

        {/* Wedding Date Info */}
        <div className="space-y-1 sm:space-y-2 mt-1">
          <p className="font-serif text-crimson text-xs sm:text-sm tracking-[0.1em] font-medium uppercase">
            Wednesday, 24th June 2026
          </p>
          <p className="font-sans text-[#666] text-[10px] sm:text-xs tracking-[0.2em] uppercase">
            Paraniputhur, Chennai
          </p>
        </div>

        {/* Interactive Click/Scroll Guide Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleReveal();
          }}
          className="mt-6 sm:mt-10 px-6 sm:px-8 py-2.5 sm:py-3 rounded-none bg-[#800020] border border-gold text-gold font-cinzel text-[10px] sm:text-xs tracking-[0.2em] font-bold flex items-center gap-2 shadow-lg gold-glow-hover hover:bg-crimson-dark active:scale-95 transition-all duration-300 pointer-events-auto"
          initial={{ y: 0 }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>Reveal Invitation</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
      </motion.div>

      {/* LEFT MAJESTIC BANYAN TREE CURTAIN */}
      <motion.div
        animate={leftTreeControls}
        initial={{ x: 0, rotate: 0, opacity: 1 }}
        className="absolute top-0 bottom-0 left-0 w-[50%] z-20 pointer-events-none origin-bottom-left flex items-center justify-start overflow-visible"
      >
        <svg
          viewBox="0 0 250 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto min-w-[120%] -translate-x-[15%] drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          {/* Canopy overlay gradient */}
          <defs>
            <linearGradient id="banyanGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1C5" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8E650C" />
            </linearGradient>
            <linearGradient id="canopyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d6a4f" />
              <stop offset="40%" stopColor="#1b4332" />
              <stop offset="100%" stopColor="#081c15" />
            </linearGradient>
          </defs>

          {/* Leaf Canopy Background */}
          <path
            d="M 0,0 L 250,0 C 240,60 210,120 180,180 C 150,230 180,310 140,380 C 110,430 90,520 60,600 C 30,680 50,750 0,800 Z"
            fill="url(#canopyGreen)"
            opacity="0.95"
          />

          {/* Majestic Trunk with Organic Swirls */}
          <path
            d="M 0,400 Q 60,420 80,480 T 50,620 Q 30,680 45,740 T 0,800"
            stroke="url(#banyanGold)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 0,320 Q 80,360 95,440 T 70,590 Q 50,650 60,720 T 0,800"
            stroke="#1b4332"
            strokeWidth="4"
            opacity="0.8"
          />

          {/* Dangling Aerial Roots */}
          <path d="M 180,120 Q 140,240 135,380 T 110,650" stroke="url(#banyanGold)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <path d="M 210,80 Q 180,220 170,410 T 140,710" stroke="#AA7C11" strokeWidth="1.2" opacity="0.6" />
          <path d="M 120,200 Q 90,320 85,490 T 75,760" stroke="url(#banyanGold)" strokeWidth="1" opacity="0.7" />
          <path d="M 150,50 Q 110,180 120,380 T 130,730" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />

          {/* Gold Leaves on Branches */}
          <path d="M 140,320 Q 130,310 120,325 M 100,430 Q 90,420 85,435 M 70,580 Q 60,570 50,585" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 170,240 Q 155,230 160,250 M 115,500 Q 100,490 105,510" stroke="#FFFDF9" strokeWidth="1.5" strokeLinecap="round" />

          {/* Traditional Border Fringe */}
          <rect x="0" y="0" width="10" height="800" fill="url(#banyanGold)" opacity="0.4" />
        </svg>
      </motion.div>

      {/* RIGHT MAJESTIC BANYAN TREE CURTAIN */}
      <motion.div
        animate={rightTreeControls}
        initial={{ x: 0, rotate: 0, opacity: 1 }}
        className="absolute top-0 bottom-0 right-0 w-[50%] z-20 pointer-events-none origin-bottom-right flex items-center justify-end overflow-visible"
      >
        <svg
          viewBox="0 0 250 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto min-w-[120%] translate-x-[15%] drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          {/* Mirror paths for Right Tree */}
          <path
            d="M 250,0 L 0,0 C 10,60 40,120 70,180 C 100,230 70,310 110,380 C 140,430 160,520 190,600 C 220,680 200,750 250,800 Z"
            fill="url(#canopyGreen)"
            opacity="0.95"
          />

          {/* Majestic Trunk with Organic Swirls */}
          <path
            d="M 250,400 Q 190,420 170,480 T 200,620 Q 220,680 205,740 T 250,800"
            stroke="url(#banyanGold)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 250,320 Q 170,360 155,440 T 180,590 Q 200,650 190,720 T 250,800"
            stroke="#1b4332"
            strokeWidth="4"
            opacity="0.8"
          />

          {/* Dangling Aerial Roots */}
          <path d="M 70,120 Q 110,240 115,380 T 140,650" stroke="url(#banyanGold)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <path d="M 40,80 Q 70,220 80,410 T 110,710" stroke="#AA7C11" strokeWidth="1.2" opacity="0.6" />
          <path d="M 130,200 Q 160,320 165,490 T 175,760" stroke="url(#banyanGold)" strokeWidth="1" opacity="0.7" />
          <path d="M 100,50 Q 140,180 130,380 T 120,730" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />

          {/* Gold Leaves on Branches */}
          <path d="M 110,320 Q 120,310 130,325 M 150,430 Q 160,420 165,435 M 180,580 Q 190,570 200,585" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 80,240 Q 95,230 90,250 M 135,500 Q 150,490 145,510" stroke="#FFFDF9" strokeWidth="1.5" strokeLinecap="round" />

          {/* Traditional Border Fringe */}
          <rect x="240" y="0" width="10" height="800" fill="url(#banyanGold)" opacity="0.4" />
        </svg>
      </motion.div>
    </div>
  );
}
