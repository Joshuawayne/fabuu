
import React from 'react';
import { Brand } from '../constants'; // Using Brand type from constants

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
        style={{ animationDuration: animationDuration }} // Apply dynamic duration
      >
        {duplicatedBrands.map((brand, index) => {
          const Logo = brand.LogoComponent;
          return (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 w-36 h-20 mx-6 md:mx-10 flex items-center justify-center"
              title={brand.name}
            >
              <Logo className="h-10 md:h-12 w-auto text-luxury-text/50 hover:text-luxury-accent transition-colors duration-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandMarquee;
