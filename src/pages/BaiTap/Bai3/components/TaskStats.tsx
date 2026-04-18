import type { FC } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { TaskItem } from '@/models/BaiTap7/quanlycongviec/task';

interface TaskStatsProps {
  tasks: TaskItem[];
  userTasks: TaskItem[];
}

const TaskStats: FC<TaskStatsProps> = ({ tasks, userTasks }) => {
  const completedCount = tasks.filter((task) => task.status === 'Đã xong').length;

  return (
    <Row gutter={16} style={{ marginTop: 16, marginBottom: 16 }}>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Statistic title="Tổng số công việc" value={tasks.length} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card>
          <Statistic title="Công việc đã hoàn thành" value={completedCount} />
        </Card>
      </Col>
      <Col xs={24} sm={24} lg={8}>
        <Card>
          <Statistic title="Công việc của bạn" value={userTasks.length} />
        </Card>
      </Col>
    </Row>
  );
};

export default TaskStats;
