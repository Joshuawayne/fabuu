
import React from 'react';

const CrownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M2 13.172l2.394-2.394a1 1 0 011.414 0L8 12.192l4-4 2.192-2.192a1 1 0 011.414 0L18 8.192l2.394-2.394a1 1 0 011.414 0L22 6.172V20H2V13.172z" />
    <path d="M2.5 12H21.5" />
    <path d="M8 12.192L5.808 9.998" />
    <path d="M16 12.192L18.192 9.998" />
    <circle cx="12" cy="7" r="1" />
    <circle cx="6" cy="7" r="1" />
    <circle cx="18" cy="7" r="1" />
  </svg>
);

export default CrownIcon;
