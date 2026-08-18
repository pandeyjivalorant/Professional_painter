import prisma from '@/lib/prisma';
import MessageActions from './MessageActions';

export const metadata = {
  title: 'Contact Messages | Admin',
};

export default async function MessagesAdminPage() {
  const messages = await prisma.contactMessage.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Contact Messages</h1>
          {unreadCount > 0 && (
            <span
              style={{
                background: 'rgba(59,130,246,0.2)',
                color: '#60a5fa',
                fontSize: '12px',
                fontWeight: 600,
                padding: '2px 10px',
                borderRadius: '99px',
              }}
            >
              {unreadCount} unread
            </span>
          )}
        </div>
        <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
          Manage messages sent via the contact form.
        </p>
      </div>

      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155' }}>
                {['Sender', 'Email', 'Message', 'Date', 'Status', 'Actions'].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: '12px 20px',
                      color: '#64748b',
                      fontWeight: 600,
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      textAlign: i === 5 ? 'right' : 'left',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '48px 20px', textAlign: 'center', color: '#64748b' }}>
                    No messages yet.
                  </td>
                </tr>
              ) : (
                messages.map((msg, i) => (
                  <tr
                    key={msg.id}
                    style={{
                      borderBottom: i < messages.length - 1 ? '1px solid #1e293b' : 'none',
                      background: !msg.isRead ? 'rgba(59,130,246,0.05)' : 'transparent',
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <p style={{ color: '#e2e8f0', fontWeight: msg.isRead ? 400 : 600, margin: 0, whiteSpace: 'nowrap' }}>
                        {msg.name}
                      </p>
                      {msg.phone && <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0 0' }}>{msg.phone}</p>}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <a href={`mailto:${msg.email}`} style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '13px' }}>
                        {msg.email}
                      </a>
                    </td>
                    <td style={{ padding: '14px 20px', maxWidth: '240px' }}>
                      <p
                        style={{
                          color: '#94a3b8',
                          margin: 0,
                          fontSize: '13px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {msg.message}
                      </p>
                    </td>
                    <td style={{ padding: '14px 20px', color: '#64748b', whiteSpace: 'nowrap', fontSize: '13px' }}>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span
                        style={
                          msg.isRead
                            ? { background: 'rgba(148,163,184,0.12)', color: '#94a3b8', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 500 }
                            : { background: 'rgba(59,130,246,0.15)', color: '#60a5fa', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }
                        }
                      >
                        {msg.isRead ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <MessageActions id={msg.id} isRead={msg.isRead} />
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
