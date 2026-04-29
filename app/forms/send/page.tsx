import Link from 'next/link';
import { Send } from 'lucide-react';
import { CrmActionPill, CrmCard, CrmPageHeader, CrmStatusPill } from '@/components/crm/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const steps = ['Client Details', 'Select Sections', 'Form Settings', 'Send Method'] as const;

export default async function SendFormPage({
  searchParams
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const params = await searchParams;
  const step = Math.min(4, Math.max(1, Number(params.step ?? 1)));

  return (
    <div className="space-y-8">
      <CrmPageHeader title="Forms" subtitle="Manage and send client forms" />

      <CrmCard className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[28px] font-semibold text-[#111827]">Send Trust Fund Form</h2>
            <p className="mt-1 text-[16px] text-[#667085]">Step {step} of 4</p>
          </div>
          <CrmStatusPill label="Draft" tone="slate" />
        </div>

        <div className="mt-6 rounded-[16px] bg-[#eceef3] p-2">
          <div className="grid gap-2 md:grid-cols-4">
            {steps.map((label, index) => {
              const current = index + 1;
              return (
                <Link
                  key={label}
                  href={`/forms/send?step=${current}`}
                  className={`rounded-[12px] px-4 py-2.5 text-center text-[14px] font-medium ${
                    step === current ? 'bg-white text-[#111827]' : 'text-[#475467]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">Client Name</label>
            <Input defaultValue="Sarah Mitchell" />
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">Email</label>
            <Input defaultValue="sarah.mitchell@email.com" />
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">Form Type</label>
            <Input defaultValue="SMSF + Corporate Trustee" />
          </div>
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#111827]">Due Date</label>
            <Input defaultValue="May 7, 2026" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <Button variant="outline" className="h-11 rounded-[14px] px-5">
            Back
          </Button>
          <Button className="h-11 rounded-[14px] px-6">
            <Send className="mr-2 h-4 w-4" />
            {step === 4 ? 'Send Form' : 'Continue'}
          </Button>
        </div>
      </CrmCard>
    </div>
  );
}
