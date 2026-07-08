'use client';

import { useState } from 'react';
import { Building2, Users2, FolderKanban, Globe, Search, Plus, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Organisation {
  id: string;
  name: string;
  type: 'Government' | 'Developer' | 'Verifier' | 'Funder' | 'DFI' | 'EPC';
  country: string;
  projects: number;
  users: number;
  status: 'Active' | 'Pending';
}

const orgs: Organisation[] = [
  { id: 'ORG-001', name: 'DRC Ministry of Environment', type: 'Government', country: 'DRC', projects: 12, users: 4, status: 'Active' },
  { id: 'ORG-002', name: 'AfCEN', type: 'Developer', country: 'Kenya', projects: 34, users: 3, status: 'Active' },
  { id: 'ORG-003', name: 'Equity BCDC', type: 'Funder', country: 'DRC', projects: 8, users: 2, status: 'Active' },
  { id: 'ORG-004', name: 'Wildlife Works', type: 'EPC', country: 'Kenya', projects: 3, users: 2, status: 'Active' },
  { id: 'ORG-005', name: 'Verra', type: 'Verifier', country: 'USA', projects: 12, users: 1, status: 'Active' },
  { id: 'ORG-006', name: 'EcoAct DRC', type: 'Developer', country: 'DRC', projects: 5, users: 2, status: 'Active' },
  { id: 'ORG-007', name: 'Mirova Natural Capital', type: 'Funder', country: 'France', projects: 2, users: 1, status: 'Active' },
  { id: 'ORG-008', name: 'Green Climate Fund', type: 'DFI', country: 'South Korea', projects: 4, users: 1, status: 'Active' },
  { id: 'ORG-009', name: 'BioCarbon Partners', type: 'EPC', country: 'Zambia', projects: 1, users: 1, status: 'Pending' },
  { id: 'ORG-010', name: 'Africa Finance Corporation', type: 'DFI', country: 'Nigeria', projects: 3, users: 1, status: 'Active' },
  { id: 'ORG-011', name: 'LEAF Coalition', type: 'Funder', country: 'Global', projects: 1, users: 1, status: 'Pending' },
  { id: 'ORG-012', name: 'Wetlands International', type: 'EPC', country: 'Netherlands', projects: 1, users: 1, status: 'Active' },
];

const typeColors: Record<string, string> = {
  Government: 'bg-blue-100 text-blue-700',
  Developer: 'bg-emerald-100 text-emerald-700',
  Verifier: 'bg-purple-100 text-purple-700',
  Funder: 'bg-amber-100 text-amber-700',
  DFI: 'bg-cyan-100 text-cyan-700',
  EPC: 'bg-orange-100 text-orange-700',
};

export default function OrganisationsPage() {
  const [search, setSearch] = useState('');

  const filtered = orgs.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.type.toLowerCase().includes(search.toLowerCase()) ||
    o.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Organisations</h1>
          <p className="mt-1 text-sm text-foreground-muted">Registry-registered organisations and partners</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Organisation
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100"><Building2 className="h-5 w-5 text-blue-600" /></div>
            <div><div className="text-2xl font-bold text-foreground">{orgs.length}</div><div className="text-xs text-foreground-muted">Total Organisations</div></div>
          </div>
        </div>
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100"><Globe className="h-5 w-5 text-amber-600" /></div>
            <div><div className="text-2xl font-bold text-foreground">{new Set(orgs.map((o) => o.country)).size}</div><div className="text-xs text-foreground-muted">Countries</div></div>
          </div>
        </div>
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100"><FolderKanban className="h-5 w-5 text-emerald-600" /></div>
            <div><div className="text-2xl font-bold text-foreground">{orgs.reduce((s, o) => s + o.projects, 0)}</div><div className="text-xs text-foreground-muted">Total Projects</div></div>
          </div>
        </div>
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100"><Users2 className="h-5 w-5 text-purple-600" /></div>
            <div><div className="text-2xl font-bold text-foreground">{orgs.reduce((s, o) => s + o.users, 0)}</div><div className="text-xs text-foreground-muted">Total Users</div></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search organisations..." className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent/30" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((org) => (
          <div key={org.id} className="rounded-xl border border-border-light bg-surface p-4 hover:bg-surface-secondary transition-colors" style={{ boxShadow: 'var(--card-shadow)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent font-bold text-sm">
                {org.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
              </div>
              <span className={cn('inline-block rounded-full px-2 py-0.5 text-xs font-medium', typeColors[org.type])}>{org.type}</span>
            </div>
            <div className="text-sm font-semibold text-foreground">{org.name}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-foreground-muted"><MapPin className="h-3 w-3" />{org.country}</div>
            <div className="mt-3 flex items-center gap-4 text-xs text-foreground-muted">
              <span className="flex items-center gap-1"><FolderKanban className="h-3 w-3" />{org.projects} projects</span>
              <span className="flex items-center gap-1"><Users2 className="h-3 w-3" />{org.users} users</span>
            </div>
            <div className="mt-2">
              <span className={cn('inline-block rounded-full px-2 py-0.5 text-xs font-medium', org.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>{org.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
