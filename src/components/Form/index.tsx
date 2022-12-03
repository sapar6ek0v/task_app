import { ChangeEvent, FC, FormEvent, KeyboardEvent, useState } from 'react';
import { Plus } from 'tabler-icons-react';
import { useCategories } from '../../context/categories';
import { useCreateCategoryMutation, useCreateTodoMutation } from '../../store';
import IconLoader from '../Loader';
import styles from './styles.module.scss';

const Form: FC = () => {
  const [todo, setTodo] = useState<string>('');

  const { currentCategory: categoryId } = useCategories();

  const [createTodo, { isLoading }] = useCreateTodoMutation();
  const [createCategory] = useCreateCategoryMutation();

  const handleCreateCategory = async () => {
    const isTodoHasCategoryWord = todo.split(' ').filter((item) => item.startsWith('#'));
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
      console.log(error)
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

  return (
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
  );
};

export default Form;