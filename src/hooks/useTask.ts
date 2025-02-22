import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskFormInput } from '../types';
import { addTask, deleteTask, toggleTaskStatus } from '../store/slices/taskSlice';
import { RootState } from '../store';
import { saveTasksToLocalStorage } from '../utils/localStorage';
import { useSnackbar } from './useSnackbar';

export const useTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => 
    state.tasks.tasks.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    }))
  );
  const { showSnackbar } = useSnackbar();

  const createTask = useCallback((taskInput: TaskFormInput) => {
    try {
      const newTask: Task = {
        id: uuidv4(),
        ...taskInput,
        priority: 'medium',
        createdAt: new Date(),
      };
      dispatch(addTask(newTask));
      saveTasksToLocalStorage([...tasks, newTask]);
      showSnackbar('Task created successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to create task', 'error');
    }
  }, [dispatch, tasks, showSnackbar]);

  const removeTask = useCallback((taskId: string) => {
    try {
      dispatch(deleteTask(taskId));
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      saveTasksToLocalStorage(updatedTasks);
      showSnackbar('Task deleted successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to delete task', 'error');
    }
  }, [dispatch, tasks, showSnackbar]);

  const toggleStatus = useCallback((taskId: string) => {
    try {
      dispatch(toggleTaskStatus(taskId));
      const updatedTasks = tasks.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'completed' ? 'incomplete' : 'completed' as TaskStatus }
          : task
      );
      saveTasksToLocalStorage(updatedTasks);
      showSnackbar('Task status updated!', 'info');
    } catch (error) {
      showSnackbar('Failed to update task status', 'error');
    }
  }, [dispatch, tasks, showSnackbar]);

  return {
    tasks,
    createTask,
    removeTask,
    toggleStatus,
  };
}; 