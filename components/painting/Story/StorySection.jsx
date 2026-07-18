'use client';

import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import Divider from '../Shared/Divider';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function StorySection() {
  const artwork = useArtwork();

  if (!artwork.story) return null;

  const paragraphs = artwork.story.split(/\n+/).filter(Boolean);
  const editorialImage = artwork.galleryImages?.[0]?.url || artwork.mainImage;

  return (
    <SectionWrapper id="story" className="py-12 md:py-16">
      {/* 
        Container: The layout changes are strictly local to StorySection.
        We use flexbox to achieve the 42/58 split within the current grid context.
        We do NOT use fixed massive pixel widths that would break the parent grid.
      */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-[72px] items-start w-full">
        
        {/* Left Text Column (45% desktop, 100% tablet/mobile) */}
        <div className="w-full lg:w-[45%] flex flex-col pt-2 lg:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <p className="text-gold uppercase tracking-[0.25em] text-[10px] mb-6 font-sans">
              The Story Behind the Work
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-ivory leading-tight">
              A Glimpse into <br/><span className="text-gold/80 italic">the Inspiration</span>
            </h2>
          </motion.div>

          {/* Text Width & Visual Balance (locally constrained) */}
          <div className="space-y-10 max-w-[540px]">
            {paragraphs.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.15, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                /* Typography: Improve line height and drop cap */
                className={`text-warm-white/70 text-lg leading-[1.9] font-sans ${
                  idx === 0 
                    ? 'first-letter:text-[4.5rem] lg:first-letter:text-[5rem] first-letter:font-display first-letter:text-gold first-letter:float-left first-letter:mr-5 first-letter:mt-2 first-letter:leading-[0.8]' 
                    : ''
                }`}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Inline Quote */}
          {artwork.quote && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-16 pt-8 border-t border-gold/20 max-w-[540px]"
            >
              <p className="font-display text-2xl text-ivory/90 italic leading-relaxed">
                &ldquo;{artwork.quote}&rdquo;
              </p>
              {artwork.artist?.name && (
                <p className="mt-6 text-gold/60 uppercase tracking-[0.2em] text-[10px] font-sans">
                  — {artwork.artist.name}
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Right Column: Editorial Image (55% desktop) aligned with heading */}
        <div className="w-full lg:w-[55%] relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            // Image: Dominant size, sticky positioning for elegance on scroll
            className="sticky top-24 aspect-[4/5] w-full overflow-hidden border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Dark gradient overlay for luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent z-10 pointer-events-none" />
            
            <Image
              src={editorialImage}
              alt="Detail view of the artwork"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority={false}
            />
          </motion.div>
        </div>

      </div>

      <div className="mt-24 md:mt-32">
        <Divider />
      </div>
    </SectionWrapper>
  );
}
