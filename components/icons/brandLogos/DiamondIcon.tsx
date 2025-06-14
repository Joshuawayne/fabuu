
import React from 'react';

const DiamondIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12 2L2 9l10 13L22 9l-10-7z" />
    <path d="M2 9l10 4 10-4" />
    <path d="M12 2v11" />
  </svg>
);

export default DiamondIcon;
