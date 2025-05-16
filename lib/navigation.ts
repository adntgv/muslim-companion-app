export const ROUTES = {
  DASHBOARD: '/dashboard',
  DAILY_PLANNER: '/daily-planner',
  PROFILE: '/profile',
  MANAGE_ACTIONS: '/manage-actions',
} as const;

export type AppRoute = keyof typeof ROUTES;
export type AppRoutePath = typeof ROUTES[AppRoute]; 