import { Bell, Search, Send, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#dfe3ea] bg-[#f5f6f8] px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-3xl flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8d96a8]" />
          <input
            readOnly
            value=""
            placeholder="Search clients, SMSF name, company, reference..."
            className="h-9 w-full rounded-[10px] border border-[#d5d9e2] bg-[#f2f4f8] px-10 text-[13px] text-[#344054] placeholder:text-[#667085]"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button className="h-9 rounded-[10px] px-5 text-[13px]" size="lg">
            <Send className="mr-2 h-4 w-4" />
            Send Form
          </Button>
          <button type="button" className="relative flex h-9 w-9 items-center justify-center text-[#667085]">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#ff3b3b]" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-[0_2px_0_rgba(0,0,0,0.06)]"
          >
            <UserRound className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
