"use client";

import { useState, useMemo } from "react";
import {
  ArrowRightLeft,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TransferStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";

interface CreditTransfer {
  id: string;
  from: string;
  to: string;
  programme: string;
  credits: number;
  status: TransferStatus;
  requestedDate: string;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const TRANSFERS: CreditTransfer[] = [
  {
    id: "TRF-2024-001",
    from: "Wildlife Works Carbon",
    to: "TotalEnergies SE",
    programme: "Mai-Ndombe REDD+ Jurisdictional Programme",
    credits: 5_500,
    status: "Approved",
    requestedDate: "2024-01-15",
  },
  {
    id: "TRF-2024-002",
    from: "Jadora International",
    to: "South Pole Group",
    programme: "Isangi Community Forest Protection",
    credits: 5_800,
    status: "Approved",
    requestedDate: "2024-02-08",
  },
  {
    id: "TRF-2024-003",
    from: "WWF-DRC",
    to: "Climeworks AG",
    programme: "Salonga National Park Buffer Zone REDD+",
    credits: 7_200,
    status: "Approved",
    requestedDate: "2024-02-22",
  },
  {
    id: "TRF-2024-004",
    from: "Virunga Foundation",
    to: "Ecosystem Marketplace",
    programme: "Virunga Afforestation & Reforestation Initiative",
    credits: 1_500,
    status: "Pending",
    requestedDate: "2024-05-10",
  },
  {
    id: "TRF-2024-005",
    from: "Blue Carbon Initiative DRC",
    to: "Chevron Carbon Offsets",
    programme: "Kongo Central Mangrove Conservation",
    credits: 800,
    status: "Pending",
    requestedDate: "2024-05-18",
  },
  {
    id: "TRF-2024-006",
    from: "Burn Manufacturing",
    to: "Gold Standard Registry",
    programme: "Kinshasa Clean Cookstove Distribution",
    credits: 450,
    status: "Rejected",
    requestedDate: "2024-03-05",
  },
  {
    id: "TRF-2024-007",
    from: "Precious Woods DRC",
    to: "Verra VCS Registry",
    programme: "Maniema Sustainable Timber Concession",
    credits: 1_900,
    status: "Pending",
    requestedDate: "2024-06-01",
  },
  {
    id: "TRF-2024-008",
    from: "Wildlife Works Carbon",
    to: "Microsoft Corporation",
    programme: "Mai-Ndombe REDD+ Jurisdictional Programme",
    credits: 7_000,
    status: "Approved",
    requestedDate: "2024-03-20",
  },
  {
    id: "TRF-2024-009",
    from: "Envirofit DRC",
    to: "Shell plc",
    programme: "Lubumbashi Institutional Cookstove Programme",
    credits: 300,
    status: "Cancelled",
    requestedDate: "2024-04-12",
  },
  {
    id: "TRF-2024-010",
    from: "Congo Basin Forest Fund",
    to: "BP Carbon Neutrality Fund",
    programme: "Equateur Improved Forest Management",
    credits: 2_100,
    status: "Pending",
    requestedDate: "2024-06-15",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  TransferStatus,
  { color: string; icon: typeof Clock }
> = {
  Pending: { color: "bg-amber-100 text-amber-800", icon: Clock },
  Approved: { color: "bg-emerald-100 text-emerald-800", icon: CheckCircle2 },
  Rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
  Cancelled: { color: "bg-gray-200 text-gray-700", icon: Ban },
};

const PAGE_SIZE = 6;

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TransfersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Split into active (Pending) and history (rest)
  const activeTransfers = useMemo(
    () => TRANSFERS.filter((t) => t.status === "Pending"),
    []
  );

  const historyTransfers = useMemo(
    () => TRANSFERS.filter((t) => t.status !== "Pending"),
    []
  );

  const filteredHistory = useMemo(() => {
    if (!search) return historyTransfers;
    const q = search.toLowerCase();
    return historyTransfers.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q) ||
        t.programme.toLowerCase().includes(q)
    );
  }, [search, historyTransfers]);

  const totalPages = Math.max(1, Math.ceil(filteredHistory.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filteredHistory.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Summary stats
  const totalCreditsTransferred = TRANSFERS.filter(
    (t) => t.status === "Approved"
  ).reduce((s, t) => s + t.credits, 0);
  const pendingCount = activeTransfers.length;
  const pendingCredits = activeTransfers.reduce((s, t) => s + t.credits, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <ArrowRightLeft className="h-7 w-7 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Credit Transfers
            </h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors">
            <Plus className="h-4 w-4" />
            Initiate Transfer
          </button>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Credits Transferred</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 tabular-nums">
              {fmt(totalCreditsTransferred)}{" "}
              <span className="text-sm font-normal text-gray-500">tCO2e</span>
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pending Requests</p>
            <p className="mt-1 text-2xl font-bold text-amber-600 tabular-nums">
              {pendingCount}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Credits Pending Transfer</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 tabular-nums">
              {fmt(pendingCredits)}{" "}
              <span className="text-sm font-normal text-gray-500">tCO2e</span>
            </p>
          </div>
        </div>

        {/* Active Transfer Requests */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Active Transfer Requests
          </h2>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "ID",
                      "From",
                      "To",
                      "Programme",
                      "Credits",
                      "Status",
                      "Requested",
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
                  {activeTransfers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-sm text-gray-500"
                      >
                        No pending transfer requests.
                      </td>
                    </tr>
                  ) : (
                    activeTransfers.map((t) => {
                      const cfg = STATUS_CONFIG[t.status];
                      const StatusIcon = cfg.icon;
                      return (
                        <tr
                          key={t.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-emerald-700">
                            {t.id}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                            {t.from}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                            {t.to}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                            {t.programme}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-medium tabular-nums">
                            {fmt(t.credits)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.color}`}
                            >
                              <StatusIcon className="h-3 w-3" />
                              {t.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                            {t.requestedDate}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Transfer History */}
        <div className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Transfer History
            </h2>
            <div className="relative max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search history..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "ID",
                      "From",
                      "To",
                      "Programme",
                      "Credits",
                      "Status",
                      "Requested",
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
                        No transfers match your search.
                      </td>
                    </tr>
                  ) : (
                    paged.map((t) => {
                      const cfg = STATUS_CONFIG[t.status];
                      const StatusIcon = cfg.icon;
                      return (
                        <tr
                          key={t.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-emerald-700">
                            {t.id}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                            {t.from}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                            {t.to}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                            {t.programme}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-medium tabular-nums">
                            {fmt(t.credits)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.color}`}
                            >
                              <StatusIcon className="h-3 w-3" />
                              {t.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                            {t.requestedDate}
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
                  {filteredHistory.length === 0
                    ? 0
                    : (currentPage - 1) * PAGE_SIZE + 1}
                </span>
                {" - "}
                <span className="font-medium">
                  {Math.min(currentPage * PAGE_SIZE, filteredHistory.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredHistory.length}</span>{" "}
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
    </div>
  );
}
