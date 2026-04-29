import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f5f6f8] md:flex">
      <Sidebar />
      <div className="min-h-screen flex-1 overflow-auto">
        <Topbar />
        <main className="px-6 py-5">{children}</main>
      </div>
    </div>
  );
}
