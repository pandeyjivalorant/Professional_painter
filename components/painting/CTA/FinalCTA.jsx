'use client';

import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  const artwork = useArtwork();
  const isAvailable = artwork.status === 'Available';

  return (
    <SectionWrapper id="final-cta" className="py-32 md:py-48 bg-black text-center relative overflow-hidden">
      {/* Cinematic Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-black to-[#050505] pointer-events-none" />
      
      {/* Subtle animated particles/noise could go here. For now, a subtle radial gradient. */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-gold uppercase tracking-[0.3em] text-xs mb-8 font-sans">
            The Final Step
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ivory mb-8 leading-tight">
            Ready to Make <br className="hidden md:block"/> It Yours?
          </h2>
          <p className="text-warm-white/50 text-lg md:text-2xl font-sans mb-16 max-w-2xl mx-auto leading-relaxed">
            {isAvailable 
              ? "Acquire this original masterpiece and elevate your collection with a piece of timeless beauty."
              : "This piece is no longer available, but you can explore more works by the artist or commission a custom piece."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {isAvailable && (
            <a 
              href={`https://wa.me/919911330808?text=I am interested in acquiring the masterpiece: ${encodeURIComponent(artwork.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto px-12 py-6 bg-gold text-obsidian font-sans text-sm uppercase tracking-[0.25em] transition-all duration-300 overflow-hidden text-center block"
            >
              <span className="relative z-10 font-medium">Inquire on WhatsApp</span>
              <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            </a>
          )}
          <Link 
            href="/gallery"
            className="group w-full sm:w-auto px-12 py-6 border border-white/20 text-ivory font-sans text-sm uppercase tracking-[0.25em] hover:border-gold/60 hover:text-gold transition-colors duration-300"
          >
            Explore the Gallery
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
