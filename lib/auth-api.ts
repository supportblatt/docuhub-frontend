import type { NavItemKey } from '@/lib/nav';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4100/api';
const CSRF_COOKIE_NAME = process.env.NEXT_PUBLIC_CSRF_COOKIE_NAME ?? 'docuhub_csrf';
const CSRF_HEADER_NAME = 'X-CSRF-Token';
const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  isSsoUser: boolean;
  requiresUsernameSetup: boolean;
  displayName: string | null;
  firstName: string | null;
  lastName: string | null;
  roleId: string | null;
  roleName: string | null;
  roleIsAdmin: boolean;
  isActive: boolean;
  accessibleNavItems: NavItemKey[];
  mustChangePassword: boolean;
  otpSetupRequired: boolean;
  needsOnboarding: boolean;
  totpEnabled: boolean;
}

export interface RoleRecord {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  isAdmin: boolean;
  allowedNavItems: NavItemKey[];
  createdAt: string;
  updatedAt: string;
}

export interface ManagedUserRecord {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  isActive: boolean;
  roleId: string | null;
  roleName: string | null;
  roleIsAdmin: boolean;
  allowedNavItems: NavItemKey[];
  loginMethods: {
    password: boolean;
    sso: boolean;
  };
  mustChangePassword: boolean;
  otpSetupRequired: boolean;
  totpEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiErrorShape {
  message?: string | string[];
  error?: string;
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function readCookie(name: string) {
  if (!isBrowser()) {
    return null;
  }

  const cookie = document.cookie
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(name.length + 1));
}

async function ensureCsrfTokenCookie() {
  let csrfToken = readCookie(CSRF_COOKIE_NAME);
  if (csrfToken) {
    return csrfToken;
  }

  try {
    await fetch(`${API_BASE_URL}/auth/csrf`, {
      method: 'GET',
      credentials: 'include'
    });
  } catch {
    return null;
  }

  csrfToken = readCookie(CSRF_COOKIE_NAME);
  return csrfToken;
}

async function readJsonSafe(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

function toErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const value = payload as ApiErrorShape;
  if (Array.isArray(value.message)) {
    return value.message.join(', ');
  }

  return value.message || value.error || fallback;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? 'GET').toUpperCase();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((init?.headers as Record<string, string> | undefined) ?? {})
  };

  if (MUTATING_METHODS.has(method)) {
    const csrfToken = await ensureCsrfTokenCookie();
    if (csrfToken) {
      headers[CSRF_HEADER_NAME] = csrfToken;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    method,
    credentials: 'include',
    headers
  });

  const payload = await readJsonSafe(response);

  if (!response.ok) {
    throw new Error(toErrorMessage(payload, 'Request failed.'));
  }

  return payload as T;
}

export function microsoftStartUrl() {
  return `${API_BASE_URL}/auth/microsoft/start`;
}

export function loginWithPassword(input: { username: string; password: string }) {
  return request<
    | {
        requiresTotp: false;
        expiresAt: string;
        user: AuthUser;
      }
    | {
        requiresTotp: true;
        challengeToken: string;
        challengeExpiresAt: string;
        user: { username: string; displayName: string | null };
      }
  >('/auth/login/password', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export function completeTotpLogin(input: { challengeToken: string; code: string }) {
  return request<{
    requiresTotp: false;
    expiresAt: string;
    user: AuthUser;
  }>('/auth/login/totp', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export function getCurrentUser() {
  return request<AuthUser>('/auth/me');
}

export function completeOnboardingProfile(input: { username?: string; firstName: string; lastName: string; password: string }) {
  return request<AuthUser>('/auth/onboarding/profile', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export function initializeTotp() {
  return request<{
    secret: string;
    otpauthUri: string;
    issuer: string;
  }>('/auth/totp/setup/init', {
    method: 'POST'
  });
}

export function confirmTotp(code: string) {
  return request<{ enabled: boolean }>('/auth/totp/setup/confirm', {
    method: 'POST',
    body: JSON.stringify({ code })
  });
}

export function disableTotp() {
  return request<{ enabled: boolean; setupRequired?: boolean }>('/auth/totp', {
    method: 'DELETE'
  });
}

export function logout() {
  return request<{ success: boolean }>('/auth/logout', {
    method: 'POST'
  });
}

export function registerLocal(input: {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}) {
  return request<{
    requiresTotp: false;
    expiresAt: string;
    user: AuthUser;
  }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export function listRoles() {
  return request<RoleRecord[]>('/iam/roles');
}

export function createRole(input: { name: string; description?: string; allowedNavItems: NavItemKey[]; isAdmin: boolean }) {
  return request<RoleRecord>('/iam/roles', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export function updateRole(roleId: string, input: { name?: string; description?: string; allowedNavItems?: NavItemKey[]; isAdmin?: boolean }) {
  return request<RoleRecord>(`/iam/roles/${roleId}`, {
    method: 'PATCH',
    body: JSON.stringify(input)
  });
}

export function deleteRole(roleId: string) {
  return request<{ success: boolean }>(`/iam/roles/${roleId}`, {
    method: 'DELETE'
  });
}

export function listManagedUsers() {
  return request<ManagedUserRecord[]>('/iam/users');
}

export function createManagedUser(input: { username: string; email: string; password: string; roleId?: string }) {
  return request<ManagedUserRecord>('/iam/users', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export function updateManagedUser(
  userId: string,
  input: {
    email?: string;
    firstName?: string;
    lastName?: string;
    roleId?: string | null;
    isActive?: boolean;
    resetPassword?: string;
    resetTotpDevice?: boolean;
  }
) {
  return request<ManagedUserRecord>(`/iam/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(input)
  });
}

export function deleteManagedUser(userId: string) {
  return request<{ success: boolean }>(`/iam/users/${userId}`, {
    method: 'DELETE'
  });
}
