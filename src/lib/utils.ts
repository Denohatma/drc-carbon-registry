import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names with clsx.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format a number with locale-aware thousands separators.
 * Optionally specify decimal places.
 */
export function formatNumber(
  value: number,
  options?: { decimals?: number; compact?: boolean }
): string {
  if (options?.compact) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: options.decimals ?? 1,
    }).format(value);
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: options?.decimals ?? 0,
    maximumFractionDigits: options?.decimals ?? 0,
  }).format(value);
}

/**
 * Format a number as USD currency.
 */
export function formatCurrency(
  value: number,
  currency = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a Date (or ISO string) to a human-readable date string.
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
}
