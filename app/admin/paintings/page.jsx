import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Image as ImageIcon } from 'lucide-react';
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
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Paintings</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>Manage your portfolio of paintings.</p>
        </div>
        <Link
          href="/admin/paintings/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#3b82f6',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          <Plus size={16} />
          Add Painting
        </Link>
      </div>

      {/* Table */}
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155' }}>
                {['Painting', 'Status', 'Price', 'Date Added', 'Actions'].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: '12px 20px',
                      color: '#64748b',
                      fontWeight: 600,
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      textAlign: i === 4 ? 'right' : 'left',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paintings.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '48px 20px', textAlign: 'center', color: '#64748b' }}>
                    No paintings found. Click &ldquo;Add Painting&rdquo; to create one.
                  </td>
                </tr>
              ) : (
                paintings.map((painting, i) => (
                  <tr
                    key={painting.id}
                    style={{
                      borderBottom: i < paintings.length - 1 ? '1px solid #1e293b' : 'none',
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '8px',
                            background: '#0f172a',
                            flexShrink: 0,
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {painting.images[0]?.url ? (
                            <img src={painting.images[0].url} alt={painting.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <ImageIcon size={16} color="#475569" />
                          )}
                        </div>
                        <div>
                          <p style={{ color: '#e2e8f0', fontWeight: 500, margin: 0, whiteSpace: 'nowrap' }}>{painting.title}</p>
                          <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0 0' }}>
                            {painting.category?.name || 'Uncategorized'} &bull; {painting.isPublished ? 'Published' : 'Draft'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span
                        style={{
                          ...statusStyle(painting.status),
                          padding: '3px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {painting.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {painting.price ? `${painting.price} ${painting.currency}` : '—'}
                    </td>
                    <td style={{ padding: '14px 20px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {new Date(painting.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <Link
                          href={`/admin/paintings/${painting.id}/edit`}
                          style={{
                            padding: '5px 14px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#94a3b8',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            background: 'transparent',
                            whiteSpace: 'nowrap',
                          }}
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
