import { FC } from 'react';
import { Todo } from '../../store/types';
import TodoItem from './TodoItem';
import styles from './styles.module.scss';

type Props = {
  todos: Todo[]
};

const TodoList: FC<Props> = ({ todos }) => {
  return (
    <ul className={styles.todoList_wrapper}>
      {
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      }
    </ul>
  );
};

export default TodoList;