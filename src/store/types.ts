export type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date | number;
};

export type TodoFormValue = {
  id: string;
  categoryId: string;
  todo: string;
  isCompleted: boolean;
};

export type UpdateStatusTodoValue = {
  id: string;
  categoryId: string;
  isCompleted: boolean;
};

export type TodoIdsValue = {
  id: string;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date | number;
};

export type CategoryFormValue = {
  name: string;
};
