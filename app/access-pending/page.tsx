'use client';

export default function AccessPendingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-4">
      <div className="w-full max-w-[560px] rounded-[20px] border border-[#dfe3ea] bg-white px-8 py-10 text-center shadow-[0_20px_40px_rgba(17,26,47,0.06)]">
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111a2f]">Access pending</h1>
        <p className="mt-3 text-[15px] text-[#667085]">
          Your account currently has no assigned role. Please contact your administrator to request access.
        </p>
      </div>
    </div>
  );
}
