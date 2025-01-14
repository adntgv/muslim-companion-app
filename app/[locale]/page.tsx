'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import DashboardPage from './dashboard/page';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const t = useTranslations('home');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <DashboardPage />;
  }
  
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            {t('description')}
          </p>
          <LocaleSwitcher />
        </header>

        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl mb-2">{t('welcome')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{t('welcomeDescription')}</p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/login">{t('login')}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">{t('learnMore')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}