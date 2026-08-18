import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard | Painter Portfolio',
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen" style={{ background: '#0f172a', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {session && <AdminSidebar />}
      <main className="flex-1 w-full overflow-x-hidden min-h-screen" style={{ background: '#0f172a' }}>
        {children}
      </main>
    </div>
  );
}
