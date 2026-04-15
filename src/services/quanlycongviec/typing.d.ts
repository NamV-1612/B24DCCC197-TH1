import { TaskItem } from '@/models/quanlycongviec/task';

declare global {
  namespace QuanLyCongViec {
    interface TaskData extends Omit<TaskItem, 'id'> {}
    interface TaskItemWithId extends TaskItem {
      id: number;
    }
  }
}

export {};
