import { useEffect } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export const useScrollAnimation = (ref: React.RefObject<Element | null>, delay = 0) => {
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut', delay },
      });
    }
  }, [isInView, controls, delay]);

  return {
    ref,
    controls,
    initial: { opacity: 0, y: 30 },
  };
};
