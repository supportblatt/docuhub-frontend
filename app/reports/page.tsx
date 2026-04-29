import { CrmCard, CrmPageHeader, CrmStatusPill } from '@/components/crm/ui';

const reportRows = [
  ['Submission Throughput', '89 submissions this month', 'Upward trend', 'green'],
  ['ABN Turnaround', 'Average 3.2 days', 'Stable', 'blue'],
  ['Missing Information Rate', '9%', 'Needs Review', 'orange']
] as const;

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <CrmPageHeader title="Reports" subtitle="Track operational performance and workload trends" />

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">Operational Summary</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">Static reporting snapshot based on current prototype data</p>

        <div className="mt-7 space-y-3">
          {reportRows.map(([name, value, status, tone]) => (
            <div key={name} className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-[#e8ebf1] px-5 py-4">
              <div>
                <p className="text-[16px] font-semibold text-[#111827]">{name}</p>
                <p className="text-[14px] text-[#667085]">{value}</p>
              </div>
              <CrmStatusPill label={status} tone={tone} />
            </div>
          ))}
        </div>
      </CrmCard>
    </div>
  );
}
