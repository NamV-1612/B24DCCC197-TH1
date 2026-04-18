import type { FC } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import * as moment from 'moment';
import { TaskItem } from '@/services/TaskService';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment as any);

interface TaskCalendarProps {
  tasks: TaskItem[];
}

const TaskCalendar: FC<TaskCalendarProps> = ({ tasks }) => {
  const events = tasks.map((task) => ({
    id: task.id,
    title: `${task.title} (${task.assignee})`,
    start: new Date(task.deadline),
    end: new Date(task.deadline),
    allDay: true,
    status: task.status,
  }));

  const eventPropGetter = (event: { status: string }) => {
    let backgroundColor = '#52c41a';
    let borderColor = '#389e0d';

    if (event.status === 'Chưa làm') {
      backgroundColor = '#ff4d4f';
      borderColor = '#d32029';
    } else if (event.status === 'Đang làm') {
      backgroundColor = '#faad14';
      borderColor = '#d48806';
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        color: '#ffffff',
      },
    };
  };

  return (
    <div style={{ height: '500px', marginTop: 24 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventPropGetter}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default TaskCalendar;
