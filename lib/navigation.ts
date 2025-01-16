export const ROUTES = {
  ASSESSMENT: '/assessment',
  DASHBOARD: '/dashboard',
  GROWTH_MAP: '/growth-map',
  LEARNING_CENTER: '/learning-center',
  REFLECTION_JOURNAL: '/reflection-journal',
  COMMUNITY: '/community',
} as const;

export type AppRoute = keyof typeof ROUTES;
export type AppRoutePath = typeof ROUTES[AppRoute]; 