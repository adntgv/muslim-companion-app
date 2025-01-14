import { getMessages } from 'next-intl/server';
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
      <body>
        <ClientLayout messages={messages} locale={locale}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}