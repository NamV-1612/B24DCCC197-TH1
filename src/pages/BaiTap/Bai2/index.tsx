import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Table, Space, Popconfirm, message, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { getTodos, saveTodos, TodoItem } from '@/services/TodoService'; // Import từ service

const Bai2 = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState<TodoItem | null>(null);

  // Load dữ liệu khi vào trang
  useEffect(() => {
    const data = getTodos();
    setTodos(data);
  }, []);

  // Thêm mới hoặc cập nhật
  const handleSave = () => {
    if (!inputValue.trim()) return;

    let newTodos = [...todos];
    if (isEditing) {
      // Logic sửa
      newTodos = newTodos.map(item => 
        item.id === isEditing.id ? { ...item, content: inputValue } : item
      );
      message.success('Đã cập nhật công việc');
      setIsEditing(null);
    } else {
      // Logic thêm mới công viêc
      const newItem: TodoItem = {
        id: Date.now(),
        content: inputValue,
        isDone: false,
      };
      newTodos.push(newItem);
      message.success('Đã thêm công việc');
    }

    setTodos(newTodos);
    saveTodos(newTodos); // Lưu xuống localStorage
    setInputValue('');
  };

  // Xóa công việc
  const handleDelete = (id: number) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
    message.success('Đã xóa thành công');
  };

  // Chuẩn bị dữ liệu để sửa
  const startEdit = (record: TodoItem) => {
    setIsEditing(record);
    setInputValue(record.content);
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'Nội dung công việc',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_: any, record: TodoItem) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            onClick={() => startEdit(record)} 
          />
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Bài 2: Todo List">
      <Space style={{ marginBottom: 16 }}>
        <Input 
          placeholder="Nhập nội dung công việc..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: 300 }}
          onPressEnter={handleSave}
        />
        <Button type="primary" onClick={handleSave}>
          {isEditing ? 'Cập nhật' : 'Thêm mới'}
        </Button>
        {isEditing && (
          <Button onClick={() => { setIsEditing(null); setInputValue(''); }}>Hủy</Button>
        )}
      </Space>

      <Table 
        dataSource={todos} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }} 
        bordered
      />
    </Card>
  );
};

export default Bai2;