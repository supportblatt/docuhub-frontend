"use client";

import { X } from "lucide-react";
import { CrmCard } from "@/components/crm/ui";

const formatDate = (dateStr: string | Date | null) => {
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

const formatCurrency = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") return "-";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 2,
  }).format(numeric);
};

const valueOrDash = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
};

function DetailField({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string | number | null | undefined;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[#667085]">{label}</p>
      <p className="font-medium text-[#111827]">{valueOrDash(value)}</p>
    </div>
  );
}

interface SmsfMember {
  id: string;
  memberNumber: number;
  title?: string | null;
  firstName?: string | null;
  otherGivenNames?: string | null;
  lastName?: string | null;
  formerGivenName?: string | null;
  formerLastName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  addressUnit?: string | null;
  addressStreetNumber?: string | null;
  addressStreetName?: string | null;
  addressStreetType?: string | null;
  addressSuburb?: string | null;
  addressState?: string | null;
  addressPostcode?: string | null;
  cityOfBirth?: string | null;
  stateOfBirth?: string | null;
  countryOfBirth?: string | null;
  dateOfBirth?: string | Date | null;
  occupation?: string | null;
  tfn?: string | null;
  driversLicence?: string | null;
  passport?: string | null;
  superFundName?: string | null;
  superFundAbn?: string | null;
  superFundUsi?: string | null;
  superMemberIdNumber?: string | null;
  superCurrentBalance?: string | number | null;
}

interface ClientInfo {
  memberCount: number;
  members: SmsfMember[];
}

interface ClientDetailPanelProps {
  selected: {
    deal?: string | null;
    clientInfo?: ClientInfo | null;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function ClientDetailPanel({
  selected,
  isOpen,
  onClose,
}: ClientDetailPanelProps) {
  if (!isOpen || !selected) return null;

  const clientInfo = selected.clientInfo;
  const members = clientInfo?.members ?? [];
  const memberCount = clientInfo?.memberCount ?? members.length;

  return (
    <CrmCard className="flex flex-col h-full overflow-hidden border-[#dfe3ea] animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-[#f1f5f9] flex-shrink-0 flex items-center justify-between">
        <div>
          <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#111a2f]">
            {selected.deal}
          </h3>
          <p className="mt-0.5 text-[14px] text-[#667085]">
            Client Information
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors text-[#667085]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 crm-scroll">
        <div className="space-y-4">
          <h4 className="text-[14px] font-bold text-[#111827] uppercase tracking-wider">
            SMSF Setup
          </h4>
          <div className="grid grid-cols-2 gap-4 text-[14px]">
            <DetailField
              label="Number of Members"
              value={
                memberCount
                  ? `${memberCount} ${memberCount === 1 ? "Member" : "Members"}`
                  : "-"
              }
            />
          </div>
        </div>

        {members.length === 0 ? (
          <div className="pt-6 border-t border-[#f1f5f9]">
            <p className="text-[14px] text-[#667085]">
              No SMSF member data found for this client.
            </p>
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="space-y-6 pt-6 border-t border-[#f1f5f9]"
            >
              <div className="space-y-4">
                <h4 className="text-[14px] font-bold text-[#111827] uppercase tracking-wider">
                  Client / Member #{member.memberNumber} Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-[14px]">
                  <DetailField label="Title" value={member.title} />
                  <DetailField
                    label="First Given Name"
                    value={member.firstName}
                  />
                  <DetailField
                    label="Other Given Name(s)"
                    value={member.otherGivenNames}
                  />
                  <DetailField label="Last Name" value={member.lastName} />
                  <DetailField
                    label="Phone Number"
                    value={member.phoneNumber}
                  />
                  <DetailField
                    label="Former Given Name"
                    value={member.formerGivenName}
                  />
                  <DetailField
                    label="Former Last Name"
                    value={member.formerLastName}
                  />
                  <DetailField label="Occupation" value={member.occupation} />
                  <DetailField
                    label="Email Address"
                    value={member.email}
                    className="col-span-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[14px] font-bold text-[#111827] uppercase tracking-wider">
                  Residential Address
                </h4>
                <div className="grid grid-cols-2 gap-4 text-[14px]">
                  <DetailField
                    label="Unit / Level"
                    value={member.addressUnit}
                  />
                  <DetailField
                    label="Street Number"
                    value={member.addressStreetNumber}
                  />
                  <DetailField
                    label="Street Name"
                    value={member.addressStreetName}
                  />
                  <DetailField
                    label="Street Type"
                    value={member.addressStreetType}
                  />
                  <DetailField
                    label="Suburb / City"
                    value={member.addressSuburb}
                  />
                  <DetailField
                    label="State / Postcode"
                    value={[member.addressState, member.addressPostcode]
                      .filter(Boolean)
                      .join(" ")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[14px] font-bold text-[#111827] uppercase tracking-wider">
                  Birth & Identity
                </h4>
                <div className="grid grid-cols-2 gap-4 text-[14px]">
                  <DetailField
                    label="City Of Birth"
                    value={member.cityOfBirth}
                  />
                  <DetailField
                    label="State of Birth (AU)"
                    value={member.stateOfBirth}
                  />
                  <DetailField
                    label="Country Of Birth"
                    value={member.countryOfBirth}
                  />
                  <DetailField
                    label="Date Of Birth"
                    value={formatDate(member.dateOfBirth ?? null)}
                  />
                  <DetailField label="Tax File Number" value={member.tfn} />
                  <DetailField
                    label="Drivers Licence Number"
                    value={member.driversLicence}
                  />
                  <DetailField
                    label="Passport Number"
                    value={member.passport}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[14px] font-bold text-[#111827] uppercase tracking-wider">
                  Superannuation
                </h4>
                <div className="grid grid-cols-2 gap-4 text-[14px]">
                  <DetailField
                    label="Existing Fund"
                    value={member.superFundName}
                  />
                  <DetailField label="Fund ABN" value={member.superFundAbn} />
                  <DetailField label="Fund USI" value={member.superFundUsi} />
                  <DetailField
                    label="Member Number"
                    value={member.superMemberIdNumber}
                  />
                  <DetailField
                    label="Current Balance"
                    value={formatCurrency(member.superCurrentBalance)}
                    className="col-span-2"
                  />
                </div>
              </div>
            </div>
          ))
        )}

      </div>
    </CrmCard>
  );
}
