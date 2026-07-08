'use client';

import { Users, MapPin, Banknote, CheckCircle2, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatCurrency } from '@/lib/utils';

interface BenefitShare {
  id: string;
  programme: string;
  community: string;
  province: string;
  beneficiaryCount: number;
  totalAmount: number;
  perPerson: number;
  currency: string;
  paymentMethod: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'SCHEDULED' | 'FAILED';
  date: string;
}

const shares: BenefitShare[] = [
  { id: 'BS-001', programme: 'Mai-Ndombe REDD+', community: 'Ntandala', province: 'Mai-Ndombe', beneficiaryCount: 1240, totalAmount: 18500, perPerson: 14.92, currency: 'USD', paymentMethod: 'Mobile Money', status: 'COMPLETED', date: '2026-07-04' },
  { id: 'BS-002', programme: 'Mai-Ndombe REDD+', community: 'Inongo Villages', province: 'Mai-Ndombe', beneficiaryCount: 890, totalAmount: 15700, perPerson: 17.64, currency: 'USD', paymentMethod: 'Mobile Money', status: 'COMPLETED', date: '2026-06-20' },
  { id: 'BS-003', programme: 'Équateur Conservation', community: 'Mbandaka', province: 'Équateur', beneficiaryCount: 2100, totalAmount: 12300, perPerson: 5.86, currency: 'USD', paymentMethod: 'Mobile Money', status: 'IN_PROGRESS', date: '2026-07-03' },
  { id: 'BS-004', programme: 'Mai-Ndombe REDD+', community: 'Kiri District', province: 'Mai-Ndombe', beneficiaryCount: 650, totalAmount: 9800, perPerson: 15.08, currency: 'USD', paymentMethod: 'Bank Transfer', status: 'COMPLETED', date: '2026-06-15' },
  { id: 'BS-005', programme: 'Tshopo Sustainable Forestry', community: 'Kisangani Communes', province: 'Tshopo', beneficiaryCount: 3200, totalAmount: 22400, perPerson: 7.00, currency: 'USD', paymentMethod: 'Mobile Money', status: 'SCHEDULED', date: '2026-07-15' },
  { id: 'BS-006', programme: 'Sud-Kivu Cookstoves', community: 'Bukavu', province: 'Sud-Kivu', beneficiaryCount: 1800, totalAmount: 8900, perPerson: 4.94, currency: 'CDF', paymentMethod: 'Cash', status: 'FAILED', date: '2026-06-30' },
  { id: 'BS-007', programme: 'Mai-Ndombe REDD+', community: 'Mushie', province: 'Mai-Ndombe', beneficiaryCount: 420, totalAmount: 6300, perPerson: 15.00, currency: 'USD', paymentMethod: 'Mobile Money', status: 'COMPLETED', date: '2026-06-01' },
  { id: 'BS-008', programme: 'Virunga Reforestation', community: 'Rutshuru', province: 'Nord-Kivu', beneficiaryCount: 980, totalAmount: 14700, perPerson: 15.00, currency: 'USD', paymentMethod: 'Mobile Money', status: 'SCHEDULED', date: '2026-07-20' },
];

const byProvince = [
  { province: 'Mai-Ndombe', amount: 50300 },
  { province: 'Tshopo', amount: 22400 },
  { province: 'Nord-Kivu', amount: 14700 },
  { province: 'Équateur', amount: 12300 },
  { province: 'Sud-Kivu', amount: 8900 },
];


export default function BenefitSharingPage() {
  const totalDistributed = shares.filter(s => s.status === 'COMPLETED').reduce((sum, s) => sum + s.totalAmount, 0);
  const totalBeneficiaries = shares.filter(s => s.status === 'COMPLETED').reduce((sum, s) => sum + s.beneficiaryCount, 0);
  const communitiesReached = new Set(shares.filter(s => s.status === 'COMPLETED').map(s => s.community)).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Community Benefit Sharing</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Carbon revenue distribution to Indigenous and local communities</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Schedule Disbursement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Distributed" value={formatCurrency(totalDistributed)} icon={Banknote} sub="Verified payouts" />
        <StatCard label="Communities Reached" value={communitiesReached.toString()} icon={MapPin} sub="Across 4 provinces" />
        <StatCard label="Total Beneficiaries" value={totalBeneficiaries.toLocaleString()} icon={Users} sub="Individuals paid" />
        <StatCard label="Avg Per Beneficiary" value={formatCurrency(Math.round(totalDistributed / totalBeneficiaries))} icon={CheckCircle2} sub="Completed payouts" />
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg p-5">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-4">Distribution by Province (USD)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={byProvince} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <YAxis type="category" dataKey="province" width={100} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
            <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '6px', fontSize: '12px' }} />
            <Bar dataKey="amount" fill="var(--accent)" radius={[0, 4, 4, 0]} name="Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg">
        <div className="p-4 border-b border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text)]">Disbursement Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Programme', 'Community', 'Province', 'Beneficiaries', 'Total', 'Per Person', 'Method', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shares.map((s) => (
                <tr key={s.id} className="border-b border-[var(--border)] hover:bg-[var(--stripe)]">
                  <td className="px-4 py-3 text-[var(--text)]">{s.programme}</td>
                  <td className="px-4 py-3 font-medium text-[var(--text)]">{s.community}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{s.province}</td>
                  <td className="px-4 py-3 text-[var(--text)] tabular-nums">{s.beneficiaryCount.toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium text-[var(--text)] tabular-nums">{formatCurrency(s.totalAmount)}</td>
                  <td className="px-4 py-3 text-[var(--text)] tabular-nums">${s.perPerson.toFixed(2)}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{s.paymentMethod}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}