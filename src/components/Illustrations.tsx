import React from 'react';

export const TreatmentChairIllustration = ({ className = "w-32 h-32" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Treatment chair base */}
    <ellipse cx="100" cy="180" rx="80" ry="15" fill="#e4ded2" opacity="0.3"/>
    
    {/* Chair base */}
    <rect x="85" y="140" width="30" height="40" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Chair seat */}
    <path d="M70 120 Q70 110 80 110 L120 110 Q130 110 130 120 L130 140 Q130 150 120 150 L80 150 Q70 150 70 140 Z" 
          fill="#e4ded2" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Chair back */}
    <path d="M75 110 Q75 90 85 90 L115 90 Q125 90 125 110" 
          fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Armrests */}
    <rect x="60" y="115" width="15" height="25" rx="3" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    <rect x="125" y="115" width="15" height="25" rx="3" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Equipment stand */}
    <line x1="150" y1="60" x2="150" y2="180" stroke="#bcb4a6" strokeWidth="1.5"/>
    <circle cx="150" cy="180" r="8" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Equipment head */}
    <path d="M140 60 Q140 50 150 50 Q160 50 160 60 L160 80 Q160 90 150 90 Q140 90 140 80 Z" 
          fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Decorative elements */}
    <circle cx="50" cy="50" r="2" fill="#e4ded2"/>
    <circle cx="170" cy="40" r="1.5" fill="#e4ded2"/>
    <circle cx="40" cy="80" r="1" fill="#bcb4a6"/>
  </svg>
);

export const FacialIllustration = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Face outline */}
    <ellipse cx="50" cy="45" rx="20" ry="25" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Eyes */}
    <circle cx="44" cy="40" r="1.5" fill="#bcb4a6"/>
    <circle cx="56" cy="40" r="1.5" fill="#bcb4a6"/>
    
    {/* Nose */}
    <path d="M50 45 Q52 47 50 49" fill="none" stroke="#bcb4a6" strokeWidth="1"/>
    
    {/* Lips */}
    <path d="M46 55 Q50 57 54 55" fill="none" stroke="#e4ded2" strokeWidth="1.5"/>
    
    {/* Spa elements */}
    <circle cx="25" cy="25" r="3" fill="#e4ded2" opacity="0.6"/>
    <circle cx="75" cy="30" r="2" fill="#e4ded2" opacity="0.6"/>
    <circle cx="30" cy="75" r="2.5" fill="#e4ded2" opacity="0.6"/>
  </svg>
);

export const MassageIllustration = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Massage table */}
    <rect x="20" y="50" width="60" height="8" rx="4" fill="#e4ded2" stroke="#bcb4a6" strokeWidth="1"/>
    
    {/* Table legs */}
    <line x1="25" y1="58" x2="25" y2="75" stroke="#bcb4a6" strokeWidth="1.5"/>
    <line x1="75" y1="58" x2="75" y2="75" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Body outline */}
    <ellipse cx="50" cy="45" rx="25" ry="8" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Hands */}
    <circle cx="35" cy="35" r="3" fill="#e4ded2" opacity="0.7"/>
    <circle cx="65" cy="35" r="3" fill="#e4ded2" opacity="0.7"/>
    
    {/* Relaxation elements */}
    <path d="M15 20 Q20 15 25 20" fill="none" stroke="#e4ded2" strokeWidth="1"/>
    <path d="M75 15 Q80 10 85 15" fill="none" stroke="#e4ded2" strokeWidth="1"/>
  </svg>
);

