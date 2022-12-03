import { FC } from 'react';
import { useGetAllTodosQuery } from '../../store';
import { useCategories } from '../../context/categories';
import Form from '../../components/Form';
import IconLoader from '../../components/Loader';
import TodoList from '../../components/TodoList';
import styles from './styles.module.scss';

const Main: FC = () => {
  const { currentCategory } = useCategories();
  const { data: todos, isLoading } = useGetAllTodosQuery(currentCategory);

  return (
    <>
      <Form />
      <div className={styles.loader_wrapper}>
        {
          (!isLoading && !!todos)
            ? <TodoList todos={todos} />
            : <IconLoader />
        }
      </div>
    </>
  );
};

export default Main;