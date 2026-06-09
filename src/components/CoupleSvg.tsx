import React from 'react';
import { motion } from 'motion/react';

interface CoupleProps {
  className?: string;
  size?: number;
}

export default function CoupleSvg({ className = '', size = 300 }: CoupleProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ maxWidth: size, width: '100%', height: 'auto' }}>
      <svg
        viewBox="0 0 450 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        <defs>
          {/* Authentic Metallic Gold Gradient */}
          <linearGradient id="illustrationGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFECA8" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#B38D1B" />
            <stop offset="100%" stopColor="#876503" />
          </linearGradient>

          {/* Deep Royal Maroon Gradient */}
          <linearGradient id="maroonSaree" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A0010" />
            <stop offset="50%" stopColor="#800020" />
            <stop offset="100%" stopColor="#9C1A3A" />
          </linearGradient>

          {/* Warm Ivory/Cream Sherwani Gradient */}
          <linearGradient id="creamSherwani" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FAF5EE" />
            <stop offset="100%" stopColor="#ECE3D4" />
          </linearGradient>

          {/* Skin tones */}
          <linearGradient id="brideSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD5B5" />
            <stop offset="100%" stopColor="#ECAE84" />
          </linearGradient>
          <linearGradient id="groomSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DE9E74" />
            <stop offset="100%" stopColor="#C28258" />
          </linearGradient>
        </defs>

        {/* Elegant Archway Border (Traditional Temple Frame) */}
        <path
          d="M 35,480 C 35,160 85,50 225,50 C 365,50 415,160 415,480"
          stroke="url(#illustrationGold)"
          strokeWidth="2"
          strokeDasharray="3 5"
        />
        <path
          d="M 45,480 C 45,175 95,65 225,65 C 355,65 405,175 405,480"
          stroke="url(#illustrationGold)"
          strokeWidth="1"
        />

        {/* ======================================================== */}
        {/* GROOM'S RIGHT ARM (Draped behind the Bride) */}
        {/* ======================================================== */}
        <path
          d="M 280,195 C 240,195 180,210 160,225 C 150,232 150,242 165,242 C 180,242 220,230 260,215 Z"
          fill="url(#creamSherwani)"
          stroke="url(#illustrationGold)"
          strokeWidth="1"
        />
        {/* Groom's Cuff & Golden Border */}
        <path d="M 160,225 L 163,240" stroke="url(#illustrationGold)" strokeWidth="2.5" />

        {/* ======================================================== */}
        {/* BRIDE - ANNAPURNA (Left) */}
        {/* ======================================================== */}
        <g id="BrideLeft">
          {/* Hair Bun at Back */}
          <circle cx="178" cy="142" r="18" fill="#1C1816" />
          {/* Hair Brooch (Suryan/Chandran Gold pin) */}
          <circle cx="188" cy="138" r="6" stroke="url(#illustrationGold)" strokeWidth="1.5" fill="#800020" />

          {/* Bride Shoulders & Torso */}
          <path
            d="M 115,228 C 130,222 170,222 185,228 C 215,238 235,285 235,350 L 225,480 L 110,480 L 115,228 Z"
            fill="url(#maroonSaree)"
            stroke="url(#illustrationGold)"
            strokeWidth="1.25"
          />

          {/* Neck */}
          <path d="M 160,192 L 180,192 L 176,218 L 164,218 Z" fill="url(#brideSkin)" />

          {/* Head & Face */}
          <path
            d="M 148,155 C 148,138 158,128 172,128 C 186,128 196,138 196,155 C 196,172 186,182 172,182 C 158,182 148,172 148,155 Z"
            fill="url(#brideSkin)"
          />

          {/* Hair Front (Middle parted, tucked back) */}
          <path
            d="M 148,150 C 152,142 162,132 172,134 C 172,134 172,134 172,134 C 172,134 182,142 196,150 C 192,135 184,128 172,128 C 160,128 152,135 148,150 Z"
            fill="#1C1816"
          />

          {/* Eyes & Eyebrows */}
          <path d="M 158,148 Q 163,146 166,149" stroke="#1C1816" strokeWidth="1.75" fill="none" />
          <path d="M 178,148 Q 181,146 186,149" stroke="#1C1816" strokeWidth="1.75" fill="none" />
          <circle cx="162" cy="151.5" r="1.5" fill="#1C1816" />
          <circle cx="182" cy="151.5" r="1.5" fill="#1C1816" />

          {/* Nose */}
          <path d="M 172,151 L 172,157 L 170,160" stroke="#DF9E76" strokeWidth="1.25" fill="none" strokeLinecap="round" />
          {/* Nose Pin (Kook/Diamond) */}
          <circle cx="167.5" cy="159" r="1" fill="#FFF" stroke="url(#illustrationGold)" strokeWidth="0.5" />

          {/* Red Bindi */}
          <circle cx="172" cy="143" r="2.5" fill="#D32F2F" />

          {/* Radiant Cheerful Smiling Mouth */}
          <path d="M 162,165 Q 172,175 182,165" stroke="#800020" strokeWidth="1.5" fill="none" />
          {/* Smile teeth line */}
          <path d="M 163,166 Q 172,171 181,166" fill="#FFFFFF" />

          {/* Jewelry: Maang Tikka */}
          <path d="M 172,126 L 172,135" stroke="url(#illustrationGold)" strokeWidth="1.5" />
          <circle cx="172" cy="138" r="3" fill="#D32F2F" stroke="url(#illustrationGold)" strokeWidth="0.75" />

          {/* Gold Jhumka Earrings */}
          <g transform="translate(145, 158)">
            <circle cx="0" cy="0" r="2" fill="url(#illustrationGold)" />
            <path d="M -2,2 Q 0,8 2,2" stroke="url(#illustrationGold)" strokeWidth="1.5" fill="none" />
            <path d="M -4,6 L 4,6 L 2,12 L -2,12 Z" fill="url(#illustrationGold)" />
          </g>
          <g transform="translate(199, 158)">
            <circle cx="0" cy="0" r="2" fill="url(#illustrationGold)" />
            <path d="M -2,2 Q 0,8 2,2" stroke="url(#illustrationGold)" strokeWidth="1.5" fill="none" />
            <path d="M -4,6 L 4,6 L 2,12 L -2,12 Z" fill="url(#illustrationGold)" />
          </g>

          {/* Multi-layered Gold Bridal Necklaces */}
          <path d="M 154,198 C 160,206 174,206 182,198" stroke="url(#illustrationGold)" strokeWidth="3" fill="none" />
          <path d="M 152,204 C 160,214 176,214 184,204" stroke="url(#illustrationGold)" strokeWidth="2.25" fill="none" />
          {/* Long Haar Necklace with medallion */}
          <path d="M 148,212 C 158,228 178,228 188,212" stroke="url(#illustrationGold)" strokeWidth="1.5" fill="none" />
          <rect x="169.5" y="222" width="5" height="5" transform="rotate(45, 172, 224.5)" fill="#CCD5B5" stroke="url(#illustrationGold)" strokeWidth="1" />

          {/* Saree drape gold pallu border crossing body */}
          <path
            d="M 115,310 C 130,224 165,225 185,228 C 185,228 160,330 115,380 Z"
            fill="url(#illustrationGold)"
            opacity="0.95"
          />
          {/* Saree embroidery highlights */}
          <circle cx="125" cy="270" r="2" fill="url(#illustrationGold)" />
          <circle cx="140" cy="290" r="2" fill="url(#illustrationGold)" />
          <circle cx="145" cy="350" r="2.5" fill="url(#illustrationGold)" />
          <circle cx="205" cy="290" r="1.5" fill="url(#illustrationGold)" />
          <circle cx="215" cy="330" r="2" fill="url(#illustrationGold)" />

          {/* Gold Waist Belt (Vaddanam / Kamarbandh) */}
          <path
            d="M 118,348 Q 165,354 228,348"
            stroke="url(#illustrationGold)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 118,348 Q 165,354 228,348"
            stroke="#800020"
            strokeWidth="0.75"
            strokeDasharray="2 2"
            fill="none"
          />

          {/* Traditional Gold Bangles (Kangan) */}
          <g transform="translate(112, 310) rotate(-15)">
            <rect x="0" y="0" width="16" height="3" fill="url(#illustrationGold)" />
            <rect x="0" y="4" width="16" height="1.5" fill="url(#illustrationGold)" />
            <rect x="0" y="7" width="16" height="3" fill="url(#illustrationGold)" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* GROOM - SHARANRAJ (Right - Taller) */}
        {/* ======================================================== */}
        <g id="GroomRight">
          {/* Groom Shoulders & Torso */}
          <path
            d="M 235,220 C 248,198 280,186 300,186 C 330,186 365,210 375,225 C 390,240 400,285 400,340 L 390,480 L 230,480 L 235,220 Z"
            fill="url(#creamSherwani)"
            stroke="url(#illustrationGold)"
            strokeWidth="1.25"
          />

          {/* Neck */}
          <path d="M 282,154 L 302,154 L 300,182 L 284,182 Z" fill="url(#groomSkin)" />

          {/* Head & Face */}
          <path
            d="M 270,118 C 270,105 278,94 292,94 C 306,94 314,105 314,118 C 314,134 306,145 292,145 C 278,145 270,134 270,118 Z"
            fill="url(#groomSkin)"
          />

          {/* Hair Groom (Trimmed, stylish) */}
          <path
            d="M 270,114 C 270,102 280,88 294,88 C 306,88 314,98 314,112 C 308,106 300,104 292,104 C 282,104 274,108 270,114 Z"
            fill="#1E1A17"
          />

          {/* Trimmed Groom Beard and Mustache */}
          <path
            d="M 270,120 C 270,136 278,147 292,147 C 306,147 314,136 314,120 C 312,128 304,138 292,138 C 280,138 272,128 270,120 Z"
            fill="#231F1D"
            opacity="0.9"
          />
          <path
            d="M 280,128 C 285,124 299,124 304,128"
            stroke="#1E1A17"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Eyes & Eyebrows */}
          <path d="M 278,110 Q 282,108 286,111" stroke="#1E1A17" strokeWidth="2" fill="none" />
          <path d="M 298,110 Q 302,108 306,111" stroke="#1E1A17" strokeWidth="2" fill="none" />
          <circle cx="282" cy="114" r="1.5" fill="#1E1A17" />
          <circle cx="302" cy="114" r="1.5" fill="#1E1A17" />

          {/* Nose */}
          <path d="M 292,114 L 292,122 L 290,124" stroke="#B87C54" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Cheerful Masculine Smile */}
          <path d="M 282,129 Q 292,137 302,129" stroke="#800020" strokeWidth="1.5" fill="none" />

          {/* Mandapam Tilak on Forehead */}
          <line x1="292" y1="99" x2="292" y2="105" stroke="#D32F2F" strokeWidth="1.5" />

          {/* Sherwani Royal High Collar */}
          <path
            d="M 278,181 C 280,192 288,195 292,195 C 296,195 304,192 306,181"
            stroke="url(#illustrationGold)"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 278,181 C 280,192 288,195 292,195 C 296,195 304,192 306,181"
            stroke="#800020"
            strokeWidth="1.25"
            fill="none"
          />

          {/* Central Button Line */}
          <line
            x1="292"
            y1="195"
            x2="292"
            y2="480"
            stroke="url(#illustrationGold)"
            strokeWidth="1.5"
          />
          {/* Elegant gold buttons */}
          <circle cx="292" cy="216" r="3" fill="url(#illustrationGold)" stroke="#800020" strokeWidth="0.5" />
          <circle cx="292" cy="242" r="3" fill="url(#illustrationGold)" stroke="#800020" strokeWidth="0.5" />
          <circle cx="292" cy="268" r="3" fill="url(#illustrationGold)" stroke="#800020" strokeWidth="0.5" />
          <circle cx="292" cy="294" r="3" fill="url(#illustrationGold)" stroke="#800020" strokeWidth="0.5" />
          <circle cx="292" cy="320" r="3" fill="url(#illustrationGold)" stroke="#800020" strokeWidth="0.5" />

          {/* Royal Maroon Pocket Square & Gold Brooch */}
          <path d="M 330,225 L 345,225 L 338,218 Z" fill="#800020" />
          <line x1="328" y1="227" x2="347" y2="227" stroke="url(#illustrationGold)" strokeWidth="1.75" />
          {/* Pendant Chain Brooch */}
          <path d="M 331,229 Q 338,238 344,229" stroke="url(#illustrationGold)" strokeWidth="0.5" fill="none" />
        </g>

        {/* ======================================================== */}
        {/* AUSPICIOUS WEDDING GARLANDS (Draped on both shoulders) */}
        {/* ======================================================== */}
        <g id="TempleGarlands" opacity="0.9">
          {/* Bride Garland (Left) */}
          <path
            d="M 132,228 C 124,270 135,325 165,325 C 190,325 195,270 188,228"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="4 6"
          />
          <path
            d="M 132,228 C 124,270 135,325 165,325 C 190,325 195,270 188,228"
            stroke="#FFA500"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 12"
          />

          {/* Groom Garland (Right) */}
          <path
            d="M 255,190 C 245,245 260,305 292,305 C 320,305 325,245 315,190"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="4 6"
          />
          <path
            d="M 255,190 C 245,245 260,305 292,305 C 320,305 325,245 315,190"
            stroke="#FFA500"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 12"
          />
        </g>

        {/* Small gold sparkle stars surrounding the couple */}
        <path d="M 90,140 L 92,144 L 96,145 L 92,146 L 90,150 L 88,146 L 84,145 L 88,144 Z" fill="url(#illustrationGold)" opacity="0.75" />
        <path d="M 355,110 L 356.5,114.5 L 361,115.5 L 356.5,116.5 L 355,121 L 353.5,116.5 L 349,115.5 L 353.5,114.5 Z" fill="url(#illustrationGold)" opacity="0.75" />
        <path d="M 345,330 L 346.5,333.5 L 350,334.5 L 346.5,335.5 L 345,339 L 343.5,335.5 L 340,334.5 L 343.5,333.5 Z" fill="url(#illustrationGold)" opacity="0.6" />
        <path d="M 85,380 L 86.5,383.5 L 90,384.5 L 86.5,385.5 L 85,389 L 83.5,385.5 L 80,384.5 L 83.5,383.5 Z" fill="url(#illustrationGold)" opacity="0.6" />
      </svg>
    </div>
  );
}