export const LashIllustration = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Eye shape */}
    <ellipse cx="50" cy="50" rx="25" ry="12" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Eyelashes */}
    <path d="M30 45 Q32 40 34 45" fill="none" stroke="#bcb4a6" strokeWidth="1"/>
    <path d="M36 43 Q38 38 40 43" fill="none" stroke="#bcb4a6" strokeWidth="1"/>
    <path d="M42 42 Q44 37 46 42" fill="none" stroke="#bcb4a6" strokeWidth="1"/>
    <path d="M48 41 Q50 36 52 41" fill="none" stroke="#bcb4a6" strokeWidth="1"/>
    <path d="M54 42 Q56 37 58 42" fill="none" stroke="#bcb4a6" strokeWidth="1"/>
    <path d="M60 43 Q62 38 64 43" fill="none" stroke="#bcb4a6" strokeWidth="1"/>
    <path d="M66 45 Q68 40 70 45" fill="none" stroke="#bcb4a6" strokeWidth="1"/>
    
    {/* Pupil */}
    <circle cx="50" cy="50" r="4" fill="#e4ded2" opacity="0.6"/>
    
    {/* Decorative sparkles */}
    <circle cx="25" cy="25" r="1" fill="#e4ded2"/>
    <circle cx="75" cy="30" r="1.5" fill="#e4ded2"/>
    <circle cx="80" cy="70" r="1" fill="#e4ded2"/>
  </svg>
);

export const WaxingIllustration = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Wax pot */}
    <ellipse cx="50" cy="60" rx="15" ry="12" fill="#e4ded2" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Wax applicator */}
    <rect x="48" y="30" width="4" height="25" fill="#bcb4a6"/>
    <ellipse cx="50" cy="28" rx="6" ry="3" fill="#e4ded2"/>
    
    {/* Steam/warmth lines */}
    <path d="M35 45 Q37 40 39 45" fill="none" stroke="#e4ded2" strokeWidth="1"/>
    <path d="M42 43 Q44 38 46 43" fill="none" stroke="#e4ded2" strokeWidth="1"/>
    <path d="M61 45 Q63 40 65 45" fill="none" stroke="#e4ded2" strokeWidth="1"/>
    
    {/* Decorative elements */}
    <circle cx="25" cy="30" r="1.5" fill="#e4ded2" opacity="0.6"/>
    <circle cx="75" cy="25" r="1" fill="#e4ded2" opacity="0.6"/>
  </svg>
);

export const ProductBottleIllustration = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bottle body */}
    <rect x="30" y="25" width="20" height="40" rx="3" fill="#e4ded2" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Bottle neck */}
    <rect x="35" y="15" width="10" height="10" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Cap */}
    <rect x="33" y="10" width="14" height="8" rx="2" fill="#bcb4a6"/>
    
    {/* Label */}
    <rect x="32" y="35" width="16" height="8" fill="white" opacity="0.8"/>
    
    {/* Liquid level */}
    <rect x="32" y="45" width="16" height="18" fill="#e4ded2" opacity="0.4"/>
    
    {/* Decorative drops */}
    <circle cx="20" cy="20" r="1" fill="#e4ded2" opacity="0.6"/>
    <circle cx="60" cy="25" r="1.5" fill="#e4ded2" opacity="0.6"/>
  </svg>
);

export const ContactIllustration = ({ className = "w-32 h-32" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Phone */}
    <rect x="40" y="40" width="25" height="45" rx="8" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    <circle cx="52.5" cy="50" r="2" fill="#e4ded2"/>
    <rect x="45" y="55" width="15" height="20" fill="#e4ded2" opacity="0.3"/>
    
    {/* Message bubbles */}
    <ellipse cx="90" cy="60" rx="20" ry="12" fill="#e4ded2" opacity="0.6"/>
    <ellipse cx="95" cy="80" rx="15" ry="8" fill="#e4ded2" opacity="0.4"/>
    
    {/* Connection lines */}
    <path d="M65 65 Q75 60 85 65" fill="none" stroke="#bcb4a6" strokeWidth="1" strokeDasharray="2,2"/>
    
    {/* Decorative elements */}
    <circle cx="25" cy="25" r="1.5" fill="#e4ded2"/>
    <circle cx="125" cy="30" r="1" fill="#e4ded2"/>
    <circle cx="30" cy="120" r="2" fill="#e4ded2" opacity="0.6"/>
  </svg>
);

