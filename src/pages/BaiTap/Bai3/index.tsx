import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Divider, Input, message, Row, Typography } from 'antd';
import { TaskItem } from '@/models/quanlycongviec/task';
import { getTasks, addTask, updateTask, deleteTask, getAssignees } from '@/services/quanlycongviec/taskService';
import { getCurrentUser, setCurrentUser, clearCurrentUser } from '@/services/quanlycongviec/userService';
import TaskFilter from './components/TaskFilter';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import TaskCalendar from './components/TaskCalendar';
import TaskStats from './components/TaskStats';

const { Title, Text } = Typography;

const Bai3_QuanLyCongViec = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [currentUser, setCurrentUserState] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tất cả' | 'Chưa làm' | 'Đang làm' | 'Đã xong'>('Tất cả');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [selectedTask, setSelectedTask] = useState<TaskItem | undefined>(undefined);
  const [loginName, setLoginName] = useState('');

  useEffect(() => {
    setTasks(getTasks());
    const savedUser = getCurrentUser();
    if (savedUser) {
      setCurrentUserState(savedUser);
      setLoginName(savedUser);
    }
  }, []);

  const assignees = useMemo(() => getAssignees(), []);

  const handleLogin = () => {
    const username = loginName.trim();
    if (!username) {
      message.error('Vui lòng nhập tên người dùng');
      return;
    }
    setCurrentUser(username);
    setCurrentUserState(username);
    message.success(`Đăng nhập thành công: ${username}`);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUserState('');
    message.success('Đã đăng xuất');
  };

  const handleSaveTask = (taskData: Omit<TaskItem, 'id'>) => {
    if (selectedTask) {
      const updated = updateTask(selectedTask.id, taskData);
      if (updated) {
        setTasks(getTasks());
        message.success('Cập nhật công việc thành công');
      }
    } else {
      addTask(taskData);
      setTasks(getTasks());
      message.success('Đã thêm công việc mới');
    }
    setSelectedTask(undefined);
  };

  const handleEditTask = (task: TaskItem) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = (task: TaskItem) => {
    const success = deleteTask(task.id);
    if (success) {
      setTasks(getTasks());
      message.success('Xóa công việc thành công');
      if (selectedTask?.id === task.id) {
        setSelectedTask(undefined);
      }
    }
  };

  const handleResetFilter = () => {
    setAssigneeFilter('');
    setStatusFilter('Tất cả');
    setSearchKeyword('');
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === 'Tất cả' || task.status === statusFilter;
    const matchesAssignee = !assigneeFilter || task.assignee === assigneeFilter;
    const matchesKeyword = task.title.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesStatus && matchesAssignee && matchesKeyword;
  });

  const currentUserTasks = filteredTasks.filter((task) => task.assignee === currentUser);

  return (
    <div>
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col flex="1">
            <Title level={4}>Bài 3: Quản lý công việc nhóm</Title>
            <Text type="secondary">Ứng dụng quản lý task nhóm với login, lọc, lịch và thống kê.</Text>
          </Col>
          <Col>
            {currentUser ? (
              <div>
                <Text strong>Xin chào, {currentUser}</Text>
                <Button style={{ marginLeft: 12 }} onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Input
                  placeholder="Tên người dùng"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  style={{ width: 200 }}
                  onPressEnter={handleLogin}
                />
                <Button type="primary" onClick={handleLogin}>
                  Đăng nhập
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Card>

      {currentUser && (
        <>
          <TaskStats tasks={tasks} userTasks={tasks.filter((task) => task.assignee === currentUser)} />

          <Card title="Bộ lọc công việc">
            <TaskFilter
              assignees={assignees}
              statusFilter={statusFilter}
              assigneeFilter={assigneeFilter}
              keyword={searchKeyword}
              onChangeStatus={setStatusFilter}
              onChangeAssignee={setAssigneeFilter}
              onSearch={setSearchKeyword}
              onReset={handleResetFilter}
            />
          </Card>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col xs={24} lg={10}>
              <Card title={selectedTask ? 'Sửa công việc' : 'Thêm công việc mới'}>
                <TaskForm
                  assignees={[...new Set([currentUser, ...assignees])].sort()}
                  initialTask={selectedTask}
                  onSave={handleSaveTask}
                  onCancel={() => setSelectedTask(undefined)}
                />
              </Card>
            </Col>
            <Col xs={24} lg={14}>
              <Card title="Danh sách công việc" extra={<Text type="secondary">Hiển thị {filteredTasks.length} công việc</Text>}>
                <TaskTable tasks={filteredTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
              </Card>
            </Col>
          </Row>

          <Divider />

          <Card title="Công việc của bạn" style={{ marginTop: 16 }}>
            {currentUserTasks.length ? (
              <ul style={{ paddingLeft: 20 }}>
                {currentUserTasks.map((task) => (
                  <li key={task.id}>
                    {task.title} - {task.priority} - {task.status} - deadline {task.deadline}
                  </li>
                ))}
              </ul>
            ) : (
              <Text>Không có công việc được giao cho bạn trong bộ lọc hiện tại.</Text>
            )}
          </Card>

          <TaskCalendar tasks={filteredTasks} />
        </>
      )}
    </div>
  );
};

export default Bai3_QuanLyCongViec;

