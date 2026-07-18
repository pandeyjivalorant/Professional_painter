'use client';

import { useArtwork } from '../ArtworkContext';
import { motion } from 'framer-motion';

function formatPrice(price, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function MobileInquiryBar() {
  const artwork = useArtwork();
  const isAvailable = artwork.status === 'Available';

  if (!isAvailable) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 z-50 px-4 py-3 safe-area-pb"
    >
      <div className="flex items-center gap-3">
        {/* Price */}
        <div className="flex-1 min-w-0">
          <p className="text-ivory font-display text-lg truncate">{artwork.title}</p>
          <p className="text-gold font-display text-xl">
            {formatPrice(artwork.price, artwork.currency)}
          </p>
        </div>

        {/* Actions */}
        <a 
          href={`https://wa.me/919911330808?text=I am interested in acquiring the painting: ${encodeURIComponent(artwork.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 px-5 bg-gold text-obsidian text-xs uppercase tracking-[0.15em] font-sans flex items-center gap-2 hover:bg-gold-light transition-colors flex-shrink-0"
        >
          Inquire
        </a>
      </div>
    </motion.div>
  );
}