export const BookingCalendarIllustration = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Calendar base */}
    <rect x="25" y="30" width="50" height="45" rx="3" fill="white" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Calendar header */}
    <rect x="25" y="30" width="50" height="12" fill="#e4ded2"/>
    
    {/* Binding rings */}
    <circle cx="35" cy="25" r="2" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    <circle cx="65" cy="25" r="2" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Calendar grid */}
    <line x1="30" y1="50" x2="70" y2="50" stroke="#e4ded2" strokeWidth="0.5"/>
    <line x1="30" y1="58" x2="70" y2="58" stroke="#e4ded2" strokeWidth="0.5"/>
    <line x1="30" y1="66" x2="70" y2="66" stroke="#e4ded2" strokeWidth="0.5"/>
    
    <line x1="38" y1="42" x2="38" y2="70" stroke="#e4ded2" strokeWidth="0.5"/>
    <line x1="46" y1="42" x2="46" y2="70" stroke="#e4ded2" strokeWidth="0.5"/>
    <line x1="54" y1="42" x2="54" y2="70" stroke="#e4ded2" strokeWidth="0.5"/>
    <line x1="62" y1="42" x2="62" y2="70" stroke="#e4ded2" strokeWidth="0.5"/>
    
    {/* Selected date */}
    <circle cx="50" cy="58" r="3" fill="#bcb4a6"/>
    
    {/* Decorative elements */}
    <circle cx="15" cy="20" r="1" fill="#e4ded2"/>
    <circle cx="85" cy="15" r="1.5" fill="#e4ded2"/>
  </svg>
);

export const ShoppingIllustration = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shopping bag */}
    <path d="M30 35 L30 75 Q30 80 35 80 L65 80 Q70 80 70 75 L70 35" 
          fill="#e4ded2" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Bag handles */}
    <path d="M35 35 Q35 25 42 25 Q42 25 42 35" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    <path d="M58 35 Q58 25 65 25 Q65 25 65 35" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Products inside */}
    <rect x="40" y="45" width="6" height="15" rx="1" fill="#bcb4a6" opacity="0.6"/>
    <rect x="50" y="40" width="6" height="20" rx="1" fill="#bcb4a6" opacity="0.4"/>
    
    {/* Decorative sparkles */}
    <circle cx="20" cy="20" r="1" fill="#e4ded2"/>
    <circle cx="80" cy="25" r="1.5" fill="#e4ded2"/>
    <circle cx="85" cy="70" r="1" fill="#e4ded2"/>
  </svg>
);

export const AboutIllustration = ({ className = "w-40 h-40" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Studio room outline */}
    <rect x="30" y="60" width="140" height="80" fill="none" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Treatment bed */}
    <rect x="50" y="90" width="40" height="15" rx="2" fill="#e4ded2" stroke="#bcb4a6" strokeWidth="1"/>
    
    {/* Mirror */}
    <ellipse cx="150" cy="80" rx="12" ry="15" fill="white" stroke="#bcb4a6" strokeWidth="1.5"/>
    
    {/* Shelving */}
    <line x1="120" y1="70" x2="140" y2="70" stroke="#bcb4a6" strokeWidth="1"/>
    <line x1="120" y1="80" x2="140" y2="80" stroke="#bcb4a6" strokeWidth="1"/>
    <line x1="120" y1="90" x2="140" y2="90" stroke="#bcb4a6" strokeWidth="1"/>
    
    {/* Products on shelf */}
    <rect x="122" y="67" width="3" height="6" fill="#e4ded2"/>
    <rect x="127" y="67" width="3" height="6" fill="#e4ded2"/>
    <rect x="132" y="67" width="3" height="6" fill="#e4ded2"/>
    
    {/* Ambient lighting */}
    <circle cx="100" cy="40" r="8" fill="#e4ded2" opacity="0.3"/>
    
    {/* Decorative plants */}
    <path d="M40 60 Q45 50 50 60" fill="none" stroke="#e4ded2" strokeWidth="1.5"/>
    <path d="M160 60 Q165 50 170 60" fill="none" stroke="#e4ded2" strokeWidth="1.5"/>
    
    {/* Floor pattern */}
    <ellipse cx="100" cy="160" rx="60" ry="10" fill="#e4ded2" opacity="0.2"/>
  </svg>
);