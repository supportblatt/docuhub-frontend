import { AlertCircle, CheckCircle2, Clock3, ClipboardList, FileCheck2 } from 'lucide-react';
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
import { abnItems } from '@/lib/mock-data';

export default function AbnTrackingPage() {
  const metricData = [
    { label: 'Total Requiring ABN', value: '16', note: '', icon: <ClipboardList className="h-8 w-8" /> },
    { label: 'Not Submitted', value: '3', note: '', icon: <Clock3 className="h-8 w-8 text-[#d97706]" /> },
    { label: 'Submitted to Government', value: '5', note: '', icon: <FileCheck2 className="h-8 w-8 text-[#7c2be4]" /> },
    { label: 'Awaiting ABN', value: '4', note: '', icon: <AlertCircle className="h-8 w-8 text-[#ca8a04]" /> },
    { label: 'ABN Received', value: '4', note: '', icon: <CheckCircle2 className="h-8 w-8 text-[#16a34a]" /> }
  ] as const;

  return (
    <div className="space-y-8">
      <CrmPageHeader title="ABN Tracking" subtitle="Track ABN submissions and approvals for client applications" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {metricData.map((item) => (
          <CrmMetricCard key={item.label} title={item.label} value={item.value} note={item.note || ' '} icon={item.icon} />
        ))}
      </div>

      <CrmTablePanel
        title="ABN Applications"
        subtitle="Monitor ABN status for all applications"
        controls={
          <div className="flex gap-2">
            <CrmActionPill href="#" label="All Statuses" />
            <CrmActionPill href="#" label="Export" />
          </div>
        }
      >
        <CrmTable>
          <thead>
            <tr>
              <CrmTh>Client Name</CrmTh>
              <CrmTh>SMSF / Fund Name</CrmTh>
              <CrmTh>ABN Required</CrmTh>
              <CrmTh>ABN Status</CrmTh>
              <CrmTh>Government Submission Date</CrmTh>
              <CrmTh>Last Updated</CrmTh>
              <CrmTh>Assigned Staff</CrmTh>
              <CrmTh className="text-right">Actions</CrmTh>
            </tr>
          </thead>
          <tbody>
            {abnItems.map((item) => (
              <tr key={item.id}>
                <CrmTd className="font-medium">{item.client}</CrmTd>
                <CrmTd>{item.smsf}</CrmTd>
                <CrmTd>
                  <CrmStatusPill label={item.required} tone={statusTone(item.required)} />
                </CrmTd>
                <CrmTd>
                  <CrmStatusPill label={item.status} tone={statusTone(item.status)} />
                </CrmTd>
                <CrmTd className="text-[#667085]">{item.govDate}</CrmTd>
                <CrmTd className="text-[#667085]">{item.updated}</CrmTd>
                <CrmTd>{item.staff}</CrmTd>
                <CrmTd className="text-right">
                  <div className="inline-flex gap-2">
                    <CrmActionPill href={`/abn-tracking/${item.id}`} label="View" />
                    {item.nextAction === 'Enter ABN' && (
                      <CrmActionPill href={`/abn-tracking/${item.id}?mode=enter`} label="Enter ABN" tone="teal" />
                    )}
                    {item.nextAction === 'Mark Submitted' && (
                      <CrmActionPill href={`/abn-tracking/${item.id}?mode=enter`} label="Mark Submitted" />
                    )}
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
