import React, { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

// Add type for the transition configuration
interface TransitionConfig {
  rotate: {
    from: number;
    to: number;
    ease: string;
    duration: number;
    type: string;
    repeat: number;
  };
  scale: {
    type: string;
    damping: number;
    stiffness: number;
  };
}

const getRotationTransition = (duration: number, from: number, loop: boolean = true): TransitionConfig['rotate'] => ({
  from,
  to: from + 360,
  ease: "linear",
  duration,
  type: "tween",
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number): TransitionConfig => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
});

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "speedUp" | "slowDown" | "pause" | "goBonkers" | null;
  className?: string;
  radius?: number; // Radius of the text circle in pixels
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  radius = 60, // Default radius
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls]);

  const handleHoverStart = () => {
    if (!onHover) return;
    const start = rotation.get();

    let transitionConfig: TransitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        controls.stop();
        controls.start({
          rotate: start,
          scale: 1,
          transition: { type: "spring", damping: 15, stiffness: 200 }
        });
        return;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    if (onHover === "pause") {
      const start = rotation.get();
      controls.start({
        rotate: start + 360,
        scale: 1,
        transition: getTransition(spinDuration, start),
      });
    } else if (onHover) {
      const start = rotation.get();
      controls.start({
        rotate: start + 360,
        scale: 1,
        transition: getTransition(spinDuration, start),
      });
    }
  };

  return (
    <motion.div
      className={`circular-text relative ${className}`} 
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={onHover ? handleHoverStart : undefined}
      onMouseLeave={onHover ? handleHoverEnd : undefined}
    >
      {letters.map((letter, i) => {
        const positionAngleDeg = (360 / letters.length) * i;
        const positionAngleRad = (positionAngleDeg * Math.PI) / 180;
        
        const x = radius * Math.cos(positionAngleRad);
        const y = radius * Math.sin(positionAngleRad);
        
        const characterOrientationDeg = positionAngleDeg + 90; 
        
        const transformValue = `translate(${x}px, ${y}px) rotate(${characterOrientationDeg}deg)`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-2xl" 
            style={{ 
              transform: transformValue, 
              WebkitTransform: transformValue,
              pointerEvents: 'none'
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;