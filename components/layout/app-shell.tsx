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
    <div className="h-screen overflow-hidden bg-[#f5f6f8] md:flex">
      <Sidebar user={user} />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-6 py-5">{children}</main>
      </div>
    </div>
  );
}
