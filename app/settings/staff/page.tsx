'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CrmCard, CrmPageHeader, CrmStatusPill } from '@/components/crm/ui';
import { SettingsTabs } from '@/components/crm/settings-tabs';
import { InitialsAvatar } from '@/components/shared/initials-avatar';
import {
  createManagedUser,
  createRole,
  deleteManagedUser,
  deleteRole,
  listManagedUsers,
  listRoles,
  updateManagedUser,
  updateRole,
  type ManagedUserRecord,
  type RoleRecord
} from '@/lib/auth-api';
import { NAV_ITEMS, type NavItemKey } from '@/lib/nav';

const assignableMenus = NAV_ITEMS.filter((item) => item.key !== 'DASHBOARD');

function ModalShell({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111827]/40 px-4" onClick={onClose}>
      <div
        className="w-full max-w-[680px] rounded-[16px] border border-[#dfe3ea] bg-white p-6 shadow-[0_20px_48px_rgba(17,26,47,0.24)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111827]">{title}</h3>
          <button type="button" onClick={onClose} className="text-[13px] font-semibold text-[#667085] hover:text-[#111827]">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

function roleAccessSummary(role: RoleRecord) {
  if (role.isAdmin) {
    return 'Full access to all menu items and settings';
  }

  const labels = role.allowedNavItems
    .filter((key) => key !== 'DASHBOARD')
    .map((key) => NAV_ITEMS.find((item) => item.key === key)?.label)
    .filter(Boolean) as string[];

  return labels.join(', ');
}

export default function SettingsStaffPage() {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [users, setUsers] = useState<ManagedUserRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);

  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUserRoleId, setNewUserRoleId] = useState('');

  const [editUserId, setEditUserId] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserFirstName, setEditUserFirstName] = useState('');
  const [editUserLastName, setEditUserLastName] = useState('');
  const [editUserRoleId, setEditUserRoleId] = useState('');
  const [editUserIsActive, setEditUserIsActive] = useState(true);
  const [editUserResetPassword, setEditUserResetPassword] = useState('');

  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [newRoleMenus, setNewRoleMenus] = useState<NavItemKey[]>([]);
  const [newRoleIsAdmin, setNewRoleIsAdmin] = useState(false);

  const [editRoleId, setEditRoleId] = useState('');
  const [editRoleName, setEditRoleName] = useState('');
  const [editRoleDescription, setEditRoleDescription] = useState('');
  const [editRoleMenus, setEditRoleMenus] = useState<NavItemKey[]>([]);
  const [editRoleIsSystem, setEditRoleIsSystem] = useState(false);
  const [editRoleIsAdmin, setEditRoleIsAdmin] = useState(false);

  const roleOptions = useMemo(() => roles.map((role) => ({ value: role.id, label: role.name })), [roles]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [roleRows, userRows] = await Promise.all([listRoles(), listManagedUsers()]);
      setRoles(roleRows);
      setUsers(userRows);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load staff permissions data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const toggleMenu = (menus: NavItemKey[], key: NavItemKey) => {
    if (menus.includes(key)) {
      return menus.filter((item) => item !== key);
    }

    return [...menus, key];
  };

  const openEditUserModal = (user: ManagedUserRecord) => {
    setEditUserId(user.id);
    setEditUserEmail(user.email);
    setEditUserFirstName(user.firstName ?? '');
    setEditUserLastName(user.lastName ?? '');
    setEditUserRoleId(user.roleId ?? '');
    setEditUserIsActive(user.isActive);
    setEditUserResetPassword('');
    setShowEditUser(true);
  };

  const openEditRoleModal = (role: RoleRecord) => {
    setEditRoleId(role.id);
    setEditRoleName(role.name);
    setEditRoleDescription(role.description ?? '');
    setEditRoleMenus(role.allowedNavItems.filter((item) => item !== 'DASHBOARD') as NavItemKey[]);
    setEditRoleIsSystem(role.isSystem);
    setEditRoleIsAdmin(role.isAdmin);
    setShowEditRole(true);
  };

  const handleCreateUser = async () => {
    setBusy(true);
    setError(null);

    try {
      await createManagedUser({
        username: newUsername,
        email: newEmail,
        password: newPassword,
        roleId: newUserRoleId || undefined
      });
      setNewUsername('');
      setNewEmail('');
      setNewPassword('');
      setNewUserRoleId('');
      setShowAddUser(false);
      await loadData();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to create user.');
    } finally {
      setBusy(false);
    }
  };

  const handleUpdateUser = async () => {
    setBusy(true);
    setError(null);

    try {
      await updateManagedUser(editUserId, {
        email: editUserEmail,
        firstName: editUserFirstName || undefined,
        lastName: editUserLastName || undefined,
        roleId: editUserRoleId || null,
        isActive: editUserIsActive,
        resetPassword: editUserResetPassword || undefined
      });
      setShowEditUser(false);
      await loadData();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to update user.');
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!editUserId || !window.confirm('Delete this user?')) {
      return;
    }

    setBusy(true);
    setError(null);

    try {
      await deleteManagedUser(editUserId);
      setShowEditUser(false);
      await loadData();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to delete user.');
    } finally {
      setBusy(false);
    }
  };

  const handleResetUserTotp = async () => {
    if (!editUserId || !window.confirm('Reset this user authenticator device? They will be required to set up TOTP again on next login.')) {
      return;
    }

    setBusy(true);
    setError(null);

    try {
      await updateManagedUser(editUserId, {
        resetTotpDevice: true
      });
      setShowEditUser(false);
      await loadData();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to reset authenticator device.');
    } finally {
      setBusy(false);
    }
  };

  const handleCreateRole = async () => {
    setBusy(true);
    setError(null);

    try {
      await createRole({
        name: newRoleName,
        description: newRoleDescription || undefined,
        allowedNavItems: newRoleMenus,
        isAdmin: Boolean(newRoleIsAdmin)
      });
      setNewRoleName('');
      setNewRoleDescription('');
      setNewRoleMenus([]);
      setNewRoleIsAdmin(false);
      setShowAddRole(false);
      await loadData();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to create role.');
    } finally {
      setBusy(false);
    }
  };

  const handleUpdateRole = async () => {
    setBusy(true);
    setError(null);

    try {
      await updateRole(editRoleId, {
        name: editRoleName,
        description: editRoleDescription || undefined,
        allowedNavItems: editRoleMenus,
        isAdmin: editRoleIsAdmin
      });
      setShowEditRole(false);
      await loadData();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to update role.');
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteRole = async () => {
    if (!editRoleId || editRoleIsSystem || !window.confirm('Delete this role?')) {
      return;
    }

    setBusy(true);
    setError(null);

    try {
      await deleteRole(editRoleId);
      setShowEditRole(false);
      await loadData();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to delete role.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <CrmPageHeader title="Settings" subtitle="Configure CRM settings and preferences" />
      <SettingsTabs />

      {error ? (
        <CrmCard className="p-4">
          <p className="text-[14px] font-medium text-[#b42318]">{error}</p>
        </CrmCard>
      ) : null}

      <CrmCard className="p-6">
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">Staff Members</h2>
        <p className="mt-1.5 text-[16px] text-[#667085]">Manage team members and their roles</p>

        {loading ? <p className="mt-6 text-[14px] text-[#667085]">Loading staff members...</p> : null}

        <div className="mt-7 space-y-3">
          {users.map((member) => (
            <div key={member.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-[#e8ebf1] px-5 py-4">
              <div className="flex items-center gap-3">
                <InitialsAvatar
                  label={`${member.firstName ?? ''} ${member.lastName ?? ''}`.trim() || member.username}
                  isActive={member.isActive}
                  size="md"
                />
                <div>
                  <p className="text-[16px] font-semibold text-[#111827]">
                    {member.firstName || member.lastName ? `${member.firstName ?? ''} ${member.lastName ?? ''}`.trim() : member.username}
                  </p>
                  <p className="text-[14px] text-[#667085]">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CrmStatusPill label={member.roleName ?? 'No Role'} tone="slate" />
                {!member.isActive ? <CrmStatusPill label="Inactive" tone="red" /> : null}
                <Button variant="outline" className="h-10 rounded-[12px] px-4" onClick={() => openEditUserModal(member)} disabled={busy}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-8 text-[24px] font-semibold text-[#111827]">Role Permissions</h3>
        <p className="text-[16px] text-[#667085]">Configure permissions for each role</p>

        {loading ? <p className="mt-4 text-[14px] text-[#667085]">Loading roles...</p> : null}

        <div className="mt-4 space-y-2">
          {roles.map((role) => (
            <div key={role.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-[#e8ebf1] px-5 py-4">
              <div>
                <p className="text-[16px] font-semibold text-[#111827]">{role.name}</p>
                <p className="text-[14px] text-[#667085]">{role.description || roleAccessSummary(role)}</p>
              </div>
              <div className="flex items-center gap-2">
                {role.isSystem ? <CrmStatusPill label="System" tone="blue" /> : null}
                {role.isAdmin ? <CrmStatusPill label="Admin" tone="purple" /> : <CrmStatusPill label="Non-admin" tone="slate" />}
                <Button variant="outline" className="h-10 rounded-[12px] px-4" onClick={() => openEditRoleModal(role)} disabled={busy}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="h-12 rounded-[14px] px-6" onClick={() => setShowAddUser(true)} disabled={busy}>
            Add Staff Member
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-[14px] px-6"
            onClick={() => {
              setNewRoleName('');
              setNewRoleDescription('');
              setNewRoleMenus([]);
              setNewRoleIsAdmin(false);
              setShowAddRole(true);
            }}
            disabled={busy}
          >
            Add Role
          </Button>
        </div>
      </CrmCard>

      {showAddUser ? (
        <ModalShell title="Add Staff Member" onClose={() => setShowAddUser(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Username" value={newUsername} onChange={(event) => setNewUsername(event.target.value)} />
            <Input placeholder="Email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} />
            <Input
              placeholder="Temporary password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <select
              value={newUserRoleId}
              onChange={(event) => setNewUserRoleId(event.target.value)}
              className="h-11 rounded-[12px] border border-[#d6dde8] bg-white px-3 text-[14px] text-[#111827]"
            >
              <option value="">No role</option>
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddUser(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser} disabled={busy || !newUsername.trim() || !newEmail.trim() || newPassword.length < 8}>
              {busy ? 'Saving...' : 'Create User'}
            </Button>
          </div>
        </ModalShell>
      ) : null}

      {showEditUser ? (
        <ModalShell title="Edit Staff Member" onClose={() => setShowEditUser(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Email" value={editUserEmail} onChange={(event) => setEditUserEmail(event.target.value)} />
            <select
              value={editUserRoleId}
              onChange={(event) => setEditUserRoleId(event.target.value)}
              className="h-11 rounded-[12px] border border-[#d6dde8] bg-white px-3 text-[14px] text-[#111827]"
            >
              <option value="">No role</option>
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <Input placeholder="First name" value={editUserFirstName} onChange={(event) => setEditUserFirstName(event.target.value)} />
            <Input placeholder="Last name" value={editUserLastName} onChange={(event) => setEditUserLastName(event.target.value)} />
            <Input
              placeholder="Reset password (optional)"
              type="password"
              value={editUserResetPassword}
              onChange={(event) => setEditUserResetPassword(event.target.value)}
              className="sm:col-span-2"
            />
          </div>

          <label className="mt-4 flex items-center gap-2 text-[14px] text-[#344054]">
            <input type="checkbox" checked={editUserIsActive} onChange={(event) => setEditUserIsActive(event.target.checked)} />
            Active user
          </label>

          <div className="mt-5 flex justify-between gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-[#d6dde8] text-[#344054] hover:bg-[#f8fafc]"
                onClick={handleResetUserTotp}
                disabled={busy}
              >
                Reset Authenticator Device
              </Button>
              <Button variant="outline" className="border-[#fecaca] text-[#b42318] hover:bg-[#fef2f2]" onClick={handleDeleteUser} disabled={busy}>
                Delete User
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowEditUser(false)} disabled={busy}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser} disabled={busy || !editUserEmail.trim()}>
                {busy ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </ModalShell>
      ) : null}

      {showAddRole ? (
        <ModalShell title="Add Role" onClose={() => setShowAddRole(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Role name" value={newRoleName} onChange={(event) => setNewRoleName(event.target.value)} />
            <Input
              placeholder="Description (optional)"
              value={newRoleDescription}
              onChange={(event) => setNewRoleDescription(event.target.value)}
            />
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between rounded-[12px] border border-[#e8ebf1] bg-[#f8fafc] px-4 py-3">
              <div>
                <p className="text-[14px] font-semibold text-[#111827]">Admin access</p>
                <p className="text-[12px] text-[#667085]">Enable to allow managing users, roles, and all settings.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={newRoleIsAdmin}
                onClick={() => setNewRoleIsAdmin((value) => !value)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
                  newRoleIsAdmin ? 'bg-[#2459dd]' : 'bg-[#d0d5dd]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                    newRoleIsAdmin ? 'left-[22px]' : 'left-[2px]'
                  }`}
                />
              </button>
            </div>
          </div>

          <p className="mt-4 text-[13px] font-medium text-[#667085]">Dashboard is always included. Select additional menu access:</p>
          {newRoleIsAdmin ? (
            <div className="mt-2 rounded-[10px] border border-[#d6e4ff] bg-[#eef4ff] px-3 py-2 text-[13px] text-[#2459dd]">
              Admin roles automatically have access to all menu items.
            </div>
          ) : (
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {assignableMenus.map((item) => (
                <label key={item.key} className="flex items-center gap-2 rounded-[10px] border border-[#e8ebf1] px-3 py-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={newRoleMenus.includes(item.key)}
                    onChange={() => setNewRoleMenus((current) => toggleMenu(current, item.key))}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          )}

          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddRole(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={handleCreateRole} disabled={busy || newRoleName.trim().length < 2 || (!newRoleIsAdmin && newRoleMenus.length === 0)}>
              {busy ? 'Saving...' : 'Create Role'}
            </Button>
          </div>
        </ModalShell>
      ) : null}

      {showEditRole ? (
        <ModalShell title="Edit Role" onClose={() => setShowEditRole(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Role name" value={editRoleName} onChange={(event) => setEditRoleName(event.target.value)} />
            <Input
              placeholder="Description (optional)"
              value={editRoleDescription}
              onChange={(event) => setEditRoleDescription(event.target.value)}
            />
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between rounded-[12px] border border-[#e8ebf1] bg-[#f8fafc] px-4 py-3">
              <div>
                <p className="text-[14px] font-semibold text-[#111827]">Admin access</p>
                <p className="text-[12px] text-[#667085]">Enable to allow managing users, roles, and all settings.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={editRoleIsAdmin}
                onClick={() => setEditRoleIsAdmin((value) => !value)}
                disabled={editRoleIsSystem}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  editRoleIsAdmin ? 'bg-[#2459dd]' : 'bg-[#d0d5dd]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                    editRoleIsAdmin ? 'left-[22px]' : 'left-[2px]'
                  }`}
                />
              </button>
            </div>
          </div>

          <p className="mt-4 text-[13px] font-medium text-[#667085]">Dashboard is always included. Select additional menu access:</p>
          {editRoleIsAdmin ? (
            <div className="mt-2 rounded-[10px] border border-[#d6e4ff] bg-[#eef4ff] px-3 py-2 text-[13px] text-[#2459dd]">
              Admin roles automatically have access to all menu items.
            </div>
          ) : (
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {assignableMenus.map((item) => (
                <label key={item.key} className="flex items-center gap-2 rounded-[10px] border border-[#e8ebf1] px-3 py-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={editRoleMenus.includes(item.key)}
                    onChange={() => setEditRoleMenus((current) => toggleMenu(current, item.key))}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          )}

          <div className="mt-5 flex justify-between gap-2">
            <Button
              variant="outline"
              className="border-[#fecaca] text-[#b42318] hover:bg-[#fef2f2]"
              onClick={handleDeleteRole}
              disabled={busy || editRoleIsSystem}
            >
              Delete Role
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowEditRole(false)} disabled={busy}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRole} disabled={busy || editRoleName.trim().length < 2 || (!editRoleIsAdmin && editRoleMenus.length === 0)}>
                {busy ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </div>
  );
}
