import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc,
  deleteDoc,
  DocumentReference,
  DocumentData,
  Timestamp,
  writeBatch,
  orderBy
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
      
      const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FirebaseTask));
      
      return tasks.sort((a, b) => a.time.localeCompare(b.time));
    } catch (error) {
      console.error('Error getting user tasks:', error);
      throw error;
    }
  },

  async getUserTasks(userId: string): Promise<FirebaseTask[]> {
    try {
      const tasksQuery = query(
        collection(db, TASKS_COLLECTION),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(tasksQuery);
      
      const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FirebaseTask));
      
      return tasks.sort((a, b) => {
        const dateComparison = b.date.localeCompare(a.date);
        if (dateComparison !== 0) return dateComparison;
        
        return a.time.localeCompare(b.time);
      });
    } catch (error) {
      console.error('Error getting all user tasks:', error);
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

  async updateTask(taskId: string, taskData: Partial<Omit<CreateTaskData, 'userId'>>): Promise<void> {
    try {
      const taskRef = doc(db, TASKS_COLLECTION, taskId);
      await updateDoc(taskRef, taskData);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async deleteTask(taskId: string): Promise<void> {
    try {
      const taskRef = doc(db, TASKS_COLLECTION, taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error('Error deleting task:', error);
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
  },

  async batchUpdateTaskStatus(taskIds: string[], status: FirebaseTask['status']): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      taskIds.forEach(taskId => {
        const taskRef = doc(db, TASKS_COLLECTION, taskId);
        batch.update(taskRef, { status });
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error batch updating tasks:', error);
      throw error;
    }
  },

  async deleteUserTasks(userId: string): Promise<void> {
    try {
      const tasksQuery = query(
        collection(db, TASKS_COLLECTION),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(tasksQuery);
      
      const batch = writeBatch(db);
      querySnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error deleting user tasks:', error);
      throw error;
    }
  }
}; 