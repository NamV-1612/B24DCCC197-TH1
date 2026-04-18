import { getTasks, TaskItem } from '@/services/quanlycongviec/taskService';
import { TaskFilterParams, TaskStatistics } from '@/models/BaiTap7/quanlycongviec/task';

export const filterTasks = (tasks: TaskItem[], params: TaskFilterParams): TaskItem[] => {
  let result = tasks;

  if (params.status && params.status !== 'Tất cả') {
    result = result.filter((t) => t.status === params.status);
  }

  if (params.assignee) {
    result = result.filter((t) => t.assignee === params.assignee);
  }

  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(keyword));
  }

  return result;
};

export const getTaskStatistics = (): TaskStatistics => {
  const tasks = getTasks();
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'Đã xong').length,
    inProgress: tasks.filter((t) => t.status === 'Đang làm').length,
    pending: tasks.filter((t) => t.status === 'Chưa làm').length,
  };
};

export const sortTasks = (tasks: TaskItem[], sortBy: 'deadline' | 'priority' | 'status' = 'deadline'): TaskItem[] => {
  const sorted = [...tasks];
  switch (sortBy) {
    case 'deadline':
      return sorted.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    case 'priority':
      const priorityOrder = { 'Cao': 0, 'Trung bình': 1, 'Thấp': 2 };
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case 'status':
      return sorted.sort((a, b) => a.status.localeCompare(b.status));
    default:
      return sorted;
  }
};
