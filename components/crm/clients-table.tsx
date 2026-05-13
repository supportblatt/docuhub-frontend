"use client";

import type { ReactNode } from "react";
import {
  CrmActionPill,
  CrmStatusPill,
  CrmTable,
  CrmTablePanel,
  CrmTd,
  CrmTh,
} from "@/components/crm/ui";
import { statusTone } from "@/components/crm/status";

const formatDate = (dateStr: string | Date | null | undefined) => {
  if (!dateStr || dateStr === "-") return "-";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return String(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return String(dateStr);
  }
};

type ClientRecord = {
  id: string;
  deal?: string | null;
  contact_one?: string | null;
  contact_two?: string | null;
  stages?: string | null;
  last_interaction?: string | Date | null;
  status?: string | null;
  [key: string]: unknown;
};

type ClientColumn = {
  label: string;
  className?: string;
  render: (client: ClientRecord) => string | ReactNode;
};

const textValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
};

const clientColumns: ClientColumn[] = [
  { label: "Stage", render: (client) => textValue(client.stages) },
  {
    label: "Last Interaction",
    render: (client) => formatDate(client.last_interaction),
  },
  { label: "1st App Holder", render: (client) => textValue(client.first_app_holder) },
  { label: "Accounts", render: (client) => textValue(client.accounts) },
  { label: "Advisor", render: (client) => textValue(client.advisor) },
  { label: "Date Converted", render: (client) => textValue(client.date_converted) },
  {
    label: "Engagement Proposal Signed",
    render: (client) => textValue(client.engagement_proposal_signed),
  },
  {
    label: "Digital Docs Signed",
    render: (client) => textValue(client.digital_docs_signed),
  },
  { label: "Wet Ink Docs Prep", render: (client) => textValue(client.wet_ink_docs_prep) },
  { label: "BT Copy Emailed", render: (client) => textValue(client.bt_copy_emailed) },
  { label: "Solicitor", render: (client) => textValue(client.solicitor) },
  {
    label: "ABN",
    className: "font-mono text-[13px]",
    render: (client) => textValue(client.abn),
  },
  { label: "ABN Complying", render: (client) => textValue(client.abn_complying) },
  {
    label: "Bank Account Opened",
    render: (client) => (
      <span
        className={`px-2 py-0.5 rounded text-[12px] font-medium ${
          client.bank_account_opened === "Done"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-gray-50 text-gray-600 border border-gray-200"
        }`}
      >
        {textValue(client.bank_account_opened)}
      </span>
    ),
  },
  { label: "Client in CLASS", render: (client) => textValue(client.client_in_class) },
  {
    label: "Bank A/C in CLASS & ATO",
    render: (client) => textValue(client.bank_account_class_ato),
  },
  { label: "Accel A/C in CLASS", render: (client) => textValue(client.accel_account_class) },
  { label: "Bank App info sent", render: (client) => textValue(client.bank_app_info_sent) },
  {
    label: "20k Rollover Email Sent",
    render: (client) => textValue(client.rollover_20k_email_sent),
  },
  {
    label: "20k Rollover Completed",
    render: (client) => textValue(client.rollover_20k_completed),
  },
  { label: "Invoiced", render: (client) => textValue(client.invoiced) },
  { label: "Paid", render: (client) => textValue(client.paid) },
  {
    label: "Accountant Letter Sent",
    render: (client) => textValue(client.accountant_letter_sent),
  },
  { label: "ESA Letter Sent", render: (client) => textValue(client.esa_letter_sent) },
  {
    label: "Deposit Rollins Requested",
    render: (client) => textValue(client.deposit_rollins_requested),
  },
  { label: "Rollins Received", render: (client) => textValue(client.rollins_received) },
  {
    label: "Property Deposit Paid",
    render: (client) => textValue(client.property_deposit_paid),
  },
  {
    label: "Investment Strat Meeting",
    render: (client) => textValue(client.investment_strat_meeting),
  },
  { label: "Inv Strat Date", render: (client) => formatDate(client.inv_strat_date as string | Date | null) },
  {
    label: "Annual Compliance Signed",
    render: (client) => textValue(client.annual_compliance_signed),
  },
  {
    label: "Date AC Sent/reminder",
    render: (client) => formatDate(client.date_account_sent_reminder as string | Date | null),
  },
  {
    label: "Signed Contract of Sale",
    render: (client) => textValue(client.signed_contract_of_sale),
  },
  { label: "BTD Sent", render: (client) => textValue(client.btd_sent) },
  {
    label: "Date sent to Client",
    render: (client) => formatDate(client.date_sent_to_client as string | Date | null),
  },
  {
    label: "2026 Annual Compliance Signed",
    render: (client) => textValue(client.annual_compliance_2026_signed),
  },
  {
    label: "SMSF Client Progression",
    render: (client) => textValue(client.smsf_client_progression),
  },
  { label: "Settlement Date", render: (client) => formatDate(client.settlement_date as string | Date | null) },
  { label: "Settlement", render: (client) => textValue(client.settlement) },
  {
    label: "Post-Settlement Check in",
    render: (client) => textValue(client.post_settlement_check_in),
  },
  { label: "Insurance?", render: (client) => textValue(client.insurance) },
  { label: "Confirmed", render: (client) => textValue(client.confirmed) },
  { label: "Date", render: (client) => formatDate(client.generic_date as string | Date | null) },
];

