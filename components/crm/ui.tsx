import Link from 'next/link';
import { ReactNode } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CrmPageHeader({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-[24px] font-semibold leading-none tracking-[-0.02em] text-[#0f172e] md:text-[26px]">{title}</h1>
        <p className="mt-2 text-[14px] font-medium text-[#667085]">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function CrmCard({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn('rounded-[16px] border border-[#dfe3ea] bg-white', className)}>{children}</section>;
}

export function CrmMetricCard({
  title,
  value,
  note,
  icon
}: {
  title: string;
  value: string;
  note: string;
  icon: ReactNode;
}) {
  return (
    <CrmCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[16px] font-semibold leading-tight text-[#4b576b]">{title}</h3>
          <p className="mt-2 text-[24px] font-semibold leading-none tracking-[-0.02em] text-[#101a2e] md:text-[26px]">{value}</p>
          <p className="mt-2 text-[14px] font-medium leading-tight text-[#667085]">{note}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-[#f3f4f7] text-[#2563eb]">
          {icon}
        </div>
      </div>
    </CrmCard>
  );
}

export function CrmStatusPill({
  label,
  tone = 'slate'
}: {
  label: string;
  tone?: 'green' | 'amber' | 'orange' | 'purple' | 'blue' | 'teal' | 'red' | 'slate';
}) {
  const toneClass = {
    green: 'bg-[#d8f2e0] text-[#0f9d48]',
    amber: 'bg-[#f6edc2] text-[#b46900]',
    orange: 'bg-[#fce8cc] text-[#c44e00]',
    purple: 'bg-[#eadff7] text-[#7c2be4]',
    blue: 'bg-[#d8e6f8] text-[#2459dd]',
    teal: 'bg-[#caefe8] text-[#0f8f86]',
    red: 'bg-[#f8dddd] text-[#c2171f]',
    slate: 'bg-[#e9edf3] text-[#475467]'
  }[tone];

  return <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold leading-none', toneClass)}>{label}</span>;
}

export function CrmActionPill({
  label,
  href,
  tone = 'neutral',
  icon
}: {
  label: string;
  href: string;
  tone?: 'neutral' | 'blue' | 'purple' | 'orange' | 'teal';
  icon?: ReactNode;
}) {
  const toneClass = {
    neutral: 'border-[#d6dde8] text-[#111827] hover:bg-[#f4f6fa]',
    blue: 'border-[#bfd2ff] text-[#2459dd] hover:bg-[#eef4ff]',
    purple: 'border-[#c9c2ff] text-[#4f46e5] hover:bg-[#f0efff]',
    orange: 'border-[#f1c996] text-[#c44e00] hover:bg-[#fff3e4]',
    teal: 'border-[#7ce2d2] text-[#0f8f86] hover:bg-[#ecfbf8]'
  }[tone];

  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-1.5 rounded-[12px] border px-3 py-1.5 text-[12px] font-semibold transition', toneClass)}
    >
      {icon}
      {label}
    </Link>
  );
}

export function CrmSearchFilters({
  searchPlaceholder,
  filters
}: {
  searchPlaceholder: string;
  filters: string[];
}) {
  return (
    <CrmCard className="p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#99a2b3]" />
          <input
            readOnly
            value=""
            placeholder={searchPlaceholder}
            className="h-12 w-full rounded-[14px] border border-transparent bg-[#f2f4f8] px-11 text-[16px] text-[#475467] placeholder:text-[#667085]"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="inline-flex h-12 items-center gap-2 rounded-[14px] border border-transparent bg-[#f2f4f8] px-4 text-[15px] font-medium text-[#111827]"
            >
              {filter}
              <ChevronDown className="h-5 w-5 text-[#a0a8b8]" />
            </button>
          ))}
        </div>
      </div>
    </CrmCard>
  );
}

export function CrmTablePanel({
  title,
  subtitle,
  controls,
  children
}: {
  title: string;
  subtitle: string;
  controls?: ReactNode;
  children: ReactNode;
}) {
  return (
    <CrmCard className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5e8ee] px-6 py-4">
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111a2f]">{title}</h2>
          <p className="mt-1 text-[14px] font-medium text-[#667085]">{subtitle}</p>
        </div>
        {controls}
      </div>
      <div className="crm-scroll overflow-x-auto">{children}</div>
    </CrmCard>
  );
}

export function CrmTable({ children }: { children: ReactNode }) {
  return <table className="min-w-[1240px] w-full border-separate border-spacing-0">{children}</table>;
}

export function CrmTh({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        'border-b border-[#e7eaf0] bg-white px-4 py-3 text-left text-[12px] font-semibold tracking-[0.01em] text-[#1f2937]',
        className
      )}
    >
      {children}
    </th>
  );
}

export function CrmTd({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn('border-b border-[#eceff4] px-4 py-3 text-[12px] text-[#111827]', className)}>{children}</td>;
}
