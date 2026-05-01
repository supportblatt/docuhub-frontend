'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, Search, Send, Settings, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/auth-api';
import { clearPendingTotpChallenge } from '@/lib/auth-client';

export function Topbar() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } catch {
      // Always continue clearing local state/redirecting even if request fails.
    } finally {
      clearPendingTotpChallenge();
      setMenuOpen(false);
      router.replace('/login');
      router.refresh();
      setLoggingOut(false);
    }
  };

  const handleSettings = () => {
    setMenuOpen(false);
    router.push('/settings/staff');
  };

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
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-[0_2px_0_rgba(0,0,0,0.06)]"
            >
              <UserRound className="h-4 w-4" />
            </button>

            {menuOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-10 z-30 min-w-[170px] rounded-[12px] border border-[#dfe3ea] bg-white p-1.5 shadow-[0_12px_30px_rgba(17,26,47,0.14)]"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleSettings}
                  className="flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-left text-[13px] font-medium text-[#344054] hover:bg-[#f3f5f8]"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-left text-[13px] font-medium text-[#344054] hover:bg-[#f3f5f8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut className="h-4 w-4" />
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
