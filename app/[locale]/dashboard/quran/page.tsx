'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Book, BookOpen, Star, Bookmark, Plus } from 'lucide-react';
import { quranReadingGoals } from '@/lib/constants';

const QuranReadingTracker = () => {
  const t = useTranslations('Quran');
  const [pages, setPages] = useState('0');
  const [selectedGoal, setSelectedGoal] = useState<string>(quranReadingGoals[0].value);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dailyReading')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              min="0"
              max="604"
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">{t('pages')}</span>
          </div>
          
          <Select value={selectedGoal} onValueChange={setSelectedGoal}>
            <SelectTrigger>
              <SelectValue placeholder={t('selectGoal')} />
            </SelectTrigger>
            <SelectContent>
              {quranReadingGoals.map((goal) => (
                <SelectItem key={goal.value} value={goal.value}>
                  {goal.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('dailyProgress')}</span>
              <span>2/4 {t('pages')}</span>
            </div>
            <Progress value={50} />
          </div>

          <Button className="w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            {t('logReading')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SurahProgressGrid = () => {
  const t = useTranslations('Quran');
  // Simplified surah list for demo
  const surahs = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Surah ${i + 1}`,
    progress: Math.floor(Math.random() * 100)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('surahProgress')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {surahs.map((surah) => (
            <div key={surah.id} className="p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{surah.name}</span>
                <span className="text-sm text-muted-foreground">{surah.progress}%</span>
              </div>
              <Progress value={surah.progress} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const MemorizationTracker = () => {
  const t = useTranslations('Quran');
  const [memorizedVerses, setMemorizedVerses] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('memorization')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Star className="h-8 w-8 text-primary" />
            <div className="text-center">
              <p className="text-3xl font-bold">{memorizedVerses}</p>
              <p className="text-sm text-muted-foreground">{t('versesMemorized')}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('monthlyGoal')}</span>
              <span>10/30 {t('verses')}</span>
            </div>
            <Progress value={33} />
          </div>

          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            {t('logMemorization')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const LastReadBookmark = () => {
  const t = useTranslations('Quran');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('lastRead')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Bookmark className="h-8 w-8 text-primary" />
          <div>
            <p className="font-medium">Surah Al-Baqarah</p>
            <p className="text-sm text-muted-foreground">Verse 255 - Page 42</p>
          </div>
          <Button variant="outline" className="ml-auto">
            {t('continue')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function QuranPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuranReadingTracker />
        <MemorizationTracker />
      </div>
      <LastReadBookmark />
      <SurahProgressGrid />
    </div>
  );
} 