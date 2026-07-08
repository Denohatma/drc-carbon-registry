interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  sub: string;
}

export function StatCard({ label, value, icon: Icon, sub }: StatCardProps) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{label}</span>
        <Icon className="w-4 h-4 text-[var(--accent)]" />
      </div>
      <div className="text-2xl font-bold text-[var(--text)]">{value}</div>
      <div className="text-xs text-[var(--text-muted)] mt-1">{sub}</div>
    </div>
  );
}
