'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  XCircle,
  Filter,
  MapPin,
  Clock,
  ChevronDown,
} from 'lucide-react';

const DRCMap = dynamic(() => import('@/components/ui/drc-map').then(m => ({ default: m.DRCMap })), { ssr: false });
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';
type AlertSource = 'GLAD' | 'RADD' | 'GFW';
type VerifiedStatus = 'Verified' | 'Pending' | 'Rejected';

interface DeforestationAlert {
  id: string;
  date: string;
  latitude: number;
  longitude: number;
  location: string;
  areaHa: number;
  confidence: ConfidenceLevel;
  source: AlertSource;
  verified: VerifiedStatus;
  severity: 'critical' | 'warning' | 'info';
}

const alerts: DeforestationAlert[] = [
  {
    id: 'ALT-2026-001',
    date: '2026-07-05',
    latitude: -2.3456,
    longitude: 18.2741,
    location: 'Mai-Ndombe, Inongo Territory',
    areaHa: 42.8,
    confidence: 'HIGH',
    source: 'GLAD',
    verified: 'Verified',
    severity: 'critical',
  },
  {
    id: 'ALT-2026-002',
    date: '2026-07-04',
    latitude: 0.8934,
    longitude: 20.1567,
    location: 'Equateur, Mbandaka Area',
    areaHa: 18.3,
    confidence: 'HIGH',
    source: 'RADD',
    verified: 'Verified',
    severity: 'critical',
  },
  {
    id: 'ALT-2026-003',
    date: '2026-07-04',
    latitude: 1.4521,
    longitude: 25.3412,
    location: 'Tshopo, Kisangani Periphery',
    areaHa: 31.5,
    confidence: 'HIGH',
    source: 'GFW',
    verified: 'Pending',
    severity: 'critical',
  },
  {
    id: 'ALT-2026-004',
    date: '2026-07-03',
    latitude: -2.8917,
    longitude: 28.8392,
    location: 'Sud-Kivu, Kabare District',
    areaHa: 8.7,
    confidence: 'MEDIUM',
    source: 'GLAD',
    verified: 'Verified',
    severity: 'warning',
  },
  {
    id: 'ALT-2026-005',
    date: '2026-07-02',
    latitude: -1.6734,
    longitude: 17.9823,
    location: 'Mai-Ndombe, Kiri Sector',
    areaHa: 15.2,
    confidence: 'MEDIUM',
    source: 'RADD',
    verified: 'Pending',
    severity: 'warning',
  },
  {
    id: 'ALT-2026-006',
    date: '2026-07-01',
    latitude: 0.3456,
    longitude: 21.4532,
    location: 'Equateur, Bikoro Territory',
    areaHa: 5.1,
    confidence: 'LOW',
    source: 'GFW',
    verified: 'Rejected',
    severity: 'info',
  },
  {
    id: 'ALT-2026-007',
    date: '2026-06-30',
    latitude: -3.1245,
    longitude: 29.0412,
    location: 'Sud-Kivu, Uvira Highlands',
    areaHa: 22.4,
    confidence: 'HIGH',
    source: 'GLAD',
    verified: 'Verified',
    severity: 'critical',
  },
  {
    id: 'ALT-2026-008',
    date: '2026-06-28',
    latitude: 2.0134,
    longitude: 24.7891,
    location: 'Tshopo, Opala District',
    areaHa: 12.6,
    confidence: 'MEDIUM',
    source: 'RADD',
    verified: 'Pending',
    severity: 'warning',
  },
  {
    id: 'ALT-2026-009',
    date: '2026-06-27',
    latitude: -1.9876,
    longitude: 18.5643,
    location: 'Mai-Ndombe, Bolobo Territory',
    areaHa: 3.8,
    confidence: 'LOW',
    source: 'GFW',
    verified: 'Pending',
    severity: 'info',
  },
  {
    id: 'ALT-2026-010',
    date: '2026-06-25',
    latitude: 0.5678,
    longitude: 20.8945,
    location: 'Equateur, Basankusu Area',
    areaHa: 27.9,
    confidence: 'HIGH',
    source: 'GLAD',
    verified: 'Verified',
    severity: 'critical',
  },
  {
    id: 'ALT-2026-011',
    date: '2026-06-22',
    latitude: -2.5634,
    longitude: 28.4512,
    location: 'Sud-Kivu, Mwenga Territory',
    areaHa: 9.3,
    confidence: 'MEDIUM',
    source: 'RADD',
    verified: 'Verified',
    severity: 'warning',
  },
  {
    id: 'ALT-2026-012',
    date: '2026-06-20',
    latitude: 1.8923,
    longitude: 25.7834,
    location: 'Tshopo, Banalia Sector',
    areaHa: 6.5,
    confidence: 'LOW',
    source: 'GFW',
    verified: 'Rejected',
    severity: 'info',
  },
  {
    id: 'ALT-2026-013',
    date: '2026-06-18',
    latitude: -1.3456,
    longitude: 17.6789,
    location: 'Mai-Ndombe, Mushie District',
    areaHa: 35.1,
    confidence: 'HIGH',
    source: 'GLAD',
    verified: 'Verified',
    severity: 'critical',
  },
  {
    id: 'ALT-2026-014',
    date: '2026-06-15',
    latitude: 0.1234,
    longitude: 19.8745,
    location: 'Equateur, Bomongo Area',
    areaHa: 11.4,
    confidence: 'MEDIUM',
    source: 'RADD',
    verified: 'Pending',
    severity: 'warning',
  },
  {
    id: 'ALT-2026-015',
    date: '2026-06-12',
    latitude: -3.4567,
    longitude: 28.9123,
    location: 'Sud-Kivu, Fizi Territory',
    areaHa: 19.7,
    confidence: 'HIGH',
    source: 'GFW',
    verified: 'Verified',
    severity: 'critical',
  },
];

