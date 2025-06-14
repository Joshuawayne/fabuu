
import React from 'react';
import Button from './Button';
// Removed: import CircularText from './CircularText'; 

const HeroSection: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative bg-luxury-bg pt-28 md:pt-36 pb-20 md:pb-32 min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-50 z-0">
        {/* Optional: Very subtle background texture or gradient if desired, or leave clean */}
        {/* Example: <div className="absolute inset-0 bg-gradient-to-br from-luxury-bg via-luxury-subtle/30 to-luxury-bg"></div> */}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-luxury-text mb-6 leading-tight tracking-tight">
              Timeless Elegance.
              <br />
              Modern <span className="text-luxury-accent">Expression</span>.
            </h1>
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <p className="text-base md:text-lg text-luxury-text/80 mb-10 max-w-xl mx-auto font-light leading-relaxed">
              Experience the art of dressing with FABU. Curated collections that define sophistication and empower individuality.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <Button href="#shop-gallery" variant="primary" size="large" showArrow={true}> {/* Updated href to #shop-gallery */}
              Discover Collection
            </Button>
            <Button href="#our-story" variant="secondary" size="large">
              Our Philosophy
            </Button>
          </div>
        </div>
      </div>

      {/* Optional: Extremely subtle geometric accent if desired, else remove */}
      <div className="absolute bottom-10 right-10 w-32 h-32 border-l-2 border-b-2 border-luxury-accent/20 opacity-30 transform rotate-45 -z-10 hidden lg:block"></div>
      <div className="absolute top-20 left-10 w-24 h-24 border-t-2 border-r-2 border-luxury-accent/20 opacity-30 transform -rotate-45 -z-10 hidden lg:block"></div>

      {/* Circular Text Animation Removed from here */}
    </section>
  );
};

export default HeroSection;