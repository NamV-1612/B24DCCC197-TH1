import { TaskItem } from '@/models/quanlycongviec/task';

const TASKS_KEY = 'TH7_TASK_MANAGER_TASKS';

const DEFAULT_TASKS: TaskItem[] = [
  {
    id: 1,
    title: 'Thiết kế luồng đăng nhập',
    assignee: 'An',
    priority: 'Cao',
    deadline: '2026-04-20',
    status: 'Đang làm',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Lưu công việc vào localStorage',
    assignee: 'Bình',
    priority: 'Trung bình',
    deadline: '2026-04-22',
    status: 'Chưa làm',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Hiển thị công việc của user hiện tại',
    assignee: 'Nam',
    priority: 'Cao',
    deadline: '2026-04-21',
    status: 'Chưa làm',
    createdAt: new Date().toISOString(),
  },
];

export const getTasks = (): TaskItem[] => {
  const stored = localStorage.getItem(TASKS_KEY);
  if (!stored) {
    saveTasks(DEFAULT_TASKS);
    return DEFAULT_TASKS;
  }

  try {
    return JSON.parse(stored) as TaskItem[];
  } catch {
    saveTasks(DEFAULT_TASKS);
    return DEFAULT_TASKS;
  }
};

export const saveTasks = (tasks: TaskItem[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const addTask = (task: Omit<TaskItem, 'id' | 'createdAt'>): TaskItem => {
  const newTask: TaskItem = {
    ...task,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  const tasks = getTasks();
  saveTasks([newTask, ...tasks]);
  return newTask;
};

export const updateTask = (id: number, updates: Partial<TaskItem>): TaskItem | null => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const updatedTask = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
  tasks[index] = updatedTask;
  saveTasks(tasks);
  return updatedTask;
};

export const deleteTask = (id: number): boolean => {
  const tasks = getTasks();
  const filtered = tasks.filter((t) => t.id !== id);
  if (filtered.length === tasks.length) return false;
  saveTasks(filtered);
  return true;
};

export const getTasksByAssignee = (assignee: string): TaskItem[] => {
  return getTasks().filter((t) => t.assignee === assignee);
};

export const getAssignees = (): string[] => {
  return Array.from(new Set(getTasks().map((t) => t.assignee))).sort();
};
