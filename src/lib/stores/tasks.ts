import { writable } from 'svelte/store';
import * as api from '../api';

export interface SubTask {
  _id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  userId: string;
  subTasks: SubTask[];
}

function createTaskStore() {
  const { subscribe, set, update } = writable<Task[]>([]);

  return {
    subscribe,
    init: async (userId: string) => {
      if (userId) {
        const tasks = await api.getTasks(userId);
        set(tasks);
      }
    },
    addTask: async (userId: string, title: string, description: string) => {
      try {
        const newTask = await api.createTask({
          userId,
          title,
          description
        });
        update(tasks => [...tasks, newTask]);
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    },
    addSubTask: async (taskId: string, title: string) => {
      try {
        const updatedTask = await api.addSubTask(taskId, title);
        update(tasks => tasks.map(task => 
          task._id === taskId ? updatedTask : task
        ));
      } catch (error) {
        console.error('Failed to add subtask:', error);
      }
    },
    toggleTask: async (taskId: string) => {
      try {
        const task = await api.updateTask(taskId, { completed: true });
        update(tasks => tasks.map(t => 
          t._id === taskId ? task : t
        ));
      } catch (error) {
        console.error('Failed to toggle task:', error);
      }
    },
    toggleSubTask: async (taskId: string, subtaskId: string) => {
      try {
        const task = await api.updateSubTask(taskId, subtaskId, { completed: true });
        update(tasks => tasks.map(t => 
          t._id === taskId ? task : t
        ));
      } catch (error) {
        console.error('Failed to toggle subtask:', error);
      }
    },
    deleteTask: async (taskId: string) => {
      try {
        await api.deleteTask(taskId);
        update(tasks => tasks.filter(task => task._id !== taskId));
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };
}

export const tasks = createTaskStore();