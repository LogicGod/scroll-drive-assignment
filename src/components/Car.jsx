import React from 'react';

export default function Car({ className }) {
  // Simple inline SVG representing a futuristic car shape
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glow Effect */}
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Car Body */}
      <path 
        d="M20 50 L10 30 L40 15 L140 15 L180 30 L195 50 Z" 
        fill="#111" 
        stroke="#00f0ff" 
        strokeWidth="2"
        filter="url(#glow)"
      />
      
      {/* Windows */}
      <path 
        d="M45 17 L80 17 L90 28 L40 28 Z" 
        fill="#00f0ff" 
        fillOpacity="0.2" 
        stroke="#00f0ff" 
        strokeWidth="1"
      />
      <path 
        d="M85 17 L135 17 L145 28 L95 28 Z" 
        fill="#00f0ff" 
        fillOpacity="0.2" 
        stroke="#00f0ff" 
        strokeWidth="1"
      />

      {/* Wheels */}
      <circle cx="45" cy="50" r="10" fill="#000" stroke="#00f0ff" strokeWidth="2" />
      <circle cx="155" cy="50" r="10" fill="#000" stroke="#00f0ff" strokeWidth="2" />
      
      {/* Hubcaps */}
      <circle cx="45" cy="50" r="3" fill="#00f0ff" />
      <circle cx="155" cy="50" r="3" fill="#00f0ff" />
      
      {/* Headlight (Right side) */}
      <path d="M185 35 L192 35 L190 42 L182 42 Z" fill="#fff" filter="url(#glow)" />
      
      {/* Taillight (Left side) */}
      <path d="M12 35 L18 35 L19 40 L13 40 Z" fill="#ff0055" />
    </svg>
  );
}
