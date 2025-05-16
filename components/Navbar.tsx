'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/navigation';
import { useAuth } from '@/contexts/auth-context';
import { User, Menu, X, ListChecks, LayoutDashboard, Settings, CheckSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
// import LocaleSwitcher from './LocaleSwitcher';
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
        <LayoutDashboard className="h-4 w-4 mr-2 inline md:hidden" />
        Dashboard
      </Link>
      <Link 
        href={ROUTES.DAILY_PLANNER}
        className={cn(
          "md:inline-flex md:items-center md:px-1 md:pt-1 md:text-sm md:font-medium md:border-b-2 md:border-transparent",
          "block w-full py-2 pl-3 pr-4 text-base font-medium rounded-md",
          pathname?.includes(ROUTES.DAILY_PLANNER) 
            ? "text-primary md:border-primary bg-accent/50 md:bg-transparent" 
            : "text-foreground/70 hover:bg-accent md:hover:border-gray-300 md:hover:bg-transparent"
        )}
      >
        <ListChecks className="h-4 w-4 mr-2 inline md:hidden" />
        Daily Actions
      </Link>
      <Link 
        href={ROUTES.MANAGE_ACTIONS}
        className={cn(
          "md:inline-flex md:items-center md:px-1 md:pt-1 md:text-sm md:font-medium md:border-b-2 md:border-transparent",
          "block w-full py-2 pl-3 pr-4 text-base font-medium rounded-md",
          pathname?.includes(ROUTES.MANAGE_ACTIONS) 
            ? "text-primary md:border-primary bg-accent/50 md:bg-transparent" 
            : "text-foreground/70 hover:bg-accent md:hover:border-gray-300 md:hover:bg-transparent"
        )}
      >
        <CheckSquare className="h-4 w-4 mr-2 inline md:hidden" />
        Manage Actions
      </Link>
      {user && (
        <Link 
          href={ROUTES.PROFILE}
          className={cn(
            "md:hidden md:items-center md:px-1 md:pt-1 md:text-sm md:font-medium md:border-b-2 md:border-transparent",
            "block w-full py-2 pl-3 pr-4 text-base font-medium rounded-md flex items-center",
            pathname?.includes(ROUTES.PROFILE) 
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
              {user && (
                <Link 
                  href={ROUTES.PROFILE}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent",
                    pathname?.includes(ROUTES.PROFILE) 
                      ? "text-primary border-primary" 
                      : "text-foreground/70 hover:border-gray-300"
                  )}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              )}
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
                {user && (
                  <Button asChild size="sm" variant="outline" className="w-full flex items-center justify-center">
                    <Link href={ROUTES.PROFILE}>
                      <Settings className="h-4 w-4 mr-2" />
                      App Settings
                    </Link>
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