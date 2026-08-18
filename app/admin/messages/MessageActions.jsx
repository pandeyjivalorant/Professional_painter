'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { markMessageRead, deleteMessage } from '@/app/actions/admin';
import { Trash2, MailOpen, Mail } from 'lucide-react';

export default function MessageActions({ id, isRead }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggleRead = async () => {
    setLoading(true);
    await markMessageRead(id, !isRead);
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    setLoading(true);
    await deleteMessage(id);
    setLoading(false);
    router.refresh();
  };

  const btnBase = {
    padding: '6px',
    borderRadius: '6px',
    border: 'none',
    background: 'transparent',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.15s',
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <button
        onClick={handleToggleRead}
        disabled={loading}
        title={isRead ? 'Mark as unread' : 'Mark as read'}
        style={{ ...btnBase, color: isRead ? '#64748b' : '#60a5fa' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        {isRead ? <MailOpen size={17} /> : <Mail size={17} />}
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        title="Delete message"
        style={{ ...btnBase, color: '#f87171' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.12)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
}
