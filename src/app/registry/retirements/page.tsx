"use client";

import { useState, useMemo } from "react";
import {
  Flame,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Globe,
  Scale,
  Heart,
  BarChart3,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RetirementType = "Cross-border" | "Legal" | "Voluntary";

interface CreditRetirement {
  id: string;
  programme: string;
  creditsRetired: number;
  type: RetirementType;
  destinationCountry: string;
  purpose: string;
  date: string;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const RETIREMENTS: CreditRetirement[] = [
  {
    id: "RET-2024-001",
    programme: "Mai-Ndombe REDD+ Jurisdictional Programme",
    creditsRetired: 5_500,
    type: "Cross-border",
    destinationCountry: "France",
    purpose: "TotalEnergies corporate net-zero commitment FY2023",
    date: "2024-02-01",
  },
  {
    id: "RET-2024-002",
    programme: "Mai-Ndombe REDD+ Jurisdictional Programme",
    creditsRetired: 7_000,
    type: "Voluntary",
    destinationCountry: "United States",
    purpose: "Microsoft carbon negative pledge Q4 2023",
    date: "2024-04-10",
  },
  {
    id: "RET-2024-003",
    programme: "Isangi Community Forest Protection",
    creditsRetired: 2_200,
    type: "Cross-border",
    destinationCountry: "United Kingdom",
    purpose: "Shell plc Nature-Based Solutions portfolio",
    date: "2024-03-15",
  },
  {
    id: "RET-2023-004",
    programme: "Salonga National Park Buffer Zone REDD+",
    creditsRetired: 3_600,
    type: "Legal",
    destinationCountry: "Switzerland",
    purpose: "Swiss government Article 6.2 bilateral agreement",
    date: "2023-12-20",
  },
  {
    id: "RET-2023-005",
    programme: "Kinshasa Clean Cookstove Distribution",
    creditsRetired: 500,
    type: "Voluntary",
    destinationCountry: "DRC (Domestic)",
    purpose: "Rawbank SA domestic CSR offset programme",
    date: "2023-11-05",
  },
  {
    id: "RET-2024-006",
    programme: "Virunga Afforestation & Reforestation Initiative",
    creditsRetired: 1_200,
    type: "Cross-border",
    destinationCountry: "Belgium",
    purpose: "Belgian Development Agency ENABEL climate finance",
    date: "2024-01-22",
  },
  {
    id: "RET-2024-007",
    programme: "Kongo Central Mangrove Conservation",
    creditsRetired: 850,
    type: "Legal",
    destinationCountry: "Japan",
    purpose: "Japan JCM bilateral credit mechanism",
    date: "2024-05-08",
  },
  {
    id: "RET-2023-008",
    programme: "Mai-Ndombe REDD+ Jurisdictional Programme",
    creditsRetired: 4_000,
    type: "Cross-border",
    destinationCountry: "Norway",
    purpose: "Norwegian NICFI REDD+ results-based payments",
    date: "2023-09-30",
  },
  {
    id: "RET-2024-009",
    programme: "Isangi Community Forest Protection",
    creditsRetired: 1_800,
    type: "Voluntary",
    destinationCountry: "Germany",
    purpose: "Deutsche Bank ESG-linked bond retirement",
    date: "2024-04-25",
  },
  {
    id: "RET-2024-010",
    programme: "Maniema Sustainable Timber Concession",
    creditsRetired: 950,
    type: "Voluntary",
    destinationCountry: "Canada",
    purpose: "Shopify Sustainability Fund annual allocation",
    date: "2024-06-12",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TYPE_COLORS: Record<RetirementType, string> = {
  "Cross-border": "bg-sky-100 text-sky-800",
  Legal: "bg-violet-100 text-violet-800",
  Voluntary: "bg-emerald-100 text-emerald-800",
};

const TYPE_ICONS: Record<RetirementType, typeof Globe> = {
  "Cross-border": Globe,
  Legal: Scale,
  Voluntary: Heart,
};

const PAGE_SIZE = 6;

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RetirementsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Summary stats
  const totalRetired = RETIREMENTS.reduce(
    (s, r) => s + r.creditsRetired,
    0
  );
  const crossBorder = RETIREMENTS.filter(
    (r) => r.type === "Cross-border"
  ).reduce((s, r) => s + r.creditsRetired, 0);
  const legal = RETIREMENTS.filter((r) => r.type === "Legal").reduce(
    (s, r) => s + r.creditsRetired,
    0
  );
  const voluntary = RETIREMENTS.filter((r) => r.type === "Voluntary").reduce(
    (s, r) => s + r.creditsRetired,
    0
  );

  const summaryCards = [
    {
      label: "Total Credits Retired",
      value: totalRetired,
      icon: Flame,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Cross-border",
      value: crossBorder,
      icon: Globe,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      label: "Legal (Article 6)",
      value: legal,
      icon: Scale,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Voluntary",
      value: voluntary,
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  const filtered = useMemo(() => {
    if (!search) return RETIREMENTS;
    const q = search.toLowerCase();
    return RETIREMENTS.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.programme.toLowerCase().includes(q) ||
        r.destinationCountry.toLowerCase().includes(q) ||
        r.purpose.toLowerCase().includes(q)
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Flame className="h-7 w-7 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Credit Retirements
            </h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors">
            <Plus className="h-4 w-4" />
            Request Retirement
          </button>
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
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">
              Retirement Records
            </h2>
          </div>
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search retirements..."
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
                    "ID",
                    "Programme",
                    "Credits Retired",
                    "Type",
                    "Destination",
                    "Purpose",
                    "Date",
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
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm text-gray-500"
                    >
                      No retirements match your search.
                    </td>
                  </tr>
                ) : (
                  paged.map((r) => {
                    const TypeIcon = TYPE_ICONS[r.type];
                    return (
                      <tr
                        key={r.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-emerald-700">
                          {r.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                          {r.programme}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-medium tabular-nums">
                          {fmt(r.creditsRetired)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_COLORS[r.type]}`}
                          >
                            <TypeIcon className="h-3 w-3" />
                            {r.type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                          {r.destinationCountry}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                          {r.purpose}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                          {r.date}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {filtered.length === 0
                  ? 0
                  : (currentPage - 1) * PAGE_SIZE + 1}
              </span>
              {" - "}
              <span className="font-medium">
                {Math.min(currentPage * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="font-medium">{filtered.length}</span>{" "}
              retirements
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
