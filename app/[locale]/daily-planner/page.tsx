import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sun,
  Moon,
  Check,
  Clock,
  Calendar,
  BookOpen,
  Heart,
  Plus,
  ChevronRight
} from 'lucide-react';

export default function DailyPlanner() {
  const prayers = [
    { name: 'Fajr', time: '5:23 AM', status: 'completed' },
    { name: 'Sunrise', time: '6:45 AM', type: 'optimal', status: 'missed' },
    { name: 'Dhuhr', time: '1:12 PM', status: 'upcoming' },
    { name: 'Asr', time: '4:48 PM', status: 'upcoming' },
    { name: 'Maghrib', time: '7:39 PM', status: 'upcoming' },
    { name: 'Isha', time: '9:01 PM', status: 'upcoming' }
  ];

  const tasks = [
    { 
      id: 1,
      title: "Morning Adhkar",
      type: "dhikr",
      time: "6:00 AM",
      status: "completed",
      icon: Sun
    },
    {
      id: 2,
      title: "Read Quran (2 pages)",
      type: "quran",
      time: "7:00 AM",
      status: "pending",
      icon: BookOpen
    },
    {
      id: 3,
      title: "Evening Reflection",
      type: "reflection",
      time: "8:30 PM",
      status: "upcoming",
      icon: Moon
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Today's Journey</h1>
            <p className="text-gray-600">Monday, 15 January 2024</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Prayer Times */}
          <Card className="p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Prayer Times</h2>
            <div className="space-y-3">
              {prayers.map((prayer) => (
                <div
                  key={prayer.name}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    prayer.status === 'completed'
                      ? 'bg-green-50'
                      : prayer.status === 'missed'
                      ? 'bg-red-50'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className={`h-5 w-5 ${
                      prayer.status === 'completed'
                        ? 'text-green-600'
                        : prayer.status === 'missed'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`} />
                    <div>
                      <p className="font-medium">{prayer.name}</p>
                      <p className="text-sm text-gray-600">{prayer.time}</p>
                    </div>
                  </div>
                  {prayer.status === 'completed' ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : prayer.status === 'upcoming' ? (
                    <Button size="sm" variant="outline">Mark Complete</Button>
                  ) : (
                    <span className="text-sm text-red-600">Missed</span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Today's Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-semibold">4/7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Prayers on Time</span>
                  <span className="font-semibold">2/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quran Pages</span>
                  <span className="font-semibold">1/3</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Focus Areas</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Prayer Timing</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">Daily Quran</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">Morning Adhkar</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tasks Timeline */}
        <Card className="mt-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Today's Tasks</h2>
            <Button variant="outline" className="flex items-center gap-2">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  task.status === 'completed'
                    ? 'bg-green-50'
                    : task.status === 'pending'
                    ? 'bg-yellow-50'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    task.status === 'completed'
                      ? 'bg-green-100'
                      : task.status === 'pending'
                      ? 'bg-yellow-100'
                      : 'bg-gray-100'
                  }`}>
                    <task.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.time}</p>
                  </div>
                </div>
                {task.status === 'completed' ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant={task.status === 'pending' ? 'default' : 'outline'}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}