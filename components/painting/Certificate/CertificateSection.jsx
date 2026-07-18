'use client';

import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import { ShieldCheck, Download } from 'lucide-react';

export default function CertificateSection() {
  const artwork = useArtwork();

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

        {/* Certificate Card */}
        <div className="relative group">
          {/* Outer glow shadow */}
          <div className="absolute -inset-1 bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative bg-[#0d0d0d] p-10 md:p-16 border-2 border-gold/40 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16 py-8 border-y border-gold/20 relative z-10">
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
                  {artwork.certificateNumber || `CA-${artwork.id.toString().padStart(4, '0')}`}
                </p>
              </div>
            </div>

            {/* Signature & Stamp */}
            <div className="flex items-end justify-between px-8 relative z-10">
              <div>
                <p className="font-display text-3xl text-gold/60 italic mb-2">
                  {artwork.artist?.name}
                </p>
                <div className="w-48 h-px bg-gold/30 mb-2" />
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
        </div>

        {/* Download Button */}
        <div className="flex justify-center mt-12">
          <button className="group flex items-center gap-3 px-8 py-4 border border-white/20 bg-white/[0.02] text-ivory hover:border-gold hover:text-gold transition-all duration-300 text-xs uppercase tracking-[0.2em] font-sans shadow-lg">
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            Download Specimen
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
