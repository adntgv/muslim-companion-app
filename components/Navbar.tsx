'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/navigation';
import { useAuth } from '@/contexts/auth-context';
import { User, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeToggle from './themeToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname() || '';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link 
        href={ROUTES.DASHBOARD}
        className={cn(
          "md:inline-flex md:items-center md:px-1 md:pt-1 md:text-sm md:font-medium md:border-b-2 md:border-transparent",
          "block w-full py-2 pl-3 pr-4 text-base font-medium rounded-md",
          pathname?.includes(ROUTES.DASHBOARD) 
            ? "text-primary md:border-primary bg-accent/50 md:bg-transparent" 
            : "text-foreground/70 hover:bg-accent md:hover:border-gray-300 md:hover:bg-transparent"
        )}
      >
        Dashboard
      </Link>
      <Link 
        href={ROUTES.GROWTH_MAP}
        className={cn(
          "md:inline-flex md:items-center md:px-1 md:pt-1 md:text-sm md:font-medium md:border-b-2 md:border-transparent",
          "block w-full py-2 pl-3 pr-4 text-base font-medium rounded-md",
          pathname?.includes(ROUTES.GROWTH_MAP) 
            ? "text-primary md:border-primary bg-accent/50 md:bg-transparent" 
            : "text-foreground/70 hover:bg-accent md:hover:border-gray-300 md:hover:bg-transparent"
        )}
      >
        Growth Map
      </Link>
      <Link 
        href={ROUTES.LEARNING_CENTER}
        className={cn(
          "md:inline-flex md:items-center md:px-1 md:pt-1 md:text-sm md:font-medium md:border-b-2 md:border-transparent",
          "block w-full py-2 pl-3 pr-4 text-base font-medium rounded-md",
          pathname?.includes(ROUTES.LEARNING_CENTER) 
            ? "text-primary md:border-primary bg-accent/50 md:bg-transparent" 
            : "text-foreground/70 hover:bg-accent md:hover:border-gray-300 md:hover:bg-transparent"
        )}
      >
        Learning Center
      </Link>
      <Link 
        href={ROUTES.REFLECTION_JOURNAL}
        className={cn(
          "md:inline-flex md:items-center md:px-1 md:pt-1 md:text-sm md:font-medium md:border-b-2 md:border-transparent",
          "block w-full py-2 pl-3 pr-4 text-base font-medium rounded-md",
          pathname?.includes(ROUTES.REFLECTION_JOURNAL) 
            ? "text-primary md:border-primary bg-accent/50 md:bg-transparent" 
            : "text-foreground/70 hover:bg-accent md:hover:border-gray-300 md:hover:bg-transparent"
        )}
      >
        Reflection Journal
      </Link>
      <Link 
        href={ROUTES.COMMUNITY}
        className={cn(
          "md:inline-flex md:items-center md:px-1 md:pt-1 md:text-sm md:font-medium md:border-b-2 md:border-transparent",
          "block w-full py-2 pl-3 pr-4 text-base font-medium rounded-md",
          pathname?.includes(ROUTES.COMMUNITY) 
            ? "text-primary md:border-primary bg-accent/50 md:bg-transparent" 
            : "text-foreground/70 hover:bg-accent md:hover:border-gray-300 md:hover:bg-transparent"
        )}
      >
        Community
      </Link>
      {user && (
        <Link 
          href="/profile"
          className={cn(
            "md:hidden md:items-center md:px-1 md:pt-1 md:text-sm md:font-medium md:border-b-2 md:border-transparent",
            "block w-full py-2 pl-3 pr-4 text-base font-medium rounded-md flex items-center",
            pathname?.includes('/profile') 
              ? "text-primary md:border-primary bg-accent/50 md:bg-transparent" 
              : "text-foreground/70 hover:bg-accent md:hover:border-gray-300 md:hover:bg-transparent"
          )}
        >
          <User className="h-4 w-4 mr-2" />
          Profile
        </Link>
      )}
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
            {!isLoading && !user && (
              <Button asChild size="sm" className="hidden md:inline-flex">
                <Link href="/login">Login</Link>
              </Button>
            )}
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
          <div className="md:hidden py-2 space-y-1 bg-background shadow-lg rounded-b-lg">
            <div className="space-y-1 px-2">
              <NavLinks />
            </div>
            <div className="border-t border-border pt-4 px-4">
              <div className="flex flex-col space-y-4">
                {!isLoading && !user && (
                  <Button asChild size="sm" className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                )}
                <div className="flex items-center justify-between space-x-4">
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}