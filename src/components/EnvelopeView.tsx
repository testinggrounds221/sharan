import React from 'react';
import { motion } from 'motion/react';
import MonogramSvg from './MonogramSvg';
import { MailOpen } from 'lucide-react';

interface EnvelopeViewProps {
  onOpen: () => void;
}

export default function EnvelopeView({ onOpen }: EnvelopeViewProps) {
  const [secondsLeft, setSecondsLeft] = React.useState(3);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (secondsLeft === 0) {
      onOpen();
    }
  }, [secondsLeft, onOpen]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FFFDF9] px-4 overflow-hidden relative">
      {/* Decorative Indian Mandorla Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Elegant Header Text styling */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center mb-8 z-10"
      >
        <span className="block font-serif text-crimson italic text-lg sm:text-xl md:text-2xl tracking-wide">
          You are cordially invited
        </span>
        <div className="h-[1px] w-24 bg-gold mx-auto mt-3 opacity-60" />
      </motion.div>

      {/* 3D Envelope Wrapper */}
      <motion.div
        className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-lg shadow-2xl overflow-visible cursor-pointer"
        onClick={onOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Envelope Base Cardboard (Deep Crimson base with gold lining) */}
        <div className="absolute inset-0 rounded-lg crimson-gradient-bg p-1 gold-glow border border-gold/40 flex flex-col justify-between overflow-hidden">
          
          {/* Internal card liner / elegant gold floral borders inside envelope corners */}
          <div className="absolute inset-4 rounded border border-gold/20 pointer-events-none flex items-center justify-center">
            {/* Fine watermark background */}
            <div className="opacity-[0.04] scale-[2.2] pointer-events-none">
              <MonogramSvg size={140} watermark={true} />
            </div>
          </div>

          {/* Decorative Corner Filigrees (using CSS borders and gold gradients) */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/60" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/60" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/60" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/60" />

          {/* Golden Letter Seals and Greetings inside envelope front */}
          <div className="w-full h-full flex flex-col justify-between items-center py-10 px-6 z-10">
            {/* Royal Crown Ornament */}
            <div className="text-gold/80 font-cinzel text-xs tracking-widest flex items-center gap-1.5">
              <span className="h-0.5 w-6 bg-gold/40" />
              ROYAL INVITATION
              <span className="h-0.5 w-6 bg-gold/40" />
            </div>

            {/* Central Calligraphy of Names Monogram */}
            <div className="flex flex-col items-center">
              <MonogramSvg size={130} />
              <h2 className="font-serif text-gold-light mt-4 text-xl sm:text-2xl tracking-widest font-medium uppercase text-center">
                SHARANRAJ &amp; ANNAPURNA
              </h2>
              <p className="font-mono text-[10px] tracking-[0.2em] text-gold/60 mt-1 uppercase">
                June 24, 2026
              </p>
            </div>

            {/* Seal Section (Envelope Flap Overlap representation) */}
            <div className="flex flex-col items-center">
              {/* Animated Wax Seal Wax Button */}
              <motion.div
                className="w-14 h-14 rounded-full bg-linear-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-lg border border-gold-light/60 z-20 hover:scale-110 active:scale-95 transition-transform"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(212, 175, 55, 0.3)",
                    "0 0 20px rgba(212, 175, 55, 0.6)",
                    "0 0 10px rgba(212, 175, 55, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Custom Wax Seal Monogram "S&A" or Mail Icon */}
                <MailOpen className="w-6 h-6 text-crimson-dark" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Envelope Paper Flaps - Created using custom clipPaths */}
        {/* Left Flap */}
        <div 
          className="absolute inset-0 bg-crimson-dark/80 opacity-[0.25]"
          style={{ clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)' }}
        />
        {/* Right Flap */}
        <div 
          className="absolute inset-0 bg-crimson-dark/80 opacity-[0.25]"
          style={{ clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)' }}
        />
        {/* Bottom Flap */}
        <div 
          className="absolute inset-0 bg-crimson-dark/90 opacity-[0.15]"
          style={{ clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)' }}
        />
      </motion.div>

      {/* Floating Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-8 text-center z-10"
      >
        <button
          onClick={onOpen}
          className="font-cinzel text-gold text-xs sm:text-sm tracking-[0.25em] font-semibold uppercase hover:text-gold-light transition-colors duration-300 focus:outline-none flex flex-col items-center gap-2 cursor-pointer"
        >
          <span>Opening in {secondsLeft}s or click to open</span>
          <div className="flex justify-center gap-1.5 mt-1">
            <span className={`w-2 h-2 rounded-full bg-gold ${secondsLeft >= 3 ? 'opacity-100' : 'opacity-30'} transition-all`} />
            <span className={`w-2 h-2 rounded-full bg-gold ${secondsLeft >= 2 ? 'opacity-100' : 'opacity-30'} transition-all`} />
            <span className={`w-2 h-2 rounded-full bg-gold ${secondsLeft >= 1 ? 'opacity-100' : 'opacity-30'} transition-all`} />
          </div>
        </button>
      </motion.div>

      {/* Decorative Bottom Corner Mandalas */}
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-gold/10 opacity-30 flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 rounded-full border border-dashed border-gold/10" />
      </div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border border-gold/10 opacity-30 flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 rounded-full border border-dashed border-gold/10" />
      </div>
    </div>
  );
}
