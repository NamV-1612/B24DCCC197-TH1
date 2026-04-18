    import { TaskItem } from '@/models/BaiTap7/quanlycongviec/task';

declare global {
  namespace QuanLyCongViec {
    type TaskData = Omit<TaskItem, 'id'>;
    type TaskItemWithId = TaskItem & { id: number };
  }
}

export {};
