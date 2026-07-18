'use client';

import Image from 'next/image';
import { cn } from '@/components/ui/utils';

export function ThumbnailStrip({ images, activeIndex, onSelect }) {
  if (!images || images.length <= 1) return null;

  return (
    <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar py-4 md:py-0 md:px-2 md:max-h-[85vh]">
      {images.map((img, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={cn(
            "relative w-20 h-28 md:w-24 md:h-36 flex-shrink-0 transition-all duration-500 overflow-hidden",
            activeIndex === idx 
              ? "opacity-100 scale-100 shadow-[0_0_20px_rgba(201,162,39,0.3)]" 
              : "opacity-40 scale-95 hover:opacity-100 hover:scale-100"
          )}
          aria-label={`View image ${idx + 1}`}
        >
          {/* Animated Gold Border */}
          <div className={cn(
            "absolute inset-0 border transition-colors duration-500 z-10 pointer-events-none",
            activeIndex === idx ? "border-gold/80" : "border-white/10"
          )} />
          
          <Image
            src={img.url}
            alt={img.alt || `Thumbnail ${idx + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, 96px"
          />
        </button>
      ))}
    </div>
  );
}
