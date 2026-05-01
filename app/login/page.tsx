'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginWithPassword, microsoftStartUrl } from '@/lib/auth-api';
import { setPendingTotpChallenge } from '@/lib/auth-client';

const paperOutlines = [
  'left-[1%] top-[4%] h-[170px] w-[126px] rotate-[-11deg] hidden md:block',
  'left-[10%] top-[8%] h-[210px] w-[156px] rotate-[7deg] hidden md:block',
  'left-[3%] top-[30%] h-[180px] w-[136px] rotate-[10deg] hidden md:block',
  'left-[14%] top-[39%] h-[150px] w-[116px] rotate-[-9deg] hidden lg:block',
  'left-[6%] bottom-[16%] h-[200px] w-[150px] rotate-[8deg] hidden lg:block',
  'left-[17%] bottom-[7%] h-[160px] w-[120px] rotate-[-6deg] hidden xl:block',
  'left-[27%] top-[10%] h-[140px] w-[108px] rotate-[-8deg] hidden xl:block',
  'left-[25%] bottom-[14%] h-[145px] w-[110px] rotate-[9deg] hidden xl:block',
  'right-[1%] top-[5%] h-[176px] w-[130px] rotate-[12deg] hidden md:block',
  'right-[11%] top-[8%] h-[214px] w-[158px] rotate-[-8deg] hidden md:block',
  'right-[4%] top-[33%] h-[182px] w-[136px] rotate-[-11deg] hidden md:block',
  'right-[15%] top-[40%] h-[154px] w-[118px] rotate-[9deg] hidden lg:block',
  'right-[6%] bottom-[14%] h-[198px] w-[150px] rotate-[-8deg] hidden lg:block',
  'right-[18%] bottom-[8%] h-[164px] w-[122px] rotate-[7deg] hidden xl:block',
  'right-[28%] top-[11%] h-[138px] w-[106px] rotate-[8deg] hidden xl:block',
  'right-[26%] bottom-[15%] h-[142px] w-[108px] rotate-[-9deg] hidden xl:block'
];

function PaperOutline({ className }: { className: string }) {
  return (
    <div className={`absolute rounded-[14px] border border-[#d8e2f1] ${className}`}>
      <div className="absolute right-[-1px] top-[-1px] h-7 w-7 rounded-tr-[14px] border-b border-l border-[#d8e2f1] bg-[#f5f6f8]" />
      <div className="absolute left-4 top-12 h-[2px] w-[62%] bg-[#e3e9f5]" />
      <div className="absolute left-4 top-19 h-[2px] w-[70%] bg-[#e3e9f5]" />
      <div className="absolute left-4 top-26 h-[2px] w-[48%] bg-[#e3e9f5]" />
    </div>
  );
}

function LoginScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const oauthError = searchParams.get('error');
    if (oauthError) {
      setError(oauthError);
    }
  }, [searchParams]);

  const handlePasswordLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await loginWithPassword({ username, password });

      if (result.requiresTotp) {
        setPendingTotpChallenge(result.challengeToken, result.user.username);
        router.push('/login/totp');
        return;
      }

      router.push('/dashboard');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f6f8] px-4 py-10 sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {paperOutlines.map((className) => (
          <PaperOutline key={className} className={className} />
        ))}
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[680px]">
        <section className="relative z-20 rounded-[28px] border border-[#dfe3ea] bg-white p-8 shadow-[0_20px_40px_rgba(17,26,47,0.06)] sm:p-10">
          <div className="flex justify-center">
            <Image src="/docuhub-logo.png" alt="Docuhub" width={1018} height={578} className="block h-auto w-[190px]" priority />
          </div>
          <h1 className="mt-10 text-[40px] font-semibold tracking-[-0.03em] text-[#111a2f]">Welcome back</h1>
          <p className="mt-2 text-[16px] text-[#667085]">Sign in with your Docuhub username/password or Microsoft account.</p>

          <form onSubmit={handlePasswordLogin} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#344054]">Username</label>
              <Input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="john.smith" autoComplete="username" required />
            </div>
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#344054]">Password</label>
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            {error ? <p className="text-[14px] font-medium text-[#b42318]">{error}</p> : null}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e1e6ef]" />
            <span className="text-[13px] text-[#98a2b3]">OR</span>
            <div className="h-px flex-1 bg-[#e1e6ef]" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-[#d5dbe5] bg-white"
            onClick={() => {
              window.location.href = microsoftStartUrl();
            }}
          >
            <span className="mr-3 grid grid-cols-2 gap-[2px] rounded-[4px] border border-[#e4e7ec] bg-white p-1">
              <span className="h-2.5 w-2.5 bg-[#f25022]" />
              <span className="h-2.5 w-2.5 bg-[#7fba00]" />
              <span className="h-2.5 w-2.5 bg-[#00a4ef]" />
              <span className="h-2.5 w-2.5 bg-[#ffb900]" />
            </span>
            Continue with Microsoft
          </Button>
        </section>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-4">
          <p className="text-[15px] text-[#667085]">Loading login page...</p>
        </div>
      }
    >
      <LoginScreen />
    </Suspense>
  );
}
