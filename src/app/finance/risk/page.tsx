"use client";

import { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Calendar,
  FileWarning,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RiskLevel = "Low" | "Medium" | "High" | "Critical";

type RiskType =
  | "Permanence"
  | "Additionality"
  | "Leakage"
  | "Land Rights"
  | "Community Consent"
  | "Double Counting";

interface AssetRisk {
  asset: string;
  risks: Record<RiskType, RiskLevel>;
}

interface DetailedAssessment {
  asset: string;
  assessmentDate: string;
  overallRisk: RiskLevel;
  keyFlags: string[];
  notes: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const RISK_TYPES: RiskType[] = [
  "Permanence",
  "Additionality",
  "Leakage",
  "Land Rights",
  "Community Consent",
  "Double Counting",
];

const HEAT_MAP_DATA: AssetRisk[] = [
  {
    asset: "Mai-Ndombe REDD+",
    risks: {
      Permanence: "Low",
      Additionality: "Low",
      Leakage: "Medium",
      "Land Rights": "Medium",
      "Community Consent": "Low",
      "Double Counting": "Low",
    },
  },
  {
    asset: "Equateur Forest Conservation",
    risks: {
      Permanence: "Low",
      Additionality: "Medium",
      Leakage: "Medium",
      "Land Rights": "High",
      "Community Consent": "Medium",
      "Double Counting": "Low",
    },
  },
  {
    asset: "Virunga Reforestation",
    risks: {
      Permanence: "Low",
      Additionality: "Low",
      Leakage: "Low",
      "Land Rights": "Low",
      "Community Consent": "Low",
      "Double Counting": "Low",
    },
  },
  {
    asset: "Sud-Kivu Cookstoves",
    risks: {
      Permanence: "Medium",
      Additionality: "High",
      Leakage: "Low",
      "Land Rights": "Medium",
      "Community Consent": "Medium",
      "Double Counting": "Low",
    },
  },
  {
    asset: "Tshopo Sustainable Forestry",
    risks: {
      Permanence: "Medium",
      Additionality: "Medium",
      Leakage: "High",
      "Land Rights": "Critical",
      "Community Consent": "High",
      "Double Counting": "Medium",
    },
  },
];

const PIE_DATA = [
  { name: "Low", value: 45 },
  { name: "Medium", value: 30 },
  { name: "High", value: 18 },
  { name: "Critical", value: 7 },
];

const PIE_COLORS: Record<string, string> = {
  Low: "#16a34a",
  Medium: "#d97706",
  High: "#dc2626",
  Critical: "#991b1b",
};

const DETAILED_ASSESSMENTS: DetailedAssessment[] = [
  {
    asset: "Mai-Ndombe REDD+",
    assessmentDate: "2026-06-15",
    overallRisk: "Low",
    keyFlags: ["Leakage displacement monitoring required", "Overlapping community land claims in southern zone"],
    notes:
      "Strong baseline established with remote sensing. Land tenure disputes in 2 of 14 groupements resolved through participatory mapping. FPIC protocols documented and verified by third-party auditor.",
  },
  {
    asset: "Equateur Forest Conservation",
    assessmentDate: "2026-05-28",
    overallRisk: "Medium",
    keyFlags: [
      "Customary land rights not fully formalized",
      "Artisanal logging leakage detected in buffer zone",
    ],
    notes:
      "Province-level land registry incomplete -- customary tenure overlaps with 3 concession boundaries. Community engagement ongoing but consent documentation gaps remain in remote villages. Additionality demonstration weakened by delayed government deforestation moratorium.",
  },
  {
    asset: "Virunga Reforestation",
    assessmentDate: "2026-06-02",
    overallRisk: "Low",
    keyFlags: ["Conflict zone proximity requires periodic security review"],
    notes:
      "Well-managed project with strong institutional backing from Virunga Foundation. All land parcels formally titled. Community benefit-sharing agreements in place with 8 cooperatives. Low overall risk despite eastern DRC security context -- project area currently stable.",
  },
  {
    asset: "Sud-Kivu Cookstoves",
    assessmentDate: "2026-05-10",
    overallRisk: "Medium",
    keyFlags: [
      "Additionality challenge: competing subsidized stove programs",
      "Displacement monitoring gaps in IDP settlements",
    ],
    notes:
      "Additionality weakened by World Bank and GIZ parallel cookstove distribution in overlapping communes. FPIC complicated by displacement of communities due to M23 conflict. Land rights flagged for distribution centers built on disputed parcels near Bukavu.",
  },
  {
    asset: "Tshopo Sustainable Forestry",
    assessmentDate: "2026-04-22",
    overallRisk: "High",
    keyFlags: [
      "Critical: unresolved indigenous Mbuti land claims",
      "High leakage to adjacent unprotected concessions",
      "Community consent process incomplete for 4 of 9 clans",
    ],
    notes:
      "Multiple overlapping claims between Mbuti indigenous communities, Bantu farming settlements, and a logging concession holder. Provincial cadaster records conflict with national registry. Leakage to adjacent SODEFOR concessions is substantial and unmitigated. Double-counting risk elevated due to parallel VCS and national registry listings under review.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const RISK_CELL_STYLES: Record<RiskLevel, string> = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-amber-100 text-amber-800",
  High: "bg-red-100 text-red-800",
  Critical: "bg-red-200 text-red-900 font-bold",
};

const RISK_BADGE_STYLES: Record<RiskLevel, string> = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-amber-100 text-amber-800",
  High: "bg-red-100 text-red-800",
  Critical: "bg-red-200 text-red-900",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RiskAssessmentPage() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (asset: string) => {
    setExpandedRow((prev) => (prev === asset ? null : asset));
  };

  // Count risk levels across heat map
  const riskCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
  HEAT_MAP_DATA.forEach((row) => {
    RISK_TYPES.forEach((type) => {
      riskCounts[row.risks[type]]++;
    });
  });
  const totalRisks = Object.values(riskCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-7 w-7 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Risk Assessment
          </h1>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Comprehensive risk analysis across DRC carbon credit assets covering
          permanence, additionality, leakage, land rights, community consent,
          and double counting dimensions.
        </p>

        {/* Summary cards */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(["Low", "Medium", "High", "Critical"] as RiskLevel[]).map(
            (level) => (
              <div
                key={level}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-gray-500">{level} Risk</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 tabular-nums">
                  {riskCounts[level]}
                </p>
                <p className="text-xs text-gray-400">
                  of {totalRisks} assessments
                </p>
              </div>
            )
          )}
        </div>

        {/* Risk Heat Map */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Risk Heat Map
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Risk levels by asset and risk category
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-emerald-700">
                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Asset
                    </th>
                    {RISK_TYPES.map((type) => (
                      <th
                        key={type}
                        className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white"
                      >
                        {type}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {HEAT_MAP_DATA.map((row) => (
                    <tr key={row.asset} className="hover:bg-gray-50/50 transition-colors">
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                        {row.asset}
                      </td>
                      {RISK_TYPES.map((type) => {
                        const level = row.risks[type];
                        return (
                          <td
                            key={type}
                            className="px-4 py-3 text-center text-sm"
                          >
                            <span
                              className={`inline-block rounded px-3 py-1 text-xs font-semibold ${RISK_CELL_STYLES[level]}`}
                            >
                              {level}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Overall Risk Distribution */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Overall Risk Distribution
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Portfolio-wide risk breakdown across all assessed dimensions
            </p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {PIE_DATA.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={PIE_COLORS[entry.name]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "13px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{ fontSize: "13px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk legend / guidance */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Risk Level Definitions
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Classification criteria for DRC carbon asset risk ratings
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-block h-3 w-3 flex-shrink-0 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Low</p>
                  <p className="text-sm text-gray-500">
                    Risk is well-managed with documented mitigation measures.
                    No material impact expected on credit integrity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-block h-3 w-3 flex-shrink-0 rounded-full bg-amber-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Medium</p>
                  <p className="text-sm text-gray-500">
                    Risk identified with partial mitigation. Monitoring and
                    additional safeguards recommended within 6 months.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-block h-3 w-3 flex-shrink-0 rounded-full bg-red-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">High</p>
                  <p className="text-sm text-gray-500">
                    Significant unmitigated risk that could affect credit
                    issuance or validity. Immediate action plan required.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-block h-3 w-3 flex-shrink-0 rounded-full bg-red-900" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Critical</p>
                  <p className="text-sm text-gray-500">
                    Fundamental integrity concern. Credit issuance should be
                    suspended until resolution. May require independent
                    investigation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Risk Table */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Detailed Risk Assessments
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Per-asset assessment with key flags and analyst notes
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-emerald-700">
                    <th className="w-8 px-4 py-3" />
                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Asset
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Assessment Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Overall Risk
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Key Flags
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {DETAILED_ASSESSMENTS.map((row) => {
                    const isExpanded = expandedRow === row.asset;
                    return (
                      <tr
                        key={row.asset}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => toggleRow(row.asset)}
                      >
                        <td className="px-4 py-3 text-gray-400">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                          {row.asset}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {row.assessmentDate}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${RISK_BADGE_STYLES[row.overallRisk]}`}
                          >
                            {row.overallRisk}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {isExpanded ? (
                            <ul className="list-disc space-y-1 pl-4">
                              {row.keyFlags.map((flag, i) => (
                                <li key={i} className="text-sm text-gray-700">
                                  {flag}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="inline-flex items-center gap-1.5">
                              <FileWarning className="h-3.5 w-3.5 text-amber-500" />
                              {row.keyFlags.length} flag
                              {row.keyFlags.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {isExpanded ? (
                            <p className="max-w-md text-sm leading-relaxed text-gray-700">
                              {row.notes}
                            </p>
                          ) : (
                            <span className="text-gray-400">
                              Click to expand
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Methodology note */}
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                Assessment Methodology
              </p>
              <p className="mt-1 text-sm text-amber-700">
                Risk assessments follow the DRC National Carbon Registry
                framework aligned with Verra VCS and Gold Standard safeguard
                requirements. Land rights evaluations incorporate provincial
                cadaster records, customary tenure mapping, and FPIC
                documentation. Assessments are updated quarterly or upon
                material change in project circumstances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
