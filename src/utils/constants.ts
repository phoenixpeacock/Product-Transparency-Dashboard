// Application constants
export const APP_NAME = 'Producer AI';
export const APP_DESCRIPTION = 'Smart feedback for better products';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  PRODUCTS: {
    BASE: '/products',
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    GET_ONE: (id: string) => `/products/${id}`,
  },
  AI: {
    ANALYZE: '/ai/analyze',
    FEEDBACK: (id: string) => `/ai/feedback/${id}`,
  }
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  { value: 'technology', label: 'Technology', color: 'bg-blue-100 text-blue-800' },
  { value: 'healthcare', label: 'Healthcare', color: 'bg-green-100 text-green-800' },
  { value: 'education', label: 'Education', color: 'bg-purple-100 text-purple-800' },
  { value: 'entertainment', label: 'Entertainment', color: 'bg-pink-100 text-pink-800' },
  { value: 'finance', label: 'Finance', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'lifestyle', label: 'Lifestyle', color: 'bg-indigo-100 text-indigo-800' },
] as const;

// Pricing Models
export const PRICING_MODELS = [
  { value: 'free', label: 'Free', description: 'No cost to users' },
  { value: 'freemium', label: 'Freemium', description: 'Free basic, paid premium' },
  { value: 'subscription', label: 'Subscription', description: 'Recurring payments' },
  { value: 'one-time', label: 'One-time Purchase', description: 'Single payment' },
] as const;

// Timeline Options
export const TIMELINE_OPTIONS = [
  { value: '1-month', label: '1 Month', color: 'bg-red-100 text-red-800' },
  { value: '3-months', label: '3 Months', color: 'bg-yellow-100 text-yellow-800' },
  { value: '6-months', label: '6 Months', color: 'bg-blue-100 text-blue-800' },
  { value: '12-months', label: '12 Months', color: 'bg-green-100 text-green-800' },
] as const;

// Product Statuses
export const PRODUCT_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  { value: 'active', label: 'Active', color: 'bg-blue-100 text-blue-800' },
  { value: 'published', label: 'Published', color: 'bg-green-100 text-green-800' },
  { value: 'archived', label: 'Archived', color: 'bg-yellow-100 text-yellow-800' },
] as const;

// Score Thresholds
export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  VERY_GOOD: 80,
  GOOD: 70,
  FAIR: 60,
  POOR: 0,
};

// Score Labels
export const SCORE_LABELS = {
  EXCELLENT: 'Excellent',
  VERY_GOOD: 'Very Good',
  GOOD: 'Good',
  FAIR: 'Fair',
  POOR: 'Needs Improvement',
};

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  DOCUMENT_MAX_SIZE: 25 * 1024 * 1024, // 25MB
  IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme',
  FORM_DRAFT: 'formDraft',
};

// Default Values
export const DEFAULT_VALUES = {
  PAGINATION_LIMIT: 10,
  DEBOUNCE_DELAY: 300,
  AUTO_SAVE_DELAY: 2000,
  TOAST_DURATION: 4000,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type.',
  REQUIRED_FIELD: 'This field is required.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  PRODUCT_CREATED: 'Product created successfully!',
  PRODUCT_UPDATED: 'Product updated successfully!',
  PRODUCT_DELETED: 'Product deleted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
};

// Feature Flags (for development)
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_REAL_TIME_UPDATES: false,
  ENABLE_ADVANCED_FILTERS: true,
};