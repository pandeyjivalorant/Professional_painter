import prisma from '@/lib/prisma';
import HomePageClient from '@/components/home/HomePageClient';

import { serializePainting } from '@/lib/serializers';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vasu Pande | Fine Art Studio & Gallery',
  description: 'Original fine art, contemporary paintings, and mixed media works by Vasu Pande.',
};

export default async function HomePage() {
  // Fetch featured paintings from the database
  const featuredPaintingsData = await prisma.painting.findMany({
    where: { isFeatured: true },
    include: { images: { orderBy: { displayOrder: 'asc' } } },
    take: 3,
  });

  const featuredPaintings = featuredPaintingsData.map(p => ({
    ...serializePainting(p),
    image: p.images?.find(img => img.isMain)?.url || p.images?.[0]?.url,
    thumbnail: p.images?.find(img => img.isMain)?.url || p.images?.[0]?.url,
    artist: { name: 'Vasu Pande' }
  }));

  return <HomePageClient featuredPaintings={featuredPaintings} />;
}
