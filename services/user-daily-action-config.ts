import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const USER_DAILY_ACTION_CONFIG_COLLECTION = 'userDailyActionConfigs';

export interface UserDailyActionConfig {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: 'daily_ritual' | 'habit_building';
  createdAt: Timestamp;
  isActive: boolean;
}

export interface CreateUserDailyActionConfigDto {
  title: string;
  description?: string;
  type: 'daily_ritual' | 'habit_building';
}

export interface UpdateUserDailyActionConfigDto {
  title?: string;
  description?: string;
  type?: 'daily_ritual' | 'habit_building';
  isActive?: boolean;
}

export const userDailyActionConfigService = {
  /**
   * Creates a new daily action configuration for a user
   */
  async createAction(userId: string, data: CreateUserDailyActionConfigDto): Promise<UserDailyActionConfig> {
    try {
      const actionWithMetadata = {
        userId,
        ...data,
        createdAt: Timestamp.now(),
        isActive: true
      };
      
      const docRef = await addDoc(
        collection(db, USER_DAILY_ACTION_CONFIG_COLLECTION), 
        actionWithMetadata
      );
      
      return {
        id: docRef.id,
        ...actionWithMetadata
      };
    } catch (error) {
      console.error('Error creating user daily action config:', error);
      throw error;
    }
  },

  /**
   * Gets all daily action configurations for a user
   */
  async getActions(userId: string): Promise<UserDailyActionConfig[]> {
    try {
      const actionsQuery = query(
        collection(db, USER_DAILY_ACTION_CONFIG_COLLECTION),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(actionsQuery);
      
      const actions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserDailyActionConfig));
      
      return actions;
    } catch (error) {
      console.error('Error getting user daily action configs:', error);
      throw error;
    }
  },

  /**
   * Gets all active daily action configurations for a user
   */
  async getActiveActions(userId: string): Promise<UserDailyActionConfig[]> {
    try {
      const actionsQuery = query(
        collection(db, USER_DAILY_ACTION_CONFIG_COLLECTION),
        where('userId', '==', userId),
        where('isActive', '==', true)
      );
      
      const querySnapshot = await getDocs(actionsQuery);
      
      const actions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserDailyActionConfig));
      
      return actions;
    } catch (error) {
      console.error('Error getting active user daily action configs:', error);
      throw error;
    }
  },

  /**
   * Updates a daily action configuration
   */
  async updateAction(actionId: string, data: UpdateUserDailyActionConfigDto): Promise<void> {
    try {
      const actionRef = doc(db, USER_DAILY_ACTION_CONFIG_COLLECTION, actionId);
      await updateDoc(actionRef, data as DocumentData);
    } catch (error) {
      console.error('Error updating user daily action config:', error);
      throw error;
    }
  },

  /**
   * Deactivates a daily action configuration
   */
  async deactivateAction(actionId: string): Promise<void> {
    try {
      return this.updateAction(actionId, { isActive: false });
    } catch (error) {
      console.error('Error deactivating user daily action config:', error);
      throw error;
    }
  }
}; 