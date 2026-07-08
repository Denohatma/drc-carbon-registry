"use client";

import { useState, useMemo } from "react";
import {
  Vault,
  FolderOpen,
  Clock,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type EscrowStatus =
  | "Created"
  | "Funded"
  | "Released"
  | "Pending Release"
  | "Disputed";

interface EscrowAccount {
  id: string;
  programme: string;
  buyer: string;
  seller: string;
  amount: number;
  currency: string;
  status: EscrowStatus;
  createdDate: string;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const ESCROW_ACCOUNTS: EscrowAccount[] = [
  {
    id: "ESC-001",
    programme: "Mai-Ndombe REDD+",
    buyer: "Carbon Capital AG",
    seller: "Mai-Ndombe Community Trust",
    amount: 4_200_000,
    currency: "USD",
    status: "Funded",
    createdDate: "2024-01-15",
  },
  {
    id: "ESC-002",
    programme: "Equateur Forest Conservation",
    buyer: "EcoTrade Partners",
    seller: "ICCN Equateur",
    amount: 2_100_000,
    currency: "USD",
    status: "Funded",
    createdDate: "2024-02-01",
  },
  {
    id: "ESC-003",
    programme: "Virunga Reforestation",
    buyer: "Nordic Climate Fund",
    seller: "Virunga Foundation",
    amount: 1_850_000,
    currency: "USD",
    status: "Released",
    createdDate: "2023-11-20",
  },
  {
    id: "ESC-004",
    programme: "Sud-Kivu Cookstoves",
    buyer: "Clean Energy Corp",
    seller: "Sud-Kivu Green Alliance",
    amount: 980_000,
    currency: "USD",
    status: "Created",
    createdDate: "2024-03-05",
  },
  {
    id: "ESC-005",
    programme: "Mai-Ndombe REDD+ Phase II",
    buyer: "Swiss Carbon SA",
    seller: "Mai-Ndombe Community Trust",
    amount: 1_500_000,
    currency: "USD",
    status: "Funded",
    createdDate: "2024-02-20",
  },
  {
    id: "ESC-006",
    programme: "Tshopo Sustainable Forestry",
    buyer: "Deutsche Klima GmbH",
    seller: "Tshopo Forest Cooperative",
    amount: 720_000,
    currency: "USD",
    status: "Pending Release",
    createdDate: "2024-03-10",
  },
  {
    id: "ESC-007",
    programme: "Equateur Phase II",
    buyer: "Carbon Capital AG",
    seller: "ICCN Equateur",
    amount: 650_000,
    currency: "USD",
    status: "Disputed",
    createdDate: "2024-01-28",
  },
  {
    id: "ESC-008",
    programme: "Community Cookstoves Expansion",
    buyer: "Impact Carbon Ltd",
    seller: "Sud-Kivu Green Alliance",
    amount: 450_000,
    currency: "USD",
    status: "Created",
    createdDate: "2024-03-12",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_COLORS: Record<EscrowStatus, string> = {
  Created: "bg-gray-200 text-gray-700",
  Funded: "bg-sky-100 text-sky-800",
  Released: "bg-emerald-100 text-emerald-800",
  "Pending Release": "bg-amber-100 text-amber-800",
  Disputed: "bg-red-100 text-red-800",
};

const PAGE_SIZE = 6;

function fmtUSD(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function EscrowPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Summary stats
  const totalEscrowValue = ESCROW_ACCOUNTS.reduce(
    (s, a) => s + a.amount,
    0
  );
  const activeAccounts = ESCROW_ACCOUNTS.filter(
    (a) => a.status !== "Released"
  ).length;
  const pendingReleases = ESCROW_ACCOUNTS.filter(
    (a) => a.status === "Pending Release"
  ).length;

  const summaryCards = [
    {
      label: "Total Escrow Value",
      value: fmtUSD(totalEscrowValue),
      icon: Vault,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Active Accounts",
      value: String(activeAccounts),
      icon: FolderOpen,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      label: "Pending Releases",
      value: String(pendingReleases),
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const filtered = useMemo(() => {
    if (!search) return ESCROW_ACCOUNTS;
    const q = search.toLowerCase();
    return ESCROW_ACCOUNTS.filter(
      (a) =>
        a.id.toLowerCase().includes(q) ||
        a.programme.toLowerCase().includes(q) ||
        a.buyer.toLowerCase().includes(q) ||
        a.seller.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q)
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
            <Vault className="h-7 w-7 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Escrow Accounts
            </h1>
          </div>
          <button
            onClick={() => alert("Create Escrow dialog would open here.")}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Escrow
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                  {card.value}
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
              placeholder="Search escrow accounts..."
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
                    "Buyer",
                    "Seller",
                    "Amount (USD)",
                    "Currency",
                    "Status",
                    "Created Date",
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
                      colSpan={8}
                      className="px-4 py-12 text-center text-sm text-gray-500"
                    >
                      No escrow accounts match your search.
                    </td>
                  </tr>
                ) : (
                  paged.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-emerald-700">
                        {a.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                        {a.programme}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                        {a.buyer}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                        {a.seller}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-medium tabular-nums">
                        {fmtUSD(a.amount)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                        {a.currency}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[a.status]}`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 tabular-nums">
                        {fmtDate(a.createdDate)}
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
              of <span className="font-medium">{filtered.length}</span> escrow
              accounts
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
