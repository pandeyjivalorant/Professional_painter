'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const SocialIcon = ({ href, label, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="w-9 h-9 border border-gold/20 flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-all">
    {children}
  </a>
);

const IGIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
const FBIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
const YTIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
const LIIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;

// X (Twitter) icon custom
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.626 5.907-5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PinterestIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const BehanceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.726-3h3.543c-.062-1.169-.521-2.543-1.761-2.543-1.357 0-1.725 1.374-1.782 2.543zm-11.726-7h3.5c3.5 0 5.5 1 5.5 3.5 0 1.5-.9 2.5-2 3C12 13.2 13 14.5 13 16c0 3-2 4-5.5 4H4V7zm3.726 5H10c1.5 0 2-.5 2-1.5S11.5 9 10 9H7.726v3zm0 5H10.5c1.5 0 2.5-.5 2.5-1.5S12 14 10.5 14H7.726v3z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-slate border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center">
                <Palette size={16} className="text-gold" />
              </div>
              <div>
                <div className="font-title text-sm tracking-[0.2em] text-ivory">VASU ART WORK</div>
                <div className="text-[10px] tracking-[0.3em] text-gold/60 uppercase">Fine Art Studio</div>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Original paintings by Vasu Pande — collector-grade artworks shipped with certificate of authenticity and lifetime support.
            </p>
            <div className="flex gap-2 flex-wrap">
              <SocialIcon href="#" label="Instagram"><IGIcon /></SocialIcon>
              <SocialIcon href="#" label="Facebook"><FBIcon /></SocialIcon>
              <SocialIcon href="#" label="X / Twitter"><XIcon /></SocialIcon>
              <SocialIcon href="#" label="YouTube"><YTIcon /></SocialIcon>
              <SocialIcon href="#" label="LinkedIn"><LIIcon /></SocialIcon>
              <SocialIcon href="#" label="Pinterest"><PinterestIcon /></SocialIcon>
              <SocialIcon href="#" label="Behance"><BehanceIcon /></SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-title text-xs tracking-[0.25em] text-gold/80 mb-5 uppercase">Explore</h3>
            <ul className="space-y-3">
              {[
                ['Home', '/'],
                ['Gallery & Shop', '/gallery'],
                ['Painting Details', '/gallery'],
                ['Certifications', '/certifications'],
                ['Contact Studio', '/contact'],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link href={to} className="text-muted text-sm hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-3 h-px bg-gold/30 group-hover:w-5 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-title text-xs tracking-[0.25em] text-gold/80 mb-5 uppercase">Customer Care</h3>
            <ul className="space-y-3">
              {[
                ['Shipping Policy', '/'],
                ['Authentication', '/certifications'],
                ['Commission a Work', '/contact'],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link href={to} className="text-muted text-sm hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-3 h-px bg-gold/30 group-hover:w-5 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="font-title text-xs tracking-[0.25em] text-gold/80 mb-5 uppercase">Studio</h3>
            <ul className="space-y-3 mb-7">
              <li className="flex items-start gap-3">
                <MapPin size={13} className="text-gold mt-0.5 shrink-0" />
                <span className="text-muted text-sm"> C-5/1, Safderjung development area <br />New, Delhi 110016</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={13} className="text-gold shrink-0" />
                <a href="mailto:vasupande@gmail.com" className="text-muted text-sm hover:text-gold transition-colors">Vasuartgallery0@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={13} className="text-gold shrink-0" />
                <a href="tel:+39055123456" className="text-muted text-sm hover:text-gold transition-colors">+91-99113-30808</a>
              </li>
            </ul>

            <h3 className="font-title text-xs tracking-[0.25em] text-gold/80 mb-3 uppercase">Newsletter</h3>
            {subscribed ? (
              <p className="text-gold text-sm font-display italic">Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-obsidian/60 border border-gold/20 px-3 py-2 text-sm text-ivory placeholder:text-muted/50 focus:border-gold outline-none transition-colors"
                />
                <button type="submit" className="px-3 py-2 bg-gold text-obsidian hover:bg-gold-light transition-colors">
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="divider-gold mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-muted text-xs tracking-wide">
            © 2026 Vasu Art Work. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Sale', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="text-muted text-xs hover:text-gold transition-colors tracking-wide">{item}</a>
            ))}
          </div>
          <p className="text-muted/50 text-xs tracking-wide">
            Worldwide shipping
          </p>
        </div>
      </div>
    </footer>
  );
}
