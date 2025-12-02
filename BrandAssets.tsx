import React from "react";

export const WhaleLogoIcon = ({
  className = "w-12 h-12",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Gold gradient */}
      <linearGradient id="trenchGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFB700" />
      </linearGradient>

      {/* Aura */}
      <filter id="goldAura" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0.8 0 0 0  
                  1 0.85 0 0 0  
                  0.5 0.2 0 0 0  
                  0 0 0 0.5 0"
        />
      </filter>
    </defs>

    {/* Glow */}
    <ellipse
      cx="100"
      cy="115"
      rx="70"
      ry="40"
      fill="#FFD700"
      opacity="0.25"
      filter="url(#goldAura)"
    />

    {/* Body */}
    <path
      d="
        M40 90
        c0-28 28-50 60-50h20
        c32 0 60 22 60 50
        c0 40-36 75-80 75
        S40 130 40 90z
      "
      fill="url(#trenchGold)"
      stroke="#FFD700"
      strokeWidth="4"
      strokeLinejoin="round"
      style={{ filter: "drop-shadow(0 0 10px rgba(255,215,0,0.6))" }}
    />

    {/* Underbelly cut */}
    <path
      d="M60 110c14 22 46 30 80 20"
      stroke="#FFE680"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.9"
    />

    {/* Eye */}
    <circle cx="75" cy="90" r="6" fill="#FFD700" />

    {/* Tail */}
    <path
      d="M160 100l20-12-6 18 6 18-20-12"
      fill="none"
      stroke="#FFD700"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "drop-shadow(0 0 12px rgba(255,215,0,0.7))" }}
    />
  </svg>
);

export const WhaleText = () => (
  <h1 className="text-2xl font-black tracking-widest font-mono text-trenchGold-500 drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]">
    WHALEPERP
  </h1>
);

export const WhaleLogoFull = () => (
  <div className="flex items-center gap-3">
    <WhaleLogoIcon className="w-12 h-12" />
    <WhaleText />
  </div>
);
