import type { Metadata } from 'next';
import { LayoutSwitcher } from '@/components/auth/layout-switcher';
import './globals.css';

export const metadata: Metadata = {
  title: 'Docuhub',
  description: 'Static CRM prototype aligned to supplied PDF wireframes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutSwitcher>{children}</LayoutSwitcher>
      </body>
    </html>
  );
}
