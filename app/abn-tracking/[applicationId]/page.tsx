import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CrmCard, CrmPageHeader, CrmStatusPill } from '@/components/crm/ui';
import { statusTone } from '@/components/crm/status';
import { abnItems } from '@/lib/mock-data';

export default async function AbnDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ applicationId: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { applicationId } = await params;
  const query = await searchParams;
  const app = abnItems.find((item) => item.id === applicationId) ?? abnItems[0];
  const enterMode = query.mode === 'enter';

  return (
    <div className="space-y-8">
      <CrmPageHeader
        title="ABN Tracking"
        subtitle="Track ABN submissions and approvals for client applications"
      />

      <CrmCard className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-[28px] font-semibold text-[#111827]">
              {enterMode ? 'Enter ABN Details' : 'ABN Application Details'}
            </h2>
            <p className="mt-1 text-[16px] text-[#667085]">{app.client} · {app.id}</p>
          </div>
          <CrmStatusPill label={app.status} tone={statusTone(app.status)} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">Client Name</label>
            <Input defaultValue={app.client} />
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">SMSF / Fund Name</label>
            <Input defaultValue={app.smsf} />
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">ABN Status</label>
            <Input defaultValue={app.status} />
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">Government Submission Date</label>
            <Input defaultValue={app.govDate} />
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">ABN (Australian Business Number)</label>
            <Input defaultValue="12 345 678 901" placeholder="Enter the 11-digit ABN" />
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">ABN Received Date</label>
            <Input defaultValue="April 24, 2026" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">Government Reference Number</label>
            <Input defaultValue="GOV-32911" placeholder="Enter reference number (optional)" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">Notes (Optional)</label>
            <Textarea defaultValue="Add any additional notes about the ABN..." />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" className="h-11 rounded-[14px] px-5">
            Cancel
          </Button>
          <Button className="h-11 rounded-[14px] px-6">{enterMode ? 'Save ABN' : 'Mark Submitted'}</Button>
        </div>
      </CrmCard>
    </div>
  );
}
