'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bell, Moon, Sun, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Map route segments to readable labels */
const segmentLabels: Record<string, string> = {
  '': 'Dashboard',
  registry: 'Registry',
  projects: 'Projects',
  credits: 'Credits',
  transfers: 'Transfers',
  retirements: 'Retirements',
  mrv: 'MRV',
  monitor: 'Satellite Monitor',
  alerts: 'Deforestation Alerts',
  'carbon-stocks': 'Carbon Stocks',
  observations: 'Observations',
  ndc: 'NDC',
  targets: 'Targets',
  emissions: 'Emissions',
  actions: 'Actions',
  progress: 'Progress',
  finance: 'Finance',
  assets: 'Carbon Assets',
  valuations: 'Valuations',
  risk: 'Risk Assessment',
  'climate-risk': 'Climate Risk',
  payments: 'Payments',
  escrow: 'Escrow',
  transactions: 'Transactions',
  'benefit-sharing': 'Benefit Sharing',
  kyc: 'KYC/AML',
  settings: 'Settings',
  users: 'Users',
  organisations: 'Organisations',
  'audit-log': 'Audit Log',
};

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const stored = localStorage.getItem('drc-theme') as 'light' | 'dark' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('drc-theme', next);
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg',
        'text-foreground-muted hover:bg-surface-secondary hover:text-foreground',
        'transition-colors duration-150'
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();

  // Build breadcrumb from pathname
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs =
    segments.length === 0
      ? [{ label: 'Dashboard', href: '/' }]
      : segments.map((seg, i) => ({
          label: segmentLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
          href: '/' + segments.slice(0, i + 1).join('/'),
        }));

  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label ?? 'Dashboard';

  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center justify-between border-b px-6 backdrop-blur-sm"
      style={{
        backgroundColor: 'var(--header-bg)',
        borderColor: 'var(--header-border)',
      }}
    >
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-1.5">
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-foreground-subtle" />
            )}
            <span
              className={cn(
                'text-sm',
                i === breadcrumbs.length - 1
                  ? 'font-semibold text-foreground'
                  : 'text-foreground-muted'
              )}
            >
              {crumb.label}
            </span>
          </div>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          className={cn(
            'relative flex h-9 w-9 items-center justify-center rounded-lg',
            'text-foreground-muted hover:bg-surface-secondary hover:text-foreground',
            'transition-colors duration-150'
          )}
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-border" />

        {/* User menu */}
        <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-secondary transition-colors duration-150">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
            JM
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-foreground">
              Jean Mukendi
            </div>
            <div className="text-xs text-foreground-muted">
              Registry Admin
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center rounded-full bg-accent-light px-2 py-0.5 text-xs font-medium text-accent">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}
