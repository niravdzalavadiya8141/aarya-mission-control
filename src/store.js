import create from 'zustand';
const useStore = create((set) => ({
  tasks: [],
  agents: [],
  activity: [],
  deals: [],
  achievements: [],
  stats: {},
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updatedTask) => set((state) => ({ tasks: state.tasks.map(task => task.id === id ? updatedTask : task) })),
  
}));
export default useStore;
