import type { FC } from 'react';
import { Input, Select, Space, Button } from 'antd';
import { TaskStatus } from '@/models/quanlycongviec/task';

const { Search } = Input;

interface TaskFilterProps {
  statusFilter: TaskStatus | 'Tất cả';
  assigneeFilter: string;
  assignees: string[];
  keyword: string;
  onChangeStatus: (value: TaskStatus | 'Tất cả') => void;
  onChangeAssignee: (value: string) => void;
  onSearch: (value: string) => void;
  onReset: () => void;
}

const STATUS_OPTIONS: (TaskStatus | 'Tất cả')[] = ['Tất cả', 'Chưa làm', 'Đang làm', 'Đã xong'];

const TaskFilter: FC<TaskFilterProps> = ({
  statusFilter,
  assigneeFilter,
  assignees,
  keyword,
  onChangeStatus,
  onChangeAssignee,
  onSearch,
  onReset,
}) => {
  return (
    <Space wrap style={{ marginBottom: 16 }}>
      <Select
        value={statusFilter}
        onChange={onChangeStatus}
        style={{ width: 180 }}
        options={STATUS_OPTIONS.map((value) => ({ label: value, value }))}
      />
      <Select
        value={assigneeFilter}
        onChange={onChangeAssignee}
        style={{ width: 200 }}
        options={[{ label: 'Tất cả thành viên', value: '' }, ...assignees.map((value) => ({ label: value, value }))]}
      />
      <Search
        placeholder="Tìm theo tên công việc"
        allowClear
        value={keyword}
        onSearch={onSearch}
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: 260 }}
      />
      <Button onClick={onReset}>Reset lọc</Button>
    </Space>
  );
};

export default TaskFilter;
