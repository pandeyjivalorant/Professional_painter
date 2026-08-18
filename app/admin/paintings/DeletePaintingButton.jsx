'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deletePainting } from '@/app/actions/admin';

export default function DeletePaintingButton({ id, title }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setIsDeleting(true);
    try {
      const res = await deletePainting(id);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.error || 'Failed to delete painting');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      title="Delete Painting"
      style={{
        padding: '6px',
        borderRadius: '6px',
        border: 'none',
        background: 'transparent',
        color: '#f87171',
        cursor: isDeleting ? 'not-allowed' : 'pointer',
        opacity: isDeleting ? 0.5 : 1,
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
