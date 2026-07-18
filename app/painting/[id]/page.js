import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PAINTINGS } from '@/data/paintings';
import { ArtworkProvider } from '@/components/painting/ArtworkContext';

// Eager load above-the-fold components
import HeroSection from '@/components/painting/Hero/HeroSection';
import StickyInquiryCard from '@/components/painting/Inquiry/StickyInquiryCard';
import MobileInquiryBar from '@/components/painting/Inquiry/MobileInquiryBar';

// Lazy load below-the-fold and heavy components
const StorySection = dynamic(() => import('@/components/painting/Story/StorySection'), { ssr: true });
const ArtworkDetails = dynamic(() => import('@/components/painting/Shared/ArtworkDetails'), { ssr: true });
const ArtistSection = dynamic(() => import('@/components/painting/Artist/ArtistSection'), { ssr: true });
const EveryAngleGallery = dynamic(() => import('@/components/painting/Gallery/EveryAngleGallery'), { ssr: true });
const RoomPreviewSection = dynamic(() => import('@/components/painting/RoomPreview/RoomPreviewSection'), { ssr: true });
const DimensionsSection = dynamic(() => import('@/components/painting/Dimensions/DimensionsSection'), { ssr: true });
const CertificateSection = dynamic(() => import('@/components/painting/Certificate/CertificateSection'), { ssr: true });
const CollectorExperience = dynamic(() => import('@/components/painting/Collector/CollectorExperience'), { ssr: true });
const SimilarArtworks = dynamic(() => import('@/components/painting/Similar/SimilarArtworks'), { ssr: true });
const InspirationalQuote = dynamic(() => import('@/components/painting/Quote/InspirationalQuote'), { ssr: true });
const FinalCTA = dynamic(() => import('@/components/painting/CTA/FinalCTA'), { ssr: true });

export async function generateMetadata({ params }) {
  const p = await params;
  const painting = PAINTINGS.find((p_item) => p_item.id.toString() === p.id);
  
  if (!painting) {
    return {
      title: 'Artwork Not Found',
    };
  }

  return {
    title: `${painting.title} by ${painting.artist?.name || 'Vasu Pande'} | Luxury Fine Art`,
    description: painting.story || painting.description,
    openGraph: {
      title: `${painting.title} - Original Masterpiece`,
      description: painting.story || painting.description,
      images: [
        {
          url: painting.mainImage || painting.image,
          width: 1200,
          height: 630,
          alt: painting.title,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  const featured = PAINTINGS.filter(p => p.featured);
  return featured.map((painting) => ({
    id: painting.id.toString(),
  }));
}

export default async function PaintingPage({ params }) {
  const p = await params;
  const painting = PAINTINGS.find((p_item) => p_item.id.toString() === p.id);

  if (!painting) {
    notFound();
  }

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
                <EveryAngleGallery />
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
        <SimilarArtworks />
        <InspirationalQuote />
        <FinalCTA />
      </div>
    </ArtworkProvider>
  );
}

