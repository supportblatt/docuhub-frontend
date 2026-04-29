import { FileText, Send, UserCheck, UserRoundCheck } from 'lucide-react';
import {
  CrmActionPill,
  CrmMetricCard,
  CrmPageHeader,
  CrmSearchFilters,
  CrmStatusPill,
  CrmTable,
  CrmTablePanel,
  CrmTd,
  CrmTh
} from '@/components/crm/ui';
import { statusTone } from '@/components/crm/status';
import { forms } from '@/lib/mock-data';

export default function FormsPage() {
  return (
    <div className="space-y-8">
      <CrmPageHeader
        title="Forms"
        subtitle="Manage and send client forms"
        action={<CrmActionPill href="/forms/send" label="Send Form" tone="blue" icon={<Send className="h-4 w-4" />} />}
      />

      <CrmSearchFilters searchPlaceholder="Search forms by client, email, or form type..." filters={['All Statuses', 'All Staff']} />

      <CrmTablePanel title="Sent Forms (4)" subtitle="Track all forms sent to clients">
        <CrmTable>
          <thead>
            <tr>
              <CrmTh>Form ID</CrmTh>
              <CrmTh>Client Name</CrmTh>
              <CrmTh>Email</CrmTh>
              <CrmTh>Form Type</CrmTh>
              <CrmTh>Status</CrmTh>
              <CrmTh>Date Sent</CrmTh>
              <CrmTh>Due Date</CrmTh>
              <CrmTh>Last Activity</CrmTh>
              <CrmTh>Assigned Staff</CrmTh>
              <CrmTh className="text-right">Actions</CrmTh>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.formId}>
                <CrmTd className="font-medium">{form.formId}</CrmTd>
                <CrmTd>{form.client}</CrmTd>
                <CrmTd className="text-[#667085]">{form.email}</CrmTd>
                <CrmTd>{form.type}</CrmTd>
                <CrmTd>
                  <CrmStatusPill label={form.status} tone={statusTone(form.status)} />
                </CrmTd>
                <CrmTd className="text-[#667085]">{form.sent}</CrmTd>
                <CrmTd className="text-[#667085]">{form.due}</CrmTd>
                <CrmTd className="text-[#667085]">{form.activity}</CrmTd>
                <CrmTd>{form.staff}</CrmTd>
                <CrmTd className="text-right">
                  <div className="inline-flex gap-2">
                    <CrmActionPill href={`/forms/${form.formId}`} label="View" />
                    <CrmActionPill href={`/forms/${form.formId}`} label="Resend" />
                  </div>
                </CrmTd>
              </tr>
            ))}
          </tbody>
        </CrmTable>
      </CrmTablePanel>
    </div>
  );
}
