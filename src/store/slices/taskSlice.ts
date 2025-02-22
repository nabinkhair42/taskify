import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState } from '../../types';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Helper function to serialize dates in a task
const serializeTask = (task: Task) => ({
  ...task,
  createdAt: task.createdAt.toISOString(),
  dueDate: task.dueDate?.toISOString(),
});

// Helper function to deserialize dates in a task
const deserializeTask = (task: any): Task => ({
  ...task,
  createdAt: new Date(task.createdAt),
  dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
});

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(serializeTask(action.payload));
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = task.status === 'completed' ? 'incomplete' : 'completed';
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload.map(serializeTask);
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer; 