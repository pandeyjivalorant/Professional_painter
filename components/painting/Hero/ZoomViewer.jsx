'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { useState } from 'react';

export function ZoomViewer({ image, onOpenLightbox }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative w-full h-[60vh] md:h-[65vh] cursor-zoom-in bg-obsidian overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onOpenLightbox}
      title="Click to View in Full Resolution"
    >
      {/* Base Image — object-contain keeps the entire artwork visible, never cropped */}
      <Image
        src={image.url}
        alt={image.alt}
        fill
        priority
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 70vw"
      />

      {/* ─── Fullscreen Expand Button ─── */}
      <AnimatePresence>
        {isHovering && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox?.();
            }}
            aria-label="Open fullscreen viewer"
            className="absolute bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-gold hover:bg-gold hover:text-obsidian hover:border-gold transition-colors duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_30px_rgba(201,162,39,0.35)] cursor-pointer group"
          >
            <Maximize2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fallback: static button visible when NOT hovering (touch devices / resting state) */}
      {!isHovering && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox?.();
          }}
          aria-label="Open fullscreen viewer"
          className="absolute bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-gold/70 cursor-pointer md:hidden"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
