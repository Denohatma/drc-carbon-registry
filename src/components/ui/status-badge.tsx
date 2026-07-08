const presets: Record<string, string> = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  verified: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  authorised: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  'pending baseline': 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400',
  'under review': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  scheduled: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400',
  expired: 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400',
  retired: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  transferred: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  deposit: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  release: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  refund: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  community_payout: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  developer_disbursement: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  feasibility: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400',
  'due diligence': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  negotiation: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  concept: 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400',
  validation: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
};

const fallback = 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colors = presets[status.toLowerCase()] || fallback;
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors} ${className || ''}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
