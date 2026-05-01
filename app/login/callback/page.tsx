'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearPendingTotpChallenge } from '@/lib/auth-client';

export default function MicrosoftCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    clearPendingTotpChallenge();
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-4">
      <div className="rounded-[20px] border border-[#dfe3ea] bg-white px-8 py-10 text-center shadow-[0_20px_40px_rgba(17,26,47,0.06)]">
        <p className="text-[16px] font-medium text-[#344054]">Completing Microsoft sign-in...</p>
      </div>
    </div>
  );
}
