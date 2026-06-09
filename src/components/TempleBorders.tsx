import React from 'react';

export default function TempleBorders() {
  return (
    <>
      {/* 1. TOP TEMPLE BORDER: Traditional Thoranam (Mango Leaf & Brass Bell Garland Frieze) */}
      <svg 
        className="absolute top-0 left-0 w-full h-8 pointer-events-none opacity-[0.85] z-10" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="templeTopPattern" width="40" height="32" patternUnits="userSpaceOnUse">
            {/* Elegant classic hanging arch */}
            <path d="M 0,0 Q 20,24 40,0" fill="none" stroke="#D4AF37" strokeWidth="1.25" />
            <path d="M 3,0 Q 20,20 37,0" fill="none" stroke="#D4AF37" strokeWidth="0.75" opacity="0.6" />
            
            {/* Hanging sacred bead & brass bell silhouette */}
            <line x1="20" y1="0" x2="20" y2="15" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="20" cy="18" r="3" fill="#800020" />
            <path d="M 17,21 L 23,21" stroke="#800020" strokeWidth="1" />
            
            {/* Small decorative mango leaf garland silhouette */}
            <path d="M 0,0 Q 10,12 20,0 Q 30,12 40,0" fill="none" stroke="#800020" strokeWidth="0.8" opacity="0.4" />
          </pattern>
        </defs>
        {/* Fill the full top header width */}
        <rect x="0" y="0" width="100%" height="32" fill="url(#templeTopPattern)" />
      </svg>

      {/* 2. LEFT FLANK VERTICAL BORDER: Traditional Temple Carved Pillars (Dravidian Stone Columns) */}
      <svg 
        className="absolute top-8 left-0 w-6 h-[calc(100%-4rem)] pointer-events-none opacity-[0.85] z-10 hidden sm:block" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="templeLeftPattern" width="24" height="60" patternUnits="userSpaceOnUse">
            {/* Structured pillar panel brick/compartment boundary */}
            <rect x="3" y="4" width="18" height="52" rx="1.5" fill="none" stroke="#D4AF37" strokeWidth="1" />
            
            {/* Traditional diagonal diamond sculpture carving representing historic architecture */}
            <path d="M 12,12 L 18,30 L 12,48 L 6,30 Z" fill="none" stroke="#D4AF37" strokeWidth="0.75" opacity="0.7" />
            
            {/* Concentric core circle representing the deity lotus medallion */}
            <circle cx="12" cy="30" r="3.5" fill="#800020" />
            
            {/* Horizontal dividing frieze moldings */}
            <line x1="3" y1="4" x2="21" y2="4" stroke="#D4AF37" strokeWidth="1.5" />
            <line x1="3" y1="56" x2="21" y2="56" stroke="#D4AF37" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="24" height="100%" fill="url(#templeLeftPattern)" />
      </svg>

      {/* 3. RIGHT FLANK VERTICAL BORDER: Traditional Temple Carved Pillars (Dravidian Stone Columns) */}
      <svg 
        className="absolute top-8 right-0 w-6 h-[calc(100%-4rem)] pointer-events-none opacity-[0.85] z-10 hidden sm:block" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Reuse the pattern by mirroring or referencing */}
          <pattern id="templeRightPattern" width="24" height="60" patternUnits="userSpaceOnUse">
            <rect x="3" y="4" width="18" height="52" rx="1.5" fill="none" stroke="#D4AF37" strokeWidth="1" />
            <path d="M 12,12 L 18,30 L 12,48 L 6,30 Z" fill="none" stroke="#D4AF37" strokeWidth="0.75" opacity="0.7" />
            <circle cx="12" cy="30" r="3.5" fill="#800020" />
            <line x1="3" y1="4" x2="21" y2="4" stroke="#D4AF37" strokeWidth="1.5" />
            <line x1="3" y1="56" x2="21" y2="56" stroke="#D4AF37" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="24" height="100%" fill="url(#templeRightPattern)" />
      </svg>

      {/* 4. BOTTOM TEMPLE BORDER: Inverted Ornamental Pediment Moulding */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-8 pointer-events-none opacity-[0.85] z-10" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="templeBottomPattern" width="40" height="32" patternUnits="userSpaceOnUse">
            {/* Bottom-up ornamental dome arches balancing the top */}
            <path d="M 0,32 Q 20,8 40,32" fill="none" stroke="#D4AF37" strokeWidth="1.25" />
            
            {/* Traditional inverted lotus bud or dome tip */}
            <circle cx="20" cy="14" r="3" fill="#800020" />
            <line x1="20" y1="32" x2="20" y2="17" stroke="#D4AF37" strokeWidth="1" />
            
            {/* Double baseline plinth lines typical of South Indian temple pedestals */}
            <line x1="0" y1="28" x2="40" y2="28" stroke="#D4AF37" strokeWidth="1.25" opacity="0.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="32" fill="url(#templeBottomPattern)" />
      </svg>
    </>
  );
}
