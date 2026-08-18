import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard | Painter Portfolio',
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 font-sans">
      {session && <AdminSidebar />}
      <main className="flex-1 w-full overflow-x-hidden min-h-screen bg-slate-900">
        {children}
      </main>
    </div>
  );
}
