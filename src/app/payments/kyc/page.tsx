'use client';

import { useState } from 'react';
import { ShieldCheck, AlertTriangle, Clock, UserCheck, Search, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';

interface KycRecord {
  id: string;
  entity: string;
  entityType: 'INDIVIDUAL' | 'ORGANISATION' | 'COMMUNITY';
  province: string;
  documentType: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'EXPIRED';
  verifiedDate: string | null;
  expiryDate: string;
}

const records: KycRecord[] = [
  { id: 'KYC-001', entity: 'Mai-Ndombe Dev Corp', entityType: 'ORGANISATION', province: 'Mai-Ndombe', documentType: 'Company Registration', riskLevel: 'LOW', status: 'VERIFIED', verifiedDate: '2026-05-15', expiryDate: '2027-05-15' },
  { id: 'KYC-002', entity: 'Ntandala Community Trust', entityType: 'COMMUNITY', province: 'Mai-Ndombe', documentType: 'Community Authority Letter', riskLevel: 'LOW', status: 'VERIFIED', verifiedDate: '2026-04-20', expiryDate: '2027-04-20' },
  { id: 'KYC-003', entity: 'Jean-Pierre Lukusa', entityType: 'INDIVIDUAL', province: 'Mai-Ndombe', documentType: 'National ID', riskLevel: 'LOW', status: 'VERIFIED', verifiedDate: '2026-06-01', expiryDate: '2027-06-01' },
  { id: 'KYC-004', entity: 'Équateur Green Development', entityType: 'ORGANISATION', province: 'Équateur', documentType: 'Company Registration', riskLevel: 'MEDIUM', status: 'PENDING', verifiedDate: null, expiryDate: '2027-03-01' },
  { id: 'KYC-005', entity: 'Mbandaka Village Council', entityType: 'COMMUNITY', province: 'Équateur', documentType: 'Community Authority Letter', riskLevel: 'LOW', status: 'VERIFIED', verifiedDate: '2026-03-10', expiryDate: '2027-03-10' },
  { id: 'KYC-006', entity: 'Carbon Buyer AG', entityType: 'ORGANISATION', province: 'International', documentType: 'Swiss Commercial Register', riskLevel: 'LOW', status: 'VERIFIED', verifiedDate: '2026-01-20', expiryDate: '2027-01-20' },
  { id: 'KYC-007', entity: 'Bukavu Cookstove Cooperative', entityType: 'COMMUNITY', province: 'Sud-Kivu', documentType: 'Cooperative Certificate', riskLevel: 'HIGH', status: 'REJECTED', verifiedDate: null, expiryDate: '2026-12-31' },
  { id: 'KYC-008', entity: 'Tshopo Forest Initiative', entityType: 'ORGANISATION', province: 'Tshopo', documentType: 'NGO Registration', riskLevel: 'MEDIUM', status: 'PENDING', verifiedDate: null, expiryDate: '2027-06-01' },
  { id: 'KYC-009', entity: 'Mirova Natural Capital', entityType: 'ORGANISATION', province: 'International', documentType: 'EU Fund Authorization', riskLevel: 'LOW', status: 'VERIFIED', verifiedDate: '2026-02-10', expiryDate: '2027-02-10' },
  { id: 'KYC-010', entity: 'Swiss Re Carbon Fund', entityType: 'ORGANISATION', province: 'International', documentType: 'Swiss FINMA Registration', riskLevel: 'LOW', status: 'VERIFIED', verifiedDate: '2026-01-05', expiryDate: '2027-01-05' },
  { id: 'KYC-011', entity: 'Inongo Community Leaders', entityType: 'COMMUNITY', province: 'Mai-Ndombe', documentType: 'Traditional Authority Letter', riskLevel: 'LOW', status: 'VERIFIED', verifiedDate: '2026-05-01', expiryDate: '2027-05-01' },
  { id: 'KYC-012', entity: 'Virunga Reforestation Trust', entityType: 'ORGANISATION', province: 'Nord-Kivu', documentType: 'Trust Deed', riskLevel: 'MEDIUM', status: 'PENDING', verifiedDate: null, expiryDate: '2027-07-01' },
];

const statusBreakdown = [
  { name: 'Verified', value: 7, color: '#1b6b3a' },
  { name: 'Pending', value: 3, color: '#d4a72c' },
  { name: 'Rejected', value: 1, color: '#c45a3c' },
  { name: 'Expired', value: 1, color: '#6b7280' },
];

const entityTypeColors: Record<string, string> = {
  INDIVIDUAL: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  ORGANISATION: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  COMMUNITY: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
};

export default function KycPage() {
  const [search, setSearch] = useState('');
  const filtered = search
    ? records.filter(r => r.entity.toLowerCase().includes(search.toLowerCase()) || r.province.toLowerCase().includes(search.toLowerCase()))
    : records;

  const verified = records.filter(r => r.status === 'VERIFIED').length;
  const pending = records.filter(r => r.status === 'PENDING').length;
  const complianceRate = Math.round((verified / records.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">KYC / AML Compliance</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Know-Your-Customer verification for all registry participants</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> New Verification
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Verified Entities" value={verified.toString()} icon={ShieldCheck} sub={`${complianceRate}% compliance rate`} />
        <StatCard label="Pending Review" value={pending.toString()} icon={Clock} sub="Awaiting verification" />
        <StatCard label="High Risk Entities" value={records.filter(r => r.riskLevel === 'HIGH').length.toString()} icon={AlertTriangle} sub="Requires attention" />
        <StatCard label="Total Registered" value={records.length.toString()} icon={UserCheck} sub="All entity types" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg p-5">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-4">Verification Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {statusBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {statusBreakdown.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[var(--text-muted)]">{s.name}</span>
                </div>
                <span className="font-medium text-[var(--text)]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg p-5">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-4">Compliance Summary</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--text-muted)]">Overall Compliance</span>
                <span className="font-medium text-[var(--text)]">{complianceRate}%</span>
              </div>
              <div className="w-full h-3 bg-[var(--border)] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${complianceRate}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { label: 'Organisations', count: records.filter(r => r.entityType === 'ORGANISATION').length, verified: records.filter(r => r.entityType === 'ORGANISATION' && r.status === 'VERIFIED').length },
                { label: 'Communities', count: records.filter(r => r.entityType === 'COMMUNITY').length, verified: records.filter(r => r.entityType === 'COMMUNITY' && r.status === 'VERIFIED').length },
                { label: 'Individuals', count: records.filter(r => r.entityType === 'INDIVIDUAL').length, verified: records.filter(r => r.entityType === 'INDIVIDUAL' && r.status === 'VERIFIED').length },
                { label: 'International', count: records.filter(r => r.province === 'International').length, verified: records.filter(r => r.province === 'International' && r.status === 'VERIFIED').length },
              ].map((group) => (
                <div key={group.label} className="border border-[var(--border)] rounded-lg p-3">
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{group.label}</div>
                  <div className="text-lg font-bold text-[var(--text)] mt-1">{group.verified}/{group.count}</div>
                  <div className="text-xs text-[var(--text-muted)]">verified</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--text)]">KYC Records</h3>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search entities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm bg-[var(--bg)] border border-[var(--border)] rounded pl-8 pr-3 py-1.5 text-[var(--text)] w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Entity', 'Type', 'Province', 'Document', 'Risk', 'Status', 'Verified', 'Expiry'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-[var(--border)] hover:bg-[var(--stripe)]">
                  <td className="px-4 py-3 font-medium text-[var(--text)]">{r.entity}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${entityTypeColors[r.entityType]}`}>{r.entityType}</span></td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{r.province}</td>
                  <td className="px-4 py-3 text-[var(--text)]">{r.documentType}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.riskLevel} /></td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{r.verifiedDate || '—'}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{r.expiryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}