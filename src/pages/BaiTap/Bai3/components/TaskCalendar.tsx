import type { FC } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import * as moment from 'moment';
import { TaskItem } from '@/models/quanlycongviec/task';
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
  }));

  return (
    <div style={{ height: '500px', marginTop: 24 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default TaskCalendar;
