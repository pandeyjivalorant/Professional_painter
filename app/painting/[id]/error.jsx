'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-display text-4xl text-ivory mb-4">An Unexpected Error Occurred</h2>
      <p className="text-warm-white/70 mb-8 max-w-md">
        We apologize, but there was a problem loading this gallery exhibit.
      </p>
      
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors uppercase tracking-widest text-xs"
        >
          Try Again
        </button>
        <Link 
          href="/gallery"
          className="px-6 py-3 bg-white/5 text-ivory hover:bg-white/10 transition-colors uppercase tracking-widest text-xs"
        >
          Return to Gallery
        </Link>
      </div>
    </div>
  );
}
