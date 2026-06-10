import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  orderBy, 
  query 
} from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { 
  db, 
  auth, 
  handleFirestoreError, 
  OperationType 
} from '../firebase';
import { ALLOWED_ADMIN_EMAILS, MASTER_KEYS } from '../config';
import { 
  Lock, 
  ShieldAlert, 
  FileSpreadsheet, 
  Trash2, 
  LogOut, 
  Search, 
  Filter, 
  Users, 
  Heart, 
  Sparkle,
  Home,
  Check,
  X
} from 'lucide-react';

// MASTER_KEYS is imported from /config.ts

interface RSVPRecord {
  id: string;
  guestName: string;
  attendeesCount: number;
  attendance: 'wedding' | 'reception' | 'both' | 'declining' | '';
  createdAt: any;
}

export default function AdminDashboard({ onGoBack }: { onGoBack: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [permissionError, setPermissionError] = useState<string>('');

  useEffect(() => {
    // Monitor auth changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && ALLOWED_ADMIN_EMAILS.includes(user.email || '')) {
        setIsAuthenticated(true);
      }
    });

    // Check if family has already entered valid master key in session
    const isFamilyAuthed = sessionStorage.getItem('admin_family_auth') === 'true';
    if (isFamilyAuthed) {
      setIsAuthenticated(true);
    }

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRSVPs();
    }
  }, [isAuthenticated]);

  const fetchRSVPs = async () => {
    setLoading(true);
    setPermissionError('');
    try {
      const q = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data: RSVPRecord[] = [];
      snapshot.forEach((docSnap) => {
        const item = docSnap.data();
        data.push({
          id: docSnap.id,
          guestName: item.guestName || '',
          attendeesCount: item.attendeesCount || 1,
          attendance: item.attendance || '',
          createdAt: item.createdAt,
        });
      });
      setRsvps(data);
    } catch (err: any) {
      console.error("Firestore read error:", err);
      // If Firestore denies but family is authenticated client-side, let's show elegant error
      const primaryAdminEmail = ALLOWED_ADMIN_EMAILS[0] || 'the admin';
      setPermissionError(
        !auth.currentUser
          ? `As a security measure to prevent public scraping, direct database reading is restricted to verified administrators. Since you are logged in using the offline Family Master Key, please click 'Log Out' and sign in using 'Authorize with Google' as ${primaryAdminEmail} to view the live Firestore list on this device.`
          : `Firestore Access Error: ${err.message || 'Permission Denied'}.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (MASTER_KEYS.includes(passwordInput.trim())) {
      sessionStorage.setItem('admin_family_auth', 'true');
      setIsAuthenticated(true);
    } else {
      setAuthError('Invalid Master Key. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email && ALLOWED_ADMIN_EMAILS.includes(result.user.email)) {
        setIsAuthenticated(true);
      } else {
        setAuthError('Access denied. Only registered accounts can access Firestore directly.');
        await signOut(auth);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Failed to authenticate.');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    sessionStorage.removeItem('admin_family_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
    setCurrentUser(null);
  };

  const handleDeleteRSVP = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove the RSVP for "${name}"?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'rsvps', id));
      setRsvps(rsvps.filter(r => r.id !== id));
    } catch (err) {
      alert("Failed to delete record: insufficient permissions.");
      handleFirestoreError(err, OperationType.DELETE, `rsvps/${id}`);
    }
  };

  const handleExportCSV = () => {
    if (rsvps.length === 0) return;

    // Build headers
    const headers = ['S.No', 'Guest Name', 'Attendees', 'Attendance Type', 'Recorded At'];
    
    // Build rows
    const rows = filteredRSVPs.map((r, idx) => {
      const dateText = r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString() : 'N/A';
      const statusText = 
        r.attendance === 'both' ? 'Reception & Muhurtham' :
        r.attendance === 'wedding' ? 'Wedding Only' :
        r.attendance === 'reception' ? 'Reception Only' :
        'Declining';
      return [
        idx + 1,
        `"${r.guestName.replace(/"/g, '""')}"`,
        r.attendeesCount,
        `"${statusText}"`,
        `"${dateText}"`
      ];
    });

    // Combine
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RSVP_Responses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and Search calculations
  const filteredRSVPs = rsvps.filter((r) => {
    const matchesSearch = r.guestName.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'both') return matchesSearch && r.attendance === 'both';
    if (filterType === 'wedding') return matchesSearch && r.attendance === 'wedding';
    if (filterType === 'reception') return matchesSearch && r.attendance === 'reception';
    if (filterType === 'declining') return matchesSearch && r.attendance === 'declining';
    return matchesSearch;
  });

  // KPI Statistics
  const totalGuests = rsvps.length;
  const attendingCount = rsvps.filter(r => r.attendance !== 'declining' && r.attendance !== '').length;
  const decliningCount = rsvps.filter(r => r.attendance === 'declining').length;
  const totalHeadcount = rsvps
    .filter(r => r.attendance !== 'declining' && r.attendance !== '')
    .reduce((sum, r) => sum + r.attendeesCount, 0);

  const weddingAttendees = rsvps
    .filter(r => r.attendance === 'wedding' || r.attendance === 'both')
    .reduce((sum, r) => sum + r.attendeesCount, 0);

  const receptionAttendees = rsvps
    .filter(r => r.attendance === 'reception' || r.attendance === 'both')
    .reduce((sum, r) => sum + r.attendeesCount, 0);

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 sm:py-12 px-4 relative overflow-hidden">
      {/* Mandorla background elements for Royal Aesthetic consistency */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-linear-gradient-to-br from-[#800020]/5 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-linear-gradient-to-tl from-[#D4AF37]/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation back and header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 pb-4 border-b border-gold/20">
          <button 
            onClick={onGoBack}
            className="flex items-center gap-2 font-cinzel text-xs text-gold hover:text-gold-light tracking-widest uppercase transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Invitation</span>
          </button>
          
          <div className="text-center sm:text-right">
            <h1 className="font-cinzel text-[#800020] text-xl sm:text-2xl font-bold tracking-widest uppercase">
              Royal Wedding Admin
            </h1>
            <p className="font-sans text-[10px] text-gold tracking-widest uppercase mt-0.5">
              RSVP Guest Registrar
            </p>
          </div>
        </div>

        {!isAuthenticated ? (
          /* LOGIN PANEL WITH ROYAL ARCHITECTURE */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mt-12 bg-white shadow-2xl border-[8px] border-[#D4AF37] p-8 rounded-sm relative"
          >
            <div className="absolute -left-2 -top-2 w-5 h-5 border-t-4 border-l-4 border-[#800020]"></div>
            <div className="absolute -right-2 -top-2 w-5 h-5 border-t-4 border-r-4 border-[#800020]"></div>
            <div className="absolute -left-2 -bottom-2 w-5 h-5 border-b-4 border-l-4 border-[#800020]"></div>
            <div className="absolute -right-2 -bottom-2 w-5 h-5 border-b-4 border-r-4 border-[#800020]"></div>

            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#800020] flex items-center justify-center text-white border-2 border-gold shadow-lg mb-4">
                <Lock className="w-6 h-6 text-[#FFFDF9]" />
              </div>
              
              <h2 className="font-cinzel text-lg text-[#800020] font-bold tracking-widest uppercase mb-1">
                Access Authorization
              </h2>
              <p className="font-sans text-xs text-crimson/70 mb-6">
                Please login or enter the family master key.
              </p>

              {authError && (
                <div className="w-full flex items-center gap-2 bg-crimson/5 border border-crimson/20 p-3 rounded-lg text-crimson text-xs mb-4 text-left font-sans">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Master Key Password Form */}
              <form onSubmit={handlePasswordSubmit} className="w-full space-y-4">
                <div className="space-y-1 text-left">
                  <label htmlFor="masterKey" className="font-cinzel text-[10px] text-gold font-bold tracking-widest block uppercase">
                    Family Master Key
                  </label>
                  <input
                    id="masterKey"
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter family access key"
                    className="w-full px-4 py-2.5 rounded border border-gold/25 bg-cream/30 text-[#800020] focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-[#800020] border border-gold text-gold font-cinzel text-xs font-semibold tracking-widest uppercase hover:bg-[#901a35] transition-colors shadow-md"
                >
                  Verify Master Key
                </button>
              </form>

              <div className="w-full flex items-center justify-between my-6">
                <div className="h-[0.5px] w-full bg-gold/20" />
                <span className="font-mono text-[9px] text-gold/60 mx-4 uppercase tracking-widest">OR</span>
                <div className="h-[0.5px] w-full bg-gold/20" />
              </div>

              {/* Secure Google Login */}
              <button
                onClick={handleGoogleLogin}
                className="w-full py-2.5 rounded bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-sans text-xs font-medium flex items-center justify-center gap-3 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Authorize with Google</span>
              </button>

            </div>
          </motion.div>
        ) : (
          /* FULLY REALIZED MAIN STATS & DATA CONTAINER */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Logged in Context State / Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-[#800020]/5 border border-gold/15 px-4 py-2.5 text-xs text-crimson-dark/95 gap-3 rounded-md">
              <div className="flex items-center gap-2">
                <Sparkle className="w-3.5 h-3.5 text-gold animate-spin-slow" />
                {currentUser ? (
                  <span>Direct Auth: <strong className="text-crimson font-serif underline">{currentUser.email}</strong> (Full Cloud Admin Privileges)</span>
                ) : (
                  <span>Verified via: <span className="font-semibold text-[#800020] uppercase font-mono text-[10px]">Family Master Key</span></span>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 text-gold-deep hover:text-gold uppercase font-cinzel text-[10px] tracking-wider transition-colors underline focus:outline-none"
              >
                <LogOut className="w-3 h-3" />
                <span>Log Out</span>
              </button>
            </div>

            {permissionError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md shadow-sm"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ShieldAlert className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-amber-800 font-cinzel tracking-wider uppercase">Live Database Synchronization Status</h3>
                    <p className="mt-1.5 text-xs text-amber-700 font-sans leading-relaxed font-light">
                      {permissionError}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* KPI STATS CARDS: BENTO GRID STYLE */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* CARD 1: TOTAL RSVPS */}
              <div className="bg-white border-2 border-gold/20 p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-2 right-2 text-gold/30"><FileSpreadsheet className="w-5 h-5" /></div>
                <span className="font-cinzel text-[9px] text-gold tracking-widest block uppercase font-bold">Total RSVP Responses</span>
                <p className="text-3xl font-bold font-serif text-[#800020] mt-2">{totalGuests}</p>
                <span className="text-[10px] text-gray-500 font-sans mt-1">Response envelopes received</span>
              </div>

              {/* CARD 2: HEADCOUNT */}
              <div className="bg-white border-2 border-gold/20 p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-2 right-2 text-gold/30"><Users className="w-5 h-5" /></div>
                <span className="font-cinzel text-[9px] text-gold tracking-widest block uppercase font-bold font-semibold">Total Guest Headcount</span>
                <p className="text-3xl font-bold font-serif text-[#800020] mt-2">{totalHeadcount}</p>
                <span className="text-[10px] text-gray-500 font-sans mt-1">{attendingCount} families attending</span>
              </div>

              {/* CARD 3: WEDDING ATTENDEES */}
              <div className="bg-[#800020]/5 border-2 border-gold/25 p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <span className="font-cinzel text-[9px] text-gold tracking-widest block uppercase font-bold">Wedding Ceremony</span>
                <p className="text-3xl font-bold font-serif text-[#800020] mt-2">{weddingAttendees}</p>
                <span className="text-[10px] text-crimson/70 font-sans mt-1">Muhurtham Headcount list</span>
              </div>

              {/* CARD 4: RECEPTION ATTENDEES */}
              <div className="bg-[#800020]/5 border-2 border-gold/25 p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <span className="font-cinzel text-[9px] text-gold tracking-widest block uppercase font-bold">Reception Celebration</span>
                <p className="text-3xl font-bold font-serif text-[#800020] mt-2">{receptionAttendees}</p>
                <span className="text-[10px] text-crimson/70 font-sans mt-1">Inaugural Dinner seats</span>
              </div>

            </div>

            {/* INTERACTIVE CONTROLS BAR: SEARCH / FILTER / DOWNLOAD */}
            <div className="bg-white border-2 border-gold/15 p-4 shadow-md flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              
              {/* SEARCH BOX */}
              <div className="relative flex-1">
                <span className="absolute left-3 top-[50%] -translate-y-[50%] text-gold">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search guest Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded border border-gray-200 bg-cream/10 text-crimson focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* FILTERS */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-cinzel text-gold font-bold tracking-wider hidden sm:inline uppercase">Filter:</span>
                
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 text-xs font-sans transition-colors cursor-pointer ${filterType === 'all' ? 'bg-[#800020] text-gold border border-gold font-semibold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                  All ({totalGuests})
                </button>
                
                <button
                  onClick={() => setFilterType('both')}
                  className={`px-3 py-1.5 text-xs font-sans transition-colors cursor-pointer ${filterType === 'both' ? 'bg-[#800020] text-gold border border-gold font-semibold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                  Both Functions
                </button>

                <button
                  onClick={() => setFilterType('wedding')}
                  className={`px-3 py-1.5 text-xs font-sans transition-colors cursor-pointer ${filterType === 'wedding' ? 'bg-[#800020] text-gold border border-gold font-semibold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                  Wedding Only
                </button>

                <button
                  onClick={() => setFilterType('reception')}
                  className={`px-3 py-1.5 text-xs font-sans transition-colors cursor-pointer ${filterType === 'reception' ? 'bg-[#800020] text-gold border border-gold font-semibold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                  Reception Only
                </button>

                <button
                  onClick={() => setFilterType('declining')}
                  className={`px-3 py-1.5 text-xs font-sans transition-colors cursor-pointer ${filterType === 'declining' ? 'bg-[#800020] text-gold border border-gold font-semibold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                  Declined ({decliningCount})
                </button>
              </div>

              {/* DOWNLOAD EXCEL BUTTON */}
              <button
                onClick={handleExportCSV}
                disabled={filteredRSVPs.length === 0}
                className="px-4 py-2 bg-emerald-600 border border-emerald-500 hover:bg-emerald-700 text-white font-sans text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all transition-colors active:scale-95 disabled:opacity-40 select-none cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export to CSV</span>
              </button>

            </div>

            {/* RESULTS COUNTER */}
            <p className="text-[11px] font-mono text-gold-deep tracking-wider uppercase select-none">
              Showing {filteredRSVPs.length} matching guest lists
            </p>

            {/* MAIN DATA TABLE VIEW */}
            <div className="bg-white border-2 border-gold/20 shadow-xl overflow-hidden rounded-sm">
              {loading ? (
                <div className="p-16 text-center text-crimson font-cinzel text-sm animate-pulse tracking-widest">
                  Acquiring responses from Firestore...
                </div>
              ) : filteredRSVPs.length === 0 ? (
                <div className="p-16 text-center text-crimson/50 font-serif text-sm">
                  No guest responses found matching this criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50 font-cinzel text-[10px] text-gold font-bold tracking-widest uppercase">
                      <tr>
                        <th className="px-6 py-4 text-left select-none">S.No</th>
                        <th className="px-6 py-4 text-left">Guest Name</th>
                        <th className="px-6 py-4 text-center">Attendees</th>
                        <th className="px-6 py-4 text-left">Attendance Option</th>
                        <th className="px-6 py-4 text-left">Date Submitted</th>
                        <th className="px-4 py-4 text-center select-none">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-serif text-sm text-crimson-dark/95">
                      {filteredRSVPs.map((row, index) => {
                        const dateText = row.createdAt?.toDate 
                          ? row.createdAt.toDate().toLocaleString('en-IN', {
                              day: '2-digit', 
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) 
                          : 'Just Now';
                        
                        return (
                          <motion.tr 
                            key={row.id}
                            className="hover:bg-cream/15 transition-colors"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <td className="px-6 py-3.5 font-mono text-[11px] text-gray-400 select-none">{index + 1}</td>
                            <td className="px-6 py-3.5 font-semibold text-base">{row.guestName}</td>
                            <td className="px-6 py-3.5 text-center font-mono text-base">{row.attendeesCount}</td>
                            <td className="px-6 py-3.5 text-xs font-sans text-left">
                              {row.attendance === 'both' && (
                                <span className="inline-flex px-2 py-1 rounded bg-[#800020]/10 text-[#800020] font-semibold border border-[#800020]/20">
                                  Reception &amp; Muhurtham
                                </span>
                              )}
                              {row.attendance === 'wedding' && (
                                <span className="inline-flex px-2 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                                  Wedding Only
                                </span>
                              )}
                              {row.attendance === 'reception' && (
                                <span className="inline-flex px-2 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                                  Reception Only
                                </span>
                              )}
                              {row.attendance === 'declining' && (
                                <span className="inline-flex px-2 py-1 rounded bg-rose-50 text-rose-700 border border-rose-100">
                                  Regretfully Declining
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-3.5 text-xs font-mono text-gray-500">{dateText}</td>
                            <td className="px-4 py-3.5 text-center select-none">
                              <button
                                onClick={() => handleDeleteRSVP(row.id, row.guestName)}
                                className="p-1 px-2 text-rose-600 hover:text-white rounded border border-transparent hover:border-rose-100 hover:bg-rose-500 transition-all active:scale-90"
                                title="Delete RSVP"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
