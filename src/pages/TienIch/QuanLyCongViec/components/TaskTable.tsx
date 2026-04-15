import type { FC } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TaskItem } from '@/services/TaskService';

interface TaskTableProps {
  tasks: TaskItem[];
  onEdit: (task: TaskItem) => void;
  onDelete: (task: TaskItem) => void;
}

const TaskTable: FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Tên công việc',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: TaskItem, b: TaskItem) => a.title.localeCompare(b.title),
    },
    {
      title: 'Người được giao',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a: TaskItem, b: TaskItem) => a.deadline.localeCompare(b.deadline),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_: any, record: TaskItem) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => onEdit(record)} />
          <Popconfirm title="Xóa công việc này?" onConfirm={() => onDelete(record)}>
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={tasks} pagination={{ pageSize: 6 }} />;
};

export default TaskTable;
