'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

const ThemeToggle = dynamic(() => import('./themeToggle'), { ssr: false });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('common');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="border-b bg-background sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">{t('appName')}</Link>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-foreground hover:text-primary">
              <Link href="/">{t('home')}</Link>
            </Button>
            <LocaleSwitcher />
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <XIcon className="h-6 w-6 text-primary" /> : <MenuIcon className="h-6 w-6 text-primary" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 bg-background/95 backdrop-blur-sm animate-slideInFromBottom">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" asChild onClick={toggleMenu} className="text-foreground hover:text-primary">
                <Link href="/">{t('home')}</Link>
              </Button>
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;