'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Award, Palette, Globe, Star, ChevronDown } from 'lucide-react';
import { PAINTINGS } from '../data/paintings';
import { PaintingCard, SectionHeader, StarRating } from '../components/UI';

const TESTIMONIALS = [
  {
    name: "Isabella Fontaine", title: "Private Collector, Paris",
    text: "Vasu's work transcends mere decoration. Owning 'Golden Silence' has changed how I experience my home — it's a meditation I return to every morning.",
    rating: 5, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80"
  },
  {
    name: "Marcus Thorne", title: "Gallery Director, London",
    text: "In twenty years of curation, I have rarely encountered an artist who commands such technical mastery while maintaining such emotional vulnerability. A true rarity.",
    rating: 5, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80"
  },
  {
    name: "Yuki Tanaka", title: "Art Advisor, Tokyo",
    text: "The authentication process, provenance documentation, and after-purchase support are exceptional. This is how luxury art collecting should work.",
    rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80"
  },
];

const STATS = [
  { value: "18+", label: "Years of Practice" },
  { value: "340+", label: "Works Sold" },
  { value: "42", label: "Exhibitions" },
  { value: "28", label: "Countries" },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = PAINTINGS.filter(p => p.featured).slice(0, 3);

  return (
    <div className="bg-obsidian">
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1800&q=85"
            alt="Vasu Pande Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
        </motion.div>

        {/* Canvas texture */}
        <div className="absolute inset-0 canvas-texture opacity-60" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-title text-xs tracking-[0.5em] text-gold/80 uppercase mb-6"
          >
            Original Fine Art — 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display font-light leading-[1.1] mb-6 text-ivory"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Where Paint<br />
            <em className="gold-text">Becomes Poetry</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-ivory/60 text-lg max-w-md leading-relaxed mb-10 font-light"
          >
            Original oil paintings, watercolors, and mixed media works. Each piece arrives with a certificate of authenticity and a story worth telling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/gallery"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-obsidian text-sm tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors group">
              Explore Gallery
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-ivory/30 text-ivory text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all">
              Commission a Work
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/30"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="py-10 border-y border-gold/10 bg-slate/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl gold-text mb-1">{stat.value}</div>
                <div className="text-muted text-xs tracking-[0.2em] uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="/vasu_DP.jpg"
                  alt="Vasu Pande in her studio"
                  className="w-full object-cover"
                  style={{ height: '600px' }}
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold/30 -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 border border-gold/20 -z-10" />
              </div>
              {/* Floating award badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 left-6 glass px-5 py-4 border border-gold/20"
              >
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-gold" />
                  <div>
                    <div className="font-title text-xs tracking-wider text-gold">Louvre Excellence Award</div>
                    <div className="text-muted text-[10px] mt-0.5">Contemporary Fine Art, 2023</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-title text-xs tracking-[0.4em] text-gold/70 uppercase mb-4">About the Artist</p>
              <h2 className="font-display text-5xl lg:text-6xl text-ivory leading-tight mb-6">
                Figurative surrealist artist <br /><em className="gold-text"></em>
              </h2>
              <div className="space-y-4 text-ivory/60 leading-relaxed">
                <p>Delhi based visual artist, she work in a number of different media and mixed media combinations. These include painting and drawing. Post graduate in fine arts ,Shri krishna university ( M.P) . Advance diploma (DCA)</p>
                <p>Displayed work in National exhibition like AIFACS and IAFA Amritsar ,many group shows and Art camps . Every painting gives a unique experience. Her work is influenced by navigate liminality , in between moments where individuals confront uncertainty,healing,self respect and growth. </p>
                <p>
                  As an artist, she works as a window through which one can look inward and outward at the same time. Ideally, the contemplation of the formal and poetic beauty of a piece reinforces a sense of connection with, and sensitivity towards, our life support system..</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Palette size={14} className="text-gold" />
                  Oil · Watercolor · Mixed Media
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Globe size={14} className="text-gold" />
                  New Delhi, India
                </div>
              </div>
              <Link href="/gallery" className="mt-8 inline-flex items-center gap-2 text-gold text-sm tracking-[0.2em] uppercase border-b border-gold/30 pb-1 hover:border-gold transition-colors group">
                View All Works
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED PAINTINGS */}
      <section className="py-24 bg-slate/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="The Collection"
            title="Featured Artworks"
            subtitle="Each painting is a singular original — signed, authenticated, and ready to become part of your world."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
            className="mb-14"
          >
            {featured.map((p, i) => (
              <div key={p.id} className="w-full flex h-full">
                <PaintingCard painting={p} index={i} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/gallery"
              className="inline-flex items-center gap-3 px-10 py-4 border border-gold/40 text-gold text-sm tracking-[0.2em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-300 group">
              View Full Gallery
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="How It Works"
            title="Collecting Made Elegant"
            subtitle="From discovery to delivery — a curated experience."
          />
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Discover', desc: 'Browse the full gallery. Filter by style, medium, or price. Preview every painting in full screen.' },
              { num: '2', title: 'Acquire', desc: 'Inquire via WhatsApp to secure the piece. Each available work ships within 5–7 business days, carefully packed.' },
              { num: '3', title: 'Authenticate', desc: 'Every piece arrives with a hand-signed certificate of authenticity and provenance documentation.' },
              { num: '4', title: 'Live With It', desc: 'The studio offers lifetime support — certificate replacement, appraisal letters, and exhibition loans.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-6 border border-gold/10 hover:border-gold/30 transition-colors group"
              >
                <div className="font-display text-6xl text-gold/10 group-hover:text-gold/20 transition-colors absolute top-4 right-4 leading-none">
                  {step.num}
                </div>
                <div className="w-8 h-px bg-gold mb-5" />
                <h3 className="font-display text-xl text-ivory mb-3">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            eyebrow="Collector Voices"
            title="What They Say"
            subtitle="The conversation between a painting and its collector continues long after acquisition."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 border border-gold/10 hover:border-gold/20 transition-colors bg-obsidian/30"
              >
                <div className="flex mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={13} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-display text-lg italic text-ivory/80 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-gold/20" />
                  <div>
                    <div className="text-ivory text-sm font-medium">{t.name}</div>
                    <div className="text-muted text-xs">{t.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-obsidian/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="font-title text-xs tracking-[0.5em] text-gold/70 uppercase mb-4">Begin Collecting</p>
          <h2 className="font-display text-5xl lg:text-6xl text-ivory mb-6 leading-tight">
            Find the Work<br />That <em className="gold-text">Speaks to You</em>
          </h2>
          <p className="text-ivory/50 text-lg leading-relaxed mb-10">
            Every original painting is a unique act of communication. The right one will ask you something.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/gallery"
              className="px-10 py-4 bg-gold text-obsidian text-sm tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors">
              Browse All Paintings
            </Link>
            <Link href="/contact"
              className="px-10 py-4 border border-ivory/30 text-ivory text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all">
              Commission a Portrait
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
