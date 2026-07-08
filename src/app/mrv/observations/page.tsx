'use client';

import { useState } from 'react';
import { Satellite, Eye, CloudSun, TrendingUp, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { StatCard } from '@/components/ui/stat-card';

interface Observation {
  id: string;
  date: string;
  satellite: string;
  cloudCover: number;
  ndviMean: number;
  forestCover: number;
  deforestationHa: number;
  confidenceScore: number;
  project: string;
}

const observations: Observation[] = [
  { id: 'OBS-001', date: '2026-07-01', satellite: 'Sentinel-2', cloudCover: 12, ndviMean: 0.82, forestCover: 94.2, deforestationHa: 3.1, confidenceScore: 0.94, project: 'Mai-Ndombe REDD+' },
  { id: 'OBS-002', date: '2026-06-25', satellite: 'Landsat 9', cloudCover: 28, ndviMean: 0.79, forestCover: 94.1, deforestationHa: 5.4, confidenceScore: 0.87, project: 'Mai-Ndombe REDD+' },
  { id: 'OBS-003', date: '2026-06-18', satellite: 'Sentinel-2', cloudCover: 8, ndviMean: 0.81, forestCover: 94.3, deforestationHa: 2.8, confidenceScore: 0.96, project: 'Équateur Conservation' },
  { id: 'OBS-004', date: '2026-06-11', satellite: 'Sentinel-2', cloudCover: 15, ndviMean: 0.78, forestCover: 91.7, deforestationHa: 7.2, confidenceScore: 0.91, project: 'Tshopo Sustainable Forestry' },
  { id: 'OBS-005', date: '2026-06-04', satellite: 'Landsat 8', cloudCover: 35, ndviMean: 0.76, forestCover: 94.0, deforestationHa: 4.1, confidenceScore: 0.82, project: 'Mai-Ndombe REDD+' },
  { id: 'OBS-006', date: '2026-05-28', satellite: 'Sentinel-2', cloudCover: 10, ndviMean: 0.83, forestCover: 94.4, deforestationHa: 1.9, confidenceScore: 0.95, project: 'Mai-Ndombe REDD+' },
  { id: 'OBS-007', date: '2026-05-21', satellite: 'Sentinel-2', cloudCover: 22, ndviMean: 0.80, forestCover: 92.1, deforestationHa: 3.5, confidenceScore: 0.89, project: 'Équateur Conservation' },
  { id: 'OBS-008', date: '2026-05-14', satellite: 'Landsat 9', cloudCover: 18, ndviMean: 0.77, forestCover: 89.8, deforestationHa: 8.3, confidenceScore: 0.86, project: 'Sud-Kivu Cookstoves' },
  { id: 'OBS-009', date: '2026-05-07', satellite: 'Sentinel-2', cloudCover: 5, ndviMean: 0.84, forestCover: 94.5, deforestationHa: 1.2, confidenceScore: 0.97, project: 'Mai-Ndombe REDD+' },
  { id: 'OBS-010', date: '2026-04-30', satellite: 'Sentinel-2', cloudCover: 14, ndviMean: 0.81, forestCover: 91.9, deforestationHa: 4.7, confidenceScore: 0.92, project: 'Tshopo Sustainable Forestry' },
  { id: 'OBS-011', date: '2026-04-23', satellite: 'Landsat 8', cloudCover: 42, ndviMean: 0.74, forestCover: 94.2, deforestationHa: 3.8, confidenceScore: 0.78, project: 'Mai-Ndombe REDD+' },
  { id: 'OBS-012', date: '2026-04-16', satellite: 'Sentinel-2', cloudCover: 9, ndviMean: 0.82, forestCover: 92.3, deforestationHa: 2.4, confidenceScore: 0.95, project: 'Équateur Conservation' },
];

const ndviTrend = [
  { month: 'Jul 2024', ndvi: 0.78 }, { month: 'Aug 2024', ndvi: 0.76 }, { month: 'Sep 2024', ndvi: 0.74 },
  { month: 'Oct 2024', ndvi: 0.72 }, { month: 'Nov 2024', ndvi: 0.71 }, { month: 'Dec 2024', ndvi: 0.73 },
  { month: 'Jan 2025', ndvi: 0.75 }, { month: 'Feb 2025', ndvi: 0.77 }, { month: 'Mar 2025', ndvi: 0.79 },
  { month: 'Apr 2025', ndvi: 0.80 }, { month: 'May 2025', ndvi: 0.81 }, { month: 'Jun 2025', ndvi: 0.80 },
  { month: 'Jul 2025', ndvi: 0.79 }, { month: 'Aug 2025', ndvi: 0.77 }, { month: 'Sep 2025', ndvi: 0.75 },
  { month: 'Oct 2025', ndvi: 0.74 }, { month: 'Nov 2025', ndvi: 0.73 }, { month: 'Dec 2025', ndvi: 0.75 },
  { month: 'Jan 2026', ndvi: 0.77 }, { month: 'Feb 2026', ndvi: 0.79 }, { month: 'Mar 2026', ndvi: 0.81 },
  { month: 'Apr 2026', ndvi: 0.81 }, { month: 'May 2026', ndvi: 0.82 }, { month: 'Jun 2026', ndvi: 0.80 },
];

const satelliteBreakdown = [
  { name: 'Sentinel-2', value: 8, color: '#1b6b3a' },
  { name: 'Landsat 9', value: 2, color: '#2d8a4e' },
  { name: 'Landsat 8', value: 2, color: '#5cb874' },
];

export default function ObservationsPage() {
  const [satelliteFilter, setSatelliteFilter] = useState('All');

  const filtered = satelliteFilter === 'All' ? observations : observations.filter(o => o.satellite === satelliteFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Satellite Observations</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Sentinel-2 and Landsat imagery for DRC monitoring zones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Observations" value="148" icon={Eye} sub="Since Jan 2024" />
        <StatCard label="Avg Cloud Cover" value="18.2%" icon={CloudSun} sub="Last 30 days" />
        <StatCard label="Mean NDVI" value="0.80" icon={TrendingUp} sub="Forest health index" />
        <StatCard label="Active Satellites" value="3" icon={Satellite} sub="Sentinel-2, L8, L9" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg p-5">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-4">NDVI Trend (24 months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ndviTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} interval={3} />
              <YAxis domain={[0.65, 0.90]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '6px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="ndvi" stroke="var(--accent)" strokeWidth={2} dot={{ r: 2 }} name="NDVI" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg p-5">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-4">Observations by Satellite</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={satelliteBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {satelliteBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {satelliteBreakdown.map((s) => (
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
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--text)]">Recent Observations</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
            <select value={satelliteFilter} onChange={(e) => setSatelliteFilter(e.target.value)} className="text-sm bg-[var(--bg)] border border-[var(--border)] rounded px-2 py-1 text-[var(--text)]">
              <option>All</option>
              <option>Sentinel-2</option>
              <option>Landsat 8</option>
              <option>Landsat 9</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Date', 'Satellite', 'Project', 'Cloud %', 'NDVI', 'Forest %', 'Deforest. (ha)', 'Confidence'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((obs) => (
                <tr key={obs.id} className="border-b border-[var(--border)] hover:bg-[var(--stripe)]">
                  <td className="px-4 py-3 text-[var(--text)]">{obs.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${obs.satellite === 'Sentinel-2' ? 'bg-[var(--bg-tag)] text-[var(--text-tag)]' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                      {obs.satellite}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text)]">{obs.project}</td>
                  <td className="px-4 py-3 text-[var(--text)] tabular-nums">{obs.cloudCover}%</td>
                  <td className="px-4 py-3 font-medium text-[var(--text)] tabular-nums">{obs.ndviMean.toFixed(2)}</td>
                  <td className="px-4 py-3 text-[var(--text)] tabular-nums">{obs.forestCover}%</td>
                  <td className="px-4 py-3 text-[var(--text)] tabular-nums">{obs.deforestationHa}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${obs.confidenceScore * 100}%`, backgroundColor: obs.confidenceScore >= 0.9 ? '#1b6b3a' : obs.confidenceScore >= 0.8 ? '#d4a72c' : '#c45a3c' }} />
                      </div>
                      <span className="text-xs text-[var(--text-muted)] tabular-nums">{(obs.confidenceScore * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}