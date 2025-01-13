import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { 
  Clock, 
  BookOpen, 
  BookMarked, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Star,
  GraduationCap
} from 'lucide-react';

export default function Home() {
  const t = useTranslations('home');
  
  const features = [
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: t('features.prayers.title'),
      description: t('features.prayers.description'),
      highlights: ['5 daily prayers tracking', 'Accurate prayer times', 'Prayer streak tracking']
    },
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: t('features.quran.title'),
      description: t('features.quran.description'),
      highlights: ['Daily reading goals', 'Progress tracking', 'Bookmark system']
    },
    {
      icon: <BookMarked className="w-12 h-12 text-primary" />,
      title: t('features.dhikr.title'),
      description: t('features.dhikr.description'),
      highlights: ['Morning & Evening adhkar', 'Completion tracking', 'Customizable reminders']
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      title: t('features.learn.title'),
      description: t('features.learn.description'),
      highlights: ['Structured learning paths', 'Progress tracking', 'Achievement system']
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            {t('description')}
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Button asChild size="lg" className="gap-2">
              <Link href="/register">
                {t('getStarted')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">{t('signIn')}</Link>
            </Button>
          </div>
          <LocaleSwitcher />
        </header>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t('featuresTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    {feature.icon}
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-16">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <Clock className="h-6 w-6" />
                  <span>Prayer Times</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  <span>Read Quran</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <BookMarked className="h-6 w-6" />
                  <span>Daily Adhkar</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Islamic Calendar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <Card className="max-w-3xl mx-auto border-2">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">{t('startJourney')}</CardTitle>
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{t('startJourneyDescription')}</p>
              <Button asChild size="lg" className="gap-2">
                <Link href="/register">
                  {t('joinNow')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}