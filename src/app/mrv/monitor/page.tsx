'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Satellite,
  TreePine,
  AlertTriangle,
  CalendarDays,
  MapPin,
  Eye,
  ChevronDown,
  Search,
} from 'lucide-react';

const DRCMap = dynamic(() => import('@/components/ui/drc-map').then(m => ({ default: m.DRCMap })), { ssr: false });

const summaryCards = [
  {
    label: 'Total Monitored Area',
    value: '2,847,530',
    unit: 'hectares',
    icon: Satellite,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Forest Cover',
    value: '78.4',
    unit: '%',
    icon: TreePine,
    color: 'bg-green-100 text-green-700',
  },
  {
    label: 'Active Alerts',
    value: '147',
    unit: 'alerts',
    icon: AlertTriangle,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    label: 'Last Observation',
    value: '2026-07-05',
    unit: '',
    icon: CalendarDays,
    color: 'bg-sky-100 text-sky-700',
  },
];

const monitoringProjects = [
  {
    id: 'MN-001',
    name: 'Mai-Ndombe REDD+ Landscape',
    geography: 'Mai-Ndombe Province',
    area: 742500,
    forestType: 'Tropical Moist Broadleaf',
    baselineYear: 2018,
    lastObservation: '2026-07-05',
    status: 'Active',
  },
  {
    id: 'EQ-002',
    name: 'Equateur Forest Reserve',
    geography: 'Equateur Province',
    area: 518300,
    forestType: 'Swamp Forest',
    baselineYear: 2019,
    lastObservation: '2026-07-04',
    status: 'Active',
  },
  {
    id: 'TS-003',
    name: 'Tshopo Community Forest',
    geography: 'Tshopo Province',
    area: 385000,
    forestType: 'Dense Humid Forest',
    baselineYear: 2020,
    lastObservation: '2026-07-03',
    status: 'Active',
  },
  {
    id: 'SK-004',
    name: 'Kahuzi-Biega Buffer Zone',
    geography: 'Sud-Kivu Province',
    area: 296400,
    forestType: 'Montane Forest',
    baselineYear: 2017,
    lastObservation: '2026-07-05',
    status: 'Active',
  },
  {
    id: 'MN-005',
    name: 'Lac Tumba Wetlands Project',
    geography: 'Mai-Ndombe Province',
    area: 210800,
    forestType: 'Flooded Forest',
    baselineYear: 2021,
    lastObservation: '2026-07-02',
    status: 'Active',
  },
  {
    id: 'EQ-006',
    name: 'Salonga North Corridor',
    geography: 'Equateur Province',
    area: 178200,
    forestType: 'Primary Rainforest',
    baselineYear: 2019,
    lastObservation: '2026-07-01',
    status: 'Active',
  },
  {
    id: 'TS-007',
    name: 'Okapi Wildlife Periphery',
    geography: 'Tshopo Province',
    area: 162400,
    forestType: 'Dense Humid Forest',
    baselineYear: 2020,
    lastObservation: '2026-06-30',
    status: 'Under Review',
  },
  {
    id: 'SK-008',
    name: 'Itombwe Massif Conservation',
    geography: 'Sud-Kivu Province',
    area: 143200,
    forestType: 'Montane & Bamboo Forest',
    baselineYear: 2022,
    lastObservation: '2026-07-04',
    status: 'Active',
  },
  {
    id: 'MN-009',
    name: 'Bolobo Agroforestry Corridor',
    geography: 'Mai-Ndombe Province',
    area: 98500,
    forestType: 'Secondary Forest / Agroforestry',
    baselineYear: 2023,
    lastObservation: '2026-07-03',
    status: 'Active',
  },
  {
    id: 'EQ-010',
    name: 'Mongala River Basin',
    geography: 'Equateur Province',
    area: 112230,
    forestType: 'Riparian Forest',
    baselineYear: 2021,
    lastObservation: '2026-06-28',
    status: 'Pending Baseline',
  },
];

const projectCoords: Record<string, [number, number]> = {
  'MN-001': [-2.1, 18.2],
  'EQ-002': [0.05, 20.4],
  'TS-003': [1.45, 25.3],
  'SK-004': [-2.3, 28.8],
  'MN-005': [-1.9, 17.9],
  'EQ-006': [-1.0, 21.5],
  'TS-007': [1.4, 28.5],
  'SK-008': [-3.4, 28.7],
  'MN-009': [-2.2, 16.5],
  'EQ-010': [2.1, 21.8],
};

export default function SatelliteMonitoringDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('All');

  const provinces = ['All', ...new Set(monitoringProjects.map((p) => p.geography))];

  const filtered = monitoringProjects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvince = provinceFilter === 'All' || p.geography === provinceFilter;
    return matchesSearch && matchesProvince;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <Satellite className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Satellite Monitoring Dashboard</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                MRV Module &mdash; DRC Carbon Registry
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4"
              >
                <div className={`p-2.5 rounded-lg ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">
                    {card.value}
                    {card.unit && (
                      <span className="text-sm font-normal text-gray-500 ml-1">{card.unit}</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Satellite Map */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <h2 className="text-base font-semibold text-gray-900">
                Satellite View &mdash; DRC Monitoring Zones
              </h2>
            </div>
            <span className="text-xs text-gray-400">Esri Satellite Imagery | 2026-07-05</span>
          </div>
          <DRCMap
            satellite
            height={550}
            markers={monitoringProjects.map((p) => ({
              lat: projectCoords[p.id]?.[0] ?? -2.5,
              lng: projectCoords[p.id]?.[1] ?? 23.5,
              label: p.name,
              popup: `${p.area.toLocaleString()} ha · ${p.forestType}<br/>Status: ${p.status} · Last: ${p.lastObservation}`,
              color: p.status === 'Active' ? 'green' as const : p.status === 'Under Review' ? 'amber' as const : 'blue' as const,
            }))}
          />
        </div>

        {/* Monitoring Projects Table */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-emerald-600" />
              <h2 className="text-base font-semibold text-gray-900">Monitoring Projects</h2>
              <span className="text-xs text-gray-400 ml-1">
                {filtered.length} of {monitoringProjects.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-56"
                />
              </div>
              <div className="relative">
                <select
                  value={provinceFilter}
                  onChange={(e) => setProvinceFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p === 'All' ? 'All Provinces' : p}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Project Name</th>
                  <th className="px-5 py-3 font-medium">Geography</th>
                  <th className="px-5 py-3 font-medium text-right">Area (ha)</th>
                  <th className="px-5 py-3 font-medium">Forest Type</th>
                  <th className="px-5 py-3 font-medium text-center">Baseline Year</th>
                  <th className="px-5 py-3 font-medium">Last Observation</th>
                  <th className="px-5 py-3 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">{project.id}</td>
                    <td className="px-5 py-3 font-medium text-gray-900">{project.name}</td>
                    <td className="px-5 py-3 text-gray-600">{project.geography}</td>
                    <td className="px-5 py-3 text-right font-mono text-gray-700">
                      {project.area.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{project.forestType}</td>
                    <td className="px-5 py-3 text-center text-gray-600">{project.baselineYear}</td>
                    <td className="px-5 py-3 text-gray-600">{project.lastObservation}</td>
                    <td className="px-5 py-3 text-center">
                      <StatusBadge status={project.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              No projects match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
