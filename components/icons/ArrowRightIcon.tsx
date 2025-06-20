
import React from 'react';

interface ArrowRightIconProps {
  className?: string;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
};

export default ArrowRightIcon;
    