'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, LogOut, Moon, Sun, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import ThemeToggle from '@/components/themeToggle';
import LocaleSwitcher from '@/components/LocaleSwitcher';

interface UserProfile {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const t = useTranslations('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.displayName || '',
        email: user.email || '',
      });
      setIsLoading(false);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: profile.name
        });
        toast.success(t('updateSuccess'));
      } else {
        throw new Error('No authenticated user');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(t('updateError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(t('logoutSuccess'));
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('name')}</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder={t('name')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                value={profile.email}
                disabled
                type="email"
              />
              <p className="text-sm text-muted-foreground">
                {t('emailHelp')}
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('saving')}
                  </>
                ) : (
                  t('saveChanges')
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleLogout}
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t('logout')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* App Preferences Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t('preferences') || 'App Preferences'}</CardTitle>
          <CardDescription>
            {t('preferencesDescription') || 'Customize your app experience'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Theme Preference */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('theme') || 'Theme'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('themeDescription') || 'Toggle between light and dark mode'}
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </div>
            
            <hr className="my-4 border-t border-border" />
            
            {/* Language Preference */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('language') || 'Language'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('languageDescription') || 'Change the application language'}
                  </p>
                </div>
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 