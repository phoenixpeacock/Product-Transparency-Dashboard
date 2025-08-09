import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

// Date formatting utilities
export const formatDate = (date: Date | string | null): string => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) return 'Invalid date';
  
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatDateTime = (date: Date | string | null): string => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) return 'Invalid date';
  
  return format(dateObj, 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date: Date | string | null): string => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) return 'Invalid date';
  
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

// Number formatting utilities
export const formatNumber = (num: number | null): string => {
  if (num === null || num === undefined) return '0';
  
  return num.toLocaleString();
};

export const formatCurrency = (amount: number | null, currency = 'USD'): string => {
  if (amount === null || amount === undefined) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPercentage = (value: number | null, decimals = 1): string => {
  if (value === null || value === undefined) return '0%';
  
  return `${value.toFixed(decimals)}%`;
};

// Text formatting utilities
export const truncateText = (text: string | null, maxLength = 100): string => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return `${text.substring(0, maxLength).trim()}...`;
};

export const capitalizeFirst = (text: string | null): string => {
  if (!text) return '';
  
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatProductName = (name: string | null): string => {
  if (!name) return 'Untitled Product';
  
  return name.trim() || 'Untitled Product';
};

// Status formatting utilities
export const getStatusColor = (status: string | null): string => {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    active: 'bg-blue-100 text-blue-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-yellow-100 text-yellow-800',
    deleted: 'bg-red-100 text-red-800',
  };
  
  return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

export const getScoreColor = (score: number | null): string => {
  if (score === null || score === undefined) return 'text-gray-500';
  
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 60) return 'text-orange-600';
  return 'text-red-600';
};

export const formatScore = (score: number | null): string => {
  if (score === null || score === undefined) return 'N/A';
  
  return Math.round(score).toString();
};