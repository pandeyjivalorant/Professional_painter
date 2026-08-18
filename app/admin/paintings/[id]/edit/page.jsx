import prisma from '@/lib/prisma';
import PaintingForm from '@/components/admin/PaintingForm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Painting | Admin',
};

export default async function EditPaintingPage({ params }) {
  const { id } = await params;

  const [painting, categories] = await Promise.all([
    prisma.painting.findUnique({
      where: { id },
      include: {
        images: {
          where: { deletedAt: null },
          orderBy: { displayOrder: 'asc' },
        },
      },
    }),
    prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    }),
  ]);

  if (!painting || painting.deletedAt) {
    notFound();
  }

  const safeData = {
    ...painting,
    price: painting.price ? Number(painting.price) : '',
    originalPrice: painting.originalPrice ? Number(painting.originalPrice) : '',
    width: painting.width ? Number(painting.width) : '',
    height: painting.height ? Number(painting.height) : '',
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full font-sans">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 m-0">Edit Painting</h1>
        <p className="text-slate-400 mt-1 text-sm md:text-base">
          Updating details for &ldquo;{painting.title}&rdquo;
        </p>
      </div>
      <PaintingForm initialData={safeData} categories={categories} />
    </div>
  );
}
