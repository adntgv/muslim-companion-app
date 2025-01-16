import React from 'react';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Play,
  FileText,
  CheckCircle,
  Lock,
  Star,
  Clock,
  TrendingUp,
  ChevronRight,
  GraduationCap,
  Heart,
  Users,
  Calendar,
  Target
} from 'lucide-react';
import { ROUTES } from '@/lib/navigation';

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  status: 'in-progress' | 'locked' | 'completed';
  level: number;
  duration: string;
  prerequisites?: string[];
  nextLesson?: {
    title: string;
    description: string;
    duration: string;
  };
}

export default function LearningCenter() {
  const courses: Course[] = [
    {
      id: 1,
      title: "Foundations of Faith",
      description: "Essential beliefs and practices in Islam",
      progress: 80,
      totalLessons: 12,
      completedLessons: 9,
      category: "Aqeedah",
      status: "in-progress",
      level: 1,
      duration: "6 hours",
      nextLesson: {
        title: "Understanding Allah's Names",
        description: "Learn about the beautiful names of Allah",
        duration: "20 mins"
      }
    },
    {
      id: 2,
      title: "Prayer Excellence",
      description: "Detailed guide to perfecting your prayers",
      progress: 60,
      totalLessons: 8,
      completedLessons: 5,
      category: "Fiqh",
      status: "in-progress",
      level: 2,
      duration: "4 hours",
      nextLesson: {
        title: "Khushu in Prayer",
        description: "Developing concentration and presence",
        duration: "15 mins"
      }
    },
    {
      id: 3,
      title: "Tajweed Fundamentals",
      description: "Master Quran recitation rules",
      progress: 0,
      totalLessons: 10,
      completedLessons: 0,
      category: "Quran",
      status: "locked",
      level: 2,
      duration: "5 hours",
      prerequisites: [
        "Complete Basic Quran Reading",
        "Practice Arabic Pronunciation"
      ]
    },
    {
      id: 4,
      title: "Character Building",
      description: "Developing Islamic character traits",
      progress: 40,
      totalLessons: 6,
      completedLessons: 2,
      category: "Personal Growth",
      status: "in-progress",
      level: 1,
      duration: "3 hours",
      nextLesson: {
        title: "Patience in Practice",
        description: "Real-world application of sabr",
        duration: "15 mins"
      }
    }
  ];

  const learningStats = {
    activeCourses: 3,
    hoursLearned: 12,
    lessonsCompleted: 16,
    streak: 7
  };

  const recommendedResources = [
    {
      title: "Understanding Tawheed",
      type: "Article",
      duration: "10 mins",
      icon: FileText
    },
    {
      title: "Dua Collection",
      type: "Audio",
      duration: "15 mins",
      icon: Play
    },
    {
      title: "Prayer Guide",
      type: "Video",
      duration: "20 mins",
      icon: Play
    }
  ];

  const upcomingLessons = [
    {
      title: "Daily Adhkar",
      date: "Today, 3:00 PM",
      duration: "15 mins",
      category: "Worship"
    },
    {
      title: "Prophetic Character",
      date: "Tomorrow, 10:00 AM",
      duration: "20 mins",
      category: "Seerah"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Center</h1>
            <p className="text-gray-600 mt-2">Your personalized Islamic learning journey</p>
          </div>
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            asChild
          >
            <Link href={ROUTES.GROWTH_MAP}>
              <TrendingUp className="h-4 w-4" />
              View Progress
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            {courses.find(c => c.status === 'in-progress' && c.nextLesson)?.nextLesson && (
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Continue Learning</h2>
                    <p className="text-gray-600">Pick up where you left off</p>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Resume
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium">
                        {courses.find(c => c.status === 'in-progress' && c.nextLesson)?.nextLesson?.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {courses.find(c => c.status === 'in-progress' && c.nextLesson)?.nextLesson?.description}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4" />
                        {courses.find(c => c.status === 'in-progress' && c.nextLesson)?.nextLesson?.duration}
                      </p>
                    </div>
                    <div className="bg-white px-3 py-1 rounded-full text-sm text-blue-600">
                      Next Lesson
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Course List */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Courses</h2>
                <Button variant="outline">Browse All Courses</Button>
              </div>

              {courses.map((course) => (
                <Card key={course.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-lg ${
                        course.status === 'locked' ? 'bg-gray-100' :
                        course.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {course.category === 'Aqeedah' && <GraduationCap className={`h-6 w-6 ${
                          course.status === 'locked' ? 'text-gray-500' :
                          course.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`} />}
                        {course.category === 'Fiqh' && <Target className={`h-6 w-6 ${
                          course.status === 'locked' ? 'text-gray-500' :
                          course.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`} />}
                        {course.category === 'Quran' && <BookOpen className={`h-6 w-6 ${
                          course.status === 'locked' ? 'text-gray-500' :
                          course.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`} />}
                        {course.category === 'Personal Growth' && <Heart className={`h-6 w-6 ${
                          course.status === 'locked' ? 'text-gray-500' :
                          course.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{course.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            course.level === 1 ? 'bg-green-100 text-green-600' :
                            course.level === 2 ? 'bg-blue-100 text-blue-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            Level {course.level}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </span>
                          <span className="text-sm text-gray-500">
                            {course.completedLessons}/{course.totalLessons} Lessons
                          </span>
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                            {course.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    {course.status === 'locked' ? (
                      <Lock className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Button variant="outline">Continue</Button>
                    )}
                  </div>
                  {course.status !== 'locked' && (
                    <Progress value={course.progress} />
                  )}
                  {course.status === 'locked' && course.prerequisites && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600 mb-2">Prerequisites:</p>
                      {course.prerequisites.map((prereq, index) => (
                        <p key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {prereq}
                        </p>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Stats */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Learning Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{learningStats.activeCourses}</p>
                  <p className="text-xs text-gray-600">Active Courses</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{learningStats.hoursLearned}</p>
                  <p className="text-xs text-gray-600">Hours Learned</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-600">{learningStats.lessonsCompleted}</p>
                  <p className="text-xs text-gray-600">Lessons Done</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-orange-600">{learningStats.streak}</p>
                  <p className="text-xs text-gray-600">Day Streak</p>
                </div>
              </div>
            </Card>

            {/* Upcoming Lessons */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Upcoming Lessons</h2>
              <div className="space-y-4">
                {upcomingLessons.map((lesson, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{lesson.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600">{lesson.date}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Resources */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Community Learning</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link href={ROUTES.COMMUNITY}>
                    Join Study Groups
                  </Link>
                </Button>
              </div>
              <div className="space-y-3">
                {recommendedResources.map((resource, index) => (
                  <Button key={index} variant="outline" className="w-full justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <resource.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{resource.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">{resource.type}</span>
                          <span className="text-xs text-gray-600">•</span>
                          <span className="text-xs text-gray-600">{resource.duration}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}