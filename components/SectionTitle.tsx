
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string; // Optional subtitle, styled subtly
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, align = 'center', className = '' }) => {
  const textAlignClass = `text-${align}`;
  
  return (
    <div className={`mb-12 md:mb-20 ${textAlignClass} ${className}`}>
      {subtitle && (
        <p className="text-sm text-luxury-accent font-medium tracking-wider uppercase mb-2 md:mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-luxury-text relative inline-block leading-tight tracking-tight">
        {title}
        {align === 'center' && (
           <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-luxury-accent rounded-full"></span>
        )}
         {align === 'left' && (
           <span className="absolute -bottom-3 left-0 w-16 h-0.5 bg-luxury-accent rounded-full"></span>
        )}
      </h2>
    </div>
  );
};

export default SectionTitle;