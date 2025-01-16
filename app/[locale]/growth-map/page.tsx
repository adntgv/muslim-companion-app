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

interface PathLevel {
  title: string;
  description: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'locked';
  requirements?: string[];
}

interface GrowthPath {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  currentLevel: number;
  levels: PathLevel[];
  overallProgress: number;
}

export default function GrowthMapScreen() {
  const growthPaths: GrowthPath[] = [
    {
      id: 'prayers',
      title: "Prayer Excellence",
      description: "Master the art of prayer and khushu",
      icon: Clock,
      category: "Core Practices",
      currentLevel: 2,
      overallProgress: 65,
      levels: [
        {
          title: "5 Daily Prayers",
          description: "Establish consistency in obligatory prayers",
          progress: 100,
          status: 'completed'
        },
        {
          title: "Prayer Quality",
          description: "Develop khushu and understanding",
          progress: 60,
          status: 'in-progress',
          requirements: ['Complete all daily prayers on time for 30 days']
        },
        {
          title: "Sunnah Prayers",
          description: "Incorporate regular sunnah prayers",
          progress: 0,
          status: 'locked',
          requirements: ['Master prayer quality', 'Maintain 90% prayer consistency']
        }
      ]
    },
    {
      id: 'quran',
      title: "Quran Connection",
      description: "Build a strong relationship with the Quran",
      icon: BookOpen,
      category: "Core Practices",
      currentLevel: 1,
      overallProgress: 45,
      levels: [
        {
          title: "Daily Reading",
          description: "Establish daily Quran reading habit",
          progress: 75,
          status: 'in-progress'
        },
        {
          title: "Tajweed Mastery",
          description: "Learn and apply tajweed rules",
          progress: 0,
          status: 'locked',
          requirements: ['Complete daily reading for 40 days']
        },
        {
          title: "Understanding & Reflection",
          description: "Study translation and tafsir",
          progress: 0,
          status: 'locked',
          requirements: ['Master tajweed rules', 'Complete basic Arabic course']
        }
      ]
    },
    {
      id: 'knowledge',
      title: "Islamic Knowledge",
      description: "Build a strong foundation in Islamic sciences",
      icon: GraduationCap,
      category: "Learning",
      currentLevel: 1,
      overallProgress: 30,
      levels: [
        {
          title: "Basic Aqeedah",
          description: "Learn fundamental beliefs",
          progress: 90,
          status: 'in-progress'
        },
        {
          title: "Fiqh of Worship",
          description: "Study rules of Islamic practices",
          progress: 0,
          status: 'locked',
          requirements: ['Complete basic aqeedah course']
        },
        {
          title: "Advanced Studies",
          description: "Deep dive into Islamic sciences",
          progress: 0,
          status: 'locked',
          requirements: ['Master fiqh of worship', 'Complete intermediate level']
        }
      ]
    },
    {
      id: 'character',
      title: "Character Excellence",
      description: "Develop noble character traits",
      icon: Heart,
      category: "Personal Growth",
      currentLevel: 2,
      overallProgress: 70,
      levels: [
        {
          title: "Core Values",
          description: "Establish basic Islamic character",
          progress: 100,
          status: 'completed'
        },
        {
          title: "Advanced Traits",
          description: "Develop patience and gratitude",
          progress: 65,
          status: 'in-progress',
          requirements: ['Practice core values for 30 days']
        },
        {
          title: "Leadership Qualities",
          description: "Become a positive influence",
          progress: 0,
          status: 'locked',
          requirements: ['Master advanced traits', 'Complete mentorship program']
        }
      ]
    }
  ];

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
    <div className="min-h-screen bg-gray-50 p-6">
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
            {growthPaths.map((path) => (
              <Card key={path.id} className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <path.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold">{path.title}</h2>
                        <p className="text-gray-600">{path.description}</p>
                      </div>
                      <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        Level {path.currentLevel}
                      </span>
                    </div>
                    <div className="mt-2">
                      <Progress value={path.overallProgress} />
                      <p className="text-sm text-gray-600 mt-1">{path.overallProgress}% Complete</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {path.levels.map((level, index) => (
                    <div
                      key={level.title}
                      className={`p-4 rounded-lg ${
                        level.status === 'completed' ? 'bg-green-50' :
                        level.status === 'in-progress' ? 'bg-blue-50' :
                        'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {level.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : level.status === 'locked' ? (
                            <Lock className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Target className="h-5 w-5 text-blue-600" />
                          )}
                          <div>
                            <h3 className="font-medium">{level.title}</h3>
                            <p className="text-sm text-gray-600">{level.description}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">
                          Level {index + 1}
                        </span>
                      </div>
                      {level.status !== 'locked' && (
                        <>
                          <Progress value={level.progress} className="mt-2" />
                          <p className="text-sm text-gray-600 mt-1">
                            {level.progress}% Complete
                          </p>
                        </>
                      )}
                      {level.status === 'locked' && level.requirements && (
                        <div className="mt-2 space-y-1">
                          <p className="text-sm font-medium text-gray-600">Requirements:</p>
                          {level.requirements.map((req, idx) => (
                            <p key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {req}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Overall Progress */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Overall Progress</h2>
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Journey Progress</span>
                    <span>Level 2</span>
                  </div>
                  <Progress value={55} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">4</p>
                    <p className="text-xs text-gray-600">Active Paths</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">7</p>
                    <p className="text-xs text-gray-600">Milestones</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.title} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <achievement.icon className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
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