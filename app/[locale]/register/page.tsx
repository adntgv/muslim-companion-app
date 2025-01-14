'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { createAccount } from '@/lib/appwrite';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const { checkSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    acceptTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('passwordMismatch'));
      return;
    }

    if (!formData.acceptTerms) {
      toast.error(t('acceptTermsError'));
      return;
    }

    setIsLoading(true);
    try {
      await createAccount(formData.email, formData.password, formData.name);
      await checkSession();
      toast.success(t('registrationSuccess'));
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('register')}</CardTitle>
          <CardDescription>{t('registerDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                name="name"
                placeholder={t('fullName')}
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              <Input
                name="email"
                type="email"
                placeholder={t('email')}
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              <Input
                name="password"
                type="password"
                placeholder={t('password')}
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              <Input
                name="confirmPassword"
                type="password"
                placeholder={t('confirmPassword')}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                }
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                {t('acceptTerms')}
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !formData.acceptTerms}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('registering')}
                </>
              ) : (
                t('register')
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t('haveAccount')}</span>{' '}
              <Button
                variant="link"
                className="p-0"
                onClick={() => router.push('/login')}
              >
                {t('signIn')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 