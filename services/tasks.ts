import { firebaseTasksService, FirebaseTask, CreateTaskData } from './firebase-tasks';

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

// Helper to convert Firebase Task to Appwrite-compatible Task format
const convertFirebaseTaskToTask = (firebaseTask: FirebaseTask): Task => {
  return {
    $id: firebaseTask.id,
    userId: firebaseTask.userId,
    title: firebaseTask.title,
    category: firebaseTask.category,
    time: firebaseTask.time,
    status: firebaseTask.status,
    iconName: firebaseTask.iconName,
    priority: firebaseTask.priority,
    date: firebaseTask.date,
  };
};

export const tasksService = {
  async createTask(task: Omit<Task, '$id'>): Promise<Task> {
    const createData: CreateTaskData = {
      userId: task.userId,
      title: task.title,
      category: task.category,
      time: task.time,
      status: task.status,
      iconName: task.iconName,
      priority: task.priority,
      date: task.date,
    };
    
    const firebaseTask = await firebaseTasksService.createTask(createData);
    return convertFirebaseTaskToTask(firebaseTask);
  },

  async getUserDailyTasks(userId: string, date: string): Promise<Task[]> {
    const firebaseTasks = await firebaseTasksService.getUserDailyTasks(userId, date);
    return firebaseTasks.map(convertFirebaseTaskToTask);
  },

  async getUserTasks(userId: string): Promise<Task[]> {
    const firebaseTasks = await firebaseTasksService.getUserTasks(userId);
    return firebaseTasks.map(convertFirebaseTaskToTask);
  },

  async updateTaskStatus(taskId: string, status: Task['status']): Promise<Task> {
    await firebaseTasksService.updateTaskStatus(taskId, status);
    
    // Firebase updateTaskStatus doesn't return the updated task, so return a partial task
    return {
      $id: taskId,
      status,
    } as Task;
  },

  async updateTask(taskId: string, taskData: Partial<Omit<Task, '$id' | 'userId'>>): Promise<Task> {
    await firebaseTasksService.updateTask(taskId, taskData);
    return {
      $id: taskId,
      ...taskData
    } as Task;
  },

  async deleteTask(taskId: string): Promise<void> {
    await firebaseTasksService.deleteTask(taskId);
  },

  async createDefaultTasks(userId: string, date: string, defaultTasks: Omit<Task, '$id' | 'userId' | 'date'>[]): Promise<Task[]> {
    const firebaseDefaultTasks = defaultTasks.map(task => ({
      title: task.title,
      category: task.category,
      time: task.time,
      status: task.status,
      iconName: task.iconName,
      priority: task.priority,
    }));
    
    const firebaseTasks = await firebaseTasksService.createDefaultTasks(userId, date, firebaseDefaultTasks);
    return firebaseTasks.map(convertFirebaseTaskToTask);
  },

  async batchUpdateTaskStatus(taskIds: string[], status: Task['status']): Promise<void> {
    await firebaseTasksService.batchUpdateTaskStatus(taskIds, status);
  },

  async deleteUserTasks(userId: string): Promise<void> {
    await firebaseTasksService.deleteUserTasks(userId);
  }
}; 