'use client';

import { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  FileCheck2,
  Send,
  TrendingUp,
  Users
} from 'lucide-react';
import {
  CrmActionPill,
  CrmMetricCard,
  CrmPageHeader,
  CrmStatusPill,
  CrmTable,
  CrmTablePanel,
  CrmTd,
  CrmTh
} from '@/components/crm/ui';
import { statusTone } from '@/components/crm/status';
import { clients, dashboardStats } from '@/lib/mock-data';

const statIcons = [
  <Users key="users" className="h-5 w-5" strokeWidth={2} />,
  <Send key="send" className="h-5 w-5 text-[#7c2be4]" strokeWidth={2} />,
  <Clock3 key="progress" className="h-5 w-5 text-[#d97706]" strokeWidth={2} />,
  <CheckCircle2 key="submitted" className="h-5 w-5 text-[#16a34a]" strokeWidth={2} />,
  <AlertCircle key="review" className="h-5 w-5 text-[#ea580c]" strokeWidth={2} />,
  <FileCheck2 key="forward" className="h-5 w-5 text-[#0f8f86]" strokeWidth={2} />,
  <ClipboardList key="abn" className="h-5 w-5 text-[#4f46e5]" strokeWidth={2} />,
  <TrendingUp key="month" className="h-5 w-5 text-[#0f9d58]" strokeWidth={2} />
];

export default function DashboardPage() {
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  const statusOptions = useMemo(() => ['All Statuses', ...Array.from(new Set(clients.map((client) => client.status)))], []);
  const filteredClients = useMemo(
    () => (selectedStatus === 'All Statuses' ? clients : clients.filter((client) => client.status === selectedStatus)),
    [selectedStatus]
  );

  return (
    <div className="space-y-8">
      <CrmPageHeader title="Dashboard" subtitle="Overview of all client applications and forms" />

      <div className="mt-3 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item, idx) => (
          <CrmMetricCard key={item.label} title={item.label} value={item.value} note={item.delta} icon={statIcons[idx]} />
        ))}
      </div>

      <CrmTablePanel
        title="Recent Applications"
        subtitle="View and manage client applications"
        controls={
          <div className="flex gap-2">
            <label className="relative inline-flex">
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className="h-[35px] appearance-none rounded-[12px] border border-[#d6dde8] bg-white pl-3 pr-8 text-[12px] font-semibold text-[#111827] outline-none transition hover:bg-[#f4f6fa]"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
            </label>
            <CrmActionPill href="#" label="Export" />
          </div>
        }
      >
        <CrmTable>
          <thead>
            <tr>
              <CrmTh className="w-[16%] min-w-[170px] text-[13px]">Client Name</CrmTh>
              <CrmTh className="w-[23%] min-w-[260px] text-[13px]">SMSF / Fund Name</CrmTh>
              <CrmTh className="w-[20%] min-w-[220px] text-[13px]">Form Type</CrmTh>
              <CrmTh className="w-[13%] min-w-[130px] text-[13px]">Status</CrmTh>
              <CrmTh className="w-[13%] min-w-[130px] text-[13px]">ABN Status</CrmTh>
              <CrmTh className="w-[8%] min-w-[110px] text-[13px]">Last Updated</CrmTh>
              <CrmTh className="w-[12%] min-w-[130px] text-[13px]">Assigned Staff</CrmTh>
              <CrmTh className="w-[8%] min-w-[96px] text-right text-[13px]">Actions</CrmTh>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <CrmTd className="text-[13px] font-medium">
                  {'clientNames' in client && Array.isArray(client.clientNames) ? (
                    <div className="space-y-0.5">
                      {client.clientNames.map((clientName) => (
                        <div key={clientName}>{clientName}</div>
                      ))}
                    </div>
                  ) : (
                    client.name
                  )}
                </CrmTd>
                <CrmTd className="text-[13px]">{client.smsf}</CrmTd>
                <CrmTd className="text-[13px]">{client.formType}</CrmTd>
                <CrmTd className="text-[13px]">
                  <CrmStatusPill label={client.status} tone={statusTone(client.status)} />
                </CrmTd>
                <CrmTd className="text-[13px]">
                  <CrmStatusPill label={client.abnStatus} tone={statusTone(client.abnStatus)} />
                </CrmTd>
                <CrmTd className="text-[13px] text-[#667085]">{client.lastActivity}</CrmTd>
                <CrmTd className="text-[13px]">{client.staff}</CrmTd>
                <CrmTd className="text-right text-[13px]">
                  <div className="inline-flex gap-2">
                    <CrmActionPill href={`/submissions/${client.id}`} label="Review" />
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
