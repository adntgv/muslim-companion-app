'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { routing } from '@/i18n/routing';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';

export default function LocaleSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "kk" | "ru" | "en") => {
    trackEvent(ANALYTICS_EVENTS.LANGUAGE_CHANGED, { 
      from: locale, 
      to: newLocale,
      path: pathname
    });
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex space-x-2 justify-center">
      {routing.locales.map((l) => (
        <Button
          key={l}
          onClick={() => switchLocale(l as "kk" | "ru" | "en")}
          variant={l === locale ? 'default' : 'outline'}
          size="sm"
          className={`transition-all duration-300 ${l === locale ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'}`}
        >
          {t(`locale.${l}`)}
        </Button>
      ))}
    </div>
  );
}