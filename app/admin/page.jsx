import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Image as ImageIcon, CheckCircle, Award, Mail } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  const [totalPaintings, publishedPaintings, totalCertificates, unreadMessages] = await Promise.all([
    prisma.painting.count({ where: { deletedAt: null } }),
    prisma.painting.count({ where: { deletedAt: null, isPublished: true } }),
    prisma.certificate.count({ where: { deletedAt: null } }),
    prisma.contactMessage.count({ where: { deletedAt: null, isRead: false } }),
  ]);

  const recentPaintings = await prisma.painting.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      images: { where: { deletedAt: null, isMain: true }, take: 1 },
    },
  });

  const statCards = [
    { name: 'Total Paintings', value: totalPaintings, icon: ImageIcon, iconColor: '#60a5fa', iconBg: 'rgba(59,130,246,0.15)' },
    { name: 'Published', value: publishedPaintings, icon: CheckCircle, iconColor: '#34d399', iconBg: 'rgba(52,211,153,0.15)' },
    { name: 'Certificates', value: totalCertificates, icon: Award, iconColor: '#a78bfa', iconBg: 'rgba(167,139,250,0.15)' },
    { name: 'Unread Messages', value: unreadMessages, icon: Mail, iconColor: '#fbbf24', iconBg: 'rgba(251,191,36,0.15)' },
  ];

  const card = { background: '#1e293b', border: '1px solid #334155', borderRadius: '12px' };

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
          Welcome back, {session?.user?.name || 'Admin'}
        </h1>
        <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
          Here&apos;s what&apos;s happening with your portfolio today.
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              style={{ ...card, padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: stat.iconBg,
                  flexShrink: 0,
                }}
              >
                <Icon size={22} color={stat.iconColor} />
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '13px', fontWeight: 500, margin: 0 }}>{stat.name}</p>
                <p style={{ color: '#f1f5f9', fontSize: '26px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Paintings */}
      <div style={{ ...card, overflow: 'hidden' }}>
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ color: '#f1f5f9', fontSize: '16px', fontWeight: 600, margin: 0 }}>
            Recent Paintings
          </h2>
          <Link
            href="/admin/paintings"
            style={{ color: '#60a5fa', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
          >
            View All →
          </Link>
        </div>

        {recentPaintings.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No paintings yet. Add your first painting!
          </div>
        ) : (
          recentPaintings.map((painting, i) => (
            <div
              key={painting.id}
              style={{
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderBottom: i < recentPaintings.length - 1 ? '1px solid #1e293b' : 'none',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
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
                  <img
                    src={painting.images[0].url}
                    alt={painting.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <ImageIcon size={20} color="#475569" />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: '#e2e8f0',
                    fontWeight: 500,
                    margin: 0,
                    fontSize: '14px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {painting.title}
                </p>
                <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0 0' }}>
                  {painting.status} &bull; {painting.isPublished ? 'Published' : 'Draft'}
                </p>
              </div>
              <Link
                href={`/admin/paintings/${painting.id}/edit`}
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#94a3b8',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  background: 'transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
