
import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  href?: string;
  showArrow?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'normal' | 'large';
  disabled?: boolean; // Added disabled prop
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  href,
  showArrow = false,
  type = 'button',
  size = 'normal',
  disabled = false, // Default to false
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium tracking-wide rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-luxury-accent/70';
  
  const sizeStyle = size === 'large' ? 'py-3.5 px-8 text-base' : 'py-2.5 px-6 text-sm';

  let variantStyle = '';
  switch (variant) {
    case 'primary':
      // Solid accent background, text color suitable for the accent
      variantStyle = `bg-luxury-accent text-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'} shadow-subtle`;
      break;
    case 'secondary':
      // Outlined with accent color, text is accent color, background changes on hover
      variantStyle = `border-2 border-luxury-accent text-luxury-accent ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-luxury-accent hover:text-white'}`;
      break;
    case 'outline':
      // Subtle border (e.g., light gray), text is primary text color, border/text might change to accent on hover
      variantStyle = `border border-luxury-subtle text-luxury-text ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-luxury-accent hover:text-luxury-accent'}`;
      break;
  }

  const content = (
    <>
      {children}
      {showArrow && <ArrowRightIcon className={`ml-2 ${size === 'large' ? 'w-5 h-5' : 'w-4 h-4'}`} />}
    </>
  );

  if (href && !disabled) { // Disabled links are not standard, usually handled by preventing click or styling
    return (
      <a href={href} className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className} ${disabled ? 'pointer-events-none' : ''}`}>
        {content}
      </a>
    );
  }
  if (href && disabled) { // Render as a span or div if disabled, or handle with onClick override
     return (
      <span className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className} opacity-50 cursor-not-allowed`}>
        {content}
      </span>
    );
  }


  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;
