export type TaskPriority = 'Thấp' | 'Trung bình' | 'Cao';
export type TaskStatus = 'Chưa làm' | 'Đang làm' | 'Đã xong';

export interface TaskItem {
  id: number;
  title: string;
  assignee: string;
  priority: TaskPriority;
  deadline: string;
  status: TaskStatus;
}

const TASKS_KEY = 'TH7_TASK_MANAGER_TASKS';
const USER_KEY = 'TH7_TASK_MANAGER_USER';

const DEFAULT_TASKS: TaskItem[] = [
  {
    id: 1,
    title: 'Thiết kế luồng đăng nhập',
    assignee: 'An',
    priority: 'Cao',
    deadline: '2026-04-20',
    status: 'Đang làm',
  },
  {
    id: 2,
    title: 'Lưu công việc vào localStorage',
    assignee: 'Bình',
    priority: 'Trung bình',
    deadline: '2026-04-22',
    status: 'Chưa làm',
  },
  {
    id: 3,
    title: 'Hiển thị công việc của user hiện tại',
    assignee: 'Nam',
    priority: 'Cao',
    deadline: '2026-04-21',
    status: 'Chưa làm',
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

export const getCurrentUser = (): string | null => {
  return localStorage.getItem(USER_KEY);
};

export const setCurrentUser = (username: string) => {
  localStorage.setItem(USER_KEY, username);
};

export const clearCurrentUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getAssignees = (tasks: TaskItem[]) => {
  return Array.from(new Set(tasks.map((task) => task.assignee))).sort();
};
