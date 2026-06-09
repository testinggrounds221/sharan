import React from 'react';
import { motion } from 'motion/react';
import GopuramSvg from './GopuramSvg';

export default function ImmersiveSideRails() {
  return (
    <>
      {/* LEFT MARGIN: LEFT FLAP TEMPLE RAILS */}
      {/* On mobile: thin, elegant, soft ambient border rail. On tablet/desktop and up: full majestic Gopuram architecture. */}
      <div 
        className="fixed top-0 left-0 w-8 sm:w-20 md:w-28 lg:w-36 h-full bg-gradient-to-r from-[#FAF5EE]/95 via-[#FAF5EE]/40 to-transparent z-40 pointer-events-none select-none flex flex-col justify-end items-center pb-8"
      >
        {/* Soft, warm sandy backdrop details - decorative floating birds from invitation photo */}
        <div className="absolute top-[12%] left-[20%] opacity-40 flex flex-col gap-8 hidden sm:flex">
          {/* Decorative flying birds vector silhouettes */}
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="#8C6A1E" strokeWidth="1" strokeLinecap="round">
            <path d="M 2,12 Q 8,4 12,10 Q 16,4 22,12" />
          </svg>
          <svg width="18" height="10" viewBox="0 0 24 14" fill="none" stroke="#8C6A1E" strokeWidth="0.8" strokeLinecap="round" className="translate-x-4">
            <path d="M 2,12 Q 8,4 12,10 Q 16,4 22,12" />
          </svg>
        </div>

        {/* Faint ambient sun/moon on the left panel exactly like photo */}
        <div className="absolute top-[5%] left-[25%] w-10 h-10 rounded-full border border-[#D4AF37]/25 bg-gradient-to-tr from-[#FFECA8]/10 to-transparent opacity-30 shadow-inner hidden md:block" />

        {/* The majestic Left Dravidian temple tower */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="w-full flex justify-center px-1 sm:px-2"
        >
          <GopuramSvg className="w-full max-w-[130px] filter saturate-[0.8] drop-shadow-[5px_-5px_15px_rgba(85,63,15,0.08)]" height="75vh" />
        </motion.div>
      </div>

      {/* RIGHT MARGIN: RIGHT FLAP TEMPLE RAILS */}
      <div 
        className="fixed top-0 right-0 w-8 sm:w-20 md:w-28 lg:w-36 h-full bg-gradient-to-l from-[#FAF5EE]/95 via-[#FAF5EE]/40 to-transparent z-40 pointer-events-none select-none flex flex-col justify-end items-center pb-8"
      >
        {/* Soft, warm sandy backdrop details - decorative floating birds from invitation photo */}
        <div className="absolute top-[8%] right-[25%] opacity-40 flex flex-col gap-8 hidden sm:flex">
          {/* Decorative flying birds vector silhouettes */}
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="#8C6A1E" strokeWidth="1" strokeLinecap="round" className="-scale-x-100">
            <path d="M 2,12 Q 8,4 12,10 Q 16,4 22,12" />
          </svg>
          <svg width="18" height="10" viewBox="0 0 24 14" fill="none" stroke="#8C6A1E" strokeWidth="0.8" strokeLinecap="round" className="-scale-x-100 -translate-x-2">
            <path d="M 2,12 Q 8,4 12,10 Q 16,4 22,12" />
          </svg>
        </div>

        {/* The majestic Right Dravidian temple tower */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
          className="w-full flex justify-center px-1 sm:px-2"
        >
          <GopuramSvg className="w-full max-w-[130px] filter saturate-[0.8] drop-shadow-[-5px_-5px_15px_rgba(85,63,15,0.08)]" height="75vh" />
        </motion.div>
      </div>

      {/* Huge subtle Backdrop SA Watermark from updated photo monogram style */}
      <div className="fixed inset-0 flex items-center justify-center opacity-[0.015] select-none pointer-events-none z-0">
        <span className="text-[180px] sm:text-[300px] md:text-[400px] lg:text-[480px] font-bold text-[#800020] tracking-widest leading-none font-serif">
          SA
        </span>
      </div>
    </>
  );
}
