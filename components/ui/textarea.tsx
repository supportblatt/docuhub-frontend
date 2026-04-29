import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-[110px] w-full rounded-[12px] border border-transparent bg-[#f3f4f7] px-4 py-3 text-[16px] text-[#111827] placeholder:text-[#667085] focus-visible:outline-none',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
