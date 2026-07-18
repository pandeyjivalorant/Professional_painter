'use client';

import SectionWrapper from '../Shared/SectionWrapper';
import { ShieldCheck, Truck, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const BENEFITS = [
  {
    icon: Package,
    title: 'Museum-Grade Packaging',
    description: 'Each artwork is carefully wrapped in acid-free tissue, padded with custom foam inserts, and shipped in a reinforced wooden crate designed to protect original fine art.',
  },
  {
    icon: Truck,
    title: 'Worldwide Insured Shipping',
    description: 'We ship to collectors globally with full insurance coverage and real-time tracking. Your masterpiece is protected from our studio to your doorstep.',
  },
  {
    icon: ShieldCheck,
    title: 'Lifetime Authenticity',
    description: 'Every painting comes with a signed Certificate of Authenticity, a unique provenance record, and lifetime verification support from the artist.',
  },
];

export default function CollectorExperience() {
  return (
    <SectionWrapper className="py-24 md:py-32 bg-obsidian">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-gold uppercase tracking-[0.25em] text-[10px] mb-6 font-sans">
            The Collector Experience
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory">
            Beyond the Artwork
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {BENEFITS.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative p-10 md:p-14 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500 overflow-hidden"
            >
              {/* Subtle radial glow on hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold opacity-0 group-hover:opacity-[0.15] blur-[50px] transition-opacity duration-700 pointer-events-none" />

              <benefit.icon className="w-10 h-10 text-gold mb-8 relative z-10" />
              <h3 className="font-display text-2xl text-ivory mb-4 relative z-10">
                {benefit.title}
              </h3>
              <p className="text-warm-white/50 text-sm font-sans leading-[1.8] relative z-10">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
