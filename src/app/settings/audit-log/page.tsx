'use client';

import { useState } from 'react';
import { FileSearch, Filter, Clock, User, ArrowRightLeft, Plus, Trash2, Edit3, Shield, LogIn, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: 'create' | 'update' | 'delete' | 'transfer' | 'login' | 'verify';
  resource: string;
  detail: string;
}

const actionConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  create: { label: 'Created', icon: Plus, color: 'bg-emerald-100 text-emerald-700' },
  update: { label: 'Updated', icon: Edit3, color: 'bg-blue-100 text-blue-700' },
  delete: { label: 'Deleted', icon: Trash2, color: 'bg-red-100 text-red-700' },
  transfer: { label: 'Transferred', icon: ArrowRightLeft, color: 'bg-purple-100 text-purple-700' },
  login: { label: 'Login', icon: LogIn, color: 'bg-gray-100 text-gray-700' },
  verify: { label: 'Verified', icon: Shield, color: 'bg-amber-100 text-amber-700' },
};

const auditLog: AuditEntry[] = [
  { id: 'AL-001', timestamp: '2026-07-08 09:42:15', user: 'Dennis Nderitu', action: 'login', resource: 'System', detail: 'Admin login from Nairobi, KE' },
  { id: 'AL-002', timestamp: '2026-07-08 09:38:22', user: 'Jean Mukendi', action: 'update', resource: 'Project PP-001', detail: 'Updated Mai-Ndombe REDD+ status to Active' },
  { id: 'AL-003', timestamp: '2026-07-08 08:15:03', user: 'Marie Kabila', action: 'verify', resource: 'Credits Batch CB-2026-047', detail: 'Verified 125,000 VCUs from Mai-Ndombe REDD+' },
  { id: 'AL-004', timestamp: '2026-07-07 16:22:41', user: 'System', action: 'transfer', resource: 'Credits', detail: '125,000 VCUs transferred from Mai-Ndombe to Carbon Fund' },
  { id: 'AL-005', timestamp: '2026-07-07 14:10:55', user: 'Patrick Lumumba', action: 'create', resource: 'Project PP-035', detail: 'Registered Virunga Cookstove Distribution Program' },
  { id: 'AL-006', timestamp: '2026-07-07 11:30:18', user: 'Sarah Ngoma', action: 'verify', resource: 'MRV Report MRV-2026-012', detail: 'Approved satellite monitoring report for Tshuapa Province' },
  { id: 'AL-007', timestamp: '2026-07-07 09:05:33', user: 'Dennis Nderitu', action: 'update', resource: 'Organisation ORG-003', detail: 'Updated Equity BCDC contact details' },
  { id: 'AL-008', timestamp: '2026-07-06 17:45:12', user: 'Jean Mukendi', action: 'create', resource: 'User U-007', detail: 'Invited Amina Faso (Mirova Natural Capital)' },
  { id: 'AL-009', timestamp: '2026-07-06 15:20:08', user: 'System', action: 'transfer', resource: 'Credits', detail: '50,000 credits retired by TotalEnergies for 2025 compliance' },
  { id: 'AL-010', timestamp: '2026-07-06 12:55:44', user: 'Marie Kabila', action: 'update', resource: 'KYC KYC-041', detail: 'Approved KYC verification for BioCarbon Partners' },
  { id: 'AL-011', timestamp: '2026-07-06 10:12:30', user: 'Dennis Nderitu', action: 'delete', resource: 'User U-009', detail: 'Removed inactive user account (expired invite)' },
  { id: 'AL-012', timestamp: '2026-07-05 16:30:22', user: 'Patrick Lumumba', action: 'update', resource: 'Project PP-004', detail: 'Uploaded Phase II monitoring report for Virunga Clean Cooking' },
  { id: 'AL-013', timestamp: '2026-07-05 14:18:09', user: 'System', action: 'verify', resource: 'MRV Alert ALT-2026-047', detail: 'Auto-flagged deforestation alert in Equateur Province' },
  { id: 'AL-014', timestamp: '2026-07-05 09:45:55', user: 'Jean Mukendi', action: 'login', resource: 'System', detail: 'Admin login from Kinshasa, CD' },
  { id: 'AL-015', timestamp: '2026-07-04 17:08:33', user: 'Dennis Nderitu', action: 'create', resource: 'Match MM-001', detail: 'Initiated AI matchmaking for Mai-Ndombe REDD+ Phase III' },
];

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  const filtered = auditLog.filter((entry) => {
    if (filterAction !== 'all' && entry.action !== filterAction) return false;
    if (search) {
      const q = search.toLowerCase();
      return entry.user.toLowerCase().includes(q) || entry.resource.toLowerCase().includes(q) || entry.detail.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileSearch className="h-6 w-6 text-accent" /> Audit Log
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">Complete record of all platform actions and changes</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search audit log..." className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent/30" />
        </div>
        <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground">
          <option value="all">All Actions</option>
          <option value="create">Created</option>
          <option value="update">Updated</option>
          <option value="delete">Deleted</option>
          <option value="transfer">Transferred</option>
          <option value="login">Login</option>
          <option value="verify">Verified</option>
        </select>
        <span className="text-sm text-foreground-muted">{filtered.length} entries</span>
      </div>

      <div className="rounded-xl border border-border-light bg-surface overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
        <div className="divide-y divide-border-light">
          {filtered.map((entry) => {
            const config = actionConfig[entry.action];
            const ActionIcon = config.icon;
            return (
              <div key={entry.id} className="flex items-start gap-4 px-5 py-4 hover:bg-surface-secondary transition-colors">
                <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', config.color)}>
                  <ActionIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">{entry.user}</span>
                    <span className={cn('inline-block rounded-full px-2 py-0.5 text-xs font-medium', config.color)}>{config.label}</span>
                    <span className="text-sm text-foreground-muted">{entry.resource}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-foreground-muted">{entry.detail}</p>
                </div>
                <div className="shrink-0 flex items-center gap-1 text-xs text-foreground-subtle whitespace-nowrap">
                  <Clock className="h-3 w-3" />{entry.timestamp}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
