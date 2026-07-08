'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle2, Clock, AlertCircle, Search, ChevronDown, Send, X, RefreshCw, BarChart3, Users, FolderKanban } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import { getQueries, updateQuery, type ProjectQuery } from '@/lib/queries';

const SEED_QUERIES: ProjectQuery[] = [
  {
    id: 'QRY-A1B2C3',
    projectId: 'PP-001',
    projectName: 'Yangambi Biosphere REDD+',
    userName: 'Sarah Lumumba',
    userEmail: 's.lumumba@equity-bcdc.cd',
    question: 'What is the expected IRR for this REDD+ project given current VCM pricing trends? Also interested in the community benefit-sharing mechanism.',
    response: 'Based on current VCM spot pricing of $8.20/tCO2e and projected 3.2M credits over 30 years, the expected IRR is 14.2%. The benefit-sharing mechanism allocates 40% to local communities through mobile money disbursements.',
    status: 'Responded',
    createdAt: '2026-07-05T09:30:00Z',
    respondedAt: '2026-07-05T14:15:00Z',
    respondedBy: 'Dr. Jean-Baptiste Kasongo',
  },
  {
    id: 'QRY-D4E5F6',
    projectId: 'PP-013',
    projectName: 'Mission 300 — Inga III Hydropower',
    userName: 'Michael Okonkwo',
    userEmail: 'm.okonkwo@afdb.org',
    question: 'Can you provide the latest feasibility study timeline and the environmental impact assessment status for Inga III?',
    response: null,
    status: 'Open',
    createdAt: '2026-07-06T11:45:00Z',
    respondedAt: null,
    respondedBy: null,
  },
  {
    id: 'QRY-G7H8I9',
    projectId: 'PP-029',
    projectName: 'Lobito Corridor — Kolwezi Rail Electrification (Lobito)',
    userName: 'Pierre Kalala',
    userEmail: 'p.kalala@sncc.cd',
    question: 'What gauge specifications are being considered for the electrified rail segment, and how does this align with the existing Benguela Railway standards in Angola?',
    response: 'The project will maintain Cape gauge (1,067mm) consistent with both the existing SNCC network and the Benguela Railway. Electrification will use 25kV AC overhead catenary, matching the Angolan standard for seamless cross-border operations.',
    status: 'Responded',
    createdAt: '2026-07-04T08:20:00Z',
    respondedAt: '2026-07-04T16:30:00Z',
    respondedBy: 'Eng. François Mbala',
  },
  {
    id: 'QRY-J0K1L2',
    projectId: 'PP-002',
    projectName: 'Virunga Improved Cookstoves',
    userName: 'Anne-Marie Bisimwa',
    userEmail: 'a.bisimwa@virunga.org',
    question: 'How many cookstoves have been distributed so far in the pilot phase, and what is the measured fuel efficiency improvement?',
    response: null,
    status: 'Open',
    createdAt: '2026-07-07T07:00:00Z',
    respondedAt: null,
    respondedBy: null,
  },
  {
    id: 'QRY-M3N4O5',
    projectId: 'PP-015',
    projectName: 'Mission 300 — Eastern DRC Mini-grid Programme',
    userName: 'Thierry Kapanga',
    userEmail: 't.kapanga@nuru.cd',
    question: 'What is the tariff structure for the mini-grids and is there a subsidy component from the Mission 300 fund?',
    response: 'The tariff structure follows a tiered model: $0.25/kWh for residential, $0.35/kWh for commercial, and $0.20/kWh for productive use anchors. Mission 300 provides a 40% capital subsidy with the remainder financed through concessional AfDB lending at 2% over 15 years.',
    status: 'Responded',
    createdAt: '2026-07-03T13:10:00Z',
    respondedAt: '2026-07-04T09:45:00Z',
    respondedBy: 'Dr. Akinwumi Adesina',
  },
  {
    id: 'QRY-P6Q7R8',
    projectId: 'PP-031',
    projectName: 'Lobito Corridor — Kamoa Copper Rail Spur (Lobito)',
    userName: 'Grace Mutombo',
    userEmail: 'g.mutombo@ivanhoe.cd',
    question: 'What is the expected reduction in per-tonne transport cost once the rail spur replaces the current trucking arrangement?',
    response: null,
    status: 'Open',
    createdAt: '2026-07-07T10:30:00Z',
    respondedAt: null,
    respondedBy: null,
  },
  {
    id: 'QRY-S9T0U1',
    projectId: 'PP-005',
    projectName: 'Bukavu Biogas Programme',
    userName: 'Jean-Pierre Habimana',
    userEmail: 'jp.habimana@snv.org',
    question: 'Has the CDM validation audit been scheduled? We need to coordinate with the DOE for the site visits.',
    response: 'The CDM validation audit is scheduled for 15-22 August 2026 with TÜV SÜD as the DOE. Site visits will cover 3 institutional installations in Bukavu and 5 household clusters in Kabare District. Please coordinate logistics through the PMU.',
    status: 'Closed',
    createdAt: '2026-06-28T14:00:00Z',
    respondedAt: '2026-06-29T10:20:00Z',
    respondedBy: 'Albert Moleka',
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function AdminPage() {
  const [queries, setQueries] = useState<ProjectQuery[]>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Responded' | 'Closed'>('All');
  const [search, setSearch] = useState('');
  const [responding, setResponding] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const stored = getQueries();
    const combined = [...stored, ...SEED_QUERIES.filter((s) => !stored.some((q) => q.id === s.id))];
    setQueries(combined);
  }, []);

  const filtered = queries.filter((q) => {
    if (statusFilter !== 'All' && q.status !== statusFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return q.projectName.toLowerCase().includes(s) || q.userName.toLowerCase().includes(s) || q.question.toLowerCase().includes(s);
    }
    return true;
  });

  const openCount = queries.filter((q) => q.status === 'Open').length;
  const respondedCount = queries.filter((q) => q.status === 'Responded').length;
  const closedCount = queries.filter((q) => q.status === 'Closed').length;
  const uniqueProjects = new Set(queries.map((q) => q.projectId)).size;

  function handleRespond(id: string) {
    if (!responseText.trim()) return;
    const updated = updateQuery(id, {
      response: responseText.trim(),
      status: 'Responded',
      respondedAt: new Date().toISOString(),
      respondedBy: 'Jean Mukendi (Admin)',
    });
    setQueries(updated.length ? updated : queries.map((q) => q.id === id ? { ...q, response: responseText.trim(), status: 'Responded' as const, respondedAt: new Date().toISOString(), respondedBy: 'Jean Mukendi (Admin)' } : q));
    setResponding(null);
    setResponseText('');
  }

  function handleClose(id: string) {
    const updated = updateQuery(id, { status: 'Closed' });
    setQueries(updated.length ? updated : queries.map((q) => q.id === id ? { ...q, status: 'Closed' as const } : q));
  }

  function handleReopen(id: string) {
    const updated = updateQuery(id, { status: 'Open' });
    setQueries(updated.length ? updated : queries.map((q) => q.id === id ? { ...q, status: 'Open' as const } : q));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Admin — Project Queries</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          Track and respond to investor and stakeholder queries on pipeline projects
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--foreground-muted)]">Open Queries</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">{openCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--foreground-muted)]">Responded</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">{respondedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--foreground-muted)]">Closed</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">{closedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl p-5" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <FolderKanban className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--foreground-muted)]">Projects Queried</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">{uniqueProjects}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4" style={{ boxShadow: 'var(--card-shadow)' }}>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
          <input
            type="text"
            placeholder="Search queries, projects, users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--foreground)]"
          />
        </div>
        <div className="flex items-center gap-1 bg-[var(--surface-secondary)] rounded-lg p-0.5">
          {(['All', 'Open', 'Responded', 'Closed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === s
                  ? 'bg-[var(--surface)] text-[var(--foreground)] shadow-sm'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              }`}
            >
              {s}{s === 'Open' ? ` (${openCount})` : s === 'Responded' ? ` (${respondedCount})` : s === 'Closed' ? ` (${closedCount})` : ''}
            </button>
          ))}
        </div>
        <div className="sm:ml-auto text-sm text-[var(--foreground-muted)]">
          {filtered.length} {filtered.length === 1 ? 'query' : 'queries'}
        </div>
      </div>

      {/* Query list */}
      <div className="space-y-4">
        {filtered.map((q) => (
          <div key={q.id} className="bg-[var(--surface)] border border-[var(--border-light)] rounded-xl overflow-hidden" style={{ boxShadow: 'var(--card-shadow)' }}>
            {/* Query header */}
            <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[var(--foreground-subtle)]">{q.id}</span>
                  <StatusBadge status={q.status} />
                </div>
                <h3 className="text-sm font-semibold text-[var(--foreground)]">{q.projectName}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-[var(--foreground-muted)]">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {q.userName}
                  </span>
                  <span>{q.userEmail}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(q.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {q.status === 'Open' && (
                  <button
                    onClick={() => { setResponding(responding === q.id ? null : q.id); setResponseText(''); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors"
                  >
                    <Send className="h-3 w-3" />
                    Respond
                  </button>
                )}
                {q.status === 'Responded' && (
                  <button
                    onClick={() => handleClose(q.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-green-300 text-green-700 hover:bg-green-50 transition-colors"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    Close
                  </button>
                )}
                {q.status === 'Closed' && (
                  <button
                    onClick={() => handleReopen(q.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reopen
                  </button>
                )}
              </div>
            </div>

            {/* Question */}
            <div className="px-5 pb-4">
              <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--foreground-muted)] mb-1">Question</p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">{q.question}</p>
              </div>
            </div>

            {/* Response */}
            {q.response && (
              <div className="px-5 pb-4">
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-green-800">Response</p>
                    {q.respondedAt && (
                      <p className="text-xs text-green-600">
                        by {q.respondedBy} · {formatDate(q.respondedAt)}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-green-900 leading-relaxed">{q.response}</p>
                </div>
              </div>
            )}

            {/* Respond form */}
            {responding === q.id && (
              <div className="px-5 pb-4">
                <div className="border border-[var(--accent)] rounded-lg p-4 bg-[var(--accent-light)]">
                  <p className="text-xs font-semibold text-[var(--accent)] mb-2">Write your response</p>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your response to this query..."
                    rows={3}
                    className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <button
                      onClick={() => { setResponding(null); setResponseText(''); }}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--surface)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRespond(q.id)}
                      disabled={!responseText.trim()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40"
                    >
                      <Send className="h-3 w-3" />
                      Send Response
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--foreground-subtle)]">
            <MessageCircle className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">No queries match your filters</p>
            <p className="text-xs mt-1">Queries will appear here when users interact with pipeline projects</p>
          </div>
        )}
      </div>
    </div>
  );
}
