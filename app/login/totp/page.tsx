'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { completeTotpLogin } from '@/lib/auth-api';
import { clearPendingTotpChallenge, getPendingTotpChallenge } from '@/lib/auth-client';

export default function TotpLoginPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [challengeToken, setChallengeToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const challenge = getPendingTotpChallenge();
    if (!challenge) {
      router.replace('/login');
      return;
    }

    setChallengeToken(challenge.challengeToken);
    setUsername(challenge.username);
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!challengeToken) {
      router.replace('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await completeTotpLogin({ challengeToken, code });
      clearPendingTotpChallenge();
      router.push('/dashboard');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-4">
      <div className="w-full max-w-[540px] rounded-[24px] border border-[#dfe3ea] bg-white p-8 shadow-[0_20px_40px_rgba(17,26,47,0.06)] sm:p-10">
        <div className="flex justify-center">
          <Image src="/docuhub-logo.png" alt="Docuhub" width={1018} height={578} className="h-auto w-[170px]" priority />
        </div>

        <h1 className="mt-8 text-[34px] font-semibold tracking-[-0.03em] text-[#111a2f]">Enter verification code</h1>
        <p className="mt-2 text-[15px] text-[#667085]">
          Username/password was verified for <span className="font-semibold text-[#344054]">{username || 'your account'}</span>. Enter your 6-digit TOTP code to continue.
        </p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#344054]">TOTP code</label>
            <Input
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="123456"
              autoComplete="one-time-code"
              required
            />
          </div>

          {error ? <p className="text-[14px] font-medium text-[#b42318]">{error}</p> : null}

          <Button type="submit" className="w-full" disabled={loading || code.length !== 6}>
            {loading ? 'Verifying...' : 'Verify and Sign In'}
          </Button>
        </form>

        <button
          type="button"
          className="mt-5 text-[14px] font-semibold text-[#2459dd]"
          onClick={() => {
            clearPendingTotpChallenge();
            router.push('/login');
          }}
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
