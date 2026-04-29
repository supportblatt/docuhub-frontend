import { CrmActionPill, CrmCard, CrmPageHeader, CrmStatusPill } from '@/components/crm/ui';
import { statusTone } from '@/components/crm/status';
import { forms } from '@/lib/mock-data';

export default async function FormDetailPage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const form = forms.find((item) => item.formId === formId) ?? forms[0];

  return (
    <div className="space-y-8">
      <CrmPageHeader
        title="Forms"
        subtitle="Manage and send client forms"
        action={<CrmActionPill href="/forms/send" label="Send Form" tone="blue" />}
      />

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold text-[#111827]">Form Details</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">{form.formId} · {form.client}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Info title="Status" value={<CrmStatusPill label={form.status} tone={statusTone(form.status)} />} />
          <Info title="Form Type" value={form.type} />
          <Info title="Date Sent" value={form.sent} />
          <Info title="Due Date" value={form.due} />
          <Info title="Last Activity" value={form.activity} />
          <Info title="Assigned Staff" value={form.staff} />
        </div>
      </CrmCard>
    </div>
  );
}

function Info({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <div className="rounded-[12px] border border-[#e8ebf1] p-4">
      <p className="text-[13px] text-[#667085]">{title}</p>
      <div className="mt-2 text-[16px] font-semibold text-[#111827]">{value}</div>
    </div>
  );
}
