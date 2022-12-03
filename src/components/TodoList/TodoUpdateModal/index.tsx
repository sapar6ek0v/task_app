import { FC, useMemo } from 'react';
import { useGetSingleTodoQuery, useUpdateTodoMutation } from '../../../store';
import { TodoFormValue } from '../../../store/types';
import IconLoader from '../../Loader';
import Modal from '../../Modal';
import TodoForm from '../TodoForm';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  todoId: string;
};

const TodoUpdateModal: FC<Props> = ({ isOpen, onClose, todoId }) => {
  const { data: todo, isLoading } = useGetSingleTodoQuery(todoId);
  const [updateTodo, { isLoading: isUpdateLoading }] = useUpdateTodoMutation();

  const defaultValues = useMemo(() => {
    if (todo) {
      const defaultFormValue: TodoFormValue = {
        id: todo.id,
        isCompleted: todo.isCompleted,
        todo: todo.todo,
      };

      return defaultFormValue;
    }
  }, [todo])

  const handleSubmit = async (value: TodoFormValue) => {
    try {
      await updateTodo(value);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {
        (!isLoading && !!defaultValues)
          ? <TodoForm isLoading={isUpdateLoading} onSubmit={handleSubmit} defaultValues={defaultValues} />
          : <div className={styles.loader_wrapper}><IconLoader size={38} /></div>
      }
    </Modal>
  );
};

export default TodoUpdateModal;