const alertTrendData = [
  { month: 'Aug 2025', alerts: 82, critical: 24, warning: 35, info: 23 },
  { month: 'Sep 2025', alerts: 95, critical: 31, warning: 38, info: 26 },
  { month: 'Oct 2025', alerts: 110, critical: 38, warning: 42, info: 30 },
  { month: 'Nov 2025', alerts: 128, critical: 45, warning: 48, info: 35 },
  { month: 'Dec 2025', alerts: 145, critical: 52, warning: 55, info: 38 },
  { month: 'Jan 2026', alerts: 168, critical: 60, warning: 62, info: 46 },
  { month: 'Feb 2026', alerts: 155, critical: 55, warning: 58, info: 42 },
  { month: 'Mar 2026', alerts: 132, critical: 44, warning: 50, info: 38 },
  { month: 'Apr 2026', alerts: 118, critical: 39, warning: 45, info: 34 },
  { month: 'May 2026', alerts: 140, critical: 48, warning: 52, info: 40 },
  { month: 'Jun 2026', alerts: 158, critical: 56, warning: 60, info: 42 },
  { month: 'Jul 2026', alerts: 147, critical: 50, warning: 57, info: 40 },
];

const severityConfig = {
  critical: { label: 'Critical', color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle, iconColor: 'text-red-600' },
  warning: { label: 'Warning', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-600' },
  info: { label: 'Info', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: Info, iconColor: 'text-emerald-600' },
};

const confidenceColors: Record<ConfidenceLevel, string> = {
  HIGH: 'bg-red-100 text-red-700',
  MEDIUM: 'bg-amber-100 text-amber-700',
  LOW: 'bg-gray-100 text-gray-700',
};

const verifiedConfig: Record<VerifiedStatus, { color: string; icon: typeof CheckCircle2 }> = {
  Verified: { color: 'text-emerald-600', icon: CheckCircle2 },
  Pending: { color: 'text-amber-500', icon: Clock },
  Rejected: { color: 'text-red-500', icon: XCircle },
};

export default function DeforestationAlertsPage() {
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceLevel | 'All'>('All');
  const [verifiedFilter, setVerifiedFilter] = useState<VerifiedStatus | 'All'>('All');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('all');

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      if (confidenceFilter !== 'All' && a.confidence !== confidenceFilter) return false;
      if (verifiedFilter !== 'All' && a.verified !== verifiedFilter) return false;
      if (dateRange !== 'all') {
        const daysMap = { '7d': 7, '30d': 30, '90d': 90 };
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - daysMap[dateRange]);
        if (new Date(a.date) < cutoff) return false;
      }
      return true;
    });
  }, [confidenceFilter, verifiedFilter, dateRange]);

  const severityCounts = useMemo(() => {
    const counts = { critical: 0, warning: 0, info: 0 };
    filtered.forEach((a) => counts[a.severity]++);
    return counts;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Deforestation Alerts</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                MRV Module &mdash; Near real-time forest change detection across DRC
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Severity Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(['critical', 'warning', 'info'] as const).map((sev) => {
            const config = severityConfig[sev];
            const Icon = config.icon;
            return (
              <div
                key={sev}
                className={`rounded-xl border p-5 flex items-center gap-4 ${config.color}`}
              >
                <div className="p-2.5 rounded-lg bg-white/60">
                  <Icon className={`h-6 w-6 ${config.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80">{config.label} Alerts</p>
                  <p className="text-3xl font-bold">{severityCounts[sev]}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select
                  value={confidenceFilter}
                  onChange={(e) => setConfidenceFilter(e.target.value as ConfidenceLevel | 'All')}
                  className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  <option value="All">All Confidence</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={verifiedFilter}
                  onChange={(e) => setVerifiedFilter(e.target.value as VerifiedStatus | 'All')}
                  className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                {(['7d', '30d', '90d', 'all'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      dateRange === range
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {range === 'all' ? 'All Time' : range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:ml-auto text-sm text-gray-500">
              Showing {filtered.length} of {alerts.length} alerts
            </div>
          </div>
        </div>

        {/* Alert Locations Map */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-600" />
              <h2 className="text-base font-semibold text-gray-900">Alert Locations</h2>
            </div>
            <span className="text-xs text-gray-400">{filtered.length} alerts mapped</span>
          </div>
          <DRCMap
            satellite
            height={400}
            markers={filtered.map((a) => ({
              lat: a.latitude,
              lng: a.longitude,
              label: a.id,
              popup: `${a.location}<br/>${a.areaHa} ha · ${a.confidence} confidence<br/>${a.source} · ${a.date}`,
              color: a.severity === 'critical' ? 'red' as const : a.severity === 'warning' ? 'amber' as const : 'green' as const,
            }))}
          />
        </div>

        {/* Alerts Table */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Alert Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium text-center">Coordinates</th>
                  <th className="px-5 py-3 font-medium text-right">Area (ha)</th>
                  <th className="px-5 py-3 font-medium text-center">Confidence</th>
                  <th className="px-5 py-3 font-medium text-center">Source</th>
                  <th className="px-5 py-3 font-medium text-center">Verified</th>
                  <th className="px-5 py-3 font-medium text-center">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((alert) => {
                  const sevConf = severityConfig[alert.severity];
                  const verConf = verifiedConfig[alert.verified];
                  const VerIcon = verConf.icon;
                  return (
                    <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{alert.date}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-start gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-gray-400 mt-0.5 shrink-0" />
                          <span className="text-gray-900 font-medium">{alert.location}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-center font-mono text-xs text-gray-500">
                        {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-gray-700">
                        {alert.areaHa.toFixed(1)}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${confidenceColors[alert.confidence]}`}
                        >
                          {alert.confidence}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                          {alert.source}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <VerIcon className={`h-4 w-4 ${verConf.color}`} />
                          <span className={`text-xs font-medium ${verConf.color}`}>
                            {alert.verified}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sevConf.color}`}
                        >
                          {sevConf.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              No alerts match the selected filters.
            </div>
          )}
        </div>

        {/* Alert Trend Chart */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Alert Trend (12 Months)</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Monthly deforestation alerts by severity across all monitored provinces
            </p>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={alertTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gradWarning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d97706" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gradInfo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="critical"
                  stackId="1"
                  stroke="#dc2626"
                  fill="url(#gradCritical)"
                  strokeWidth={2}
                  name="Critical"
                />
                <Area
                  type="monotone"
                  dataKey="warning"
                  stackId="1"
                  stroke="#d97706"
                  fill="url(#gradWarning)"
                  strokeWidth={2}
                  name="Warning"
                />
                <Area
                  type="monotone"
                  dataKey="info"
                  stackId="1"
                  stroke="#059669"
                  fill="url(#gradInfo)"
                  strokeWidth={2}
                  name="Info"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
