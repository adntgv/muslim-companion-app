'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getCurrentSession, account } from '@/lib/appwrite';
import { Loader2 } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const t = useTranslations('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const session = await getCurrentSession();
      if (session) {
        setProfile({
          name: session.data?.name || '',
          email: session.data?.email || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error(t('loadError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await account.updateName(profile.name);
      toast.success(t('updateSuccess'));
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(t('updateError'));
    } finally {
      setIsSaving(false);
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
    <div className="container max-w-2xl py-8">
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 