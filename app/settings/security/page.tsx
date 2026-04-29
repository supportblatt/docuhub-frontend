import { CrmCard, CrmPageHeader } from '@/components/crm/ui';
import { SettingsTabs } from '@/components/crm/settings-tabs';
import { ToggleRow } from '@/components/crm/toggle-row';

const logs = [
  ['Alex Chen viewed client details', '2 hours ago'],
  ['Emma Davis downloaded PDF', 'Document: Application Summary PDF · 5 hours ago'],
  ['Sarah Park revealed sensitive data', 'Client: Sarah Mitchell (APP-1247) · 1 day ago']
] as const;

export default function SettingsSecurityPage() {
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
