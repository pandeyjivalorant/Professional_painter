'use client';

import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import { PAINTINGS } from '@/data/paintings';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

function getRecommendations(current, allPaintings, count = 4) {
  const others = allPaintings.filter(p => p.id !== current.id);
  // ... existing scoring logic ...
  const scored = others.map(p => {
    let score = 0;
    if (p.artist?.name === current.artist?.name) score += 100;
    if (current.collection && p.collection === current.collection) score += 80;
    if (p.style === current.style) score += 60;
    const sharedColors = p.colors?.filter(c => current.colors?.includes(c)) || [];
    score += sharedColors.length * 30;
    if (p.category === current.category) score += 10;
    return { ...p, _score: score };
  });

  scored.sort((a, b) => b._score - a._score);
  return scored.slice(0, count);
}

function formatPrice(price, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function SimilarArtworks() {
  const artwork = useArtwork();
  const recommendations = getRecommendations(artwork, PAINTINGS);

  if (recommendations.length === 0) return null;

  return (
    <SectionWrapper className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-gold uppercase tracking-[0.25em] text-[10px] mb-4 font-sans">
              Collection Additions
            </p>
            <h2 className="font-display text-4xl text-ivory">
              Related Masterpieces
            </h2>
          </div>
          <Link 
            href="/gallery"
            className="text-warm-white/60 text-xs uppercase tracking-[0.2em] font-sans hover:text-gold transition-colors pb-1 border-b border-white/10 hover:border-gold"
          >
            View All Artworks
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendations.map((painting, idx) => (
            <motion.div
              key={painting.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/painting/${painting.id}`} className="group block h-full">
                <div className="relative aspect-[3/4] overflow-hidden bg-black mb-6 border border-white/5">
                  <Image
                    src={painting.mainImage || painting.image}
                    alt={painting.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  {/* Luxury Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6">
                    <span className="text-gold text-[10px] uppercase tracking-[0.25em] translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      View Details
                    </span>
                  </div>
                </div>
                
                <h4 className="font-display text-xl text-ivory group-hover:text-gold transition-colors duration-300 leading-tight mb-2">
                  {painting.title}
                </h4>
                <div className="flex justify-between items-baseline mt-4">
                  <p className="text-warm-white/40 text-xs font-sans">
                    {painting.artist?.name || 'Vasu Pande'}
                  </p>
                  <p className="text-ivory/90 text-sm font-sans tracking-wide">
                    {formatPrice(painting.price, painting.currency)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
