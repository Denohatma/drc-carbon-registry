'use client';

import {
  Coins,
  FolderKanban,
  AlertTriangle,
  TrendingUp,
  Lock,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRightLeft,
  Plus,
  Bell,
  MapPin,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn, formatNumber, formatCurrency } from '@/lib/utils';

/* ── Stat Cards Data ──────────────────────────────────── */

interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

const stats: StatCard[] = [
  {
    label: 'Total Credits Issued',
    value: '3,892,410',
    change: '+12.4%',
    trend: 'up',
    icon: Coins,
    iconColor: '#1b6b3a',
    iconBg: '#e5f2ea',
  },
  {
    label: 'Active Projects',
    value: '12',
    change: '+2 this quarter',
    trend: 'up',
    icon: FolderKanban,
    iconColor: '#2563eb',
    iconBg: '#dbeafe',
  },
  {
    label: 'Deforestation Alerts',
    value: '47',
    change: '-8.2%',
    trend: 'down',
    icon: AlertTriangle,
    iconColor: '#dc2626',
    iconBg: '#fee2e2',
  },
  {
    label: 'NDC Progress',
    value: '34.7%',
    change: '+2.1pp',
    trend: 'up',
    icon: TrendingUp,
    iconColor: '#7c3aed',
    iconBg: '#ede9fe',
  },
  {
    label: 'Escrow Balance',
    value: '$14.2M',
    change: '+$1.8M',
    trend: 'up',
    icon: Lock,
    iconColor: '#0891b2',
    iconBg: '#cffafe',
  },
  {
    label: 'Integrity Score Avg',
    value: 'B+',
    change: 'Stable',
    trend: 'neutral',
    icon: ShieldCheck,
    iconColor: '#059669',
    iconBg: '#d1fae5',
  },
];

/* ── Chart Data ───────────────────────────────────────── */

const creditIssuanceData = [
  { month: 'Jan', credits: 180000 },
  { month: 'Feb', credits: 210000 },
  { month: 'Mar', credits: 245000 },
  { month: 'Apr', credits: 310000 },
  { month: 'May', credits: 340000 },
  { month: 'Jun', credits: 380000 },
  { month: 'Jul', credits: 420000 },
  { month: 'Aug', credits: 395000 },
  { month: 'Sep', credits: 450000 },
  { month: 'Oct', credits: 475000 },
  { month: 'Nov', credits: 430000 },
  { month: 'Dec', credits: 457410 },
];

const emissionsBySector = [
  { name: 'Forestry', value: 42, color: '#1b6b3a' },
  { name: 'Agriculture', value: 24, color: '#5cb874' },
  { name: 'Energy', value: 16, color: '#eab308' },
  { name: 'Transport', value: 9, color: '#3b82f6' },
  { name: 'Industry', value: 6, color: '#8b5cf6' },
  { name: 'Waste', value: 3, color: '#ef4444' },
];

const deforestationTrend = [
  { quarter: 'Q1 2024', hectares: 12400 },
  { quarter: 'Q2 2024', hectares: 11800 },
  { quarter: 'Q3 2024', hectares: 13200 },
  { quarter: 'Q4 2024', hectares: 10900 },
  { quarter: 'Q1 2025', hectares: 10200 },
  { quarter: 'Q2 2025', hectares: 9800 },
  { quarter: 'Q3 2025', hectares: 9100 },
  { quarter: 'Q4 2025', hectares: 8600 },
];

const integrityDistribution = [
  { grade: 'A', count: 3, color: '#059669' },
  { grade: 'B', count: 5, color: '#1b6b3a' },
  { grade: 'C', count: 2, color: '#eab308' },
  { grade: 'D', count: 1, color: '#f97316' },
  { grade: 'E', count: 1, color: '#ef4444' },
  { grade: 'F', count: 0, color: '#991b1b' },
];

/* ── Recent Activity Data ─────────────────────────────── */

interface ActivityItem {
  id: string;
  type: 'transfer' | 'project' | 'alert' | 'retirement' | 'verification';
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
}

const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'transfer',
    title: 'Credit Transfer Completed',
    description: '125,000 VCUs transferred from Mai-Ndombe REDD+ to Carbon Fund',
    time: '2 hours ago',
    icon: ArrowRightLeft,
    iconColor: '#2563eb',
  },
  {
    id: '2',
    type: 'project',
    title: 'New Project Registered',
    description: 'Virunga Cookstove Distribution Program registered by EcoAct DRC',
    time: '5 hours ago',
    icon: Plus,
    iconColor: '#059669',
  },
  {
    id: '3',
    type: 'alert',
    title: 'Deforestation Alert',
    description: 'High-confidence alert detected in Equateur Province buffer zone',
    time: '8 hours ago',
    icon: Bell,
    iconColor: '#dc2626',
  },
  {
    id: '4',
    type: 'retirement',
    title: 'Credits Retired',
    description: '50,000 credits retired by TotalEnergies for 2025 compliance',
    time: '1 day ago',
    icon: Coins,
    iconColor: '#7c3aed',
  },
  {
    id: '5',
    type: 'verification',
    title: 'MRV Verification Complete',
    description: 'Satellite monitoring confirmed carbon stock in Tshuapa Province',
    time: '1 day ago',
    icon: ShieldCheck,
    iconColor: '#0891b2',
  },
  {
    id: '6',
    type: 'project',
    title: 'Project Milestone',
    description: 'Mai-Ndombe REDD+ Phase II reached 1M cumulative verified credits',
    time: '2 days ago',
    icon: TrendingUp,
    iconColor: '#1b6b3a',
  },
];

