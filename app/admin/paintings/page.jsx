import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Image as ImageIcon, Pencil } from 'lucide-react';
import DeletePaintingButton from './DeletePaintingButton';

export const metadata = {
  title: 'Manage Paintings | Admin',
};

const statusStyle = (status) => {
  if (status === 'AVAILABLE') return { background: 'rgba(52,211,153,0.15)', color: '#34d399' };
  if (status === 'SOLD') return { background: 'rgba(248,113,113,0.15)', color: '#f87171' };
  if (status === 'RESERVED') return { background: 'rgba(251,191,36,0.15)', color: '#fbbf24' };
  return { background: 'rgba(148,163,184,0.15)', color: '#94a3b8' };
};

export default async function PaintingsAdminPage() {
  const paintings = await prisma.painting.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    include: {
      images: { where: { deletedAt: null, isMain: true }, take: 1 },
      category: true,
    },
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-100 m-0">Paintings</h1>
          <p className="text-slate-400 mt-1 text-sm md:text-base">Manage your portfolio of paintings.</p>
        </div>
        <Link
          href="/admin/paintings/new"
          className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors no-underline whitespace-nowrap"
        >
          <Plus size={16} />
          Add Painting
        </Link>
      </div>

      {/* ── Mobile card list (hidden on md+) ── */}
      <div className="md:hidden flex flex-col gap-3">
        {paintings.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-400 text-sm">
            No paintings found. Click &ldquo;Add Painting&rdquo; to create one.
          </div>
        ) : (
          paintings.map((painting) => (
            <div
              key={painting.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3"
            >
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-lg bg-slate-900 flex-shrink-0 overflow-hidden flex items-center justify-center">
                {painting.images[0]?.url ? (
                  <img src={painting.images[0].url} alt={painting.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={18} className="text-slate-500" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 font-medium text-sm truncate m-0">{painting.title}</p>
                <p className="text-slate-400 text-xs mt-0.5 mb-1 truncate">
                  {painting.category?.name || 'Uncategorized'} &bull; {painting.isPublished ? 'Published' : 'Draft'}
                </p>
                <span
                  className="px-2 py-0.5 rounded text-xs font-semibold inline-block"
                  style={statusStyle(painting.status)}
                >
                  {painting.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Link
                  href={`/admin/paintings/${painting.id}/edit`}
                  className="p-2 rounded-lg text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200 transition-colors no-underline inline-flex items-center justify-center"
                  title="Edit"
                >
                  <Pencil size={15} />
                </Link>
                <DeletePaintingButton id={painting.id} title={painting.title} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Desktop table (hidden on mobile) ── */}
      <div className="hidden md:block bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-700">
                {['Painting', 'Status', 'Price', 'Date Added', 'Actions'].map((h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider ${
                      i === 4 ? 'text-right' : 'text-left'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {paintings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400 text-base">
                    No paintings found. Click &ldquo;Add Painting&rdquo; to create one.
                  </td>
                </tr>
              ) : (
                paintings.map((painting) => (
                  <tr key={painting.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-900 flex-shrink-0 overflow-hidden flex items-center justify-center">
                          {painting.images[0]?.url ? (
                            <img src={painting.images[0].url} alt={painting.title} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={16} className="text-slate-500" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-slate-200 font-medium m-0 truncate">{painting.title}</p>
                          <p className="text-slate-400 text-xs mt-0.5 mb-0 truncate">
                            {painting.category?.name || 'Uncategorized'} &bull; {painting.isPublished ? 'Published' : 'Draft'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap inline-block"
                        style={statusStyle(painting.status)}
                      >
                        {painting.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                      {painting.price ? `${painting.price} ${painting.currency}` : '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                      {new Date(painting.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/paintings/${painting.id}/edit`}
                          className="px-4 py-2 text-sm font-medium text-slate-400 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-slate-200 transition-colors no-underline whitespace-nowrap"
                        >
                          Edit
                        </Link>
                        <DeletePaintingButton id={painting.id} title={painting.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
