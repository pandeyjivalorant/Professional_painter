'use client';

import { useState } from 'react';
import { useArtwork } from '../ArtworkContext';
import { ZoomViewer } from './ZoomViewer';
import { ThumbnailStrip } from './ThumbnailStrip';
import { Lightbox } from './Lightbox';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const artwork = useArtwork();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Construct images array, falling back to just the mainImage if galleryImages is missing
  const images = artwork.galleryImages?.length > 0 
    ? artwork.galleryImages 
    : [{ url: artwork.mainImage, alt: artwork.title, type: 'front' }];

  const activeImage = images[activeIndex];

  return (
    <section className="flex flex-col-reverse md:flex-row gap-6 relative">
      {/* Thumbnails (Vertical on desktop, Horizontal on mobile) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-auto"
      >
        <ThumbnailStrip 
          images={images} 
          activeIndex={activeIndex} 
          onSelect={setActiveIndex} 
        />
      </motion.div>

      {/* Main Image Viewer */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 w-full"
      >
        <ZoomViewer 
          image={activeImage} 
          onOpenLightbox={() => setLightboxOpen(true)}
          lightboxOpen={lightboxOpen}
        />
      </motion.div>

      {/* Fullscreen Lightbox */}
      <Lightbox 
        open={lightboxOpen} 
        close={() => setLightboxOpen(false)} 
        slides={images.map(img => ({ src: img.url, alt: img.alt }))} 
        index={activeIndex} 
      />
    </section>
  );
}
