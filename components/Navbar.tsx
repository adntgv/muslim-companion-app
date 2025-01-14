'use client';

import React, { useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from '@/lib/appwrite';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

const ThemeToggle = dynamic(() => import('./themeToggle'), { ssr: false });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('common');
  const router = useRouter();
  const { user, isLoading, checkSession } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await logout();
      await checkSession(); // Update auth state
      toast.success('Successfully logged out');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const appName = "Muslim Companion"

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>{user?.name || 'User'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="border-b bg-background sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">{appName}</Link>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-foreground hover:text-primary">
              <Link href="/">{t('home')}</Link>
            </Button>
            <LocaleSwitcher />
            <ThemeToggle />
            {!isLoading && (user ? (
              <UserMenu />
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            ))}
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
              {!isLoading && (user ? (
                <>
                  <Button variant="ghost" asChild onClick={toggleMenu}>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={toggleMenu}>
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;