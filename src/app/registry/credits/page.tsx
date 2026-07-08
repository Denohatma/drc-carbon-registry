"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Coins,
  ChevronLeft,
  ChevronRight,
  Landmark,
  ArrowRightLeft,
  Ban,
  CircleCheck,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CreditStatus = "Active" | "Transferred" | "Retired" | "Cancelled";

interface CarbonCredit {
  serialNumber: string;
  programme: string;
  creditCount: number;
  status: CreditStatus;
  owner: string;
  vintage: number;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const CREDITS: CarbonCredit[] = [
  {
    serialNumber: "CD-REDD-2023-001-00001-12500",
    programme: "Mai-Ndombe REDD+ Jurisdictional Programme",
    creditCount: 12_500,
    status: "Active",
    owner: "Wildlife Works Carbon",
    vintage: 2023,
  },
  {
    serialNumber: "CD-ARR-2023-002-00001-03200",
    programme: "Virunga Afforestation & Reforestation Initiative",
    creditCount: 3_200,
    status: "Active",
    owner: "Virunga Foundation",
    vintage: 2023,
  },
  {
    serialNumber: "CD-REDD-2022-003-00001-05800",
    programme: "Isangi Community Forest Protection",
    creditCount: 5_800,
    status: "Transferred",
    owner: "South Pole Group",
    vintage: 2022,
  },
  {
    serialNumber: "CD-REDD-2023-004-12501-18000",
    programme: "Mai-Ndombe REDD+ Jurisdictional Programme",
    creditCount: 5_500,
    status: "Retired",
    owner: "TotalEnergies SE",
    vintage: 2023,
  },
  {
    serialNumber: "CD-CS-2023-005-00001-00950",
    programme: "Kinshasa Clean Cookstove Distribution",
    creditCount: 950,
    status: "Active",
    owner: "Burn Manufacturing",
    vintage: 2023,
  },
  {
    serialNumber: "CD-REDD-2024-006-00001-01750",
    programme: "Kongo Central Mangrove Conservation",
    creditCount: 1_750,
    status: "Active",
    owner: "Blue Carbon Initiative DRC",
    vintage: 2024,
  },
  {
    serialNumber: "CD-REDD-2022-007-00001-07200",
    programme: "Salonga National Park Buffer Zone REDD+",
    creditCount: 7_200,
    status: "Transferred",
    owner: "Climeworks AG",
    vintage: 2022,
  },
  {
    serialNumber: "CD-IFM-2024-008-00001-01900",
    programme: "Maniema Sustainable Timber Concession",
    creditCount: 1_900,
    status: "Active",
    owner: "Precious Woods DRC",
    vintage: 2024,
  },
  {
    serialNumber: "CD-REDD-2023-009-18001-25000",
    programme: "Mai-Ndombe REDD+ Jurisdictional Programme",
    creditCount: 7_000,
    status: "Retired",
    owner: "Microsoft Corporation",
    vintage: 2023,
  },
  {
    serialNumber: "CD-ARR-2023-010-03201-04500",
    programme: "Virunga Afforestation & Reforestation Initiative",
    creditCount: 1_300,
    status: "Cancelled",
    owner: "Virunga Foundation",
    vintage: 2023,
  },
  {
    serialNumber: "CD-CS-2024-011-00001-00620",
    programme: "Lubumbashi Institutional Cookstove Programme",
    creditCount: 620,
    status: "Active",
    owner: "Envirofit DRC",
    vintage: 2024,
  },
  {
    serialNumber: "CD-REDD-2022-012-05801-08000",
    programme: "Isangi Community Forest Protection",
    creditCount: 2_200,
    status: "Retired",
    owner: "Shell plc",
    vintage: 2022,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_COLORS: Record<CreditStatus, string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Transferred: "bg-sky-100 text-sky-800",
  Retired: "bg-gray-200 text-gray-700",
  Cancelled: "bg-red-100 text-red-800",
};

const PAGE_SIZE = 6;

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CreditsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Summary stats
  const totalIssued = CREDITS.reduce((s, c) => s + c.creditCount, 0);
  const available = CREDITS.filter((c) => c.status === "Active").reduce(
    (s, c) => s + c.creditCount,
    0
  );
  const transferred = CREDITS.filter((c) => c.status === "Transferred").reduce(
    (s, c) => s + c.creditCount,
    0
  );
  const retired = CREDITS.filter((c) => c.status === "Retired").reduce(
    (s, c) => s + c.creditCount,
    0
  );

  const summaryCards = [
    {
      label: "Total Issued",
      value: totalIssued,
      icon: Coins,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Available",
      value: available,
      icon: CircleCheck,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      label: "Transferred",
      value: transferred,
      icon: ArrowRightLeft,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Retired",
      value: retired,
      icon: Ban,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];

  const filtered = useMemo(() => {
    if (!search) return CREDITS;
    const q = search.toLowerCase();
    return CREDITS.filter(
      (c) =>
        c.serialNumber.toLowerCase().includes(q) ||
        c.programme.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Landmark className="h-7 w-7 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Credits Management
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className={`rounded-lg p-3 ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-xl font-bold text-gray-900 tabular-nums">
                  {fmt(card.value)}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    tCO2e
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search serial numbers, programmes, owners..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Serial Number",
                    "Programme",
                    "Credit Count",
                    "Status",
                    "Owner",
                    "Vintage",
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
                {paged.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-sm text-gray-500"
                    >
                      No credits match your search.
                    </td>
                  </tr>
                ) : (
                  paged.map((c) => (
                    <tr
                      key={c.serialNumber}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-emerald-700">
                        {c.serialNumber}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                        {c.programme}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-medium tabular-nums">
                        {fmt(c.creditCount)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[c.status]}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                        {c.owner}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 tabular-nums">
                        {c.vintage}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * PAGE_SIZE + 1}
              </span>
              {" - "}
              <span className="font-medium">
                {Math.min(currentPage * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="font-medium">{filtered.length}</span> credit
              records
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
