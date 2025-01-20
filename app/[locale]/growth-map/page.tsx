'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Heart,
  Star,
  Target,
  Award,
  TrendingUp,
  ChevronRight,
  Lock,
  CheckCircle,
  Clock,
  GraduationCap,
  Scroll,
  Users
} from 'lucide-react';
import { ROUTES } from '@/lib/navigation';
import { GROWTH_PATHS } from '@/data/growth-paths';
import { useGrowthMap } from '@/hooks/useGrowthMap';
import type { GrowthPath, PathLevel } from '@/types/growth-map';

export default function GrowthMapScreen() {
  const { progress, updateLevelProgress } = useGrowthMap();

  const achievements = [
    {
      title: "Prayer Warrior",
      description: "30 days prayer streak",
      icon: Clock,
      date: "2024-01-10"
    },
    {
      title: "Knowledge Seeker",
      description: "Completed Aqeedah basics",
      icon: GraduationCap,
      date: "2024-01-05"
    },
    {
      title: "Community Builder",
      description: "Helped 10 others grow",
      icon: Users,
      date: "2024-01-01"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Growth Journey</h1>
          <p className="text-gray-600 mt-2">Track your progress and plan your next steps</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Growth Paths */}
            {GROWTH_PATHS.map((path) => {
              const pathProgress = progress.paths.find(p => p.pathId === path.id);
              if (!pathProgress) return null;

              return (
                <Card key={path.id} className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <path.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground">{path.title}</h2>
                          <p className="text-muted-foreground">{path.description}</p>
                        </div>
                        <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          Level {pathProgress.currentLevel}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Progress value={pathProgress.overallProgress} />
                        <p className="text-sm text-muted-foreground mt-1">{pathProgress.overallProgress}% Complete</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {path.levels.map((level) => {
                      const levelProgress = pathProgress.levels.find(l => l.levelId === level.id);
                      if (!levelProgress) return null;

                      return (
                        <div
                          key={level.id}
                          className={`p-4 rounded-lg ${
                            levelProgress.status === 'completed' ? 'bg-green-500/10' :
                            levelProgress.status === 'in-progress' ? 'bg-primary/10' :
                            'bg-muted'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {levelProgress.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : levelProgress.status === 'locked' ? (
                                <Lock className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <Target className="h-5 w-5 text-primary" />
                              )}
                              <div>
                                <h3 className="font-medium text-foreground">{level.title}</h3>
                                <p className="text-sm text-muted-foreground">{level.description}</p>
                              </div>
                            </div>
                            {levelProgress.status !== 'locked' && (
                              <div className="text-sm">
                                <Progress value={levelProgress.progress} className="w-24" />
                                <p className="text-right mt-1 text-muted-foreground">
                                  {levelProgress.progress}%
                                </p>
                              </div>
                            )}
                          </div>
                          {level.requirements && levelProgress.status === 'locked' && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              <p className="font-medium">Requirements:</p>
                              <ul className="list-disc list-inside mt-1">
                                {level.requirements.map((req: string, idx: number) => (
                                  <li key={idx}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Overall Progress */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Overall Progress</h2>
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Journey Progress</span>
                    <span className="text-muted-foreground">Level 2</span>
                  </div>
                  <Progress value={55} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-background p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">4</p>
                    <p className="text-xs text-muted-foreground">Active Paths</p>
                  </div>
                  <div className="bg-background p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-500">7</p>
                    <p className="text-xs text-muted-foreground">Milestones</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.title} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <achievement.icon className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Next Steps */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recommended Focus</h2>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  asChild
                >
                  <Link href={ROUTES.LEARNING_CENTER}>
                    <span>Complete Aqeedah Course</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  asChild
                >
                  <Link href={ROUTES.LEARNING_CENTER}>
                    <span>Practice Khushu in Prayer</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  asChild
                >
                  <Link href={ROUTES.COMMUNITY}>
                    <span>Join Prayer Challenge</span>
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