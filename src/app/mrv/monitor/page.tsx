'use client';

import { useState } from 'react';
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

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-800',
  'Under Review': 'bg-amber-100 text-amber-800',
  'Pending Baseline': 'bg-sky-100 text-sky-800',
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

        {/* Map Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <h2 className="text-base font-semibold text-gray-900">
                Satellite View &mdash; Mai-Ndombe Province
              </h2>
            </div>
            <span className="text-xs text-gray-400">Sentinel-2 | 10m resolution | 2026-07-05</span>
          </div>
          <div
            className="relative flex items-center justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-950"
            style={{ height: 600 }}
          >
            {/* Simulated terrain grid */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Map pins for projects */}
            <div className="absolute top-[15%] left-[30%] flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-300 font-medium">Mai-Ndombe REDD+</span>
            </div>
            <div className="absolute top-[25%] left-[55%] flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-300 font-medium">Equateur Reserve</span>
            </div>
            <div className="absolute top-[40%] left-[70%] flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-300 font-medium">Tshopo Community</span>
            </div>
            <div className="absolute top-[65%] left-[75%] flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-xs text-amber-300 font-medium">Kahuzi-Biega</span>
            </div>
            <div className="absolute top-[35%] left-[25%] flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-300 font-medium">Lac Tumba</span>
            </div>

            <div className="text-center z-10">
              <Satellite className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg font-medium">
                Interactive Satellite Map
              </p>
              <p className="text-white/40 text-sm mt-1">
                Mapbox GL integration &mdash; 10 monitoring zones across 4 provinces
              </p>
            </div>
          </div>
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
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {project.status}
                      </span>
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
