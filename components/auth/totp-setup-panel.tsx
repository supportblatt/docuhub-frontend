'use client';

import { useState } from 'react';
import { CheckCircle2, KeyRound, QrCode, ShieldCheck, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TotpSetupPanelProps {
  totpEnabled: boolean;
  setupSecret: string | null;
  setupUri: string | null;
  verifyCode: string;
  busy: boolean;
  showDisableAction?: boolean;
  onInit: () => Promise<void> | void;
  onConfirm: () => Promise<void> | void;
  onDisable?: () => Promise<void> | void;
  onVerifyCodeChange: (value: string) => void;
  initLabel?: string;
  disableLabel?: string;
}

export function TotpSetupPanel({
  totpEnabled,
  setupSecret,
  setupUri,
  verifyCode,
  busy,
  showDisableAction = false,
  onInit,
  onConfirm,
  onDisable,
  onVerifyCodeChange,
  initLabel = 'Enable TOTP',
  disableLabel = 'Remove Device'
}: TotpSetupPanelProps) {
  const [showManualSetup, setShowManualSetup] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopySecret = async () => {
    if (!setupSecret || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(setupSecret);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-[18px] border border-[#dbe2ee] bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full ${
              totpEnabled ? 'bg-[#def7e8] text-[#027a48]' : 'bg-[#fef3f2] text-[#b42318]'
            }`}
          >
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.03em] text-[#667085]">Authenticator Status</p>
            <p className={`text-[15px] font-semibold ${totpEnabled ? 'text-[#027a48]' : 'text-[#b42318]'}`}>
              {totpEnabled ? 'Enabled and protecting sign-ins' : 'Not configured'}
            </p>
          </div>
        </div>

        {totpEnabled && showDisableAction && onDisable ? (
          <Button type="button" variant="outline" className="h-10" onClick={onDisable} disabled={busy}>
            {busy ? 'Removing...' : disableLabel}
          </Button>
        ) : null}
      </div>

      {totpEnabled ? (
        <div className="mt-5 rounded-[14px] border border-[#d9efe3] bg-[#f4fbf7] px-4 py-3 text-[14px] text-[#027a48]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            OTP is active for this account.
          </div>
        </div>
      ) : (
        <div className="mt-5">
          {!setupUri ? (
            <div className="rounded-[14px] border border-[#e5e8ef] bg-[#f8fafd] p-4">
              <p className="text-[14px] text-[#475467]">Start setup to generate a QR code for your authenticator app.</p>
              <Button type="button" className="mt-3 h-10" onClick={onInit} disabled={busy}>
                {busy ? 'Initializing...' : initLabel}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
              <div className="rounded-[14px] border border-[#e5e8ee] bg-[#f8fafc] p-4">
                <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-[#344054]">
                  <QrCode className="h-4 w-4" />
                  Scan QR Code
                </p>
                <div className="inline-flex rounded-[12px] border border-[#e5e8ee] bg-white p-3">
                  <QRCodeSVG value={setupUri} size={176} includeMargin />
                </div>
              </div>

              <div className="space-y-4 rounded-[14px] border border-[#e5e8ee] bg-[#fcfcfd] p-4">
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-[#475467]">
                    <Smartphone className="h-4 w-4" />
                    Step 1
                  </p>
                  <p className="text-[14px] text-[#344054]">
                    Open your authenticator app and scan the QR code.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowManualSetup((value) => !value)}
                    className="text-left text-[13px] font-semibold text-[#2459dd]"
                  >
                    {showManualSetup ? 'Hide manual setup' : "Can't scan QR?"}
                  </button>
                  {showManualSetup ? (
                    <div className="space-y-2 rounded-[12px] border border-[#e6ebf5] bg-white p-3">
                      <p className="flex items-center gap-2 text-[13px] font-medium text-[#475467]">
                        <KeyRound className="h-4 w-4" />
                        Use this setup key
                      </p>
                      <p className="break-all rounded-[10px] bg-[#f8fafc] px-3 py-2 font-mono text-[13px] font-semibold tracking-[0.03em] text-[#111827]">
                        {setupSecret}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button type="button" variant="outline" className="h-8 px-3 text-[12px]" onClick={handleCopySecret}>
                          {copied ? 'Copied' : 'Copy key'}
                        </Button>
                        {copied ? <span className="text-[12px] font-medium text-[#027a48]">Copied to clipboard</span> : null}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <p className="text-[13px] font-semibold text-[#475467]">Step 2</p>
                  <p className="text-[14px] text-[#344054]">Enter the 6-digit code generated by your app.</p>
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                    <Input
                      value={verifyCode}
                      onChange={(event) => onVerifyCodeChange(event.target.value)}
                      placeholder="123456"
                      inputMode="numeric"
                      className="h-10 text-center font-mono tracking-[0.3em]"
                    />
                    <Button type="button" className="h-10" onClick={onConfirm} disabled={busy || verifyCode.length !== 6}>
                      {busy ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
