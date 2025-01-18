import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function Offline() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">You're Offline</h1>
        <p className="text-muted-foreground mb-8">Please check your internet connection and try again.</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    </div>
  );
} 