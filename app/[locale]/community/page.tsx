import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Target,
  Trophy,
  MessageSquare,
  Heart,
  Star,
  TrendingUp,
  ChevronRight,
  UserCircle,
  Clock
} from 'lucide-react';

export default function CommunityFeatures() {
  const activeChallenges = [
    {
      id: 1,
      title: "30 Days of Tahajjud",
      participants: 234,
      daysLeft: 12,
      progress: 60,
      joined: true
    },
    {
      id: 2,
      title: "Quran Reading Challenge",
      participants: 456,
      daysLeft: 20,
      progress: 45,
      joined: true
    },
    {
      id: 3,
      title: "Daily Dhikr Excellence",
      participants: 178,
      daysLeft: 15,
      progress: 0,
      joined: false
    }
  ];

  const communityInsights = [
    {
      id: 1,
      user: "Anonymous Brother",
      content: "Alhamdulillah, completing Fajr prayer on time for 30 days straight changed my life. The morning barakah is real!",
      likes: 45,
      category: "Prayer",
      timeAgo: "2h ago"
    },
    {
      id: 2,
      user: "Anonymous Sister",
      content: "Starting with 1 page of Quran daily helped me build a consistent habit. Now reading 5 pages feels natural.",
      likes: 32,
      category: "Quran",
      timeAgo: "4h ago"
    }
  ];

  const userStats = {
    challengesCompleted: 12,
    streakDays: 30,
    peopleMotivated: 156,
    activeChallenges: 3
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-600 mt-2">Grow together with other seekers of knowledge</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Challenges */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Active Challenges</h2>
                  <p className="text-gray-600">Join challenges to grow consistently</p>
                </div>
                <Button variant="outline">Browse All</Button>
              </div>

              <div className="space-y-4">
                {activeChallenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {challenge.participants} participants
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {challenge.daysLeft} days left
                          </span>
                        </div>
                      </div>
                      <Button variant={challenge.joined ? "outline" : "default"}>
                        {challenge.joined ? 'View Progress' : 'Join'}
                      </Button>
                    </div>
                    {challenge.joined && (
                      <>
                        <Progress value={challenge.progress} />
                        <p className="text-sm text-muted-foreground mt-2">
                          {challenge.progress}% completed
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Community Insights */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Community Insights</h2>
                <Button variant="outline">Share Your Story</Button>
              </div>

              <div className="space-y-4">
                {communityInsights.map((insight) => (
                  <div key={insight.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <UserCircle className="h-10 w-10 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-foreground">{insight.user}</p>
                            <p className="text-sm text-muted-foreground">{insight.timeAgo}</p>
                          </div>
                          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {insight.category}
                          </span>
                        </div>
                        <p className="mt-2 text-muted-foreground">{insight.content}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <Heart className="h-4 w-4 mr-2" />
                            {insight.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Your Community Impact</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-500">{userStats.challengesCompleted}</p>
                  <p className="text-xs text-muted-foreground">Challenges Done</p>
                </div>
                <div className="bg-muted p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.streakDays}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
                <div className="bg-muted p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-500">{userStats.peopleMotivated}</p>
                  <p className="text-xs text-muted-foreground">People Motivated</p>
                </div>
                <div className="bg-muted p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-orange-500">{userStats.activeChallenges}</p>
                  <p className="text-xs text-muted-foreground">Active Challenges</p>
                </div>
              </div>
            </Card>

            {/* Trending Challenges */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Trending Challenges</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  <span>Ramadan Prep Challenge</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Morning Adhkar Circle</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>Family Time Excellence</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Community Goals */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Community Goals</h2>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground">1M Prayers on Time</span>
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  </div>
                  <Progress value={85} />
                  <p className="text-sm text-muted-foreground mt-2">150K prayers to go</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground">100K Quran Pages</span>
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  </div>
                  <Progress value={65} />
                  <p className="text-sm text-muted-foreground mt-2">35K pages remaining</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}