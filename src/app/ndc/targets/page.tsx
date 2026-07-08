'use client';

import { useState } from 'react';
import {
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Trees,
  Factory,
  Zap,
  Truck,
  Trash2,
  Wheat,
} from 'lucide-react';

interface NDCTarget {
  id: number;
  sector: string;
  icon: React.ReactNode;
  targetType: 'Mitigation' | 'Adaptation' | 'Cross-cutting';
  baseYear: number;
  targetYear: number;
  baselineEmissions: number;
  targetEmissions: number;
  currentEmissions: number;
  reductionPercent: number;
  status: 'On Track' | 'At Risk' | 'Off Track';
  conditionalUnconditional: 'Unconditional' | 'Conditional';
}

const targets: NDCTarget[] = [
  {
    id: 1,
    sector: 'LULUCF / Forestry',
    icon: <Trees className="h-5 w-5 text-emerald-600" />,
    targetType: 'Mitigation',
    baseYear: 2018,
    targetYear: 2030,
    baselineEmissions: 200.5,
    targetEmissions: 160.4,
    currentEmissions: 178.3,
    reductionPercent: 20,
    status: 'At Risk',
    conditionalUnconditional: 'Conditional',
  },
  {
    id: 2,
    sector: 'Agriculture',
    icon: <Wheat className="h-5 w-5 text-amber-600" />,
    targetType: 'Mitigation',
    baseYear: 2018,
    targetYear: 2030,
    baselineEmissions: 45.0,
    targetEmissions: 38.25,
    currentEmissions: 42.1,
    reductionPercent: 15,
    status: 'At Risk',
    conditionalUnconditional: 'Conditional',
  },
  {
    id: 3,
    sector: 'Energy',
    icon: <Zap className="h-5 w-5 text-yellow-500" />,
    targetType: 'Mitigation',
    baseYear: 2018,
    targetYear: 2030,
    baselineEmissions: 3.2,
    targetEmissions: 2.24,
    currentEmissions: 2.6,
    reductionPercent: 30,
    status: 'On Track',
    conditionalUnconditional: 'Unconditional',
  },
  {
    id: 4,
    sector: 'Transport',
    icon: <Truck className="h-5 w-5 text-blue-500" />,
    targetType: 'Mitigation',
    baseYear: 2018,
    targetYear: 2030,
    baselineEmissions: 2.1,
    targetEmissions: 1.68,
    currentEmissions: 2.0,
    reductionPercent: 20,
    status: 'At Risk',
    conditionalUnconditional: 'Conditional',
  },
  {
    id: 5,
    sector: 'Industry',
    icon: <Factory className="h-5 w-5 text-gray-500" />,
    targetType: 'Mitigation',
    baseYear: 2018,
    targetYear: 2030,
    baselineEmissions: 1.8,
    targetEmissions: 1.44,
    currentEmissions: 1.55,
    reductionPercent: 20,
    status: 'On Track',
    conditionalUnconditional: 'Unconditional',
  },
  {
    id: 6,
    sector: 'Waste',
    icon: <Trash2 className="h-5 w-5 text-orange-500" />,
    targetType: 'Mitigation',
    baseYear: 2018,
    targetYear: 2030,
    baselineEmissions: 1.5,
    targetEmissions: 1.2,
    currentEmissions: 1.35,
    reductionPercent: 20,
    status: 'On Track',
    conditionalUnconditional: 'Unconditional',
  },
];

