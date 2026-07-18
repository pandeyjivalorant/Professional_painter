'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Globe, Tv, Heart, FileText, X, Download, ExternalLink, Image } from 'lucide-react';
import { SectionHeader } from '../../components/UI';
import ImageGallery from '../../components/ImageGallery';

const CERT_FILES = [
  'certi-img-01.jpeg', 'certi-img-02.jpeg', 'certi-img-03.jpeg', 'certi-img-04.jpeg',
  'certi-img-05.jpeg', 'certi-img-06.jpeg', 'certi-img-07.jpeg', 'certi-img-08.jpeg',
  'certi-img-09.jpeg', 'certi-img-10.jpeg', 'certi-img-11.jpeg', 'certi-img-12.jpeg',
  'certi-img-13.jpeg', 'certi-img-14.jpeg', 'certi-img-15.jpeg',
];
const localCertificates = CERT_FILES.map(filename => {
  const path = `/certificate/${filename}`;
  const nameWithoutExt = filename.replace(/\.[^.]+$/, '');
  const name = nameWithoutExt.replace(/[-_]/g, ' ').replace(/(\d+)/g, ' $1').trim().replace(/\b\w/g, c => c.toUpperCase());
  return { src: path, name };
});

const CERTIFICATIONS = [
  { id: 1, title: "Master of Fine Arts", org: "Accademia di Belle Arti, Florence", year: "2003", type: "cert", description: "With distinction. Specialization in oil painting and classical techniques under Maestro Corrado Rimini.", color: "#C9A84C" },
  { id: 2, title: "Postgraduate Diploma in Painting", org: "The Slade School of Fine Art, London", year: "2005", type: "cert", description: "Advanced studies in contemporary painting practice and critical theory. First Class with Honours.", color: "#D4A5A5" },
  { id: 3, title: "Certificate of Excellence", org: "Royal Academy of Arts, London", year: "2019", type: "cert", description: "Awarded for outstanding contribution to the Summer Exhibition, selected from 12,000 submissions.", color: "#C9A84C" },
];

const AWARDS = [
  { id: 1, title: "Louvre Excellence Award", org: "Contemporary Fine Art Category", year: "2023", icon: Trophy, description: "Awarded for 'Golden Silence' — cited as a 'singular contribution to the language of mixed media painting'.", highlight: true },
  { id: 2, title: "Venice Biennale Special Mention", org: "Italian Pavilion, 59th Exhibition", year: "2022", icon: Award, description: "Special mention for the 'Tempest' series, representing 'the emotional topography of our moment'." },
  { id: 3, title: "Artist of the Year", org: "Art Basel Selection Committee", year: "2021", icon: Trophy, description: "Shortlisted among 200 international artists. Solo presentation in the Main Sector." },
  { id: 4, title: "Florence Prize for Contemporary Art", org: "City of Florence", year: "2020", icon: Award, description: "Biennial prize awarded to a Florentine artist making international impact.", highlight: false },
  { id: 5, title: "Rising Collector's Choice", org: "Christie's Post-War & Contemporary", year: "2018", icon: Award, description: "Three works auctioned above estimate, establishing Vasu as a collectible market artist." },
];

const EXHIBITIONS = [
  { title: "Louvre Museum, Paris", type: "Solo", year: "2023", desc: "Six-week solo presentation: 'Luminous Depths'. 4,200 visitors." },
  { title: "Venice Biennale", type: "Group", year: "2022", desc: "Italian Pavilion, 59th International Art Exhibition." },
  { title: "Art Basel, Basel", type: "Solo Booth", year: "2021", desc: "Main Sector. Complete sell-out of twelve works." },
  { title: "Royal Academy Summer Exhibition", type: "Selected Works", year: "2019–2024", desc: "Selected annually. Three works acquired for the RA permanent collection." },
  { title: "National Gallery, Singapore", type: "Group", year: "2020", desc: "Asia Pacific representation in 'New Voices in European Painting'." },
  { title: "Saatchi Gallery, London", type: "Solo", year: "2018", desc: "'Meridians' — debut London solo show. Full critical coverage in The Guardian and FT Weekend." },
  { title: "Galleria degli Uffizi, Florence", type: "Group", year: "2016", desc: "Invited participation in 'Contemporary Dialogue with the Masters'." },
  { title: "MoMA PS1, New York", type: "Group", year: "2015", desc: "'New European Painting' survey exhibition." },
];

