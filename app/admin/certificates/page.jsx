import prisma from '@/lib/prisma';
import Image from 'next/image';
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
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 m-0">Certificates</h1>
        <p className="text-slate-400 mt-1 text-sm md:text-base">Manage your certificates and awards.</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-700">
                {['Certificate', 'Issued By', 'Issue Date', 'Actions'].map((h, i) => (
                  <th
                    key={h}
                    className={`p-3 md:px-5 md:py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider ${
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
                  <td colSpan={4} className="p-8 md:p-12 text-center text-slate-400 text-sm md:text-base">
                    No certificates found.
                  </td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="p-3 md:px-5 md:py-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-16 h-12 md:w-20 md:h-14 rounded-lg bg-slate-900 flex-shrink-0 overflow-hidden relative">
                          <Image src={cert.imageUrl} alt={cert.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-slate-200 font-medium m-0 truncate">{cert.title}</p>
                          {cert.description && (
                            <p className="text-slate-400 text-xs mt-0.5 mb-0 max-w-[200px] md:max-w-[300px] truncate">
                              {cert.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 md:px-5 md:py-4 text-slate-400 whitespace-nowrap">{cert.issuedBy || '—'}</td>
                    <td className="p-3 md:px-5 md:py-4 text-slate-400 whitespace-nowrap">
                      {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : '—'}
                    </td>
                    <td className="p-3 md:px-5 md:py-4 text-right">
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
