'use client';

import { useState } from 'react';
import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import { ShieldCheck, Download, Search, X } from 'lucide-react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

const certificateDarkTheme = {
  '--ivory-rgb': '245 240 232',
  '--gold-rgb': '201 162 39',
  '--warm-white-rgb': '248 245 240',
};

const CertificateFullContent = ({ artwork }) => {
  if (!artwork) return null;
  
  return (
    <div 
      className="relative bg-[#0d0d0d] p-6 md:p-16 border-2 border-gold/40 cert-shadow overflow-hidden w-full max-w-4xl mx-auto"
      style={certificateDarkTheme}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('https://images.unsplash.com/photo-1618641986557-1de223cb2f4f?q=80&w=1000&auto=format&fit=crop')]" />
      
      {/* Inner elegant border */}
      <div className="absolute inset-4 border border-gold/15 pointer-events-none" />

      {/* Seal */}
      <div className="flex justify-center mb-10">
        <div className="w-24 h-24 rounded-full border border-gold/50 flex items-center justify-center bg-gradient-to-br from-gold/10 to-transparent shadow-[0_0_30px_rgba(201,162,39,0.2)]">
          <ShieldCheck className="w-10 h-10 text-gold" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <h3 className="font-title text-2xl md:text-3xl text-gold tracking-[0.2em] uppercase">
          Certificate of Authenticity
        </h3>
      </div>

      {/* Content */}
      <div className="text-center space-y-8 mb-16 relative z-10">
        <p className="text-warm-white/50 text-sm font-sans uppercase tracking-[0.1em]">
          This document certifies that the artwork
        </p>
        <p className="font-display text-4xl md:text-5xl text-ivory italic">
          &ldquo;{artwork.title}&rdquo;
        </p>
        <p className="text-warm-white/50 text-sm font-sans uppercase tracking-[0.1em]">
          is an original, one-of-a-kind creation by
        </p>
        <p className="font-display text-2xl text-gold tracking-wide">
          {artwork.artist?.name}
        </p>
      </div>

      {/* Specifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center mb-16 py-8 border-y border-gold/20 relative z-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-warm-white/40 mb-2">Medium</p>
          <p className="text-ivory/90 text-sm font-sans">{artwork.medium}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-warm-white/40 mb-2">Year</p>
          <p className="text-ivory/90 text-sm font-sans">{artwork.year || '—'}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-warm-white/40 mb-2">Dimensions</p>
          <p className="text-ivory/90 text-sm font-sans">
            {artwork.dimensions 
              ? `${artwork.dimensions.width} × ${artwork.dimensions.height} ${artwork.dimensions.unit}` 
              : artwork.size}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-warm-white/40 mb-2">Registration ID</p>
          <p className="text-ivory/90 text-sm font-sans tracking-widest">
            {artwork.certificateNumber || `CA-${artwork.id?.toString().padStart(4, '0')}`}
          </p>
        </div>
      </div>

      {/* Signature & Stamp */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8 px-0 sm:px-8 relative z-10">
        <div>
          <p className="font-display text-3xl text-gold/60 italic mb-2">
            {artwork.artist?.name}
          </p>
          <div className="w-32 sm:w-48 h-px bg-gold/30 mb-2" />
          <p className="text-[10px] text-warm-white/40 uppercase tracking-widest">Artist Signature</p>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border border-red-900/40 flex items-center justify-center mb-2 mx-auto rotate-[-15deg] opacity-60">
            <p className="text-[10px] text-red-900/60 uppercase tracking-[0.2em] font-sans font-bold leading-tight">
              Official<br/>Seal
            </p>
          </div>
          <p className="text-[10px] text-warm-white/40 uppercase tracking-widest">Verified Original</p>
        </div>
      </div>
    </div>
  );
};

export default function CertificateSection() {
  const artwork = useArtwork();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SectionWrapper id="certificate" className="py-24 bg-obsidian">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-[0.25em] text-[10px] mb-4 font-sans">
            Provenance & Trust
          </p>
          <h2 className="font-display text-4xl text-ivory">
            Certificate of Authenticity
          </h2>
        </div>

        {/* Desktop View: Original Full Certificate */}
        <div className="hidden md:block relative group">
          <div className="absolute -inset-1 bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <CertificateFullContent artwork={artwork} />
        </div>

        {/* Mobile View: Preview Card */}
        <div className="block md:hidden">
          <div className="flex justify-center">
            <div 
              onClick={() => setIsOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(true) }}
              aria-label="View Full Certificate"
              className="w-full max-w-[320px] aspect-[3/4] max-h-[450px] bg-[#0d0d0d] border border-gold/30 rounded-2xl cert-shadow-sm relative flex flex-col items-center justify-center p-8 group cursor-pointer overflow-hidden transition-all duration-500 hover:border-gold hover:shadow-[0_20px_50px_rgba(201,162,39,0.15)] focus:outline-none focus:ring-2 focus:ring-gold"
              style={certificateDarkTheme}
            >
              {/* Texture */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618641986557-1de223cb2f4f?q=80&w=1000&auto=format&fit=crop')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-3 border border-gold/10 rounded-xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center bg-gold/5 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-title text-xl text-gold tracking-widest uppercase mb-4">
                  Certificate of<br />Authenticity
                </h3>
                <div className="w-12 h-px bg-gold/30 mb-4" />
                <p className="text-warm-white/50 text-[10px] uppercase tracking-wider mb-2">For</p>
                <p className="font-display text-2xl text-ivory italic opacity-90 line-clamp-2">
                  &ldquo;{artwork?.title}&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => setIsOpen(true)}
              className="mt-8 flex items-center gap-2 text-gold uppercase tracking-[0.2em] text-xs font-sans hover:text-ivory transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-[#0d0d0d] rounded-sm px-2 py-1"
            >
              <Search className="w-4 h-4" /> View Full Certificate
            </button>
          </div>
        </div>

        {/* Download Button (Desktop only, Mobile can have it inside modal) */}
        <div className="hidden md:flex justify-center mt-12">
          <button className="group flex items-center gap-3 px-8 py-4 border border-white/20 bg-white/[0.02] text-ivory hover:border-gold hover:text-gold transition-all duration-300 text-xs uppercase tracking-[0.2em] font-sans shadow-lg focus:outline-none focus:ring-2 focus:ring-gold">
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            Download Specimen
          </button>
        </div>
      </div>

      {/* Fullscreen Modal (used on mobile only) */}
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-[100]"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
              aria-hidden="true"
            />

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                  className="w-full max-w-4xl relative"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute -top-12 right-0 md:-right-12 md:top-0 p-2 text-warm-white/50 hover:text-gold transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-gold rounded-full"
                    aria-label="Close modal"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  
                  {/* The full certificate */}
                  <CertificateFullContent artwork={artwork} />
                  
                  {/* Download button for mobile view inside modal */}
                  <div className="flex md:hidden justify-center mt-8">
                    <button className="group flex items-center gap-3 px-8 py-4 border border-white/20 bg-white/[0.02] text-ivory hover:border-gold hover:text-gold transition-all duration-300 text-xs uppercase tracking-[0.2em] font-sans shadow-lg focus:outline-none focus:ring-2 focus:ring-gold">
                      <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                      Download Specimen
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
