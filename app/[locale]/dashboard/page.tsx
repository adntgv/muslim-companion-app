'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Book, Star, Activity } from 'lucide-react';
import { prayerTimes } from '@/lib/constants';

// Components
const DailyOverviewCard = () => {
  const t = useTranslations('Dashboard');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dailyOverview')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('completedPrayers')}</p>
            <p className="text-2xl font-bold">3/5</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('quranPages')}</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('dhikrCompletion')}</p>
            <p className="text-2xl font-bold">60%</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t('streak')}</p>
            <p className="text-2xl font-bold">7</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PrayerTimesWidget = () => {
  const t = useTranslations('Dashboard');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('prayerTimes')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prayerTimes.map((prayer) => (
            <div key={prayer} className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{prayer}</span>
              </div>
              <span className="text-muted-foreground">--:--</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const QuickActionsGrid = () => {
  const t = useTranslations('Dashboard');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('quickActions')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
            <Book className="h-6 w-6" />
            <span>{t('logQuran')}</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
            <Star className="h-6 w-6" />
            <span>{t('logDhikr')}</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
            <Activity className="h-6 w-6" />
            <span>{t('logHabit')}</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
            <Clock className="h-6 w-6" />
            <span>{t('logPrayer')}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityFeed = () => {
  const t = useTranslations('Dashboard');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('recentActivity')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Placeholder activities */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
              <div>
                <p className="text-sm">Activity {i}</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyOverviewCard />
        <PrayerTimesWidget />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActionsGrid />
        <ActivityFeed />
      </div>
    </div>
  );
} 