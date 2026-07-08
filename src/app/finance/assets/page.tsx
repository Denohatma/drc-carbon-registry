"use client";

import { Trees, BarChart3, Shield, ListChecks } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type IntegrityScore = "A" | "B" | "C" | "D" | "F";
type AssetStatus = "Active" | "Under Review" | "Pending";

interface CarbonAsset {
  id: string;
  name: string;
  projectType: string;
  location: string;
  province: string;
  areaHa: number | null;
  estimatedCredits: number;
  integrityScore: IntegrityScore;
  financeabilityScore: number;
  status: AssetStatus;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const ASSETS: CarbonAsset[] = [
  {
    id: "DRC-AST-001",
    name: "Mai-Ndombe REDD+",
    projectType: "REDD+",
    location: "Mai-Ndombe",
    province: "Mai-Ndombe",
    areaHa: 299_640,
    estimatedCredits: 3_890_000,
    integrityScore: "A",
    financeabilityScore: 92,
    status: "Active",
  },
  {
    id: "DRC-AST-002",
    name: "Equateur Forest Conservation",
    projectType: "REDD+",
    location: "Mbandaka",
    province: "Equateur",
    areaHa: 185_000,
    estimatedCredits: 1_250_000,
    integrityScore: "B",
    financeabilityScore: 78,
    status: "Active",
  },
  {
    id: "DRC-AST-003",
    name: "Virunga Reforestation",
    projectType: "ARR",
    location: "Virunga NP",
    province: "Nord-Kivu",
    areaHa: 12_500,
    estimatedCredits: 340_000,
    integrityScore: "A",
    financeabilityScore: 88,
    status: "Active",
  },
  {
    id: "DRC-AST-004",
    name: "Sud-Kivu Cookstoves",
    projectType: "IFM",
    location: "Bukavu",
    province: "Sud-Kivu",
    areaHa: null,
    estimatedCredits: 520_000,
    integrityScore: "B",
    financeabilityScore: 74,
    status: "Under Review",
  },
  {
    id: "DRC-AST-005",
    name: "Tshopo Sustainable Forestry",
    projectType: "IFM",
    location: "Kisangani",
    province: "Tshopo",
    areaHa: 45_000,
    estimatedCredits: 240_000,
    integrityScore: "C",
    financeabilityScore: 65,
    status: "Pending",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const INTEGRITY_COLORS: Record<IntegrityScore, string> = {
  A: "bg-emerald-100 text-emerald-800",
  B: "bg-blue-100 text-blue-800",
  C: "bg-amber-100 text-amber-800",
  D: "bg-orange-100 text-orange-800",
  F: "bg-red-100 text-red-800",
};

const STATUS_COLORS: Record<AssetStatus, string> = {
  Active: "bg-emerald-100 text-emerald-800",
  "Under Review": "bg-amber-100 text-amber-800",
  Pending: "bg-blue-100 text-blue-800",
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(2) + "M";
  }
  return n.toLocaleString("en-US");
}

function formatArea(ha: number | null): string {
  if (ha === null) return "N/A";
  return ha.toLocaleString("en-US") + " ha";
}

// ---------------------------------------------------------------------------
// Summary cards data
// ---------------------------------------------------------------------------

const SUMMARY_CARDS = [
  {
    label: "Total Assets",
    value: "5",
    icon: Trees,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Total Estimated Credits",
    value: "6.24M",
    icon: BarChart3,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "Average Integrity Score",
    value: "B+",
    icon: Shield,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Assets Listed",
    value: "4",
    icon: ListChecks,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CarbonAssetsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Trees className="h-7 w-7 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">Carbon Assets</h1>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUMMARY_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bgColor}`}
                  >
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Assets Table */}
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Name",
                    "Project Type",
                    "Location",
                    "Province",
                    "Area (ha)",
                    "Estimated Credits",
                    "Integrity Score",
                    "Financeability Score",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ASSETS.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                      {asset.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                      {asset.projectType}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                      {asset.location}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                      {asset.province}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 tabular-nums">
                      {formatArea(asset.areaHa)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 tabular-nums">
                      {formatNumber(asset.estimatedCredits)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${INTEGRITY_COLORS[asset.integrityScore]}`}
                      >
                        {asset.integrityScore}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full rounded-full ${
                              asset.financeabilityScore >= 85
                                ? "bg-emerald-500"
                                : asset.financeabilityScore >= 70
                                  ? "bg-green-500"
                                  : "bg-amber-500"
                            }`}
                            style={{
                              width: `${asset.financeabilityScore}%`,
                            }}
                          />
                        </div>
                        <span className="font-medium text-gray-700 tabular-nums">
                          {asset.financeabilityScore}/100
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[asset.status]}`}
                      >
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">{ASSETS.length}</span> assets
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