/* ── Custom Tooltip ───────────────────────────────────── */

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-foreground-muted">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold text-foreground">
          {formatNumber(entry.value)}
        </p>
      ))}
    </div>
  );
}

/* ── Dashboard Page ───────────────────────────────────── */

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Overview of the DRC national carbon registry and MRV system
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border-light bg-surface p-4"
              style={{ boxShadow: 'var(--card-shadow)' }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: stat.iconBg }}
                >
                  <Icon className="h-4 w-4" style={{ color: stat.iconColor }} />
                </div>
                <span
                  className={cn(
                    'flex items-center gap-0.5 text-xs font-medium',
                    stat.trend === 'up' && 'text-success',
                    stat.trend === 'down' && 'text-danger',
                    stat.trend === 'neutral' && 'text-foreground-muted'
                  )}
                >
                  {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3" />}
                  {stat.trend === 'down' && <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-foreground-muted">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Credit Issuance Over Time */}
        <div
          className="rounded-xl border border-border-light bg-surface p-5"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          <h3 className="text-sm font-semibold text-foreground">
            Credit Issuance Over Time
          </h3>
          <p className="mb-4 text-xs text-foreground-muted">
            Monthly verified carbon credits (tCO2e)
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={creditIssuanceData}>
                <defs>
                  <linearGradient id="creditGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b6b3a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1b6b3a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border-light)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: 'var(--foreground-subtle)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--foreground-subtle)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="credits"
                  stroke="#1b6b3a"
                  strokeWidth={2}
                  fill="url(#creditGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emissions by Sector */}
        <div
          className="rounded-xl border border-border-light bg-surface p-5"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          <h3 className="text-sm font-semibold text-foreground">
            Emissions by Sector
          </h3>
          <p className="mb-4 text-xs text-foreground-muted">
            Distribution of GHG emissions across key sectors
          </p>
          <div className="h-64 flex items-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emissionsBySector}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {emissionsBySector.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, 'Share']}
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2 pl-4">
              {emissionsBySector.map((sector) => (
                <div key={sector.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-sm shrink-0"
                    style={{ backgroundColor: sector.color }}
                  />
                  <span className="text-xs text-foreground-muted flex-1">
                    {sector.name}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {sector.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Deforestation Trend */}
        <div
          className="rounded-xl border border-border-light bg-surface p-5"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          <h3 className="text-sm font-semibold text-foreground">
            Deforestation Trend
          </h3>
          <p className="mb-4 text-xs text-foreground-muted">
            Hectares of forest cover lost per quarter
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deforestationTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border-light)"
                  vertical={false}
                />
                <XAxis
                  dataKey="quarter"
                  tick={{ fontSize: 11, fill: 'var(--foreground-subtle)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--foreground-subtle)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="hectares"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Integrity Distribution */}
        <div
          className="rounded-xl border border-border-light bg-surface p-5"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          <h3 className="text-sm font-semibold text-foreground">
            Asset Integrity Distribution
          </h3>
          <p className="mb-4 text-xs text-foreground-muted">
            Project integrity grading across the registry
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={integrityDistribution}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border-light)"
                  vertical={false}
                />
                <XAxis
                  dataKey="grade"
                  tick={{ fontSize: 12, fill: 'var(--foreground-subtle)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--foreground-subtle)' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {integrityDistribution.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom section: Activity + Map placeholder */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Recent Activity */}
        <div
          className="lg:col-span-2 rounded-xl border border-border-light bg-surface p-5"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
          <p className="mb-4 text-xs text-foreground-muted">
            Latest actions across the registry
          </p>
          <div className="space-y-3">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-lg border border-border-light p-3 transition-colors hover:bg-surface-secondary"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${item.iconColor}18`,
                    }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: item.iconColor }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-foreground-muted line-clamp-2">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs text-foreground-subtle">
                      {item.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map Placeholder */}
        <div
          className="lg:col-span-3 rounded-xl border border-border-light bg-surface p-5"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          <h3 className="text-sm font-semibold text-foreground">
            Project Locations
          </h3>
          <p className="mb-4 text-xs text-foreground-muted">
            Geographic distribution of registered carbon projects
          </p>
          <div
            className="flex h-80 items-center justify-center rounded-lg border border-dashed border-border"
            style={{ backgroundColor: 'var(--surface-secondary)' }}
          >
            <div className="text-center">
              <MapPin className="mx-auto h-10 w-10 text-foreground-subtle" />
              <p className="mt-2 text-sm font-medium text-foreground-muted">
                Interactive Map
              </p>
              <p className="mt-1 text-xs text-foreground-subtle">
                Mapbox GL integration pending
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
