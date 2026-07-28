import prisma from '@/lib/prisma';
import GalleryClient from '@/components/gallery/GalleryClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Gallery | Vasu Pande Fine Art',
  description: 'Explore the full collection of original paintings and mixed media works by Vasu Pande.',
};

export default async function GalleryPage() {
  const paintingsData = await prisma.painting.findMany({
    where: { isPublished: true },
    include: {
      images: { orderBy: { displayOrder: 'asc' } },
      category: true
    },
    orderBy: { displayOrder: 'asc' }
  });

  // Format data for the client component
  const initialPaintings = paintingsData.map(p => ({
    ...p,
    price: p.price ? Number(p.price) : null,
    originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
    thumbnail: p.images?.find(img => img.isMain)?.url || p.images?.[0]?.url,
    artist: { name: 'Vasu Pande' },
    category: p.category?.name || 'Uncategorized',
    tags: p.tags || []
  }));

  return <GalleryClient initialPaintings={initialPaintings} />;
}
