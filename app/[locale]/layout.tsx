import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import ClientLayout from '../../components/ClientLayout';
import '../globals.css';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AuthProvider } from '@/contexts/auth-context';

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
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <ClientLayout messages={messages} locale={locale}>
              <div className="relative flex min-h-screen flex-col bg-background">
                <Navbar />
                <main className="flex-1 bg-background">
                  {children}
                </main>
              </div>
              <Toaster richColors position="top-center" />
            </ClientLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}