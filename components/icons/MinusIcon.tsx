import React from 'react';

interface MinusIconProps {
  className?: string;
}

const MinusIcon: React.FC<MinusIconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
};

export default MinusIcon;
