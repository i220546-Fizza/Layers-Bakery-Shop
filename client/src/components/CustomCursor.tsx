import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useIsTouchDevice } from '../hooks/useIsTouchDevice';

/**
 * A small dot that tracks the pointer 1:1, plus a thin ring that only
 * appears over interactive elements. Kept deliberately minimal — no size
 * jump or color fill on the dot itself — so it reads as a native cursor
 * replacement rather than a distraction.
 */
export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const prefersReduced = useReducedMotion();
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Tight spring so the dot tracks almost 1:1 with the real pointer.
  const dotX = useSpring(x, { stiffness: 1000, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 50, mass: 0.2 });
  // Slightly looser trail for the ring, for a subtle sense of depth.
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    document.documentElement.classList.add('no-cursor');

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest('a, button, [data-cursor-hover], input, textarea, select'));
    }

    function onLeave() {
      setIsVisible(false);
    }

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      document.documentElement.classList.remove('no-cursor');
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch, prefersReduced]);

  if (isTouch || prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Core dot — always the same size, just moves. */}
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-layers-primary"
        style={{ x: dotX, y: dotY }}
      />
      {/* Hover ring — hidden by default, fades/scales in over interactive elements. */}
      <motion.div
        className="absolute left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-layers-accent"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: isPointer ? 1 : 0.4, opacity: isPointer ? 1 : 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </div>
  );
}
