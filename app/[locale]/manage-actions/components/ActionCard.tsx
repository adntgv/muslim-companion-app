'use client';

import { UserDailyActionConfig } from '@/services/user-daily-action-config';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Archive } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { formatDistance } from 'date-fns';

interface ActionCardProps {
  action: UserDailyActionConfig;
  onEdit: () => void;
  onDeactivate: () => void;
}

export default function ActionCard({ action, onEdit, onDeactivate }: ActionCardProps) {
  const t = useTranslations('ManageActions');
  
  // Format createdAt date (assuming action.createdAt is a Firestore Timestamp)
  const createdAtDate = action.createdAt.toDate();
  const formattedDate = formatDistance(createdAtDate, new Date(), { addSuffix: true });

  return (
    <Card className={`overflow-hidden ${!action.isActive ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{action.title}</CardTitle>
          <Badge variant={action.type === 'daily_ritual' ? 'default' : 'secondary'}>
            {action.type === 'daily_ritual' ? t('dailyRitual') : t('habitBuilding')}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {t('createdRelativeTime', { timeAgo: formattedDate })}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {action.description ? (
          <p className="text-sm">{action.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">{t('noDescription')}</p>
        )}
        
        {!action.isActive && (
          <div className="mt-2">
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              {t('inactive')}
            </Badge>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 pt-2 border-t bg-muted/30">
        <Button variant="ghost" size="sm" onClick={onEdit} className="flex gap-1">
          <Edit className="h-4 w-4" />
          {t('edit')}
        </Button>
        
        {action.isActive && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDeactivate} 
            className="flex gap-1 text-muted-foreground hover:text-destructive"
          >
            <Archive className="h-4 w-4" />
            {t('archive')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 