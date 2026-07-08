'use client';

import {
  Leaf,
  TreePine,
  Mountain,
  Layers,
  TrendingUp,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const carbonSummary = [
  {
    label: 'Total Carbon Stock',
    value: '1,247,850',
    unit: 'tCO2e',
    change: '+2.3%',
    positive: true,
    icon: Leaf,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Above-Ground Biomass',
    value: '612,430',
    unit: 'tCO2e',
    change: '+1.8%',
    positive: true,
    icon: TreePine,
    color: 'bg-green-100 text-green-700',
  },
  {
    label: 'Below-Ground Biomass',
    value: '198,740',
    unit: 'tCO2e',
    change: '+0.9%',
    positive: true,
    icon: Mountain,
    color: 'bg-teal-100 text-teal-700',
  },
  {
    label: 'Soil Organic Carbon',
    value: '436,680',
    unit: 'tCO2e',
    change: '-0.4%',
    positive: false,
    icon: Layers,
    color: 'bg-amber-100 text-amber-700',
  },
];

const carbonPoolsData = [
  {
    project: 'Mai-Ndombe REDD+',
    AGB: 185400,
    BGB: 62300,
    Deadwood: 18500,
    Litter: 7200,
    Soil: 142600,
  },
  {
    project: 'Equateur Reserve',
    AGB: 142800,
    BGB: 47100,
    Deadwood: 14200,
    Litter: 5800,
    Soil: 98400,
  },
  {
    project: 'Tshopo Community',
    AGB: 118600,
    BGB: 38900,
    Deadwood: 11500,
    Litter: 4600,
    Soil: 82300,
  },
  {
    project: 'Kahuzi-Biega',
    AGB: 92400,
    BGB: 28700,
    Deadwood: 9800,
    Litter: 3400,
    Soil: 68200,
  },
  {
    project: 'Lac Tumba',
    AGB: 73230,
    BGB: 21740,
    Deadwood: 7600,
    Litter: 2900,
    Soil: 45180,
  },
];

const assessmentHistory = [
  {
    id: 'CSA-001',
    date: '2026-06-15',
    project: 'Mai-Ndombe REDD+ Landscape',
    totalCarbon: 416000,
    methodology: 'IPCC Tier 3',
    confidence: 95.2,
    assessor: 'DIAF / WRI',
  },
  {
    id: 'CSA-002',
    date: '2026-05-22',
    project: 'Equateur Forest Reserve',
    totalCarbon: 308300,
    methodology: 'IPCC Tier 2',
    confidence: 89.8,
    assessor: 'OSFAC',
  },
  {
    id: 'CSA-003',
    date: '2026-04-10',
    project: 'Tshopo Community Forest',
    totalCarbon: 255900,
    methodology: 'IPCC Tier 2',
    confidence: 87.5,
    assessor: 'UCL / OSFAC',
  },
  {
    id: 'CSA-004',
    date: '2026-03-28',
    project: 'Kahuzi-Biega Buffer Zone',
    totalCarbon: 202500,
    methodology: 'IPCC Tier 3',
    confidence: 93.1,
    assessor: 'WCS / ICCN',
  },
  {
    id: 'CSA-005',
    date: '2026-02-14',
    project: 'Lac Tumba Wetlands',
    totalCarbon: 150650,
    methodology: 'IPCC Tier 1',
    confidence: 78.4,
    assessor: 'WWF DRC',
  },
  {
    id: 'CSA-006',
    date: '2025-12-18',
    project: 'Salonga North Corridor',
    totalCarbon: 187200,
    methodology: 'IPCC Tier 2',
    confidence: 85.6,
    assessor: 'WCS',
  },
  {
    id: 'CSA-007',
    date: '2025-10-05',
    project: 'Okapi Wildlife Periphery',
    totalCarbon: 134800,
    methodology: 'IPCC Tier 1',
    confidence: 76.2,
    assessor: 'WCS / Gilman',
  },
  {
    id: 'CSA-008',
    date: '2025-08-22',
    project: 'Itombwe Massif Conservation',
    totalCarbon: 112400,
    methodology: 'IPCC Tier 2',
    confidence: 88.3,
    assessor: 'WCS',
  },
  {
    id: 'CSA-009',
    date: '2025-06-30',
    project: 'Bolobo Agroforestry Corridor',
    totalCarbon: 68500,
    methodology: 'IPCC Tier 1',
    confidence: 74.9,
    assessor: 'CODELT',
  },
  {
    id: 'CSA-010',
    date: '2025-05-11',
    project: 'Mongala River Basin',
    totalCarbon: 92300,
    methodology: 'IPCC Tier 2',
    confidence: 82.1,
    assessor: 'OSFAC',
  },
];

const carbonTrendData = [
  { year: '2018', total: 1185000, AGB: 578000, soil: 412000 },
  { year: '2019', total: 1198000, AGB: 584000, soil: 418000 },
  { year: '2020', total: 1210000, AGB: 591000, soil: 422000 },
  { year: '2021', total: 1215000, AGB: 594000, soil: 425000 },
  { year: '2022', total: 1225000, AGB: 600000, soil: 428000 },
  { year: '2023', total: 1232000, AGB: 604000, soil: 431000 },
  { year: '2024', total: 1238000, AGB: 607000, soil: 434000 },
  { year: '2025', total: 1242000, AGB: 610000, soil: 435000 },
  { year: '2026', total: 1247850, AGB: 612430, soil: 436680 },
];

const methodologyColors: Record<string, string> = {
  'IPCC Tier 1': 'bg-gray-100 text-gray-700',
  'IPCC Tier 2': 'bg-blue-100 text-blue-700',
  'IPCC Tier 3': 'bg-emerald-100 text-emerald-700',
};

export default function CarbonStocksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-700 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Carbon Stock Assessments</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                MRV Module &mdash; Forest carbon pool quantification and monitoring
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {carbonSummary.map((card) => {
            const Icon = card.icon;
            const ChangeIcon = card.positive ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={card.label}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${card.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div
                    className={`flex items-center gap-0.5 text-xs font-semibold ${
                      card.positive ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    <ChangeIcon className="h-3.5 w-3.5" />
                    {card.change}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">
                  {card.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">{card.unit}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carbon Pools Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Carbon Pools by Project
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Stacked breakdown: AGB, BGB, Deadwood, Litter, Soil (tCO2e)
              </p>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={360}>
                <BarChart
                  data={carbonPoolsData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    dataKey="project"
                    type="category"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                    width={120}
                  />
                  <Tooltip
                    formatter={(value) => `${Number(value).toLocaleString()} tCO2e`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
                  />
                  <Bar dataKey="AGB" stackId="a" fill="#16a34a" name="Above-Ground" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="BGB" stackId="a" fill="#15803d" name="Below-Ground" />
                  <Bar dataKey="Deadwood" stackId="a" fill="#a16207" name="Deadwood" />
                  <Bar dataKey="Litter" stackId="a" fill="#ca8a04" name="Litter" />
                  <Bar dataKey="Soil" stackId="a" fill="#78716c" name="Soil Carbon" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Carbon Stock Trend */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <h2 className="text-base font-semibold text-gray-900">
                  Carbon Stock Trend
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Total carbon, AGB, and soil carbon over monitoring period (tCO2e)
              </p>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={360}>
                <LineChart
                  data={carbonTrendData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(2)}M`}
                  />
                  <Tooltip
                    formatter={(value) => `${Number(value).toLocaleString()} tCO2e`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#059669"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#059669' }}
                    name="Total Carbon"
                  />
                  <Line
                    type="monotone"
                    dataKey="AGB"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#16a34a' }}
                    strokeDasharray="6 3"
                    name="Above-Ground Biomass"
                  />
                  <Line
                    type="monotone"
                    dataKey="soil"
                    stroke="#78716c"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#78716c' }}
                    strokeDasharray="3 3"
                    name="Soil Carbon"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Assessment History Table */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-emerald-600" />
            <h2 className="text-base font-semibold text-gray-900">Assessment History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Project</th>
                  <th className="px-5 py-3 font-medium text-right">Total Carbon (tCO2e)</th>
                  <th className="px-5 py-3 font-medium text-center">Methodology</th>
                  <th className="px-5 py-3 font-medium text-center">Confidence (%)</th>
                  <th className="px-5 py-3 font-medium">Assessor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {assessmentHistory.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">
                      {assessment.id}
                    </td>
                    <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                      {assessment.date}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {assessment.project}
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-gray-700">
                      {assessment.totalCarbon.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${methodologyColors[assessment.methodology] || 'bg-gray-100 text-gray-700'}`}
                      >
                        {assessment.methodology}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              assessment.confidence >= 90
                                ? 'bg-emerald-500'
                                : assessment.confidence >= 80
                                  ? 'bg-blue-500'
                                  : 'bg-amber-500'
                            }`}
                            style={{ width: `${assessment.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 font-mono">
                          {assessment.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{assessment.assessor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
