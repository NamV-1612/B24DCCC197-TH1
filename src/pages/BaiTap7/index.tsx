// Main page for BaiTap7 - Quan Ly Cong Viec
import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import UserList from './components/UserList';

const BaiTap7: React.FC = () => {
  return (
    <div>
      <h1>Quản Lý Công Việc - Bài Tập 7</h1>
      <TaskList />
      <TaskForm />
      <UserList />
    </div>
  );
};

export default BaiTap7;