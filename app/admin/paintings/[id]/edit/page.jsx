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
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Edit Painting</h1>
        <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
          Updating details for &ldquo;{painting.title}&rdquo;
        </p>
      </div>
      <PaintingForm initialData={safeData} categories={categories} />
    </div>
  );
}
