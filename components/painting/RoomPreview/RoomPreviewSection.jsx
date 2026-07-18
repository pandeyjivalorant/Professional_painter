'use client';

import { useState } from 'react';
import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const ROOM_LABELS = {
  livingRoom: 'Living Room',
  bedroom: 'Bedroom',
  office: 'Office',
  gallery: 'Gallery',
  luxuryVilla: 'Luxury Villa',
  hallway: 'Hallway',
};

export default function RoomPreviewSection() {
  const artwork = useArtwork();
  const roomImages = artwork.roomImages;

  const availableRooms = roomImages
    ? Object.entries(roomImages).filter(([, url]) => url)
    : [];

  const [selectedRoom, setSelectedRoom] = useState(
    availableRooms.length > 0 ? availableRooms[0][0] : null
  );

  if (availableRooms.length === 0) return null;

  const currentImage = roomImages[selectedRoom];

  return (
    <SectionWrapper id="room-preview" className="py-24">
      <div className="mb-12 text-center">
        <p className="text-gold uppercase tracking-[0.25em] text-[10px] mb-4 font-sans">
          In Your Space
        </p>
        <h2 className="font-display text-4xl text-ivory">
          Imagine the Possibilities
        </h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Animated Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 p-2 border border-white/10 bg-black/40 rounded-full backdrop-blur-md">
          {availableRooms.map(([key]) => {
            const isActive = selectedRoom === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedRoom(key)}
                className={`relative px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-sans transition-colors duration-300 rounded-full ${
                  isActive ? 'text-obsidian font-medium' : 'text-warm-white/60 hover:text-ivory'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeRoomTab"
                    className="absolute inset-0 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{ROOM_LABELS[key] || key}</span>
              </button>
            );
          })}
        </div>

        {/* Room Image */}
        <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRoom}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage}
                alt={`${artwork.title} in ${ROOM_LABELS[selectedRoom] || selectedRoom}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
