import Link from 'next/link';
import { Check, ChevronDown, PencilLine, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CrmActionPill, CrmCard, CrmStatusPill } from '@/components/crm/ui';
import { statusTone } from '@/components/crm/status';
import { submissions } from '@/lib/mock-data';

const tabTitles: Array<{ key: string; title: string }> = [
  { key: 'overview', title: 'Overview' },
  { key: 'full-details', title: 'Full Details' },
  { key: 'checklist', title: 'Checklist' },
  { key: 'edit', title: 'Edit Submission' },
  { key: 'status', title: 'Change Status' },
  { key: 'request-changes', title: 'Request Changes' },
  { key: 'mark-ready', title: 'Mark Ready' }
];

export default async function SubmissionDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ submissionId: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { submissionId } = await params;
  const query = await searchParams;
  const submission = submissions.find((item) => item.id === submissionId) ?? submissions[0];
  const tab = query.tab ?? 'overview';

  return (
    <div className="mx-auto w-full max-w-[1700px]">
      <CrmCard className="p-6 shadow-[0_14px_24px_rgba(16,24,40,0.1)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-[#111827]">Edit Submission</h1>
            <div className="mt-2.5 flex items-center gap-3 text-[15px] text-[#667085]">
              <span>
                {submission.client} · {submission.id}
              </span>
              <CrmStatusPill label={submission.status} tone={statusTone(submission.status)} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CrmActionPill href={`/submissions/${submission.id}?tab=status`} label="Change Status" tone="purple" />
            <button type="button" className="rounded-full p-1 text-[#6b7280]">
              <X className="h-8 w-8" />
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-[16px] bg-[#eceef3] p-1.5">
          <div className="grid gap-2 md:grid-cols-4">
            {tabTitles.slice(0, 4).map((item) => (
              <Link
                key={item.key}
                href={`/submissions/${submission.id}?tab=${item.key}`}
                className={`rounded-[12px] px-4 py-2.5 text-center text-[14px] font-medium ${
                  tab === item.key ? 'bg-white text-[#111827]' : 'text-[#344054]'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[14px] border border-[#b8d4ff] bg-[#eaf3ff] p-4 text-[#2459dd]">
          <p className="text-[22px] font-semibold">Admin Edit Mode</p>
          <p className="mt-2 text-[15px]">
            You can edit all form fields on behalf of the client. Changes are saved immediately and will be reflected in the
            submission record.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <Section title="Fund Details">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name of SMSF / Trust Fund*" value="Mitchell Family Super Fund" className="md:col-span-2" />
              <Field label="State of Registration*" value="VIC" />
              <Field label="Number of Members*" value="2" />
              <Field label="Trustee Type" value="Corporate Trustee" />
              <Field label="Trustee Details" value="New Corporate Trustee Company" />
              <Field label="Reference / Matter Reference" value="ADV-2026-0412" className="md:col-span-2" />
              <Field label="Does the fund already have an ABN?" value="No" />
            </div>
          </Section>

          <Section title="Company Details">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Company Status" value="New company to be registered" className="md:col-span-2" />
              <Field label="Proposed / Existing Company Name" value="Mitchell SMSF Trustee Pty Ltd" className="md:col-span-2" />
              <Field label="Legal Element" value="Pty Ltd" />
              <Field label="Jurisdiction / State" value="VIC" />
              <Field label="Use A.C.N. as company name?" value="No" />
              <Field label="SMSF Trustee Company Only?" value="Yes" />
            </div>
          </Section>

          <Section title="Member 1: Sarah Mitchell">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title*" value="Mrs" />
              <Field label="First Given Name*" value="Sarah" />
              <Field label="Other Given Name(s)" value="" />
              <Field label="Last Name*" value="Mitchell" />
              <Field label="Phone Number*" value="0412 345 678" />
              <Field label="Email*" value="sarah.mitchell@email.com" />
              <Field label="Occupation" value="Financial Analyst" />
              <Field label="Residential Address*" value="12 Elm Street, Richmond VIC 3121" className="md:col-span-2" />
            </div>
          </Section>

          <Section title="Declaration">
            <div className="space-y-3 text-[15px] text-[#111827]">
              {[
                'Information provided is true and correct',
                'Has authority to submit this application',
                'Understands the purpose of the fund',
                'Understands information may be forwarded',
                'Has read and accepted the privacy policy'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#020724] text-white">
                    <Check className="h-5 w-5" />
                  </span>
                  {item}
                </div>
              ))}
              <Field label="Full Name (as signed)" value="Sarah Mitchell" />
            </div>
          </Section>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e8ef] pt-6">
          <Button variant="outline" className="h-12 rounded-[14px] px-6">
            <X className="mr-2 h-4 w-4" />
            Discard Changes
          </Button>
          <Button className="h-12 rounded-[14px] px-6">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CrmCard>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-[14px] border border-[#dfe3ea] bg-white">
      <div className="flex items-center justify-between bg-[#f6f7fb] px-5 py-3.5">
        <h2 className="text-[22px] font-semibold text-[#1f2937]">{title}</h2>
        <ChevronDown className="h-6 w-6 text-[#6b7280]" />
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[14px] font-medium text-[#111827]">{label}</label>
      <div className="flex h-11 items-center rounded-[12px] bg-[#f3f4f7] px-4 text-[14px] text-[#667085]">{value || ' '}</div>
    </div>
  );
}
