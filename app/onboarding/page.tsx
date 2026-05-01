'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TotpSetupPanel } from '@/components/auth/totp-setup-panel';
import {
  completeOnboardingProfile,
  confirmTotp,
  getCurrentUser,
  initializeTotp,
  type AuthUser
} from '@/lib/auth-api';

function destinationForUser(user: AuthUser) {
  if (user.needsOnboarding) {
    return '/onboarding';
  }

  if (!user.roleId) {
    return '/access-pending';
  }

  return '/dashboard';
}

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [busyTotp, setBusyTotp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [setupSecret, setSetupSecret] = useState<string | null>(null);
  const [setupUri, setSetupUri] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then((currentUser) => {
        if (!currentUser.needsOnboarding) {
          router.replace(destinationForUser(currentUser));
          return;
        }

        setUser(currentUser);
        setUsername(currentUser.username ?? '');
        setFirstName(currentUser.firstName ?? '');
        setLastName(currentUser.lastName ?? '');
      })
      .catch(() => {
        router.replace('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const requiresUsername = Boolean(user?.requiresUsernameSetup);
  const needsProfile = useMemo(() => {
    if (!user) {
      return false;
    }

    return user.firstName === null || user.lastName === null || user.mustChangePassword || user.requiresUsernameSetup;
  }, [user]);
  const needsOtp = Boolean(user?.otpSetupRequired);

  const reloadUser = async () => {
    const refreshed = await getCurrentUser();
    setUser(refreshed);
    setUsername(refreshed.username ?? '');
    setFirstName(refreshed.firstName ?? '');
    setLastName(refreshed.lastName ?? '');

    if (!refreshed.needsOnboarding) {
      router.replace(destinationForUser(refreshed));
    }
  };

  const handleCompleteProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingProfile(true);
    setError(null);

    try {
      if (password !== confirmPassword) {
        throw new Error('Password confirmation does not match.');
      }

      const payload: { username?: string; firstName: string; lastName: string; password: string } = {
        ...(requiresUsername ? { username } : {}),
        firstName,
        lastName,
        password
      }

      await completeOnboardingProfile(payload);
      setPassword('');
      setConfirmPassword('');
      await reloadUser();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to save profile details.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleInitTotp = async () => {
    setBusyTotp(true);
    setError(null);

    try {
      const setup = await initializeTotp();
      setSetupSecret(setup.secret);
      setSetupUri(setup.otpauthUri);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to initialize OTP setup.');
    } finally {
      setBusyTotp(false);
    }
  };

  const handleConfirmTotp = async () => {
    setBusyTotp(true);
    setError(null);

    try {
      await confirmTotp(totpCode);
      setTotpCode('');
      setSetupSecret(null);
      setSetupUri(null);
      await reloadUser();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to verify OTP code.');
    } finally {
      setBusyTotp(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-4">
        <p className="text-[15px] text-[#667085]">Preparing your account...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-4 py-8">
      <div className="w-full max-w-[760px] space-y-5 rounded-[20px] border border-[#dfe3ea] bg-white p-7 shadow-[0_20px_40px_rgba(17,26,47,0.06)]">
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-[#111a2f]">Complete account setup</h1>
          <p className="mt-2 text-[15px] text-[#667085]">
            Before you continue, set your profile details, update your password, and configure OTP authentication.
          </p>
        </div>

        {needsProfile ? (
          <form onSubmit={handleCompleteProfile} className="space-y-4 rounded-[14px] border border-[#e5e8ee] p-5">
            <h2 className="text-[19px] font-semibold text-[#111827]">Profile and Password</h2>
            {requiresUsername ? (
              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#344054]">
                  Username <span className="text-[#b42318]">*</span>
                </label>
                <Input value={username} onChange={(event) => setUsername(event.target.value)} required />
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#344054]">
                  First name <span className="text-[#b42318]">*</span>
                </label>
                <Input value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#344054]">
                  Last name <span className="text-[#b42318]">*</span>
                </label>
                <Input value={lastName} onChange={(event) => setLastName(event.target.value)} required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#344054]">
                  New password <span className="text-[#b42318]">*</span>
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-medium text-[#344054]">
                  Confirm new password <span className="text-[#b42318]">*</span>
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={savingProfile}>
              {savingProfile ? 'Saving...' : 'Save and Continue'}
            </Button>
          </form>
        ) : (
          <div className="rounded-[14px] border border-[#e5e8ee] p-5">
            <h2 className="text-[19px] font-semibold text-[#111827]">Profile and Password</h2>
            <p className="mt-1 text-[14px] text-[#027a48]">Completed</p>
          </div>
        )}

        {needsOtp ? (
          <div className="space-y-4 rounded-[14px] border border-[#e5e8ee] p-5">
            <div>
              <h2 className="text-[19px] font-semibold text-[#111827]">OTP Setup</h2>
              <p className="mt-1 text-[14px] text-[#667085]">Connect your authenticator app and verify a 6-digit code.</p>
            </div>
            <TotpSetupPanel
              totpEnabled={Boolean(user.totpEnabled)}
              setupSecret={setupSecret}
              setupUri={setupUri}
              verifyCode={totpCode}
              busy={busyTotp}
              onInit={handleInitTotp}
              onConfirm={handleConfirmTotp}
              onVerifyCodeChange={(value) => setTotpCode(value.replace(/[^0-9]/g, '').slice(0, 6))}
              initLabel="Start OTP Setup"
            />
          </div>
        ) : (
          <div className="rounded-[14px] border border-[#e5e8ee] p-5">
            <h2 className="text-[19px] font-semibold text-[#111827]">OTP Setup</h2>
            <p className="mt-1 text-[14px] text-[#027a48]">Completed</p>
          </div>
        )}

        {error ? <p className="text-[14px] font-medium text-[#b42318]">{error}</p> : null}
      </div>
    </div>
  );
}
