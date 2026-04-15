import { TaskItem } from '@/models/quanlycongviec/task';

declare global {
  namespace QuanLyCongViec {
    type TaskData = Omit<TaskItem, 'id'>;
    type TaskItemWithId = TaskItem & { id: number };
  }
}

export {};
