'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/navigation';
import { useAuth } from '@/contexts/auth-context';
import { User, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeToggle from './themeToggle';

export function Navbar() {
  const { user, isLoading, checkSession } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      await checkSession();
      toast.success('Successfully logged out');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span className="hidden md:inline">{user?.name || 'User'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const NavLinks = () => (
    <>
      <Link 
        href={ROUTES.DASHBOARD}
        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
      >
        Dashboard
      </Link>
      <Link 
        href={ROUTES.GROWTH_MAP}
        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300"
      >
        Growth Map
      </Link>
      <Link 
        href={ROUTES.LEARNING_CENTER}
        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300"
      >
        Learning Center
      </Link>
      <Link 
        href={ROUTES.REFLECTION_JOURNAL}
        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300"
      >
        Reflection Journal
      </Link>
      <Link 
        href={ROUTES.COMMUNITY}
        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300"
      >
        Community
      </Link>
    </>
  );

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-foreground">
                Falah
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
            {!isLoading && (user ? (
              <UserMenu />
            ) : (
              <Button asChild size="sm" className="hidden md:inline-flex">
                <Link href="/login">Login</Link>
              </Button>
            ))}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-2">
            <div className="space-y-2 px-2">
              <NavLinks />
            </div>
            <div className="border-t border-gray-200 pt-2 px-2">
              <div className="flex items-center justify-between space-x-2">
                <LocaleSwitcher />
                <ThemeToggle />
                {!isLoading && !user && (
                  <Button asChild size="sm">
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}