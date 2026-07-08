'use client';

import {
  ArrowLeft,
  Activity,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  AlertTriangle,
  Milestone,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const sectorProgress = [
  { sector: 'LULUCF', target: 40.1, current: 22.2 },
  { sector: 'Agriculture', target: 6.75, current: 2.9 },
  { sector: 'Energy', target: 0.96, current: 0.6 },
  { sector: 'Transport', target: 0.42, current: 0.1 },
  { sector: 'Industry', target: 0.36, current: 0.25 },
  { sector: 'Waste', target: 0.3, current: 0.15 },
];

const totalTargetReduction = sectorProgress.reduce(
  (s, r) => s + r.target,
  0
);
const totalCurrentReduction = sectorProgress.reduce(
  (s, r) => s + r.current,
  0
);
const overallPct = (totalCurrentReduction / totalTargetReduction) * 100;

interface Submission {
  id: number;
  title: string;
  type: string;
  submittedDate: string;
  status: 'Submitted' | 'In Preparation' | 'Planned';
  notes: string;
}

const submissions: Submission[] = [
  {
    id: 1,
    title: 'Initial National Communication (INC)',
    type: 'NC',
    submittedDate: 'October 2000',
    status: 'Submitted',
    notes: 'First GHG inventory (1994 base year)',
  },
  {
    id: 2,
    title: 'Second National Communication (SNC)',
    type: 'NC',
    submittedDate: 'December 2009',
    status: 'Submitted',
    notes: 'Updated inventory and vulnerability assessment',
  },
  {
    id: 3,
    title: 'Third National Communication (TNC)',
    type: 'NC',
    submittedDate: 'November 2015',
    status: 'Submitted',
    notes: 'Comprehensive inventory with 2000 base year',
  },
  {
    id: 4,
    title: 'NDC (First)',
    type: 'NDC',
    submittedDate: 'September 2015',
    status: 'Submitted',
    notes: 'INDC converted to NDC upon Paris Agreement ratification',
  },
  {
    id: 5,
    title: 'NDC (Updated)',
    type: 'NDC',
    submittedDate: 'December 2021',
    status: 'Submitted',
    notes: 'Enhanced ambition: 21% reduction target, conditional',
  },
  {
    id: 6,
    title: 'First Biennial Update Report (BUR1)',
    type: 'BUR',
    submittedDate: 'December 2019',
    status: 'Submitted',
    notes: 'GHG inventory update with 2014 data',
  },
  {
    id: 7,
    title: 'Second Biennial Update Report (BUR2)',
    type: 'BUR',
    submittedDate: 'November 2022',
    status: 'Submitted',
    notes: 'Updated FREL and mitigation actions progress',
  },
  {
    id: 8,
    title: 'Fourth National Communication (4NC)',
    type: 'NC',
    submittedDate: 'Expected 2025',
    status: 'In Preparation',
    notes: 'Aligned with enhanced transparency framework',
  },
  {
    id: 9,
    title: 'First Biennial Transparency Report (BTR1)',
    type: 'BTR',
    submittedDate: 'Due December 2024',
    status: 'In Preparation',
    notes: 'Under Art. 13 of Paris Agreement (ETF)',
  },
  {
    id: 10,
    title: 'NDC (Third)',
    type: 'NDC',
    submittedDate: 'Due February 2025',
    status: 'Planned',
    notes: 'NDC 3.0 with 2035 target under Global Stocktake',
  },
];

interface MilestoneItem {
  id: number;
  date: string;
  title: string;
  description: string;
  completed: boolean;
}

const milestones: MilestoneItem[] = [
  {
    id: 1,
    date: 'Sep 2015',
    title: 'INDC Submission',
    description:
      'DRC submitted its Intended NDC ahead of COP21 in Paris',
    completed: true,
  },
  {
    id: 2,
    date: 'Dec 2016',
    title: 'Paris Agreement Ratification',
    description:
      'DRC ratified the Paris Agreement, INDC becomes first NDC',
    completed: true,
  },
  {
    id: 3,
    date: 'Nov 2018',
    title: 'REDD+ Mai-Ndombe Launch',
    description:
      'Jurisdictional REDD+ programme launched in Mai-Ndombe province',
    completed: true,
  },
  {
    id: 4,
    date: 'Dec 2019',
    title: 'BUR1 Submitted',
    description:
      'First Biennial Update Report submitted to UNFCCC',
    completed: true,
  },
  {
    id: 5,
    date: 'Dec 2021',
    title: 'Updated NDC Submitted',
    description:
      'Enhanced NDC with 21% reduction target submitted at COP26',
    completed: true,
  },
  {
    id: 6,
    date: 'Nov 2022',
    title: 'BUR2 Submitted',
    description:
      'Second Biennial Update Report with updated GHG data',
    completed: true,
  },
  {
    id: 7,
    date: 'Jun 2024',
    title: 'Carbon Registry Launched',
    description:
      'National carbon registry system operationalized for project tracking',
    completed: true,
  },
  {
    id: 8,
    date: 'Dec 2024',
    title: 'BTR1 Due',
    description:
      'First Biennial Transparency Report under Enhanced Transparency Framework',
    completed: false,
  },
  {
    id: 9,
    date: 'Feb 2025',
    title: 'NDC 3.0 Submission',
    description:
      'Third NDC with 2035 targets informed by Global Stocktake',
    completed: false,
  },
  {
    id: 10,
    date: '2030',
    title: 'NDC Target Year',
    description:
      'Assessment of 21% emission reduction target achievement',
    completed: false,
  },
];

function SubmissionStatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    Submitted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'In Preparation': 'bg-amber-50 text-amber-700 border-amber-200',
    Planned: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${config[status] || config['Planned']}`}
    >
      {status}
    </span>
  );
}

export default function ProgressPage() {
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
              <Activity className="h-6 w-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                NDC Progress Tracking
              </h1>
            </div>
          </div>
          <p className="text-gray-500 ml-8 text-sm">
            Monitoring DRC&apos;s progress toward NDC commitments under the
            Paris Agreement
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Overall Progress Gauge */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Gauge Visual */}
            <div className="flex flex-col items-center lg:w-64 shrink-0">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  {/* Background arc */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    strokeDasharray="235.6 78.5"
                    strokeDashoffset="-39.3"
                    strokeLinecap="round"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="12"
                    strokeDasharray={`${(overallPct / 100) * 235.6} ${314.16 - (overallPct / 100) * 235.6}`}
                    strokeDashoffset="-39.3"
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {overallPct.toFixed(0)}%
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Overall Progress
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  NDC Implementation Progress
                </h3>
                <p className="text-sm text-gray-500">
                  DRC has achieved{' '}
                  <span className="font-semibold text-emerald-600">
                    {totalCurrentReduction.toFixed(1)} MtCO2e
                  </span>{' '}
                  in emission reductions out of the targeted{' '}
                  <span className="font-semibold">
                    {totalTargetReduction.toFixed(1)} MtCO2e
                  </span>{' '}
                  by 2030. Progress is primarily driven by LULUCF interventions
                  including REDD+ and community forestry.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-0.5">
                    Target Reduction
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {totalTargetReduction.toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-400">MtCO2e</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-3">
                  <p className="text-xs text-emerald-600 mb-0.5">Achieved</p>
                  <p className="text-lg font-bold text-emerald-700">
                    {totalCurrentReduction.toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-400">MtCO2e</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="text-xs text-amber-600 mb-0.5">Remaining</p>
                  <p className="text-lg font-bold text-amber-700">
                    {(totalTargetReduction - totalCurrentReduction).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-400">MtCO2e</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-600 mb-0.5">
                    Years Remaining
                  </p>
                  <p className="text-lg font-bold text-blue-700">4</p>
                  <p className="text-xs text-gray-400">Until 2030</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sectoral Progress Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Progress by Sector (MtCO2e Reduction)
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Target reduction vs. achieved reduction by sector. The gap between
            bars shows remaining work needed.
          </p>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={sectorProgress}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} unit=" Mt" />
              <YAxis
                dataKey="sector"
                type="category"
                tick={{ fontSize: 13 }}
                width={80}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value.toFixed(2)} MtCO2e`,
                  name === 'target' ? 'Target Reduction' : 'Achieved Reduction',
                ]}
              />
              <Legend
                formatter={(value: string) =>
                  value === 'target' ? 'Target Reduction' : 'Achieved Reduction'
                }
              />
              <Bar
                dataKey="target"
                fill="#d1fae5"
                stroke="#059669"
                strokeWidth={1}
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="current"
                fill="#059669"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* UNFCCC Reporting Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  UNFCCC Submissions
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                National Communications, BURs, BTRs, and NDC submissions
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">
                      Report
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {submissions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2.5">
                        <div>
                          <p className="font-medium text-gray-900 text-xs">
                            {sub.title}
                          </p>
                          <p className="text-xs text-gray-400">{sub.notes}</p>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono font-medium text-gray-600">
                          {sub.type}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-gray-600 whitespace-nowrap">
                        {sub.submittedDate}
                      </td>
                      <td className="px-4 py-2.5">
                        <SubmissionStatusBadge status={sub.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Article 6 Status Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Article 6 Status
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                    Corresponding Adjustments
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-700">
                      Framework Under Development
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    DRC is developing its framework for corresponding
                    adjustments under Article 6.2 of the Paris Agreement. The
                    national carbon registry will serve as the infrastructure for
                    tracking ITMOs (Internationally Transferred Mitigation
                    Outcomes).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <p className="text-xs text-emerald-600 font-medium mb-1">
                      Art. 6.2 (Bilateral)
                    </p>
                    <p className="text-sm font-semibold text-emerald-800">
                      3 Letters of Intent
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Switzerland, Japan, Sweden
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 font-medium mb-1">
                      Art. 6.4 (Mechanism)
                    </p>
                    <p className="text-sm font-semibold text-blue-800">
                      Designated Authority
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Ministry of Environment
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                    ITMO Tracking Summary
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xl font-bold text-gray-900">12</p>
                      <p className="text-xs text-gray-500">
                        Projects Registered
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">4.2M</p>
                      <p className="text-xs text-gray-500">tCO2e Authorized</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">1.8M</p>
                      <p className="text-xs text-gray-500">
                        tCO2e Transferred
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Milestones Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Milestone className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Key Milestones
            </h3>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200" />

            <div className="space-y-6">
              {milestones.map((m) => (
                <div key={m.id} className="relative flex gap-4 pl-0">
                  {/* Dot */}
                  <div className="relative z-10 mt-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        m.completed
                          ? 'bg-emerald-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      {m.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 pb-2 ${
                      !m.completed ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit">
                        {m.date}
                      </span>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {m.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
