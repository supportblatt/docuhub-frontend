import { Plus } from 'lucide-react';
import {
  CrmActionPill,
  CrmPageHeader,
  CrmSearchFilters,
  CrmStatusPill,
  CrmTable,
  CrmTablePanel,
  CrmTd,
  CrmTh,
  CrmCard
} from '@/components/crm/ui';
import { statusTone } from '@/components/crm/status';
import { clients } from '@/lib/mock-data';

export default function ClientsPage() {
  const selected = clients[0];

  return (
    <div className="space-y-8">
      <CrmPageHeader
        title="Clients"
        subtitle="Manage all client records and applications"
        action={
          <div className="flex gap-2">
            <CrmActionPill href="#" label="Export" />
            <CrmActionPill href="#" label="Add Client" tone="blue" icon={<Plus className="h-4 w-4" />} />
          </div>
        }
      />

      <CrmSearchFilters searchPlaceholder="Search by name, email, SMSF, or company..." filters={['All Statuses', 'All Staff']} />

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <CrmTablePanel title="All Clients (7)" subtitle="View and manage client details">
          <CrmTable>
            <thead>
              <tr>
                <CrmTh>Client Name</CrmTh>
                <CrmTh>Email</CrmTh>
                <CrmTh>Phone</CrmTh>
                <CrmTh>SMSF / Fund Name</CrmTh>
                <CrmTh>Company Name</CrmTh>
                <CrmTh>Status</CrmTh>
                <CrmTh>Last Activity</CrmTh>
                <CrmTh>Assigned To</CrmTh>
                <CrmTh className="text-right">Actions</CrmTh>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <CrmTd className="font-medium">{client.name}</CrmTd>
                  <CrmTd className="text-[#667085]">{client.email}</CrmTd>
                  <CrmTd>{client.phone}</CrmTd>
                  <CrmTd>{client.smsf}</CrmTd>
                  <CrmTd className="text-[#667085]">{client.company}</CrmTd>
                  <CrmTd>
                    <CrmStatusPill label={client.status} tone={statusTone(client.status)} />
                  </CrmTd>
                  <CrmTd className="text-[#667085]">{client.lastActivity}</CrmTd>
                  <CrmTd>{client.staff}</CrmTd>
                  <CrmTd className="text-right">
                    <CrmActionPill href={`/submissions/${client.id}`} label="View Details" />
                  </CrmTd>
                </tr>
              ))}
            </tbody>
          </CrmTable>
        </CrmTablePanel>

        <CrmCard className="p-6">
          <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111a2f]">{selected.name}</h3>
          <p className="mt-1 text-[16px] text-[#667085]">Client Information and Application History</p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-[14px]">
            <div>
              <p className="text-[#667085]">Email</p>
              <p className="font-medium text-[#111827]">{selected.email}</p>
            </div>
            <div>
              <p className="text-[#667085]">Phone</p>
              <p className="font-medium text-[#111827]">{selected.phone}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[#667085]">SMSF / Fund Name</p>
              <p className="font-medium text-[#111827]">{selected.smsf}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[#667085]">Company Name</p>
              <p className="font-medium text-[#111827]">{selected.company}</p>
            </div>
            <div>
              <p className="text-[#667085]">Current Status</p>
              <CrmStatusPill label={selected.status} tone={statusTone(selected.status)} />
            </div>
            <div>
              <p className="text-[#667085]">Assigned To</p>
              <p className="font-medium text-[#111827]">{selected.staff}</p>
            </div>
          </div>
        </CrmCard>
      </div>
    </div>
  );
}
