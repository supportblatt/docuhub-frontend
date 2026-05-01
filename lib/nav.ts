export const NAV_ITEMS = [
  { key: 'DASHBOARD', label: 'Dashboard', href: '/dashboard' },
  { key: 'CLIENTS', label: 'Clients', href: '/clients' },
  { key: 'FORMS', label: 'Forms', href: '/forms' },
  { key: 'SUBMISSIONS', label: 'Submissions', href: '/submissions' },
  { key: 'ABN_TRACKING', label: 'ABN Tracking', href: '/abn-tracking' },
  { key: 'DOCUMENTS', label: 'Documents', href: '/documents' },
  { key: 'REPORTS', label: 'Reports', href: '/reports' },
  { key: 'SETTINGS', label: 'Settings', href: '/settings' }
] as const;

export type NavItemKey = (typeof NAV_ITEMS)[number]['key'];

export const NAV_KEY_BY_HREF_PREFIX: Array<{ key: NavItemKey; hrefPrefix: string }> = NAV_ITEMS.map((item) => ({
  key: item.key,
  hrefPrefix: item.href
}));

export const NAV_HREF_BY_KEY = new Map<NavItemKey, string>(NAV_ITEMS.map((item) => [item.key, item.href]));
