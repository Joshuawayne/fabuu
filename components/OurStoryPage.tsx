import React from 'react';

// Component & Constant Imports
import SectionTitle from './SectionTitle';
import { APP_NAME } from '../constants';
import Button from './Button'; 
import SplitText from './SplitText'; 

const OurStoryPage: React.FC = () => {
  const genesisParagraph1 = `At ${APP_NAME}, we champion the belief that fashion is an intimate form of artistry and self-expression. Our journey began with a singular dedication: to merge distinctive design with mindful creation. We envisioned a brand where each piece would not only be visually captivating but also a joy to wear and a treasure to cherish for years to come.`;
  const genesisParagraph2 = `This vision was born from a desire to move beyond fleeting trends, to cultivate a collection that speaks to enduring style and personal narrative. ${APP_NAME} is more than fabric and thread; it's a commitment to empowering individuality through sophisticated, thoughtfully crafted apparel.`;

  const craftsmanshipParagraph1 = `Each garment that bears the ${APP_NAME} name is conceived with meticulous attention to detail. From the selection of superior, often sustainable materials to the precision of our tailoring, every step is guided by an unwavering commitment to quality. Our design philosophy balances timeless elegance with a contemporary edge, resulting in pieces that are both innovative and wearable.`;
  const craftsmanshipParagraph2 = `We collaborate with skilled artisans who share our passion for excellence, ensuring that every stitch, every seam, and every silhouette meets our exacting standards. It's this dedication to the art of making that defines the tangible luxury of ${APP_NAME}.`;
  
  const promiseParagraph1 = `${APP_NAME} is more than a label; we are a collective celebrating refined individuality and conscious elegance. We believe in creating fashion that not only looks exquisite but also feels right – ethically and often environmentally. Our commitment extends to responsible sourcing and fostering practices that respect both people and the planet.`;
  const promiseParagraph2 = `We invite you to experience the world of ${APP_NAME}, where each piece tells a story of passion, precision, and purpose. Join us in embracing a style that is as thoughtful as it is beautiful.`;

  const commonSplitTextProps = {
    splitType: "words" as const,
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 30,
    duration: 0.4,
    ease: "power2.out",
    textAlign: "left" as const,
    className: "text-luxury-text/80 font-light leading-relaxed text-base md:text-lg block mb-5",
    threshold: 0.05,
    rootMargin: "-50px",
  };

  return (
    <div className="bg-white animate-fadeIn" id="our-story-page">
      {/* Hero-like banner for Our Story */}
      <div className="relative pt-28 md:pt-36 pb-20 md:pb-24 bg-luxury-bg text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{ backgroundImage: `url('https://res.cloudinary.com/ddfa67uba/image/upload/v1749995186/y_fzgwpw.jpg')` }} 
        ></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-luxury-text mb-4 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            The Heart of {APP_NAME}
          </h1>
          <p className="text-lg md:text-xl text-luxury-text/80 max-w-2xl mx-auto animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            Discover the philosophy and passion woven into every FABU creation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Our Genesis Section */}
        <div className="animate-fadeInUp" style={{animationDelay: '0.1s'}}> 
            <SectionTitle title="Our Genesis" subtitle={`The Spark of ${APP_NAME}`} align="left" className="mb-10 md:mb-12" />
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center mb-16 md:mb-20">
              <div className="md:col-span-3"> 
                  <SplitText text={genesisParagraph1} {...commonSplitTextProps} />
                  <SplitText text={genesisParagraph2} {...commonSplitTextProps} delay={commonSplitTextProps.delay + 10} />
              </div>
              <div className="md:col-span-2 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                  <img 
                    src="https://res.cloudinary.com/ddfa67uba/image/upload/v1749988294/logo1_cncep6.jpg" 
                    alt="Artistic sketch representing FABU's design inspiration" 
                    className="rounded-lg shadow-subtle object-cover w-full h-auto aspect-[4/5]" 
                  />
              </div>
            </div>
        </div>

        {/* Craftsmanship Section */}
        <div className="animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <SectionTitle title="The Weaver's Hand" subtitle="Craftsmanship & Materials" align="left" className="mb-10 md:mb-12" />
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center mb-16 md:mb-20">
              <div className="md:col-span-2 md:order-last animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                  <img 
                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG90cXF6aDNjeGw2ODYwOHpmZDJ6bTBveTM1c2Uza2IxY3hsaGo0ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U4QZ1uheMn4og60aiX/giphy.gif" 
                    alt="Close-up of luxurious fabric or detailed craftsmanship" 
                    className="rounded-lg shadow-subtle object-cover w-full h-auto aspect-[4/5]" 
                  />
              </div>
              <div className="md:col-span-3 md:order-first">
                   <SplitText text={craftsmanshipParagraph1} {...commonSplitTextProps} />
                   <SplitText text={craftsmanshipParagraph2} {...commonSplitTextProps} delay={commonSplitTextProps.delay + 10} />
              </div>
            </div>
        </div>
        
         {/* Our Promise Section */}
        <div className="animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <SectionTitle title="Our Promise" subtitle="Beyond the Garment" align="left" className="mb-10 md:mb-12" />
            <div className="max-w-3xl">
                 <SplitText text={promiseParagraph1} {...commonSplitTextProps} />
                 <SplitText text={promiseParagraph2} {...commonSplitTextProps} delay={commonSplitTextProps.delay + 10} />
            </div>
        </div>
        
        <div className="text-center mt-16 md:mt-24 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <Button href="#shop-gallery" variant="primary" size="large">
                Explore Our Collections
            </Button>
        </div>

      </div>
    </div>
  );
};

export default OurStoryPage;