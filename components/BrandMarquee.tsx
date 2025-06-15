import React from 'react';
import { Brand } from '../types';

interface BrandMarqueeProps {
  brands: Brand[];
  speed?: 'slow' | 'normal' | 'fast';
}

const BrandMarquee: React.FC<BrandMarqueeProps> = ({ brands, speed = 'normal' }) => {
  if (!brands || brands.length === 0) {
    return null;
  }

  // Duplicate brands for seamless scrolling effect
  const duplicatedBrands = [...brands, ...brands];

  let animationDuration = '30s'; // Corresponds to animate-marqueeScrollLeft in tailwind.config
  if (speed === 'slow') animationDuration = '50s';
  if (speed === 'fast') animationDuration = '20s';

  return (
    <div className="w-full overflow-hidden py-8 md:py-12 bg-luxury-bg">
      <div 
        className="flex animate-marqueeScrollLeft"
        style={{ animationDuration: animationDuration }}
      >
        {duplicatedBrands.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex-shrink-0 w-24 h-16 mx-4 md:mx-8 flex items-center justify-center"
          >
            <img 
              src={brand.logoUrl} 
              alt={brand.name} 
              className="h-8 md:h-10 w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;