'use client';

import { Sidebar } from '@/components/shared/sidebar';
import { Header } from '@/components/shared/header';
import { useAppStore } from '@/stores';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar />
      <div className={cn(
        'flex-1 flex flex-col min-w-0 transition-all duration-300',
      )}>
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
