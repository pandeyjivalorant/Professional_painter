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
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Certificates</h1>
        <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>Manage your certificates and awards.</p>
      </div>

      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155' }}>
                {['Certificate', 'Issued By', 'Issue Date', 'Actions'].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: '12px 20px',
                      color: '#64748b',
                      fontWeight: 600,
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      textAlign: i === 3 ? 'right' : 'left',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {certificates.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '48px 20px', textAlign: 'center', color: '#64748b' }}>
                    No certificates found.
                  </td>
                </tr>
              ) : (
                certificates.map((cert, i) => (
                  <tr key={cert.id} style={{ borderBottom: i < certificates.length - 1 ? '1px solid #1e293b' : 'none' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '60px',
                            height: '44px',
                            borderRadius: '6px',
                            background: '#0f172a',
                            flexShrink: 0,
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <Image src={cert.imageUrl} alt={cert.title} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                          <p style={{ color: '#e2e8f0', fontWeight: 500, margin: 0 }}>{cert.title}</p>
                          {cert.description && (
                            <p
                              style={{
                                color: '#64748b',
                                fontSize: '12px',
                                margin: '2px 0 0 0',
                                maxWidth: '240px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {cert.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{cert.issuedBy || '—'}</td>
                    <td style={{ padding: '14px 20px', color: '#94a3b8' }}>
                      {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
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
