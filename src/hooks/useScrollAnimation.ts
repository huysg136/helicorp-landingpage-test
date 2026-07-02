import React, { useEffect } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export const useScrollAnimation = (ref: React.RefObject<HTMLElement | null>, delay = 0) => {
  const controls = useAnimation();
  const isInView = useInView(ref, {
    once: true,
    amount: 0.4,
  });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay,
        },
      });
    }
  }, [isInView, controls, delay]);

  return {
    ref,
    controls,
    initial: {
      opacity: 0,
      y: 40,
      scale: 0.98,
    }
  };
};
