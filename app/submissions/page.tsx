import { AlertCircle, CheckCircle2, FileText, MessageSquareWarning } from 'lucide-react';
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
import { submissions } from '@/lib/mock-data';

function Completeness({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-3 w-28 overflow-hidden rounded-full bg-[#e4e8ef]">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: value >= 100 ? '#12a146' : '#d97706' }}
        />
      </div>
      <span className="text-[#475467]">{value}%</span>
    </div>
  );
}

export default function SubmissionsPage() {
  const statData = [
    { label: 'Total Submissions', value: '89', note: '', icon: <FileText className="h-8 w-8" /> },
    { label: 'Needs Review', value: '12', note: '', icon: <AlertCircle className="h-8 w-8 text-[#ea580c]" /> },
    { label: 'Ready to Forward', value: '28', note: '', icon: <CheckCircle2 className="h-8 w-8 text-[#0f8f86]" /> },
    { label: 'Missing Information', value: '8', note: '', icon: <MessageSquareWarning className="h-8 w-8 text-[#dc2626]" /> }
  ] as const;

  return (
    <div className="space-y-8">
      <CrmPageHeader title="Submissions" subtitle="Review and manage submitted client forms" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statData.map((item) => (
          <CrmMetricCard key={item.label} title={item.label} value={item.value} note={item.note || ' '} icon={item.icon} />
        ))}
      </div>

      <CrmSearchFilters
        searchPlaceholder="Search submissions by client, SMSF, or application ID..."
        filters={['All Statuses', 'All Staff', 'Most Recent']}
      />

      <CrmTablePanel title="All Submissions (5)" subtitle="Review submitted applications and request changes if needed">
        <CrmTable>
          <thead>
            <tr>
              <CrmTh>Application ID</CrmTh>
              <CrmTh>Client Name</CrmTh>
              <CrmTh>SMSF / Fund Name</CrmTh>
              <CrmTh>Form Type</CrmTh>
              <CrmTh>Status</CrmTh>
              <CrmTh>Submitted Date</CrmTh>
              <CrmTh>Completeness</CrmTh>
              <CrmTh>Issues</CrmTh>
              <CrmTh>Assigned Staff</CrmTh>
              <CrmTh className="text-right">Actions</CrmTh>
            </tr>
          </thead>
          <tbody>
            {submissions.map((item) => (
              <tr key={item.id}>
                <CrmTd className="font-medium">{item.id}</CrmTd>
                <CrmTd>{item.client}</CrmTd>
                <CrmTd>{item.smsf}</CrmTd>
                <CrmTd>{item.formType}</CrmTd>
                <CrmTd>
                  <CrmStatusPill label={item.status} tone={statusTone(item.status)} />
                </CrmTd>
                <CrmTd className="text-[#667085]">{item.submittedDate}</CrmTd>
                <CrmTd>
                  <Completeness value={item.completeness} />
                </CrmTd>
                <CrmTd>
                  <CrmStatusPill label={item.issues} tone={statusTone(item.issues)} />
                </CrmTd>
                <CrmTd>{item.staff}</CrmTd>
                <CrmTd className="text-right">
                  <div className="inline-flex flex-wrap justify-end gap-2">
                    <CrmActionPill href={`/submissions/${item.id}`} label="Review" />
                    <CrmActionPill href={`/submissions/${item.id}?tab=edit`} label="Edit" tone="blue" />
                    <CrmActionPill href={`/submissions/${item.id}?tab=status`} label="Status" tone="purple" />
                    {item.status !== 'Completed' && (
                      <CrmActionPill
                        href={`/submissions/${item.id}?tab=request-changes`}
                        label="Request Changes"
                        tone="orange"
                      />
                    )}
                    {item.status !== 'Completed' && (
                      <CrmActionPill href={`/submissions/${item.id}?tab=mark-ready`} label="Mark Ready" tone="teal" />
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
