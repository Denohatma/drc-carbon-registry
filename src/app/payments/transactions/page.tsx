'use client';

import { useState } from 'react';
import { ArrowUpDown, DollarSign, Users, Building2, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatCurrency } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'RELEASE' | 'REFUND' | 'COMMUNITY_PAYOUT' | 'DEVELOPER_DISBURSEMENT';
  amount: number;
  currency: string;
  from: string;
  to: string;
  mobileMoneyRef: string | null;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  date: string;
}

const transactions: Transaction[] = [
  { id: 'TXN-001', type: 'DEPOSIT', amount: 450000, currency: 'USD', from: 'Carbon Buyer AG', to: 'Escrow-MN-001', mobileMoneyRef: null, status: 'COMPLETED', date: '2026-07-05' },
  { id: 'TXN-002', type: 'COMMUNITY_PAYOUT', amount: 18500, currency: 'USD', from: 'Escrow-MN-001', to: 'Ntandala Community', mobileMoneyRef: 'MPESA-7823456', status: 'COMPLETED', date: '2026-07-04' },
  { id: 'TXN-003', type: 'DEVELOPER_DISBURSEMENT', amount: 125000, currency: 'USD', from: 'Escrow-MN-001', to: 'Mai-Ndombe Dev Corp', mobileMoneyRef: null, status: 'COMPLETED', date: '2026-07-03' },
  { id: 'TXN-004', type: 'COMMUNITY_PAYOUT', amount: 12300, currency: 'USD', from: 'Escrow-EQ-001', to: 'Mbandaka Villages', mobileMoneyRef: 'MPESA-7834521', status: 'PENDING', date: '2026-07-03' },
  { id: 'TXN-005', type: 'DEPOSIT', amount: 280000, currency: 'USD', from: 'Swiss Re Carbon Fund', to: 'Escrow-EQ-001', mobileMoneyRef: null, status: 'COMPLETED', date: '2026-07-02' },
  { id: 'TXN-006', type: 'RELEASE', amount: 95000, currency: 'USD', from: 'Escrow-TS-001', to: 'Tshopo Forest Initiative', mobileMoneyRef: null, status: 'COMPLETED', date: '2026-07-01' },
  { id: 'TXN-007', type: 'COMMUNITY_PAYOUT', amount: 8900, currency: 'CDF', from: 'Escrow-SK-001', to: 'Bukavu Communities', mobileMoneyRef: 'AIRTEL-9912345', status: 'FAILED', date: '2026-06-30' },
  { id: 'TXN-008', type: 'DEPOSIT', amount: 175000, currency: 'USD', from: 'Ecosystem Markets Ltd', to: 'Escrow-SK-001', mobileMoneyRef: null, status: 'COMPLETED', date: '2026-06-28' },
  { id: 'TXN-009', type: 'DEVELOPER_DISBURSEMENT', amount: 67000, currency: 'USD', from: 'Escrow-EQ-001', to: 'Équateur Green Dev', mobileMoneyRef: null, status: 'COMPLETED', date: '2026-06-25' },
  { id: 'TXN-010', type: 'REFUND', amount: 32000, currency: 'USD', from: 'Escrow-VR-001', to: 'Nordic Carbon Partners', mobileMoneyRef: null, status: 'COMPLETED', date: '2026-06-22' },
  { id: 'TXN-011', type: 'COMMUNITY_PAYOUT', amount: 15700, currency: 'USD', from: 'Escrow-MN-001', to: 'Inongo Communities', mobileMoneyRef: 'MPESA-7856789', status: 'COMPLETED', date: '2026-06-20' },
  { id: 'TXN-012', type: 'DEPOSIT', amount: 520000, currency: 'USD', from: 'Mirova Natural Capital', to: 'Escrow-MN-001', mobileMoneyRef: null, status: 'COMPLETED', date: '2026-06-18' },
];

const monthlyVolume = [
  { month: 'Jan', deposits: 380000, payouts: 45000, disbursements: 120000 },
  { month: 'Feb', deposits: 290000, payouts: 52000, disbursements: 95000 },
  { month: 'Mar', deposits: 450000, payouts: 68000, disbursements: 180000 },
  { month: 'Apr', deposits: 310000, payouts: 41000, disbursements: 110000 },
  { month: 'May', deposits: 580000, payouts: 73000, disbursements: 210000 },
  { month: 'Jun', deposits: 490000, payouts: 82000, disbursements: 195000 },
];

const typeColors: Record<string, string> = {
  DEPOSIT: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  RELEASE: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  REFUND: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  COMMUNITY_PAYOUT: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  DEVELOPER_DISBURSEMENT: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
};


export default function TransactionsPage() {
  const [typeFilter, setTypeFilter] = useState('All');
  const filtered = typeFilter === 'All' ? transactions : transactions.filter(t => t.type === typeFilter);
  const totalProcessed = transactions.filter(t => t.status === 'COMPLETED').reduce((s, t) => s + t.amount, 0);
  const communityPayouts = transactions.filter(t => t.type === 'COMMUNITY_PAYOUT' && t.status === 'COMPLETED').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text)]">Payment Transactions</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Processed" value={formatCurrency(totalProcessed)} icon={DollarSign} sub="All time" />
        <StatCard label="This Month" value={formatCurrency(905000)} icon={ArrowUpDown} sub="July 2026" />
        <StatCard label="Community Payouts" value={formatCurrency(communityPayouts)} icon={Users} sub="4 communities" />
        <StatCard label="Developer Disbursements" value={formatCurrency(192000)} icon={Building2} sub="3 developers" />
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg p-5">
        <h3 className="text-sm font-semibold text-[var(--text)] mb-4">Monthly Transaction Volume (USD)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyVolume}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '6px', fontSize: '12px' }} />
            <Bar dataKey="deposits" fill="#1b6b3a" name="Deposits" radius={[2, 2, 0, 0]} />
            <Bar dataKey="disbursements" fill="#2d8a4e" name="Disbursements" radius={[2, 2, 0, 0]} />
            <Bar dataKey="payouts" fill="#5cb874" name="Community Payouts" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--text)]">Transaction History</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="text-sm bg-[var(--bg)] border border-[var(--border)] rounded px-2 py-1 text-[var(--text)]">
              <option>All</option>
              <option value="DEPOSIT">Deposit</option>
              <option value="RELEASE">Release</option>
              <option value="REFUND">Refund</option>
              <option value="COMMUNITY_PAYOUT">Community Payout</option>
              <option value="DEVELOPER_DISBURSEMENT">Developer Disbursement</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['ID', 'Type', 'Amount', 'From', 'To', 'Mobile Ref', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id} className="border-b border-[var(--border)] hover:bg-[var(--stripe)]">
                  <td className="px-4 py-3 font-mono text-xs text-[var(--accent)]">{tx.id}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[tx.type]}`}>{tx.type.replace(/_/g, ' ')}</span></td>
                  <td className="px-4 py-3 font-medium text-[var(--text)] tabular-nums">{tx.currency === 'USD' ? formatCurrency(tx.amount) : `${tx.amount.toLocaleString()} CDF`}</td>
                  <td className="px-4 py-3 text-[var(--text)]">{tx.from}</td>
                  <td className="px-4 py-3 text-[var(--text)]">{tx.to}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">{tx.mobileMoneyRef || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={tx.status} /></td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}