'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Clipboard,
  Filter,
  Trees,
  CookingPot,
  Zap,
  Wheat,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ClimateAction {
  id: number;
  title: string;
  description: string;
  sector: string;
  type: 'Mitigation' | 'Adaptation' | 'Cross-cutting';
  instrumentType: string;
  status: 'Planned' | 'Adopted' | 'Implemented';
  expectedReduction: number;
  achievedReduction: number;
  startYear: number;
  endYear: number;
  fundingSource: string;
  estimatedCost: string;
}

const actions: ClimateAction[] = [
  {
    id: 1,
    title: 'REDD+ Mai-Ndombe Programme',
    description:
      'Jurisdictional REDD+ programme in Mai-Ndombe province targeting reduced deforestation and sustainable forest management across 12.3 million hectares. Includes community-based forest monitoring, alternative livelihoods, and law enforcement.',
    sector: 'LULUCF / Forestry',
    type: 'Mitigation',
    instrumentType: 'Results-based Finance',
    status: 'Implemented',
    expectedReduction: 29.0,
    achievedReduction: 18.5,
    startYear: 2018,
    endYear: 2030,
    fundingSource: 'World Bank FCPF, CAFI',
    estimatedCost: '$150M',
  },
  {
    id: 2,
    title: 'National Forest Monitoring System (SNSF)',
    description:
      'Satellite-based monitoring of forest cover change using Terra Congo platform. Provides near real-time deforestation alerts, reference emission levels, and MRV capacity for REDD+ reporting to UNFCCC.',
    sector: 'LULUCF / Forestry',
    type: 'Cross-cutting',
    instrumentType: 'Institutional/MRV',
    status: 'Implemented',
    expectedReduction: 0,
    achievedReduction: 0,
    startYear: 2016,
    endYear: 2030,
    fundingSource: 'FAO, JICA, EU',
    estimatedCost: '$25M',
  },
  {
    id: 3,
    title: 'Clean Cooking Programme',
    description:
      'Distribution of improved cookstoves and promotion of LPG/biogas alternatives to reduce biomass consumption. Targeting 5 million households in Kinshasa, Lubumbashi, and Mbuji-Mayi. Reduces forest pressure and indoor air pollution.',
    sector: 'Energy',
    type: 'Mitigation',
    instrumentType: 'Programme/Project',
    status: 'Adopted',
    expectedReduction: 8.5,
    achievedReduction: 2.1,
    startYear: 2020,
    endYear: 2030,
    fundingSource: 'GCF, AfDB, Private',
    estimatedCost: '$200M',
  },
  {
    id: 4,
    title: 'Inga III Hydropower Development',
    description:
      'Construction of the 11,050 MW Inga III dam on the Congo River, the largest hydropower potential globally. Phase 1 targets 4,800 MW for domestic use and regional export, displacing thermal generation.',
    sector: 'Energy',
    type: 'Mitigation',
    instrumentType: 'Infrastructure',
    status: 'Planned',
    expectedReduction: 3.2,
    achievedReduction: 0,
    startYear: 2025,
    endYear: 2035,
    fundingSource: 'AfDB, World Bank, PPP',
    estimatedCost: '$14B',
  },
  {
    id: 5,
    title: 'Renewable Energy Access (Solar Mini-grids)',
    description:
      'Deployment of solar PV mini-grids and standalone systems in rural communities. Targeting 10,000 villages by 2030 to increase electrification rate from 19% to 30%, reducing reliance on diesel generators.',
    sector: 'Energy',
    type: 'Mitigation',
    instrumentType: 'Programme/Project',
    status: 'Adopted',
    expectedReduction: 1.2,
    achievedReduction: 0.3,
    startYear: 2021,
    endYear: 2030,
    fundingSource: 'GCF, IDA, USAID',
    estimatedCost: '$350M',
  },
  {
    id: 6,
    title: 'Sustainable Agriculture & Agroforestry',
    description:
      'Promotion of conservation agriculture, agroforestry systems, and climate-smart practices to reduce land conversion for shifting cultivation. Integrates cocoa, coffee, and palm oil value chains with zero-deforestation commitments.',
    sector: 'Agriculture',
    type: 'Cross-cutting',
    instrumentType: 'Programme/Project',
    status: 'Adopted',
    expectedReduction: 12.0,
    achievedReduction: 3.8,
    startYear: 2019,
    endYear: 2030,
    fundingSource: 'CAFI, IFAD, EU',
    estimatedCost: '$180M',
  },
  {
    id: 7,
    title: 'National Adaptation Programme of Action (NAPA)',
    description:
      'Implementation of priority adaptation actions including flood early warning systems, climate-resilient infrastructure in Kinshasa, and water resource management in drought-prone eastern provinces.',
    sector: 'Cross-cutting',
    type: 'Adaptation',
    instrumentType: 'National Plan',
    status: 'Implemented',
    expectedReduction: 0,
    achievedReduction: 0,
    startYear: 2015,
    endYear: 2030,
    fundingSource: 'GEF, LDCF',
    estimatedCost: '$50M',
  },
  {
    id: 8,
    title: 'Waste Management Improvement - Kinshasa',
    description:
      'Modern landfill with methane capture and waste-to-energy systems for Kinshasa metropolitan area (17M population). Includes composting programmes and recycling infrastructure.',
    sector: 'Waste',
    type: 'Mitigation',
    instrumentType: 'Infrastructure',
    status: 'Planned',
    expectedReduction: 0.8,
    achievedReduction: 0,
    startYear: 2024,
    endYear: 2032,
    fundingSource: 'AfDB, French AFD',
    estimatedCost: '$120M',
  },
  {
    id: 9,
    title: 'Transport Modal Shift - Kinshasa BRT',
    description:
      'Bus Rapid Transit system for Kinshasa to reduce emissions from aging vehicle fleet. Includes fleet renewal programme promoting electric and hybrid vehicles.',
    sector: 'Transport',
    type: 'Mitigation',
    instrumentType: 'Infrastructure',
    status: 'Planned',
    expectedReduction: 0.5,
    achievedReduction: 0,
    startYear: 2025,
    endYear: 2033,
    fundingSource: 'World Bank, EU',
    estimatedCost: '$280M',
  },
  {
    id: 10,
    title: 'Community Forest Concessions Programme',
    description:
      'Granting legal forest management rights to local and indigenous communities covering 10 million hectares. Combines tenure security with sustainable use obligations and carbon benefit-sharing.',
    sector: 'LULUCF / Forestry',
    type: 'Cross-cutting',
    instrumentType: 'Regulatory/Legal',
    status: 'Adopted',
    expectedReduction: 15.0,
    achievedReduction: 4.2,
    startYear: 2018,
    endYear: 2030,
    fundingSource: 'CAFI, RFN, USAID',
    estimatedCost: '$85M',
  },
];

