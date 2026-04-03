import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { Task, TaskStatus } from '../data/tasks';
import { INITIAL_TASKS } from '../data/tasks';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByAgent: (agentId: string) => Task[];
  getActiveMissions: () => Task[];
  getCompletedToday: () => Task[];
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  getTaskProgress: (taskId: string) => number;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: INITIAL_TASKS,

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: nanoid(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
        return newTask;
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      moveTask: (id, newStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === id) {
              const updates: Partial<Task> = {
                status: newStatus,
                updatedAt: new Date().toISOString(),
              };
              if (newStatus === 'completed') {
                updates.completedAt = new Date().toISOString();
              }
              return { ...task, ...updates };
            }
            return task;
          }),
        }));
      },

      getTasksByStatus: (status) => {
        return get().tasks.filter((task) => task.status === status);
      },

      getTasksByAgent: (agentId) => {
        return get().tasks.filter((task) => task.agentId === agentId);
      },

      getActiveMissions: () => {
        return get().tasks.filter((task) =>
          ['in-progress', 'review', 'testing'].includes(task.status)
        );
      },

      getCompletedToday: () => {
        const today = new Date().toDateString();
        return get().tasks.filter(
          (task) =>
            task.status === 'completed' &&
            task.completedAt &&
            new Date(task.completedAt).toDateString() === today
        );
      },

      toggleSubtask: (taskId, subtaskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                subtasks: task.subtasks.map((sub) =>
                  sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
                ),
                updatedAt: new Date().toISOString(),
              };
            }
            return task;
          }),
        }));
      },

      getTaskProgress: (taskId) => {
        const task = get().tasks.find((t) => t.id === taskId);
        if (!task || task.subtasks.length === 0) return 0;
        const completed = task.subtasks.filter((sub) => sub.completed).length;
        return Math.round((completed / task.subtasks.length) * 100);
      },
    }),
    {
      name: 'aarya-tasks-storage',
    }
  )
);
