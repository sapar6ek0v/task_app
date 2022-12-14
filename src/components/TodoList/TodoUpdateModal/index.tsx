import { FC, useMemo, useState } from 'react';
import { useCategories } from '../../../context/categories';
import { useGetSingleTodoQuery, useUpdateTodoMutation } from '../../../store';
import { TodoFormValue } from '../../../store/types';
import ErrorNotification from '../../ErrorNotification';
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
  const { currentCategory: categoryId } = useCategories();
  const { data: todo, isLoading } = useGetSingleTodoQuery({ id: todoId, categoryId });
  const [updateTodo, { isLoading: isUpdateLoading }] = useUpdateTodoMutation();

  const [isUpdateError, setIsUpdateError] = useState<any | null>(null);

  const defaultValues = useMemo(() => {
    if (todo) {
      const defaultFormValue: TodoFormValue = {
        id: todo.id,
        categoryId,
        isCompleted: todo.isCompleted,
        todo: todo.todo,
      };

      return defaultFormValue;
    }
  }, [todo, categoryId])

  const handleSubmit = async (value: TodoFormValue) => {
    try {
      await updateTodo(value);
      onClose();
    } catch (error) {
      setIsUpdateError(error);
      return;
    }
  };

  const handleCloseUpdateErrorNotification = () => {
    setIsUpdateError(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {
        (!isLoading && !!defaultValues)
          ? <TodoForm isLoading={isUpdateLoading} onSubmit={handleSubmit} defaultValues={defaultValues} />
          : <div className={styles.loader_wrapper}><IconLoader size={38} /></div>
      }
      {
        !!isUpdateError &&
        <ErrorNotification
          message={isUpdateError}
          onClose={handleCloseUpdateErrorNotification}
        />
      }
    </Modal>
  );
};

export default TodoUpdateModal;