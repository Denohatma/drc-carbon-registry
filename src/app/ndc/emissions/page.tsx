'use client';

import { useState } from 'react';
import {
  BarChart3,
  ArrowLeft,
  Info,
  Download,
  TrendingUp,
  Leaf,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const sectorData = [
  { name: 'LULUCF / Forestry', value: 200.5, color: '#059669' },
  { name: 'Agriculture', value: 45.0, color: '#d97706' },
  { name: 'Energy', value: 3.2, color: '#eab308' },
  { name: 'Transport', value: 2.1, color: '#3b82f6' },
  { name: 'Industry', value: 1.8, color: '#6b7280' },
  { name: 'Waste', value: 1.5, color: '#f97316' },
];

const totalEmissions = sectorData.reduce((sum, s) => sum + s.value, 0);

const gasByType = [
  { gas: 'CO2', emissions: 210.3, color: '#059669' },
  { gas: 'CH4', emissions: 32.8, color: '#3b82f6' },
  { gas: 'N2O', emissions: 10.5, color: '#f59e0b' },
  { gas: 'F-gases', emissions: 0.5, color: '#8b5cf6' },
];

interface YearlyRow {
  year: number;
  lulucf: number;
  agriculture: number;
  energy: number;
  transport: number;
  industry: number;
  waste: number;
  total: number;
}

const yearlyData: YearlyRow[] = [
  { year: 2018, lulucf: 200.5, agriculture: 45.0, energy: 3.2, transport: 2.1, industry: 1.8, waste: 1.5, total: 254.1 },
  { year: 2019, lulucf: 205.2, agriculture: 45.8, energy: 3.3, transport: 2.2, industry: 1.9, waste: 1.5, total: 259.9 },
  { year: 2020, lulucf: 198.7, agriculture: 44.2, energy: 3.0, transport: 1.9, industry: 1.7, waste: 1.5, total: 251.0 },
  { year: 2021, lulucf: 195.3, agriculture: 43.8, energy: 3.1, transport: 2.0, industry: 1.7, waste: 1.4, total: 247.3 },
  { year: 2022, lulucf: 190.1, agriculture: 43.2, energy: 2.9, transport: 2.0, industry: 1.6, waste: 1.4, total: 241.2 },
  { year: 2023, lulucf: 185.6, agriculture: 42.7, energy: 2.8, transport: 2.0, industry: 1.6, waste: 1.4, total: 236.1 },
  { year: 2024, lulucf: 181.2, agriculture: 42.3, energy: 2.7, transport: 2.0, industry: 1.6, waste: 1.3, total: 231.1 },
  { year: 2025, lulucf: 178.3, agriculture: 42.1, energy: 2.6, transport: 2.0, industry: 1.55, waste: 1.35, total: 227.9 },
];

const RADIAN = Math.PI / 180;
function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.02) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function EmissionsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

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
              <BarChart3 className="h-6 w-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                GHG Emissions Inventory
              </h1>
            </div>
          </div>
          <p className="text-gray-500 ml-8 text-sm">
            National greenhouse gas emissions data for the Democratic Republic
            of Congo
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-4 w-4 text-emerald-600" />
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Emissions (2025)
              </p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {yearlyData[yearlyData.length - 1].total.toFixed(1)}
            </p>
            <p className="text-sm text-gray-500 mt-1">MtCO2e</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change Since 2018
              </p>
            </div>
            <p className="text-3xl font-bold text-emerald-600">
              -
              {(
                ((yearlyData[0].total -
                  yearlyData[yearlyData.length - 1].total) /
                  yearlyData[0].total) *
                100
              ).toFixed(1)}
              %
            </p>
            <p className="text-sm text-gray-500 mt-1">Reduction achieved</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Dominant Sector
            </p>
            <p className="text-xl font-bold text-gray-900">
              LULUCF / Forestry
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {((200.5 / totalEmissions) * 100).toFixed(0)}% of total emissions
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Methodology
            </p>
            <p className="text-sm font-semibold text-gray-900">
              IPCC 2006 Guidelines
            </p>
            <p className="text-sm text-gray-500 mt-1">2019 Refinement</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart - Emissions by Sector */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Emissions by Sector (2018 Baseline)
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={130}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toFixed(1)} MtCO2e`,
                    'Emissions',
                  ]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value: string) => (
                    <span className="text-sm text-gray-700">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Emissions by Gas */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Emissions by Gas Type (MtCO2e)
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={gasByType}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="gas" tick={{ fontSize: 13 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toFixed(1)} MtCO2e`,
                    'Emissions',
                  ]}
                />
                <Bar dataKey="emissions" radius={[6, 6, 0, 0]}>
                  {gasByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yearly Emissions Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Annual GHG Emissions (MtCO2e)
            </h3>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    LULUCF
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Agriculture
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Energy
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Transport
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Waste
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-emerald-700 uppercase tracking-wider text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {yearlyData.map((row) => (
                  <tr
                    key={row.year}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedYear === row.year ? 'bg-emerald-50' : ''
                    }`}
                    onClick={() =>
                      setSelectedYear(
                        selectedYear === row.year ? null : row.year
                      )
                    }
                  >
                    <td className="px-6 py-3.5 font-medium text-gray-900">
                      {row.year}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-gray-700">
                      {row.lulucf.toFixed(1)}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-gray-700">
                      {row.agriculture.toFixed(1)}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-gray-700">
                      {row.energy.toFixed(1)}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-gray-700">
                      {row.transport.toFixed(1)}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-gray-700">
                      {row.industry.toFixed(1)}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono text-gray-700">
                      {row.waste.toFixed(1)}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono font-semibold text-emerald-700">
                      {row.total.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Methodology Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">
                Data Alignment &amp; Methodology
              </h4>
              <p className="text-sm text-blue-700 leading-relaxed">
                Emissions data is aligned with the{' '}
                <span className="font-semibold">
                  IPCC 2006 Guidelines for National Greenhouse Gas Inventories
                </span>{' '}
                and the{' '}
                <span className="font-semibold">2019 Refinement</span>. Sectoral
                categorization follows UNFCCC reporting requirements. LULUCF
                emissions include deforestation, forest degradation, and
                peatland conversion. Agriculture emissions cover enteric
                fermentation, manure management, rice cultivation, and soil
                emissions. GWP values use AR5 100-year time horizon (CO2=1,
                CH4=28, N2O=265). Data sources include national forest
                monitoring (Terra Congo), FAOSTAT, and IEA energy balances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
