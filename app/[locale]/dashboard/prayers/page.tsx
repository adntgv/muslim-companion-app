'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { prayerTimes } from '@/lib/constants';
import { Calendar, Clock, Flame, Plus } from 'lucide-react';

const PrayerTrackingGrid = () => {
  const t = useTranslations('Prayers');
  const [prayers, setPrayers] = useState<Record<string, boolean>>(
    Object.fromEntries(prayerTimes.map(prayer => [prayer, false]))
  );

  const togglePrayer = (prayer: string) => {
    setPrayers(prev => ({ ...prev, [prayer]: !prev[prayer] }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('todayPrayers')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prayerTimes.map((prayer) => (
            <div key={prayer} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
              <div className="flex items-center space-x-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{prayer}</span>
              </div>
              <Checkbox
                checked={prayers[prayer]}
                onCheckedChange={() => togglePrayer(prayer)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const StreakIndicator = () => {
  const t = useTranslations('Prayers');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('prayerStreak')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-4">
          <Flame className="h-8 w-8 text-primary" />
          <div className="text-center">
            <p className="text-3xl font-bold">7</p>
            <p className="text-sm text-muted-foreground">{t('daysStreak')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const QadaPrayerLogger = () => {
  const t = useTranslations('Prayers');
  const [qadaCount, setQadaCount] = useState<Record<string, number>>(
    Object.fromEntries(prayerTimes.filter(p => p !== 'Sunrise').map(prayer => [prayer, 0]))
  );

  const updateQadaCount = (prayer: string, increment: boolean) => {
    setQadaCount(prev => ({
      ...prev,
      [prayer]: Math.max(0, prev[prayer] + (increment ? 1 : -1))
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('qadaPrayers')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(qadaCount).map(([prayer, count]) => (
            <div key={prayer} className="flex items-center justify-between">
              <span>{prayer}</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQadaCount(prayer, false)}
                  disabled={count === 0}
                >
                  -
                </Button>
                <span className="w-8 text-center">{count}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQadaCount(prayer, true)}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const PrayerCalendar = () => {
  const t = useTranslations('Prayers');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('prayerCalendar')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm bg-muted flex items-center justify-center text-sm"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function PrayersPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PrayerTrackingGrid />
        </div>
        <StreakIndicator />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QadaPrayerLogger />
        <PrayerCalendar />
      </div>
    </div>
  );
} 