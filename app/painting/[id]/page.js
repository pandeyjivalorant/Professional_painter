import { notFound } from 'next/navigation';
import dynamicNext from 'next/dynamic';
import prisma from '@/lib/prisma';
import { ArtworkProvider } from '@/components/painting/ArtworkContext';
import { serializePainting } from '@/lib/serializers';

export const dynamic = 'force-dynamic';

// Eager load above-the-fold components
import HeroSection from '@/components/painting/Hero/HeroSection';
import StickyInquiryCard from '@/components/painting/Inquiry/StickyInquiryCard';
import MobileInquiryBar from '@/components/painting/Inquiry/MobileInquiryBar';

// Lazy load below-the-fold and heavy components
const StorySection = dynamicNext(() => import('@/components/painting/Story/StorySection'), { ssr: true });
const ArtworkDetails = dynamicNext(() => import('@/components/painting/Shared/ArtworkDetails'), { ssr: true });
const ArtistSection = dynamicNext(() => import('@/components/painting/Artist/ArtistSection'), { ssr: true });
const RoomPreviewSection = dynamicNext(() => import('@/components/painting/RoomPreview/RoomPreviewSection'), { ssr: true });
const DimensionsSection = dynamicNext(() => import('@/components/painting/Dimensions/DimensionsSection'), { ssr: true });
const CertificateSection = dynamicNext(() => import('@/components/painting/Certificate/CertificateSection'), { ssr: true });
const CollectorExperience = dynamicNext(() => import('@/components/painting/Collector/CollectorExperience'), { ssr: true });
const SimilarArtworks = dynamicNext(() => import('@/components/painting/Similar/SimilarArtworks'), { ssr: true });
const InspirationalQuote = dynamicNext(() => import('@/components/painting/Quote/InspirationalQuote'), { ssr: true });
const FinalCTA = dynamicNext(() => import('@/components/painting/CTA/FinalCTA'), { ssr: true });

export async function generateMetadata({ params }) {
  const p = await params;
  const painting = await prisma.painting.findUnique({
    where: { id: p.id },
    include: { images: true }
  });
  
  if (!painting || painting.deletedAt) {
    return {
      title: 'Artwork Not Found',
    };
  }

  const mainImage = painting.images?.find(img => img.isMain)?.url || painting.images?.[0]?.url;

  return {
    title: `${painting.title} by Vasu Pande | Luxury Fine Art`,
    description: painting.story || painting.description,
    openGraph: {
      title: `${painting.title} - Original Masterpiece`,
      description: painting.story || painting.description,
      images: mainImage ? [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: painting.title,
        },
      ] : [],
    },
  };
}



export default async function PaintingPage({ params }) {
  const p = await params;
  
  const paintingData = await prisma.painting.findUnique({
    where: { id: p.id },
    include: { 
      images: {
        orderBy: { displayOrder: 'asc' }
      }, 
      category: true 
    }
  });

  if (!paintingData || paintingData.deletedAt) {
    notFound();
  }

  // Format painting object for the existing UI components
  const serializedPaintingData = serializePainting(paintingData);
  const painting = {
    ...serializedPaintingData,
    image: paintingData.images?.find(img => img.isMain)?.url || paintingData.images?.[0]?.url,
    mainImage: paintingData.images?.find(img => img.isMain)?.url || paintingData.images?.[0]?.url,
    galleryImages: paintingData.images?.map(img => ({ url: img.url, alt: img.alt || paintingData.title })) || [],
    artist: { name: 'Vasu Pande' },
    dimensions: {
       width: serializedPaintingData.width,
       height: serializedPaintingData.height,
       unit: paintingData.unit,
       framed: paintingData.isFramed
    },
    category: paintingData.category?.name
  };

  // Fetch similar artworks
  const relatedPaintingsData = await prisma.painting.findMany({
    where: {
      id: { not: painting.id },
      categoryId: painting.categoryId,
      deletedAt: null
    },
    include: { images: true },
    take: 4,
  });

  const recommendations = relatedPaintingsData.map(rp => ({
    ...serializePainting(rp),
    image: rp.images?.find(img => img.isMain)?.url || rp.images?.[0]?.url,
    artist: { name: 'Vasu Pande' },
    category: rp.categoryId ? painting.category : null // Simplification
  }));

  return (
    <ArtworkProvider artwork={painting}>
      <div className="bg-obsidian min-h-screen text-ivory selection:bg-gold/30 selection:text-gold-light overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
          {/* Main Grid: 12 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">
            
            {/* Left/Main Column (8 columns) */}
            <div className="col-span-1 md:col-span-8 flex flex-col gap-16 md:gap-24">
              <HeroSection />
              
              <div className="space-y-16 md:space-y-24">
                <StorySection />
                <ArtworkDetails />
                <ArtistSection />
                <RoomPreviewSection />
                <DimensionsSection />
                <CertificateSection />
              </div>
            </div>

            {/* Right/Sticky Column (4 columns) */}
            <div className="col-span-1 md:col-span-4 relative hidden md:block">
              <div className="sticky top-24">
                <StickyInquiryCard />
              </div>
            </div>
            
            <MobileInquiryBar />
          </div>
        </div>

        {/* Full-width sections at the bottom */}
        <CollectorExperience />
        <SimilarArtworks recommendations={recommendations} />
        <InspirationalQuote />
        <FinalCTA />
      </div>
    </ArtworkProvider>
  );
}
