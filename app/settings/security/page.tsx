'use client';

import { useEffect, useState } from 'react';
import { CrmCard, CrmPageHeader } from '@/components/crm/ui';
import { SettingsTabs } from '@/components/crm/settings-tabs';
import { ToggleRow } from '@/components/crm/toggle-row';
import { Button } from '@/components/ui/button';
import { TotpSetupPanel } from '@/components/auth/totp-setup-panel';
import { confirmTotp, disableTotp, getCurrentUser, initializeTotp } from '@/lib/auth-api';

const logs = [
  ['Alex Chen viewed client details', '2 hours ago'],
  ['Emma Davis downloaded PDF', 'Document: Application Summary PDF · 5 hours ago'],
  ['Sarah Park revealed sensitive data', 'Client: Sarah Mitchell (APP-1247) · 1 day ago']
] as const;

export default function SettingsSecurityPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [totpEnabled, setTotpEnabled] = useState(false);
  const [setupSecret, setSetupSecret] = useState<string | null>(null);
  const [setupUri, setSetupUri] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setTotpEnabled(user.totpEnabled);
      })
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load security settings.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleInitTotp = async () => {
    setBusy(true);
    setError(null);
    setInfo(null);

    try {
      const setup = await initializeTotp();
      setSetupSecret(setup.secret);
      setSetupUri(setup.otpauthUri);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to initialize TOTP.');
    } finally {
      setBusy(false);
    }
  };

  const handleConfirmTotp = async () => {
    setBusy(true);
    setError(null);
    setInfo(null);

    try {
      await confirmTotp(verifyCode);
      setTotpEnabled(true);
      setSetupSecret(null);
      setSetupUri(null);
      setVerifyCode('');
      setInfo('Authenticator verified. Multi-factor protection remains required for your account.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to confirm TOTP code.');
    } finally {
      setBusy(false);
    }
  };

  const handleDisableTotp = async () => {
    setBusy(true);
    setError(null);
    setInfo(null);

    try {
      await disableTotp();
      setTotpEnabled(false);
      setSetupSecret(null);
      setSetupUri(null);
      setVerifyCode('');
      setInfo('Current authenticator device removed. You must set up a new device before your next login.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to remove authenticator device.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <CrmPageHeader title="Settings" subtitle="Configure CRM settings and preferences" />
      <SettingsTabs />

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">Security Settings</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">Manage security and compliance settings</p>

        <div className="mt-7 space-y-1">
          <ToggleRow title="Mask Tax File Numbers" subtitle="Show only last 3 digits of TFN" enabled />
          <ToggleRow title="Mask Identification Numbers" subtitle={'Require "Reveal" action to view full ID numbers'} enabled />
          <ToggleRow title="Enable Audit Log" subtitle="Track all user actions and data access" enabled />
          <ToggleRow title="Confirm Before Download" subtitle="Require confirmation before downloading sensitive PDFs" enabled />
        </div>
      </CrmCard>

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">Multi-Factor Authentication</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">
          TOTP cannot be disabled. You can remove your current device and set up a new one.
        </p>

        {loading ? <p className="mt-6 text-[15px] text-[#667085]">Loading authentication status...</p> : null}
        {!loading && error ? <p className="mt-6 text-[15px] font-medium text-[#b42318]">{error}</p> : null}
        {!loading && !error && info ? <p className="mt-6 text-[15px] font-medium text-[#027a48]">{info}</p> : null}

        {!loading && !error ? (
          <div className="mt-6">
            <TotpSetupPanel
              totpEnabled={totpEnabled}
              setupSecret={setupSecret}
              setupUri={setupUri}
              verifyCode={verifyCode}
              busy={busy}
              showDisableAction
              onInit={handleInitTotp}
              onConfirm={handleConfirmTotp}
              onDisable={handleDisableTotp}
              disableLabel="Remove Current Device"
              onVerifyCodeChange={(value) => setVerifyCode(value.replace(/[^0-9]/g, '').slice(0, 6))}
            />
          </div>
        ) : null}
      </CrmCard>

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">Audit Log</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">Recent security-related activities</p>

        <div className="mt-6 space-y-2">
          {logs.map(([line, note]) => (
            <div key={line} className="rounded-[14px] border border-[#e8ebf1] px-5 py-4">
              <p className="text-[16px] font-semibold text-[#111827]">{line}</p>
              <p className="text-[14px] text-[#667085]">{note}</p>
            </div>
          ))}
        </div>

        <button type="button" className="mt-4 text-[15px] font-semibold text-[#2459dd]">
          View Full Audit Log
        </button>
      </CrmCard>
    </div>
  );
}
