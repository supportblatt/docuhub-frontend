import { Download, FileText, FolderOpen, Upload } from 'lucide-react';
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
import { documents } from '@/lib/mock-data';

export default function DocumentsPage() {
  const summary = [
    { label: 'Client Summary', value: '42', note: 'documents', icon: <FileText className="h-8 w-8" /> },
    { label: 'ABN Confirmation', value: '15', note: 'documents', icon: <FileText className="h-8 w-8 text-[#16a34a]" /> },
    { label: 'Signed Declaration', value: '38', note: 'documents', icon: <FileText className="h-8 w-8 text-[#7c2be4]" /> },
    { label: 'Supporting Document', value: '24', note: 'documents', icon: <FolderOpen className="h-8 w-8 text-[#ea580c]" /> }
  ] as const;

  return (
    <div className="space-y-8">
      <CrmPageHeader
        title="Documents"
        subtitle="Manage application documents and files"
        action={<CrmActionPill href="#" label="Upload Document" tone="blue" icon={<Upload className="h-4 w-4" />} />}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <CrmMetricCard key={item.label} title={item.label} value={item.value} note={item.note} icon={item.icon} />
        ))}
      </div>

      <CrmSearchFilters searchPlaceholder="Search documents by name, client, or type..." filters={['All Types', 'Most Recent']} />

      <CrmTablePanel title="All Documents (5)" subtitle="View and download application documents">
        <CrmTable>
          <thead>
            <tr>
              <CrmTh>Document Name</CrmTh>
              <CrmTh>Client</CrmTh>
              <CrmTh>Application</CrmTh>
              <CrmTh>Type</CrmTh>
              <CrmTh>Uploaded By</CrmTh>
              <CrmTh>Date Uploaded</CrmTh>
              <CrmTh>Size</CrmTh>
              <CrmTh className="text-right">Actions</CrmTh>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.name}>
                <CrmTd className="font-medium">{doc.name}</CrmTd>
                <CrmTd>{doc.client}</CrmTd>
                <CrmTd className="text-[#667085]">{doc.appId}</CrmTd>
                <CrmTd>
                  <CrmStatusPill label={doc.type} tone={statusTone(doc.type)} />
                </CrmTd>
                <CrmTd>{doc.by}</CrmTd>
                <CrmTd className="text-[#667085]">{doc.uploaded}</CrmTd>
                <CrmTd className="text-[#667085]">{doc.size}</CrmTd>
                <CrmTd className="text-right">
                  <div className="inline-flex gap-2">
                    <CrmActionPill href="#" label="View" />
                    <CrmActionPill href="#" label="Download" icon={<Download className="h-4 w-4" />} />
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
