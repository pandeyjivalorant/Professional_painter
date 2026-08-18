'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PageWrapper({ children }) {
  const location = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageWrapper>{children}</PageWrapper>
      </main>
      <Footer />
    </div>
  );
}

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Admin routes render without the public Navbar/Footer
  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  return <PublicLayout>{children}</PublicLayout>;
}
