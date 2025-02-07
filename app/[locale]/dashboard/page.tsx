"use client";

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Sun,
  Moon,
  BookOpen,
  Heart,
  Target,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  ChevronRight,
  AlertCircle,
  Calendar,
  Loader2
} from 'lucide-react';
import { ROUTES } from '@/lib/navigation';
import type { IconName } from '@/components/Icon';
import { useUser } from '@/hooks/useUser';
import { tasksService, type Task } from '@/services/tasks';

function getIconComponent(name: IconName) {
  switch (name) {
    case 'Sun': return Sun;
    case 'Moon': return Moon;
    case 'BookOpen': return BookOpen;
    case 'Target': return Target;
    case 'Clock': return Clock;
    case 'Heart': return Heart;
    case 'Star': return Star;
    case 'AlertCircle': return AlertCircle;
    case 'TrendingUp': return TrendingUp;
    default: return Sun; // Fallback icon
  }
}

const DEFAULT_TASKS = [
  {
    title: "Morning Adhkar",
    category: "Daily Worship",
    time: "6:00 AM",
    status: "upcoming" as const,
    iconName: 'Sun' as IconName,
    priority: "high" as const
  },
  {
    title: "Read Quran (2 pages)",
    category: "Quran",
    time: "7:00 AM",
    status: "upcoming" as const,
    iconName: 'BookOpen' as IconName,
    priority: "high" as const
  },
  {
    title: "Watch Aqeedah Lesson",
    category: "Knowledge",
    time: "2:00 PM",
    status: "upcoming" as const,
    iconName: 'Target' as IconName,
    priority: "medium" as const
  },
  {
    title: "Evening Reflection",
    category: "Growth",
    time: "8:30 PM",
    status: "upcoming" as const,
    iconName: 'Moon' as IconName,
    priority: "medium" as const
  }
];

export default function Dashboard() {
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: userLoading } = useUser();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    async function loadTasks() {
      if (!user?.$id) return;

      try {
        setIsLoading(true);
        const tasks = await tasksService.getUserDailyTasks(user.$id, today);
        
        if (tasks.length === 0) {
          // If no tasks exist for today, create default tasks
          const newTasks = await tasksService.createDefaultTasks(user.$id, today, DEFAULT_TASKS);
          setDailyTasks(newTasks);
        } else {
          setDailyTasks(tasks);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!userLoading) {
      loadTasks();
    }
  }, [user?.$id, today, userLoading]);

  const handleTaskComplete = async (taskId: string) => {
    try {
      const updatedTask = await tasksService.updateTaskStatus(taskId, 'completed');
      setDailyTasks(prevTasks => 
        prevTasks.map(task => task.$id === taskId ? updatedTask : task)
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const growthAreas = [
    {
      area: "Prayer Excellence",
      progress: 75,
      nextTask: "Focus on Khushu",
      iconName: 'Clock' as IconName
    },
    {
      area: "Quran Connection",
      progress: 45,
      nextTask: "Complete Today's Reading",
      iconName: 'BookOpen' as IconName
    },
    {
      area: "Character Growth",
      progress: 60,
      nextTask: "Practice Patience",
      iconName: 'Heart' as IconName
    }
  ];

  const insights = [
    {
      type: "achievement",
      title: "Prayer Streak",
      description: "5 days of praying all prayers on time!",
      iconName: 'Star' as IconName
    },
    {
      type: "suggestion",
      title: "Recommended Focus",
      description: "Your Asr prayer timing needs attention",
      iconName: 'AlertCircle' as IconName
    },
    {
      type: "progress",
      title: "Knowledge Growth",
      description: "Completed 3 lessons this week",
      iconName: 'TrendingUp' as IconName
    }
  ];

  if (userLoading || isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="ml-2">Loading tasks...</span>
    </div>;
  }

  if (!user) {
    return <div>Please log in to view your tasks</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assalamu Alaikum!</h1>
            <p className="text-muted-foreground mt-2">Monday, 15 January 2024</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            asChild
          >
            <Link href={ROUTES.GROWTH_MAP}>
              <Calendar className="h-4 w-4" />
              View Growth Map
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Tasks */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Today's Tasks</h2>
                  <p className="text-gray-600">Your personalized growth plan</p>
                </div>
              </div>
              <div className="space-y-4">
                {dailyTasks.map((task) => {
                  const Icon = getIconComponent(task.iconName as IconName);
                  return (
                    <div
                      key={task.$id}
                      className={`p-4 rounded-lg ${
                        task.status === 'completed' ? 'bg-green-500/10' :
                        task.status === 'upcoming' ? 'bg-yellow-500/10' : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            task.status === 'completed' ? 'bg-green-500/20' :
                            task.status === 'upcoming' ? 'bg-yellow-500/20' : 'bg-muted'
                          }`}>
                            <Icon className="h-5 w-5 text-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{task.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-muted-foreground">{task.time}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                task.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                                'bg-primary/10 text-primary'
                              }`}>
                                {task.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Button 
                            size="sm" 
                            variant={task.status === 'upcoming' ? 'default' : 'outline'}
                            onClick={() => handleTaskComplete(task.$id)}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Growth Areas */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Growth Areas</h2>
              <div className="space-y-4">
                {growthAreas.map((area) => {
                  const Icon = getIconComponent(area.iconName);
                  return (
                    <div key={area.area} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{area.area}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{area.progress}%</span>
                      </div>
                      <Progress value={area.progress} />
                      <p className="text-sm text-muted-foreground">Next: {area.nextTask}</p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Insights */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Insights</h2>
              <div className="space-y-4">
                {insights.map((insight) => {
                  const Icon = getIconComponent(insight.iconName);
                  return (
                    <div
                      key={`${insight.type}-${insight.title}`}
                      className={`p-3 rounded-lg ${
                        insight.type === 'achievement' ? 'bg-green-500/10' :
                        insight.type === 'suggestion' ? 'bg-yellow-500/10' : 'bg-primary/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          insight.type === 'achievement' ? 'bg-green-500/20' :
                          insight.type === 'suggestion' ? 'bg-yellow-500/20' : 'bg-primary/20'
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            insight.type === 'achievement' ? 'text-green-500' :
                            insight.type === 'suggestion' ? 'text-yellow-500' : 'text-primary'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{insight.title}</p>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  asChild
                >
                  <Link href={ROUTES.REFLECTION_JOURNAL}>
                    <span>Daily Reflection</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  asChild
                >
                  <Link href={ROUTES.LEARNING_CENTER}>
                    <span>Continue Learning</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  asChild
                >
                  <Link href={ROUTES.COMMUNITY}>
                    <span>Join Community</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 