import { useTranslations } from 'next-intl';

export default function Offline() {
  const t = useTranslations('offline');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-xl">{t('description')}</p>
    </div>
  );
}