interface ClientsTableProps {
  clients: ClientRecord[];
  selectedClientId: string | null;
  isDetailOpen: boolean;
  onSelectClient: (clientId: string) => void;
  onOpenDetails: (clientId: string) => void;
}

export function ClientsTable({
  clients,
  selectedClientId,
  isDetailOpen,
  onSelectClient,
  onOpenDetails,
}: ClientsTableProps) {
  return (
    <CrmTablePanel
      title={`All Clients (${clients.length})`}
      subtitle="View and manage client details"
    >
      <div className="overflow-x-auto crm-scroll">
        <CrmTable>
          <thead>
            <tr>
              <CrmTh className="whitespace-nowrap sticky left-0 z-10 bg-white shadow-[1px_0_0_0_#e7eaf0]">
                Deals
              </CrmTh>
              <CrmTh className="whitespace-nowrap">Contacts</CrmTh>
              {clientColumns.map((column) => (
                <CrmTh key={column.label} className="whitespace-nowrap">
                  {column.label}
                </CrmTh>
              ))}
              <CrmTh className="whitespace-nowrap">Status</CrmTh>
              <CrmTh className="whitespace-nowrap text-center w-[140px]">
                Actions
              </CrmTh>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <CrmTd
                  colSpan={clientColumns.length + 4}
                  className="py-12 text-center text-[#667085]"
                >
                  No clients found in database.
                </CrmTd>
              </tr>
            ) : (
              clients.map((client) => {
                const active = selectedClientId === client.id && isDetailOpen;

                return (
                  <tr
                    key={client.id}
                    className={`group cursor-pointer transition-colors ${
                      active ? "bg-[#f0f7ff]" : "hover:bg-[#f9fafb]"
                    }`}
                    onClick={() => onSelectClient(client.id)}
                  >
                    <CrmTd
                      className={`font-medium whitespace-nowrap sticky left-0 z-10 shadow-[1px_0_0_0_#e7eaf0] transition-colors ${
                        active
                          ? "bg-[#f0f7ff]"
                          : "bg-white group-hover:bg-[#f9fafb]"
                      }`}
                    >
                      {textValue(client.deal)}
                    </CrmTd>
                    <CrmTd className="whitespace-nowrap">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[12px] font-medium text-[#475569] border border-[#e2e8f0]">
                          {textValue(client.contact_one)}
                        </span>
                        {client.contact_two && client.contact_two !== "-" ? (
                          <span className="inline-flex items-center rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[12px] font-medium text-[#475569] border border-[#e2e8f0]">
                            {client.contact_two}
                          </span>
                        ) : null}
                      </div>
                    </CrmTd>
                    {clientColumns.map((column) => (
                      <CrmTd
                        key={`${client.id}-${column.label}`}
                        className={`whitespace-nowrap ${column.className ?? ""}`}
                      >
                        {column.render(client)}
                      </CrmTd>
                    ))}
                    <CrmTd className="whitespace-nowrap">
                      <CrmStatusPill
                        label={client.status ?? "-"}
                        tone={statusTone(client.status ?? "-")}
                      />
                    </CrmTd>
                    <CrmTd className="text-center w-[140px]">
                      <CrmActionPill
                        label="View Details"
                        href="#"
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenDetails(client.id);
                        }}
                      />
                    </CrmTd>
                  </tr>
                );
              })
            )}
          </tbody>
        </CrmTable>
      </div>
    </CrmTablePanel>
  );
}
