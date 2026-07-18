'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const variantMap = {
  'fade-up': fadeUpVariants,
  'fade-left': fadeLeftVariants,
  'fade-right': fadeRightVariants,
};

export default function SectionWrapper({ 
  children, 
  className = '', 
  variant = 'fade-up',
  delay = 0,
  id,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variantMap[variant] || fadeUpVariants}
      transition={{ 
        duration: 0.9, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
