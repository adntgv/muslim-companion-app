import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import ClientLayout from '../../components/ClientLayout';
import '../globals.css';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: 'Falah',
    description: 'Your personal companion for daily Islamic practices',
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          src="https://umami.adntgv.com/script.js"
          data-website-id="d9c1702a-df56-49fe-8452-018b45fa2d63"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ClientLayout messages={messages} locale={locale}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}