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
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full font-sans">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 m-0">Add New Painting</h1>
        <p className="text-slate-400 mt-1 text-sm md:text-base">
          Upload and configure a new painting for your portfolio.
        </p>
      </div>
      <PaintingForm categories={categories} />
    </div>
  );
}
