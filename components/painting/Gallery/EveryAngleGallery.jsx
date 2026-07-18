'use client';

import { useState } from 'react';
import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/components/ui/utils';

export default function EveryAngleGallery() {
  const artwork = useArtwork();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!artwork.galleryImages || artwork.galleryImages.length === 0) return null;

  const activeImage = artwork.galleryImages[activeIndex];

  return (
    <SectionWrapper id="every-angle" className="py-24">
      <div className="mb-12 text-center">
        <p className="text-gold uppercase tracking-[0.25em] text-[10px] mb-4 font-sans">
          Every Angle
        </p>
        <h2 className="font-display text-4xl text-ivory">
          Explore the Details
        </h2>
      </div>

      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
        {/* Main Large Preview */}
        <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden border border-white/5 bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage.url}
                alt={activeImage.alt || `${artwork.title} detail`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              {/* Caption */}
              {activeImage.caption && (
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <p className="text-warm-white/80 text-xs uppercase tracking-widest font-sans">
                    {activeImage.caption}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {artwork.galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative w-32 md:w-48 aspect-video flex-shrink-0 border transition-all duration-500 overflow-hidden",
                activeIndex === idx 
                  ? "border-gold shadow-[0_0_20px_rgba(201,162,39,0.2)] opacity-100" 
                  : "border-white/10 opacity-40 hover:opacity-100 hover:border-gold/50"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 192px"
              />
            </button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
