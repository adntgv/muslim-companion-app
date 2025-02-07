import { ID, Query, Models } from 'appwrite';
import { databases } from '@/lib/appwrite';

const DATABASE_ID = 'falah';
const TASKS_COLLECTION_ID = 'tasks';

export interface Task {
  $id: string;
  userId: string;
  title: string;
  category: string;
  time: string;
  status: 'upcoming' | 'completed' | 'missed';
  iconName: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
}

export const tasksService = {
  async createTask(task: Omit<Task, '$id'>): Promise<Task> {
    const response = await databases.createDocument(
      DATABASE_ID,
      TASKS_COLLECTION_ID,
      ID.unique(),
      task
    );
    return response as unknown as Task;
  },

  async getUserDailyTasks(userId: string, date: string): Promise<Task[]> {
    const response = await databases.listDocuments(
      DATABASE_ID,
      TASKS_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.equal('date', date)
      ]
    );
    return response.documents as unknown as Task[];
  },

  async updateTaskStatus(taskId: string, status: Task['status']): Promise<Task> {
    const response = await databases.updateDocument(
      DATABASE_ID,
      TASKS_COLLECTION_ID,
      taskId,
      { status }
    );
    return response as unknown as Task;
  },

  async createDefaultTasks(userId: string, date: string, defaultTasks: Omit<Task, '$id' | 'userId' | 'date'>[]): Promise<Task[]> {
    const promises = defaultTasks.map(task => 
      this.createTask({
        ...task,
        userId,
        date
      })
    );
    return await Promise.all(promises);
  }
}; 