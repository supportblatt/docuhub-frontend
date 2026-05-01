import { cn } from '@/lib/utils';

function getInitials(label: string) {
  const normalized = label.trim();
  if (!normalized) {
    return 'U';
  }

  const parts = normalized.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
}

export function InitialsAvatar({
  label,
  isActive,
  size = 'md',
  className
}: {
  label: string;
  isActive: boolean;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-semibold',
        isActive ? 'bg-[#e9eff8] text-[#2459dd]' : 'bg-[#eaecf0] text-[#667085]',
        size === 'sm' ? 'h-8 w-8 text-xs' : 'h-11 w-11 text-sm',
        className
      )}
    >
      {getInitials(label)}
    </div>
  );
}