const MEDIA = [
  { pub: "Financial Times Weekend", headline: "Vasu Pande and the Return of Feeling in Contemporary Painting", year: "2023", type: "Feature" },
  { pub: "The Guardian", headline: "The Florentine who paints like she's listening", year: "2022", type: "Profile" },
  { pub: "Vogue Italia", headline: "Art for the Ages: Collecting Vasu Pande", year: "2022", type: "Feature" },
  { pub: "ARTnews", headline: "Top 50 Artists to Watch", year: "2021", type: "List" },
  { pub: "Artforum", headline: "Review: 'Luminous Depths' at the Louvre", year: "2023", type: "Review" },
  { pub: "BBC Culture", headline: "Why Vasu Pande's paintings make you feel something", year: "2022", type: "Video Feature" },
  { pub: "Harper's Bazaar Art", headline: "The Artist Who Paints What Silence Sounds Like", year: "2021", type: "Profile" },
];

const APPRECIATIONS = [
  { name: "Lord Christopher Tennant", title: "Private Collector, London", text: "I have acquired four works from Vasu over the past six years. Each acquisition has proven to be both a personal joy and a sound investment. The studio experience is unmatched." },
  { name: "Dr. Mei-Lin Zhao", title: "Curator, National Gallery Singapore", text: "Working with Vasu on the 2020 exhibition was a master class in professionalism. Her curatorial intelligence matches her painterly gifts." },
  { name: "Roberto Fontaine", title: "Art Advisor, Paris & New York", text: "I recommend Vasu's work without reservation to all my clients seeking serious contemporary painting with genuine market traction." },
];

