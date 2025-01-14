'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, X, Moon, AlertCircle, Home, Book, 
  Clock, Users, Sun, Star, Award, Heart, TrendingUp,
  Trophy 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getUserName } from '@/lib/appwrite';
import AnonymousLeaderboard from '@/components/AnonymousLeaderboard';

type Prayer = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
type PrayerStatus = 'completed' | 'missed' | 'pending';

interface PrayerTranslations {
  title: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface Translations {
  en: {
    greeting: string;
    prayers: PrayerTranslations;
  };
}

const translations: Translations = {
  en: {
    greeting: 'As-salaam-alaikum',
    prayers: {
      title: 'Prayer Tracker',
      fajr: 'Fajr',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha'
    }
  }
};

const GradientCard = ({ children, gradient = "from-blue-500 to-purple-600" }) => (
  <div className={`rounded-xl overflow-hidden mb-4 bg-gradient-to-r ${gradient} shadow-lg dark:shadow-none`}>
    <div className="px-6 py-5 text-white">
      {children}
    </div>
  </div>
);

const ProgressRing = ({ progress }) => (
  <div className="relative w-16 h-16">
    <svg className="w-full h-full" viewBox="0 0 36 36">
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="3"
      />
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeDasharray={`${progress}, 100`}
      />
      <text x="18" y="20.35" className="text-white text-sm" textAnchor="middle" fill="white">
        {progress}%
      </text>
    </svg>
  </div>
);

interface HomeTabProps {
  userName?: string;
}

const HomeTab = ({ userName = 'Amir' }: HomeTabProps) => {
  const t = useTranslations('dashboard');

  return (
    <div className="p-4 space-y-4">
      {/* Hero Section */}
      <GradientCard gradient="from-indigo-500 to-purple-600">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">{t('greeting')}, {userName}</h1>
            <p className="opacity-90">{t('journeyContinues')}</p>
          </div>
          <Award size={32} className="text-white opacity-90" />
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="text-center">
            <p className="text-sm opacity-80">{t('streak')}</p>
            <p className="text-xl font-bold">7 {t('days')}</p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-80">{t('level')}</p>
            <p className="text-xl font-bold">12</p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-80">{t('points')}</p>
            <p className="text-xl font-bold">850</p>
          </div>
        </div>
      </GradientCard>

      {/* Daily Progress */}
      <GradientCard gradient="from-green-500 to-emerald-600">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">{t('todayJourney')}</h2>
            <p className="text-sm opacity-90">{t('prayersCompleted', { completed: 4, total: 5 })}</p>
          </div>
          <ProgressRing progress={80} />
        </div>
        <div className="flex justify-between mt-6">
          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
            <Sun size={20} className="mr-2" />
            <span>{t('prayers.fajr')}</span>
            <span className="ml-2 opacity-75">✓</span>
          </div>
          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
            <Star size={20} className="mr-2" />
            <span>{t('prayers.dhuhr')}</span>
            <span className="ml-2 opacity-75">✓</span>
          </div>
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2">
            <Moon size={20} className="mr-2" />
            <span>{t('prayers.asr')}</span>
          </div>
        </div>
      </GradientCard>

      {/* Community Challenge */}
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900 mr-4">
                <Users className="text-orange-600 dark:text-orange-400" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('dhikrChallenge')}</h3>
                <p className="text-muted-foreground">{t('participantsCount', { count: 127 })}</p>
              </div>
            </div>
            <TrendingUp className="text-green-500" />
          </div>
          <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-muted-foreground">{t('challengeProgress', { current: 5, total: 7 })}</span>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">75% {t('complete')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card hover:bg-accent transition-colors cursor-pointer">
          <CardContent className="p-4">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 w-fit mb-2">
              <Book className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <h3 className="font-medium">{t('quranGoals')}</h3>
            <p className="text-sm text-muted-foreground">{t('pagesProgress', { current: 2, total: 5 })}</p>
          </CardContent>
        </Card>
        <Card className="bg-card hover:bg-accent transition-colors cursor-pointer">
          <CardContent className="p-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 w-fit mb-2">
              <Heart className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <h3 className="font-medium">{t('dhikr')}</h3>
            <p className="text-sm text-muted-foreground">{t('dhikrProgress', { current: 33, total: 100 })}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const RoadmapProgress = () => {
  const levels = [
    { name: 'Beginner', completed: true },
    { name: 'Regular Practice', completed: true },
    { name: 'Consistent Worship', completed: false },
    { name: 'Advanced Practice', locked: true }
  ];

  return (
    <Card className="bg-purple-50 dark:bg-purple-950/30 mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Your Growth Journey</CardTitle>
      </CardHeader>
      <CardContent>
        {levels.map((level, index) => (
          <div key={index} className={`flex items-center justify-between p-2 mb-2 rounded ${
            level.locked ? 'bg-gray-100 dark:bg-gray-800 opacity-50' : 'bg-white dark:bg-gray-900'
          }`}>
            <span>{level.name}</span>
            {level.completed && <CheckCircle size={20} className="text-green-600 dark:text-green-400" />}
            {!level.completed && !level.locked && <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400" />}
            {level.locked && <Moon size={20} className="text-gray-600 dark:text-gray-400" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const CommunitySection = () => (
  <Card className="bg-green-50 dark:bg-green-950/30 mb-4">
    <CardHeader>
      <CardTitle className="text-lg">Community Challenge</CardTitle>
    </CardHeader>
    <CardContent>
      <Alert>
        <AlertDescription>
          Join 127 others in the "7 Days of Dhikr" challenge starting tomorrow!
        </AlertDescription>
      </Alert>
      <div className="mt-4">
        <button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-full w-full transition-colors">
          Join Challenge
        </button>
      </div>
    </CardContent>
  </Card>
);

const QuranTab = () => (
  <div className="p-4">
    <Card>
      <CardHeader>
        <CardTitle>Quran Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Quran tracking features coming soon...</p>
      </CardContent>
    </Card>
  </div>
);

const PrayerTab = () => (
  <div className="p-4">
    <Card>
      <CardHeader>
        <CardTitle>Prayer Times</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Prayer time features coming soon...</p>
      </CardContent>
    </Card>
  </div>
);

const CommunityTab = () => (
  <div className="p-4">
    <Card>
      <CardHeader>
        <CardTitle>Community</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Community features coming soon...</p>
      </CardContent>
    </Card>
  </div>
);

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const [userName, setUserName] = useState<string>('');

  return (
    <Tabs defaultValue="home" className="w-full">
      <TabsList className="grid w-full grid-cols-5 mb-4">
        <TabsTrigger value="home">
          <Home className="h-4 w-4 mr-2" />
          {t('home')}
        </TabsTrigger>
        <TabsTrigger value="prayers">
          <Clock className="h-4 w-4 mr-2" />
          {t('prayers')}
        </TabsTrigger>
        <TabsTrigger value="quran">
          <Book className="h-4 w-4 mr-2" />
          {t('quran')}
        </TabsTrigger>
        <TabsTrigger value="community">
          <Users className="h-4 w-4 mr-2" />
          {t('community')}
        </TabsTrigger>
        <TabsTrigger value="leaderboard">
          <Trophy className="h-4 w-4 mr-2" />
          {t('leaderboard')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="home">
        <HomeTab userName={userName} />
      </TabsContent>

      <TabsContent value="prayers">
        <PrayerTab />
      </TabsContent>

      <TabsContent value="quran">
        <QuranTab />
      </TabsContent>

      <TabsContent value="community">
        <CommunityTab />
      </TabsContent>

      <TabsContent value="leaderboard">
        <AnonymousLeaderboard />
      </TabsContent>
    </Tabs>
  );
} 