import { useEffect } from 'react';
import type { FC } from 'react';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import * as moment from 'moment';
import { TaskItem, TaskPriority, TaskStatus } from '@/models/quanlycongviec/task';

interface TaskFormProps {
  initialTask?: TaskItem;
  assignees: string[];
  onSave: (task: QuanLyCongViec.TaskData) => void;
  onCancel: () => void;
}

const priorities: TaskPriority[] = ['Thấp', 'Trung bình', 'Cao'];
const statuses: TaskStatus[] = ['Chưa làm', 'Đang làm', 'Đã xong'];

const TaskForm: FC<TaskFormProps> = ({ initialTask, assignees, onSave, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialTask) {
      form.setFieldsValue({
        title: initialTask.title,
        assignee: initialTask.assignee,
        priority: initialTask.priority,
        deadline: moment(initialTask.deadline),
        status: initialTask.status,
      });
    } else {
      form.resetFields();
    }
  }, [initialTask, form]);

  const handleFinish = (values: any) => {
    onSave({
      title: values.title.trim(),
      assignee: values.assignee,
      priority: values.priority,
      deadline: values.deadline.format('YYYY-MM-DD'),
      status: values.status,
    });
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ priority: 'Trung bình', status: 'Chưa làm' }}>
      <Form.Item
        name="title"
        label="Tên công việc"
        rules={[{ required: true, message: 'Vui lòng nhập tên công việc' }]}
      >
        <Input placeholder="Nhập tên công việc" />
      </Form.Item>

      <Form.Item
        name="assignee"
        label="Người được giao"
        rules={[{ required: true, message: 'Vui lòng chọn người được giao' }]}
      >
        <Select
          showSearch
          placeholder="Chọn người được giao"
          options={assignees.map((name) => ({ label: name, value: name }))}
          filterOption={(input, option) => (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())}
        />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Mức độ ưu tiên"
        rules={[{ required: true, message: 'Vui lòng chọn mức độ ưu tiên' }]}
      >
        <Select options={priorities.map((value) => ({ label: value, value }))} />
      </Form.Item>

      <Form.Item
        name="deadline"
        label="Thời hạn hoàn thành"
        rules={[{ required: true, message: 'Vui lòng chọn thời hạn' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="status"
        label="Trạng thái"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
      >
        <Select options={statuses.map((value) => ({ label: value, value }))} />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {initialTask ? 'Cập nhật' : 'Thêm công việc'}
          </Button>
          {initialTask && <Button onClick={onCancel}>Hủy</Button>}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
