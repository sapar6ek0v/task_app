import { ChangeEvent, FC, FormEvent, KeyboardEvent, useState } from 'react';
import { Plus } from 'tabler-icons-react';
import { useCategories } from '../../context/categories';
import { useCreateCategoryMutation, useCreateTodoMutation, useGetAllCategoriesQuery } from '../../store';
import IconLoader from '../Loader';
import ErrorNotification from '../ErrorNotification';
import styles from './styles.module.scss';

const Form: FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [errorHasCategoryDuplicate, setErrorHasCategoryDuplicate] = useState<boolean>(false);
  const [isCreateError, setIsCreateError] = useState<any | null>(null);

  const { currentCategory: categoryId } = useCategories();

  const [createTodo, { isLoading }] = useCreateTodoMutation();
  const [createCategory] = useCreateCategoryMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const handleCheckForDuplicate = (isTodoHasCategoryWord: string[]) => {
    if (isTodoHasCategoryWord.length && categories) {
      const todoHasCategory = isTodoHasCategoryWord[0].replace('#', '');
      const isHasDuplicate = categories.find((item) => item.name === todoHasCategory);

      return !!isHasDuplicate;
    }
  };

  const handleCreateCategory = async () => {
    const isTodoHasCategoryWord = todo.split(' ').filter((item) => item.startsWith('#'));

    if (handleCheckForDuplicate(isTodoHasCategoryWord)) {
      setErrorHasCategoryDuplicate(true);
      return;
    }

    if (isTodoHasCategoryWord.length) {
      const newCategory = isTodoHasCategoryWord[0].replace('#', '');
      const response = await createCategory({ name: newCategory }).unwrap();
      await createTodo({ todo, categoryId: response.id, isCompleted: false });
    } else {
      await createTodo({ todo, categoryId, isCompleted: false });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!todo) return;

    try {
      await handleCreateCategory();
    } catch (error) {
      setIsCreateError(error);
      return;
    }
    setTodo('');
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTodo = event.target.value;
    setTodo(newTodo);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleCloseDuplicateErrorNotification = () => {
    setErrorHasCategoryDuplicate(false);
  };

  const handleCloseCreateErrorNotification = () => {
    setIsCreateError(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form_wrapper}>
        <input
          value={isLoading ? 'Создание...' : todo}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          className={styles.form__input}
          type='text'
          placeholder='Создать...'
        />
        <button
          type='submit'
          className={styles.form__button}
          disabled={isLoading || !todo}
        >
          {
            isLoading
              ? <IconLoader size={20} color={'#fff'} />
              : <Plus size={20} strokeWidth={2} color={'#5e35b1'} />
          }
        </button>
      </form>
      {
        errorHasCategoryDuplicate &&
        <ErrorNotification
          message='Категория с таким именем уже существует!'
          onClose={handleCloseDuplicateErrorNotification}
        />
      }
      {
        !!isCreateError &&
        <ErrorNotification
          message={isCreateError}
          onClose={handleCloseCreateErrorNotification}
        />
      }
    </>
  );
};

export default Form;