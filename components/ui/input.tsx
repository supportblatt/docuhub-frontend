import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'h-12 w-full rounded-[12px] border border-transparent bg-[#f3f4f7] px-4 text-[16px] text-[#111827] placeholder:text-[#667085] focus-visible:outline-none',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';
