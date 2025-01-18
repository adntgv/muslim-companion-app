import { useTranslations } from 'next-intl';

export default function OfflinePage() {
  const t = useTranslations('Offline');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('title', { defaultMessage: 'You are offline' })}
        </h1>
        <p className="text-lg text-gray-600">
          {t('description', {
            defaultMessage: 'Please check your internet connection and try again'
          })}
        </p>
      </div>
    </div>
  );
} 