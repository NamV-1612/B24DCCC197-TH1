import { TaskItem } from '@/models/BaiTap7/quanlycongviec/task';

declare global {
  namespace QuanLyCongViec {
    interface TaskData extends Omit<TaskItem, 'id'> {}
    interface TaskItemWithId extends TaskItem {
      id: number;
    }
  }
}

export {};
