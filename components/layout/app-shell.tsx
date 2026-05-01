'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import type { AuthUser } from '@/lib/auth-api';

interface AppShellProps {
  children: ReactNode;
  user: AuthUser;
}

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f5f6f8] md:flex">
      <Sidebar user={user} />
      <div className="min-h-screen flex-1 overflow-auto">
        <Topbar />
        <main className="px-6 py-5">{children}</main>
      </div>
    </div>
  );
}
