'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { AuthProvider } from '@/components/auth/auth-context';
import { getCurrentUser, type AuthUser } from '@/lib/auth-api';
import { NAV_KEY_BY_HREF_PREFIX } from '@/lib/nav';

interface LayoutSwitcherProps {
  children: ReactNode;
}

function isPublicPath(pathname: string) {
  return pathname === '/login' || pathname.startsWith('/login/');
}

function isStandalonePrivatePath(pathname: string) {
  return pathname === '/onboarding' || pathname === '/access-pending';
}

function destinationForAuthenticatedUser(user: AuthUser) {
  if (user.needsOnboarding) {
    return '/onboarding';
  }

  if (!user.roleId) {
    return '/access-pending';
  }

  return '/dashboard';
}

function pathNavKey(pathname: string) {
  for (const item of NAV_KEY_BY_HREF_PREFIX) {
    if (pathname === item.hrefPrefix || pathname.startsWith(`${item.hrefPrefix}/`)) {
      return item.key;
    }
  }

  return null;
}

function canAccessPath(user: AuthUser, pathname: string) {
  if (isStandalonePrivatePath(pathname)) {
    return true;
  }

  if (user.needsOnboarding) {
    return pathname === '/onboarding';
  }

  if (!user.roleId) {
    return pathname === '/access-pending';
  }

  if (pathname === '/settings' || pathname.startsWith('/settings/')) {
    if (user.roleIsAdmin) {
      return true;
    }

    return pathname === '/settings/security';
  }

  const key = pathNavKey(pathname);
  if (!key) {
    return true;
  }

  return user.accessibleNavItems.includes(key);
}

export function LayoutSwitcher({ children }: LayoutSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const publicPath = isPublicPath(pathname);
  const standalonePrivatePath = isStandalonePrivatePath(pathname);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let active = true;
    setCheckingAuth(true);

    getCurrentUser()
      .then((currentUser) => {
        if (!active) {
          return;
        }

        setUser(currentUser);

        if (publicPath) {
          router.replace(destinationForAuthenticatedUser(currentUser));
          return;
        }

        if (!canAccessPath(currentUser, pathname)) {
          if ((pathname === '/settings' || pathname.startsWith('/settings/')) && !currentUser.roleIsAdmin) {
            router.replace('/settings/security');
            return;
          }

          router.replace(destinationForAuthenticatedUser(currentUser));
          return;
        }

        setCheckingAuth(false);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setUser(null);
        if (!publicPath) {
          router.replace('/login');
          return;
        }

        setCheckingAuth(false);
      });

    return () => {
      active = false;
    };
  }, [pathname, publicPath, router]);

  const content = useMemo(() => {
    if (publicPath || standalonePrivatePath || !user) {
      return <>{children}</>;
    }

    return <AppShell user={user}>{children}</AppShell>;
  }, [children, publicPath, standalonePrivatePath, user]);

  if (checkingAuth && !publicPath) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-4">
        <p className="text-[15px] text-[#667085]">Checking session...</p>
      </div>
    );
  }

  return <AuthProvider user={user}>{content}</AuthProvider>;
}
