'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslations } from 'next-intl';
import { userDailyActionConfigService, UserDailyActionConfig, CreateUserDailyActionConfigDto } from '@/services/user-daily-action-config';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth-context';

// Define form schema with Zod
const actionFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required"
  }).max(100),
  description: z.string().optional(),
  type: z.enum(['daily_ritual', 'habit_building'], {
    required_error: "Please select a type",
  })
});

type ActionFormValues = z.infer<typeof actionFormSchema>;

interface AddEditActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (action: UserDailyActionConfig) => void;
  action?: UserDailyActionConfig; // Optional for edit mode
}

export default function AddEditActionModal({ isOpen, onClose, onSave, action }: AddEditActionModalProps) {
  const t = useTranslations('ManageActions');
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!action;

  // Initialize form with default values or existing action data
  const form = useForm<ActionFormValues>({
    resolver: zodResolver(actionFormSchema),
    defaultValues: {
      title: action?.title || '',
      description: action?.description || '',
      type: action?.type || 'daily_ritual',
    },
  });

  async function onSubmit(data: ActionFormValues) {
    if (!user?.uid) {
      toast.error(t('notAuthenticated'));
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && action) {
        // Handle edit mode
        await userDailyActionConfigService.updateAction(action.id, data);
        const updatedAction: UserDailyActionConfig = {
          ...action,
          ...data
        };
        onSave(updatedAction);
      } else {
        // Handle create mode
        const newActionData: CreateUserDailyActionConfigDto = {
          title: data.title,
          description: data.description,
          type: data.type,
        };
        
        const newAction = await userDailyActionConfigService.createAction(user.uid, newActionData);
        onSave(newAction);
      }
    } catch (error) {
      console.error('Failed to save action:', error);
      toast.error(isEditMode ? t('errorUpdatingAction') : t('errorCreatingAction'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t('editAction') : t('addNewAction')}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('actionTitle')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('actionTitlePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('actionDescription')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t('actionDescriptionPlaceholder')} 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t('actionType')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="daily_ritual" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('dailyRitual')}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="habit_building" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('habitBuilding')}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
                {t('cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting 
                  ? t('saving') 
                  : isEditMode 
                    ? t('update') 
                    : t('create')
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 