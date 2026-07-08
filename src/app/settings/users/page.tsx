'use client';

import { useState } from 'react';
import { Users2, Shield, Mail, Clock, MoreVertical, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Verifier' | 'Project Developer' | 'Auditor' | 'Viewer';
  organisation: string;
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
}

const users: User[] = [
  { id: 'U-001', name: 'Dennis Nderitu', email: 'dwawerunderitu@gmail.com', role: 'Admin', organisation: 'AfCEN', status: 'Active', lastActive: '2 min ago' },
  { id: 'U-002', name: 'Jean Mukendi', email: 'j.mukendi@moe.gouv.cd', role: 'Admin', organisation: 'DRC Ministry of Environment', status: 'Active', lastActive: '1 hour ago' },
  { id: 'U-003', name: 'Marie Kabila', email: 'm.kabila@equitybcdc.cd', role: 'Verifier', organisation: 'Equity BCDC', status: 'Active', lastActive: '3 hours ago' },
  { id: 'U-004', name: 'Patrick Lumumba', email: 'p.lumumba@wildlifeworks.com', role: 'Project Developer', organisation: 'Wildlife Works', status: 'Active', lastActive: '1 day ago' },
  { id: 'U-005', name: 'Sarah Ngoma', email: 's.ngoma@verra.org', role: 'Auditor', organisation: 'Verra', status: 'Active', lastActive: '2 days ago' },
  { id: 'U-006', name: 'Claude Tshisekedi', email: 'c.tshisekedi@gcf.org', role: 'Viewer', organisation: 'Green Climate Fund', status: 'Active', lastActive: '5 days ago' },
  { id: 'U-007', name: 'Amina Faso', email: 'a.faso@mirova.com', role: 'Viewer', organisation: 'Mirova Natural Capital', status: 'Invited', lastActive: 'Pending' },
  { id: 'U-008', name: 'Robert Kasongo', email: 'r.kasongo@ecoact.cd', role: 'Project Developer', organisation: 'EcoAct DRC', status: 'Suspended', lastActive: '30 days ago' },
];

const roleColors: Record<string, string> = {
  Admin: 'bg-red-100 text-red-700',
  Verifier: 'bg-blue-100 text-blue-700',
  'Project Developer': 'bg-emerald-100 text-emerald-700',
  Auditor: 'bg-purple-100 text-purple-700',
  Viewer: 'bg-gray-100 text-gray-700',
};

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Invited: 'bg-amber-100 text-amber-700',
  Suspended: 'bg-red-100 text-red-700',
};

export default function UsersPage() {
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.organisation.toLowerCase().includes(search.toLowerCase())
  );

  const active = users.filter((u) => u.status === 'Active').length;
  const invited = users.filter((u) => u.status === 'Invited').length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="mt-1 text-sm text-foreground-muted">Manage platform users and access roles</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors">
          <Plus className="h-4 w-4" /> Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100"><Users2 className="h-5 w-5 text-blue-600" /></div>
            <div><div className="text-2xl font-bold text-foreground">{users.length}</div><div className="text-xs text-foreground-muted">Total Users</div></div>
          </div>
        </div>
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100"><Shield className="h-5 w-5 text-emerald-600" /></div>
            <div><div className="text-2xl font-bold text-foreground">{active}</div><div className="text-xs text-foreground-muted">Active</div></div>
          </div>
        </div>
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100"><Mail className="h-5 w-5 text-amber-600" /></div>
            <div><div className="text-2xl font-bold text-foreground">{invited}</div><div className="text-xs text-foreground-muted">Pending Invites</div></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border-light bg-surface" style={{ boxShadow: 'var(--card-shadow)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-light">
              <th className="px-4 py-3 text-left font-semibold text-foreground-muted">User</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-muted">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-muted">Organisation</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-muted">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-muted">Last Active</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-muted"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-border-light last:border-0 hover:bg-surface-secondary transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                      {user.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-foreground-muted">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn('inline-block rounded-full px-2 py-0.5 text-xs font-medium', roleColors[user.role])}>{user.role}</span>
                </td>
                <td className="px-4 py-3 text-foreground-muted">{user.organisation}</td>
                <td className="px-4 py-3">
                  <span className={cn('inline-block rounded-full px-2 py-0.5 text-xs font-medium', statusColors[user.status])}>{user.status}</span>
                </td>
                <td className="px-4 py-3 text-foreground-muted">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{user.lastActive}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="rounded-lg p-1.5 hover:bg-surface-secondary transition-colors"><MoreVertical className="h-4 w-4 text-foreground-muted" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
