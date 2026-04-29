import { cn } from '@/lib/utils';

export function ToggleRow({
  title,
  subtitle,
  enabled = false,
  className
}: {
  title: string;
  subtitle: string;
  enabled?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between gap-5 border-b border-[#e8ebf1] py-4', className)}>
      <div>
        <p className="text-[17px] font-semibold text-[#111827]">{title}</p>
        <p className="mt-1 text-[14px] text-[#667085]">{subtitle}</p>
      </div>
      <button
        type="button"
        className={cn(
          'relative h-7 w-12 rounded-full transition',
          enabled ? 'bg-[#000521]' : 'bg-[#c0c6d2]'
        )}
      >
        <span
          className={cn(
            'absolute top-1 h-5 w-5 rounded-full bg-white transition',
            enabled ? 'right-1' : 'left-1'
          )}
        />
      </button>
    </div>
  );
}
