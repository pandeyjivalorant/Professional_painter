import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import DeleteCertificateButton from './DeleteCertificateButton';

export const metadata = {
  title: 'Certificates | Admin',
};

export default async function CertificatesAdminPage() {
  const certificates = await prisma.certificate.findMany({
    where: { deletedAt: null },
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-100 m-0">Certificates</h1>
          <p className="text-slate-400 mt-1 text-sm md:text-base">Manage your certificates and awards.</p>
        </div>
        <Link
          href="/admin/certificates/new"
          className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors no-underline whitespace-nowrap"
        >
          <Plus size={16} />
          Add Certificate
        </Link>
      </div>

      {/* ── Mobile card list (hidden on md+) ── */}
      <div className="md:hidden flex flex-col gap-3">
        {certificates.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-400 text-sm">
            No certificates found. Click &ldquo;Add Certificate&rdquo; to create one.
          </div>
        ) : (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3"
            >
              {/* Thumbnail */}
              <div className="w-16 h-12 rounded-lg bg-slate-900 flex-shrink-0 overflow-hidden relative">
                <Image src={cert.imageUrl} alt={cert.title} fill className="object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 font-medium text-sm truncate m-0">{cert.title}</p>
                {cert.issuedBy && (
                  <p className="text-slate-400 text-xs mt-0.5 mb-0 truncate">By {cert.issuedBy}</p>
                )}
                {cert.issueDate && (
                  <p className="text-slate-500 text-xs mt-0.5 mb-0">
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Delete */}
              <div className="flex-shrink-0">
                <DeleteCertificateButton id={cert.id} title={cert.title} publicId={cert.cloudinaryPublicId} />
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
                {['Certificate', 'Issued By', 'Issue Date', 'Actions'].map((h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider ${
                      i === 3 ? 'text-right' : 'text-left'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {certificates.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400 text-base">
                    No certificates found. Click &ldquo;Add Certificate&rdquo; to create one.
                  </td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 rounded-lg bg-slate-900 flex-shrink-0 overflow-hidden relative">
                          <Image src={cert.imageUrl} alt={cert.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-slate-200 font-medium m-0 truncate">{cert.title}</p>
                          {cert.description && (
                            <p className="text-slate-400 text-xs mt-0.5 mb-0 max-w-[300px] truncate">
                              {cert.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{cert.issuedBy || '—'}</td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                      {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <DeleteCertificateButton id={cert.id} title={cert.title} publicId={cert.cloudinaryPublicId} />
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
