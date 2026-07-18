'use client';

  import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Palette } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Certifications', to: '/certifications' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = { pathname: usePathname() };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : ''}`}
        style={{ background: scrolled ? '' : 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, transparent 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors">
              <Palette size={16} className="text-gold" />
            </div>
            <div>
              <div className="font-title text-sm tracking-[0.2em] text-ivory leading-none">VASU ART WORK</div>
              <div className="text-[10px] tracking-[0.3em] text-gold/70 uppercase leading-none mt-0.5">Fine Art Studio</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                href={link.to}
                className="relative text-sm tracking-[0.12em] uppercase font-light text-ivory/80 hover:text-ivory transition-colors group"
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2 border border-gold/40 text-gold text-xs tracking-[0.15em] uppercase hover:bg-gold/10 transition-colors">
              Contact Me
            </Link>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-ivory/70 hover:text-ivory">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-0 z-40 bg-obsidian pt-20"
          >
            <div className="flex flex-col items-center justify-center h-full gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={link.to} className="font-display text-4xl italic text-ivory/90 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Link href="/contact" className="mt-4 px-8 py-3 border border-gold text-gold text-sm tracking-widest uppercase">
                  Contact Me
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
}
