'use client';

import { createContext, useContext } from 'react';

const ArtworkContext = createContext(null);

export function ArtworkProvider({ artwork, children }) {
  if (!artwork) {
    return null;
  }

  return (
    <ArtworkContext.Provider value={artwork}>
      {children}
    </ArtworkContext.Provider>
  );
}

export function useArtwork() {
  const context = useContext(ArtworkContext);
  if (context === null) {
    throw new Error('useArtwork must be used within an ArtworkProvider');
  }
  return context;
}
