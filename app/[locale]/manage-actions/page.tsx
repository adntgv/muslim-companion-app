'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { userDailyActionConfigService, UserDailyActionConfig } from '@/services/user-daily-action-config';
import ActionCard from './components/ActionCard';
import AddEditActionModal from './components/AddEditActionModal';
import { toast } from 'sonner';

export default function ManageActionsPage() {
  const t = useTranslations('ManageActions');
  const { user } = useAuth();
  const [actions, setActions] = useState<UserDailyActionConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAction, setEditingAction] = useState<UserDailyActionConfig | null>(null);

  // Fetch user's actions
  useEffect(() => {
    async function loadActions() {
      if (!user?.uid) return;

      setIsLoading(true);
      try {
        const userActions = await userDailyActionConfigService.getActions(user.uid);
        setActions(userActions);
      } catch (error) {
        console.error('Failed to load actions:', error);
        toast.error(t('errorLoadingActions'));
      } finally {
        setIsLoading(false);
      }
    }

    loadActions();
  }, [user?.uid, t]);

  const handleAddAction = async (newAction: UserDailyActionConfig) => {
    if (!user?.uid) return;
    
    setActions(prev => [...prev, newAction]);
    setIsAddModalOpen(false);
    toast.success(t('actionCreated'));
  };

  const handleUpdateAction = async (updatedAction: UserDailyActionConfig) => {
    setActions(prev => 
      prev.map(action => 
        action.id === updatedAction.id ? updatedAction : action
      )
    );
    setEditingAction(null);
    toast.success(t('actionUpdated'));
  };

  const handleDeactivateAction = async (actionId: string) => {
    if (!user?.uid) return;
    
    try {
      await userDailyActionConfigService.deactivateAction(actionId);
      setActions(prev => 
        prev.map(action => 
          action.id === actionId ? { ...action, isActive: false } : action
        )
      );
      toast.success(t('actionDeactivated'));
    } catch (error) {
      console.error('Failed to deactivate action:', error);
      toast.error(t('errorDeactivatingAction'));
    }
  };

  const handleEditAction = (action: UserDailyActionConfig) => {
    setEditingAction(action);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{t('pageTitle')}</h1>
          <p className="text-muted-foreground">{t('pageDescription')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex gap-2">
          <Plus className="h-4 w-4" /> {t('addAction')}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-pulse text-muted-foreground">{t('loading')}</div>
        </div>
      ) : actions.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {actions.map(action => (
            <ActionCard 
              key={action.id} 
              action={action} 
              onEdit={() => handleEditAction(action)}
              onDeactivate={() => handleDeactivateAction(action.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-muted/30">
          <p className="text-muted-foreground mb-4">{t('noActions')}</p>
          <Button onClick={() => setIsAddModalOpen(true)} variant="outline">
            {t('createFirstAction')}
          </Button>
        </div>
      )}

      <AddEditActionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddAction}
      />

      {editingAction && (
        <AddEditActionModal 
          isOpen={!!editingAction} 
          onClose={() => setEditingAction(null)}
          onSave={handleUpdateAction}
          action={editingAction}
        />
      )}
    </div>
  );
} 