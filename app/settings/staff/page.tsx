import { Button } from '@/components/ui/button';
import { CrmCard, CrmPageHeader, CrmStatusPill } from '@/components/crm/ui';
import { SettingsTabs } from '@/components/crm/settings-tabs';

const staff = [
  { initials: 'AC', name: 'Alex Chen', role: 'Admin', email: 'alex.chen@trustfundcrm.com' },
  { initials: 'ED', name: 'Emma Davis', role: 'Adviser Edit', email: 'emma.davis@trustfundcrm.com' },
  { initials: 'SP', name: 'Sarah Park', role: 'Reviewer Edit', email: 'sarah.park@trustfundcrm.com' }
] as const;

const roles = [
  ['Admin', 'Full access to all features and settings'],
  ['Adviser', 'Can send forms, view submissions, and manage clients'],
  ['Reviewer', 'Can review submissions and request changes'],
  ['Read-only', 'Can view applications but cannot edit']
] as const;

export default function SettingsStaffPage() {
  return (
    <div className="space-y-8">
      <CrmPageHeader title="Settings" subtitle="Configure CRM settings and preferences" />
      <SettingsTabs />

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">Staff Members</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">Manage team members and their roles</p>
        <div className="mt-7 space-y-3">
          {staff.map((member) => (
            <div key={member.email} className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-[#e8ebf1] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9eff8] text-sm font-semibold text-[#2459dd]">
                  {member.initials}
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#111827]">{member.name}</p>
                  <p className="text-[14px] text-[#667085]">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CrmStatusPill label={member.role} tone="slate" />
                <Button variant="outline" className="h-10 rounded-[12px] px-4">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-8 text-[24px] font-semibold text-[#111827]">Role Permissions</h3>
        <p className="text-[16px] text-[#667085]">Configure permissions for each role</p>
        <div className="mt-4 space-y-2">
          {roles.map(([role, note]) => (
            <div key={role} className="rounded-[14px] border border-[#e8ebf1] px-5 py-4">
              <p className="text-[16px] font-semibold text-[#111827]">{role}</p>
              <p className="text-[14px] text-[#667085]">{note}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button className="h-12 rounded-[14px] px-6">Add Staff Member</Button>
        </div>
      </CrmCard>
    </div>
  );
}
