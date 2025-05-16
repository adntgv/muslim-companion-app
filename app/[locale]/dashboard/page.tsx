"use client";

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing'; // We need Link for the Daily Planner button
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress'; // Progress might be removed or used differently
import {
  Sun, // Keep for potential theming or simple icons
  Moon, // Keep for potential theming or simple icons
  BookOpen, // Example, may change based on actual actions
  CheckCircle,
  Loader2,
  ListChecks, // For configured actions
  Repeat // For streaks
} from 'lucide-react';
import { ROUTES } from '@/lib/navigation'; // We need ROUTES for the Daily Planner link
import { useUser } from '@/hooks/useUser';
// import { tasksService, type Task } from '@/services/tasks'; // To be replaced with new services

// Placeholder types - these will eventually come from a central types file
interface UserDailyActionConfig {
  id: string;
  title: string;
  description?: string;
  type: 'daily_ritual' | 'habit_building';
  // We'll need an icon mapping or simpler icons
}

interface DailyLog {
  actionConfigId: string;
  date: string; // YYYY-MM-DD
  status: 'completed' | 'missed' | 'pending';
}

interface UserProgress {
  streaks: Record<string, { current: number; longest: number }>; // Keyed by actionConfigId
}

interface DisplayableAction extends UserDailyActionConfig {
  logStatus: 'completed' | 'missed' | 'pending';
  currentStreak: number;
  longestStreak: number;
}

// Simplified getIcon, may be removed or changed
function getActionIcon(actionType: 'daily_ritual' | 'habit_building') {
  switch (actionType) {
    case 'daily_ritual': return BookOpen; // Example
    case 'habit_building': return Repeat; // Example
    default: return ListChecks;
  }
}

