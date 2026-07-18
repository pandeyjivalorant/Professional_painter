import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-display text-8xl text-gold mb-6 opacity-50">404</h1>
      <h2 className="font-display text-4xl text-ivory mb-4">Artwork Not Found</h2>
      <p className="text-warm-white/70 mb-12 max-w-md">
        The masterpiece you are looking for has been moved, sold to a private collector, or does not exist.
      </p>
      
      <Link 
        href="/gallery"
        className="px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors uppercase tracking-[0.2em] text-sm"
      >
        Explore the Gallery
      </Link>
    </div>
  );
}
