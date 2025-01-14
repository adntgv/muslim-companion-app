declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
};

// Predefined event names for consistency
export const ANALYTICS_EVENTS = {
  // Authentication events
  LOGIN: 'login',
  SIGNUP: 'signup',
  LOGOUT: 'logout',
  
  // Prayer tracking
  PRAYER_TRACKED: 'prayer_tracked',
  PRAYER_STREAK_ACHIEVED: 'prayer_streak_achieved',
  
  // Navigation
  LANGUAGE_CHANGED: 'language_changed',
  PAGE_VIEW: 'page_view',
  
  // Quran interaction
  QURAN_READ: 'quran_read',
  BOOKMARK_ADDED: 'bookmark_added',
  
  // Settings
  SETTINGS_CHANGED: 'settings_changed',
  NOTIFICATION_TOGGLED: 'notification_toggled',
  
  // Social
  LEADERBOARD_VIEWED: 'leaderboard_viewed',
  PROFILE_VIEWED: 'profile_viewed',
} as const; 