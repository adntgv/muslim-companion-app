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
  Users,
  Flame
} from 'lucide-react';
import { ROUTES } from '@/lib/navigation';
import { GROWTH_PATHS } from '@/data/growth-paths';
import { useGrowthMap } from '@/hooks/useGrowthMap';
import type { GrowthPath, PathLevel } from '@/types/growth-map';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercent?: boolean;
}

const ProgressRing = ({ progress, size = 60, strokeWidth = 4, className = "", showPercent = true }: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  const fontSize = size <= 30 ? 'text-xs' : size <= 50 ? 'text-sm' : 'text-base';

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-muted stroke-current"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary stroke-current"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
      </svg>
      <span className={`absolute ${fontSize} font-semibold tabular-nums`}>
        {progress}
        {showPercent && size > 30 && '%'}
      </span>
    </div>
  );
};

export default function GrowthMapScreen() {
  const { progress, updateLevelProgress } = useGrowthMap();

  const achievements = [
    {
      title: "Prayer Warrior",
      description: "30 days prayer streak",
      icon: Clock,
      date: "2024-01-10",
      progress: 85
    },
    {
      title: "Knowledge Seeker",
      description: "Completed Aqeedah basics",
      icon: GraduationCap,
      date: "2024-01-05",
      progress: 100
    },
    {
      title: "Community Builder",
      description: "Helped 10 others grow",
      icon: Users,
      date: "2024-01-01",
      progress: 60
    }
  ];

  const streaks = [
    { label: "Prayer Streak", count: 7, icon: Clock },
    { label: "Learning Days", count: 15, icon: BookOpen },
    { label: "Good Deeds", count: 5, icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Streaks */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Your Growth Journey</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Track your progress and plan your next steps</p>
          
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {streaks.map((streak) => (
              <Card key={streak.label} className="p-4 flex items-center gap-3 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="p-2 rounded-full bg-primary/20">
                  <streak.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-primary flex items-center gap-1">
                    {streak.count}
                    <Flame className="h-4 w-4 text-orange-500" />
                  </p>
                  <p className="text-xs text-muted-foreground">{streak.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Growth Paths */}
            {GROWTH_PATHS.map((path) => {
              const pathProgress = progress.paths.find(p => p.pathId === path.id);
              if (!pathProgress) return null;

              return (
                <Card key={path.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-6">
                    <div className="p-3 rounded-lg bg-primary/20 w-fit">
                      <path.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                        <div>
                          <h2 className="text-lg sm:text-xl font-semibold text-foreground">{path.title}</h2>
                          <p className="text-sm text-muted-foreground">{path.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <ProgressRing progress={pathProgress.overallProgress} size={50} className="hidden sm:flex" showPercent={true} />
                          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full w-fit">
                            Level {pathProgress.currentLevel}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:hidden">
                        <Progress value={pathProgress.overallProgress} className="h-2" />
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{pathProgress.overallProgress}% Complete</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {path.levels.map((level) => {
                      const levelProgress = pathProgress.levels.find(l => l.levelId === level.id);
                      if (!levelProgress) return null;

                      return (
                        <div
                          key={level.id}
                          className={`p-3 sm:p-4 rounded-lg ${
                            levelProgress.status === 'completed' ? 'bg-green-500/10' :
                            levelProgress.status === 'in-progress' ? 'bg-primary/10' :
                            'bg-muted'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              {levelProgress.status === 'completed' ? (
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5" />
                              ) : levelProgress.status === 'locked' ? (
                                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5" />
                              ) : (
                                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5" />
                              )}
                              <div>
                                <h3 className="text-sm sm:text-base font-medium text-foreground">{level.title}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">{level.description}</p>
                              </div>
                            </div>
                            
                            <div className="text-sm ml-7 sm:ml-0">
                              <Progress value={levelProgress.progress} className="w-full sm:w-24 h-1.5" />
                              <p className="text-right mt-1 text-xs sm:text-sm text-muted-foreground">
                                {levelProgress.progress}%
                              </p>
                            </div>
                          </div>
                          {level.requirements && levelProgress.status === 'locked' && (
                            <div className="mt-2 ml-7 text-xs sm:text-sm text-muted-foreground">
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
          <div className="space-y-4 sm:space-y-6">
            {/* Overall Progress */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-foreground">Overall Progress</h2>
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex flex-col items-center mb-6">
                <ProgressRing progress={55} size={120} strokeWidth={8} className="mb-4" showPercent={true} />
                <p className="text-sm font-medium text-muted-foreground">Journey Level 2</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-background p-3 rounded-lg text-center">
                  <p className="text-xl sm:text-2xl font-bold text-primary flex items-center justify-center gap-1">
                    4
                    <Target className="h-4 w-4" />
                  </p>
                  <p className="text-xs text-muted-foreground">Active Paths</p>
                </div>
                <div className="bg-background p-3 rounded-lg text-center">
                  <p className="text-xl sm:text-2xl font-bold text-green-500 flex items-center justify-center gap-1">
                    7
                    <Star className="h-4 w-4" />
                  </p>
                  <p className="text-xs text-muted-foreground">Milestones</p>
                </div>
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">Recent Achievements</h2>
              <div className="space-y-3 sm:space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.title} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="relative">
                      <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
                        <achievement.icon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      </div>
                      {achievement.progress === 100 && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                          <CheckCircle className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm sm:text-base font-medium text-foreground">{achievement.title}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        <ProgressRing progress={achievement.progress} size={30} strokeWidth={3} showPercent={false} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Next Steps */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">Recommended Focus</h2>
              <div className="space-y-2 sm:space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-sm h-auto py-2"
                  asChild
                >
                  <Link href={ROUTES.LEARNING_CENTER}>
                    <span>Complete Aqeedah Course</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-sm h-auto py-2"
                  asChild
                >
                  <Link href={ROUTES.LEARNING_CENTER}>
                    <span>Practice Khushu in Prayer</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-sm h-auto py-2"
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