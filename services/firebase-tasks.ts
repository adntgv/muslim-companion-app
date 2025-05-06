import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc,
  DocumentReference,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const TASKS_COLLECTION = 'tasks';

export interface FirebaseTask {
  id: string;
  userId: string;
  title: string;
  category: string;
  time: string;
  status: 'upcoming' | 'completed' | 'missed';
  iconName: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
  createdAt: Timestamp;
}

export interface CreateTaskData {
  userId: string;
  title: string;
  category: string;
  time: string;
  status: 'upcoming' | 'completed' | 'missed';
  iconName: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
}

export const firebaseTasksService = {
  async createTask(taskData: CreateTaskData): Promise<FirebaseTask> {
    try {
      const taskWithTimestamp = {
        ...taskData,
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskWithTimestamp);
      
      return {
        id: docRef.id,
        ...taskWithTimestamp
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async getUserDailyTasks(userId: string, date: string): Promise<FirebaseTask[]> {
    try {
      const tasksQuery = query(
        collection(db, TASKS_COLLECTION),
        where('userId', '==', userId),
        where('date', '==', date)
      );
      
      const querySnapshot = await getDocs(tasksQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FirebaseTask));
    } catch (error) {
      console.error('Error getting user tasks:', error);
      throw error;
    }
  },

  async updateTaskStatus(taskId: string, status: FirebaseTask['status']): Promise<void> {
    try {
      const taskRef = doc(db, TASKS_COLLECTION, taskId);
      await updateDoc(taskRef, { status });
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  },

  async createDefaultTasks(userId: string, date: string, defaultTasks: Omit<CreateTaskData, 'userId' | 'date'>[]): Promise<FirebaseTask[]> {
    try {
      const promises = defaultTasks.map(task => 
        this.createTask({
          ...task,
          userId,
          date
        })
      );
      
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error creating default tasks:', error);
      throw error;
    }
  }
}; 