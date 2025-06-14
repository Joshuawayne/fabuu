
import React from 'react';

const GeometricPatternIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M4 4l4 4-4 4" />
    <path d="M12 4l4 4-4 4" />
    <path d="M20 4l-4 4 4 4" />
    <path d="M4 12l4 4-4 4" />
    <path d="M12 12l4 4-4 4" />
    <path d="M20 12l-4 4 4 4" />
  </svg>
);

export default GeometricPatternIcon;
