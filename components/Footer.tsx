import React from 'react';
import {Link} from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const common = useTranslations('common');

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('aboutIqra')}</h3>
            <p className="text-muted-foreground">
              {t('aboutDescription')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">{common('home')}</Link></li>
              <li><Link href="/learn" className="text-muted-foreground hover:text-primary">{common('learn')}</Link></li>
              {/* <li><Link href="/about" className="text-muted-foreground hover:text-primary">{common('about')}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">{common('contact')}</Link></li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('connect')}</h3>
            <ul className="space-y-2">
              <li><a href="https://t.me/iqra_app" className="text-muted-foreground hover:text-primary">Telegram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;