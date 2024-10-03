import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  const t = useTranslations('about');

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="text-3xl mb-2">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{t('description')}</p>
        </CardContent>
      </Card>
    </div>
  );
}