'use client';

import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import { Layers, Ruler, Calendar, Palette, MapPin, Frame, Brush, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

function DetailCard({ icon: Icon, label, value, delay }) {
  if (!value) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.03)' }}
      className="group p-6 md:p-8 border border-white/5 bg-white/[0.01] transition-all duration-300"
    >
      <div className="flex flex-col h-full justify-between gap-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.25em] text-warm-white/40 group-hover:text-gold/70 transition-colors">
            {label}
          </p>
          <Icon className="w-5 h-5 text-gold/30 group-hover:text-gold transition-colors" />
        </div>
        <p className="text-ivory font-display text-xl md:text-2xl leading-snug">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

export default function ArtworkDetails() {
  const artwork = useArtwork();

  const dimensionStr = artwork.dimensions
    ? `${artwork.dimensions.width} × ${artwork.dimensions.height} ${artwork.dimensions.unit}`
    : artwork.size;

  return (
    <SectionWrapper id="details" className="py-24">
      <div className="mb-16 md:mb-20">
        <p className="text-gold uppercase tracking-[0.25em] text-[10px] mb-4 font-sans">
          The Specifications
        </p>
        <h2 className="font-display text-4xl text-ivory">
          Artwork Details
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DetailCard icon={Brush} label="Medium" value={artwork.medium} delay={0.1} />
        <DetailCard icon={Ruler} label="Dimensions" value={dimensionStr} delay={0.2} />
        <DetailCard icon={Calendar} label="Year Created" value={artwork.year?.toString()} delay={0.3} />
        <DetailCard icon={Palette} label="Style" value={artwork.style} delay={0.4} />
        
        <DetailCard icon={Layers} label="Materials" value={artwork.materials} delay={0.5} />
        <DetailCard icon={Tag} label="Category" value={artwork.category} delay={0.6} />
        <DetailCard icon={MapPin} label="Location" value={artwork.locationCreated || 'Artist Studio'} delay={0.7} />
        <DetailCard 
          icon={Frame} 
          label="Frame Status" 
          value={artwork.frame ? `${artwork.frame.material}, ${artwork.frame.color}` : (artwork.dimensions?.framed ? 'Included' : 'Unframed')} 
          delay={0.8} 
        />
      </div>
    </SectionWrapper>
  );
}
