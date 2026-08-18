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
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full font-sans">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-slate-100 m-0">Contact Messages</h1>
          {unreadCount > 0 && (
            <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">
              {unreadCount} unread
            </span>
          )}
        </div>
        <p className="text-slate-400 mt-1 text-sm md:text-base">
          Manage messages sent via the contact form.
        </p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-700">
                {['Sender', 'Email', 'Message', 'Date', 'Status', 'Actions'].map((h, i) => (
                  <th
                    key={h}
                    className={`p-3 md:px-5 md:py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider ${
                      i === 5 ? 'text-right' : 'text-left'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 md:p-12 text-center text-slate-400 text-sm md:text-base">
                    No messages yet.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-slate-700/20 transition-colors ${
                      !msg.isRead ? 'bg-blue-500/5' : ''
                    }`}
                  >
                    <td className="p-3 md:px-5 md:py-4">
                      <p className={`text-slate-200 m-0 whitespace-nowrap ${msg.isRead ? 'font-normal' : 'font-semibold'}`}>
                        {msg.name}
                      </p>
                      {msg.phone && <p className="text-slate-400 text-xs mt-0.5 mb-0">{msg.phone}</p>}
                    </td>
                    <td className="p-3 md:px-5 md:py-4">
                      <a href={`mailto:${msg.email}`} className="text-blue-400 hover:text-blue-300 no-underline text-xs md:text-sm transition-colors">
                        {msg.email}
                      </a>
                    </td>
                    <td className="p-3 md:px-5 md:py-4 max-w-[200px] md:max-w-[240px]">
                      <p className="text-slate-400 m-0 text-xs md:text-sm truncate">
                        {msg.message}
                      </p>
                    </td>
                    <td className="p-3 md:px-5 md:py-4 text-slate-400 whitespace-nowrap text-xs md:text-sm">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 md:px-5 md:py-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap inline-block ${
                          msg.isRead
                            ? 'bg-slate-500/10 text-slate-400'
                            : 'bg-blue-500/10 text-blue-400 font-semibold'
                        }`}
                      >
                        {msg.isRead ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td className="p-3 md:px-5 md:py-4 text-right">
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
