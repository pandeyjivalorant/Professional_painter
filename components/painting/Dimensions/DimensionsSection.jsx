'use client';

import { useArtwork } from '../ArtworkContext';
import SectionWrapper from '../Shared/SectionWrapper';
import { motion } from 'framer-motion';

export default function DimensionsSection() {
  const artwork = useArtwork();
  const dims = artwork.dimensions;

  if (!dims) return null;

  // Scale factors for the SVG visualization
  const maxPaintingVisual = 220;
  const humanHeight = 240;
  const ratio = dims.width / dims.height;
  let paintW, paintH;
  
  if (ratio > 1) {
    paintW = maxPaintingVisual;
    paintH = maxPaintingVisual / ratio;
  } else {
    paintH = maxPaintingVisual;
    paintW = maxPaintingVisual * ratio;
  }

  // Vertically center the painting on the wall
  const wallY = 40;
  const paintX = 220 - paintW / 2;
  const paintY = wallY + 80;

  return (
    <SectionWrapper id="dimensions" className="py-24 border-t border-white/5 bg-obsidian">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-[0.25em] text-[10px] mb-4 font-sans">
            Scale & Proportion
          </p>
          <h2 className="font-display text-4xl text-ivory">
            Dimensions
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Specifications Panel */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1">
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="pb-8 border-b border-white/10"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-warm-white/40 mb-2">Width</p>
                <p className="text-ivory font-display text-5xl">{dims.width}<span className="text-xl text-warm-white/40 ml-2">{dims.unit}</span></p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="pb-8 border-b border-white/10"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-warm-white/40 mb-2">Height</p>
                <p className="text-ivory font-display text-5xl">{dims.height}<span className="text-xl text-warm-white/40 ml-2">{dims.unit}</span></p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-8"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-warm-white/40 mb-2">Framed</p>
                  <p className="text-ivory/90 text-sm font-sans">{dims.framed ? 'Included' : 'Unframed'}</p>
                </div>
                {artwork.frame?.material && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-warm-white/40 mb-2">Material</p>
                    <p className="text-ivory/90 text-sm font-sans">{artwork.frame.material}</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Blueprint Visualization */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-[#0a0a0a] p-8 border border-white/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
              style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }}
            >
              <svg
                viewBox="0 0 440 380"
                className="w-full h-auto drop-shadow-2xl"
                role="img"
                aria-label={`Artwork dimensions: ${dims.width} by ${dims.height} ${dims.unit}`}
              >
                {/* Wall Base */}
                <line x1="20" y1={wallY + 300} x2="420" y2={wallY + 300} stroke="#333" strokeWidth="1" />

                {/* Painting */}
                <rect
                  x={paintX}
                  y={paintY}
                  width={paintW}
                  height={paintH}
                  fill="#C9A227"
                  fillOpacity="0.1"
                  stroke="#C9A227"
                  strokeWidth="2"
                />
                
                {/* Blueprint lines */}
                {/* Width */}
                <line x1={paintX} y1={paintY - 15} x2={paintX + paintW} y2={paintY - 15} stroke="#C9A227" strokeWidth="1" opacity="0.5" strokeDasharray="4 4" />
                <line x1={paintX} y1={paintY - 20} x2={paintX} y2={paintY - 10} stroke="#C9A227" strokeWidth="1" opacity="0.8" />
                <line x1={paintX + paintW} y1={paintY - 20} x2={paintX + paintW} y2={paintY - 10} stroke="#C9A227" strokeWidth="1" opacity="0.8" />
                <text x={paintX + paintW / 2} y={paintY - 25} textAnchor="middle" className="fill-gold text-[12px] font-sans tracking-widest">{dims.width}{dims.unit}</text>

                {/* Height */}
                <line x1={paintX + paintW + 15} y1={paintY} x2={paintX + paintW + 15} y2={paintY + paintH} stroke="#C9A227" strokeWidth="1" opacity="0.5" strokeDasharray="4 4" />
                <line x1={paintX + paintW + 10} y1={paintY} x2={paintX + paintW + 20} y2={paintY} stroke="#C9A227" strokeWidth="1" opacity="0.8" />
                <line x1={paintX + paintW + 10} y1={paintY + paintH} x2={paintX + paintW + 20} y2={paintY + paintH} stroke="#C9A227" strokeWidth="1" opacity="0.8" />
                <text x={paintX + paintW + 30} y={paintY + paintH / 2 + 4} className="fill-gold text-[12px] font-sans tracking-widest">{dims.height}{dims.unit}</text>

                {/* Human Silhouette (Elegant minimalist) */}
                <g transform={`translate(80, ${wallY + 300 - humanHeight})`} opacity="0.4">
                  <circle cx="20" cy="15" r="14" fill="none" stroke="#F8F5F0" strokeWidth="1.5" />
                  <path d="M 20 29 C 10 50, 5 90, 5 120 C 5 150, 10 240, 10 240 M 20 29 C 30 50, 35 90, 35 120 C 35 150, 30 240, 30 240" fill="none" stroke="#F8F5F0" strokeWidth="1.5" />
                  <path d="M 12 50 C 0 80, -5 120, -5 120 M 28 50 C 40 80, 45 120, 45 120" fill="none" stroke="#F8F5F0" strokeWidth="1.5" />
                </g>
                <text x="100" y={wallY + 300 + 25} className="fill-warm-white/40 text-[10px] uppercase tracking-[0.2em] font-sans" textAnchor="middle">
                  5'7" / 170cm
                </text>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
