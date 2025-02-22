import { Task } from '../types';

const TASKS_STORAGE_KEY = 'taskTracker_tasks';

// Convert Date to ISO string when saving
export const saveTasksToLocalStorage = (tasks: Task[]): void => {
  try {
    const serializedTasks = tasks.map(task => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      dueDate: task.dueDate?.toISOString(),
    }));
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(serializedTasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

// Convert ISO string back to Date when loading
export const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson);
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
}; 