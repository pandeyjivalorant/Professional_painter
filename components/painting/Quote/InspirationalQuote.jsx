'use client';

import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';

export default function InspirationalQuote() {
  const artwork = useArtwork();
  const quote = artwork.quote || "Art washes away from the soul the dust of everyday life.";
  
  return (
    <SectionWrapper id="inspirational-quote" className="py-32 md:py-48 bg-obsidian border-y border-white/5 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-gold/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <p className="font-display text-4xl md:text-6xl text-ivory/90 italic leading-tight md:leading-[1.4]">
          &ldquo;{quote}&rdquo;
        </p>
        
        <div className="mt-16 flex flex-col items-center justify-center gap-6">
          {/* Elegant geometric divider */}
          <div className="flex items-center gap-3">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
            <span className="w-1.5 h-1.5 rotate-45 border border-gold/60" />
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl text-gold/80 italic mb-2">
              {artwork.artist?.name || 'Pablo Picasso'}
            </span>
            <span className="text-warm-white/30 uppercase tracking-[0.3em] text-[10px] font-sans">
              Creator
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
