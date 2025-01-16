import React from 'react';
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
  Calendar
} from 'lucide-react';
import { ROUTES } from '@/lib/navigation';

export default function Dashboard() {
  const prayers = [
    { name: 'Fajr', time: '5:23 AM', status: 'completed' },
    { name: 'Dhuhr', time: '1:12 PM', status: 'upcoming', isNext: true },
    { name: 'Asr', time: '4:48 PM', status: 'upcoming' },
    { name: 'Maghrib', time: '7:39 PM', status: 'upcoming' },
    { name: 'Isha', time: '9:01 PM', status: 'upcoming' }
  ];

  const dailyTasks = [
    {
      id: 1,
      title: "Morning Adhkar",
      category: "Daily Worship",
      time: "6:00 AM",
      status: "completed",
      icon: Sun,
      priority: "high"
    },
    {
      id: 2,
      title: "Read Quran (2 pages)",
      category: "Quran",
      time: "7:00 AM",
      status: "pending",
      icon: BookOpen,
      priority: "high"
    },
    {
      id: 3,
      title: "Watch Aqeedah Lesson",
      category: "Knowledge",
      time: "2:00 PM",
      status: "upcoming",
      icon: Target,
      priority: "medium"
    },
    {
      id: 4,
      title: "Evening Reflection",
      category: "Growth",
      time: "8:30 PM",
      status: "upcoming",
      icon: Moon,
      priority: "medium"
    }
  ];

  const growthAreas = [
    {
      area: "Prayer Excellence",
      progress: 75,
      nextTask: "Focus on Khushu",
      icon: Clock
    },
    {
      area: "Quran Connection",
      progress: 45,
      nextTask: "Complete Today's Reading",
      icon: BookOpen
    },
    {
      area: "Character Growth",
      progress: 60,
      nextTask: "Practice Patience",
      icon: Heart
    }
  ];

  const insights = [
    {
      type: "achievement",
      title: "Prayer Streak",
      description: "5 days of praying all prayers on time!",
      icon: Star
    },
    {
      type: "suggestion",
      title: "Recommended Focus",
      description: "Your Asr prayer timing needs attention",
      icon: AlertCircle
    },
    {
      type: "progress",
      title: "Knowledge Growth",
      description: "Completed 3 lessons this week",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assalamu Alaikum!</h1>
            <p className="text-gray-600 mt-2">Monday, 15 January 2024</p>
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
            {/* Prayer Times */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Prayer Times</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {prayers.map((prayer) => (
                  <div
                    key={prayer.name}
                    className={`p-4 rounded-lg ${
                      prayer.isNext ? 'bg-blue-50 border-2 border-blue-200' :
                      prayer.status === 'completed' ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{prayer.name}</span>
                      {prayer.status === 'completed' && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{prayer.time}</p>
                    {prayer.isNext && (
                      <span className="text-xs text-blue-600 mt-2 block">Next Prayer</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Daily Tasks */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Today's Tasks</h2>
                  <p className="text-gray-600">Your personalized growth plan</p>
                </div>
                <Button variant="outline">Add Task</Button>
              </div>
              <div className="space-y-4">
                {dailyTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg ${
                      task.status === 'completed' ? 'bg-green-50' :
                      task.status === 'pending' ? 'bg-yellow-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          task.status === 'completed' ? 'bg-green-100' :
                          task.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          <task.icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-600">{task.time}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === 'high' ? 'bg-red-100 text-red-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      {task.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Button size="sm" variant={task.status === 'pending' ? 'default' : 'outline'}>
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Growth Areas */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Growth Areas</h2>
              <div className="space-y-4">
                {growthAreas.map((area) => (
                  <div key={area.area} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <area.icon className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">{area.area}</span>
                      </div>
                      <span className="text-sm text-gray-600">{area.progress}%</span>
                    </div>
                    <Progress value={area.progress} />
                    <p className="text-sm text-gray-600">Next: {area.nextTask}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Insights */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Insights</h2>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div
                    key={insight.title}
                    className={`p-3 rounded-lg ${
                      insight.type === 'achievement' ? 'bg-green-50' :
                      insight.type === 'suggestion' ? 'bg-yellow-50' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        insight.type === 'achievement' ? 'bg-green-100' :
                        insight.type === 'suggestion' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <insight.icon className={`h-4 w-4 ${
                          insight.type === 'achievement' ? 'text-green-600' :
                          insight.type === 'suggestion' ? 'text-yellow-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{insight.title}</p>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
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