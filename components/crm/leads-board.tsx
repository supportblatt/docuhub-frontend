'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CrmStatusPill, CrmTable, CrmTd, CrmTh } from '@/components/crm/ui';
import { statusTone } from '@/components/crm/status';

export type LeadType = {
  id: string;
  leadName: string;
  status: string;
  hubspotGroup: string;
  advisorReferrer: string;
  followUpDate: string;
  clientsTimezone: string;
  smsfContact1: string;
  smsfContact2: string;
  firstClientsPhone: string;
  notesInSalesforce: string;
  m1Confirmed: string;
  strategyMeetingDate: string;
  m2Confirmed: string;
  meeting2Date: string;
  propertyMeetingDate: string;
  converted: string;
  contractsEmail: string;
  advisorEmail: string;
};

const GROUP_COLORS: Record<string, string> = {
  'New Leads': 'bg-[#3b82f6]', // Blue
  'Freedom Active Leads': 'bg-[#eab308]', // Yellow
  'Alliance Not Progressing': 'bg-[#9ca3af]' // Gray
};

const formatDate = (dateStr: string | Date | null) => {
  if (!dateStr || dateStr === '-') return '-';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return String(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return String(dateStr);
  }
};

function LeadsGroup({ name, leads, defaultExpanded = true }: { name: string; leads: LeadType[]; defaultExpanded?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const accentColor = GROUP_COLORS[name] || 'bg-[#e5e7eb]';

  return (
    <div className="mb-6 flex overflow-hidden rounded-lg border border-[#e7eaf0] bg-white shadow-sm">
      {/* Left Color Accent Bar */}
      <div className={`w-2 flex-shrink-0 ${accentColor}`} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Collapsible Header */}
        <div
          className="flex cursor-pointer select-none items-center gap-2 bg-[#f8fafc] px-4 py-3 hover:bg-[#f1f5f9] transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex h-5 w-5 items-center justify-center text-[#64748b]">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
          <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[#0f172a]">{name}</h3>
          <span className="text-[14px] text-[#64748b]">({leads.length} Leads)</span>
        </div>

        {/* Expandable Table Content */}
        {isExpanded && (
          <div className="crm-scroll overflow-x-auto border-t border-[#e7eaf0]">
            <CrmTable>
              <thead>
                <tr>
                  <CrmTh className="sticky left-0 z-10 min-w-[200px] whitespace-nowrap bg-white shadow-[1px_0_0_0_#e7eaf0]">
                    Lead
                  </CrmTh>
                  <CrmTh className="whitespace-nowrap">Status</CrmTh>
                  <CrmTh className="whitespace-nowrap">Advisor/Referrer</CrmTh>
                  <CrmTh className="whitespace-nowrap">Follow Up</CrmTh>
                  <CrmTh className="whitespace-nowrap">Clients Timezone</CrmTh>
                  <CrmTh className="min-w-[200px] whitespace-nowrap">SMSF Contacts</CrmTh>
                  <CrmTh className="whitespace-nowrap">First Clients Phone</CrmTh>
                  <CrmTh className="min-w-[300px] whitespace-nowrap">Notes in Salesforce</CrmTh>
                  <CrmTh className="whitespace-nowrap">M1 Confirmed</CrmTh>
                  <CrmTh className="whitespace-nowrap">Strategy Meeting Date</CrmTh>
                  <CrmTh className="whitespace-nowrap">M2 Confirmed</CrmTh>
                  <CrmTh className="whitespace-nowrap">Meeting 2 Date</CrmTh>
                  <CrmTh className="whitespace-nowrap">Property Meeting Date</CrmTh>
                  <CrmTh className="whitespace-nowrap">Converted</CrmTh>
                  <CrmTh className="whitespace-nowrap">Contracts Email</CrmTh>
                  <CrmTh className="whitespace-nowrap">Advisor Email</CrmTh>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="group">
                    <CrmTd className="sticky left-0 z-10 whitespace-nowrap bg-white font-medium shadow-[1px_0_0_0_#e7eaf0] transition-colors group-hover:bg-[#f9fafb]">
                      {lead.leadName}
                    </CrmTd>
                    <CrmTd className="whitespace-nowrap">
                      <CrmStatusPill label={lead.status} tone={statusTone(lead.status)} />
                    </CrmTd>
                    <CrmTd className="whitespace-nowrap">{lead.advisorReferrer}</CrmTd>
                    <CrmTd className="whitespace-nowrap">{formatDate(lead.followUpDate)}</CrmTd>
                    <CrmTd className="whitespace-nowrap">{lead.clientsTimezone}</CrmTd>
                    <CrmTd className="whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span>{lead.smsfContact1}</span>
                        {lead.smsfContact2 && lead.smsfContact2 !== '-' && (
                          <span className="text-[#667085]">{lead.smsfContact2}</span>
                        )}
                      </div>
                    </CrmTd>
                    <CrmTd className="whitespace-nowrap">{lead.firstClientsPhone}</CrmTd>
                    <CrmTd
                      className="max-w-[300px] truncate whitespace-nowrap hover:overflow-visible hover:whitespace-normal hover:text-clip"
                      title={lead.notesInSalesforce}
                    >
                      {lead.notesInSalesforce}
                    </CrmTd>
                    <CrmTd className="whitespace-nowrap">{lead.m1Confirmed}</CrmTd>
                    <CrmTd className="whitespace-nowrap">{formatDate(lead.strategyMeetingDate)}</CrmTd>
                    <CrmTd className="whitespace-nowrap">{lead.m2Confirmed}</CrmTd>
                    <CrmTd className="whitespace-nowrap">{formatDate(lead.meeting2Date)}</CrmTd>
                    <CrmTd className="whitespace-nowrap">{formatDate(lead.propertyMeetingDate)}</CrmTd>
                    <CrmTd className="whitespace-nowrap">{lead.converted}</CrmTd>
                    <CrmTd className="whitespace-nowrap">{lead.contractsEmail}</CrmTd>
                    <CrmTd className="whitespace-nowrap">{lead.advisorEmail}</CrmTd>
                  </tr>
                ))}
              </tbody>
            </CrmTable>
          </div>
        )}
      </div>
    </div>
  );
}

export function LeadsBoard({ leads }: { leads: LeadType[] }) {
  const groupedLeads = leads.reduce((acc, lead) => {
    const group = lead.hubspotGroup || 'Ungrouped';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(lead);
    return acc;
  }, {} as Record<string, LeadType[]>);

  const order = ['New Leads', 'Freedom Active Leads', 'Alliance Not Progressing'];
  const sortedGroups = Object.keys(groupedLeads).sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="mt-8 space-y-2">
      {sortedGroups.map((groupName) => (
        <LeadsGroup key={groupName} name={groupName} leads={groupedLeads[groupName]} />
      ))}
    </div>
  );
}
