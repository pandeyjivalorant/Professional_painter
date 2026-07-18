'use client';

import { useArtwork } from '../ArtworkContext';
import { ShieldCheck, Truck, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import Divider from '../Shared/Divider';

function formatPrice(price, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function StickyInquiryCard() {
  const artwork = useArtwork();

  const isAvailable = artwork.status === 'Available';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-none border border-gold/20 bg-black/80 backdrop-blur-2xl p-10 xl:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
    >
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      {/* Header Info */}
      <div className="mb-8">
        <h1 className="font-display text-3xl xl:text-4xl text-ivory leading-tight mb-3">
          {artwork.title}
        </h1>
        <p className="text-gold uppercase tracking-[0.2em] font-sans text-xs mb-4">
          {artwork.artist?.name}
        </p>
        <div className="flex items-center gap-3 text-warm-white/50 text-sm font-sans">
          <span>{artwork.medium}</span>
          {artwork.year && (
            <>
              <span className="w-1 h-1 rounded-full bg-gold/50" />
              <span>{artwork.year}</span>
            </>
          )}
        </div>
      </div>

      <Divider className="my-8 opacity-50" />

      {/* Price & Status */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-warm-white/40 mb-2">Investment</p>
          <p className="font-display text-4xl xl:text-5xl text-ivory tracking-tight">
            {formatPrice(artwork.price, artwork.currency)}
          </p>
        </div>
        <div className={`px-4 py-1.5 border text-xs uppercase tracking-[0.2em] ${
          isAvailable 
            ? 'border-gold/30 text-gold bg-gold/5' 
            : 'border-rose/30 text-rose bg-rose/5'
        }`}>
          {artwork.status || 'Available'}
        </div>
      </div>

      {/* Main Actions */}
      {isAvailable && (
        <div className="space-y-4 mb-10">
          <a 
            href={`https://wa.me/919911330808?text=I am interested in acquiring the masterpiece: ${encodeURIComponent(artwork.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full overflow-hidden group bg-gold text-obsidian py-5 font-sans text-sm text-center uppercase tracking-[0.25em] transition-all duration-300"
          >
            <span className="relative z-10 font-medium">Inquire on WhatsApp</span>
            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
          </a>
        </div>
      )}

      {/* Trust Badges */}
      <div className="space-y-5">
        <div className="flex items-center gap-4 text-warm-white/60 group">
          <ShieldCheck className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors" />
          <span className="text-xs uppercase tracking-[0.1em] font-sans">Certificate of Authenticity</span>
        </div>
        <div className="flex items-center gap-4 text-warm-white/60 group">
          <Truck className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors" />
          <span className="text-xs uppercase tracking-[0.1em] font-sans">Worldwide Insured Shipping</span>
        </div>
        <div className="flex items-center gap-4 text-warm-white/60 group">
          <Package className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors" />
          <span className="text-xs uppercase tracking-[0.1em] font-sans">Museum-Grade Packaging</span>
        </div>
      </div>
    </motion.div>
  );
}
