'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BadgeCheck, FileText, Folder, LayoutGrid, Send, Settings, Users, BarChart3 } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/nav';
import { cn } from '@/lib/utils';
import type { AuthUser } from '@/lib/auth-api';
import type { LucideIcon } from 'lucide-react';

const iconByHref: Record<string, LucideIcon> = {
  '/dashboard': LayoutGrid,
  '/clients': Users,
  '/forms': FileText,
  '/submissions': Send,
  '/abn-tracking': BadgeCheck,
  '/documents': Folder,
  '/reports': BarChart3,
  '/settings': Settings
};

export function Sidebar({ user }: { user: AuthUser }) {
  const pathname = usePathname();
  const allowed = new Set(user.accessibleNavItems);
  const navItems = NAV_ITEMS.filter((item) => allowed.has(item.key));

  return (
    <aside className="hidden h-screen w-[240px] shrink-0 border-r border-[#dfe3ea] bg-white md:block">
      <div className="border-b border-[#dfe3ea] px-5 py-6">
        <Image
          src="/docuhub-logo.png"
          alt="Docuhub logo"
          width={1018}
          height={578}
          className="h-auto w-[150px]"
          priority
        />
        <p className="mt-2 text-[12px] font-medium text-[#667085]">SMSF Application Manager</p>
      </div>
      <nav className="px-3 py-4">
        {navItems.map((item) => {
          const Icon = iconByHref[item.href] ?? LayoutGrid;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'mb-1.5 flex items-center gap-3 rounded-[12px] px-4 py-3 text-[14px] font-medium transition',
                active ? 'bg-[#e9eff8] text-[#2459dd]' : 'text-[#344054] hover:bg-[#f3f5f8]'
              )}
            >
              <Icon className={cn('h-[18px] w-[18px]', active ? 'text-[#2459dd]' : 'text-[#344054]')} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
