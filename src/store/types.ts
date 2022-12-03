export type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date | number;
};

export type TodoFormValue = {
  id: string;
  todo: string;
  isCompleted: boolean;
};

export type UpdateStatusTodoValue = {
  id: string;
  isCompleted: boolean;
};
