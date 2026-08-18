'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Image as ImageIcon, Award, Mail, LogOut, Palette } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Paintings', href: '/admin/paintings', icon: ImageIcon },
  { name: 'Certificates', href: '/admin/certificates', icon: Award },
  { name: 'Messages', href: '/admin/messages', icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div
      className="w-64 hidden md:flex flex-col flex-shrink-0"
      style={{
        background: '#0c1425',
        borderRight: '1px solid #1e293b',
        minHeight: '100vh',
      }}
    >
      {/* Logo / Brand */}
      <div
        className="h-16 flex items-center px-6 gap-3"
        style={{ borderBottom: '1px solid #1e293b' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: '#3b82f6' }}
        >
          <Palette size={16} color="#fff" />
        </div>
        <span className="text-base font-bold tracking-tight" style={{ color: '#f1f5f9' }}>
          Admin Panel
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex-1 py-5 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm font-medium"
              style={
                isActive
                  ? {
                      background: '#1e3a5f',
                      color: '#60a5fa',
                      textDecoration: 'none',
                    }
                  : {
                      color: '#94a3b8',
                      textDecoration: 'none',
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#1e293b';
                  e.currentTarget.style.color = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}
            >
              <Icon
                size={18}
                style={{ color: isActive ? '#60a5fa' : '#64748b', flexShrink: 0 }}
              />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-3" style={{ borderTop: '1px solid #1e293b' }}>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
          style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1e293b';
            e.currentTarget.style.color = '#f87171';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          <LogOut size={18} style={{ color: 'inherit', flexShrink: 0 }} />
          Logout
        </button>
      </div>
    </div>
  );
}