export default function Dashboard() {
  const [configuredActions, setConfiguredActions] = useState<DisplayableAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: userLoading } = useUser();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    async function loadUserActionsAndProgress() {
      if (!user?.userId || userLoading) return;

      try {
        setIsLoading(true);
        // --- TODO: Replace with actual service calls ---
        // 1. Fetch UserDailyActionConfig items for the user
        // const userConfigs: UserDailyActionConfig[] = await newConfigService.getUserConfigs(user.userId);
        // 2. Fetch DailyLog entries for today for these configs
        // const dailyLogs: DailyLog[] = await newLogService.getLogsForDate(user.userId, today, userConfigs.map(c => c.id));
        // 3. Fetch UserProgress (streaks)
        // const userProgress: UserProgress = await newProgressService.getUserProgress(user.userId);

        // --- Mock data for now ---
        const mockConfigs: UserDailyActionConfig[] = [
          { id: '1', title: "Fajr Prayer", type: 'daily_ritual' },
          { id: '2', title: "Read 1 Page Quran", type: 'habit_building' },
          { id: '3', title: "Morning Dhikr", type: 'daily_ritual', description: "Recite morning supplications" },
        ];
        const mockLogs: DailyLog[] = [
          { actionConfigId: '1', date: today, status: 'completed' },
          { actionConfigId: '2', date: today, status: 'pending' },
        ];
        const mockProgress: UserProgress = {
          streaks: {
            '1': { current: 5, longest: 10 },
            '2': { current: 2, longest: 2 },
            '3': { current: 0, longest: 0 },
          }
        };
        // --- End Mock data ---

        // Combine data for display
        const displayActions: DisplayableAction[] = mockConfigs.map(config => {
          const log = mockLogs.find(l => l.actionConfigId === config.id);
          const streakData = mockProgress.streaks[config.id] || { current: 0, longest: 0 };
          return {
            ...config,
            logStatus: log?.status || 'pending',
            currentStreak: streakData.current,
            longestStreak: streakData.longest,
          };
        });

        setConfiguredActions(displayActions);
      } catch (error) {
        console.error('Error loading user actions:', error);
        // TODO: Add user-friendly error display
      } finally {
        setIsLoading(false);
      }
    }

    if (!userLoading && user) {
      loadUserActionsAndProgress();
    } else if (!userLoading && !user) {
      setIsLoading(false); // Not loading if no user
    }
  }, [user?.userId, today, userLoading, user]);

  const handleActionToggle = async (actionConfigId: string, currentStatus: 'completed' | 'pending' | 'missed') => {
    if (!user?.userId) return;
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed'; // Simplified toggle

    try {
      // --- TODO: Replace with actual service call to update DailyLog ---
      // await newLogService.updateLogStatus(user.userId, actionConfigId, today, newStatus);
      console.log(`Toggling action ${actionConfigId} to ${newStatus}`);

      // Update local state for immediate feedback
      setConfiguredActions(prevActions =>
        prevActions.map(action =>
          action.id === actionConfigId ? { ...action, logStatus: newStatus } : action
        )
      );
      // Note: Streak updates would typically happen on the backend or via a separate refresh
    } catch (error) {
      console.error('Error updating action status:', error);
      // TODO: Revert optimistic update and show error
    }
  };

  if (userLoading || (isLoading && user)) { // Show loader if user exists and still loading their data
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-lg">Loading your actions...</span>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
            <Card className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Welcome to Falah</h2>
                <p className="text-muted-foreground mb-6">Please log in or register to track your daily rituals and build habits.</p>
                {/* TODO: Add Login/Register buttons here, linking to ROUTES.LOGIN and ROUTES.REGISTER */}
                {/* Example: <Button asChild><Link href={ROUTES.LOGIN}>Login</Link></Button> */}
            </Card>
        </div>
    );
  }

  // Get current date for display
  const displayDate = new Date().toLocaleDateString(undefined, { // Use client's locale for date display
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Assalamu Alaikum, {user.name || 'User'}!</h1>
            <p className="text-muted-foreground mt-1 sm:mt-2">{displayDate}</p>
          </div>
          {/* Removed Growth Map Button. Consider adding a link to configuration page later */}
        </div>

        {/* Daily Actions List */}
        <Card className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl font-semibold">Your Daily Actions</h2>
              <p className="text-muted-foreground text-sm">Track your configured rituals and habits for today.</p>
            </div>
          </div>
          {configuredActions.length === 0 && !isLoading && (
            <div className="text-center py-6">
              <ListChecks className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium mb-1">No actions configured yet.</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Visit the Daily Planner to set up your rituals and habits.
              </p>
              <Button variant="outline" asChild>
                <Link href={ROUTES.DAILY_PLANNER}>Configure Actions</Link>
              </Button>
            </div>
          )}
          <div className="space-y-3 sm:space-y-4">
            {configuredActions.map((action) => {
              const IconComponent = getActionIcon(action.type);
              return (
                <div
                  key={action.id}
                  className={`p-3 sm:p-4 rounded-lg transition-colors ${
                    action.logStatus === 'completed' ? 'bg-green-500/10 hover:bg-green-500/20' :
                    'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`p-2 rounded-lg ${
                        action.logStatus === 'completed' ? 'bg-green-500/20' : 'bg-primary/10'
                      }`}>
                        <IconComponent className={`h-5 w-5 ${action.logStatus === 'completed' ? 'text-green-600' : 'text-primary'}`} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-foreground">{action.title}</h3>
                        {action.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                           <Repeat className="h-3 w-3 text-blue-500" />
                           <span className="text-xs text-muted-foreground">
                             Streak: {action.currentStreak} days (Max: {action.longestStreak})
                           </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={action.logStatus === 'completed' ? 'outline' : 'default'}
                      onClick={() => handleActionToggle(action.id, action.logStatus)}
                      className={`w-[90px] sm:w-[100px] ${action.logStatus === 'completed' ? 'border-green-500 text-green-600 hover:bg-green-500/10 hover:text-green-700' : ''}`}
                    >
                      {action.logStatus === 'completed' ? (
                        <CheckCircle className="h-4 w-4 mr-1.5 sm:mr-2" />
                      ) : null}
                      {action.logStatus === 'completed' ? 'Done' : 'Mark Done'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Footer or other sections can be added later if needed */}
        {/* E.g., a summary of completed actions, link to weekly view, etc. */}

      </div>
    </div>
  );
}
