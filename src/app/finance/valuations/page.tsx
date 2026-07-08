"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Calculator } from "lucide-react";
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

interface Valuation {
  asset: string;
  date: string;
  pricePerCredit: number;
  totalValue: number;
  methodology: string;
  discountRate: number;
  npv: number;
  irr: number;
  paybackYears: number;
}

interface PriceTrend {
  month: string;
  price: number;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const VALUATIONS: Valuation[] = [
  {
    asset: "Mai-Ndombe REDD+",
    date: "2024-03-15",
    pricePerCredit: 8.2,
    totalValue: 31_898_000,
    methodology: "InVEST + DCF",
    discountRate: 0.08,
    npv: 24_100_000,
    irr: 0.185,
    paybackYears: 4.2,
  },
  {
    asset: "Equateur Forest Conservation",
    date: "2024-03-10",
    pricePerCredit: 7.5,
    totalValue: 9_375_000,
    methodology: "InVEST + DCF",
    discountRate: 0.09,
    npv: 6_800_000,
    irr: 0.142,
    paybackYears: 5.8,
  },
  {
    asset: "Virunga Reforestation",
    date: "2024-03-12",
    pricePerCredit: 9.1,
    totalValue: 3_094_000,
    methodology: "CLIMADA Risk-Adj",
    discountRate: 0.07,
    npv: 2_450_000,
    irr: 0.221,
    paybackYears: 3.5,
  },
  {
    asset: "Sud-Kivu Cookstoves",
    date: "2024-02-28",
    pricePerCredit: 5.4,
    totalValue: 2_808_000,
    methodology: "Standard DCF",
    discountRate: 0.1,
    npv: 1_900_000,
    irr: 0.128,
    paybackYears: 6.1,
  },
  {
    asset: "Tshopo Sustainable Forestry",
    date: "2024-03-01",
    pricePerCredit: 6.3,
    totalValue: 1_512_000,
    methodology: "InVEST + DCF",
    discountRate: 0.09,
    npv: 980_000,
    irr: 0.105,
    paybackYears: 7.3,
  },
];

const PRICE_TRENDS: PriceTrend[] = [
  { month: "Jul 2023", price: 5.5 },
  { month: "Aug 2023", price: 5.7 },
  { month: "Sep 2023", price: 5.4 },
  { month: "Oct 2023", price: 5.9 },
  { month: "Nov 2023", price: 6.2 },
  { month: "Dec 2023", price: 6.0 },
  { month: "Jan 2024", price: 6.5 },
  { month: "Feb 2024", price: 6.8 },
  { month: "Mar 2024", price: 7.2 },
  { month: "Apr 2024", price: 7.0 },
  { month: "May 2024", price: 7.6 },
  { month: "Jun 2024", price: 8.2 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(n: number): string {
  if (n >= 1_000_000) {
    return "$" + (n / 1_000_000).toFixed(1) + "M";
  }
  if (n >= 1_000) {
    return "$" + (n / 1_000).toFixed(0) + "K";
  }
  return "$" + n.toLocaleString("en-US");
}

function formatFullCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function formatPercent(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Summary cards config
// ---------------------------------------------------------------------------

const SUMMARY_CARDS = [
  {
    label: "Total Portfolio Value",
    value: "$48.6M",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Avg Price/Credit",
    value: "$7.80",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Weighted NPV",
    value: "$36.2M",
    icon: Calculator,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ValuationsPage() {
  const [sortField, setSortField] = useState<keyof Valuation>("totalValue");
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = [...VALUATIONS].sort((a, b) => {
    const av = a[sortField];
    const bv = b[sortField];
    if (typeof av === "number" && typeof bv === "number") {
      return sortAsc ? av - bv : bv - av;
    }
    return sortAsc
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  function handleSort(field: keyof Valuation) {
    if (field === sortField) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  }

  function sortIndicator(field: keyof Valuation) {
    if (sortField !== field) return null;
    return sortAsc ? " ▲" : " ▼";
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <DollarSign className="h-7 w-7 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Asset Valuations
          </h1>
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {SUMMARY_CARDS.map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className={`rounded-lg ${card.bg} p-3`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Valuations table */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Project Valuations
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th
                    className="cursor-pointer px-5 py-3 hover:text-gray-700"
                    onClick={() => handleSort("asset")}
                  >
                    Asset{sortIndicator("asset")}
                  </th>
                  <th
                    className="cursor-pointer px-5 py-3 hover:text-gray-700"
                    onClick={() => handleSort("date")}
                  >
                    Date{sortIndicator("date")}
                  </th>
                  <th
                    className="cursor-pointer px-5 py-3 text-right hover:text-gray-700"
                    onClick={() => handleSort("pricePerCredit")}
                  >
                    Price/Credit ($){sortIndicator("pricePerCredit")}
                  </th>
                  <th
                    className="cursor-pointer px-5 py-3 text-right hover:text-gray-700"
                    onClick={() => handleSort("totalValue")}
                  >
                    Total Value{sortIndicator("totalValue")}
                  </th>
                  <th className="px-5 py-3">Methodology</th>
                  <th
                    className="cursor-pointer px-5 py-3 text-right hover:text-gray-700"
                    onClick={() => handleSort("discountRate")}
                  >
                    Discount Rate{sortIndicator("discountRate")}
                  </th>
                  <th
                    className="cursor-pointer px-5 py-3 text-right hover:text-gray-700"
                    onClick={() => handleSort("npv")}
                  >
                    NPV{sortIndicator("npv")}
                  </th>
                  <th
                    className="cursor-pointer px-5 py-3 text-right hover:text-gray-700"
                    onClick={() => handleSort("irr")}
                  >
                    IRR{sortIndicator("irr")}
                  </th>
                  <th
                    className="cursor-pointer px-5 py-3 text-right hover:text-gray-700"
                    onClick={() => handleSort("paybackYears")}
                  >
                    Payback (Yrs){sortIndicator("paybackYears")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((v) => (
                  <tr
                    key={v.asset}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-5 py-3.5 font-medium text-gray-900">
                      {v.asset}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-gray-600">
                      {formatDate(v.date)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-right text-gray-900">
                      ${v.pricePerCredit.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-right font-medium text-gray-900">
                      {formatFullCurrency(v.totalValue)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        {v.methodology}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-right text-gray-600">
                      {formatPercent(v.discountRate)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-right font-medium text-emerald-700">
                      {formatFullCurrency(v.npv)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-right text-gray-900">
                      {formatPercent(v.irr)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-right text-gray-600">
                      {v.paybackYears.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price trend chart */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Carbon Credit Price Trend
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Average $/credit over 12 months (Jul 2023 - Jun 2024)
          </p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={PRICE_TRENDS}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={{ stroke: "#d1d5db" }}
                />
                <YAxis
                  domain={[4, 10]}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={{ stroke: "#d1d5db" }}
                  tickFormatter={(v) => `$${v.toFixed(2)}`}
                />
                <Tooltip
                  formatter={(value) => [
                    `$${Number(value).toFixed(2)}`,
                    "Price/Credit",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#059669"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#059669", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#059669", strokeWidth: 2, stroke: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Methodology note */}
        <div className="mt-6 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Methodology note:</span>{" "}
            Based on InVEST ecosystem valuation and CLIMADA risk-adjusted
            pricing. Discount rates reflect country-specific risk premiums and
            project-level uncertainty factors.
          </p>
        </div>
      </div>
    </div>
  );
}
