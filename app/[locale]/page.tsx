import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function Home() {
  const t = useTranslations('home');
  
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
            <Button asChild>
              <Link href="/about">{t('learnMore')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}