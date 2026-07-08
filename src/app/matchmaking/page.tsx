'use client';

import { useState } from 'react';
import {
  Sparkles,
  Building2,
  Banknote,
  Wrench,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  MapPin,
  DollarSign,
  Leaf,
  Zap,
  Users2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Funder {
  name: string;
  type: string;
  focus: string[];
  ticketSize: string;
  region: string;
}

interface EPC {
  name: string;
  specialty: string;
  experience: string;
  location: string;
}

interface MatchResult {
  id: string;
  projectId: string;
  projectName: string;
  sector: string;
  province: string;
  investmentNeed: string;
  matchScore: number;
  status: 'matched' | 'pending' | 'reviewing';
  funders: Funder[];
  epcs: EPC[];
  matchedAt: string;
  rationale: string;
}

const matchResults: MatchResult[] = [
  {
    id: 'MM-001',
    projectId: 'PP-001',
    projectName: 'Mai-Ndombe REDD+ Phase III',
    sector: 'REDD+',
    province: 'Mai-Ndombe',
    investmentNeed: '$45M',
    matchScore: 94,
    status: 'matched',
    funders: [
      { name: 'Mirova Natural Capital', type: 'Impact Fund', focus: ['REDD+', 'NBS'], ticketSize: '$20–50M', region: 'Global' },
      { name: 'LEAF Coalition', type: 'Public-Private', focus: ['Jurisdictional REDD+', 'Forest Protection'], ticketSize: '$50–200M', region: 'Tropical Countries' },
      { name: 'Livelihoods Carbon Fund', type: 'Carbon Fund', focus: ['Community Forestry', 'REDD+'], ticketSize: '$10–30M', region: 'Africa, Asia' },
    ],
    epcs: [
      { name: 'Wildlife Works', specialty: 'REDD+ Project Development', experience: '15+ years', location: 'Kenya/Global' },
      { name: 'BioCarbon Partners', specialty: 'Forest Conservation', experience: '10+ years', location: 'Zambia' },
    ],
    matchedAt: '2 hours ago',
    rationale: 'Strong alignment: scale matches funder ticket sizes, jurisdictional approach aligns with LEAF mandate, proven REDD+ methodology.',
  },
  {
    id: 'MM-002',
    projectId: 'PP-004',
    projectName: 'Virunga Clean Cooking',
    sector: 'Clean Cooking',
    province: 'North Kivu',
    investmentNeed: '$18M',
    matchScore: 89,
    status: 'matched',
    funders: [
      { name: 'Spark+ Africa Fund', type: 'Clean Energy Fund', focus: ['Clean Cooking', 'Renewable Energy'], ticketSize: '$5–25M', region: 'Sub-Saharan Africa' },
      { name: 'Modern Energy Cooking Services (MECS)', type: 'Research/Grants', focus: ['Clean Cooking Technology'], ticketSize: '$1–10M', region: 'Global' },
    ],
    epcs: [
      { name: 'EcoAct DRC', specialty: 'Cookstove Distribution', experience: '8 years', location: 'DRC' },
      { name: 'ClimateCare', specialty: 'Clean Cooking Programs', experience: '12 years', location: 'UK/Africa' },
    ],
    matchedAt: '4 hours ago',
    rationale: 'Clean cooking sector expertise match. Funder portfolios explicitly target DRC and East Africa clean cooking transitions.',
  },
  {
    id: 'MM-003',
    projectId: 'PP-008',
    projectName: 'Cuvette Centrale Peatland Conservation',
    sector: 'Peatland',
    province: 'Tshuapa',
    investmentNeed: '$65M',
    matchScore: 91,
    status: 'reviewing',
    funders: [
      { name: 'Global Peatlands Fund', type: 'Specialized Fund', focus: ['Peatland Conservation', 'Blue Carbon'], ticketSize: '$10–80M', region: 'Global' },
      { name: 'Green Climate Fund (GCF)', type: 'Multilateral', focus: ['Climate Adaptation', 'Mitigation'], ticketSize: '$50–200M', region: 'Developing Countries' },
      { name: 'Congo Basin Forest Fund', type: 'Regional', focus: ['Forest Conservation', 'Peatlands'], ticketSize: '$5–50M', region: 'Congo Basin' },
    ],
    epcs: [
      { name: 'Wetlands International', specialty: 'Peatland Mapping & Conservation', experience: '20+ years', location: 'Netherlands/DRC' },
    ],
    matchedAt: '1 day ago',
    rationale: 'Unique peatland asset. Cuvette Centrale is the world\'s largest tropical peatland — draws specialized peatland and GCF interest.',
  },
  {
    id: 'MM-004',
    projectId: 'PP-015',
    projectName: 'Grand Inga Solar-Hydro Hybrid (Mission 300)',
    sector: 'Solar',
    province: 'Kongo Central',
    investmentNeed: '$320M',
    matchScore: 87,
    status: 'pending',
    funders: [
      { name: 'Africa Finance Corporation (AFC)', type: 'DFI', focus: ['Energy Infrastructure', 'Power Generation'], ticketSize: '$50–500M', region: 'Africa' },
      { name: 'Power Africa (USAID)', type: 'Development', focus: ['Renewable Energy', 'Grid Access'], ticketSize: '$20–100M', region: 'Sub-Saharan Africa' },
      { name: 'African Development Bank (AfDB)', type: 'Multilateral', focus: ['Infrastructure', 'Energy'], ticketSize: '$100–500M', region: 'Africa' },
    ],
    epcs: [
      { name: 'Siemens Energy', specialty: 'Hybrid Power Systems', experience: '25+ years', location: 'Global' },
      { name: 'SolarAfrica', specialty: 'Utility-Scale Solar', experience: '10+ years', location: 'East/Central Africa' },
    ],
    matchedAt: '1 day ago',
    rationale: 'Mission 300 alignment. DFIs actively seeking large-scale DRC energy projects. Grand Inga proximity adds strategic value.',
  },
  {
    id: 'MM-005',
    projectId: 'PP-020',
    projectName: 'Lobito Atlantic Rail Electrification (Lobito)',
    sector: 'Transport',
    province: 'Haut-Katanga',
    investmentNeed: '$280M',
    matchScore: 85,
    status: 'pending',
    funders: [
      { name: 'US International Development Finance Corp (DFC)', type: 'DFI', focus: ['Infrastructure', 'Lobito Corridor'], ticketSize: '$100–500M', region: 'Global' },
      { name: 'European Investment Bank (EIB)', type: 'Multilateral', focus: ['Transport', 'Green Infrastructure'], ticketSize: '$50–300M', region: 'Global' },
    ],
    epcs: [
      { name: 'CREC (China Railway Engineering)', specialty: 'Railway Construction', experience: '30+ years', location: 'Global' },
      { name: 'Mota-Engil Africa', specialty: 'Infrastructure', experience: '15+ years', location: 'Southern Africa' },
    ],
    matchedAt: '2 days ago',
    rationale: 'Lobito Corridor strategic priority. DFC has dedicated Lobito funding window. EIB Global Gateway alignment.',
  },
  {
    id: 'MM-006',
    projectId: 'PP-010',
    projectName: 'Katanga Mining Methane Capture',
    sector: 'Methane',
    province: 'Haut-Katanga',
    investmentNeed: '$42M',
    matchScore: 82,
    status: 'reviewing',
    funders: [
      { name: 'Global Methane Hub', type: 'Philanthropic', focus: ['Methane Abatement'], ticketSize: '$5–30M', region: 'Global' },
      { name: 'IFC InfraVentures', type: 'DFI Equity', focus: ['Mining Infrastructure', 'Climate'], ticketSize: '$10–50M', region: 'Emerging Markets' },
    ],
    epcs: [
      { name: 'Aecom', specialty: 'Environmental Engineering', experience: '20+ years', location: 'Global' },
    ],
    matchedAt: '3 days ago',
    rationale: 'Industrial methane capture aligns with Global Methane Pledge. Mining sector co-benefits strengthen DFI case.',
  },
  {
    id: 'MM-007',
    projectId: 'PP-012',
    projectName: 'Ituri Community Agroforestry',
    sector: 'ARR',
    province: 'Ituri',
    investmentNeed: '$12M',
    matchScore: 88,
    status: 'matched',
    funders: [
      { name: 'Land Degradation Neutrality Fund (LDN)', type: 'Blended Finance', focus: ['Land Restoration', 'Agroforestry'], ticketSize: '$5–20M', region: 'Global' },
      { name: 'Moringa Fund', type: 'Impact Fund', focus: ['Agroforestry', 'Reforestation'], ticketSize: '$5–15M', region: 'Africa, Latin America' },
    ],
    epcs: [
      { name: 'Vi Agroforestry', specialty: 'Community Agroforestry', experience: '40+ years', location: 'East Africa' },
      { name: 'World Agroforestry (ICRAF)', specialty: 'Research & Implementation', experience: '50+ years', location: 'Kenya/Global' },
    ],
    matchedAt: '3 days ago',
    rationale: 'Agroforestry focus with strong community development angle. Perfect for LDN and impact-first investors.',
  },
  {
    id: 'MM-008',
    projectId: 'PP-023',
    projectName: 'Kasumbalesa SEZ Green Industry Park (Lobito)',
    sector: 'Industrial',
    province: 'Haut-Katanga',
    investmentNeed: '$180M',
    matchScore: 79,
    status: 'pending',
    funders: [
      { name: 'African Export-Import Bank (Afreximbank)', type: 'DFI', focus: ['Trade Finance', 'Industrial Parks'], ticketSize: '$50–200M', region: 'Africa' },
      { name: 'AfCFTA Adjustment Fund', type: 'Continental', focus: ['Trade Infrastructure'], ticketSize: '$20–100M', region: 'Africa' },
    ],
    epcs: [
      { name: 'Dangote Industries', specialty: 'Industrial Development', experience: '20+ years', location: 'West/Central Africa' },
    ],
    matchedAt: '4 days ago',
    rationale: 'SEZ aligns with AfCFTA trade facilitation. Lobito Corridor connectivity adds logistics advantage.',
  },
];

const statusConfig = {
  matched: { label: 'Matched', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  pending: { label: 'AI Processing', color: 'bg-amber-100 text-amber-700', icon: Clock },
  reviewing: { label: 'Under Review', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
};

export default function MatchmakingPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [showDetail, setShowDetail] = useState<string | null>(null);

  const sectors = [...new Set(matchResults.map((m) => m.sector))].sort();
  const filtered = matchResults.filter((m) => {
    if (filterStatus !== 'all' && m.status !== filterStatus) return false;
    if (filterSector !== 'all' && m.sector !== filterSector) return false;
    return true;
  });

  const matched = matchResults.filter((m) => m.status === 'matched').length;
  const reviewing = matchResults.filter((m) => m.status === 'reviewing').length;
  const pending = matchResults.filter((m) => m.status === 'pending').length;
  const avgScore = Math.round(matchResults.reduce((s, m) => s + m.matchScore, 0) / matchResults.length);

  const detail = showDetail ? matchResults.find((m) => m.id === showDetail) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            AI Matchmaking
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Intelligent matching of projects to potential funders, DFIs, and EPCs
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors">
          <RefreshCw className="h-4 w-4" />
          Run Matching
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{matched}</div>
              <div className="text-xs text-foreground-muted">Matched</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{reviewing}</div>
              <div className="text-xs text-foreground-muted">Under Review</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{pending}</div>
              <div className="text-xs text-foreground-muted">AI Processing</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border-light bg-surface p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{avgScore}%</div>
              <div className="text-xs text-foreground-muted">Avg Match Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
        >
          <option value="all">All Statuses</option>
          <option value="matched">Matched</option>
          <option value="reviewing">Under Review</option>
          <option value="pending">AI Processing</option>
        </select>
        <select
          value={filterSector}
          onChange={(e) => setFilterSector(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
        >
          <option value="all">All Sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="text-sm text-foreground-muted">{filtered.length} matches</span>
      </div>

      {/* Match cards */}
      <div className="space-y-3">
        {filtered.map((match) => {
          const isExpanded = expandedId === match.id;
          const status = statusConfig[match.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={match.id}
              className="rounded-xl border border-border-light bg-surface overflow-hidden"
              style={{ boxShadow: 'var(--card-shadow)' }}
            >
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-surface-secondary transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : match.id)}
              >
                {/* Score */}
                <div className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
                  match.matchScore >= 90 ? 'bg-emerald-500' :
                  match.matchScore >= 80 ? 'bg-blue-500' : 'bg-amber-500'
                )}>
                  {match.matchScore}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{match.projectName}</span>
                    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', status.color)}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-foreground-muted">
                    <span className="flex items-center gap-1"><Leaf className="h-3 w-3" />{match.sector}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{match.province}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{match.investmentNeed}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-foreground-muted">{match.funders.length} Funders · {match.epcs.length} EPCs</div>
                    <div className="text-xs text-foreground-subtle">{match.matchedAt}</div>
                  </div>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-foreground-muted" /> : <ChevronDown className="h-4 w-4 text-foreground-muted" />}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-border-light p-4 space-y-4 bg-surface-secondary/50">
                  {/* AI Rationale */}
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">AI Rationale</div>
                      <p className="text-sm text-foreground">{match.rationale}</p>
                    </div>
                  </div>

                  {/* Funders */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Banknote className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Matched Funders</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {match.funders.map((f) => (
                        <div key={f.name} className="rounded-lg border border-border-light bg-surface p-3">
                          <div className="text-sm font-medium text-foreground">{f.name}</div>
                          <div className="mt-1 space-y-0.5">
                            <div className="text-xs text-foreground-muted"><span className="font-medium">Type:</span> {f.type}</div>
                            <div className="text-xs text-foreground-muted"><span className="font-medium">Ticket:</span> {f.ticketSize}</div>
                            <div className="text-xs text-foreground-muted"><span className="font-medium">Region:</span> {f.region}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {f.focus.map((tag) => (
                                <span key={tag} className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* EPCs */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Matched EPCs / Implementers</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {match.epcs.map((e) => (
                        <div key={e.name} className="rounded-lg border border-border-light bg-surface p-3">
                          <div className="text-sm font-medium text-foreground">{e.name}</div>
                          <div className="mt-1 space-y-0.5">
                            <div className="text-xs text-foreground-muted"><span className="font-medium">Specialty:</span> {e.specialty}</div>
                            <div className="text-xs text-foreground-muted"><span className="font-medium">Experience:</span> {e.experience}</div>
                            <div className="text-xs text-foreground-muted"><span className="font-medium">Location:</span> {e.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowDetail(match.id); }}
                      className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent/90 transition-colors"
                    >
                      View Full Report <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Dialog */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowDetail(null)}>
          <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="text-lg font-bold text-foreground">{detail.projectName}</h2>
                <p className="text-sm text-foreground-muted">Match Report · Score: {detail.matchScore}%</p>
              </div>
              <button onClick={() => setShowDetail(null)} className="rounded-lg p-2 hover:bg-surface-secondary transition-colors">
                <X className="h-5 w-5 text-foreground-muted" />
              </button>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-foreground-muted">Sector</div>
                  <div className="text-sm font-semibold text-foreground">{detail.sector}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground-muted">Province</div>
                  <div className="text-sm font-semibold text-foreground">{detail.province}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground-muted">Investment Need</div>
                  <div className="text-sm font-semibold text-foreground">{detail.investmentNeed}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground-muted">Status</div>
                  <div className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', statusConfig[detail.status].color)}>
                    {statusConfig[detail.status].label}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-accent/5 border border-accent/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">AI Match Rationale</span>
                </div>
                <p className="text-sm text-foreground">{detail.rationale}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-emerald-600" /> Recommended Funders ({detail.funders.length})
                </h3>
                <div className="space-y-2">
                  {detail.funders.map((f) => (
                    <div key={f.name} className="rounded-lg border border-border-light p-3">
                      <div className="flex items-start justify-between">
                        <div className="text-sm font-medium text-foreground">{f.name}</div>
                        <span className="text-xs text-foreground-muted bg-surface-secondary px-2 py-0.5 rounded">{f.type}</span>
                      </div>
                      <div className="mt-1 text-xs text-foreground-muted">Ticket: {f.ticketSize} · Region: {f.region}</div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {f.focus.map((tag) => (
                          <span key={tag} className="inline-block rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-blue-600" /> Recommended EPCs ({detail.epcs.length})
                </h3>
                <div className="space-y-2">
                  {detail.epcs.map((e) => (
                    <div key={e.name} className="rounded-lg border border-border-light p-3">
                      <div className="text-sm font-medium text-foreground">{e.name}</div>
                      <div className="mt-1 text-xs text-foreground-muted">{e.specialty} · {e.experience} · {e.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
