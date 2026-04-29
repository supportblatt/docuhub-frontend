'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { label: 'Form Settings', href: '/settings' },
  { label: 'Email Templates', href: '/settings/templates' },
  { label: 'Staff & Permissions', href: '/settings/staff' },
  { label: 'Security', href: '/settings/security' }
] as const;

export function SettingsTabs() {
  const pathname = usePathname();

  return (
    <div className="rounded-[16px] bg-[#eceef3] p-1.5">
      <div className="grid gap-2 md:grid-cols-4">
        {tabs.map((tab) => {
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'rounded-[12px] px-4 py-2.5 text-center text-[15px] font-medium text-[#1f2937] transition',
                active ? 'bg-white shadow-[0_1px_0_rgba(16,24,40,0.05)]' : 'hover:bg-[#f6f7fb]'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
