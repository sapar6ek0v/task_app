import { FC, useState } from 'react';
import { Edit, TrashX } from 'tabler-icons-react';
import { useChangeStatusMutation, useDeleteTodoMutation, useGetSingleCategoryQuery } from '../../../store';
import { useCategories } from '../../../context/categories';
import { Todo } from '../../../store/types';
import CustomCheckbox from '../../CustomCheckbox';
import IconLoader from '../../Loader';
import Highlighter from '../../Highlighter';
import TodoUpdateModal from '../TodoUpdateModal';
import styles from '../styles.module.scss';

type Props = {
  todo: Todo;
};

const TodoItem: FC<Props> = ({ todo }) => {
  const { currentCategory: categoryId } = useCategories();

  const [isCompleted, setIsCompleted] = useState<boolean>(todo.isCompleted);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [deleteTodo, { isLoading: isDeleteLoading }] = useDeleteTodoMutation();
  const [changeStatus] = useChangeStatusMutation();
  const { data: category } = useGetSingleCategoryQuery(categoryId);

  const handleChangeStatus = async () => {
    setIsCompleted(!isCompleted);
    try {
      await changeStatus({ id: todo.id, isCompleted, categoryId });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo({ id: todo.id, categoryId });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenUpdateModal = () => {
    setIsUpdate(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdate(false);
  };

  return (
    <>
      <li className={styles.todo_wrapper}>
        <div className={styles.todo_rightSide}>
          <CustomCheckbox isCompleted={isCompleted} toggle={handleChangeStatus} />
          <h3
            className={isCompleted ? `${styles.todo_title_checked} ${styles.todo_title}` : styles.todo_title}
          >
            {category ? <Highlighter text={todo.todo} highlight={category.name} /> : todo.todo}
          </h3>
        </div>

        <div className={styles.todo_leftSide}>
          <button onClick={handleOpenUpdateModal} className={styles.todo_button}>
            <Edit size={20} strokeWidth={2} color={'#40bf65'} />
          </button>
          <button
            onClick={handleDeleteTodo}
            className={styles.todo_button}
            disabled={isDeleteLoading}
          >
            {
              isDeleteLoading
                ? <IconLoader size={20} />
                : <TrashX size={20} strokeWidth={2} color={'#000'} />
            }
          </button>
        </div>
      </li>
      <TodoUpdateModal todoId={todo.id} isOpen={isUpdate} onClose={handleCloseUpdateModal} />
    </>
  );
};

export default TodoItem;