export type TaskPriority = 'Thấp' | 'Trung bình' | 'Cao';
export type TaskStatus = 'Chưa làm' | 'Đang làm' | 'Đã xong';

export interface TaskItem {
  id: number;
  title: string;
  assignee: string;
  priority: TaskPriority;
  deadline: string;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskFilterParams {
  status?: TaskStatus | 'Tất cả';
  assignee?: string;
  keyword?: string;
}

export interface TaskStatistics {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}