const sectors = ['All', ...Array.from(new Set(actions.map((a) => a.sector)))];
const statuses = ['All', 'Planned', 'Adopted', 'Implemented'];

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    Planned: 'bg-gray-100 text-gray-700 border-gray-200',
    Adopted: 'bg-blue-50 text-blue-700 border-blue-200',
    Implemented: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${config[status] || config['Planned']}`}
    >
      {status}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const config: Record<string, string> = {
    Mitigation: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Adaptation: 'bg-sky-50 text-sky-700 border-sky-200',
    'Cross-cutting': 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${config[type] || ''}`}
    >
      {type}
    </span>
  );
}

function SectorIcon({ sector }: { sector: string }) {
  switch (sector) {
    case 'LULUCF / Forestry':
      return <Trees className="h-4 w-4 text-emerald-600" />;
    case 'Energy':
      return <Zap className="h-4 w-4 text-yellow-500" />;
    case 'Agriculture':
      return <Wheat className="h-4 w-4 text-amber-600" />;
    default:
      return <CookingPot className="h-4 w-4 text-gray-500" />;
  }
}

export default function ActionsPage() {
  const [sectorFilter, setSectorFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = actions.filter((a) => {
    if (sectorFilter !== 'All' && a.sector !== sectorFilter) return false;
    if (statusFilter !== 'All' && a.status !== statusFilter) return false;
    return true;
  });

  const totalExpected = actions.reduce((s, a) => s + a.expectedReduction, 0);
  const totalAchieved = actions.reduce((s, a) => s + a.achievedReduction, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-1">
            <a
              href="/ndc"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </a>
            <div className="flex items-center gap-2">
              <Clipboard className="h-6 w-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Climate Actions
              </h1>
            </div>
          </div>
          <p className="text-gray-500 ml-8 text-sm">
            DRC NDC mitigation and adaptation actions, programmes, and policies
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Total Actions
            </p>
            <p className="text-3xl font-bold text-gray-900">{actions.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">
              Expected Reduction
            </p>
            <p className="text-3xl font-bold text-emerald-700">
              {totalExpected.toFixed(1)}
            </p>
            <p className="text-sm text-gray-500">MtCO2e by 2030</p>
          </div>
          <div className="bg-white rounded-xl border border-blue-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
              Achieved Reduction
            </p>
            <p className="text-3xl font-bold text-blue-700">
              {totalAchieved.toFixed(1)}
            </p>
            <p className="text-sm text-gray-500">MtCO2e to date</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Delivery Rate
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {((totalAchieved / totalExpected) * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-gray-500">Of expected reductions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-500 uppercase">
                  Sector
                </label>
                <select
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {sectors.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-500 uppercase">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-400 sm:ml-auto">
              Showing {filtered.length} of {actions.length} actions
            </p>
          </div>
        </div>

        {/* Actions Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-8"></th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Instrument
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Expected (MtCO2e)
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((action) => {
                  const progressPct =
                    action.expectedReduction > 0
                      ? (action.achievedReduction / action.expectedReduction) *
                        100
                      : 0;
                  const isExpanded = expandedId === action.id;

                  return (
                    <>
                      <tr
                        key={action.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : action.id)
                        }
                      >
                        <td className="pl-6 py-3.5">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="font-medium text-gray-900">
                            {action.title}
                          </span>
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <SectorIcon sector={action.sector} />
                            <span className="text-gray-700 whitespace-nowrap">
                              {action.sector}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <TypeBadge type={action.type} />
                        </td>
                        <td className="px-6 py-3.5 text-gray-600 whitespace-nowrap">
                          {action.instrumentType}
                        </td>
                        <td className="px-6 py-3.5">
                          <StatusBadge status={action.status} />
                        </td>
                        <td className="px-6 py-3.5 text-right font-mono text-gray-900">
                          {action.expectedReduction > 0
                            ? action.expectedReduction.toFixed(1)
                            : 'N/A'}
                        </td>
                        <td className="px-6 py-3.5">
                          {action.expectedReduction > 0 ? (
                            <div className="w-28">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-500">
                                  {action.achievedReduction.toFixed(1)}
                                </span>
                                <span className="font-medium text-gray-700">
                                  {progressPct.toFixed(0)}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div
                                  className={`h-2 rounded-full transition-all duration-500 ${
                                    progressPct >= 60
                                      ? 'bg-emerald-500'
                                      : progressPct >= 30
                                        ? 'bg-amber-500'
                                        : 'bg-red-400'
                                  }`}
                                  style={{
                                    width: `${Math.min(progressPct, 100)}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">
                              MRV / Enabling
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-gray-600 whitespace-nowrap text-xs">
                          {action.startYear} - {action.endYear}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${action.id}-detail`}>
                          <td
                            colSpan={9}
                            className="px-6 py-4 bg-gray-50 border-t border-gray-100"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-2">
                                <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                  Description
                                </p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {action.description}
                                </p>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Funding Sources
                                  </p>
                                  <p className="text-sm text-gray-700">
                                    {action.fundingSource}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Estimated Cost
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {action.estimatedCost}
                                  </p>
                                </div>
                                <button className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700">
                                  <Eye className="h-3.5 w-3.5" />
                                  View Full Details
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
