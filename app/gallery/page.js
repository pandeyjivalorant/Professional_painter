'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3x3, LayoutGrid, X } from 'lucide-react';
import { PAINTINGS, CATEGORIES, STYLES, SORT_OPTIONS } from '../../data/paintings';
import { PaintingCard, SectionHeader, ImageModal } from '../../components/UI';

export default function GalleryPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [style, setStyle] = useState('All Styles');
  const [sort, setSort] = useState('Featured');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [layout, setLayout] = useState('grid');
  const [previewPainting, setPreviewPainting] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const searchRef = useRef(null);

  const filtered = useMemo(() => {
    let list = [...PAINTINGS];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (style !== 'All Styles') list = list.filter(p => p.style === style);
    if (availableOnly) list = list.filter(p => p.available);
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'Price: Low to High': list.sort((a, b) => a.price - b.price); break;
      case 'Price: High to Low': list.sort((a, b) => b.price - a.price); break;
      case 'Newest': list.sort((a, b) => b.year - a.year); break;
      case 'Highest Rated': list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [search, category, style, sort, availableOnly, priceRange]);

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setStyle('All Styles');
    setSort('Featured'); setAvailableOnly(false); setPriceRange([0, 100000]);
  };

  const hasFilters = search || category !== 'All' || style !== 'All Styles' || availableOnly || priceRange[1] < 100000;

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      {/* Header */}
      <div className="py-16 border-b border-gold/10 bg-slate/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-title text-xs tracking-[0.4em] text-gold/70 uppercase mb-3">The Collection</p>
            <h1 className="font-display text-5xl lg:text-6xl text-ivory mb-4">Gallery & Shop</h1>
            <p className="text-muted max-w-lg">
              {PAINTINGS.length} original artworks — oils, watercolors, and mixed media. Each signed and authenticated.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Search + Controls */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-52">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search paintings, styles, tags..."
              className="w-full bg-slate/50 border border-gold/20 pl-10 pr-4 py-3 text-sm text-ivory placeholder:text-muted/50"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ivory">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="hidden md:flex gap-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 text-xs tracking-[0.15em] uppercase transition-all ${category === cat ? 'bg-gold text-obsidian' : 'border border-gold/20 text-muted hover:text-gold hover:border-gold/40'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-slate/50 border border-gold/20 px-4 py-3 text-sm text-ivory appearance-none cursor-pointer min-w-44"
          >
            {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-3 border text-sm transition-all ${filtersOpen ? 'border-gold bg-gold/10 text-gold' : 'border-gold/20 text-muted hover:border-gold/40 hover:text-ivory'}`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {hasFilters && <span className="w-2 h-2 rounded-full bg-gold" />}
          </button>

          {/* Layout toggle */}
          <div className="flex border border-gold/20">
            <button onClick={() => setLayout('grid')}
              className={`p-3 transition-colors ${layout === 'grid' ? 'bg-gold/20 text-gold' : 'text-muted hover:text-ivory'}`}>
              <Grid3x3 size={15} />
            </button>
            <button onClick={() => setLayout('masonry')}
              className={`p-3 transition-colors ${layout === 'masonry' ? 'bg-gold/20 text-gold' : 'text-muted hover:text-ivory'}`}>
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>

        {/* Expandable Filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-6 border border-gold/20 bg-slate/30 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Style */}
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-gold/60 mb-3">Style</label>
                  <div className="space-y-2">
                    {STYLES.map(s => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="style" checked={style === s} onChange={() => setStyle(s)}
                          className="accent-gold" />
                        <span className={`text-sm transition-colors ${style === s ? 'text-gold' : 'text-muted group-hover:text-ivory'}`}>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile categories */}
                <div className="md:hidden">
                  <label className="block text-xs tracking-[0.2em] uppercase text-gold/60 mb-3">Medium</label>
                  <div className="space-y-2">
                    {CATEGORIES.map(c => (
                      <label key={c} className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="cat" checked={category === c} onChange={() => setCategory(c)} className="accent-gold" />
                        <span className={`text-sm ${category === c ? 'text-gold' : 'text-muted group-hover:text-ivory'}`}>{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-gold/60 mb-3">
                    Price Range: <span className="text-gold">${priceRange[0].toLocaleString()} — ${priceRange[1].toLocaleString()}</span>
                  </label>
                  <div className="space-y-3">
                    <input type="range" min="0" max="100000" step="1000" value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-full accent-gold" />
                    <div className="flex gap-3 text-xs text-muted">
                       <span>₹0</span><span className="ml-auto">₹100,000+</span>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-gold/60 mb-3">Availability</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="accent-gold" />
                    <span className="text-sm text-muted">Available Only</span>
                  </label>
                </div>

                {/* Clear */}
                {hasFilters && (
                  <div className="flex items-end">
                    <button onClick={clearFilters} className="text-rose text-xs tracking-widest uppercase flex items-center gap-2 hover:text-rose/80">
                      <X size={12} /> Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted text-sm">
            <span className="text-ivory font-medium">{filtered.length}</span> works
            {hasFilters && <button onClick={clearFilters} className="ml-3 text-gold text-xs hover:underline">Clear filters</button>}
          </p>
        </div>

        {/* Grid / Masonry */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-ivory/30 italic mb-4">No works found</p>
            <button onClick={clearFilters} className="text-gold text-sm tracking-widest uppercase underline-offset-4 hover:underline">
              Clear Filters
            </button>
          </div>
        ) : layout === 'masonry' ? (
          <div className="masonry">
            {filtered.map((p, i) => (
              <div key={p.id} className="masonry-item">
                <PaintingCard painting={p} onPreview={setPreviewPainting} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <PaintingCard key={p.id} painting={p} onPreview={setPreviewPainting} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen preview modal */}
      {previewPainting && (
        <ImageModal painting={previewPainting} onClose={() => setPreviewPainting(null)} />
      )}
    </div>
  );
}
