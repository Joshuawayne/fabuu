
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

// Props and Observer Hook remain the same
interface SplitTextProps {
  text: string;
  splitType?: 'chars' | 'words' | 'lines'; // Note: current implementation primarily supports 'words' via manual split.
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  duration?: number;
  delay?: number; // Stagger in ms
  ease?: string;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  // GSAP's SplitText specific props like 'absolute', 'linesClass', etc. are not applicable here.
  // onLetterAnimationComplete is also not directly applicable in this word-based split.
}

const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  { threshold = 0.1, rootMargin = '0px', triggerOnce = true }
): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (triggerOnce && entry.target) {
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin, threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin, threshold, triggerOnce]);

  return isIntersecting;
};


const SplitText: React.FC<SplitTextProps> = ({
  text,
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  duration = 0.5,
  delay = 50, // ms
  ease = 'power3.out',
  className = '',
  textAlign = 'left',
  threshold = 0.1,
  rootMargin = '0px',
  // splitType prop is present but the manual splitting below is word-based.
  // For char or line splitting, the manual splitting logic would need to be adjusted.
}) => {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const isVisible = useIntersectionObserver(rootRef, { threshold, rootMargin });

  useEffect(() => {
    if (isVisible && rootRef.current) {
        try {
            // GSAP animates children of rootRef.current
            const elementsToAnimate = gsap.utils.toArray(rootRef.current.children);

            if (elementsToAnimate.length === 0) {
                // If no children (e.g., empty text or unexpected structure), make parent visible
                gsap.to(rootRef.current, { opacity: 1, duration: 0.3 });
                return;
            }

            gsap.fromTo(
                elementsToAnimate,
                { ...from },
                {
                  ...to,
                  duration,
                  ease,
                  stagger: delay / 1000, // GSAP stagger is in seconds
                  onStart: () => {
                      if(rootRef.current) rootRef.current.style.opacity = '1';
                  }
                }
            );
        } catch (error) {
            console.error('[SplitText GSAP Animation] Error:', error);
            if (rootRef.current) {
                rootRef.current.style.opacity = '1'; // Fallback to ensure text is visible
            }
        }
    }
  }, [isVisible, text, from, to, duration, delay, ease]); // Ensure all animation props are dependencies

  // Manual splitting of text into words, each wrapped in a span for animation.
  // The inner span is for the actual transform, outer for overflow:hidden if needed.
  const words = text.split(/(\s+)/); // Split by spaces, keeping spaces for layout

  const wordElements = words.map((wordOrSpace, index) => {
    if (wordOrSpace.trim() === '') {
      // It's a space character, render it as a non-breaking space or regular space
      // Using React.Fragment for spaces to avoid unnecessary spans
      return <React.Fragment key={`space-${index}`}>{wordOrSpace.replace(/ /g, '\u00A0')}</React.Fragment>;
    }
    return (
      <span key={index} style={{ display: 'inline-block', overflow: 'hidden' }}> {/* Outer span */}
        <span style={{ display: 'inline-block' }}> {/* Inner span to be animated */}
          {wordOrSpace}
        </span>
      </span>
    );
  });


  return (
    <p ref={rootRef} className={className} style={{ textAlign, opacity: 0 }} aria-label={text}>
      {wordElements}
    </p>
  );
};

export default SplitText;
