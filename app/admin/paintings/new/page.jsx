import prisma from '@/lib/prisma';
import PaintingForm from '@/components/admin/PaintingForm';

export const metadata = {
  title: 'Add Painting | Admin',
};

export default async function NewPaintingPage() {
  const categories = await prisma.category.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
  });

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Add New Painting</h1>
        <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
          Upload and configure a new painting for your portfolio.
        </p>
      </div>
      <PaintingForm categories={categories} />
    </div>
  );
}