const totalBaseline = targets.reduce((sum, t) => sum + t.baselineEmissions, 0);
const totalTarget = targets.reduce((sum, t) => sum + t.targetEmissions, 0);
const totalCurrent = targets.reduce((sum, t) => sum + t.currentEmissions, 0);
const overallReduction = ((totalBaseline - totalTarget) / totalBaseline) * 100;
const currentProgress = ((totalBaseline - totalCurrent) / (totalBaseline - totalTarget)) * 100;

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    'On Track': {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      icon: <CheckCircle className="h-3.5 w-3.5" />,
    },
    'At Risk': {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-700',
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
    },
    'Off Track': {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-700',
      icon: <XCircle className="h-3.5 w-3.5" />,
    },
  };
  const c = config[status] || config['At Risk'];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${c.bg} ${c.text}`}
    >
      {c.icon}
      {status}
    </span>
  );
}

export default function NDCTargetsPage() {
  const [filterType, setFilterType] = useState<string>('All');

  const filtered =
    filterType === 'All'
      ? targets
      : targets.filter((t) => t.conditionalUnconditional === filterType);

  const onTrackCount = targets.filter((t) => t.status === 'On Track').length;
  const atRiskCount = targets.filter((t) => t.status === 'At Risk').length;
  const offTrackCount = targets.filter((t) => t.status === 'Off Track').length;

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
              <Target className="h-6 w-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                NDC Targets Dashboard
              </h1>
            </div>
          </div>
          <p className="text-gray-500 ml-8 text-sm">
            Democratic Republic of Congo - Nationally Determined Contribution
            Targets under the Paris Agreement
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Overall NDC Progress Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">
                DRC NDC 2030 Target
              </p>
              <h2 className="text-4xl font-bold">
                {overallReduction.toFixed(0)}% Emission Reduction
              </h2>
              <p className="text-emerald-200 text-sm max-w-lg">
                Compared to 2018 baseline of {totalBaseline.toFixed(1)} MtCO2e.
                DRC&apos;s NDC is heavily driven by the LULUCF/Forestry sector,
                which accounts for ~79% of national emissions. Conditional on
                international finance and technology transfer.
              </p>
            </div>
            <div className="lg:w-80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-100">Overall Progress</span>
                <span className="font-semibold">
                  {currentProgress.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-emerald-900/40 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-white rounded-full h-4 transition-all duration-700"
                  style={{ width: `${Math.min(currentProgress, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-emerald-200">
                <span>Current: {totalCurrent.toFixed(1)} MtCO2e</span>
                <span>Target: {totalTarget.toFixed(1)} MtCO2e</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Total Sectors
            </p>
            <p className="text-3xl font-bold text-gray-900">{targets.length}</p>
            <p className="text-sm text-gray-500 mt-1">Tracked under NDC</p>
          </div>
          <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">
              On Track
            </p>
            <p className="text-3xl font-bold text-emerald-700">
              {onTrackCount}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Sectors meeting trajectory
            </p>
          </div>
          <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">
              At Risk
            </p>
            <p className="text-3xl font-bold text-amber-700">{atRiskCount}</p>
            <p className="text-sm text-gray-500 mt-1">
              Sectors needing attention
            </p>
          </div>
          <div className="bg-white rounded-xl border border-red-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-red-600 uppercase tracking-wider mb-1">
              Off Track
            </p>
            <p className="text-3xl font-bold text-red-700">{offTrackCount}</p>
            <p className="text-sm text-gray-500 mt-1">
              Sectors behind schedule
            </p>
          </div>
        </div>

        {/* Targets Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Sectoral Targets
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter:</span>
              {['All', 'Unconditional', 'Conditional'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    filterType === f
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Base Year
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Target Year
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Baseline (MtCO2e)
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Target (MtCO2e)
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Current (MtCO2e)
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Reduction %
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Scope
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((target) => {
                  const progress =
                    ((target.baselineEmissions - target.currentEmissions) /
                      (target.baselineEmissions - target.targetEmissions)) *
                    100;
                  return (
                    <tr
                      key={target.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          {target.icon}
                          <span className="font-medium text-gray-900">
                            {target.sector}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 border border-blue-200">
                          {target.targetType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {target.baseYear}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {target.targetYear}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-900">
                        {target.baselineEmissions.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-900">
                        {target.targetEmissions.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-900">
                        {target.currentEmissions.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {progress >= 60 ? (
                            <TrendingDown className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-amber-500" />
                          )}
                          <span className="font-medium text-gray-900">
                            {target.reductionPercent}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-medium ${
                            target.conditionalUnconditional === 'Unconditional'
                              ? 'text-emerald-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {target.conditionalUnconditional}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={target.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Forest Sector Dominance Note */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Trees className="h-6 w-6 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-emerald-800 mb-1">
                LULUCF / Forestry Sector Dominance
              </h4>
              <p className="text-sm text-emerald-700 leading-relaxed">
                DRC holds the world&apos;s second-largest tropical rainforest,
                covering approximately 155 million hectares. The LULUCF sector
                accounts for approximately{' '}
                <span className="font-semibold">
                  {((200.5 / totalBaseline) * 100).toFixed(0)}%
                </span>{' '}
                of national GHG emissions ({200.5} MtCO2e from a total of{' '}
                {totalBaseline.toFixed(1)} MtCO2e). Achieving the NDC target is
                critically dependent on reducing deforestation and forest
                degradation through REDD+ programmes, sustainable agriculture,
                and strengthened governance of forest resources. The conditional
                target requires an estimated $21.6 billion in international
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
