
import React from 'react';

interface CheckIconProps {
  className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2.5} // Slightly thicker for visibility
      stroke="currentColor" 
      className={className}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M5 13l4 4L19 7" 
      />
    </svg>
  );
};

export default CheckIcon;
