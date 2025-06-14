
import React, { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear",
  duration,
  type: "tween",
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from) => ({
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
  // IMPORTANT: Re-evaluate dependencies. rotation is a motion value, its change doesn't trigger useEffect.
  // This effect should run when props like spinDuration or text change.
  // The animation loop is handled by framer-motion's repeat: Infinity.
  }, [spinDuration, text, onHover, controls]); // Removed rotation from deps, added text and onHover.

  const handleHoverStart = () => {
    if (!onHover) return;
    const start = rotation.get();

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        // For pause, we stop the rotation and reset scale if needed.
        // Stopping an ongoing "infinite" rotation requires a different approach.
        // For simplicity, we'll let it complete its current shortest path to a stop.
        controls.stop(); // Stop current animation
        controls.start({ // Start a new one to settle
            rotate: start, // Stay at current rotation
            scale: 1,
            transition: { type: "spring", damping: 15, stiffness: 200 }
        });
        return; // Exit early as we're not looping
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360, // Corrected: onHover === "pause" is always false here
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    if (onHover === "pause") { // If it was paused, resume spinning
        const start = rotation.get();
         controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration, start),
        });
    } else if (onHover) { // For other hover effects, revert to normal speed
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
      // Ensure the motion.div is relative for absolute positioning of spans
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
        
        // Calculate position on the circle
        const x = radius * Math.cos(positionAngleRad);
        const y = radius * Math.sin(positionAngleRad);
        
        // Orient the letter to be upright and facing outwards
        const characterOrientationDeg = positionAngleDeg + 90; 
        
        const transformValue = `translate(${x}px, ${y}px) rotate(${characterOrientationDeg}deg)`;

        return (
          <span
            key={i}
            // Each span is absolutely positioned relative to the center of the motion.div
            // inset-0 makes it fill parent, transform is from center.
            className="absolute inline-block inset-0 text-2xl" 
            style={{ 
              transform: transformValue, 
              WebkitTransform: transformValue,
              pointerEvents: 'none' // Important for mouse events to reach parent
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
