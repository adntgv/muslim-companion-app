'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, X, Moon, AlertCircle, Home, Book, Clock, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getUserName } from '@/lib/appwrite';

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

const PrayerTracker = () => {
  const prayers: Record<Prayer, PrayerStatus> = {
    fajr: 'completed',
    dhuhr: 'completed',
    asr: 'missed',
    maghrib: 'pending',
    isha: 'pending'
  };

  return (
    <Card className="bg-blue-50 dark:bg-blue-950/30 mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Prayer Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(prayers).map(([prayer, status]) => (
          <div key={prayer} className="flex justify-between items-center mb-2">
            <span>{translations.en.prayers[prayer as Prayer]}</span>
            {status === 'completed' && <CheckCircle size={20} className="text-green-600 dark:text-green-400" />}
            {status === 'missed' && <X size={20} className="text-red-600 dark:text-red-400" />}
            {status === 'pending' && <Moon size={20} className="text-gray-600 dark:text-gray-400" />}
          </div>
        ))}
      </CardContent>
    </Card>
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

interface HomeTabProps {
  userName?: string;
}

const HomeTab = ({ userName = 'Amir' }: HomeTabProps) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 dark:text-gray-100">{translations.en.greeting}, {userName}</h2>
      <PrayerTracker />
      <RoadmapProgress />
      <CommunitySection />
    </div>
  );
};

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
  const [activeTab, setActiveTab] = useState("home"); 
  return (
    <div className="container mx-auto py-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </TabsTrigger>
          <TabsTrigger value="quran" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Quran</span>
          </TabsTrigger>
          <TabsTrigger value="prayers" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Prayers</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Community</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="home">
          <HomeTab />
        </TabsContent>
        
        <TabsContent value="quran">
          <QuranTab />
        </TabsContent>
        
        <TabsContent value="prayers">
          <PrayerTab />
        </TabsContent>
        
        <TabsContent value="community">
          <CommunityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
} 