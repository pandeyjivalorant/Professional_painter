'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const IGIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
const FBIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
const LIIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
import { SectionHeader } from '../../components/UI';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', interest: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitted(true); setSubmitting(false); }, 1500);
  };

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      {/* Header */}
      <div className="py-20 border-b border-gold/10 bg-slate/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-title text-xs tracking-[0.4em] text-gold/70 uppercase mb-3">Get in Touch</p>
            <h1 className="font-display text-5xl lg:text-6xl text-ivory mb-4">The Studio is<br /><em className="gold-text">Listening</em></h1>
            <p className="text-muted max-w-lg">Inquiries about available works, commissions, exhibitions, and corporate collecting are all welcome.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle size={48} className="text-gold mb-5" />
                <h2 className="font-display text-3xl text-ivory mb-3">Message Received</h2>
                <p className="text-muted max-w-sm">Vasu or the studio team will respond within 24–48 hours. Thank you for your interest.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '', interest: '' }); }}
                  className="mt-8 text-gold text-xs tracking-widest uppercase border-b border-gold/30 pb-1 hover:border-gold transition-colors">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs tracking-[0.2em] uppercase text-gold/60 mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={e => update(field.key, e.target.value)}
                        className="w-full bg-slate/40 border border-gold/20 px-4 py-3 text-sm text-ivory placeholder:text-muted/50"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-gold/60 mb-2">I Am Interested In</label>
                  <select
                    value={form.interest}
                    onChange={e => update('interest', e.target.value)}
                    className="w-full bg-slate/40 border border-gold/20 px-4 py-3 text-sm text-ivory"
                  >
                    <option value="">Select an enquiry type</option>
                    <option>Purchasing an available work</option>
                    <option>Commissioning an original painting</option>
                    <option>Corporate art collection</option>
                    <option>Exhibition or gallery collaboration</option>
                    <option>Press or media enquiry</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-gold/60 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={form.subject}
                    onChange={e => update('subject', e.target.value)}
                    className="w-full bg-slate/40 border border-gold/20 px-4 py-3 text-sm text-ivory placeholder:text-muted/50"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-gold/60 mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Tell us about your interest, preferred budget, dimensions, or any questions you have..."
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    className="w-full bg-slate/40 border border-gold/20 px-4 py-3 text-sm text-ivory placeholder:text-muted/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gold text-obsidian text-sm tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {submitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                  ) : (
                    <><Send size={14} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact info */}
            <div className="p-6 border border-gold/20 bg-slate/20">
              <h3 className="font-title text-xs tracking-[0.3em] text-gold uppercase mb-5">Studio Information</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-ivory text-sm">Vasu Art Work</p>
                    <p className="text-muted text-sm">Via della Vigna Nuova 18<br />New Delhi, India 110029</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail size={15} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <a href="mailto:vasupande@gmail.com" className="text-ivory text-sm hover:text-gold transition-colors">vasupande@gmail.com</a>
                    <p className="text-muted text-xs mt-0.5">General enquiries</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail size={15} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <a href="mailto:vasupande@gmail.com" className="text-ivory text-sm hover:text-gold transition-colors">vasupande@gmail.com</a>
                    <p className="text-muted text-xs mt-0.5">Collector & acquisition enquiries</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone size={15} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <a href="tel:+39055123456" className="text-ivory text-sm hover:text-gold transition-colors">+91=99113=30808</a>
                    <p className="text-muted text-xs mt-0.5">Studio line</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={15} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-ivory text-sm">Mon – Fri: 10:00 – 18:00 CET</p>
                    <p className="text-muted text-xs">Closed weekends and Indian  public holidays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative overflow-hidden border border-gold/20" style={{ height: '240px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.7!2d11.2558136!3d43.7695604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a5403c6b95b55%3A0xb59d5e0af49b1e70!2sFlorence%2C%20Metropolitan%20City%20of%20Florence%2C%20Italy!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="240"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) invert(1)' }}
                allowFullScreen=""
                loading="lazy"
                title="Studio Location"
              />
            </div>

            {/* Social */}
            <div className="p-6 border border-gold/20 bg-slate/20">
              <h3 className="font-title text-xs tracking-[0.3em] text-gold uppercase mb-4">Follow the Studio</h3>
              <div className="space-y-3">
                {[
                  [IGIcon, '@vasu.art', 'Instagram', 'Follow for studio process and new works'],
                  [FBIcon, 'Vasu Art Work', 'Facebook', 'News, events, and exhibitions'],
                  [LIIcon, 'Vasu Pande', 'LinkedIn', 'Professional updates and press'],
                ].map(([Icon, handle, platform, desc]) => (
                  <a key={platform} href="#" className="flex items-center gap-3 hover:bg-gold/5 p-2 -m-2 transition-colors group">
                    <span className="text-gold"><Icon /></span>
                    <div>
                      <p className="text-ivory text-sm group-hover:text-gold transition-colors">{handle}</p>
                      <p className="text-muted text-xs">{desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
