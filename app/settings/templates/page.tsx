import { Button } from '@/components/ui/button';
import { CrmCard, CrmPageHeader } from '@/components/crm/ui';
import { SettingsTabs } from '@/components/crm/settings-tabs';

const templates = [
  ['Form Invitation', 'Sent when a new form is sent to a client'],
  ['Form Reminder', 'Reminder for incomplete forms'],
  ['Missing Information Request', 'Request for additional or corrected information'],
  ['Submission Received', 'Confirmation after form submission'],
  ['Application Completed', 'Sent when application is finalized']
] as const;

export default function SettingsTemplatesPage() {
  return (
    <div className="space-y-8">
      <CrmPageHeader title="Settings" subtitle="Configure CRM settings and preferences" />
      <SettingsTabs />

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">Email Templates</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">Customize email templates for client communications</p>

        <div className="mt-7 space-y-2">
          {templates.map(([name, note]) => (
            <div
              key={name}
              className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-[#e8ebf1] bg-white px-5 py-4"
            >
              <div>
                <p className="text-[17px] font-semibold text-[#111827]">{name}</p>
                <p className="text-[14px] text-[#667085]">{note}</p>
              </div>
              <Button variant="outline" className="h-11 rounded-[14px] px-5">
                Edit Template
              </Button>
            </div>
          ))}
        </div>
      </CrmCard>
    </div>
  );
}
