'use client';

import { useState, useEffect } from 'react';
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
  Menu,
  X,
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
    title: 'ADMIN',
    items: [
      { label: 'Project Queries', href: '/admin', icon: Settings },
    ],
  },
  {
    title: 'Matchmaking',
    items: [
      { label: 'AI Matchmaking', href: '/matchmaking', icon: Sparkles },
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
  onNavigate,
}: {
  section: NavSection;
  pathname: string;
  onNavigate?: () => void;
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
                onClick={onNavigate}
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

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ borderBottom: '1px solid var(--sidebar-border)' }}
      >
        <img src="/drc-flag.svg" alt="DRC Flag" className="h-7 w-9 rounded shadow-sm object-cover shrink-0" />
        <div className="text-sm font-semibold" style={{ color: 'var(--sidebar-fg)' }}>
          DRC Carbon Registry
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navigation.map((section) => (
          <NavSectionGroup
            key={section.title}
            section={section}
            pathname={pathname}
            onNavigate={onNavigate}
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
        <div className="flex items-center justify-between text-xs">
          <span>v1.0.0</span>
          <span>DRC-MoE</span>
        </div>
      </div>
    </>
  );
}

export function MobileMenuButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('toggle-sidebar'))}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground-muted hover:bg-surface-secondary hover:text-foreground transition-colors lg:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setMobileOpen((prev) => !prev);
    window.addEventListener('toggle-sidebar', handler);
    return () => window.removeEventListener('toggle-sidebar', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-30 hidden lg:flex w-64 flex-col border-r"
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          borderColor: 'var(--sidebar-border)',
        }}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <aside
            className="absolute inset-y-0 left-0 flex w-72 flex-col"
            style={{ backgroundColor: 'var(--sidebar-bg)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-3 top-3 z-10">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: 'var(--sidebar-fg-muted)' }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
