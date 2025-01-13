'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { timezones } from '@/lib/constants';

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    timezone: '',
    acceptTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
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
              />
              <Input
                name="email"
                type="email"
                placeholder={t('email')}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                name="password"
                type="password"
                placeholder={t('password')}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Input
                name="confirmPassword"
                type="password"
                placeholder={t('confirmPassword')}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              
              <Select
                value={formData.timezone}
                onValueChange={(value: string) => setFormData((prev) => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectTimezone')} />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((timezone) => (
                    <SelectItem key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData((prev) => ({ ...prev, acceptTerms: checked as boolean }))
                }
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                {t('acceptTerms')}{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  {t('termsAndConditions')}
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={!formData.acceptTerms}>
              {t('createAccount')}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" className="text-primary hover:underline">
              {t('signIn')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 