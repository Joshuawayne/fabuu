
import React from 'react';

const InterlinkedRingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="8" cy="12" r="6" />
    <circle cx="16" cy="12" r="6" />
  </svg>
);

export default InterlinkedRingsIcon;
