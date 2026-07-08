"use client";

import { useState } from "react";
import { AlertTriangle, TrendingDown, Shield } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type HazardTrend = "Increasing" | "Stable" | "Decreasing";

interface HazardRow {
  hazardType: string;
  affectedAssets: number;
  exposure: number;
  annualExpectedLoss: number;
  returnPeriod: number;
  trend: HazardTrend;
}

interface LossExceedancePoint {
  returnPeriod: number;
  lossAmount: number;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const HAZARD_DATA: HazardRow[] = [
  {
    hazardType: "Flood",
    affectedAssets: 3,
    exposure: 28_400_000,
    annualExpectedLoss: 540_000,
    returnPeriod: 25,
    trend: "Increasing",
  },
  {
    hazardType: "Drought",
    affectedAssets: 4,
    exposure: 42_100_000,
    annualExpectedLoss: 380_000,
    returnPeriod: 15,
    trend: "Stable",
  },
  {
    hazardType: "Wildfire",
    affectedAssets: 2,
    exposure: 12_800_000,
    annualExpectedLoss: 190_000,
    returnPeriod: 50,
    trend: "Increasing",
  },
  {
    hazardType: "Landslide",
    affectedAssets: 1,
    exposure: 3_094_000,
    annualExpectedLoss: 90_000,
    returnPeriod: 100,
    trend: "Stable",
  },
];

const LOSS_EXCEEDANCE_DATA: LossExceedancePoint[] = [
  { returnPeriod: 5, lossAmount: 0.5 },
  { returnPeriod: 10, lossAmount: 1.1 },
  { returnPeriod: 25, lossAmount: 2.4 },
  { returnPeriod: 50, lossAmount: 4.2 },
  { returnPeriod: 100, lossAmount: 6.8 },
  { returnPeriod: 250, lossAmount: 9.5 },
  { returnPeriod: 500, lossAmount: 12.0 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function TrendBadge({ trend }: { trend: HazardTrend }) {
  const styles: Record<HazardTrend, string> = {
    Increasing:
      "bg-red-50 text-red-700 border border-red-200",
    Stable:
      "bg-gray-50 text-gray-700 border border-gray-200",
    Decreasing:
      "bg-green-50 text-green-700 border border-green-200",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${styles[trend]}`}
    >
      {trend}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Custom tooltip for the chart
// ---------------------------------------------------------------------------

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
      <p className="text-xs text-gray-500">
        Return Period: {label} years
      </p>
      <p className="text-sm font-semibold text-gray-900">
        ${payload[0].value}M
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ClimateRiskPage() {
  const [selectedHazard, setSelectedHazard] = useState<string | null>(null);

  const filteredData = selectedHazard
    ? HAZARD_DATA.filter((h) => h.hazardType === selectedHazard)
    : HAZARD_DATA;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ---- Header ---- */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Climate Risk Assessment
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Physical climate risk exposure across registered carbon credit
            project assets in the DRC
          </p>
        </div>

        {/* ---- Summary cards ---- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Exposure */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                Total Exposure
              </p>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">$48.6M</p>
            <p className="mt-1 text-xs text-gray-400">
              Aggregate asset value at risk
            </p>
          </div>

          {/* Annual Expected Loss */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                Annual Expected Loss
              </p>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">$1.2M</p>
            <p className="mt-1 text-xs text-gray-400">
              2.5% of total exposure
            </p>
          </div>

          {/* Adaptation Cost */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-500">
                Adaptation Cost
              </p>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">$3.8M</p>
            <p className="mt-1 text-xs text-gray-400">
              Estimated resilience investment
            </p>
          </div>
        </div>

        {/* ---- Hazard type table ---- */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Risk by Hazard Type
            </h2>
            <div className="flex items-center gap-2">
              <label
                htmlFor="hazard-filter"
                className="text-xs font-medium text-gray-500"
              >
                Filter:
              </label>
              <select
                id="hazard-filter"
                value={selectedHazard ?? ""}
                onChange={(e) =>
                  setSelectedHazard(e.target.value || null)
                }
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              >
                <option value="">All Hazards</option>
                {HAZARD_DATA.map((h) => (
                  <option key={h.hazardType} value={h.hazardType}>
                    {h.hazardType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="whitespace-nowrap px-6 py-3">
                    Hazard Type
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-right">
                    Affected Assets
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-right">
                    Exposure ($)
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-right">
                    Annual Expected Loss
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-right">
                    Return Period (years)
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-center">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.map((row) => (
                  <tr
                    key={row.hazardType}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      {row.hazardType}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-gray-700">
                      {row.affectedAssets}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-gray-700">
                      {formatCurrency(row.exposure)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-gray-700">
                      {formatCurrency(row.annualExpectedLoss)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-gray-700">
                      {row.returnPeriod}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <TrendBadge trend={row.trend} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- Loss exceedance curve ---- */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Loss Exceedance Curve
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Estimated loss by return period across all hazard types
          </p>

          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={LOSS_EXCEEDANCE_DATA}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="returnPeriod"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  label={{
                    value: "Return Period (years)",
                    position: "insideBottomRight",
                    offset: -5,
                    style: { fontSize: 12, fill: "#6b7280" },
                  }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  label={{
                    value: "Loss ($M)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 12, fill: "#6b7280" },
                  }}
                />
                <Tooltip
                  content={<ChartTooltip />}
                />
                <Line
                  type="monotone"
                  dataKey="lossAmount"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#16a34a", stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#15803d", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ---- Attribution footer ---- */}
        <div className="rounded-lg border border-green-100 bg-green-50 px-6 py-3">
          <p className="text-xs text-green-700">
            Powered by CLIMADA (ETH Zurich) climate risk engine
          </p>
        </div>
      </div>
    </div>
  );
}
