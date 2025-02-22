// Task status type
export type TaskStatus = 'completed' | 'incomplete';

// Task priority type
export type TaskPriority = 'low' | 'medium' | 'high';

// Task interface
export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  dueDate?: Date;  // Optional due date
}

// Task state interface for Redux
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Form input interface
export interface TaskFormInput {
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
} 