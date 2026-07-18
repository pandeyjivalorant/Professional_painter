'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, Eye } from 'lucide-react';
import Link from 'next/link';

export function StarRating({ rating, size = 14, reviews }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={size} className={i <= Math.round(rating) ? 'text-gold fill-gold' : 'text-slate-mid'} />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-muted text-xs">({reviews})</span>
      )}
    </div>
  );
}

export function PaintingCard({ painting, onPreview, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-slate border border-gold/10 hover:border-gold/30 transition-all duration-400 overflow-hidden hover-lift flex flex-col h-full w-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '115%' }}>
        <img
          src={painting.thumbnail}
          alt={painting.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlays */}
        {!painting.available && (
          <div className="absolute inset-0 bg-obsidian/60 flex items-center justify-center pointer-events-none">
            <span className="font-title text-xs tracking-[0.3em] text-ivory/60 border border-ivory/30 px-3 py-1">SOLD</span>
          </div>
        )}

        {painting.originalPrice && painting.available && (
          <div className="absolute top-3 left-3 bg-rose/90 text-obsidian text-[10px] font-semibold tracking-wider px-2 py-1 pointer-events-none">
            SALE
          </div>
        )}

        {/* The entire image clickable area */}
        <Link href={`/painting/${painting.id}`} className="absolute inset-0 z-10">
          <span className="sr-only">View {painting.title}</span>
        </Link>

        {/* Hover actions */}
        <div className="absolute inset-0 bg-obsidian/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 pointer-events-none z-20">
          {onPreview && (
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPreview(painting); }}
              className="w-10 h-10 bg-ivory/10 border border-ivory/30 flex items-center justify-center hover:bg-gold/20 hover:border-gold transition-all pointer-events-auto">
              <Eye size={16} className="text-ivory" />
            </button>
          )}
          <Link href={`/painting/${painting.id}`}
            className="px-4 py-2 bg-gold text-obsidian text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors pointer-events-auto">
            View
          </Link>
        </div>

      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] tracking-[0.2em] text-gold/60 uppercase mb-1">{painting.category} · {painting.year}</div>
        <Link href={`/painting/${painting.id}`} className="font-display text-lg text-ivory hover:text-gold transition-colors block leading-tight mb-2">
          {painting.title}
        </Link>
        <div className="text-muted text-xs mb-2 line-clamp-1">{painting.size}</div>
        <StarRating rating={painting.rating} size={11} reviews={painting.reviews} />

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="font-display text-xl text-gold">${painting.price.toLocaleString()}</span>
              {painting.originalPrice && (
                <span className="text-muted text-xs line-through ml-2">${painting.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          {painting.available && (
            <a
              href={`https://wa.me/919911330808?text=I am interested in acquiring the painting: ${encodeURIComponent(painting.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-2 bg-gold/10 border border-gold/20 text-gold text-xs tracking-[0.15em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-300 flex items-center justify-center gap-2"
            >
              Inquire
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, center = true, gold = false }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="font-title text-xs tracking-[0.4em] text-gold/70 uppercase mb-4">{eyebrow}</p>
      )}
      <h2 className={`font-display ${gold ? 'gold-text' : 'text-ivory'} leading-tight mb-4`}
        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <div className={`mt-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent ${center ? '' : 'via-gold/40'}`} />
    </div>
  );
}



export function ImageModal({ painting, onClose }) {
  if (!painting) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="relative max-w-5xl w-full"
          onClick={e => e.stopPropagation()}
        >
          <img src={painting.image} alt={painting.title} className="w-full h-auto max-h-[80vh] object-contain" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian/90 to-transparent p-6">
            <p className="font-display text-2xl text-ivory italic">{painting.title}</p>
            <p className="text-gold text-sm mt-1">{painting.category} · {painting.size}</p>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-obsidian/80 border border-gold/30 flex items-center justify-center text-ivory hover:text-gold">
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
