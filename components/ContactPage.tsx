import React from 'react';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';

interface SplitTextProps extends Omit<HTMLMotionProps<"div">, 'delay'> {
  text: string;
  splitType?: 'chars' | 'words';
  from?: Record<string, any>; 
  to?: Record<string, any>;   
  delay?: number; // Stagger delay for children in milliseconds
  duration?: number; // Animation duration for each child in seconds
  ease?: string | number[] | { type: string; [key: string]: any }; 
  
  className?: string; 
  textAlign?: 'left' | 'center' | 'right';
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  splitType = 'words',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  delay = 50, 
  duration = 0.5, 
  ease = 'easeOut', 
  className = '', 
  textAlign = 'left',
  ...rest 
}) => {
  const parts = splitType === 'chars' 
    ? text.split('') 
    : text.split(/(\s+)/); // Keep spaces as separate parts, filter later

  const containerVariants: Variants = {
    hidden: {}, 
    visible: {
      transition: {
        staggerChildren: delay / 1000, 
      },
    },
  };

  const childVariants: Variants = {
    hidden: from, 
    visible: {
      ...to, 
      transition: {
        duration: duration, 
        ease: ease, 
      },
    },
  };

  const getTextAlignClass = () => {
    if (textAlign === 'center') return 'text-center';
    if (textAlign === 'right') return 'text-right';
    return 'text-left';
  };
  
  // Filter out empty strings that might result from splitting, but keep spaces.
  const filteredParts = parts.filter(part => part.length > 0);

  return (
    <motion.div
      className={`${className} ${getTextAlignClass()}`}
      variants={containerVariants}
      initial="hidden" 
      animate="visible"   
      {...rest} 
      aria-label={text}
    >
      {filteredParts.map((part, index) => {
        const isSpace = part.match(/^\s+$/);
        return (
          <motion.span
            key={index}
            variants={childVariants}
            className={isSpace ? '' : 'inline-block'} 
            style={{ 
              whiteSpace: isSpace ? 'pre' : 'normal',
              ...(splitType === 'chars' && !isSpace && { display: 'inline-block' }) 
            }}
          >
            {part}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default SplitText;
