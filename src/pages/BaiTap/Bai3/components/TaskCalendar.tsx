import type { FC } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import * as moment from 'moment';
import { TaskItem, TaskStatus } from '@/models/quanlycongviec/task';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment as any);

interface TaskCalendarProps {
  tasks: TaskItem[];
}

const getStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case 'Chưa làm':
      return '#f5222d'; // red
    case 'Đang làm':
      return '#faad14'; // orange
    case 'Đã xong':
      return '#52c41a'; // green
    default:
      return '#1890ff'; // blue
  }
};

const TaskCalendar: FC<TaskCalendarProps> = ({ tasks }) => {
  const events = tasks.map((task) => ({
    id: task.id,
    title: `${task.title} (${task.assignee})`,
    start: new Date(task.deadline),
    end: new Date(task.deadline),
    allDay: true,
    status: task.status,
  }));

  const eventStyleGetter = (event: any) => {
    const backgroundColor = getStatusColor(event.status);
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.9,
      color: '#fff',
      border: `2px solid ${backgroundColor}`,
      display: 'block',
    };
    return { style };
  };

  return (
    <div style={{ height: '500px', marginTop: 24 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default TaskCalendar;
