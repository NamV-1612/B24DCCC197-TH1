const KEY = 'TODO_LIST_DATA';

export interface TodoItem {
  id: number;
  content: string;
  isDone: boolean;
}

// Lấy danh sách từ LocalStorage
export const getTodos = (): TodoItem[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

// Lưu danh sách vào LocalStorage
export const saveTodos = (todos: TodoItem[]) => {
  localStorage.setItem(KEY, JSON.stringify(todos));
};