const TABS = [
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'certs', label: 'Certifications', icon: FileText },
  { id: 'awards', label: 'Awards', icon: Trophy },
  { id: 'exhibitions', label: 'Exhibitions', icon: Globe },
  { id: 'media', label: 'Media', icon: Tv },
  { id: 'appreciation', label: 'Appreciation', icon: Heart },
];

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [certModal, setCertModal] = useState(null);

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      {/* Header */}
      <div className="py-20 border-b border-gold/10 relative overflow-hidden bg-slate/10">
        <div className="absolute inset-0 canvas-texture" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-title text-xs tracking-[0.4em] text-gold/70 uppercase mb-3">Credentials</p>
            <h1 className="font-display text-5xl lg:text-6xl text-ivory mb-4">Certifications &<br /><em className="gold-text">Acknowledgments</em></h1>
            <p className="text-muted max-w-lg">A career built on consistent excellence, international recognition, and a commitment to the highest standards of fine art practice.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        {/* Tab navigation */}
        <div className="flex flex-wrap gap-1 mb-12 border-b border-gold/10 pb-px">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-xs tracking-[0.2em] uppercase transition-all border-b-2 ${
                  activeTab === tab.id ? 'border-gold text-gold' : 'border-transparent text-muted hover:text-ivory'
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Certificate Gallery */}
        {activeTab === 'gallery' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ImageGallery 
              images={localCertificates} 
              columns={3}
            />
          </motion.div>
        )}

        {/* Certifications */}
        {activeTab === 'certs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-gold/20 hover:border-gold/40 bg-slate/20 group cursor-pointer hover-lift"
                onClick={() => setCertModal(cert)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-16 border-2 flex items-center justify-center" style={{ borderColor: cert.color }}>
                    <FileText size={20} style={{ color: cert.color }} />
                  </div>
                  <span className="text-muted text-sm">{cert.year}</span>
                </div>
                <h3 className="font-display text-xl text-ivory mb-1">{cert.title}</h3>
                <p className="text-gold text-xs tracking-wider mb-3">{cert.org}</p>
                <p className="text-muted text-sm leading-relaxed">{cert.description}</p>
                <div className="mt-4 flex items-center gap-2 text-gold text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={11} /> Preview Certificate
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Awards */}
        {activeTab === 'awards' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {AWARDS.map((award, i) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-6 border flex gap-5 items-start ${award.highlight ? 'border-gold/40 bg-gold/5' : 'border-gold/10 bg-slate/20'} hover:border-gold/30 transition-colors`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center shrink-0 border ${award.highlight ? 'border-gold bg-gold/20' : 'border-gold/30'}`}>
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className={`font-display text-xl ${award.highlight ? 'text-gold' : 'text-ivory'}`}>{award.title}</h3>
                      <span className="text-muted text-sm">{award.year}</span>
                    </div>
                    <p className="text-gold/70 text-xs tracking-wider mb-2">{award.org}</p>
                    <p className="text-muted text-sm leading-relaxed">{award.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Exhibitions */}
        {activeTab === 'exhibitions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid md:grid-cols-2 gap-4">
              {EXHIBITIONS.map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="p-5 border border-gold/10 hover:border-gold/30 bg-slate/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-display text-lg text-ivory">{ex.title}</h3>
                    <div className="text-right shrink-0">
                      <div className="text-gold text-xs tracking-widest">{ex.type}</div>
                      <div className="text-muted text-xs">{ex.year}</div>
                    </div>
                  </div>
                  <p className="text-muted text-sm">{ex.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Media */}
        {activeTab === 'media' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {MEDIA.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-wrap items-center gap-4 p-5 border border-gold/10 hover:border-gold/30 bg-slate/20 transition-colors group cursor-pointer"
              >
                <div className="w-16 text-center">
                  <span className="font-title text-[10px] tracking-wider text-gold">{item.type}</span>
                  <div className="text-muted text-xs mt-0.5">{item.year}</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs tracking-[0.2em] text-gold/60 uppercase mb-1">{item.pub}</div>
                  <p className="font-display text-lg italic text-ivory">"{item.headline}"</p>
                </div>
                <ExternalLink size={14} className="text-muted group-hover:text-gold transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Client Appreciation */}
        {activeTab === 'appreciation' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-3 gap-6">
            {APPRECIATIONS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className="p-7 border border-gold/15 hover:border-gold/30 bg-slate/20 transition-colors"
              >
                <div className="w-8 h-px bg-gold mb-5" />
                <p className="font-display text-lg italic text-ivory/80 leading-relaxed mb-6">"{item.text}"</p>
                <div>
                  <div className="text-ivory text-sm font-medium">{item.name}</div>
                  <div className="text-gold/60 text-xs mt-0.5">{item.title}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {certModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setCertModal(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-slate border border-gold/30 max-w-xl w-full p-10 relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setCertModal(null)} className="absolute top-4 right-4 text-muted hover:text-ivory">
                <X size={18} />
              </button>

              {/* Certificate design */}
              <div className="border border-gold/40 p-8 text-center relative">
                <div className="absolute inset-2 border border-gold/15 pointer-events-none" />
                <p className="font-title text-[10px] tracking-[0.5em] text-gold/60 uppercase mb-4">Certificate of Achievement</p>
                <div className="w-12 h-px bg-gold mx-auto mb-6" />
                <h2 className="font-display text-3xl italic text-gold mb-3">{certModal.title}</h2>
                <p className="text-ivory/70 text-sm mb-1">Awarded by</p>
                <p className="font-title text-sm tracking-wider text-ivory">{certModal.org}</p>
                <p className="text-muted text-sm mt-2">{certModal.year}</p>
                <div className="w-12 h-px bg-gold mx-auto my-6" />
                <p className="text-muted text-sm italic leading-relaxed">{certModal.description}</p>
                <div className="mt-8 font-display text-2xl italic text-gold/80">Vasu Pande</div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 py-3 border border-gold/40 text-gold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold/10 transition-colors">
                  <Download size={12} /> Download PDF
                </button>
                <button onClick={() => setCertModal(null)} className="px-5 py-3 border border-muted/30 text-muted text-xs tracking-widest uppercase hover:text-ivory transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
