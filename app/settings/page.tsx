import { Button } from '@/components/ui/button';
import { CrmCard, CrmPageHeader } from '@/components/crm/ui';
import { SettingsTabs } from '@/components/crm/settings-tabs';
import { ToggleRow } from '@/components/crm/toggle-row';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <CrmPageHeader title="Settings" subtitle="Configure CRM settings and preferences" />
      <SettingsTabs />

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">Default Form Settings</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">Configure default settings for new forms</p>

        <div className="mt-7 space-y-1">
          <ToggleRow title="Require Tax File Number" subtitle="Make TFN a mandatory field in client forms" enabled={false} />
          <ToggleRow title="Require Identification" subtitle="At least one ID method must be provided" enabled />
          <ToggleRow title="Allow Save Progress" subtitle="Clients can save and continue later" enabled />
          <ToggleRow title="Enable Auto-save" subtitle="Automatically save form progress every 2 minutes" enabled />

          <div className="border-b border-[#e8ebf1] py-5">
            <p className="text-[17px] font-semibold text-[#111827]">Default Due Date</p>
            <div className="mt-3 flex h-12 items-center rounded-[12px] bg-[#f3f4f7] px-4 text-[20px] font-medium text-[#111827]">
              14 days
            </div>
            <p className="mt-2 text-[14px] text-[#667085]">Default number of days before form is due</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="dark" className="h-12 rounded-[14px] px-6 text-[16px]">
            Save Changes
          </Button>
        </div>
      </CrmCard>

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">Required Sections</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">Configure which sections are required by default</p>
        <div className="mt-6">
          <ToggleRow title="Fund Details" subtitle="Include SMSF and trust information" enabled />
          <ToggleRow title="Company Details" subtitle="Include trustee company information" enabled={false} />
          <ToggleRow title="Client / Member Details" subtitle="Collect member personal information" enabled={false} />
          <ToggleRow title="Declaration" subtitle="Include declaration and consent statements" enabled={false} className="border-b-0 pb-0" />
        </div>
      </CrmCard>
    </div>
  );
}
