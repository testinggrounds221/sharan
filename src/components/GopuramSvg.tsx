import React from 'react';
import { motion } from 'motion/react';

interface GopuramProps {
  className?: string;
  height?: number | string;
  color?: string;
}

export default function GopuramSvg({ className = '', height = '100%', color = '#B38D1B' }: GopuramProps) {
  return (
    <svg
      viewBox="0 0 240 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height, width: 'auto' }}
    >
      <defs>
        {/* Authentic Metallic Gold/Bronze Engraving Gradient to match invitation print */}
        <linearGradient id="gopuramGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEFA8" />
          <stop offset="25%" stopColor="#C5A033" />
          <stop offset="60%" stopColor="#8C6A1E" />
          <stop offset="100%" stopColor="#553F0F" />
        </linearGradient>

        {/* Vintage Shadow Gradient */}
        <linearGradient id="brickShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(40, 20, 5, 0.25)" />
        </linearGradient>
      </defs>

      {/* Traditional Dravidian Gopuram Tower Model */}
      <g stroke="url(#gopuramGold)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        
        {/* ============================================== */}
        {/* TIER 1: CROWN / SHIKHARA (The top curved dome) */}
        {/* ============================================== */}
        {/* 5 Sacred Kalasams (Brass Pots/Spires) */}
        <path d="M 120,38 L 120,20 M 120,20 Q 118,25 120,38 Z" strokeWidth="1.5" />
        <ellipse cx="120" cy="30" rx="3.5" ry="5" fill="url(#gopuramGold)" />
        
        <path d="M 100,42 L 100,24 M 100,24 Q 98,29 100,42 Z" strokeWidth="1.5" />
        <ellipse cx="100" cy="33" rx="3" ry="4.5" fill="url(#gopuramGold)" />

        <path d="M 140,42 L 140,24 M 140,24 Q 138,29 140,42 Z" strokeWidth="1.5" />
        <ellipse cx="140" cy="33" rx="3" ry="4.5" fill="url(#gopuramGold)" />

        <path d="M 80,48 L 80,30 M 80,30 Q 78,35 80,48 Z" strokeWidth="1.5" />
        <ellipse cx="80" cy="38" rx="2.5" ry="4" fill="url(#gopuramGold)" />

        <path d="M 160,48 L 160,30 M 160,30 Q 158,35 160,48 Z" strokeWidth="1.5" />
        <ellipse cx="160" cy="38" rx="2.5" ry="4" fill="url(#gopuramGold)" />

        {/* Main Vaulted Shikhara Crown */}
        <path d="M 68,70 C 68,52 85,46 120,46 C 155,46 172,52 172,70 L 68,70 Z" fill="none" strokeWidth="1.75" />
        <path d="M 75,58 Q 120,54 165,58" opacity="0.6" />
        {/* Decorative elements inside the crown (Kirti-Mukha center arch) */}
        <path d="M 110,70 A 10,10 0 0 1 130,70" fill="none" strokeWidth="1.5" />
        <path d="M 115,70 A 5,5 0 0 1 125,70" fill="url(#gopuramGold)" />
        <circle cx="120" cy="56" r="3.5" fill="url(#gopuramGold)" />
        
        {/* Crown Base Ledger */}
        <rect x="62" y="70" width="116" height="8" rx="2" fill="none" strokeWidth="1.5" />
        {/* Small hanging bells/details on crown ledger */}
        <path d="M 66,78 L 174,78" strokeDasharray="3 3" />

        {/* ============================================== */}
        {/* MIDDLE TIERS (9 Tapering Levels of Majesty) */}
        {/* ============================================== */}
        
        {/* Tier 9 (Top-most tower layer) */}
        <g transform="translate(0, 0)">
          <path d="M 70,78 L 73,115 L 167,115 L 170,78 Z" />
          <line x1="78" y1="78" x2="80" y2="115" strokeDasharray="2 2" />
          <line x1="162" y1="78" x2="160" y2="115" strokeDasharray="2 2" />
          <path d="M 94,86 H 146" strokeWidth="1" />
          <rect x="106" y="90" width="28" height="18" fill="none" strokeWidth="1" />
          <path d="M 106,108 A 4,4 0 0 1 134,108" strokeWidth="1" />
          {/* Side ornaments */}
          <circle cx="88" cy="96" r="2.5" />
          <circle cx="152" cy="96" r="2.5" />
          {/* Horizontal dividing strip */}
          <path d="M 66,115 H 174" strokeWidth="2" />
        </g>

        {/* Tier 8 */}
        <g transform="translate(0, 37)">
          <path d="M 64,115 L 68,155 L 172,155 L 176,115 Z" />
          <line x1="72" y1="115" x2="75" y2="155" strokeDasharray="2 2" />
          <line x1="168" y1="115" x2="165" y2="155" strokeDasharray="2 2" />
          <path d="M 88,124 H 152" strokeWidth="1" />
          <rect x="102" y="128" width="36" height="20" fill="none" strokeWidth="1" />
          <path d="M 102,148 A 5,5 0 0 1 138,148" strokeWidth="1.25" />
          <circle cx="82" cy="135" r="3" />
          <circle cx="158" cy="135" r="3" />
          <path d="M 60,155 H 180" strokeWidth="2.25" />
        </g>

        {/* Tier 7 */}
        <g transform="translate(0, 77)">
          <path d="M 58,155 L 63,200 L 177,200 L 182,155 Z" />
          <line x1="68" y1="155" x2="72" y2="200" strokeDasharray="3 3" />
          <line x1="172" y1="155" x2="168" y2="200" strokeDasharray="3 3" />
          <path d="M 84,166 H 156" />
          {/* Central miniature shrine architecture */}
          <rect x="98" y="170" width="44" height="22" fill="none" />
          <path d="M 94,170 Q 120,162 146,170" fill="none" strokeWidth="1" />
          <line x1="120" y1="170" x2="120" y2="192" strokeWidth="0.75" />
          <circle cx="76" cy="178" r="3.5" />
          <circle cx="164" cy="178" r="3.5" />
          <path d="M 54,200 H 186" strokeWidth="2.25" />
        </g>

        {/* Tier 6 */}
        <g transform="translate(0, 122)">
          <path d="M 52,200 L 58,250 L 182,250 L 188,200 Z" />
          <line x1="62" y1="200" x2="68" y2="250" strokeDasharray="3 3" />
          <line x1="178" y1="200" x2="172" y2="250" strokeDasharray="3 3" />
          <rect x="94" y="216" width="52" height="26" fill="none" />
          <path d="M 90,216 Q 120,208 150,216" />
          <circle cx="120" cy="229" r="4.5" />
          <circle cx="74" cy="225" r="4.5" />
          <circle cx="166" cy="225" r="4.5" />
          <path d="M 48,250 H 192" strokeWidth="2.5" />
        </g>

        {/* Tier 5 */}
        <g transform="translate(0, 172)">
          <path d="M 46,250 L 52,305 L 188,305 L 194,250 Z" />
          <line x1="56" y1="250" x2="62" y2="305" />
          <line x1="184" y1="250" x2="178" y2="305" />
          <rect x="90" y="268" width="60" height="28" fill="none" />
          <path d="M 86,268 Q 120,258 154,268" strokeWidth="1.5" />
          <line x1="105" y1="268" x2="105" y2="296" />
          <line x1="135" y1="268" x2="135" y2="296" />
          <circle cx="70" cy="278" r="5" />
          <circle cx="170" cy="278" r="5" />
          <path d="M 42,305 H 198" strokeWidth="2.5" />
        </g>

        {/* Tier 4 */}
        <g transform="translate(0, 227)">
          <path d="M 40,305 L 47,365 L 193,365 L 200,305 Z" />
          <line x1="52" y1="305" x2="58" y2="365" />
          <line x1="188" y1="305" x2="182" y2="365" />
          {/* Detailed Niches */}
          <rect x="86" y="325" width="68" height="32" fill="none" />
          <path d="M 82,325 Q 120,314 158,325" strokeWidth="1.5" />
          <path d="M 96,357 A 8,8 0 0 1 144,357" />
          <circle cx="120" cy="341" r="5" fill="none" strokeWidth="1.25" />
          <circle cx="66" cy="335" r="5" />
          <circle cx="174" cy="335" r="5" />
          <path d="M 36,365 H 204" strokeWidth="2.75" />
        </g>

        {/* Tier 3 */}
        <g transform="translate(0, 287)">
          <path d="M 34,365 L 42,430 L 198,430 L 206,365 Z" />
          <line x1="46" y1="365" x2="53" y2="430" />
          <line x1="194" y1="365" x2="187" y2="430" />
          <rect x="80" y="388" width="80" height="34" fill="none" strokeWidth="1.5" />
          <path d="M 76,388 Q 120,375 164,388" strokeWidth="1.75" />
          <line x1="102" y1="388" x2="102" y2="422" strokeWidth="1.25" />
          <line x1="138" y1="388" x2="138" y2="422" strokeWidth="1.25" />
          <circle cx="61" cy="398" r="5.5" />
          <circle cx="179" cy="398" r="5.5" />
          <path d="M 30,430 H 210" strokeWidth="2.75" />
        </g>

        {/* Tier 2 */}
        <g transform="translate(0, 352)">
          <path d="M 28,430 L 37,500 L 203,500 L 212,430 Z" />
          <line x1="41" y1="430" x2="49" y2="500" />
          <line x1="199" y1="430" x2="191" y2="500" />
          {/* Miniature structures inside Tier 2 */}
          <rect x="76" y="455" width="88" height="36" fill="none" strokeWidth="1.5" />
          <path d="M 72,455 Q 120,442 168,455" strokeWidth="2" />
          <path d="M 88,491 A 12,12 0 0 1 152,491" strokeWidth="1.5" />
          <circle cx="120" cy="473" r="6" strokeWidth="1.5" />
          <circle cx="56" cy="465" r="5.5" />
          <circle cx="184" cy="465" r="5.5" />
          <path d="M 24,500 H 216" strokeWidth="3" />
        </g>

        {/* Tier 1 (Main Base level transition) */}
        <g transform="translate(0, 422)">
          <path d="M 22,500 L 32,580 L 208,580 L 218,500 Z" />
          <line x1="35" y1="500" x2="44" y2="580" strokeWidth="1.5" />
          <line x1="205" y1="500" x2="196" y2="580" strokeWidth="1.5" />
          <rect x="72" y="525" width="96" height="46" fill="none" strokeWidth="1.5" />
          <path d="M 66,525 Q 120,511 174,525" strokeWidth="2.25" />
          <circle cx="50" cy="540" r="6" />
          <circle cx="190" cy="540" r="6" />
          <path d="M 18,580 H 222" strokeWidth="3.5" />
        </g>

        {/* ============================================== */}
        {/* BASE PLATFORM & ENTRANCE PORTAL (Prakara/Gate) */}
        {/* ============================================== */}
        <g transform="translate(0, 502)">
          {/* Main Giant Stone Base Foundation */}
          <rect x="22" y="580" width="196" height="118" rx="1.5" fill="none" strokeWidth="3" />
          
          {/* Left and Right Base Pillars (Niches for deities) */}
          <rect x="36" y="590" width="30" height="96" fill="none" strokeWidth="2" />
          <path d="M 36,605 H 66 L 51,595 Z" fill="none" strokeWidth="1.5" />
          <circle cx="51" cy="635" r="6" strokeWidth="1.25" />

          <rect x="174" y="590" width="30" height="96" fill="none" strokeWidth="2" />
          <path d="M 174,605 H 204 L 189,595 Z" fill="none" strokeWidth="1.5" />
          <circle cx="189" cy="635" r="6" strokeWidth="1.25" />

          {/* Substantial entrance archway (Main Gate / Maha Dwara) */}
          <path d="M 82,698 L 82,610 C 82,600 95,590 120,590 C 145,590 158,600 158,610 L 158,698" strokeWidth="2.5" />
          
          {/* Beautiful interior temple door representing the sanctum */}
          <rect x="94" y="622" width="52" height="76" rx="1" strokeDasharray="3 3" strokeWidth="1.5" />
          {/* Double doors */}
          <line x1="120" y1="622" x2="120" y2="698" strokeWidth="2" />
          {/* Golden locks on the temple gate */}
          <circle cx="114" cy="660" r="2.5" fill="url(#gopuramGold)" />
          <circle cx="126" cy="660" r="2.5" fill="url(#gopuramGold)" />

          {/* Glimpse of divine interior lamp glow (diya) outline */}
          <path d="M 114,642 Q 120,634 126,642 Z" fill="url(#gopuramGold)" opacity="0.6" />
          
          {/* Step carvings (Adhisthana) leading inside */}
          <line x1="74" y1="684" x2="166" y2="684" strokeWidth="1.5" />
          <line x1="66" y1="691" x2="174" y2="691" strokeWidth="1.5" />
          <line x1="14" y1="698" x2="226" y2="698" strokeWidth="3" />
        </g>

      </g>
    </svg>
  );
}
