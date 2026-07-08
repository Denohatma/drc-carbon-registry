'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Coins,
  ArrowRightLeft,
  Leaf,
  Satellite,
  AlertTriangle,
  TreePine,
  Eye,
  Target,
  BarChart3,
  Zap,
  TrendingUp,
  Wallet,
  LineChart,
  ShieldAlert,
  ThermometerSun,
  Lock,
  Receipt,
  Users2,
  Fingerprint,
  Settings,
  Building2,
  FileSearch,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard },
      { label: 'Prospective Pipeline', href: '/pipeline', icon: TrendingUp },
      { label: 'Admin', href: '/admin', icon: Settings },
      { label: 'Matchmaking', href: '/matchmaking', icon: Sparkles },
    ],
  },
  {
    title: 'Registry',
    items: [
      { label: 'Projects', href: '/registry/projects', icon: FolderKanban },
      { label: 'Credits', href: '/registry/credits', icon: Coins },
      { label: 'Transfers', href: '/registry/transfers', icon: ArrowRightLeft },
      { label: 'Retirements', href: '/registry/retirements', icon: Leaf },
    ],
  },
  {
    title: 'MRV',
    items: [
      { label: 'Satellite Monitor', href: '/mrv/monitor', icon: Satellite },
      { label: 'Deforestation Alerts', href: '/mrv/alerts', icon: AlertTriangle },
      { label: 'Carbon Stocks', href: '/mrv/carbon-stocks', icon: TreePine },
      { label: 'Observations', href: '/mrv/observations', icon: Eye },
    ],
  },
  {
    title: 'NDC',
    items: [
      { label: 'Targets', href: '/ndc/targets', icon: Target },
      { label: 'Emissions', href: '/ndc/emissions', icon: BarChart3 },
      { label: 'Actions', href: '/ndc/actions', icon: Zap },
      { label: 'Progress', href: '/ndc/progress', icon: TrendingUp },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Carbon Assets', href: '/finance/assets', icon: Wallet },
      { label: 'Valuations', href: '/finance/valuations', icon: LineChart },
      { label: 'Risk Assessment', href: '/finance/risk', icon: ShieldAlert },
      { label: 'Climate Risk', href: '/finance/climate-risk', icon: ThermometerSun },
    ],
  },
  {
    title: 'Payments',
    items: [
      { label: 'Escrow', href: '/payments/escrow', icon: Lock },
      { label: 'Transactions', href: '/payments/transactions', icon: Receipt },
      { label: 'Benefit Sharing', href: '/payments/benefit-sharing', icon: Users2 },
      { label: 'KYC/AML', href: '/payments/kyc', icon: Fingerprint },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Users', href: '/settings/users', icon: Settings },
      { label: 'Organisations', href: '/settings/organisations', icon: Building2 },
      { label: 'Audit Log', href: '/settings/audit-log', icon: FileSearch },
    ],
  },
];

function NavSectionGroup({
  section,
  pathname,
}: {
  section: NavSection;
  pathname: string;
}) {
  const hasActiveItem = section.items.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/')
  );
  const [isOpen, setIsOpen] = useState(hasActiveItem || section.title === 'Overview');

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider',
          'transition-colors duration-150',
          'hover:text-[var(--sidebar-active-fg)]',
          isOpen ? 'text-[var(--sidebar-fg)]' : 'text-[var(--sidebar-fg-muted)]'
        )}
      >
        {section.title}
        {isOpen ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </button>

      {isOpen && (
        <div className="mt-0.5 space-y-0.5">
          {section.items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href + '/'));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                  'transition-all duration-150',
                  isActive
                    ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-fg)]'
                    : 'text-[var(--sidebar-fg-muted)] hover:bg-[var(--sidebar-hover-bg)] hover:text-[var(--sidebar-fg)]'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r"
      style={{
        backgroundColor: 'var(--sidebar-bg)',
        borderColor: 'var(--sidebar-border)',
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ borderBottom: '1px solid var(--sidebar-border)' }}
      >
        <div className="flex items-center gap-1.5 shrink-0">
          <img src="/drc-flag.svg" alt="DRC Flag" className="h-7 w-9 rounded shadow-sm object-cover" />
          <img src="/equity-bcdc.png" alt="Equity BCDC" className="h-7 brightness-200 opacity-90" />
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: 'var(--sidebar-fg)' }}>
            DRC Carbon Registry
          </div>
          <div className="text-xs" style={{ color: 'var(--sidebar-fg-muted)' }}>
            AfCEN × Equity BCDC
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navigation.map((section) => (
          <NavSectionGroup
            key={section.title}
            section={section}
            pathname={pathname}
          />
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-4 py-3"
        style={{
          borderTop: '1px solid var(--sidebar-border)',
          color: 'var(--sidebar-fg-muted)',
        }}
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <img src="/equity-bcdc.png" alt="Equity BCDC" className="h-7 opacity-80 brightness-200" />
          <div className="flex items-center gap-2">
            <img src="/afcen-logo.svg" alt="AfCEN" className="h-5 brightness-200 opacity-90" />
          </div>
          <div className="text-xs opacity-60">Powered by AfCEN</div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>v1.0.0</span>
          <span>DRC-MoE</span>
        </div>
      </div>
    </aside>
  );
}
