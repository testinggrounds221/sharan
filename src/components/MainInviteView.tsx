import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Sparkle, 
  Heart, 
  ChevronRight, 
  Gift, 
  CheckCircle,
  Map,
  Compass
} from 'lucide-react';
import GaneshaSvg from './GaneshaSvg';
import MonogramSvg from './MonogramSvg';
import LeafParticle from './LeafParticle';
// @ts-ignore
import coupleImage from './final_sharan.png';
import { RSVPData } from '../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

// Auspicious Hindu Swastika Symbol for the sacred borders & highlights
const SwastikaSvg = ({ className = "w-5 h-5 text-[#D4AF37]" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    stroke="currentColor" 
    strokeWidth="10" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    fill="none"
  >
    {/* Center cross */}
    <path d="M 50,15 L 50,85 M 15,50 L 85,50" />
    {/* 4 traditional clockwise arms */}
    <path d="M 50,15 L 85,15" />
    <path d="M 85,50 L 85,85" />
    <path d="M 50,85 L 15,85" />
    <path d="M 15,50 L 15,15" />
    {/* 4 small dots in quadrants */}
    <circle cx="32" cy="32" r="5" fill="currentColor" stroke="none" />
    <circle cx="68" cy="32" r="5" fill="currentColor" stroke="none" />
    <circle cx="68" cy="68" r="5" fill="currentColor" stroke="none" />
    <circle cx="32" cy="68" r="5" fill="currentColor" stroke="none" />
  </svg>
);

export default function MainInviteView() {
  // Secret double tap state for Admin access
  const [clickCount, setClickCount] = useState(0);
  const handleSecretClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 2) {
        window.location.hash = 'admin';
        return 0;
      }
      return next;
    });
  };

  // Reset tap counter if idle
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  // RSVP state
  const [rsvp, setRsvp] = useState<RSVPData>({
    guestName: '',
    attendeesCount: 1,
    attendance: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load existing RSVP if stored
  useEffect(() => {
    const savedRSVP = localStorage.getItem('wedding_rsvp');
    if (savedRSVP) {
      try {
        setRsvp(JSON.parse(savedRSVP));
        setIsSubmitted(true);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Countdown timer calculations
  // Target: June 24, 2026, 06:00:00 IST (UTC+5:30)
  // Corresponding UTC timestamp: June 24, 2026, 00:30:00 UTC
  const targetDate = new Date('2026-06-24T06:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvp.guestName.trim()) return;
    if (!rsvp.attendance) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'rsvps'), {
        guestName: rsvp.guestName.trim(),
        attendeesCount: rsvp.attendeesCount,
        attendance: rsvp.attendance,
        createdAt: serverTimestamp()
      });

      localStorage.setItem('wedding_rsvp', JSON.stringify(rsvp));
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Firestore persistence failed, falling back gracefully to local browser memory:", err);
      // Fallback graceful mode to ensure maximum wedding guest accessibility
      localStorage.setItem('wedding_rsvp', JSON.stringify(rsvp));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleResetRSVP = () => {
    localStorage.removeItem('wedding_rsvp');
    setRsvp({
      guestName: '',
      attendeesCount: 1,
      attendance: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent overflow-x-hidden text-crimson pb-20 select-text">
      
      {/* Floating Margin Leaf breeze particles (Phase 3 Exclusive feature) */}
      <LeafParticle />

      {/* Royal Subtle Line Art Watermark in Section Junctions */}
      <div className="absolute top-[800px] left-[50%] -translate-x-[50%] opacity-[0.02] pointer-events-none z-0">
        <MonogramSvg size={450} watermark={true} />
      </div>
      <div className="absolute top-[1800px] left-[50%] -translate-x-[50%] opacity-[0.02] pointer-events-none z-0">
        <MonogramSvg size={500} watermark={true} />
      </div>

      <div className="w-full max-w-2xl mx-auto px-2 sm:px-6 relative z-10 my-6 sm:my-10">
        {/* Main Double Gold-line bordered Elegant Sheet Insert */}
        <div className="relative bg-white/95 shadow-[0_20px_50px_rgba(128,0,32,0.12)] border-[10px] border-[#D4AF37]/90 px-4 sm:px-10 py-2 sm:py-6 rounded-sm overflow-hidden">
          {/* Subtle horizontal/vertical pinstripes */}
          <div className="absolute inset-1.5 border border-[#D4AF37]/45 rounded-sm pointer-events-none" />
          <div className="absolute inset-2.5 border border-[#800020]/15 rounded-sm pointer-events-none" />
          
          {/* Decorative Corner loops */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] opacity-80" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] opacity-80" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] opacity-80" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] opacity-80" />
        
        {/* ================= HEADER COMPONENT ================= */}
        <header className="pt-16 pb-12 flex flex-col items-center text-center">
          {/* Traditional Gold-line Lord Ganapathy */}
          <GaneshaSvg size={110} />
          
          {/* Stylized "SA" Monogram divider */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="my-3"
          >
            <MonogramSvg size={100} />
          </motion.div>

          <span className="font-cinzel text-gold text-xs sm:text-xs tracking-[0.3em] font-bold block uppercase mt-2">
            In Divine Marriage
          </span>
          <div className="h-[1px] w-20 bg-gold/50 my-2" />
        </header>

        {/* ================= SECTION 1: THE NARRATIVE ================= */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="text-center px-4 mb-20 relative"
        >
          {/* Subtle floral crown ornament with Swastika Symbols */}
          <div className="flex items-center justify-center gap-3 text-gold mb-4">
            <SwastikaSvg className="w-4 h-4 text-gold animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold/80">Divine Blessings</span>
            <SwastikaSvg className="w-4 h-4 text-gold animate-pulse" />
          </div>

          <h3 className="font-cinzel text-xl sm:text-2xl text-crimson font-medium tracking-wide mb-6 leading-relaxed">
            The Invitation of Love
          </h3>
          
          <div className="font-serif text-base sm:text-lg text-crimson-dark/90 leading-relaxed max-w-lg mx-auto space-y-4">
            <p className="italic">
              "Two distinct souls, guided by destiny and bound by affection, are uniting under the sacred bonds of matrimony."
            </p>
            <p className="text-sm sm:text-base not-italic font-sans text-crimson/80 tracking-wide font-light">
              We cordially request the honor of your presence and warm blessings as we celebrate the wedding ceremony of
            </p>
          </div>
        </motion.section>

        {/* ================= SECTION 2: BRIDE & GROOM DETAILS ================= */}
        <section className="mb-24 px-2">
          {/* Dedicated Centered Couple Painting Frame */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center justify-center mb-16 px-4"
          >
            {/* Frameless transparent photo of the couple */}
            <div className="relative max-w-sm flex items-center justify-center overflow-visible">
              {/* Dynamic slow pulsing back-light glow/aura mimicking divine auspicious vibes */}
              <motion.div 
                className="absolute w-44 h-44 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-[#D4AF37]/35 via-[#800020]/25 to-[#FFECA8]/30 blur-3xl"
                animate={{
                  scale: [0.94, 1.14, 0.94],
                  opacity: [0.35, 0.65, 0.35],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <img 
                src={coupleImage} 
                alt="Sharanraj & Annapurna" 
                className="w-full max-w-[310px] sm:max-w-sm h-auto object-contain drop-shadow-[0_20px_35px_rgba(128,0,32,0.18)] filter saturate-[1.03] relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Artistic caption */}
            <div className="pt-6 text-center z-10">
              <p className="font-cinzel text-crimson text-sm sm:text-xs tracking-[0.2em] font-semibold uppercase">
                Sharanraj &amp; Annapurna
              </p>
              <div className="flex justify-center gap-1 mt-1 text-[#D4AF37]">
                <Heart className="w-3 h-3 fill-[#D4AF37]" />
                <Heart className="w-3 h-3 fill-[#D4AF37]" />
              </div>
            </div>
          </motion.div>

          {/* Staggered Drift-In Cards for Groom & Bride */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            
            {/* GROOM CARD (Sliding from Left margin) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative p-8 bg-white shadow-2xl border-[10px] border-[#D4AF37] flex flex-col items-center text-center rounded-sm"
            >
              {/* Immersive UI Corner Brackets */}
              <div className="absolute -left-3 -top-3 w-6 h-6 border-t-4 border-l-4 border-[#800020]"></div>
              <div className="absolute -right-3 -top-3 w-6 h-6 border-t-4 border-r-4 border-[#800020]"></div>
              <div className="absolute -left-3 -bottom-3 w-6 h-6 border-b-4 border-l-4 border-[#800020]"></div>
              <div className="absolute -right-3 -bottom-3 w-6 h-6 border-b-4 border-r-4 border-[#800020]"></div>

              <div className="w-12 h-12 rounded-full bg-crimson/5 border border-[#D4AF37] flex items-center justify-center mb-4">
                <SwastikaSvg className="w-6 h-6 text-[#D4AF37]" />
              </div>

              <span className="font-cinzel text-xs text-[#D4AF37] font-bold tracking-[0.25em] uppercase">Groom</span>
              <h4 className="font-serif text-[#800020] text-2xl font-bold mt-2 tracking-wide">Selvan K. Sharanraj</h4>
              <p className="font-sans text-xs font-semibold text-[#800020]/80 tracking-widest mt-1 uppercase">MBA</p>
              
              <p className="font-mono text-[10px] text-[#800020]/60 tracking-wider mt-2 italic">
                Fidelity Investments, Chennai
              </p>

              <div className="w-16 h-[1.5px] bg-[#D4AF37]/40 my-6" />

              <div className="space-y-1">
                <span className="font-cinzel text-[10px] text-[#D4AF37] tracking-widest block uppercase">Beloved Son of</span>
                <p className="font-serif text-[#800020]/90 font-semibold text-base">Thiru V. Kumar</p>
                <span className="font-serif text-xs text-[#800020]/75 italic block">&amp;</span>
                <p className="font-serif text-[#800020]/90 font-semibold text-base">Thirumathi K. Bhuvaneshwari</p>
              </div>
            </motion.div>

            {/* BRIDE CARD (Sliding from Right margin) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative p-8 bg-white shadow-2xl border-[10px] border-[#D4AF37] flex flex-col items-center text-center rounded-sm"
            >
              {/* Immersive UI Corner Brackets */}
              <div className="absolute -left-3 -top-3 w-6 h-6 border-t-4 border-l-4 border-[#800020]"></div>
              <div className="absolute -right-3 -top-3 w-6 h-6 border-t-4 border-r-4 border-[#800020]"></div>
              <div className="absolute -left-3 -bottom-3 w-6 h-6 border-b-4 border-l-4 border-[#800020]"></div>
              <div className="absolute -right-3 -bottom-3 w-6 h-6 border-b-4 border-r-4 border-[#800020]"></div>

              <div className="w-12 h-12 rounded-full bg-crimson/5 border border-[#D4AF37] flex items-center justify-center mb-4">
                <SwastikaSvg className="w-6 h-6 text-[#D4AF37]" />
              </div>

              <span className="font-cinzel text-xs text-[#D4AF37] font-bold tracking-[0.25em] uppercase">Bride</span>
              <h4 className="font-serif text-[#800020] text-2xl font-bold mt-2 tracking-wide">Selvi R. Vasuri Annapurna</h4>
              <p className="font-sans text-xs font-semibold text-[#800020]/80 tracking-widest mt-1 uppercase">BSc Statistics</p>
              
              <p className="font-mono text-[10px] text-[#800020]/60 tracking-wider mt-2 italic">
                Associate, State Bank of India, Hyderabad
              </p>

              <div className="w-16 h-[1.5px] bg-[#D4AF37]/40 my-6" />

              <div className="space-y-1">
                <span className="font-cinzel text-[10px] text-[#D4AF37] tracking-widest block uppercase">Beloved Daughter of</span>
                <p className="font-serif text-[#800020]/90 font-semibold text-base">Thiru R. Rangarajan</p>
                <span className="font-serif text-xs text-[#800020]/75 italic block">&amp;</span>
                <p className="font-serif text-[#800020]/90 font-semibold text-base">Thirumathi R. Radha</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= SECTION 3 & 4: FUNCTIONS (MUHURTHAM & RECEPTION) ================= */}
        <section className="mb-24 space-y-10">
          
          {/* Section decorative divider */}
          <div className="flex flex-col items-center mb-12">
            <div className="h-[1px] w-24 bg-gold" />
            <span className="font-cinzel text-gold text-xs tracking-[0.3em] font-bold block my-2 uppercase">
              Schedule of Ceremonies
            </span>
            <div className="h-[1px] w-24 bg-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CEREMONY 1: RECEPTION (TUESDAY) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="relative p-8 bg-white shadow-2xl border-[8px] border-[#D4AF37] overflow-hidden group transition-colors rounded-sm"
            >
              {/* Immersive UI Corner Brackets */}
              <div className="absolute -left-2 -top-2 w-5 h-5 border-t-4 border-l-4 border-[#800020]"></div>
              <div className="absolute -right-2 -top-2 w-5 h-5 border-t-4 border-r-4 border-[#800020]"></div>
              <div className="absolute -left-2 -bottom-2 w-5 h-5 border-b-4 border-l-4 border-[#800020]"></div>
              <div className="absolute -right-2 -bottom-2 w-5 h-5 border-b-4 border-r-4 border-[#800020]"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" style={{ strokeWidth: 1.5 }} />
                    <span className="font-cinzel text-xs text-[#D4AF37] tracking-widest font-semibold uppercase">Celebration First</span>
                  </div>
                  
                  <h4 className="font-cinzel text-2xl text-[#800020] font-semibold tracking-wide">
                    The Reception
                  </h4>
                  
                  <div className="h-[1px] w-12 bg-[#D4AF37]/50 my-4" />
                  
                  <div className="space-y-3 font-serif">
                    <p className="text-lg text-[#800020]/90 font-medium">
                      Tuesday 23rd June 2026
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-[#800020]/80 font-sans tracking-wide">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span>6:00 PM Onwards</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-[#D4AF37] flex items-center justify-start gap-1 font-mono text-[9px] tracking-widest uppercase">
                  <span>Welcome Dinner Included</span>
                  <div className="w-4 h-0.5 bg-[#D4AF37]/40" />
                </div>
              </div>
            </motion.div>

            {/* CEREMONY 2: SUBHA MUHURTHAM (WEDNESDAY) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="relative p-8 bg-[#800020] text-white shadow-2xl border-[8px] border-[#D4AF37] overflow-hidden group transition-colors rounded-sm"
            >
              {/* Immersive UI Corner Brackets (Gold-light for Contrast on Crimson background) */}
              <div className="absolute -left-2 -top-2 w-5 h-5 border-t-4 border-l-4 border-[#FFFDF9]"></div>
              <div className="absolute -right-2 -top-2 w-5 h-5 border-t-4 border-r-4 border-[#FFFDF9]"></div>
              <div className="absolute -left-2 -bottom-2 w-5 h-5 border-b-4 border-l-4 border-[#FFFDF9]"></div>
              <div className="absolute -right-2 -bottom-2 w-5 h-5 border-b-4 border-r-4 border-[#FFFDF9]"></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" style={{ strokeWidth: 1.5 }} />
                    <span className="font-cinzel text-xs text-[#D4AF37] tracking-widest font-semibold uppercase">The Sacred Vows</span>
                  </div>

                  <h4 className="font-cinzel text-2xl text-[#D4AF37] font-semibold tracking-wide">
                    Subha Muhurtham
                  </h4>

                  <div className="h-[1px] w-12 bg-[#D4AF37]/45 my-4" />

                  <div className="space-y-3 font-serif">
                    <p className="text-lg text-[#FFFDF9] font-medium">
                      Wednesday 24th June 2026
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-[#FFFDF9]/90 font-sans tracking-wide">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span>6:00 AM to 7:30 AM IST</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-[#D4AF37] flex items-center justify-start gap-1 font-mono text-[9px] tracking-widest uppercase">
                  <span>Auspicious Hours</span>
                  <div className="w-4 h-0.5 bg-[#D4AF37]/40" />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= SECTION 5: VENUE, MAP & LIVE COUNTDOWN ================= */}
        <section className="mb-24 space-y-12">
          
          {/* Section Divider */}
          <div className="flex flex-col items-center">
            <div className="h-[1px] w-24 bg-gold" />
            <span className="font-cinzel text-gold text-xs tracking-[0.3em] font-bold block my-2 uppercase">
              Location &amp; Registry
            </span>
            <div className="h-[1px] w-24 bg-gold" />
          </div>

          {/* Majestic Venue Card with Map Access */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative p-8 bg-white shadow-2xl border-[10px] border-[#D4AF37] overflow-hidden text-center flex flex-col items-center rounded-sm"
          >
            {/* Immersive UI Corner Brackets */}
            <div className="absolute -left-3 -top-3 w-6 h-6 border-t-4 border-l-4 border-[#800020]"></div>
            <div className="absolute -right-3 -top-3 w-6 h-6 border-t-4 border-r-4 border-[#800020]"></div>
            <div className="absolute -left-3 -bottom-3 w-6 h-6 border-b-4 border-l-4 border-[#800020]"></div>
            <div className="absolute -right-3 -bottom-3 w-6 h-6 border-b-4 border-r-4 border-[#800020]"></div>

            {/* Background luxury medallion vector lines */}
            <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Custom Location Pin */}
            <div className="w-14 h-14 rounded-full bg-[#800020] border-2 border-[#D4AF37] flex items-center justify-center mb-6 shadow-md shadow-crimson/20">
              <MapPin className="w-6 h-6 text-[#FFFDF9]" />
            </div>

            <h4 className="font-cinzel text-xl text-[#800020] font-semibold tracking-wide">The Marriage Venue</h4>
            <h5 className="font-serif text-2xl text-[#800020] font-bold mt-2">Dhanam Thirumana Mahal</h5>
            
            <p className="font-sans text-sm text-[#800020]/80 leading-relaxed max-w-md mt-4 font-light px-2">
              Mangadu Main Road, Paraniputhur, <br />
              Chennai, Tamil Nadu - 600122
            </p>

            {/* Interactive Elegant Maps Link */}
            <motion.a
              href="https://maps.app.goo.gl/Ea94bD5AcPSucmrv8"
              target="_blank"
              rel="noreferrer"
              className="mt-8 px-6 py-3 rounded-none bg-[#800020] border border-[#D4AF37]/50 text-[#D4AF37] font-cinzel text-xs tracking-wider font-semibold shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:translate-y-[1px] active:scale-95 transition-all duration-300 flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="w-4 h-4 text-[#D4AF37] animate-spin-slow" />
              <span>Navigate via Google Maps</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>

          {/* Premium Countdown Clock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-[#800020] text-white shadow-2xl border-[10px] border-[#D4AF37] p-8 relative text-center flex flex-col items-center overflow-hidden rounded-sm"
          >
            {/* Immersive UI Corner Brackets */}
            <div className="absolute -left-3 -top-3 w-6 h-6 border-t-4 border-l-4 border-[#FFFDF9]"></div>
            <div className="absolute -right-3 -top-3 w-6 h-6 border-t-4 border-r-4 border-[#FFFDF9]"></div>
            <div className="absolute -left-3 -bottom-3 w-6 h-6 border-b-4 border-l-4 border-[#FFFDF9]"></div>
            <div className="absolute -right-3 -bottom-3 w-6 h-6 border-b-4 border-r-4 border-[#FFFDF9]"></div>

            {/* Glow overlays */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-[#D4AF37]/5 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#D4AF37]/5 blur-3xl rounded-full" />

            <span className="font-cinzel text-[#D4AF37] text-xs tracking-[0.25em] font-semibold uppercase block mb-6">
              Countdown to Subha Muhurtham
            </span>

            {timeLeft.isOver ? (
              <h5 className="font-serif text-2xl text-[#D4AF37] font-bold py-4 px-2 tracking-wide">
                The Celebration Has Begun! 🎉
              </h5>
            ) : (
              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-sm w-full relative z-10 select-none">
                
                {/* DAYS TIMER BOX */}
                <div className="flex flex-col items-center border border-[#D4AF37] px-2 sm:px-3 py-2 bg-[#FFFDF9]">
                  <span className="text-xl sm:text-2xl font-bold text-[#800020]">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-tighter text-[#666] font-sans font-medium mt-0.5">Days</span>
                </div>

                {/* HOURS TIMER BOX */}
                <div className="flex flex-col items-center border border-[#D4AF37] px-2 sm:px-3 py-2 bg-[#FFFDF9]">
                  <span className="text-xl sm:text-2xl font-bold text-[#800020]">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-tighter text-[#666] font-sans font-medium mt-0.5">Hrs</span>
                </div>

                {/* MINUTES BOX */}
                <div className="flex flex-col items-center border border-[#D4AF37] px-2 sm:px-3 py-2 bg-[#FFFDF9]">
                  <span className="text-xl sm:text-2xl font-bold text-[#800020]">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-tighter text-[#666] font-sans font-medium mt-0.5">Min</span>
                </div>

                {/* SECONDS BOX */}
                <div className="flex flex-col items-center border border-[#D4AF37] px-2 sm:px-3 py-2 bg-[#FFFDF9]">
                  <span className="text-xl sm:text-2xl font-bold text-[#800020] animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-tighter text-[#666] font-sans font-medium mt-0.5">Sec</span>
                </div>

              </div>
            )}

            <div className="h-[0.5px] w-24 bg-[#D4AF37]/30 mt-8 mb-2" />
            <p className="font-mono text-[9px] text-[#D4AF37]/80 tracking-widest uppercase">
              Wed 24 June 2026 • 06:00 AM IST
            </p>
          </motion.div>

        </section>

        {/* ================= SECTION 6: INTERACTIVE RSVP FORM ================= */}
        <section className="mb-24">
          
          <div className="flex flex-col items-center mb-10">
            <div className="h-[1px] w-24 bg-gold" />
            <span className="font-cinzel text-gold text-xs tracking-[0.3em] font-bold block my-2 uppercase">
              Confirm Your Presence
            </span>
            <div className="h-[1px] w-24 bg-gold" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative p-6 sm:p-8 bg-white shadow-2xl border-[10px] border-[#D4AF37] rounded-sm"
          >
            {/* Immersive UI Corner Brackets */}
            <div className="absolute -left-3 -top-3 w-6 h-6 border-t-4 border-l-4 border-[#800020]"></div>
            <div className="absolute -right-3 -top-3 w-6 h-6 border-t-4 border-r-4 border-[#800020]"></div>
            <div className="absolute -left-3 -bottom-3 w-6 h-6 border-b-4 border-l-4 border-[#800020]"></div>
            <div className="absolute -right-3 -bottom-3 w-6 h-6 border-b-4 border-r-4 border-[#800020]"></div>

            {!isSubmitted ? (
              <form onSubmit={handleRSVPSubmit} className="space-y-6 relative z-10">
                <div className="text-center mb-6">
                  <span className="font-serif italic text-crimson-dark text-base sm:text-lg block">Your blessings are requested</span>
                  <p className="font-sans text-xs text-crimson/70 tracking-wide mt-1">Please respond to let us know if you can witness our union.</p>
                </div>

                {/* GUEST NAME FIELD */}
                <div className="space-y-2">
                  <label htmlFor="guestName" className="font-cinzel text-xs text-gold font-semibold tracking-wider block uppercase">
                    Guest Name(s) *
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    required
                    value={rsvp.guestName}
                    onChange={(e) => setRsvp({ ...rsvp, guestName: e.target.value })}
                    placeholder="Enter your name or family name"
                    className="w-full px-4 py-3 rounded-lg border border-gold/20 bg-cream text-crimson focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-serif placeholder:font-sans placeholder:text-crimson/30 transition-all shadow-inner text-base"
                  />
                </div>

                {/* NUMBER OF ATTENDEES (DROPDOWN) */}
                <div className="space-y-2">
                  <label htmlFor="attendees" className="font-cinzel text-xs text-gold font-semibold tracking-wider block uppercase">
                    Number of Attendees *
                  </label>
                  <div className="relative">
                    <select
                      id="attendees"
                      value={rsvp.attendeesCount}
                      onChange={(e) => setRsvp({ ...rsvp, attendeesCount: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-gold/20 bg-cream text-crimson focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-serif appearance-none cursor-pointer transition-all shadow-inner text-base"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="5">5+ Persons</option>
                    </select>
                    <div className="absolute right-4 top-[50%] -translate-y-[50%] pointer-events-none text-gold">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* ATTENDANCE OPTIONS (RADIO BUTTONS) */}
                <div className="space-y-3">
                  <span className="font-cinzel text-xs text-gold font-semibold tracking-wider block uppercase">
                    Will You Attend? *
                  </span>
                  
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    
                    {/* BOTH CEREMONIES option */}
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${rsvp.attendance === 'both' ? 'border-gold bg-gold/5 shadow-md' : 'border-gold/15 bg-cream/50'}`}>
                      <input
                        type="radio"
                        required
                        name="attendance"
                        checked={rsvp.attendance === 'both'}
                        onChange={() => setRsvp({ ...rsvp, attendance: 'both' })}
                        className="w-4 h-4 accent-crimson cursor-pointer"
                      />
                      <div className="text-left">
                        <span className="block font-serif text-sm font-semibold text-crimson-dark">Attending Both</span>
                        <span className="block text-[10px] font-sans text-crimson/60 uppercase">Reception &amp; Muhurtham</span>
                      </div>
                    </label>

                    {/* WEDDING/MUHURTHAM ONLY option */}
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${rsvp.attendance === 'wedding' ? 'border-gold bg-gold/5 shadow-md' : 'border-gold/15 bg-cream/50'}`}>
                      <input
                        type="radio"
                        required
                        name="attendance"
                        checked={rsvp.attendance === 'wedding'}
                        onChange={() => setRsvp({ ...rsvp, attendance: 'wedding' })}
                        className="w-4 h-4 accent-crimson cursor-pointer"
                      />
                      <div className="text-left">
                        <span className="block font-serif text-sm font-semibold text-crimson-dark">Wedding Only</span>
                        <span className="block text-[10px] font-sans text-crimson/60 uppercase">Muhurtham Ceremony</span>
                      </div>
                    </label>

                    {/* RECEPTION ONLY option */}
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${rsvp.attendance === 'reception' ? 'border-gold bg-gold/5 shadow-md' : 'border-gold/15 bg-cream/50'}`}>
                      <input
                        type="radio"
                        required
                        name="attendance"
                        checked={rsvp.attendance === 'reception'}
                        onChange={() => setRsvp({ ...rsvp, attendance: 'reception' })}
                        className="w-4 h-4 accent-crimson cursor-pointer"
                      />
                      <div className="text-left">
                        <span className="block font-serif text-sm font-semibold text-crimson-dark">Reception Only</span>
                        <span className="block text-[10px] font-sans text-crimson/60 uppercase">Dinner Celebration</span>
                      </div>
                    </label>

                    {/* DECLINING option */}
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${rsvp.attendance === 'declining' ? 'border-gold bg-gold/5 shadow-md' : 'border-gold/15 bg-cream/50'}`}>
                      <input
                        type="radio"
                        required
                        name="attendance"
                        checked={rsvp.attendance === 'declining'}
                        onChange={() => setRsvp({ ...rsvp, attendance: 'declining' })}
                        className="w-4 h-4 accent-crimson cursor-pointer"
                      />
                      <div className="text-left">
                        <span className="block font-serif text-sm font-semibold text-crimson-dark">Regretfully Decline</span>
                        <span className="block text-[10px] font-sans text-crimson/60 uppercase">Blessings Shared Remotely</span>
                      </div>
                    </label>

                  </div>
                </div>

                {/* TACTILE SUBMIT FLOW */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg crimson-gradient-bg border-2 border-gold text-gold font-cinzel text-sm sm:text-base tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-xl gold-glow-hover active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Locking RSVP Responses...</span>
                    ) : (
                      <>
                        <Gift className="w-5 h-5 text-gold-light" />
                        <span>Lock In RSVP</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            ) : (
              // STUNNING SUCCESS CONFIRMATION BLOCK (ANIME STATE)
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center py-8 px-4 flex flex-col items-center relative z-10"
              >
                {/* Custom Elegant Check Emblem */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  className="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center text-gold mb-6"
                >
                  <CheckCircle className="w-10 h-10 stroke-[1.5]" />
                </motion.div>

                <h4 className="font-cinzel text-xl sm:text-2xl text-crimson font-bold tracking-wide">
                  RSVP Received Successfully!
                </h4>
                
                <h5 className="font-serif text-base text-crimson-dark/90 mt-3 font-semibold">
                  Thank you, <span className="text-crimson font-serif underline">{rsvp.guestName}</span>.
                </h5>

                <div className="h-[0.5px] w-20 bg-gold/50 my-5" />

                <div className="bg-cream-dark/30 hover:bg-cream-dark/50 border border-gold/15 p-4 rounded-lg max-w-sm w-full mx-auto text-left font-serif text-sm text-crimson-dark/80 space-y-1.5 shadow-inner transition-colors">
                  <p><strong className="font-cinzel text-[10px] text-gold tracking-widest block uppercase">Attendees Registered:</strong> {rsvp.attendeesCount} {rsvp.attendeesCount === 1 ? 'Guest' : 'Guests'}</p>
                  <p>
                    <strong className="font-cinzel text-[10px] text-gold tracking-widest block uppercase">Ceremony Response:</strong> 
                    {rsvp.attendance === 'both' ? 'Attending Both Functions' :
                     rsvp.attendance === 'wedding' ? 'Attending Wedding Ceremony Only' :
                     rsvp.attendance === 'reception' ? 'Attending Reception Only' :
                     'Regretfully Declining / Blessings sent'}
                  </p>
                </div>

                <p className="font-sans text-xs text-crimson/60 leading-relaxed font-light mt-6 max-w-xs">
                  Your seat configuration has been recorded locally. We look forward to holding this auspicious moment with you!
                </p>

                {/* Change response button option */}
                <button
                  onClick={handleResetRSVP}
                  className="mt-8 font-cinzel text-[10px] text-gold tracking-widest uppercase hover:text-gold-dark underline focus:outline-none transition-colors"
                >
                  Change Response
                </button>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* ================= FOOTER SECTION ================= */}
        <footer className="pt-8 pb-10 flex flex-col items-center text-center">
          <div className="h-[1px] w-32 bg-gold/40 mb-8" />
          
          {/* Prominent Hashtag - normal-case with responsive size to prevent character clipping */}
          <h2 className="font-cinzel text-gold text-lg min-[400px]:text-xl sm:text-3xl font-bold tracking-[0.05em] sm:tracking-[0.2em] normal-case leading-snug drop-shadow-sm select-all mb-4 px-4 w-full break-all">
            #SharanWedsAnnapurna
          </h2>

          <div className="flex gap-1.5 text-gold-dark mb-4">
            <Heart className="w-3.5 h-3.5 fill-gold-dark" />
            <Heart className="w-3.5 h-3.5 fill-gold-dark" />
          </div>

          <p className="font-serif text-crimson-dark text-base sm:text-lg italic leading-relaxed max-w-xs sm:max-w-md">
            "With love and blessings from both families"
          </p>

          <p 
            onClick={handleSecretClick}
            className="font-mono text-[9px] text-gold-deep tracking-[0.25em] mt-16 uppercase cursor-pointer select-none"
            title="Double tap to open Admin panel"
          >
            Designed for Sharanraj &amp; Annapurna • 2026
          </p>
        </footer>

        </div> {/* Close sheet insert */}
      </div>
    </div>
  );
}
