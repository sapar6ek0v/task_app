export type Todo = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date | number;
};

export type TodoFormValue = {
  todo: string;
  isCompleted: boolean;
};
