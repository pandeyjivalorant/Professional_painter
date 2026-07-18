'use client';

import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import Divider from '../Shared/Divider';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ArtistSection() {
  const artwork = useArtwork();
  const artist = artwork.artist;

  if (!artist?.name) return null;

  return (
    <SectionWrapper id="artist" className="py-16 md:py-24">
      <Divider className="mb-16" />

      <p className="text-gold uppercase tracking-[0.25em] text-xs mb-10 font-sans">
        About the Artist
      </p>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Portrait */}
        {artist.portrait && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-64 flex-shrink-0"
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-white/10">
              <Image
                src={artist.portrait}
                alt={artist.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            </div>
          </motion.div>
        )}

        {/* Biography */}
        <div className="flex-1 space-y-6">
          <h3 className="font-display text-3xl md:text-4xl text-ivory">
            {artist.name}
          </h3>

          {artist.bio && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-warm-white/70 text-lg leading-relaxed font-sans"
            >
              {artist.bio}
            </motion.p>
          )}

          {artist.philosophy && (
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-l-2 border-gold/40 pl-6 mt-8"
            >
              <p className="font-display text-xl text-ivory/80 italic leading-relaxed">
                &ldquo;{artist.philosophy}&rdquo;
              </p>
            </motion.blockquote>
          )}

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-white/5"
          >
            {artist.experience && (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-warm-white/40 mb-1">Experience</p>
                <p className="text-ivory text-sm font-sans">{artist.experience}</p>
              </div>
            )}
            {artist.studio && (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-warm-white/40 mb-1">Studio</p>
                <p className="text-ivory text-sm font-sans">{artist.studio}</p>
              </div>
            )}
            {artist.achievements?.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-warm-white/40 mb-1">Achievements</p>
                <ul className="text-ivory/70 text-sm font-sans space-y-1">
                  {artist.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Signature */}
          {artist.signature && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-display text-2xl text-gold/60 italic mt-8"
            >
              {artist.signature}
            </motion.p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
