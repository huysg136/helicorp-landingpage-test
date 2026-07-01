import React, { useEffect } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export const useScrollAnimation = (ref: React.RefObject<HTMLElement | null>, delay = 0) => {
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: '200px 0px' });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut', delay },
      });
    }
  }, [isInView, controls, delay]);

  return {
    ref,
    controls,
    initial: { opacity: 1, y: 0 },
  };
};
