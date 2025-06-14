
import React from 'react';

interface FabuLogoProps {
  className?: string;
  color?: string; // This will be the color of the "FABU" text
  accentColor?: string; // New prop for the circle, defaults to luxury-accent
}

const FabuLogo: React.FC<FabuLogoProps> = ({ 
  className = 'h-10 w-auto', 
  color = 'currentColor', 
  accentColor = '#B08D57' // Default to luxury-accent
}) => {
  return (
    <svg 
      viewBox="0 0 200 50" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="Poppins, sans-serif" 
        fontSize="40" 
        fontWeight="600" // Slightly bolder for luxury
        letterSpacing="0.075em" // Increased letter spacing
        fill={color}
      >
        FABU
      </text>
      {/* Updated accent circle color */}
      <circle cx="185" cy="25" r="5" fill={accentColor} />
    </svg>
  );
};

export default FabuLogo;