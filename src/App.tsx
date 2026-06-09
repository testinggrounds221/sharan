import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppPhase } from './types';
import EnvelopeView from './components/EnvelopeView';
import CoverView from './components/CoverView';
import MainInviteView from './components/MainInviteView';
import AdminDashboard from './components/AdminDashboard';
import ImmersiveSideRails from './components/ImmersiveSideRails';

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('envelope');

  // Check URL routes for admin panel access on mount and change
  useEffect(() => {
    const handleRouteCheck = () => {
      const isPathAdmin = window.location.pathname === '/admin' || window.location.pathname.endsWith('/admin');
      const isHashAdmin = window.location.hash === '#admin';
      if (isPathAdmin || isHashAdmin) {
        setPhase('admin');
      }
    };

    handleRouteCheck();
    window.addEventListener('hashchange', handleRouteCheck, false);
    
    return () => {
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, []);

  // Update hash when phase changes to keep navigation in sync
  useEffect(() => {
    if (phase === 'admin') {
      if (window.location.hash !== '#admin') {
        window.location.hash = 'admin';
      }
    } else if (phase === 'main' && window.location.hash === '#admin') {
      window.location.hash = '';
    }
  }, [phase]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] select-none text-[#800020] font-sans antialiased overflow-x-hidden relative">
      {/* Immersive Side Rails and backdrop watermark */}
      <ImmersiveSideRails />

      <AnimatePresence mode="wait">
        
        {/* PHASE 1: DIGITAL ENVELOPE (LANDING) */}
        {phase === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.08,
              filter: "blur(4px)"
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full"
          >
            <EnvelopeView onOpen={() => setPhase('main')} />
          </motion.div>
        )}

        {/* PHASE 2: BANYAN FOREST COVER RETAIL */}
        {phase === 'cover' && (
          <motion.div
            key="cover"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0,
              filter: "blur(6px)"
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full min-h-screen relative"
          >
            <CoverView onRevealComplete={() => setPhase('main')} />
          </motion.div>
        )}

        {/* PHASE 3: SCROLLABLE LUXURY INVITATION (MAIN PORTAL) */}
        {phase === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative select-text"
          >
            <MainInviteView />
          </motion.div>
        )}

        {/* PHASE 4: SECURE ADMIN WORKSPACE */}
        {phase === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(2px)" }}
            transition={{ duration: 0.6 }}
            className="w-full relative select-text"
          >
            <AdminDashboard onGoBack={() => setPhase('main')} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
