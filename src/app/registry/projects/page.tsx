"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  TreePine,
  Filter,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProjectStatus = "Pending" | "Authorised" | "Approved" | "Rejected";
type ProjectSector = "REDD+" | "ARR" | "IFM" | "Cookstove" | "Renewable";

interface CarbonProject {
  id: string;
  title: string;
  sector: ProjectSector;
  location: string;
  creditEstimate: number;
  status: ProjectStatus;
  developer: string;
  created: string;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const PROJECTS: CarbonProject[] = [
  {
    id: "DRC-REDD-001",
    title: "Mai-Ndombe REDD+ Jurisdictional Programme",
    sector: "REDD+",
    location: "Mai-Ndombe",
    creditEstimate: 12_500_000,
    status: "Approved",
    developer: "Wildlife Works Carbon",
    created: "2023-03-15",
  },
  {
    id: "DRC-ARR-002",
    title: "Virunga Afforestation & Reforestation Initiative",
    sector: "ARR",
    location: "Nord-Kivu",
    creditEstimate: 3_200_000,
    status: "Authorised",
    developer: "Virunga Foundation",
    created: "2023-06-22",
  },
  {
    id: "DRC-REDD-003",
    title: "Isangi Community Forest Protection",
    sector: "REDD+",
    location: "Tshopo",
    creditEstimate: 5_800_000,
    status: "Approved",
    developer: "Jadora International",
    created: "2022-11-08",
  },
  {
    id: "DRC-IFM-004",
    title: "Equateur Improved Forest Management",
    sector: "IFM",
    location: "Equateur",
    creditEstimate: 2_100_000,
    status: "Pending",
    developer: "Congo Basin Forest Fund",
    created: "2024-01-12",
  },
  {
    id: "DRC-CS-005",
    title: "Kinshasa Clean Cookstove Distribution",
    sector: "Cookstove",
    location: "Kinshasa",
    creditEstimate: 950_000,
    status: "Approved",
    developer: "Burn Manufacturing",
    created: "2023-09-05",
  },
  {
    id: "DRC-REDD-006",
    title: "Kongo Central Mangrove Conservation",
    sector: "REDD+",
    location: "Kongo Central",
    creditEstimate: 1_750_000,
    status: "Authorised",
    developer: "Blue Carbon Initiative DRC",
    created: "2024-02-18",
  },
  {
    id: "DRC-RE-007",
    title: "Inga III Hydropower Carbon Offset",
    sector: "Renewable",
    location: "Kongo Central",
    creditEstimate: 8_400_000,
    status: "Pending",
    developer: "SNEL / AfDB Consortium",
    created: "2024-04-30",
  },
  {
    id: "DRC-ARR-008",
    title: "Ituri Agroforestry Restoration Project",
    sector: "ARR",
    location: "Ituri",
    creditEstimate: 1_300_000,
    status: "Rejected",
    developer: "ICRAF Central Africa",
    created: "2023-07-14",
  },
  {
    id: "DRC-CS-009",
    title: "Lubumbashi Institutional Cookstove Programme",
    sector: "Cookstove",
    location: "Haut-Katanga",
    creditEstimate: 620_000,
    status: "Pending",
    developer: "Envirofit DRC",
    created: "2024-05-02",
  },
  {
    id: "DRC-REDD-010",
    title: "Salonga National Park Buffer Zone REDD+",
    sector: "REDD+",
    location: "Tshuapa",
    creditEstimate: 7_200_000,
    status: "Approved",
    developer: "WWF-DRC",
    created: "2022-08-20",
  },
  {
    id: "DRC-IFM-011",
    title: "Maniema Sustainable Timber Concession",
    sector: "IFM",
    location: "Maniema",
    creditEstimate: 1_900_000,
    status: "Authorised",
    developer: "Precious Woods DRC",
    created: "2024-03-11",
  },
  {
    id: "DRC-RE-012",
    title: "Ruzizi IV Solar-Hydro Hybrid Project",
    sector: "Renewable",
    location: "Sud-Kivu",
    creditEstimate: 4_600_000,
    status: "Pending",
    developer: "SN Power Africa",
    created: "2024-06-01",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_COLORS: Record<ProjectStatus, string> = {
  Approved: "bg-emerald-100 text-emerald-800",
  Authorised: "bg-sky-100 text-sky-800",
  Pending: "bg-amber-100 text-amber-800",
  Rejected: "bg-red-100 text-red-800",
};

const PAGE_SIZE = 6;

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>(
    "All"
  );
  const [sectorFilter, setSectorFilter] = useState<"All" | ProjectSector>(
    "All"
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (sectorFilter !== "All" && p.sector !== sectorFilter) return false;
      if (
        search &&
        !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.id.toLowerCase().includes(search.toLowerCase()) &&
        !p.developer.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [statusFilter, sectorFilter, search]);

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
            <TreePine className="h-7 w-7 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Carbon Projects
            </h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors">
            <Plus className="h-4 w-4" />
            Register New Project
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <Filter className="hidden h-5 w-5 text-gray-400 sm:block" />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "All" | ProjectStatus);
              setPage(1);
            }}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Authorised">Authorised</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={sectorFilter}
            onChange={(e) => {
              setSectorFilter(e.target.value as "All" | ProjectSector);
              setPage(1);
            }}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="All">All Sectors</option>
            <option value="REDD+">REDD+</option>
            <option value="ARR">ARR</option>
            <option value="IFM">IFM</option>
            <option value="Cookstove">Cookstove</option>
            <option value="Renewable">Renewable</option>
          </select>

          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, IDs, developers..."
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
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Project ID",
                    "Title",
                    "Sector",
                    "Location",
                    "Credit Estimate",
                    "Status",
                    "Developer",
                    "Created",
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
                      No projects match your filters.
                    </td>
                  </tr>
                ) : (
                  paged.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-emerald-700">
                        {p.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                        {p.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                        {p.sector}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                        {p.location}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-medium tabular-nums">
                        {formatNumber(p.creditEstimate)} tCO2e
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                        {p.developer}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                        {p.created}
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
              of <span className="font-medium">{filtered.length}</span> projects
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
