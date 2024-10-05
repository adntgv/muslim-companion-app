import "../globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { config } from '@/lib/config';

export const metadata: Metadata = {
  title: config.app.name,
  description: config.app.description,
  manifest: "/manifest.json",
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Layout>{children}</Layout>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}