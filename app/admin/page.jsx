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
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 m-0">
          Welcome back, {session?.user?.name || 'Admin'}
        </h1>
        <p className="text-slate-400 mt-1 text-sm md:text-base">
          Here&apos;s what&apos;s happening with your portfolio today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 md:p-6 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: stat.iconBg }}
              >
                <Icon size={22} color={stat.iconColor} />
              </div>
              <div>
                <p className="text-slate-400 text-xs md:text-sm font-medium m-0">{stat.name}</p>
                <p className="text-slate-100 text-xl md:text-2xl font-bold mt-1 mb-0">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Paintings */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="p-4 md:px-6 md:py-5 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-slate-100 text-sm md:text-base font-semibold m-0">
            Recent Paintings
          </h2>
          <Link
            href="/admin/paintings"
            className="text-blue-400 text-xs md:text-sm font-medium hover:text-blue-300 transition-colors no-underline"
          >
            View All →
          </Link>
        </div>

        {recentPaintings.length === 0 ? (
          <div className="p-8 md:p-10 text-center text-slate-400 text-sm md:text-base">
            No paintings yet. Add your first painting!
          </div>
        ) : (
          recentPaintings.map((painting, i) => (
            <div
              key={painting.id}
              className={`p-4 md:px-6 md:py-4 flex items-center gap-3 md:gap-4 ${
                i < recentPaintings.length - 1 ? 'border-b border-slate-700' : ''
              }`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-slate-900 flex-shrink-0 overflow-hidden flex items-center justify-center">
                {painting.images[0]?.url ? (
                  <img
                    src={painting.images[0].url}
                    alt={painting.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={20} className="text-slate-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 font-medium m-0 text-sm md:text-base truncate">
                  {painting.title}
                </p>
                <p className="text-slate-400 text-xs md:text-sm mt-0.5 mb-0">
                  {painting.status} &bull; {painting.isPublished ? 'Published' : 'Draft'}
                </p>
              </div>
              <Link
                href={`/admin/paintings/${painting.id}/edit`}
                className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-slate-400 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-slate-200 transition-colors no-underline whitespace-nowrap"
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
