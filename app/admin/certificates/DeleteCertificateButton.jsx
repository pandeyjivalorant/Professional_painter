'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCertificate, deleteCloudinaryImage } from '@/app/actions/admin';
import { Trash2 } from 'lucide-react';

export default function DeleteCertificateButton({ id, title, publicId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the certificate "${title}"?`)) return;

    setLoading(true);
    try {
      if (publicId) await deleteCloudinaryImage(publicId);
      const res = await deleteCertificate(id);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.error || 'Failed to delete certificate');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title="Delete Certificate"
      style={{
        padding: '6px',
        borderRadius: '6px',
        border: 'none',
        background: 'transparent',
        color: '#f87171',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.5 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.12)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <Trash2 size={17} />
    </button>
  );
}
