'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

/**
 * Extracts a human-readable name from a filename path.
 * e.g., "/painting/paint01.jpg" -> "Paint 01"
 */
function formatImageName(path) {
  const filename = path.split('/').pop().split('\\').pop();
  const nameWithoutExt = filename.replace(/\.[^.]+$/, '');
  // Convert "paint01" or "certi-img-01" to "Paint 01" or "Certi Img 01"
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/(\d+)/g, ' $1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Lightbox modal with navigation
 */
function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const current = images[currentIndex];

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
  }, [currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/92 backdrop-blur-xl" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center bg-obsidian/80 border border-gold/30 text-ivory/70 hover:text-gold hover:border-gold/60 transition-all"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 z-10 font-title text-xs tracking-[0.3em] text-gold/60 uppercase">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
          className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center bg-obsidian/60 border border-gold/20 text-ivory/60 hover:text-gold hover:border-gold/50 transition-all"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next button */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
          className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center bg-obsidian/60 border border-gold/20 text-ivory/60 hover:text-gold hover:border-gold/50 transition-all"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative max-w-[90vw] max-h-[85vh] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.name}
          className="max-w-full max-h-[80vh] object-contain shadow-2xl"
        />
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian/90 via-obsidian/50 to-transparent p-5 pt-12">
          <p className="font-display text-xl italic text-ivory">{current.name}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Individual gallery card with hover effects
 */
function GalleryCard({ image, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: 'easeOut' }}
      className="gallery-card group relative overflow-hidden cursor-pointer bg-slate border border-gold/10 hover:border-gold/40 transition-all duration-500"
      onClick={onClick}
    >
      {/* Image container with aspect ratio */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '120%' }}>
        <img
          src={image.src}
          alt={image.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end">
          <div className="p-4 w-full">
            <p className="font-display text-lg italic text-ivory truncate">{image.name}</p>
            <div className="flex items-center gap-2 mt-1.5 text-gold/70">
              <ZoomIn size={13} />
              <span className="text-[10px] tracking-[0.25em] uppercase">View Full Size</span>
            </div>
          </div>
        </div>

        {/* Top-right glow on hover */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

/**
 * Main ImageGallery component
 * @param {Object} props
 * @param {Array<{src: string, name: string}>} props.images - Array of image objects
 * @param {string} [props.eyebrow] - Small label above the title
 * @param {string} [props.title] - Gallery section title
 * @param {string} [props.subtitle] - Description below title
 * @param {number} [props.columns] - Number of columns (default: responsive)
 */
export default function ImageGallery({ images, eyebrow, title, subtitle, columns }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-2xl italic text-ivory/30">No images found</p>
        <p className="text-muted text-sm mt-2">Add images to the folder and they will appear here automatically.</p>
      </div>
    );
  }

  const gridClass = columns
    ? `grid gap-5`
    : `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5`;

  const gridStyle = columns
    ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
    : {};

  return (
    <div>
      {/* Header */}
      {(eyebrow || title) && (
        <div className="text-center mb-14">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-title text-xs tracking-[0.4em] text-gold/70 uppercase mb-4"
            >
              {eyebrow}
            </motion.p>
          )}
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-ivory leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted text-base max-w-xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>
      )}

      {/* Image count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted text-sm">
          <span className="text-ivory font-medium">{images.length}</span> works
        </p>
      </div>

      {/* Grid */}
      <div className={gridClass} style={gridStyle}>
        {images.map((image, index) => (
          <GalleryCard
            key={image.src}
            image={image}
            index={index}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
