const fs = require('fs');

const dataFile = 'd:/painter-portfolio-next/data/paintings.js';
let content = fs.readFileSync(dataFile, 'utf8');

// The file exports PAINTINGS, CATEGORIES, STYLES, SORT_OPTIONS.
// We'll replace the PAINTINGS array dynamically using regex or by eval-ing and rewriting.
// Since it's a module, we can require it if we transpile it, but since it's JS, let's just do a simple replacement if possible, or string manipulation.

// Better yet, let's write a quick script that uses regex to find the PAINTINGS array, parses it (since it's valid JS, we can eval it by stripping 'export const PAINTINGS = '), modifies it, and strings it back.

const match = content.match(/export const PAINTINGS = (\[[\s\S]*?\]);\n\nexport const CATEGORIES/);
if (match) {
  let paintingsArrayStr = match[1];
  // eval to get the array
  const paintings = eval(paintingsArrayStr);
  
  const updatedPaintings = paintings.map(p => {
    return {
      ...p,
      slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      artist: {
        name: "Vasu Pande",
        bio: "An acclaimed contemporary artist known for capturing emotional depth.",
        philosophy: "Art is the whisper of the soul.",
      },
      status: p.available ? 'Available' : 'Sold',
      currency: 'INR',
      mainImage: p.image,
      // Adding empty/placeholder fields for the new schema
      galleryImages: [], 
      roomImages: {}, 
      dimensions: {
        width: parseInt(p.size) || 24,
        height: parseInt(p.size.split('x')[1]) || 36,
        unit: 'inches',
        framed: p.size.toLowerCase().includes('with frame')
      },
      createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
      updatedAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    };
  });

  const updatedArrayStr = JSON.stringify(updatedPaintings, null, 2);
  const newContent = content.replace(match[0], `export const PAINTINGS = ${updatedArrayStr};\n\nexport const CATEGORIES`);
  
  fs.writeFileSync(dataFile, newContent, 'utf8');
  console.log('Migration complete');
} else {
  console.log('Could not match PAINTINGS array');
}
